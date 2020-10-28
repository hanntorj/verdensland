import {
  GetCountryMoreInfo,
  GetCountryList,
  User,
  Filters,
} from "./Interfaces";

// const url = "https://restcountries.eu/rest/v2/";
const url = "http://localhost:5000/api/";

export async function getCountryList(
  { sort, searchString, handleResponse, limit, skip }: GetCountryList,
  filter: Filters
) {
  let fetchUrl =
    url +
    "?search=" +
    `${searchString}&limit=${limit}&skip=${skip}&sort=${sort}`;
  if (filter.popActive) {
    fetchUrl += "&pop=" + filter.pop;
    if (filter.popGreater) {
      fetchUrl += "&popString=gt";
    } else {
      fetchUrl += "&popString=lt";
    }
  }
  if (filter.areaActive) {
    fetchUrl += "&area=" + filter.area;
    if (filter.areaGreater) {
      fetchUrl += "&areaString=gt";
    } else {
      fetchUrl += "&areaString=lt";
    }
  }
  if (filter.regions) {
    for (const region in filter.regions) {
      fetchUrl += "&region=" + filter.regions[region];
    }
  }
  const response = await fetch(fetchUrl);
  const responseJSON = await response.json();
  handleResponse(responseJSON);
}

export async function getCountryMoreInfo({
  alpha2Code,
  handleResponse,
}: GetCountryMoreInfo) {
  const response = await fetch(url + "country/" + `${alpha2Code}`);
  const responseJSON = await response.json();

  handleResponse(responseJSON[0]);
}

export async function requestUserID(handleResponse: (responseJSON: User) => void) {
  const response = await fetch(url + "requestUserID");
  const responseJSON = await response.json();

  handleResponse(responseJSON);
}

export async function getUserData(
  handleResponse: (responseJSON: User) => void,
  userID: string
) {
  const response = await fetch(url + "getUserData/" + userID);
  const responseJSON = await response.json();

  handleResponse(responseJSON);
}

export async function userRemoveFlag(alpha: string, userID: string) {
  await fetch(url + "userRemoveFlag/" + userID + "/" + alpha);
}

export async function userRemoveWish(alpha: string, userID: string) {
  await fetch(url + "userRemoveWish/" + userID + "/" + alpha);
}

export async function userAddFlag(alpha: string, userID: string) {
  await fetch(url + "userAddFlag/" + userID + "/" + alpha);
}

export async function userAddWish(alpha: string, userID: string) {
  await fetch(url + "userAddWish/" + userID + "/" + alpha);
}
