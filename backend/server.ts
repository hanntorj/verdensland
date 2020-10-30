import express from "express";
const app = express();
const mongoose = require("mongoose");
const routes = require("./router");

mongoose.connect(
  "mongodb://myUserAdmin:gruppe74@it2810-74.idi.ntnu.no:27017/prosjekt3?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var port = process.env.PORT || 8080;
mongoose.connection.once("open", () => {
  console.log("MongoDB db connection established successfully");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", routes);
app.listen(port, () =>
  console.log("Server is running on port http://localhost:" + port)
);
