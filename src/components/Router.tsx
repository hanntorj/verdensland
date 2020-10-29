import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CountryDisplay from "./CountryDisplay";
import SearchBar from "./SearchBar"
import CountryDisplayMoreInfo from "./CountryDisplayMoreInfo"
import WishButton from "./WishButton";


export default function Router() {
  return (
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/">
          <WishButton/>
            <CountryDisplay />
            
          </Route>
          <Route exact path="/country/:alpha2Code">
             <CountryDisplayMoreInfo/>
          </Route>
          <Route path="/search">
            <SearchBar />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
