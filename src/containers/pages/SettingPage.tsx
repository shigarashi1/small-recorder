import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../store';
import SettingPage from '../../components/pages/SettingPage/SettingPage';
import { getState } from '../../store-observable/state-selector';
import { settingPageActions } from '../../store-observable/pages/setting-page';
import { commonPageActions } from '../../store-observable/pages/common-page';
import { categoryDialogActions } from '../../store-observable/utilities/dialogs';

function mapStateToProps(state: AppState) {
  return {
    categories: getState.lookups.categories(state),
    targets: getState.lookups.targets(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const { show: showCategoryDialog } = bindActionCreators(categoryDialogActions, dispatch);
  return {
    showCategoryDialog,
    ...bindActionCreators(settingPageActions, dispatch),
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingPage);
