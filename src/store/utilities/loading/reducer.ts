import { ActionType, TLoadingActions } from './actions';
import { TLoadingState, INITIAL_LOADING_STATE } from './state';

export function loadingReducer(state: TLoadingState = INITIAL_LOADING_STATE, action: TLoadingActions): TLoadingState {
  switch (action.type) {
    case ActionType.SET:
      return { ...state };

    case ActionType.CLEAR:
      return { ...state };
  }
  return state;
}
