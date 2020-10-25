export interface CountriesResponse extends Array<CountrySummaryInfo> {}

export interface CountrySummaryInfo {
  alpha2Code?: string;
  name?: string;
  capital?: string;
  population?: number;
  region?: string;
  wish?: boolean,
  flag?: boolean,
  wishSVG?: any,
  flagSVG?: any
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
  searchString: string
  handleResponse: (countries: CountriesResponse) => void;
  limit: number;
  skip: number;
}
