import React, { useState, useEffect } from "react";
import {
  GetCountryList,
  CountriesResponse,
  CountrySummaryInfo,
} from "../Interfaces";
import { getCountryList } from "../Fetch";
import Country from "./Country";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCountriesAction, reduxState } from "../app/store";

function CountryDisplay() {
  const [skip, setSkip] = useState(0);
  const limit = 6;
  const dispatch = useDispatch();
  const setCountries = (countries : CountriesResponse) => {dispatch(setCountriesAction(countries))};
  const countries = useSelector((state: reduxState) => state.currentCountries);
  const searchString = useSelector((state: reduxState) => state.searchString);

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  useEffect(() => {
    const countryListRequest: GetCountryList = {
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countryListRequest);
  }, [skip]);

  const handleNextClick = () => {
    const nextSkip = skip + 1 * limit;
    setSkip(nextSkip);
  };

  const handlePreviousClick = () => {
    const previousSkip = skip - 1 * limit;
    setSkip(previousSkip);
  };

  return (
    <div className="CountryDisplay">
      {!!countries && (
        <ul>
          {countries.map((country: CountrySummaryInfo) => {
            return <Country key={country.alpha2Code} {...country} />;
          })}
        </ul>
      )}
      <div>
        {!!skip && (
          <button
            className="button"
            type="button"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}
        {!!!(countries.length < limit) && (
          <button className="button" type="button" onClick={handleNextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default connect()(CountryDisplay);
