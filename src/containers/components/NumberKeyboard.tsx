import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppState } from '../../store';

import { commonPageActions } from '../../store-observable/pages/common-page';

import DraggableNumberKeyboard from '../../components/molecules/DraggableNumberKeyboard/DraggableNumberKeyboard';

function mapStateToProps(state: AppState) {
  return {
    hasOpen: false,
    currentValue: '',
    focusedOnValue: '',
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ...bindActionCreators(commonPageActions, dispatch),
  };
}

export type TKeyboardProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DraggableNumberKeyboard);
