import express from "express";
const Country = require("./models/countryModel");
const userInfo = require("./models/userModel");
const router = express.Router();

//file containing all endpoints

// Get specific country from id
router.get("/country/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const country = await Country.find({ alpha2Code: id });
    return res.send(country);
  } catch (e) {
    return res.send(e);
  }
});

//Search, filtering and sorting
router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const search = req.query.search;
  const minArea = req.query.minArea || 0;
  const maxArea = req.query.maxArea || 20000000;
  const minPop = req.query.minPop || 0;
  const maxPop = req.query.maxPop || 10000000000;

  const region = [
    req.query.region || [
      "Americas",
      "Polar",
      "Europe",
      "Asia",
      "Oceania",
      "Africa",
    ],
  ].flat();
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
          { capital: { $regex: "^" + search, $options: "im" } },
          { alpha2Code: { $regex: search, $options: "i" } },
          { altSpellings: { $regex: search, $options: "i" } },
        ],
        $and: [
          { region: { $in: region } },
          { population: { $gte: minPop, $lte: maxPop } },
          { area: { $gte: minArea, $lte: maxArea } },
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
        flag: 1,
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

// Finds countries from a list of alpha2codes
router.get("/getListOfCountries/:countries", async (req, res) => {
  const query = req.params.countries.split("&");
  const countries = await Country.find({ alpha2Code: { $in: query } });
  res.send(countries);
});

// Adds country to users visited list
router.post("/userAddFlag/:userID/:alpha2code", async (req, res) => {
  try {
    const user = await userInfo.findOne({
      _id: req.params.userID,
    });

    if (!user.flags.includes(req.params.alpha2code)) {
      user.flags = [...user.flags, req.params.alpha2code];
    }
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(404);
    res.send({
      error:
        "Was not able to add the given country to the users flags in the database",
    });
  }
});

// Removes country from users visited list
router.post("/userRemoveFlag/:userID/:alpha2code", async (req, res) => {
  try {
    const user = await userInfo.findOne({
      _id: req.params.userID,
    });

    user.flags = user.flags.filter(
      (alpha2code: string) => alpha2code !== req.params.alpha2code
    );
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(404);
    res.send({
      error:
        "Was not able to remove" +
        req.params.alpha2code +
        "from the given user's flags",
    });
  }
});

// Adds country to users wishlist
router.post("/userAddWish/:userID/:alpha2code", async (req, res) => {
  try {
    const user = await userInfo.findOne({
      _id: req.params.userID,
    });

    if (!user.wishes.includes(req.params.alpha2code)) {
      user.wishes = [...user.wishes, req.params.alpha2code];
    }
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(404);
    res.send({
      error:
        "Was not able to add the given country to the useres wish in the database",
    });
  }
});

// Removes country from users wishlist
router.post("/userRemoveWish/:userID/:alpha2code", async (req, res) => {
  try {
    const user = await userInfo.findOne({
      _id: req.params.userID,
    });

    user.wishes = user.wishes.filter(
      (alpha2code: string) => alpha2code !== req.params.alpha2code
    );
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(404);
    res.send({
      error:
        "Was not able to remove" +
        req.params.alpha2code +
        "from the given user's flags",
    });
  }
});

// Gets all information(visited and wish list countries) stored on a userID in the database
router.get("/getUserData/:databaseID", async (req, res) => {
  const user = await userInfo.findOne({
    _id: req.params.databaseID,
  });
  return res.send(user);
});

// This should only be called once per user the first time they visit the page
router.get("/requestUserID/", async (req, res) => {
  const user = await userInfo.create({
    flags: [],
    wishes: [],
  });
  await user.save();
  res.send(user);
});

module.exports = router;
