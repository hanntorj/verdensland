import React, { useState, useEffect } from 'react';
import {getCountryList, GetCountryList} from '../Fetch';
import{CountriesResponse,  CountrySummaryInfo} from '../Fetch';
import Country from './Country'

export default function CountryDisplay() {
    const [countries, setCountries] = useState<Array<CountrySummaryInfo>>([]);

    const handleResponse = (countriesResponse: CountriesResponse) => {
        if (countriesResponse && countriesResponse.results)
          setCountries(countriesResponse.results);
          console.log(countriesResponse)
      };
    
      useEffect(() => {
        const countryListRequest: GetCountryList = {
          handleResponse
        };
        getCountryList(countryListRequest);
      }, []);

    return (
        <div className="CountryDisplay">
          <ul>
            {countries.map((character: CountrySummaryInfo) => {
              return <Country key={character.alpha} {...character} />;
            })}
          </ul>
        </div>
      );
}