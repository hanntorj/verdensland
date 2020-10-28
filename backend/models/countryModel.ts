import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CountrySchema = new Schema(
  {
    name: { type: String },
    alpha2Code: { type: String },
    capital: { type: String },
    region: { type: String },
    population: { type: Number },
    area: { type: Number },
    borders: {type: Array }, 
    altSpellings : {type: Array}
  },
  { collection: "country" }
);

const country = mongoose.model("Country", CountrySchema);

module.exports = country;
