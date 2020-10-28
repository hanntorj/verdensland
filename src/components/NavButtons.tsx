import React, { useState, useEffect } from "react";
// TODO Add this component to app.tsx when countries, skip and limit is added to redux.

export default function CountryDisplay() {
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const handleNextClick = () => {
    const nextSkip = skip + 1 * limit;
    setSkip(nextSkip);
  };

  const handlePreviousClick = () => {
    const previousSkip = skip - 1 * limit;
    setSkip(previousSkip);
  };

  return (
    <div>
      {!!skip && (
        <button className="button" type="button" onClick={handlePreviousClick}>
          Previous
        </button>
      )}
      {!!skip && (
        <button className="button" type="button" onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>
  );
}
