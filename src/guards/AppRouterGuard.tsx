import React, { useEffect, useState } from 'react';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router';

import LoginPageTemplate from '../components/templates/LoginTemplate/LoginTemplate';

import { EPath } from '../types/index';
import { TRouterGuardProps } from '../containers/others/AppRouterGuard';
import { AuthenticationService } from '../services/auth';
import Logger from '../helpers/generals/logger';
import config from '../configuration/config';

type TProps = TRouterGuardProps & RouteComponentProps;

const AppRouterGuard: React.FC<TProps> = ({ isSignedIn, children, onChangedAuth }) => {
  const [hasAutoSignIn, setHasAutoSignIn] = useState(false);
  useEffect(() => {
    AuthenticationService.getAuthState()
      .then(user => {
        if (user) {
          onChangedAuth(user);
        }
      })
      .catch(err => Logger.log('auto login failture'))
      .finally(() => setHasAutoSignIn(true));
  }, [onChangedAuth]);

  if (!hasAutoSignIn) {
    return null;
  }

  return (
    <React.Fragment>
      {isSignedIn && children ? children : null}
      <Route exact={true} path={EPath.Login} component={LoginPageTemplate} />
      {config.isDev ? null : <Redirect from="/" to={EPath.Login} />}
    </React.Fragment>
  );
};

export default withRouter(AppRouterGuard);
