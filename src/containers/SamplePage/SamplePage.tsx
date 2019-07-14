import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromUser from '../../store/users';
import * as fromUtility from '../../store/utility';

import { AppState } from '../../store';
import SamplePage from '../../components/pages/SamplePage/SamplePage';

interface IStateToProps {
  isLoggedIn: boolean;
  hasOpenKeyboard: boolean;
}

interface IDispatchToProps {
  onOpenKeyboard: typeof fromUtility.changeHasOpenKeyboard;
}

type TProps = IStateToProps & IDispatchToProps;

const SamplePageContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <React.Fragment>
      <SamplePage {...props} />
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
    hasOpenKeyboard: fromUtility.getHasOpenKeyboard(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    onOpenKeyboard: (hasOpen: boolean) => dispatch<any>(fromUtility.changeHasOpenKeyboard(hasOpen)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SamplePageContainer);
