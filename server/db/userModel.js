const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname: String,
    lastname: String,
    email: { 
        type: String,
        unique: [true, 'Email already exists!'],
        set: v => v.toLowerCase()
    },
    sid: { 
        type: String,
        // unique: [true, 'ID already exists!']
    },
    hash: String,
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
});

// Roles IDs
// 'teacher': ObjectId('65e369013b82fb903a433465')
// 'student': ObjectId('65e369013b82fb903a433466')

module.exports = mongoose.model('User', userSchema);