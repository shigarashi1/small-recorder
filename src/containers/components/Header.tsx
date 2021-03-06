import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Header from '../../components/molecules/Header/Header';
import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { getState } from '../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getState.auth.isSignedIn(state),
    username: getState.user.username(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type THeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
