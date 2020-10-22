const express = require('express');
const Country = require("./models/countryModel") // new
const router = express.Router()

//file containing all endpoints


// Get all country information
router.get("/all", async (req, res) => {
    const options = { 
        projection: { _id: 0, name: 1, capital: 1 },
    }
    const country = await Country.find({capital: "Oslo"}, options)
	//const countries = await Country.find({}, )
	return res.send(country)
})

// Get all countries starting with

router.get("/name/:id", async (req, res) => {
    const id = req.params.id
    const query = { name: /^Sl/ }
	const country = await Country.find(query)
	return res.send(country)
})

// Get all countries from id
//nb!! case sensitive
router.get("/region/:id", async (req, res) => {
    const id = req.params.id
    const test = req.query.test
    //const query = { region: id};
	const country = await Country.find({region: id})
	return res.send(country)
})

// Get specific country from id
router.get("/country/:id", async (req, res) => {
    const id = req.params.id
	const country = await Country.find({alpha2Code: id})
	return res.send(country)
})

module.exports = router