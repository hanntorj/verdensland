import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CountrySummaryInfo } from "../utilities/Interfaces";
import UserDataButtons from "./UserDataButtons";

function Country({
  alpha2Code,
  name,
  capital,
  population,
  area,
  region,
  flag,
}: CountrySummaryInfo) {
  return (
    <div className="CountryItem">
      <img src={flag} alt={alpha2Code} height="200px"></img>
      <h2>{name}</h2>
      <UserDataButtons alpha={alpha2Code!} />
      <div>capital: {capital}</div>
      <div>Population: {population}</div>
      <div>Area: {area}</div>
      <div>Region: {region}</div>
      <Link to={`country/${alpha2Code}`}>See more</Link>
    </div>
  );
}
export default connect()(Country);
