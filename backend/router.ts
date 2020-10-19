import express = require('express');

const Country = require("./models/Country") // new
const router = express.Router()

// Get all countries
router.get("/countries", async (req, res) => {
	const countries = await Country.find()
	res.send(countries)
})

module.exports = router