import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromUser from '../../store/users';
import { AppState } from '../../store';

import LoginPage from '../../components/pages/LoginPage/LoginPage';
import { loginPageActions, TSignIn } from '../../store/actions/pages/login';

function mapStateToProps(state: AppState) {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSignIn: (param: TSignIn) => dispatch<any>(loginPageActions.signIn(param)),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
