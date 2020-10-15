import React from 'react';
import './App.css';
import './css/components.css'
import Header from './components/Header'
import CountryDisplay from './components/CountryDisplay'
import SettingsBar from './components/SettingsBar'
import FilterDisplay from './components/FilterDisplay'

function App() {
  return (
    <div className="App">
      <Header/>
      <SettingsBar/>
      <FilterDisplay/>
      <CountryDisplay/>
    </div>
  );
}

export default App;
