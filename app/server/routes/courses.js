const express = require('express');
const router = express.Router();
const { TryCatch } = require('../utils');
const { isLoggedIn, isTeacher } = require('../middleware');
const courses = require('../controllers/courses');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(isLoggedIn, TryCatch(courses.getCourses))
    .post(isLoggedIn, isTeacher, upload.single('image'), TryCatch(courses.createCourse));

router.get('/students', isLoggedIn, isTeacher, TryCatch(courses.getStudents));

router.put('/:courseId/toggle-publish', isLoggedIn, isTeacher, TryCatch(courses.togglePublishCourse));

router.route('/:courseId')
    .get(isLoggedIn, TryCatch(courses.getCourseDetails))
    .put(isLoggedIn, isTeacher, upload.single('image'), TryCatch(courses.editCourseDetails))
    .delete(isLoggedIn, isTeacher, TryCatch(courses.deleteCourse));


module.exports = router;