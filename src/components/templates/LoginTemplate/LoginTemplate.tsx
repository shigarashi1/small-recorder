import React from 'react';

import LoginPageContainer from '../../../containers/pages/LoginPage';
import ErrorBoundary from '../../molecules/ErrorBoundary/ErrorBoundary';

const LoginPageTemplate: React.FC = () => {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <LoginPageContainer />
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default LoginPageTemplate;
