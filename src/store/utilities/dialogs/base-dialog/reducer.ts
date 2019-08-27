import { ActionType, TDialogActions } from './actions';
import { TDialogState, INITIAL_DIALOG_STATE } from './state';

export function dialogReducer(state: TDialogState = INITIAL_DIALOG_STATE, action: TDialogActions): TDialogState {
  switch (action.type) {
    case ActionType.SET:
      return { ...state };

    case ActionType.CLEAR:
      return { ...state };
  }
  return state;
}
