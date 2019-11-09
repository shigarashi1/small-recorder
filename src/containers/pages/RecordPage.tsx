import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import RecordPage from '../../components/pages/RecordPage/RecordPage';
import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';
import { commonPageActions } from '../../store-observable/events/common-page';

function mapStateToProps(state: AppState) {
  return {
    categories: getState.lookups.categories(state).filter(v => !v.hasDeleted),
    targets: getState.lookups.targets(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordPage);
