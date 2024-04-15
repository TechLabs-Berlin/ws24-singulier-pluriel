const Course = require('../db/courseModel.js');
const Lesson = require('../db/lessonModel.js');
const cloudinary = require('cloudinary');


module.exports.getModules = async (req, res) => {
    const courseId = req.params.courseId;
    const modules = await Lesson.find({ courseId });
    if(modules.length === 0){
        return res.status(404).json({ message: 'No modules found' });
    }
    res.send(modules);
};


module.exports.createModule = async (req, res) => {
    const courseId = req.params.courseId;
    const { title, link } = req.body;
    if(!title){
        return res.json({ message: 'Title cannot be empty'});
    };
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
};


module.exports.editModule = async (req, res) => {
    const moduleId = req.params.moduleId;
    const { title, link } = req.body;
    const currentModule = await Lesson.findOne({ _id: moduleId });
    if(title && title !== currentModule.title){
        currentModule.title = title;
    };
    if(link){
        const newLink = { url: link, type: 'link'};
        currentModule.materials.push(newLink);
    };
    if(req.files != ''){
        const newFile = req.files.map(f => ({ url: f.path, filename: f.filename, type: 'file' }));
        for (file of newFile){
            currentModule.materials.push(file);
        }
    };
    await currentModule.save();
    
    res.json({ message: 'Module updated', currentModule });
};


module.exports.deleteModule = async (req, res) => {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    await Course.updateOne({ _id: courseId }, { $pull: { lessons: moduleId } });
    await Lesson.findOneAndDelete({ _id: moduleId });
    res.json({ message: 'Module deleted' });
};


module.exports.deleteCourseMat = async (req, res) => {
    //? Add logic to make course editable only if userId === course.createdBy ID
    const moduleId = req.params.moduleId;
    const matId = req.params.matId;
    const findMat = await Lesson.findOne({ _id: moduleId }, { materials: { $elemMatch: { _id: matId }}});
    const material = findMat.materials[0];
    if(material.filename){
        let cloudId = material.filename
        cloudId.replace('singulier-pluriel/', '');
        cloudinary.v2.uploader.destroy(cloudId);
    };
    
    await Lesson.updateOne({ _id: moduleId }, {
        $pull: { materials: { _id: matId }}
    });

    res.json({ message: 'Material deleted' });
}