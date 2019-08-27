import { ActionType, TKeyboardActions } from './actions';
import { TKeyboardState, INITIAL_KEYBOARD_STATE } from './state';

export function keyboardReducer(
  state: TKeyboardState = INITIAL_KEYBOARD_STATE,
  action: TKeyboardActions,
): TKeyboardState {
  switch (action.type) {
    case ActionType.OPEN:
      return { ...state };

    case ActionType.CLOSE:
      return { ...state };

    case ActionType.CHANGE_VALUE:
      return { ...state };

    case ActionType.CHANGE_POSITION:
      return { ...state };

    case ActionType.RESET:
      return { ...state };
  }
  return state;
}
