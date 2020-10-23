import React from 'react';
import './App.css';
import './css/components.css'
import Header from './components/Header'
import CountryDisplay from './components/CountryDisplay'
import SettingsBar from './components/SettingsBar'
import FilterDisplay from './components/FilterDisplay'

import { Provider } from 'react-redux'
import { store } from './app/store'


function App() {
  const reduxStore = store;
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Header/>
        <SettingsBar/>
        <FilterDisplay/>
        <CountryDisplay/>
      </div>
    </Provider>
  );
}

export default App;
