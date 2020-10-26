interface filters{
  regions: Array<string>          // List of current regions to filter on
  areaGreater : boolean           // value for sorting out countries with area greater or lesser than area
  popGreater : boolean            // value for sorting out countries with population greater or lesser than pop
  area: number                    // threshold for area to filer on
  pop : number                    // threshold for population to filter on
}

export interface reduxState{
  currentCountries: CountriesResponse // List of alpha2code for the current countries that should be visible
  searchString: string
  skip : number            // Variable for the current page of the countrydisplay
  limit : number
  filters : filters
  regionsActive : boolean         // boolean values for if a filter is active or not
  areaActive: boolean
  popActive: boolean
}


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
