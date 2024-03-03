const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema ({
    role: String
});

module.exports = mongoose.model('Role', roleSchema);