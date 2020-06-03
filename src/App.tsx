import React from 'react';
import './App.css';
import { createBrowserHistory, History } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import DefaultPage from './views/App/App';
import TestPage from './views/TestPage/App';

const hist: History = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/count" component={DefaultPage} />
        <Route path="/" component={TestPage} />
      </Switch>
    </Router>
  );
}

export default App;
