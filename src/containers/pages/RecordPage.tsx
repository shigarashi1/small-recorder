import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import RecordPage from '../../components/pages/RecordPage/RecordPage';
import { AppState } from '../../store';

function mapStateToProps(state: AppState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordPage);
