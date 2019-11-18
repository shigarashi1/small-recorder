import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import RecordPage from '../../components/pages/RecordPage/RecordPage';
import { AppState } from '../../store';
import { getState } from '../../store-observable/state-selector';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { recordPageActions } from '../../store-observable/pages/record-page';
import { categoryDialogActions } from '../../store-observable/utilities/dialogs';

function mapStateToProps(state: AppState) {
  return {
    categories: getState.lookups.categories(state),
    targets: getState.lookups.targets(state),
    records: getState.record.records(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const { show: showCategoryDialog } = bindActionCreators(categoryDialogActions, dispatch);
  return {
    showCategoryDialog,
    ...bindActionCreators(commonPageActions, dispatch),
    ...bindActionCreators(recordPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordPage);
