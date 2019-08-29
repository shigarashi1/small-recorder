import { ActionType, TErrorActions } from './actions';
import { TErrorState, INITIAL_ERROR_STATE } from './state';

export function errorReducer(state: TErrorState = INITIAL_ERROR_STATE, action: TErrorActions): TErrorState {
  switch (action.type) {
    case ActionType.SET:
      return [...state, action.payload];

    case ActionType.CLEAR:
      return [];
  }
  return state;
}
