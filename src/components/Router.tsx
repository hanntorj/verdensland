import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CountryDisplay from "./CountryDisplay";
import SearchBar from "./SearchBar"
import CountryDisplayMoreInfo from "./CountryDisplayMoreInfo"
import UserDisplayButton from "./UserDisplayButton";
import FilterDisplay from "./FilterDisplay";
import MainPageButton from "./MainPageButton";


export default function Router() {
  return (
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/">
            <div className="TopBar">
              <SearchBar />
              <UserDisplayButton type="FLAG" />
              <UserDisplayButton type="WISH" />
            </div>
            <div className="FilterAndCountry">
              <FilterDisplay />
              <CountryDisplay />
            </div>
          </Route>
          <Route exact path="/wish">
            <div className="TopBar">
              <SearchBar />
              <UserDisplayButton type="FLAG" />
              <MainPageButton/>
            </div>
            <div className="FilterAndCountry">
              <FilterDisplay />
              <CountryDisplay />
            </div>
          </Route>
          <Route exact path="/flag">
            <div className="TopBar">
              <SearchBar />
              <UserDisplayButton type="WISH" />
              <MainPageButton/>
            </div>
            <div className="FilterAndCountry">
              <FilterDisplay />
              <CountryDisplay />
            </div>
          </Route>
          <Route exact path="/country/:alpha2Code">
            <CountryDisplayMoreInfo />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
