const url = "https://restcountries.eu/rest/v2/";

export interface CountriesResponse {
  [index: number]: Array<CountrySummaryInfo>;
}

export interface CountrySummaryInfo {
  alpha: string;
  name: string;
  capital: string;
  area: string;
  population: string;
}

export interface GetCountryList {
  handleResponse: (countries: CountriesResponse) => void;
}

export async function getCountryList({ handleResponse }: GetCountryList) {
  const response = await fetch(url);
  const data = await response.json();
  handleResponse(data);
}
