import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import CountryDisplay from "./CountryDisplay";
import SearchBar from "./SearchBar"


export default function Router() {
  return (
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/">
          <CountryDisplay/>
          </Route>
          <Route exact path="/country/:alpha2Code">
             <h2>her skal vi ha komponent for enkeltland med mer info</h2>
          </Route>
          <Route path="/search">
            <SearchBar />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
