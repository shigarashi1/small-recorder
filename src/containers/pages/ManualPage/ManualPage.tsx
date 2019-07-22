import React from 'react';
import { connect } from 'react-redux';
// import { Dispatch, Action } from 'redux';

import * as fromUser from '../../../store/users';
import { AppState } from '../../../store';
import ManualPage from '../../../components/pages/ManualPage/ManualPage';

interface IStateToProps {
  isLoggedIn: boolean;
}

interface IDispatchToProps {
  login: typeof fromUser.signIn;
}

type TProps = IStateToProps & IDispatchToProps;

const ManualPageContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <React.Fragment>
      <ManualPage />
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
  };
}

// function mapDispatchToProps(dispatch: Dispatch<AppState>): IDispatchToProps {
//   return {
//     login: () => {
//       return dispatch(fromUser.login());
//     },
//   };
// }

export default connect(
  mapStateToProps,
  null,
)(ManualPageContainer);
