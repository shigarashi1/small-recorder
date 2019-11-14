import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import ReportPage from '../../components/pages/ReportPage/ReportPage';
import { AppState } from '../../store';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { reportPageActions } from '../../store-observable/pages/report-page';
import { getState } from '../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    records: getState.record.populatedRecords(state),
    targets: getState.lookups.populatedTargets(state),
    categories: getState.lookups.populatedCategories(state),
    pageState: getState.pages.reportPageState(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
    ...bindActionCreators(reportPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
