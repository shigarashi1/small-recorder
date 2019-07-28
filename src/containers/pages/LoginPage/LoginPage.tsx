import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromUser from '../../../store/users';
import { AppState } from '../../../store';

import LoginPage from '../../../components/pages/LoginPage/LoginPage';
import ErrorBoundary from '../../../components/molecules/ErrorBoundary/ErrorBoundary';

interface IStateToProps {
  isLoggedIn: boolean;
}

interface IDispatchToProps {
  onSignIn: typeof fromUser.signIn;
}

type TProps = IStateToProps & IDispatchToProps;

const LoginPageContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <ErrorBoundary>
      <LoginPage onSignIn={props.onSignIn} />
    </ErrorBoundary>
  );
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    onSignIn: () => dispatch<any>(fromUser.signIn()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageContainer);
