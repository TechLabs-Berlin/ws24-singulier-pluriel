const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema ({
    title: String,
    description: String,
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    materials: [
        {
            url: String,
            filename: String,
            type: {
                type: String,
                enum: ['file', 'link']
            }
	    }
    ]
    // assignments:
});

lessonSchema.methods.toJSON = function () {
    const user = this;
    const lessonObject = user.toObject();

    delete lessonObject.__v;

    return lessonObject;
};

module.exports = mongoose.model('Lesson', lessonSchema);