const url = "https://restcountries.eu/rest/v2/";

export interface CountriesResponse {
  count: number;
  next: unknown;
  previous: unknown;
  results: Array<CountrySummaryInfo>;
}

export interface CountrySummaryInfo {
  alpha: string;
  name: string;
  capitol: string;
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
