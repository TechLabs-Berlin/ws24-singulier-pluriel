const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema ({
    name: {
        type: String,
        enum: ['student', 'teacher', 'admin']
    }
});

module.exports = mongoose.model('Role', roleSchema);