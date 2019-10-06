import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../store';

import SampleMoleculesPage from '../../../components/pages/samples/SampleMoleculesPage/SampleMoleculesPage';

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
)(SampleMoleculesPage);
