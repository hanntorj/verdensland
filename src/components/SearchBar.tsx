import React from "react";
import { reduxState, CountriesResponse, GetCountryList } from "../Interfaces";
import { getCountryList } from "../Fetch";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setCountriesAction,
  setSearchStringAction,
  setSkipAction,
} from "../app/store";

function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const setCountries = (countries: CountriesResponse) => {
    dispatch(setCountriesAction(countries));
  };
  const searchString = useSelector((state: reduxState) => state.searchString);
  const setSearchString = (searchString: string) => {
    dispatch(setSearchStringAction(searchString));
  };
  const skip = useSelector((state: reduxState) => state.skip);
  const setSkip = (skip: number) => {
    dispatch(setSkipAction(skip));
  };
  const limit = useSelector((state: reduxState) => state.limit);

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleSubmit = () => {
    setSkip(0);
    // history.push('/')
    const countriesRequest: GetCountryList = {
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
            value={searchString}
          />
        </label>
        <button className="button" type="button"  onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
}

export default connect()(SearchBar);
