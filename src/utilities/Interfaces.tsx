export interface Filters {
  regions: Array<string>; // List of current regions to filter on
  areaMin: number; // threshold for minimum area to filer on
  areaMax: number; // threshold for maximum area to filer on
  popMin: number; // threshold for minimum population to filter on
  popMax: number; // threshold for maximum population to filter on
  areaActive: boolean;
  popActive: boolean;
}

export interface User {
  _id: string,
  wishes: Array<string>,
  flags:  Array<string>
}

export interface reduxState {
  currentCountries: CountriesResponse; // List of alpha2code for the current countries that should be visible
  countryClicked: CountryMoreInfo;
  searchString: string;
  skip: number; // Variable for the current page of the countrydisplay
  limit: number;
  filters: Filters;
  sort: string;
  user: User;
  topMenuPicked: string;
}

export interface CountriesResponse extends Array<CountrySummaryInfo> {}

export interface CountrySummaryInfo {
  alpha2Code: string;
  name?: string;
  capital?: string;
  population?: number;
  region?: string;
  flag?: string;
}

export interface CountryMoreInfo {
  alpha2Code: string;
  name?: string;
  capital?: string;
  area?: number;
  population?: number;
  region?: string;
  subregion?: string;
  demonym?: string;
  currencies?: string;
  borders: Array<string>;
  flag?: string
}

export interface GetCountryList {
  sort: string;
  searchString: string;
  handleResponse: (countries: CountriesResponse) => void;
  limit: number;
  skip: number;
}


export interface GetCountryMoreInfo {
  alpha2Code: string;
  handleResponse: (country: CountryMoreInfo) => void;
}