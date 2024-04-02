const User = require('../db/userModel.js');
const Course = require('../db/courseModel.js');
const Role = require('../db/roleModel.js');
const Lesson = require('../db/lessonModel.js');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const cloudinary = require('cloudinary');


module.exports.getCourses = async (req, res) => {
    const userId = req.session.user._id;
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
};


module.exports.getStudents = async (req, res) => {
    //? All students or only students with active account?
    const allStudents = await User.find({}).populate({ path: 'role', match: { 'name': 'student' } });

    if(Object.entries(allStudents).length === 0){
        console.log('No students found');
        return res.send('No students found');
    }

    res.send(allStudents);
};


// Create new course (teachers only)
module.exports.createCourse = async (req, res) => {
    const userId = req.session.user._id;
    const teacher = await User.findOne({ _id: userId });
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
    await teacher.save();

    if(participants != ''){
        course.participants = participants.map(p => ({ _id: p }));
        course.participants.push(userId);

        for(let p of participants){
            const stud = await User.findOne({ _id: p});
            stud.courses.push(course._id);
            await stud.save();
        };
    };
    
    if(req.file){
        course.image.url = req.file.path, 
        course.image.filename = req.file.filename 
    };

    await course.save();
    
    res.json({ message: 'New course created', newCourse: course })
};


// Publish/unpublish course
module.exports.togglePublishCourse = async (req, res) => {
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
};


// Display specific course details (shared)
module.exports.getCourseDetails = async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findOne({ _id: courseId }).populate('lessons');
    if(!course){
        return res.status(404).json({ message: 'No course found.' })
    };
    res.send(course);
};


// Edit specific course properties (teachers only)
module.exports.editCourseDetails = async (req, res) => {
    const courseId = req.params.courseId;
    const { title, description, csid } = req.body;
    //? Add logic to make course editable only if userId === course.createdBy ID
    if(!title){
        return res.json({ message: 'Title cannot be empty'});
    };
    let updatedCourse = await Course.findOneAndUpdate({ _id: courseId }, { title, description, csid }, { new: true });

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
    else if (!req.file && req.body.deleteImage === 'true'){
        let publicId = updatedCourse.image.filename;
        publicId.replace('singulier-pluriel/', '');
        cloudinary.v2.uploader.destroy(publicId).then(result=>console.log(result));

        updatedCourse.image = undefined;
        await updatedCourse.save();
    }

    updatedCourse = updatedCourse.toObject();
    delete updatedCourse.stats;
    delete updatedCourse.__v;

    res.json({ message: 'Course updated', updatedCourse });
};

// Delete course (+ all existing classes in it)
module.exports.deleteCourse = async (req, res) => {
    const courseId = req.params.courseId;
    //? Add logic to make course can be deleted only if ID userId === course.createdBy ID
    await Course.findOneAndDelete({ _id: courseId });
    res.json({ message: 'Course deleted' });
};
