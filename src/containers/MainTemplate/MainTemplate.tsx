import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import * as fromUser from '../../store/users';
import ErrorBoundary from '../../components/molecules/ErrorBoundary/ErrorBoundary';

interface IStateToProps {
  isLoggedIn: boolean;
}

interface IDispatchToProps {
  logout: typeof fromUser.signOut;
}

type TProps = IStateToProps & IDispatchToProps;

const MainTemplateContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <ErrorBoundary>
      <MainTemplate isLoggedIn={props.isLoggedIn} />;
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
    logout: () => dispatch<any>(fromUser.signOut()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTemplateContainer);
