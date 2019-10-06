import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Sidebar from '../../components/organisms/Sidebar/Sidebar';

import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/events/common-page';

function mapStateToProps(state: AppState) {
  return {
    hasOpen: false,
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
