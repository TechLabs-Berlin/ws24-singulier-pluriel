const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Lesson = require('./lessonModel.js');
const User = require('./userModel.js');

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
        enum: ['In Preparation', 'Active', 'Inactive'],
        default: 'In Preparation',
    }, 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

courseSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Lesson.deleteMany({
            _id: {
                $in: doc.lessons
            }
        })
        await User.updateMany({}, {
            $pull: { courses: doc._id }
        })
    }
})

module.exports = mongoose.model('Course', courseSchema);