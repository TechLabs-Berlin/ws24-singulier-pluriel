const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log('Response');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on PORT ${port}`)
});