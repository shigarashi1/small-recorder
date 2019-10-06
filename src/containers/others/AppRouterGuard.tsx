import { connect } from 'react-redux';
import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';

import AppRouterGuard from '../../guards/AppRouterGuard';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getState.auth.isSignedIn(state),
  };
}

export type TRouterGuardProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  null,
)(AppRouterGuard);
