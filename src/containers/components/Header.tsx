import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import Header from '../../components/molecules/Header/Header';
import { getCommon } from '../../store/selector/commons';
import { utilActions } from '../../store/actions/utils';
import { loginPageActions } from '../../store/actions/pages/login';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getCommon.auth.signedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSignOut: () => dispatch<any>(loginPageActions.signOut({})),
    onTogleSidebar: () => dispatch<any>(utilActions.sidebar.togle()),
  };
}

export type THeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
