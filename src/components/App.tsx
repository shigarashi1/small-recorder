import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../store';

import history from '../helpers/history';
import AppRouterGuard from '../guards/AppRouterGuard';
import MainTemplate from './templates/MainTemplate/MainTemplate';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <AppRouterGuard>
              <MainTemplate />
            </AppRouterGuard>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
