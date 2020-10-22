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

app.get("/", (req, res) => res.send("Hello world"))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use("/api", routes)
//app.use("/api", countries)
app.listen(port, () => console.log("test" + port)) 
