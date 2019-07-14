import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import * as fromUser from '../../store/users';
import * as fromUtility from '../../store/utility';

import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import ErrorBoundary from '../../components/molecules/ErrorBoundary/ErrorBoundary';
import { TKeyboardKey } from '../../types/number-keyboard';

interface IStateToProps {
  isLoggedIn: boolean;
  hasOpenKeyboard: boolean;
  currentValue: string;
}

interface IDispatchToProps {
  logout: typeof fromUser.signOut;
  pushKeyboard: typeof fromUtility.pushKeyKeyboard;
}

type TProps = IStateToProps & IDispatchToProps;

const MainTemplateContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <ErrorBoundary>
      <MainTemplate {...props} />
    </ErrorBoundary>
  );
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
    hasOpenKeyboard: fromUtility.getHasOpenKeyboard(state),
    currentValue: fromUtility.getKeyboardCurrentValue(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    logout: () => dispatch<any>(fromUser.signOut()),
    pushKeyboard: (key: TKeyboardKey) => dispatch<any>(fromUtility.pushKeyKeyboard(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTemplateContainer);
