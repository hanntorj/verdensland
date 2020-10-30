import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  toggleFilterAction,
  addRegionAction,
  removeRegionAction,
  updateAreaMinAction,
  updateAreaMaxAction,
  updatePopMinAction,
  updatePopMaxAction,
  setSortAction,
  setSkipAction,
  clearRegionsAction,
} from "../app/store";
import { reduxState } from "../utilities/Interfaces";
import "../css/sliders.css";

function FilterDisplay() {
  // Fetch state from redux-store
  const filterState = useSelector((state: reduxState) => state.filters);
  let sortType = useSelector((state: reduxState) => state.sort)
    .replace("Asc", "")
    .replace("Desc", "");
  let sortOrder = useSelector((state: reduxState) => state.sort)
    .replace("name", "")
    .replace("area", "")
    .replace("pop", "");

  // Setup of actions to modify redux-store
  const dispatch = useDispatch();
  const setSort = (sort: string) => {
    dispatch(setSortAction(sort));
  };
  const setSkip = (skip: number) => {
    dispatch(setSkipAction(skip));
  };
  const clearRegions = (regions: Array<string>) => {
    dispatch(clearRegionsAction(regions));
  };
  const addRegion = (id: string) => {
    dispatch(addRegionAction(id));
  };
  const removeRegion = (id: string) => {
    dispatch(removeRegionAction(id));
  };
  const updateAreaMinNumber = (amount: number) => {
    dispatch(updateAreaMinAction(amount));
  };
  const updateAreaMaxNumber = (amount: number) => {
    dispatch(updateAreaMaxAction(amount));
  };
  const updatePopMinNumber = (amount: number) => {
    dispatch(updatePopMinAction(amount));
  };
  const updatePopMaxNumber = (amount: number) => {
    dispatch(updatePopMaxAction(amount));
  };

  const toggleFilter = (filterType: string) => {
    dispatch(toggleFilterAction(filterType));
  };

  const toggleButtonClass = (id: string) => {
    // Function that toggle the display of a button when it is clicked.
    if (!filterState.regions.includes(id)) {
      addRegion(id);
    } else {
      removeRegion(id);
    }
  };

  const handleSort = () => {
    setSkip(0);
    let sortBy = (document.getElementById("sortBy") as HTMLInputElement).value;
    let sortOrder = (document.getElementById("sortOrder") as HTMLInputElement)
      .value;
    let sort = "" + sortBy + sortOrder;
    setSort(sort);
  };

  const handleNumberInput = (filter: string) => {
    // Function that handles change on inputfields
    let inputField: HTMLInputElement = (document.getElementById(
      filter
    ) as HTMLInputElement)!;

    let inputStringValue: string = inputField.value;
    let inputValue: number = -1;

    if (inputStringValue === "") {
      inputValue = 0;
    } else if (JSON.parse(inputStringValue) < 0) {
      inputField.value = "";
      inputField.placeholder = "Please insert a valid number";
      return;
    } else {
      inputValue = JSON.parse(inputStringValue);
    }

    if (filter === "areaMin") {
      inputField.placeholder = "Min";
      updateAreaMinNumber(inputValue);
    } else if (filter === "areaMax") {
      inputField.placeholder = "Max";
      updateAreaMaxNumber(inputValue);
    } else if (filter === "popMin") {
      inputField.placeholder = "Min";
      updatePopMinNumber(inputValue);
    } else if (filter === "popMax") {
      inputField.placeholder = "Max";
      updatePopMaxNumber(inputValue);
    }
  };

  const handleSubmit = () => {
    //funtion to reset all filters

    setSort("nameAsc");

    //reset area filters
    if (filterState.areaActive) {
      toggleFilter("area");
    }
    updateAreaMinNumber(0);
    updateAreaMaxNumber(0);

    //reset population filters
    if (filterState.popActive) {
      toggleFilter("pop");
    }
    updatePopMinNumber(0);
    updatePopMaxNumber(0);

    clearRegions([]);
  };

  return (
    <div className="FilterDisplay">
      <h2>Filters</h2>
      {/* Sorting */}
      <div className="Sort">
        <div className="inputDropDown">
          <form>
            <select id="sortBy"value={sortType} onChange={() => handleSort()}>
              <option value="name" selected>
                Sort alphabetically
              </option>
              <option value="area">Sort by area</option>
              <option value="pop">Sort by population</option>
            </select>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={() => handleSort()}
            >
              <option value="Asc" selected>
                Ascending
              </option>
              <option value="Desc">Descending</option>
            </select>
          </form>
        </div>
      </div>
      {/* Area settings */}
      <div className="Filter Area">
        <div className="FilterTitle">
          <p>Area</p>
          <div className="SliderDiv">
            <label className="switch">
              <input
                id="areaCheck"
                type="checkbox"
                checked={filterState.areaActive}
                onClick={() => toggleFilter("area")}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <div className="inputFields">
          <input
            type="number"
            id="areaMin"
            placeholder="Min"
            value={
              filterState.areaMin > 0 ? JSON.stringify(filterState.areaMin) : ""
            }
            onChange={() => handleNumberInput("areaMin")}
          />
          <input
            type="number"
            id="areaMax"
            placeholder="Max"
            value={
              filterState.areaMax > 0 ? JSON.stringify(filterState.areaMax) : ""
            }
            onChange={() => handleNumberInput("areaMax")}
          />
        </div>
      </div>
      {/* Population settings */}
      <div className="Filter Population">
        <div className="FilterTitle">
          <p>Population</p>
          <div className="SliderDiv">
            <label className="switch">
              <input
                id="popCheck"
                type="checkbox"
                checked={filterState.popActive}
                onClick={() => toggleFilter("pop")}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <div className="inputFields">
          <input
            type="number"
            id="popMin"
            placeholder="Min"
            value={
              filterState.popMin > 0 ? JSON.stringify(filterState.popMin) : ""
            }
            onChange={() => handleNumberInput("popMin")}
          />
          <input
            type="number"
            id="popMax"
            placeholder="Max"
            value={
              filterState.popMax > 0 ? JSON.stringify(filterState.popMax) : ""
            }
            onChange={() => handleNumberInput("popMax")}
          />
        </div>
      </div>
      {/* Region settings */}
      <div className="Filter Region">
        <div className="FilterTitle">
          <p>Region</p>
        </div>
        <div className="RegionalButtons">
          <button
            className={
              filterState.regions.includes("Asia")
                ? "RegionButtonClicked"
                : "RegionButton"
            }
            id="Asia"
            onClick={() => toggleButtonClass("Asia")}
          >
            Asia
          </button>
          <button
            className={
              filterState.regions.includes("Africa")
                ? "RegionButtonClicked"
                : "RegionButton"
            }
            id="Africa"
            onClick={() => toggleButtonClass("Africa")}
          >
            Africa
          </button>
          <button
            className={
              filterState.regions.includes("Americas")
                ? "RegionButtonClicked"
                : "RegionButton"
            }
            id="Americas"
            onClick={() => toggleButtonClass("Americas")}
          >
            Americas
          </button>
          <button
            className={
              filterState.regions.includes("Polar")
                ? "RegionButtonClicked"
                : "RegionButton"
            }
            id="Antarctica"
            onClick={() => toggleButtonClass("Polar")}
          >
            Antarctica
          </button>
          <button
            className={
              filterState.regions.includes("Europe")
                ? "RegionButtonClicked"
                : "RegionButton"
            }
            id="Europe"
            onClick={() => toggleButtonClass("Europe")}
          >
            Europe
          </button>
          <button
            className={
              filterState.regions.includes("Oceania")
                ? "RegionButtonClicked"
                : "RegionButton"
            }
            id="Oceania"
            onClick={() => toggleButtonClass("Oceania")}
          >
            Oceania
          </button>
        </div>
      </div>
      {/* Reset button */}
      <button className="Button" type="button" onClick={handleSubmit}>
        Reset all filters
      </button>
    </div>
  );
}

export default connect()(FilterDisplay);
