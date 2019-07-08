import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromUser from '../../store/users';
import { AppState } from '../../store';

import HomePage from '../../components/pages/HomePage/HomePage';

interface IStateToProps {
  isLoggedIn: boolean;
}

interface IDispatchToProps {
  logout: typeof fromUser.logout;
}

type TProps = IStateToProps & IDispatchToProps;

const HomePageContainer: React.FC<TProps> = (props: TProps) => {
  return <HomePage logout={props.logout} />;
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    logout: () => dispatch<any>(fromUser.logout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageContainer);
