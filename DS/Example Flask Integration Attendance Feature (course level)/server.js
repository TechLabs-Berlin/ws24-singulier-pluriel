const express = require('express');

const axios = require('axios');



const app = express();

const port = 3000;



app.get('/attendance', async (req, res) => {

  try {

    const response = await axios.get('http://127.0.0.1:5000/');

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).send('Error fetching data from Flask server');

  }

});



app.listen(port, () => {

  console.log(`Express server listening at http://localhost:${port}`);

});
