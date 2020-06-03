import React from "react";
import "./App.css";
import { createBrowserHistory, History } from "history";
import { Router, Route, Switch } from "react-router-dom";
import DefaultPage from "./views/App/App";

const hist: History = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/" component={DefaultPage} />
      </Switch>
    </Router>
  );
}

export default App;
