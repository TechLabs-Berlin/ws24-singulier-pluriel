const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema ({
    title: String,
    description: String,
    courseId: String,
    materials: [String]
    // assignments:
});


module.exports = mongoose.model('Lesson', lessonSchema);