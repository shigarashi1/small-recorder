import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Header from '../../components/molecules/Header/Header';
import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/events/common-page';
import { getState } from '../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getState.auth.isSignedIn(state),
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
