import React from "react";
import "./App.css";
import "./css/components.css";
import Header from "./components/Header";
import Router from "./components/Router";
import SearchBar from "./components/SearchBar";
import FilterDisplay from "./components/FilterDisplay";

import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  const reduxStore = store;
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Header />
        <SearchBar />
        <FilterDisplay />
        <Router />
      </div>
    </Provider>
  );
}

export default App;
