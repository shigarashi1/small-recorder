import React from 'react';
import { connect } from 'react-redux';
// import { Dispatch, Action } from 'redux';

import * as fromUser from '../../store/users';
import { AppState } from '../../store';
import SearchPage from '../../components/pages/SearchPage/SearchPage';

interface IStateToProps {
  isLoggedIn: boolean;
}

interface IDispatchToProps {
  login: typeof fromUser.login;
}

type TProps = IStateToProps & IDispatchToProps;

const SearchPageContainer: React.FC<TProps> = (props: TProps) => {
  return (
    <React.Fragment>
      <SearchPage />
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
)(SearchPageContainer);
