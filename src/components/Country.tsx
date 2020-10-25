import React, { useState } from "react";
import { CountrySummaryInfo } from "../Fetch";
import Wish from '../svg/wish.svg'
import WishFilled from '../svg/wish_filled.svg'
import Flag from '../svg/flag.svg'
import FlagFilled from '../svg/flag_filled.svg'

interface Props{
  countryID: string,

  wish: boolean, //Disse hentes fra databasen og brukes for at symbolene skal settes på refresh 
  flag: boolean
}


export default function Country({
  alpha2Code,
  name,
  capital,
  population,
  region,
  wish,
  flag,
  wishSVG,
  flagSVG,
}: CountrySummaryInfo) {

  return (
    <div className="character">
      <img
        src={
          "https://raw.githubusercontent.com/cristiroma/countries/c6edc915f71c06441fab4da306deac95a28d70aa/data/flags/SVG/" +
          alpha2Code +
          ".svg"
        }
        alt={alpha2Code}
        width="400px"
        height="200px"
      ></img>
      <h2>{name}</h2>
      <div>capital: {capital}</div>
      <div>Population: {population}</div>
      <div>Region: {region}</div>
      {/* <Link to={`country/${alpha2Code}`}>See more</Link> */}
    </div>
  );
}
