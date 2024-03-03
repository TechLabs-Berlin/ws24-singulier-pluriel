const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect.js');
const User = require('./db/userModel.js');
const Course = require('./db/courseModel.js');
const bcrypt = require('bcrypt');

const app = express();

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Response');
});

// Test client-server connection
// app.post('/auth/account-activation', async (req, res) => {
//     const { email, ID, password } = req.body;
//     const account = await User.findOne({ ID: ID, email: email });
//     if(!account){
//         console.log('No accounts found with the given info');
//         res.send('Not found')
//     } else {
//         const hash = await bcrypt.hash(password, 12);
//         account.hash = hash;
//         account.status = 'active';
//         await account.save();
//         console.log(account);
//         res.send('User activated!');
//     }
// });


app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const account = await User.findOne({ email });
    if(!account){
        console.log('No accounts found with the given info');
        res.send('Not found')
    } else {
        const login = await bcrypt.compare(password, account.hash);
        if(!login) {
            res.send('Wrong email and/or password');
        } else {
            res.send('User authenticated!');
        }
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
});