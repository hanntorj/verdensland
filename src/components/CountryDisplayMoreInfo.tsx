import { count } from "console";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setCountryClickedAction } from "../app/store";
import { getCountryMoreInfo } from "../utilities/Fetch";
import {
  CountryMoreInfo,
  GetCountryMoreInfo,
  reduxState,
} from "../utilities/Interfaces";
import UserDataButtons from "./UserDataButtons";

function CountryDisplayMoreInfo() {
  const alpha2Code = useLocation().pathname.replace("/country/", "");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alpha2Code]);

  return (
    <div className="CountryDisplayMoreInfo">
      <div className="CountryHeader">
        <Link className="BackButton" to={"/"}>
          Back
        </Link>
        <h1>{countryClicked.name}</h1>
        <div className="BackButton" />
      </div>
      <div className="Country">
        <div className="CountryInfo">
          <p>
            <b>Capital:</b> {countryClicked.capital}
          </p>
          <p>
            <b>Population:</b> {countryClicked.population}
          </p>
          <p>
            <b>Area:</b> {countryClicked.area}
          </p>
          <p>
            <b>Region: </b>
            {countryClicked.region}
          </p>
          <p>
            <b>Sub region:</b> {countryClicked.subregion}
          </p>
          {!!countryClicked.languages && <b>Languages:</b>}
          {!!countryClicked.languages &&
            countryClicked.languages.map((language, index) => {
              return (
                <p className="ListItem" key={language.name}>
                  {language.name}({language.nativeName})
                </p>
              );
            })}
          {!!countryClicked.currencies && <b>Currencies:</b>}
          {!!countryClicked.currencies &&
            countryClicked.currencies.map((currency, index) => {
              return (
                <p className="ListItem" key={currency.name}>
                  {currency.name}({currency.symbol})({currency.code})
                </p>
              );
            })}
        </div>
        <div className="CountryFlag">
          <img
            src={countryClicked.flag}
            alt={alpha2Code}
            width="400px"
            height="200px"
          ></img>
          <UserDataButtons alpha={alpha2Code!} />
        </div>
      </div>
      {!!countryClicked.borders && <h3> Bordering countries</h3>}
      <ul className="Neighbours">
        {!!countryClicked.borders &&
          countryClicked.borders.map((neighbour) => (
            <li>
              <Link className="Neighbours" to={`${neighbour}`}>{neighbour} </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default connect()(CountryDisplayMoreInfo);
