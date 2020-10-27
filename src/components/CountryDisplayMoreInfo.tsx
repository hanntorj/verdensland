import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom'
import {
  setCountryClickedAction
} from "../app/store";
import { getCountryMoreInfo } from "../Fetch";
import { CountryMoreInfo, GetCountryMoreInfo, reduxState } from "../Interfaces";
import UserDataButtons from "./UserDataButtons";

function CountryDisplayMoreInfo() {
  const alpha2Code = useLocation().pathname.replace('/country/','');

  const dispatch = useDispatch();
  const setCountryClicked = (countryClicked: CountryMoreInfo) => {
    dispatch(setCountryClickedAction(countryClicked));
  };
  const countryClicked = useSelector(
    (state: reduxState) => state.countryClicked
  );

  const handleResponse = (countryResponse: CountryMoreInfo) => {
    if (countryResponse) setCountryClicked(countryResponse);
  };

  useEffect(() => {
    const countryMoreInfoRequest: GetCountryMoreInfo = {
      alpha2Code,
      handleResponse,
    };
    getCountryMoreInfo(countryMoreInfoRequest);
  }, [alpha2Code]);

  return (
    <div className="CountryDisplayMoreInfo">
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
        <h2>{countryClicked.name}</h2>
        <UserDataButtons alpha={alpha2Code!} />
        <div>capital: {countryClicked.capital}</div>
        <div>Population: {countryClicked.population}</div>
        <div>Region: {countryClicked.region}</div>
        <Link to={"/"}>
        Back to main page
      </Link>
      </div>
    </div>
  );
}
export default connect()(CountryDisplayMoreInfo);
