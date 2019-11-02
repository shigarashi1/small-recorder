import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
//
import { configureStore } from '../store-observable';
//
import history from '../helpers/history';
import MainTemplate from './templates/MainTemplate/MainTemplate';
import AppRouterGuard from '../containers/others/AppRouterGuard';
import LoadingSpiner from '../containers/others/LoadingSpiner';
import SnackStacker from '../containers/components/SnackStacker';
import ErrorDialog from '../containers/components/dialogs/ErrorDialog';
import ErrorBoundary from './molecules/ErrorBoundary/ErrorBoundary';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <Router history={history}>
            <LoadingSpiner>
              <AppRouterGuard>
                <MainTemplate />
              </AppRouterGuard>
            </LoadingSpiner>
          </Router>
          {/* 共通部品 */}
          <SnackStacker />
          <ErrorDialog />
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default App;
