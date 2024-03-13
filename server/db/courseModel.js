const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    title: String,
    description: String,
    csid: String,
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lesson'
        }
    ],
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    startDate: Date,
    endDate: Date,
    examDate: Date,
    status: {
        type: String,
        enum: ['In Preparation', 'Active', 'Inactive/Archived']
    }
});


module.exports = mongoose.model('Course', courseSchema);