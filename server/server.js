const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect.js');
const User = require('./db/userModel.js');
const Course = require('./db/courseModel.js');
const Lesson = require('./db/lessonModel.js');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
    console.log(req.session);
});

// Test client-server connection
// app.post('/auth/account-activation', async (req, res) => {
//     const { email, ID, password } = req.body;
//     const account = await User.findOne({ ID: ID, email: email });
//     if(!account){
//         console.log('No accounts found with the given info');
//         res.send('Not found')
//     } else {
//         const hash = await bcrypt.hash(password, 12);
//         account.hash = hash;
//         account.status = 'active';
//         await account.save();
//         console.log(account);
//         res.send('User activated!');
//     }
// });


app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const account = await User.findOne({ email });
    if(!account){
        console.log('No accounts found with the given info');
        res.send('Not found')
    } else {
        const login = await bcrypt.compare(password, account.hash);
        if(!login) {
            res.send('Wrong email and/or password');
        } else {
            res.send('User authenticated!');
        }
    }
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