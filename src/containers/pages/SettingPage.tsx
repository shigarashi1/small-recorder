import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../store';
import SettingPage from '../../components/pages/SettingPage/SettingPage';

function mapStateToProps(state: AppState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  null,
)(SettingPage);
