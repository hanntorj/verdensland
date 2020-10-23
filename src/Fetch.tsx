// const url = "https://restcountries.eu/rest/v2/";
const url = "http://localhost:8080/api";

export interface CountriesResponse extends Array<CountrySummaryInfo> {}


export interface CountrySummaryInfo {
  alpha2Code?: string;
  name?: string;
  capital?: string;
  population?: number;
  region?: string;
}

export interface CountryMoreInfo {
  alpha2Code?: string;
  name?: string;
  capital?: string;
  area?: number;
  population?: number;
  region?: string;
  subregion?: string;
  demonym?: string;
  currencies?: string;
}

export interface searchCountries {
  searchString: string;
  handleResponse: (countries: CountriesResponse) => void;
  limit: number;
  skip: number;
}

export interface GetCountryList {
  handleResponse: (countries: CountriesResponse) => void;
  limit: number;
  skip: number;
}

export async function getCountryList({
  handleResponse,
  limit,
  skip,
}: GetCountryList) {
  const response = await fetch(
    url+'/all'+`?limit=${ limit }&skip=${ skip }`
  )
  const data = await response.json();
  handleResponse(data);
}

export async function getSearchCountries({
  searchString,
  handleResponse,
  limit,
  skip,
}: searchCountries) {
  const response = await fetch(
    url +'?search='+ `${searchString}`
  );
  const data = await response.json();
  handleResponse(data);
}