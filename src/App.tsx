import React from "react";
import "./App.css";
import "./css/components.css";
import Header from "./components/Header";
import Router from "./components/Router";
import SetUser from "./components/SetUser";

import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  const reduxStore = store;
  return (
    <Provider store={reduxStore}>
      <SetUser/>
      <div className="App">
        <Header />
        <Router />
      </div>
    </Provider>
  );
}

export default App;
