import { searchCountries } from "./Interfaces";

const url = "https://restcountries.eu/rest/v2/";
// const url = "http://localhost:8080/api/";

export async function getCountryList({
  searchString,
  handleResponse,
  limit,
  skip,
}: searchCountries) {
  const response = await fetch(
    url + "?search=" + `${searchString}&limit=${limit}&skip=${skip}`
  );
  const data = await response.json();
  handleResponse(data);
}
