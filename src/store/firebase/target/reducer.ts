import { ActionType, TTargetActions } from './actions';
import { TTargetState, INITIAL_TARGET_STATE } from './state';

export function targetReducer(state: TTargetState = INITIAL_TARGET_STATE, action: TTargetActions): TTargetState {
  switch (action.type) {
    case ActionType.CREATE:
      return { ...state };

    case ActionType.READ:
      return { ...state };

    case ActionType.UPDATE:
      return { ...state };

    case ActionType.DEL:
      return { ...state };
  }
  return state;
}
