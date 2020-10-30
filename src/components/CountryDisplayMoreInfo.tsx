import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setCountryClickedAction } from "../app/store";
import { getCountryMoreInfo, getUserCountries } from "../utilities/Fetch";
import {
  CountriesResponse,
  CountryMoreInfo,
  CountrySummaryInfo,
  GetCountryMoreInfo,
  reduxState,
} from "../utilities/Interfaces";
import UserDataButtons from "./UserDataButtons";

function CountryDisplayMoreInfo() {
  const [neighboursNames, setNeighboursName] = useState<
    Array<CountrySummaryInfo>
  >([]);
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

  const handleNeighboursResponse = (response: CountriesResponse) => {
    if (response) setNeighboursName(response);
  };

  const neighboursResponse = () => {
    if (countryClicked.borders) {
      getUserCountries(countryClicked.borders, handleNeighboursResponse);
    }
    return Promise.resolve(1);
  };

  useEffect(() => {
    const countryMoreInfoRequest: GetCountryMoreInfo = {
      alpha2Code,
      handleResponse,
    };

    getCountryMoreInfo(countryMoreInfoRequest);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alpha2Code]);

  useEffect(() => {
    neighboursResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryClicked]);

  return (
    <div className="CountryDisplayMoreInfo">
      <div className="CountryHeader">
        <Link className="BackButton" to={"/"}>
          Back to home page
        </Link>
        <h1>{countryClicked.name}</h1>
        <div className="UserButtons">
          <UserDataButtons alpha={alpha2Code!} />
        </div>
      </div>
      <div className="Country">
        <div className="CountryFlag">
          <img src={countryClicked.flag} alt={alpha2Code} width="300px"></img>
          <div className="ListBorderingCountries">
            {!!countryClicked.borders && <h3> View bordering countries</h3>}
            <ul className="Neighbours">
              {!!countryClicked.borders &&
                neighboursNames.map((neighbour) => (
                  <li>
                    <Link className="Neighbours" to={`${neighbour.alpha2Code}`}>
                      {neighbour.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="CountryInfo">
          <p>
            <b>Capital:</b> The capital of {countryClicked.name} is{" "}
            {countryClicked.capital}
          </p>
          <p>
            <b>Population name: </b>A person from {countryClicked.name} is
            called {countryClicked.demonym}
          </p>
          <p>
            <b>Population:</b> {countryClicked.population} people live in{" "}
            {countryClicked.name}
          </p>
          <p>
            <b>Area:</b> {countryClicked.area} km<sup>2</sup>
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
                  A language spoken in {countryClicked.name} is {language.name}{" "}
                  ({language.nativeName})
                </p>
              );
            })}
          {!!countryClicked.currencies && <b>Currencies:</b>}
          {!!countryClicked.currencies &&
            countryClicked.currencies.map((currency, index) => {
              return (
                <p className="ListItem" key={currency.name}>
                  The currency used in {countryClicked.name} is {currency.name}{" "}
                  ({currency.symbol}) ({currency.code})
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default connect()(CountryDisplayMoreInfo);
