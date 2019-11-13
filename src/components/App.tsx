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
import InformationDialog from '../containers/components/dialogs/InfoDialog';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <Router history={history}>
            <LoadingSpiner>
              <ErrorBoundary>
                <AppRouterGuard>
                  <MainTemplate />
                </AppRouterGuard>
              </ErrorBoundary>
            </LoadingSpiner>
          </Router>
          {/* 共通部品 */}
          <ErrorBoundary>
            <SnackStacker />
            <ErrorDialog />
            <InformationDialog />
          </ErrorBoundary>
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default App;
