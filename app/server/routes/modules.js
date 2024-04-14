const express = require('express');
const router = express.Router({ mergeParams: true });
const { TryCatch } = require('../utils');
const { isLoggedIn, isTeacher } = require('../middleware');
const modules = require('../controllers/modules');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(isLoggedIn, TryCatch(modules.getModules))
    .post(isLoggedIn, isTeacher, upload.array('files'), TryCatch(modules.createModule));

router.route('/:moduleId')
    .put(isLoggedIn, isTeacher, upload.array('files'), TryCatch(modules.editModule))
    .delete(isLoggedIn, isTeacher, TryCatch(modules.deleteModule));

router.delete('/:moduleId/:matId', isLoggedIn, isTeacher, TryCatch(modules.deleteCourseMat));


module.exports = router;