import React from "react";
import Flag from "../svg/flag.svg";
import FlagFilled from "../svg/flag_filled.svg";
import Wish from "../svg/wish.svg";
import WishFilled from "../svg/wish_filled.svg";
import { getUserCountries } from "../utilities/Fetch";
import { setCountriesAction, setTopMenuPickedAction } from "../app/store";
import { CountriesResponse, reduxState } from "../utilities/Interfaces";
import { connect, useDispatch, useSelector } from "react-redux";

interface Props {
  type: string;
}

function UserDisplayButton(props: Props) {
  // Get redux-store
  const store = useSelector((state: reduxState) => state);
  const topMenuPicked = store.topMenuPicked;

  // Setup of redux actions:
  const dispatch = useDispatch();
  const setCountries = (response: CountriesResponse) =>
    dispatch(setCountriesAction(response));
  const setTopMenuPicked = (response: string) =>
    dispatch(setTopMenuPickedAction(response));

  const handleResponse = (response: CountriesResponse) => {
    if (response) setCountries(response);
  };
  

  switch (props.type) {
    case "FLAG":
      return (
        <button
          className="SVGButton"
          onClick={() => {
            getUserCountries(store.user.flags, handleResponse);
            setTopMenuPicked("flag");
          }}
        >
          <img src={topMenuPicked === "flag" ? FlagFilled : Flag} alt="flag" width="30px" height="30px" />
          <p>Visited</p> {console.log(topMenuPicked)}
        </button>
      );
    case "WISH":
      return (
        <button
          className="SVGButton"
          onClick={() => {getUserCountries(store.user.wishes, handleResponse); setTopMenuPicked("wish");}}
        >
          <img src={topMenuPicked === "wish" ? WishFilled : Wish} alt="wish" width="30px" height="30px" />
          <p>Wish</p>
        </button>
      );
    default:
      return <></>;
  }
}

export default connect()(UserDisplayButton);
