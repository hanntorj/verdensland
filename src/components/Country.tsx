import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CountrySummaryInfo } from "../Interfaces";
import UserDataButtons from "./UserDataButtons";

function Country({
  alpha2Code,
  name,
  capital,
  population,
  region,
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
      <UserDataButtons alpha={alpha2Code!} />
      <div>capital: {capital}</div>
      <div>Population: {population}</div>
      <div>Region: {region}</div>
      <Link to={`country/${alpha2Code}`}>
        See more  
      </Link>
    </div>
  );
}
export default connect()(Country);
