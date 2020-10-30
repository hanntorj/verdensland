import { useDispatch, useSelector } from "react-redux";
import { setSkipAction } from "../app/store";
import React from "react";
import { reduxState } from "../utilities/Interfaces";

export default function NavButtons() {
  // Navigate between results

  // Setup of store-actions
  const dispatch = useDispatch();
  const setSkip = (skip: number) => {
    dispatch(setSkipAction(skip));
  };

  // Setup of store-variables
  const store = useSelector((state: reduxState) => state);
  const skip = store.skip;
  const limit = store.limit;
  const countries = store.currentCountries;

  const handleNextClick = () => {
    window.scrollTo(0, 0);
    const nextSkip = skip + 1 * limit;
    setSkip(nextSkip);
  };

  const handlePreviousClick = () => {
    window.scrollTo(0, 0);
    const previousSkip = skip - 1 * limit;
    setSkip(previousSkip);
  };

  return (
    <div className="NavButton">
      {!!skip && (
        <button className="Button" type="button" onClick={handlePreviousClick}>
          Previous
        </button>
      )}
      {!!!(countries.length < limit) && (
        <button className="Button" type="button" onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>
  );
}
