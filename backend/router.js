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
	return res.send(countries)
})

// Get all countries in europe

router.get("/region/europe", async (req, res) => {
	const name = await Country.find({'region': 'Europe'})
	return res.send(name)
})



module.exports = router