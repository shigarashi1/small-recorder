import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../../store';
import { getCommon } from '../../../store/selector/commons';

import SampleAtomsPage from '../../../components/pages/samples/SampleAtomsPage/SampleAtomsPage';
import { getKeyboard } from '../../../store/selector/components/keyboard';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getCommon.auth.signedIn(state),
    hasOpenKeyboard: getKeyboard.hasOpen(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onOpenKeyboard: (hasOpen: boolean) => console.log(hasOpen),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleAtomsPage);
