import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//
import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';

import AppRouterGuard from '../../guards/AppRouterGuard';
import { backgroundActions } from '../../store-observable/events/background';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getState.auth.isSignedIn(state),
    uid: getState.auth.uid(state),
    userId: getState.user.id(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(backgroundActions, dispatch),
  };
}
export type TRouterGuardProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppRouterGuard);
