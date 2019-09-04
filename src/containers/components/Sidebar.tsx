import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import Sidebar from '../../components/organisms/Sidebar/Sidebar';
import { utilActions } from '../../store/actions/utils';
import { getSidebar } from '../../store/selector/components/sidebar';

function mapStateToProps(state: AppState) {
  return {
    hasOpen: getSidebar.hasOpen(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onTogleSidebar: () => dispatch<any>(utilActions.sidebar.togle()),
  };
}

export type TSidebarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
