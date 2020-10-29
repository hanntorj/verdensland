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

    if (filter.areaActive) {
    fetchUrl += "&minArea=" + filter.areaMin;
    if (filter.areaMax) {
      fetchUrl += "&maxArea" + filter.areaMax;
    }
  }
  if (filter.popActive) {
    fetchUrl += "&minPop=" + filter.popMin;
    if (filter.popMax) {
      fetchUrl += "&maxPop" + filter.popMax;
    }
  }
  if (filter.regions) {
    for (const region in filter.regions) {
      fetchUrl += "&region=" + filter.regions[region];
    }
  }

  console.log(fetchUrl);
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

export async function requestUserID(
  handleResponse: (responseJSON: User) => void
) {
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
