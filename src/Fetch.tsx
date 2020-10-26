import { GetCountryMoreInfo, GetCountryList } from "./Interfaces";

const url = "https://restcountries.eu/rest/v2/";
// const url = "http://localhost:8080/api/";

export async function getCountryList({
  searchString,
  handleResponse,
  limit,
  skip,
}: GetCountryList) {
  const response = await fetch(
    url + "?search=" + `${searchString}&limit=${limit}&skip=${skip}`
  );
  const data = await response.json();
  handleResponse(data);
}

export async function getCountryMoreInfo({
  alpha2Code,
  handleResponse,
}: GetCountryMoreInfo) {
  const response = await fetch(
    url+'country/' + `${alpha2Code}`
  )
  const data = await response.json();
  
  handleResponse(data[0]);
}
