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
const axios = require('axios');

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
  saveUninitialized: false,
  cookie: {
      sameSite: false,
      secure: false,
    //   secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
}));

app.get('/', (req, res) => {
    res.send('Server running');
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
            console.log('Wrong email or password.');
            return res.status(403).json({
                message: 'Wrong email or password.'
            });
        } else if (!user.hash || !user.status){
            console.log('Wrong email or password.');
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
            console.log(err);
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


// app.get('/api/dashboard', isLoggedIn, async (req, res) => {
//     if(req.session.user) {
//         const id = req.session.user._id;
//         const user = await User.findOne({ _id: id }).populate('role');
//         return res.send(user);
//     } else {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// })


app.get('/api/courses', isLoggedIn, async (req, res) => {
    const userId = req.session.user._id;
    try {
        const user = await User.findOne({ _id: userId }).populate('role courses');
        const courses = user.courses;
        if(user.role.name !== 'teacher'){
            courses = await User.findOne({ _id: userId }).populate({ path: 'comments', match: { 'status': 'Active' } }) ;
        }
        if(!courses){
            console.log('No courses');
            res.send('No courses found');
        }
        res.send(courses);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


// Create new course (teachers only)
app.post('/api/courses', isLoggedIn, isTeacher, async (req, res) => {
    const userId = req.session.user._id;
    const teacher = await User.findOne({ _id: userId });
    try {
        const { title, description, csid, startDate, endDate, examDate } = req.body;
        const course = await new Course({ 
            title, 
            description, 
            csid, 
            startDate, 
            endDate, 
            examDate,
            participants: userId,
            createdBy: userId
        });
        teacher.courses.push(course._id);
        await teacher.save();
        await course.save();
        res.json({ message: 'New course created', newCourse: course })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})


// Display specific course details (shared)
app.get('/api/courses/:_id', isLoggedIn, async (req, res) => {
    try {
        const courseId = req.params;
        const course = await Course.findOne({ _id: courseId }).populate('lessons');
        res.send(course);
    } catch (err) {
        res.send(err);
    }
})


// Edit specific course properties (teachers only)
app.put('/api/courses/:_id', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const courseId = req.params;
        const updatedData = req.body;
        //? Add logic to make course editable only if ID userId === course.createdBy ID
        const updatedCourse = await Course.findOneAndUpdate(courseId, updatedData, { new: true });
        res.json({ message: 'Course updated', updatedCourse });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})


// Delete course (+ all existing classes in it)
app.delete('/api/courses/:_id', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const courseId = req.params;
        //? Add logic to make course can be deleted only if ID userId === course.createdBy ID
        await Course.findOneAndDelete({ _id: courseId });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

// Display all modules of a course (shared)
// app.get('/courses/:id/modules')

// Create new module in a course (teachers only)
app.post('/api/courses/:_id/modules', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const courseId = req.params;
        const { title, materials } = req.body;
        const course = await Course.findOne({ _id: courseId });
        const module = new Lesson({
            title,
            materials
        });
        module.courseId = courseId;
        course.lessons.push(module)
        await module.save();
        await course.save();

        res.json({ message: 'New module created', newModule: module })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

// Update module properties in DB (teachers only)
app.put('/api/courses/:id/modules/:moduleId', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        const updatedData = req.body;
        const updatedModule = await Lesson.findOneAndUpdate( { _id: moduleId } , updatedData, { new: true } );
        //? Add logic for updating materials in Cloud Store
        res.json({ message: 'Module updated', updatedModule });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

// Delete module (teachers only)
app.delete('/api/courses/:id/modules/:moduleId', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        await Lesson.findOneAndDelete( { _id: moduleId } );
        //? Add DB middleware for deleting all materials in Cloud Store
        res.json({ message: 'Module deleted' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})




// app.get('/api/test/getdata', async (req, res) => {
//     const url = 'https://jsonplaceholder.typicode.com/comments/'; // Here the Flask API Url

//     const userId = 6; // UserId taken form session

//     async function getData(){
//         const response = await axios.get(`${url}?postId=${userId}`); // Url to specific Flask route created dynamically
//         console.log('Data was fetched!')
//         console.log(response.data)
//         return response.data;
//     }

//     const flaskData = await getData(); // Flask data stored here as for. ex. json
//     res.send(flaskData); // Json data goind back to FE

// })



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
});