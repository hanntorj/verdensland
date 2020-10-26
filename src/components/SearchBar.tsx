import React, { useState } from "react";
import {
  CountriesResponse,
  searchCountries,
} from "../Interfaces";
import { getCountryList } from "../Fetch";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCountriesAction, setSearchStringAction, setSkipAction, reduxState } from "../app/store";

function SearchBar() {
  const dispatch = useDispatch();
  const setCountries = (countries : CountriesResponse) => {dispatch(setCountriesAction(countries))};
  const searchString = useSelector((state: reduxState) => state.searchString);
  const setSearchString = (searchString : string) => {dispatch(setSearchStringAction(searchString))};
  const skip = useSelector((state: reduxState) => state.skip);
  const setSkip = (skip : number) => {dispatch(setSkipAction(skip))};
  const limit = useSelector((state: reduxState) => state.limit);

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleSubmit = () => {
    setSkip(0)
    const countriesRequest: searchCountries = {
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countriesRequest);
  };

  const handleChange = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = inputEvent.target.value;
    setSearchString(inputValue);
  };

  return (
    <div className="SearchBar">
      <div>
        <label htmlFor="countriesSearch">
          <input
            className="input"
            id="searchBar"
            type="text"
            name="searchBar"
            onChange={(input) => handleChange(input)}
          />
        </label>
        <button className="button" type="button" onClick={handleSubmit}>
          Søk
        </button>
      </div>
    </div>
  );
}

export default connect()(SearchBar);
