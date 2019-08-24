import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as fromUser from '../store/users';
import { AppState } from '../store';

import { EPath } from '../types/index';

interface IStateToProps {
  isLoggedIn: boolean;
}

type TProps = IStateToProps;

class AppRouterGuard extends Component<TProps> {
  render() {
    const children = this.props.children ? this.props.children : null;

    if (!this.props.isLoggedIn) {
      return <Redirect to={EPath.Login} />;
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
}

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
  };
}

export default connect(
  mapStateToProps,
  null,
)(AppRouterGuard);
