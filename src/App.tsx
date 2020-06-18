import React from 'react';
import './App.css';
import { createBrowserHistory, History } from 'history';
import { BrowserRouter, Switch, Route, Link, useLocation } from 'react-router-dom';
import DefaultPage from './views/App/App';
import TeamPage from './views/TeamPage/App';
import TestPage from './views/TestPage/App';
import Header from './features/Header/Header';
import HeaderLinks from './features/Header/HeaderLinks';
import Footer from './features/Footer/Footer';
import PersonalPage from './views/PersonalPage/App';
import { Button } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';

const hist: History = createBrowserHistory();
function App() {
  const location = useLocation();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: 'translate3d(100vw, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-20vw, 0, 0)' },
  });

  return (
    <div>
      <Header
        color="dark"
        brand="Team Sporty"
        rightLinks={
          <div>
            <Button href={'/personal'} style={{ color: 'white' }}>
              Personal
            </Button>
            <Button href={'/team'} style={{ color: 'white' }}>
              Team
            </Button>
          </div>
        }
        fixed
      />

      {transitions.map(({ item: location, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={location}>
            <Route path="/personal" component={PersonalPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/" component={TeamPage} />
          </Switch>
        </animated.div>
      ))}
      {/*<Footer />*/}
    </div>
  );
}

export default App;
