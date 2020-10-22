// const url = "https://restcountries.eu/rest/v2/";
const url = "http://localhost:8080/api/all"

export interface CountriesResponse extends Array<CountrySummaryInfo>{}

export interface CountrySummaryInfo {
  alpha2Code: string;
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
