import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import SampleAtomsPage from '../../../components/pages/samples/SampleAtomsPage/SampleAtomsPage';
import { AppState } from '../../../store';
import { commonPageActions } from '../../../store-observable/events/common-page';

function mapStateToProps(state: AppState) {
  return {
    isSignedIn: false,
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
