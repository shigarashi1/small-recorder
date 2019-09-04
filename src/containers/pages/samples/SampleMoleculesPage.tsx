import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getCommon } from '../../../store/selector/commons';

import { AppState } from '../../../store';

import SampleMoleculesPage from '../../../components/pages/samples/SampleMoleculesPage/SampleMoleculesPage';

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
)(SampleMoleculesPage);
