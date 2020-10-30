import React from "react";
import Earth from "../svg/earth.svg";
import EarthFilled from "../svg/earth_filled.svg";
import { setCountriesAction, setTopMenuPickedAction } from "../app/store";
import {
  CountriesResponse,
  GetCountryList,
  reduxState,
} from "../utilities/Interfaces";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCountryList } from "../utilities/Fetch";

function MainPageButton() {
  // Button to show all countries depending on search/filter

  // Get redux-store
  const store = useSelector((state: reduxState) => state);
  const sort = store.sort;
  const skip = store.skip;
  const limit = store.limit;
  const filter = store.filters;
  const searchString = store.searchString;
  const topMenuPicked = store.topMenuPicked;

  // Setup of redux actions:
  const dispatch = useDispatch();
  const setCountries = (response: CountriesResponse) =>
    dispatch(setCountriesAction(response));
  const setTopMenuPicked = (response: string) =>
    dispatch(setTopMenuPickedAction(response));

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleSubmit = () => {
    const countryListRequest: GetCountryList = {
      sort,
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countryListRequest, filter);
    setTopMenuPicked("all");
  };

  return (
    <div>
      <button className="SVGButton" onClick={handleSubmit}>
        <img
          src={topMenuPicked === "all" ? EarthFilled : Earth}
          alt="earth"
          width="30px"
          height="30px"
        />
        <p>All countries</p>
      </button>
    </div>
  );
}

export default connect()(MainPageButton);
