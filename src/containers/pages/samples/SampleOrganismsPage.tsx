import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getCommon } from '../../../store/selector/commons';

import { AppState } from '../../../store';
import SampleOrganismsPage from '../../../components/pages/samples/SampleOrganismsPage/SampleOrganismsPage';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getCommon.auth.signedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onOpenKeyboard: (hasOpen: boolean) => console.log('未実装'),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleOrganismsPage);
