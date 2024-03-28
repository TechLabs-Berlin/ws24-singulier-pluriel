if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

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
const multer  = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const cloudinary = require('cloudinary');
const morgan = require('morgan')

const app = express();

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));
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
    rolling: true,
    cookie: {
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false
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
            console.log('Account was not activated.');
            return res.status(403).json({
                message: 'Account was not activated.'
            });
        }

        const passwordValid = await bcrypt.compare(password.toString(), user.hash);
        if(passwordValid){
            const { _id, sid, role } = user;
            const userInfo = { _id, sid, role };
            
            req.session.user = userInfo;

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

    res.json({
        message: 'User logged out!',
        loggedOut: true
    });
});


app.get('/api/userprofile', isLoggedIn, async (req, res) => {
    const userId = req.session.user._id;
    try {
        const user = await User.findOne({ _id: userId }).populate('role');
        res.json({ name: `${ user.firstname } ${ user.lastname }`, role: user.role.name });
    } catch (err) {
        console.log(err);
        res.send(err);
    };
})


app.get('/api/courses', isLoggedIn, async (req, res) => {
    const userId = req.session.user._id;
    try {
        let user = await User.findOne({ _id: userId }).populate([{ path: 'role' }, { path: 'courses', select: '-stats -lessons -participants' }]);

        if(user.role.name !== 'teacher'){
            user = await User.findOne({ _id: userId }).populate([{ path: 'role' }, { path: 'courses', match: { 'status': 'Active' }, select: '-stats -lessons -participants' }]);
        }

        let courses = user.courses;

        if(Object.entries(courses).length === 0){
            console.log('No courses');
            return res.send('No courses found');
        }

        res.send(courses);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


app.get('/api/courses/students', isLoggedIn, isTeacher, async (req, res) => {
    try {
        //? All students or only students with active account?
        const allStudents = await User.find({}).populate({ path: 'role', match: { 'name': 'student' } });

        if(Object.entries(allStudents).length === 0){
            console.log('No students found');
            return res.send('No students found');
        }

        res.send(allStudents);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Create new course (teachers only)
app.post('/api/courses', isLoggedIn, isTeacher, upload.single('image'), async (req, res) => {
    const userId = req.session.user._id;
    const teacher = await User.findOne({ _id: userId });
    try {
        const { title, description, csid, startDate, endDate, examDate, students, publishNow } = req.body;
        const participants = students.split(',');
        const course = await new Course({ 
            title,
            description, 
            csid, 
            startDate, 
            endDate, 
            examDate,
            createdBy: userId
        });

        if(publishNow == 'true'){
            course.status = 'Active';
        };

        teacher.courses.push(course._id);
        course.participants = participants.map(p => ({ _id: p }));
        course.participants.push(userId);
        await teacher.save();

        if(req.file){
            course.image.url = req.file.path, 
            course.image.filename = req.file.filename 
        };

        await course.save();

        for(let s = 0; s < participants.length; s++){
            const stud = await User.findOne({ _id: participants[s]});
            stud.courses.push(course._id);
            await stud.save();
        };
        
        res.json({ message: 'New course created', newCourse: course })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
});


// app.put('/api/courses/:courseId/publish', isLoggedIn, isTeacher, async (req, res) => {
//     try {
//         const courseId = req.params.courseId;
//         const course = await Course.findOneAndUpdate({ _id: courseId }, { status: 'Active' }, { new: true });
//         res.send({ message: 'Course published!', courseId: course._id, courseStatus: course.status });
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });


// app.put('/api/courses/:courseId/unpublish', isLoggedIn, isTeacher, async (req, res) => {
//     try {
//         const courseId = req.params.courseId;
//         const course = await Course.findOneAndUpdate({ _id: courseId }, { status: 'In Preparation' }, { new: true });
//         res.send({ message: 'Course unpublished!', courseId: course._id, courseStatus: course.status });
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });


app.put('/api/courses/:courseId/toggle-publish', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findOne({ _id: courseId });
        if(course.status === 'Active'){
            course.status = 'In Preparation';
            await course.save();
            res.send({ message: 'Course unpublished!', courseId: course._id, courseStatus: course.status });
        } else {
            course.status = 'Active';
            await course.save();
            res.send({ message: 'Course published!', courseId: course._id, courseStatus: course.status });
        };   
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


// Display specific course details (shared)
app.get('/api/courses/:courseId', isLoggedIn, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findOne({ _id: courseId }).populate('lessons');
        res.send(course);
    } catch (err) {
        res.send(err);
    }
});


// Edit specific course properties (teachers only)
app.put('/api/courses/:courseId', isLoggedIn, isTeacher, upload.single('image'), async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { title, description, csid } = req.body;
        //? Add logic to make course editable only if userId === course.createdBy ID
        if(!title){
            return res.json({ message: 'Title cannot be empty'});
        };
        let updatedCourse = await Course.findOneAndUpdate({ _id: courseId }, { title, description, csid });

        // New image to replace existing one
        if(req.file && updatedCourse.image.filename){
            let publicId = updatedCourse.image.filename;
            publicId.replace('singulier-pluriel/', '');
            cloudinary.v2.uploader.destroy(publicId).then(result=>console.log(result));

            updatedCourse.image.url = req.file.path;
            updatedCourse.image.filename = req.file.filename;
            await updatedCourse.save();
        } // No existing image, add one 
        else if (req.file && !updatedCourse.image.filename){
            updatedCourse.image.url = req.file.path;
            updatedCourse.image.filename = req.file.filename;
            await updatedCourse.save();
        } // Only delete existing image without replacement 
        else if (!req.file && req.body.deleteImage === true){
            let publicId = updatedCourse.image.filename;
            publicId.replace('singulier-pluriel/', '');
            cloudinary.v2.uploader.destroy(publicId).then(result=>console.log(result));

            updatedCourse.image = undefined;
            await updatedCourse.save();
        }

        updatedCourse = updatedCourse.toObject();
        delete updatedCourse.stats;
        delete updatedCourse.__v;

        console.log(updatedCourse)
        res.json({ message: 'Course updated', updatedCourse });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})


// Delete course (+ all existing classes in it)
app.delete('/api/courses/:courseId', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        //? Add logic to make course can be deleted only if ID userId === course.createdBy ID
        await Course.findOneAndDelete({ _id: courseId });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

// Display all modules of a course (shared)
app.get('/api/courses/:courseId/modules', isLoggedIn, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const modules = await Lesson.find({ courseId });
        res.send(modules);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    };
});


// Create new module in a course (teachers only)
app.post('/api/courses/:courseId/modules', isLoggedIn, isTeacher, upload.array('files'), async (req, res) => {
    //TODO FE needs to send formaData with header "Content-Type": "multipart/form-data"
    try {
        const courseId = req.params.courseId;
        const { title, link } = req.body;
        const course = await Course.findOne({ _id: courseId });
        const module = new Lesson({ title });
        if(req.files){
            module.materials = req.files.map(f => ({ url: f.path, filename: f.filename, type: 'file' }));
        };
        if(link){
            module.materials.push({ url: link, type: 'link' });
        };
        module.courseId = courseId;
        course.lessons.push(module);
        await module.save();
        await course.save();

        res.json({ message: 'New module created', newModule: module })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

// Update module title, add new materials (link, files) (teachers only)
app.put('/api/courses/:courseId/modules/:moduleId', isLoggedIn, isTeacher, upload.array('files'), async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        const { title, link } = req.body;
        const currentModule = await Lesson.findOne({ _id: moduleId });
        if(title && title !== currentModule.title){
            currentModule.title = title;
            // console.log('Updating title!')
        };
        if(link){
            const newLink = { url: link, type: 'link'};
            currentModule.materials.push(newLink);
            // console.log('Updating link!')
        };
        if(req.files != ''){
            const newFile = req.files.map(f => ({ url: f.path, filename: f.filename, type: 'file' }));
            console.log(newFile)
            for (file of newFile){
                currentModule.materials.push(file);
                // console.log('Adding file!')
            }
        };
        await currentModule.save();
        
        res.json({ message: 'Module updated', currentModule });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})


// Delete module (teachers only)
app.delete('/api/courses/:courseId/modules/:moduleId', isLoggedIn, isTeacher, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const moduleId = req.params.moduleId;
        await Course.updateOne({ _id: courseId }, { $pull: { lessons: moduleId } });
        await Lesson.findOneAndDelete({ _id: moduleId });
        res.json({ message: 'Module deleted' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

// Delete specific material (teachers only)
app.delete('/api/courses/:courseId/modules/:moduleId/:matId', isLoggedIn, isTeacher, async (req, res) => {
        //? Add logic to make course editable only if userId === course.createdBy ID
        try { 
            const moduleId = req.params.moduleId;
            const matId = req.params.matId;
            const findMat = await Lesson.findOne({ _id: moduleId }, { materials: { $elemMatch: { _id: matId }}});
            const material = findMat.materials[0];
            console.log(findMat.materials[0])
            if(material.filename){
                let cloudId = material.filename
                cloudId = cloudId.replace('singulier-pluriel/', '');
                cloudinary.v2.uploader.destroy(cloudId);
            };
            
            await Lesson.updateOne({ _id: moduleId }, {
                $pull: { materials: { _id: matId }}
            });

            res.json({ message: 'Material deleted' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err });
        };
});


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