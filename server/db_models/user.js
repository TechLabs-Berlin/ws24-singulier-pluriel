const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname: String,
    lastname: String,
    email: { 
        type: String,
        unique: true
    },
    idNumber: Number,
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    role: {
        type: [String],
        enum: ['teacher', 'student']
    }
});


module.exports = mongoose.model('User', userSchema);