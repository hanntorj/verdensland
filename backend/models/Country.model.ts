import mongoose = require("mongoose")
import { Schema } from 'mongoose'

const CountrySchema: Schema = new Schema({
    name: {type: String},
    //countryId: {type: String, required: true},
    capital: {type: String},
    region: {type: String},
    population: {type: Number},
    area: {type: Number}
})

module.exports = mongoose.model("Country", CountrySchema)