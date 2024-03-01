const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test-singplur';mongoose.connect(dbUrl);
    const db = mongoose.connection;

    db.on('open', () => console.log('DB connected'));
    db.on('disconnected', () => console.log('DB disconnected'));
    db.on('error', () => handleError(error));
}

module.exports = dbConnect;