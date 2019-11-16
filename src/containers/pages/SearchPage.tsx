import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../store';
import SearchPage from '../../components/pages/SearchPage/SearchPage';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { searchPageActions } from '../../store-observable/pages/search-page';
import { getState } from '../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    records: getState.record.populatedRecords(state),
    targets: getState.lookups.populatedTargets(state),
    categories: getState.lookups.populatedCategories(state),
    pageState: getState.pages.searchPageState(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
    ...bindActionCreators(searchPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
