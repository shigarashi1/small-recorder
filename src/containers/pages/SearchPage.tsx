import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getCommon } from '../../store/selector/commons';
import { AppState } from '../../store';
import SearchPage from '../../components/pages/SearchPage/SearchPage';

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
  null,
)(SearchPage);
