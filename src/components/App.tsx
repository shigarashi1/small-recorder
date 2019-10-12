import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
//
import { configureStore } from '../store-observable';
//
import history from '../helpers/history';
import MainTemplate from './templates/MainTemplate/MainTemplate';
import AppRouterGuard from '../containers/others/AppRouterGuard';
import LoadingSpiner from '../containers/others/LoadingSpiner';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <AppRouterGuard>
              <LoadingSpiner>
                <MainTemplate />
              </LoadingSpiner>
            </AppRouterGuard>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
