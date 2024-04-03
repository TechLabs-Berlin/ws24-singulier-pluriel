const mongoose = require('mongoose');
const User = require('../../db/userModel.js');
const Course = require('../../db/courseModel.js');
const Lesson = require('../../db/lessonModel.js');
const courses = require('./newcourses.js');
const lessons = require('./newlessons.js');
const dbConnect = require('../../db/dbConnect.js');
const { studentsId, teachersId, tnames, snames } = require('./users.js');
const { storage } = require('../../cloudinary/index.js');
const cloudinary = require('cloudinary');
require('dotenv').config();
const axios = require('axios');

dbConnect();

const db = mongoose.connection;
db.once('open', () => {
    console.log('Database connected');
})

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const covers = ["./fakeFiles/covers/cover1.jpg", "./fakeFiles/covers/cover2.jpg", "./fakeFiles/covers/cover3.jpg", "./fakeFiles/covers/cover4.jpg"];
const files = ["./fakeFiles/materials/learnenglish.pdf", "./fakeFiles/materials/Italian-Pronouns.png", "./fakeFiles/materials/Listening_Transcript.pdf"];
const links = ["https://youtu.be/uNgW4y946Dg?si=ZOYO2o8DhWNPTdX-", "https://youtu.be/n1kw7j4UII0?si=dSh5UwuiJTHl0872", "https://www.youtube.com/watch?v=tdimXQHMyvc", "https://www.youtube.com/watch?v=DwbAW8G-57A"];

const seedDB = async () => {
    await User.deleteMany({});

    //Create students
    for (let i = 0; i < studentsId.length; i++){
        const student = await new User({
            firstname: snames[i].firstname,
            lastname: snames[i].lastname,
            email: `${snames[i].firstname}.${snames[i].lastname}@email.com`,
            sid: studentsId[i],
            role: '65f1c47eff7d4cef5b2eacf1'
        })
        await student.save();
    }

    //Create teachers
    for (let t = 0; t < teachersId.length; t++){
        const teacher = await new User({
            firstname: tnames[t].firstname,
            lastname: tnames[t].lastname,
            email: `${tnames[t].firstname}.${tnames[t].lastname}@email.com`,
            sid: teachersId[t],
            role: '65f1c465ff7d4cef5b2eacf0'
        })
        await teacher.save();
    }

    // Create lessons
    await Lesson.deleteMany({});

    for (let l = 0; l < lessons.length; l++){
        const lesson = await new Lesson({
            title: `${lessons[l].title}`
        })

        const rand3 = randomInteger(0, 2);
        const file = files[rand3];
        
        try {
            const res = await cloudinary.uploader.upload(file, { resource_type: "auto" });

            lesson.materials.push({
                    url: links[randomInteger(0, 3)],
                    type: 'link' 
                });
            lesson.materials.push(
                { 
                    url: res.url, 
                    filename: res.public_id,
                    type: 'file'
                });
        } catch (err){
            console.log(err)
        }

        await lesson.save();
    }

    //Create courses
    await Course.deleteMany({});

    const teachers = await User.find({ role: '65f1c465ff7d4cef5b2eacf0'});
    const students = await User.find({ role: '65f1c47eff7d4cef5b2eacf1'});

    for (let x = 0; x < courses.length; x++){
        const random5 = Math.floor(Math.random() * 5);
        const rand3 = Math.floor(Math.random() * 3);
        
        try {
            const res = await cloudinary.uploader.upload(covers[rand3], { resource_type: "auto" });

            const course = await new Course({
                title: courses[x].title,
                image: {
                    url: res.url,
                    filename: res.public_id },
                description: courses[x].description,
                csid: courses[x].csid,
                participants: `${teachers[random5]._id}`,
                startDate: `2024-10-${randomInteger(1, 30)}`,
                endDate: `2025-01-${randomInteger(2, 31)}`,
                examDate: `2025-02-${randomInteger(1, 28)}`,
                status: 'Active',
                createdBy: `${teachers[random5]._id}`
            })

            if(!teachers[random5].courses.includes(course._id)){
                teachers[random5].courses.push(course._id);
                await teachers[random5].save();
            };

            // Add 26 random students to course participants
            for (let s = 0; s < 26; s++){
                const random50 = Math.floor(Math.random() * 50)
                course.participants.push(students[random50]._id);
                if(!students[random50].courses.includes(course._id)){
                    students[random50].courses.push(course._id);
                    await students[random50].save();
                }

                const studStats = {
                    student: students[random50]._id,
                    score: randomInteger(40, 100),
                    attendance: randomInteger(40, 100),
                    feedback: {
                        learning: randomInteger(1, 5),
                        organization: randomInteger(1, 5),
                        quality: randomInteger(1, 5)
                    }
                }

                course.stats.push(studStats);
            } 

            // Add lessons
            for(let f = 0; f < lessons.length; f++){
                if (course.csid === lessons[f].courseId){
                    const title = lessons[f].title;
                    const lsn = await Lesson.findOne({title});
                    course.lessons.push(lsn._id);
                    lsn.courseId = course._id;
                    await lsn.save();
                    await course.save();
                }
            }
            await course.save();
        } catch (err){
            console.log(err)
        }
    }
}

const activateUsers = async () => {
    const users = await User.find({});

    for(let user of users){
        await axios.post('http://localhost:8080/api/auth/account-activation', {
            email: user.email,
            sid: user.sid,
            password: 'test'
        })
        .then(function (res){
            if(res){
                console.log('User activated');
            }
        })
        .catch(function (err){
            console.log(err);
        })
    }
}
// 'https://ws24-singulier-pluriel.onrender.com/api/auth/account-activation'
// seedDB().then(() => {
//     db.close();
// })

activateUsers().then(() => {
    db.close();
})

// Roles IDs (test-singplur)
// name: 'teacher': '65f1c465ff7d4cef5b2eacf0'
// name: 'student': '65f1c47eff7d4cef5b2eacf1'
// name: 'admin': '65f1c456ff7d4cef5b2eacef'

// Roles IDs (singulier-pluriel)
// name: 'teacher': '65f6ec2ffbcf0a307810ae81'
// name: 'student': '65f6ecd2cbe12cec01dd5250'
// name: 'admin': '65f6ecfdcbe12cec01dd5251'