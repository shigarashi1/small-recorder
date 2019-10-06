import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
//
import { configureStore } from '../store-observable';
//
import history from '../helpers/history';
import MainTemplate from './templates/MainTemplate/MainTemplate';
import AppRouterGuard from '../containers/others/AppRouterGuard';

const store = configureStore({});

class App extends Component {
  render() {
    const isSignedIn = false;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <AppRouterGuard isSignedIn={isSignedIn}>
              <MainTemplate />
            </AppRouterGuard>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
