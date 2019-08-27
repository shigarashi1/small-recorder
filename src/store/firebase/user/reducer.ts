import { ActionType, TUserActions } from './actions';
import { TUserState, INITIAL_USER_STATE } from './state';

export function userReducer(state: TUserState = INITIAL_USER_STATE, action: TUserActions): TUserState {
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
