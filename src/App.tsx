import React from 'react';
import './App.css';
import './css/components.css'
import Header from './components/Header'
import CountryDisplay from './components/CountryDisplay'
import SettingsBar from './components/SettingsBar'
import FilterDisplay from './components/FilterDisplay'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

function reducer(){
  return {
    regions : ["Europe"], 
    regionsActive: false
  }
}

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
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
