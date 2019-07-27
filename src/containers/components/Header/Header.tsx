import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../store';

import * as fromUser from '../../../store/users';
import * as fromUtility from '../../../store/utility';
import Header from '../../../components/molecules/Header/Header';

interface IStateToProps {
  isLoggedIn: boolean;
  hasOpen: boolean;
}

interface IDispatchToProps {
  onSignOut: typeof fromUser.signOut;
  changeSidebarHasOpen: typeof fromUtility.changeSidebarHasOpen;
}

type TProps = IStateToProps & IDispatchToProps;

const HeaderContainer: React.FC<TProps> = (props: TProps) => {
  const { changeSidebarHasOpen } = props;
  const onOpen = () => {
    changeSidebarHasOpen(true);
  };

  // const onSignOut = () => {
  //   props.onSignOut();
  // };

  return <Header {...props} onOpen={onOpen} />;
};

function mapStateToProps(state: AppState): IStateToProps {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
    hasOpen: fromUtility.getHasOpenSidebar(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    onSignOut: () => dispatch<any>(fromUser.signOut()),
    changeSidebarHasOpen: (hasOpen: boolean) => dispatch<any>(fromUtility.changeSidebarHasOpen(hasOpen)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
