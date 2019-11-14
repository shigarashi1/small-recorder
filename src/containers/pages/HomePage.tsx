import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import HomePage from '../../components/pages/HomePage/HomePage';
import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/pages/common-page';
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

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
