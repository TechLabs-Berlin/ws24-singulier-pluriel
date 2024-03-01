const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect.js');
const User = require('./db/userModel.js');
const Course = require('./db/courseModel.js');

const app = express();

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Response');
});

// Test client-server connection
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, role } = req.body;
        const user = await new User(req.body.user);
        await user.save();
        console.log(user);
        res.send('New user created');
    } catch (e){
        console.log(e);
        res.send('Error: Check console');
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
});