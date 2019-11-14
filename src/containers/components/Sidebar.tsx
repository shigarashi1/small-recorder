import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Sidebar from '../../components/organisms/Sidebar/Sidebar';

import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { getState } from '../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    hasOpen: getState.utility.hasOpenedSidebar(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TSidebarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
