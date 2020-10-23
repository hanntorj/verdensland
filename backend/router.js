const express = require('express');
const Country = require("./models/countryModel") // new
const router = express.Router()

//file containing all endpoints


// Get all country information
router.get("/all", async (req, res) => {
    const limit =  req.query.limit
    const skip = req.query.skip
    try {
        const country = await Country.find().skip(parseInt(skip)).limit(parseInt(limit))
        return res.send(country)
    }
    catch(e) {
       return res.send(e)
    }
    
	//const countries = await Country.find({}, )
	
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
router.get("/countries/", async (req, res) => {
    const id = req.params.id
    const test = req.query.region
    //const query = { region: id};
	const country = await Country.find({region: test})
	return res.send(country)
})

// Get specific country from id
router.get("/country/:id", async (req, res) => {
    const id = req.params.id
	const country = await Country.find({alpha2Code: id})
	return res.send(country)
})

module.exports = router