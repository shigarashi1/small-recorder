import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SampleOrganismsPage from '../../../components/pages/samples/SampleOrganismsPage/SampleOrganismsPage';
import { AppState } from '../../../store';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: false,
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
