import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import CountryDisplay from "./CountryDisplay";



export default function Router() {
  return (
    // <div>
    // <CountryDisplay/>
    // </div>
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/">
          <CountryDisplay/>
          </Route>
          <Route exact path="/country/AF">
             <h2>her skal vi ha komponent for enkeltland med mer info</h2>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
