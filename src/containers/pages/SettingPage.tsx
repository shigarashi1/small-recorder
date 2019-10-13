import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../store';
import SettingPage from '../../components/pages/SettingPage/SettingPage';
import { getState } from '../../store-observable/state-selector';
import { settingPageActions } from '../../store-observable/events/setting-page';

function mapStateToProps(state: AppState) {
  return {
    categories: getState.lookups.categories(state),
    targets: getState.lookups.targets(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(settingPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingPage);
