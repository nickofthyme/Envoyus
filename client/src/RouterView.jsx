import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import ResultsPage from './ResultsPage';

const NoMatch = _ => (
  <div>Sorry, that page was not found.</div>
);

const RouteContainer = props => (
  <div style={{
    height: '100%',
    width: '100%',
  }}>
    { props.children }
  </div>
);

const RouterView = (
  <Router history={ hashHistory }>
    <Route path="/" component={ RouteContainer }>
      <IndexRoute component={ App } />
      <Route path="results" component={ ResultsPage }/>
      <Route path="*" component={ NoMatch }/>
    </Route>
  </Router>
);

export default RouterView;
