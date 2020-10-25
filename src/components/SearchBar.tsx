import React, { useState } from "react";
import {
  CountriesResponse,
  searchCountries,
} from "../Interfaces";
import { getCountryList } from "../Fetch";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCountriesAction, setSearchStringAction, reduxState } from "../app/store";

function SearchBar() {
  // const [searchString, setSearchString] = useState<string>("");
  const [skip, setSkip] = useState(0);
  const limit = 6;
  const dispatch = useDispatch();
  const setCountries = (countries : CountriesResponse) => {dispatch(setCountriesAction(countries))};
  const searchString = useSelector((state: reduxState) => state.searchString);
  const setSearchString = (searchString : string) => {dispatch(setSearchStringAction(searchString))};


  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleSubmit = () => {
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
