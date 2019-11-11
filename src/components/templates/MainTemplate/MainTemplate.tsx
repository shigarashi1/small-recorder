import React from 'react';

import styles from './MainTemplate.module.scss';

import AppRouter from '../../../routers/AppRouter';
import Header from '../../../containers/components/Header';
import Sidebar from '../../../containers/components/Sidebar';
import NumberKeyboard from '../../../containers/components/NumberKeyboard';
import ErrorBoundary from '../../molecules/ErrorBoundary/ErrorBoundary';
import Background from '../../../containers/others/Background';
import YesNoDialog from '../../../containers/components/dialogs/YesNoDialog';

const MainTemplate: React.FC<{}> = props => {
  return (
    <div id={styles.template}>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
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
        <ErrorBoundary>
          <Background />
          <Sidebar />
          <NumberKeyboard />
          <YesNoDialog />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
};

export default MainTemplate;
