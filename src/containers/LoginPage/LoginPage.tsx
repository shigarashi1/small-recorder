import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromUser from '../../store/users';
import { AppState } from '../../store';

import LoginPage from '../../components/pages/LoginPage/LoginPage';

interface IStateToProps {
  isLoggedIn: boolean;
}

interface IDispatchToProps {
  login: typeof fromUser.login;
}

type TProps = IStateToProps & IDispatchToProps;

const LoginPageContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <React.Fragment>
      <LoginPage login={props.login} />
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    login: () => dispatch<any>(fromUser.login()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageContainer);
