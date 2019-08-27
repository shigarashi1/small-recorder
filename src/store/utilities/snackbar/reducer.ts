import { ActionType, TSnackBarActions } from './actions';
import { TSnackBarState, INITIAL_SNACK_BAR_STATE } from './state';

export function snackBarReducer(
  state: TSnackBarState = INITIAL_SNACK_BAR_STATE,
  action: TSnackBarActions,
): TSnackBarState {
  switch (action.type) {
    case ActionType.SET:
      return { ...state };

    case ActionType.CLEAR:
      return { ...state };
  }
  return state;
}
