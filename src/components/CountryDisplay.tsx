import React, { useEffect } from "react";
import {
  reduxState,
  GetCountryList,
  CountriesResponse,
  CountrySummaryInfo,
} from "../utilities/Interfaces";
import { getCountryList } from "../utilities/Fetch";
import Country from "./Country";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCountriesAction } from "../app/store";
import NavButtons from "./NavButtons";

function CountryDisplay() {
  // Fetches and displays countries from database according to user input/choices

  // Setup of store-actions
  const dispatch = useDispatch();
  const setCountries = (countries: CountriesResponse) => {
    dispatch(setCountriesAction(countries));
  };

  // Setup of store-variables
  const store = useSelector((state: reduxState) => state);
  const sort = store.sort;
  const skip = store.skip;
  const limit = store.limit;
  const filter = store.filters;
  const countries = store.currentCountries;
  const searchString = store.searchString;

  const handleResponse = (countriesResponse: CountriesResponse) => {
    if (countriesResponse) setCountries(countriesResponse);
  };

  useEffect(() => {
    // Gets summary info about all countries that fits search/filter inputs
    const countryListRequest: GetCountryList = {
      sort,
      searchString,
      handleResponse,
      limit,
      skip,
    };
    getCountryList(countryListRequest, filter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, sort, filter]);

  return (
    <div className="CountryDisplay">
      <div className="CountriesListed">
        {!!countries && (
          <ul className="ListCountries">
            {countries.map((country: CountrySummaryInfo) => {
              return <Country key={country.alpha2Code} {...country} />;
            })}
          </ul>
        )}
        {!!!countries.length && <p>No countries to display</p>}
      </div>
      <NavButtons />
    </div>
  );
}

export default connect()(CountryDisplay);
