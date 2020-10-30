import React from "react";
import Wish from "../svg/wish_filled.svg";
import Flag from "../svg/flag_filled.svg";
import { getWishes } from "../Fetch";
import { setCountriesAction } from "../app/store";
import { CountriesResponse, reduxState } from "../Interfaces";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

interface Props {
  type: string;
}

function UserDisplayButton(props: Props) {
  // Get redux-store
  const store = useSelector((state: reduxState) => state);

  // Setup of redux actions:
  const dispatch = useDispatch();
  const setCountries = (response: CountriesResponse) =>
    dispatch(setCountriesAction(response));

  const handleResponse = (response: CountriesResponse) => {
    if (response) setCountries(response);

    return (
      <Route>
        <Redirect to="/country/AF" />
      </Route>
    );
  };

  switch (props.type) {
    case "WISH":
      return (
        <button onClick={() => getWishes(store.user.wishes, handleResponse)}>
          <img src={Wish} alt="flag" width="30px" height="30px" />
        </button>
      );
    case "FLAG":
      return (
        <button onClick={() => getWishes(store.user.flags, handleResponse)}>
          <img src={Flag} alt="flag" width="30px" height="30px" />
          <p>Visited</p>
        </button>
      );
    default:
      return <></>;
  }
}

export default connect()(UserDisplayButton);
