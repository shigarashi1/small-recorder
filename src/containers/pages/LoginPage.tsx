import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { getCommon } from '../../store/selector/commons';
import { AppState } from '../../store';

import LoginPage from '../../components/pages/LoginPage/LoginPage';
import { loginPageActions } from '../../store-observable/events/login-page';
import { commonPageActions } from '../../store-observable/events/common-page';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getCommon.auth.signedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
    ...bindActionCreators(loginPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
