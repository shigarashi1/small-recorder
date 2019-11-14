import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import SampleAtomsPage from '../../../components/pages/samples/SampleAtomsPage/SampleAtomsPage';
import { AppState } from '../../../store';
import { commonPageActions } from '../../../store-observable/pages/common-page';
import { getState } from '../../../store-observable/state-selector';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: getState.auth.isSignedIn(state),
    hasOpenKeyboard: false,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
    onOpenKeyboard: (hasOpen: boolean) => console.log(hasOpen),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleAtomsPage);
