import express = require('express');
import bodyParser = require('body-parser')
import path = require('path');
const app = express();
import mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.send("Hello there")
});

app.listen(process.env.PORT || 8080);

mongoose.connect('mongodb://it2810-74.idi.ntnu.no:27017', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
  console.log("MongoDB db connection established successfully")
})
