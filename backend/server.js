const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

mongoose.connect('mongodb://it2810-74.idi.ntnu.no:27017', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
  console.log("MongoDB db connection established successfully")
})
