import { ActionType, TCategoryActions } from './actions';
import { TCategoryState, INITIAL_CATEGORY_STATE } from './state';

export function categoryReducer(
  state: TCategoryState = INITIAL_CATEGORY_STATE,
  action: TCategoryActions,
): TCategoryState {
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
