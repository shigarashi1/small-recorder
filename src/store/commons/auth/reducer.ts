import { ActionType, TAuthActions } from './actions';
import { TAuthState, INITIAL_AUTH_STATE } from './state';

export function authReducer(state: TAuthState = INITIAL_AUTH_STATE, action: TAuthActions): TAuthState {
  switch (action.type) {
    case ActionType.CHANGE_LOGGEDIN:
      return { ...state, loggedIn: action.payload };

    case ActionType.SIGN_OUT:
      return { ...state };
  }
  return state;
}
