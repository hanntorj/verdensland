import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { User, reduxState } from "../utilities/Interfaces";
import {
  addFlagsAction,
  addWishesAction,
  removeFlagsAction,
  removeWishesAction,
} from "../app/store";
import {
  userAddFlag,
  userAddWish,
  userRemoveFlag,
  userRemoveWish,
} from "../utilities/Fetch";
import Wish from "../svg/wish.svg";
import WishFilled from "../svg/wish_filled.svg";
import Flag from "../svg/flag.svg";
import FlagFilled from "../svg/flag_filled.svg";

interface Props {
  alpha: string;
}

function UserDataButtons(props: Props) {
  // Buttons to save user countries(as visited or wish to visit) to database

  // Setup for fetching redux-store
  const user: User = useSelector((state: reduxState) => state.user);

  // Setup for actions to modify redux-store
  const dispatch = useDispatch();
  const addFlag = (alpha: string) => dispatch(addFlagsAction(alpha));
  const addWish = (alpha: string) => dispatch(addWishesAction(alpha));
  const removeFlag = (alpha: string) => dispatch(removeFlagsAction(alpha));
  const removeWish = (alpha: string) => dispatch(removeWishesAction(alpha));

  const handleFlag = () => {
    if (user.flags.includes(props.alpha)) {
      userRemoveFlag(props.alpha, user._id);
      removeFlag(props.alpha);
    } else {
      userAddFlag(props.alpha, user._id);
      addFlag(props.alpha);
    }
  };

  const handleWish = () => {
    if (user.wishes.includes(props.alpha)) {
      userRemoveWish(props.alpha, user._id);
      removeWish(props.alpha);
    } else {
      userAddWish(props.alpha, user._id);
      addWish(props.alpha);
    }
  };

  return (
    <div className="ButtonBox">
      <button className="SVGButton" onClick={() => handleFlag()}>
        <img
          src={user.flags.includes(props.alpha) ? FlagFilled : Flag}
          alt="wish"
          width="30px"
          height="30px"
        />
        <p>Visited</p>
      </button>
      <button className="SVGButton" onClick={() => handleWish()}>
        <img
          src={user.wishes.includes(props.alpha) ? WishFilled : Wish}
          alt="wish"
          width="30px"
          height="30px"
        />
        <p>Wish to travel</p>
      </button>
    </div>
  );
}

export default connect()(UserDataButtons);
