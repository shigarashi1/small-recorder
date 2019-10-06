import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ReportPage from '../../components/pages/ReportPage/ReportPage';
import { AppState } from '../../store';

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
  mapDispatchToProps,
)(ReportPage);
