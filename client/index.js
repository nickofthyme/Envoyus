import ReactDOM from 'react-dom';
import React from 'react';
import Relay from 'react-relay';

import App from './src/App.jsx';

import './src/assets/styles/main.scss';

class MainPageRoute extends Relay.Route {
  static routeName = 'MainPageRoute';
  static queries = {
    store: ((Component) => {
      return Relay.QL`
        query root {
          $(Component.getFragment('store'))
        }
      `
    })
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
);

const rootComponent = <Relay.RootContainer
    Component={App}
    route={new MainPageRoute()}/>;

ReactDOM.render(
  rootComponent,
  document.getElementById('app'),
);
