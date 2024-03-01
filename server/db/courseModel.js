const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    title: String,
    description: String,
    courseId: Number,
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lesson'
        }
    ],
    teacher: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    // startDate: Date,
    // endDate: Date,
});


module.exports = mongoose.model('Course', courseSchema);