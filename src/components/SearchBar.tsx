import React from "react";
import {
  reduxState,
  CountriesResponse,
  GetCountryList,
} from "../utilities/Interfaces";
import { getCountryList } from "../utilities/Fetch";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setCountriesAction,
  setSearchStringAction,
  setSkipAction,
} from "../app/store";

function SearchBar() {
  // Searchbar to search after countries in database

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
  const store = useSelector((state: reduxState) => state);
  const searchString = store.searchString;
  const sort = store.sort;
  const filter = store.filters;
  const skip = store.skip;
  const limit = store.limit;

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleChange = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    // Savesinput from searchbar to redux store
    const inputValue = inputEvent.target.value;
    setSearchString(inputValue);
  };

  const handleSubmit = () => {
    // Handles search for submitet input in searchbar
    window.scrollTo(0, 0);
    setSkip(0);
    const countriesRequest: GetCountryList = {
      sort,
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countriesRequest, filter);
  };

  const handleEnter = (event: any) => {
    // Enter input in searchbar works as submitbutton
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="SearchBar">
      <div>
        <label htmlFor="countriesSearch">
          <input
            className="inputSearch"
            id="searchBar"
            data-testid="searchInput"
            type="text"
            name="searchBar"
            onChange={(input) => handleChange(input)}
            onKeyPress={handleEnter}
            value={searchString}
          />
        </label>
        <button
          id="searchButton"
          data-testid="searchButton"
          className="Button"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default connect()(SearchBar);
