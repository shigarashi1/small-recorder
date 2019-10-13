import React, { useEffect } from 'react';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router';

import LoginPageTemplate from '../components/templates/LoginTemplate/LoginTemplate';

import { EPath } from '../types/index';
import { TRouterGuardProps } from '../containers/others/AppRouterGuard';
import { AuthenticationService } from '../services/auth';
import Logger from '../helpers/generals/logger';

type TProps = TRouterGuardProps & RouteComponentProps;

const AppRouterGuard: React.FC<TProps> = ({ isSignedIn, children, onChangedAuth }) => {
  useEffect(() => {
    AuthenticationService.getAuthState()
      .then(user => {
        if (user) {
          onChangedAuth(user);
        }
      })
      .catch(err => Logger().log('auto login failture'));
  }, [onChangedAuth]);

  if (isSignedIn && children) {
    return <React.Fragment> {children} </React.Fragment>;
  }

  return (
    <React.Fragment>
      <Route exact={true} path={EPath.Login} component={LoginPageTemplate} />
      <Redirect from="/" to={EPath.Login} />
    </React.Fragment>
  );
};

export default withRouter(AppRouterGuard);
