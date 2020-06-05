import React from 'react';
import './App.css';
import { createBrowserHistory, History } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import DefaultPage from './views/App/App';
import TestPage from './views/TestPage/App';
import Header from './features/Header/Header';
import HeaderLinks from './features/Header/HeaderLinks';
import Footer from './features/Footer/Footer';
const hist: History = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route path="/count" component={DefaultPage} />
          <Route path="/" component={TestPage} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
