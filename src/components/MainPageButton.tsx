import React from "react";
import { setCountriesAction } from "../app/store";
import { CountriesResponse, GetCountryList, reduxState } from "../Interfaces";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCountryList } from "../Fetch";
import { Redirect } from "react-router-dom";

function MainPageButton() {
  // Get redux-store
  const store = useSelector((state: reduxState) => state);
  const sort = store.sort;
  const skip = store.skip;
  const limit = store.limit;
  const filter = store.filters;
  const searchString = store.searchString;

  // Setup of redux actions:
  const dispatch = useDispatch();
  const setCountries = (response: CountriesResponse) =>
    dispatch(setCountriesAction(response));

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
  };

  return (
    <div>
      <button onClick={handleSubmit}>All countries</button>
      <Redirect to="/" />
    </div>
  );
}

export default connect()(MainPageButton);
