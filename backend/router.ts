import express from "express";
const Country = require("./models/countryModel"); // new
const userInfo = require("./models/userModel");
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
    //wrong alphacode returning
    $or: [
      { alpha2Code: { $regex: id } },
      //{ alpha3Code: { $regex: id } },
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
        $and: [{ region: { $in: region } }],
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

/*router.get("/setUserData/:databaseID/:flags/:wishes", async (req, res) => {
  try {
    const user = await userInfo.findOne({
      _id: req.params.databaseID,
    })
    
    const listParser = (param : string) => param.split('&') 
    //console.log(listParser(""))

    user.flags = listParser(req.params.flags)
    user.wishes = listParser(req.params.wishes)
    await user.save()
    res.send(user)
    
  } catch (error) {
    res.status(404)
    res.send({error: "User was not found in the database"})
  }
})*/

router.get("/userAddWish/:userID/:alpha2code", async (req, res) => {
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

router.get("/userAddFlag/:userID/:alpha2code", async (req, res) => {
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

router.get("/userRemoveFlag/:userID/:alpha2code", async (req, res) => {
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

router.get("/userRemoveWish/:userID/:alpha2code", async (req, res) => {
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
