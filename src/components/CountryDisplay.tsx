import React, { useState, useEffect } from "react";
import { getCountryList, GetCountryList } from "../Fetch";
import { CountriesResponse, CountrySummaryInfo } from "../Fetch";
import Country from "./Country";

export default function CountryDisplay() {
  const [countries, setCountries] = useState<Array<CountrySummaryInfo>>([]);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  useEffect(() => {
    const countryListRequest: GetCountryList = {
      handleResponse,
      limit,
      skip
    };
    getCountryList(countryListRequest);
  }, [skip]);

  const handleNextClick = () => {
    const nextSkip = skip + 1 * limit;
    setSkip(skip + 1 * limit);
  };

  const handlePreviousClick = () => {
    const previousSkip = skip - 1 * limit;
    setSkip(skip - 1 * limit);
  };

  return (
    <div className="CountryDisplay">
      <ul>
        {countries.map((country: CountrySummaryInfo) => {
          return <Country key={country.alpha2Code} {...country} />;
        })}
      </ul>
     <div> <button className="button" type="button" onClick={handleNextClick}>
        Next
      </button>
      <button className="button" type="button" onClick={handlePreviousClick}>
        Previous
      </button></div>
    </div>
  );
}
