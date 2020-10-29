import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CountryDisplay from "./CountryDisplay";
import SearchBar from "./SearchBar"
import CountryDisplayMoreInfo from "./CountryDisplayMoreInfo"
import UserDisplayButton from "./UserDisplayButton";
import FilterDisplay from "./FilterDisplay";


export default function Router() {
  return (
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/">
            <div className="TopBar">
              <SearchBar />
              <UserDisplayButton type="WISH" />
              <UserDisplayButton type="FLAG" />
            </div>
            <div className="FilterAndCountry">
              <FilterDisplay />
              <CountryDisplay />
            </div>
          </Route>
          <Route exact path="/country/:alpha2Code">
            <CountryDisplayMoreInfo />
          </Route>
          <Route path="/search">
            <SearchBar />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
