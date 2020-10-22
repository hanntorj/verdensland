import React from 'react';
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import CountryDisplay from "./CountryDisplay";



export default function Router() {
  return (
    <div>
    <CountryDisplay/>
    </div>
    // <BrowserRouter>
    //   <div className="router">
    //     <Switch>
    //       <Route path="/all">
    //       <CountryDisplay/>
    //       </Route>
    //       <Route path="/alpha/:id">
    //          her skal vi ha komponent for enkeltland med mer info
    //       </Route>
    //     </Switch>
    //   </div>
    // </BrowserRouter>
  );
}
