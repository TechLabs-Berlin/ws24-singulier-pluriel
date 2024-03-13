const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect.js');
const User = require('./db/userModel.js');
const Course = require('./db/courseModel.js');
const Role = require('./db/roleModel.js');
const Lesson = require('./db/lessonModel.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const { isLoggedIn, isTeacher } = require('./middleware.js');

const app = express();

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  }))

const store = new MongoStore({
  uri: process.env.DB_URL,
  collection: 'sessions'
});

store.on('error', function(error){
    console.log(error);
});

app.use(session({
  secret: process.env.SECRET,
  store,
  resave: true,
  saveUninitialized: true,
  cookie: {
      sameSite: false,
      secure: false,
    //   secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
}));

app.get('/', (req, res) => {
    res.send('Response');
});

// Test client-server connection
app.post('/api/auth/account-activation', async (req, res) => {
    try {
        const { email, sid, password } = req.body;
        const user = await User.findOne({ sid, email }).populate('role');
        if(!user) {
            return res.status(403).json({
                message: 'Wrong credentials.'
            });
        }

        const hash = await bcrypt.hash(password, 12);
        if(user.hash || user.status){
            return res.status(403).json({
                message: 'Account was already activated.'
            });
        }
        user.hash = hash;
        user.status = 'active';
        await user.save();

        const { _id, role } = user;
        const userInfo = { _id, sid, role };

        req.session.user = userInfo;

        console.log('Account activated')

        res.json({
            message: 'Account activated!',
            accountStatus: 'active',
            userInfo
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong.'
        });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('role');
        if(!user){
            return res.status(403).json({
                message: 'Wrong email or password.'
            });
        } else if (!user.hash || !user.status){
            return res.status(403).json({
                message: 'Account was not activated.'
            });
        }

        const passwordValid = await bcrypt.compare(password.toString(), user.hash);
        if(passwordValid){
            const { _id, sid, role } = user;
            const userInfo = { _id, sid, role };
            
            req.session.user = userInfo;

            console.log('User authenticated')

            res.json({
                message: 'Authentication successful!',
                loggedIn: true,
                user: userInfo
            });
        } else {
            return res.status(404).json({
                message: 'Wrong email or password.',
                loggedIn: false
            });
        };
    } catch (err){
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong.'
        });
    };

});

app.get('/api/logout', function (req, res) {
    req.session.destroy(function(err) {
        if (err){
            return res.status(400).json({
                message: 'Something went wrong.'
            });
        }
    })
    console.log('User logged out!');

    res.json({
        message: 'User logged out!',
        loggedOut: true,
    });
});

app.get('/courses/:id', async (req, res) => {
    const { id } = req.params
    console.log("Request recived!")
    // const courses = await Course.find({ students: currentUser });
    const courses = await Course.find({ teacher: id });
    res.send(courses);
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
});