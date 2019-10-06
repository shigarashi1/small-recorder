import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../store';
import SearchPage from '../../components/pages/SearchPage/SearchPage';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: false,
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
