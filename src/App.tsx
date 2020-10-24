import React from "react";
import "./App.css";
import "./css/components.css";
import Header from "./components/Header";
import Router from "./components/Router";
import SearchBar from "./components/SearchBar";
import FilterDisplay from "./components/FilterDisplay";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <FilterDisplay />
      <Router />
    </div>
  );
}

export default App;
