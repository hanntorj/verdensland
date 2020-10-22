const express = require('express');
const Country = require("./models/countryModel") // new
const router = express.Router()

//file containing all endpoints

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Get all country information
router.get("/all", async (req, res) => {
    const countries = await Country.find({})
	//const countries = await Country.find({}, { projection: {"_id": 1, "name": 1, "alpha2Code": 1, "capital": 1, "region": 1, "population": 1, "area": 1 }})
	return res.send(countries)
})

// Get all countries in europe

router.get("/region/europe", async (req, res) => {
    var query = { name: /^S/ };
	const name = await Country.find(query)
	return res.send(name)
})

// Get all countries from northern europe
router.get("/region/north", async (req, res) => {
    var query = { subregion: "Northern Europe"};
	const name = await Country.find(query)
	return res.send(name)
})

router.get("/country/:id", async (req, res) => {
    const id = req.params.id
    var query = { alpha2Code: id};
	const name = await Country.find(query)
	return res.send(name)
})


module.exports = router