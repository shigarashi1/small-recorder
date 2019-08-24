import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromUser from '../../../store/users';
import * as fromUtility from '../../../store/utility';

import { AppState } from '../../../store';
import SampleDraggablePage from '../../../components/pages/samples/SampleDraggablePage/SampleDraggablePage';

function mapStateToProps(state: AppState) {
  return {
    isLoggedIn: fromUser.getIsLoggedIn(state),
    hasOpenKeyboard: fromUtility.getHasOpenKeyboard(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onOpenKeyboard: (hasOpen: boolean) => dispatch<any>(fromUtility.changeHasOpenKeyboard(hasOpen)),
  };
}

export type TPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleDraggablePage);
