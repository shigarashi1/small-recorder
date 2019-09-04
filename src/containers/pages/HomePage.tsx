import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getCommon } from '../../store/selector/commons';
import { AppState } from '../../store';

import HomePage from '../../components/pages/HomePage/HomePage';
import { loginPageActions, TSignOut } from '../../store/actions/pages/login';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getCommon.auth.signedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSignOut: (param: TSignOut) => dispatch<any>(loginPageActions.signOut(param)),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
