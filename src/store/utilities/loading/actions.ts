import * as TPayload from './payload-type';

// actionType
export enum ActionType {
  SET = '[loading] SET',
  CLEAR = '[loading] CLEAR',
}

// actionCreater
type Set = { type: typeof ActionType.SET; payload: TPayload.TPayloadSet };
type Clear = { type: typeof ActionType.CLEAR; payload: TPayload.TPayloadClear };

// actions
const set = (payload: TPayload.TPayloadSet): Set => ({ type: ActionType.SET, payload });
const clear = (payload: TPayload.TPayloadClear): Clear => ({ type: ActionType.CLEAR, payload });

export type TLoadingActions = Set | Clear;
export const loadingActions = { set, clear };
