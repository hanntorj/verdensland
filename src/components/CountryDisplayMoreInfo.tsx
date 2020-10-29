import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setCountryClickedAction } from "../app/store";
import { getCountryMoreInfo } from "../Fetch";
import { CountryMoreInfo, GetCountryMoreInfo, reduxState } from "../Interfaces";
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
      <Link className="BackButton" to={"/"}>
        Back
      </Link>
      <div className="character">
        <img
          src={countryClicked.flag}
          alt={alpha2Code}
          width="400px"
          height="200px"
        ></img>
        <h2>{countryClicked.name}</h2>
        <UserDataButtons alpha={alpha2Code!} />
        <div>capital: {countryClicked.capital}</div>
        <div>Population: {countryClicked.population}</div>
        <div>Region: {countryClicked.region}</div>
        <div>
          <h3>Bordering countries:</h3>
          {countryClicked.borders.map((neighbour) => (
            <Link to={`${neighbour}`}>{neighbour}, </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default connect()(CountryDisplayMoreInfo);
