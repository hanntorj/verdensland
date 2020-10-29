import React from "react";
import { reduxState, CountriesResponse, GetCountryList } from "../Interfaces";
import { getCountryList } from "../Fetch";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setCountriesAction,
  setSearchStringAction,
  setSkipAction,
} from "../app/store";

function SearchBar() {
  // Setup of store actions
  const dispatch = useDispatch();
  const setSearchString = (searchString: string) => {
    dispatch(setSearchStringAction(searchString));
  };
  const setCountries = (countries: CountriesResponse) => {
    dispatch(setCountriesAction(countries));
  };
  const setSkip = (skip: number) => {
    dispatch(setSkipAction(skip));
  };

  // Setup of store variables
  const store = useSelector((state: reduxState) => state)
  const searchString = store.searchString;
  const sort = store.sort;
  const filter = store.filters;
  const skip = store.skip;
  const limit = store.limit;

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleSubmit = () => {
    setSkip(0);
    // history.push('/')
    const countriesRequest: GetCountryList = {
      sort,
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countriesRequest, filter);
  };

  const handleChange = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = inputEvent.target.value;
    setSearchString(inputValue);
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

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
            onKeyPress={handleEnter}
            value={searchString}
          />
        </label>
        <button className="Button" type="button"  onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
}

export default connect()(SearchBar);
