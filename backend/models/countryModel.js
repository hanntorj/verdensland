const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: {type: String},
    alpha2Code: {type: String, required: true},
    capital: {type: String},
    region: {type: String},
    population: {type: Number},
    area: {type: Number}
}, {collection: 'prosjekt3'})

const country = mongoose.model("Country", CountrySchema)

module.exports = country
