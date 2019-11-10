import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import RecordPage from '../../components/pages/RecordPage/RecordPage';
import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';
import { commonPageActions } from '../../store-observable/events/common-page';
import { recordPageActions } from '../../store-observable/events/record-page';

function mapStateToProps(state: AppState) {
  return {
    categories: getState.lookups.categories(state).filter(v => !v.hasDeleted),
    targets: getState.lookups.targets(state),
    records: getState.record.records(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
    ...bindActionCreators(recordPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordPage);
