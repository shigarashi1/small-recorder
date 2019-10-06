import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import LoginPageTemplate from '../components/templates/LoginTemplate/LoginTemplate';

import { AppState } from '../store';
import { EPath } from '../types/index';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: false,
  };
}

type TProps = ReturnType<typeof mapStateToProps>;

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

export default connect(
  mapStateToProps,
  null,
)(AppRouterGuard);
