const express = require("express");
const Country = require("./models/countryModel"); // new
const router = express.Router();

//file containing all endpoints

// projection does not work in this mongodb version

// Get all country information
router.get("/all", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  try {
    const country = await Country.find(
      {},
      {
        _id: 0,
        name: 1,
        alpha2Code: 1,
        capital: 1,
        region: 1,
        population: 1,
        area: 1,
      }
    )
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return res.send(country);
  } catch (e) {
    return res.send(e);
  }
});

// Get all countries starting with

router.get("/name/:id", async (req, res) => {
  const id = req.params.id;
  const query = { name: /^Sl/ };
  const country = await Country.find(query);
  return res.send(country);
});

// Get all countries from id
//nb!! case sensitive
router.get("/countries/:id", async (req, res) => {
  const test = req.params.id;
  const country = await Country.find();
  return res.send(country);
});

// Get specific country from id
router.get("/country/:id", async (req, res) => {
  const id = req.params.id;
  const country = await Country.find({ alpha2Code: id });
  return res.send(country);
});

//Search

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  const search = req.query.search;
  try {
    const country = await Country.find(
      {
        $or: [
          { name: new RegExp(search, 'i')},
          { region: { $regex: search, $options: "i" } },
          { capital:{ $regex: search, $options: "im" }},
          { alpha2Code:{ $regex: search, $options: "i" }},
        ],
      },
      {
        _id: 0,
        name: 1,
        alpha2Code: 1,
        capital: 1,
        region: 1,
        population: 1,
        area: 1,
      }
    )
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return res.send(country);
  } catch (e) {
    return res.send(e);
  }
});
module.exports = router;
