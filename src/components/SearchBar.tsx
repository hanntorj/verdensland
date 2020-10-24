import React, { useState } from "react";
import {
  CountriesResponse,
  searchCountries,
  getSearchCountries,
  CountryMoreInfo,
} from "../Fetch";
import Country from "./Country";

export default function SearchBar() {
  const [searchString, setSearchString] = useState<string>("");
  const [countries, setCountries] = useState<CountriesResponse>([]);
  const [skip, setSkip] = useState(0);
  const limit = 6;

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  const handleSubmit = () => {
    if (searchString === "") return;
    const countriesRequest: searchCountries = {
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getSearchCountries(countriesRequest);
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
      {/* TODO this needs to be moves */}
      <div>
        {countries.map((country: CountryMoreInfo) => {
          return <Country key={country.alpha2Code} {...country} />;
        })}
      </div>
      {console.log(searchString)}
    </div>
  );
}