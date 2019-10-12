import React from 'react';

import LoginPageContainer from '../../../containers/pages/LoginPage';
import ErrorBoundary from '../../molecules/ErrorBoundary/ErrorBoundary';
import LoadingSpiner from '../../../containers/others/LoadingSpiner';

const LoginPageTemplate: React.FC = () => {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <LoadingSpiner>
          <LoginPageContainer />
        </LoadingSpiner>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default LoginPageTemplate;
