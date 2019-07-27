import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../store';
import history from '../helpers/history';
import AppRouterGuard from './AppRouterGuard';
import LoginPageTemplate from './templates/LoginTemplate/LoginTemplate';
import { EPath } from '../types/index';
import MainTemplate from './templates/MainTemplate/MainTemplate';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact={true} path={EPath.Login} component={LoginPageTemplate} />
            <AppRouterGuard>
              <MainTemplate />
            </AppRouterGuard>
            <Redirect from="/" to={EPath.Login} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
