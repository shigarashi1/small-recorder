import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import LoginPageTemplate from '../components/templates/LoginTemplate/LoginTemplate';

import { EPath } from '../types/index';
import { TRouterGuardProps } from '../containers/others/AppRouterGuard';

type TProps = TRouterGuardProps;

class AppRouterGuard extends Component<TProps> {
  render() {
    const children = this.props.children ? this.props.children : null;

    if (!this.props.isSignedIn) {
      return (
        <React.Fragment>
          <Route exact={true} path={EPath.Login} component={LoginPageTemplate} />
          <Redirect from="/" to={EPath.Login} />
        </React.Fragment>
      );
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default AppRouterGuard;
