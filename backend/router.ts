import express from "express";
const Country = require("./models/countryModel"); // new
const router = express.Router();

//file containing all endpoints

// projection does not work in this mongodb version

// Get all country information
router.get("/all", async (req, res) => {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
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
      .skip(skip)
      .limit(limit);
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

// Get specific country from id
router.get("/country/:id", async (req, res) => {
  const id = req.params.id;
  const country = await Country.find({
    $or: [
      { alpha2Code: { $regex: "^" + id, $options: "i" } },
      { alpha3Code: { $regex: "^" + id, $options: "i" } },
    ],
  });
  return res.send(country);
});

//Return borders
// router.get("/country/:id/borders", async (req, res) => {
//   const id = req.params.id;
//   const country = await Country.find().where('alpha3Code').in(alpha2Code.borders).exec()
//   return res.send(country);
// });

//Search

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const search = req.query.search;
  let mySort;
  if (req.query.sort === "nameAsc") {
    mySort = { name: 1 };
  } else if (req.query.sort === "nameDesc") {
    mySort = { name: -1 };
  } else if (req.query.sort === "areaAsc") {
    mySort = { area: 1 };
  } else if (req.query.sort === "areaDesc") {
    mySort = { area: -1 };
  } else if (req.query.sort === "popAsc") {
    mySort = { population: 1 };
  } else if (req.query.sort === "popDesc") {
    mySort = { population: -1 };
  }
  try {
    const country = await Country.find(
      {
        $or: [
          { name: { $regex: "^" + search, $options: "im" } },
          { region: { $regex: "^" + search, $options: "im" } },
          { capital: { $regex: "^" + search, $options: "im" } },
          { alpha2Code: { $regex: "^" + search, $options: "im" } },
        ],
        // $and: [
        //   {
        //     $or: [{ region: req.query.region }],
        //   },
        // ],
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
      .skip(skip)
      .limit(limit)
      .sort(mySort);
    return res.send(country);
  } catch (e) {
    return res.send(e);
  }
});
module.exports = router;
