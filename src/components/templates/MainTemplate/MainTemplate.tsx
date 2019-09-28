import React from 'react';

import styles from './MainTemplate.module.scss';

import AppRouter from '../../../routers/AppRouter';
import Header from '../../../containers/components/Header';
import Sidebar from '../../../containers/components/Sidebar';
import NumberKeyboard from '../../../containers/components/NumberKeyboard';
import ErrorBoundary from '../../molecules/ErrorBoundary/ErrorBoundary';
import BackgroundComponent from '../../../containers/others/Background';

const MainTemplate: React.FC<{}> = props => {
  return (
    <div id={styles.template}>
      <Header />
      <div className={styles.container}>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </div>
      {renderUtilities()}
    </div>
  );

  function renderUtilities() {
    return (
      <React.Fragment>
        <Sidebar />
        <NumberKeyboard />
        <BackgroundComponent />
      </React.Fragment>
    );
  }
};

export default MainTemplate;
