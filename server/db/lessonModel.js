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


module.exports = mongoose.model('Lesson', lessonSchema);