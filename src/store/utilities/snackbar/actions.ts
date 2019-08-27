import * as TPayload from './payload-type';

// actionType
export enum ActionType {
  SET = '[snackBar] SET',
  CLEAR = '[snackBar] CLEAR',
}

// actionCreater
type Set = { type: typeof ActionType.SET; payload: TPayload.TPayloadSet };
type Clear = { type: typeof ActionType.CLEAR; payload: TPayload.TPayloadClear };

// actions
const set = (payload: TPayload.TPayloadSet): Set => ({ type: ActionType.SET, payload });
const clear = (payload: TPayload.TPayloadClear): Clear => ({ type: ActionType.CLEAR, payload });

export type TSnackBarActions = Set | Clear;
export const snackBarActions = { set, clear };
