import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../store';

import * as fromUser from '../../../store/users';
import * as fromUtility from '../../../store/utility';
import Sidebar from '../../../components/organisms/Sidebar/Sidebar';

interface IStateToProps {
  isLoggedIn: boolean;
  hasOpen: boolean;
}

interface IDispatchToProps {
  onSignOut: typeof fromUser.signOut;
  onOpen: typeof fromUtility.changeSidebarHasOpen;
}

type TProps = IStateToProps & IDispatchToProps;

const SidebarContainer: React.FC<TProps> = (props: TProps) => {
  const { hasOpen, onOpen } = props;
  const onChangeHasOpenSidebar = () => {
    onOpen(!hasOpen);
  };

  return <Sidebar hasOpen={hasOpen} onOpenClose={onChangeHasOpenSidebar} />;
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
    onOpen: (hasOpen: boolean) => dispatch<any>(fromUtility.changeSidebarHasOpen(hasOpen)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarContainer);
