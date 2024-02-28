const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const User = require('./db_models/user.js');
const Course = require('./db_models/course.js');

const app = express();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test-singplur';
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('open', () => console.log(`DB connected`));
db.on('disconnected', () => console.log('DB disconnected'));
db.on('error', () => handleError(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Response');
});

// Test client-server connection
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, role } = req.body;
    const user = await new User(req.body.user);
    await user.save();
    console.log('Saved!');
    return;
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
});