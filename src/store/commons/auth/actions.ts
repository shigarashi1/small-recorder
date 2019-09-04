// actionType
export enum ActionType {
  CHANGE_LOGGEDIN = '[auth] CHANGE_LOGGEDIN',
  SIGN_OUT = '[auth] SIGN_OUT',
}

export type TPayloadChangeLoggedIn = boolean;
export type TPayloadSignOut = void;

// actionCreater
type ChangeLoggedIn = { type: typeof ActionType.CHANGE_LOGGEDIN; payload: TPayloadChangeLoggedIn };
type SignOut = { type: typeof ActionType.SIGN_OUT; payload: TPayloadSignOut };

// actions
const changeLoggedIn = (payload: TPayloadChangeLoggedIn): ChangeLoggedIn => ({
  type: ActionType.CHANGE_LOGGEDIN,
  payload,
});
const signOut = (payload: TPayloadSignOut): SignOut => ({ type: ActionType.SIGN_OUT, payload });

export type TAuthActions = ChangeLoggedIn | SignOut;
export const AuthActions = { changeLoggedIn, signOut };
