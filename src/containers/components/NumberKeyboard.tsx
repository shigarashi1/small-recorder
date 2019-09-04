import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import { TKeyboardKey } from '../../types/components/number-keyboard';
import { getKeyboard } from '../../store/selector/components/keyboard';
import { utilActions } from '../../store/actions/utils';
import DraggableNumberKeyboard from '../../components/atoms/DraggableNumberKeyboard/DraggableNumberKeyboard';

function mapStateToProps(state: AppState) {
  return {
    hasOpen: getKeyboard.hasOpen(state),
    currentValue: getKeyboard.currentValue(state),
    focusedOnValue: getKeyboard.focusedOnValue(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onPushKey: (key: TKeyboardKey) => dispatch<any>(utilActions.keyboard.pushKey({ key })),
  };
}

export type TKeyboardProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DraggableNumberKeyboard);
