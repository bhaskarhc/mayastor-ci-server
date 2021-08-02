// import express (after npm install express)
const express = require('express');
const AllData = require('../globalArray');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

// make the server listen to requests
 module.exports = app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});


// create a route for the app
app.get('/mayastor', (req, res) => {
    res.json(AllData)

    // res.send('Hello World');
  });
  