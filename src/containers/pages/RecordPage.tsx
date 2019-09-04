import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../store';
import { getCommon } from '../../store/selector/commons';

import RecordPage from '../../components/pages/RecordPage/RecordPage';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getCommon.auth.signedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordPage);
