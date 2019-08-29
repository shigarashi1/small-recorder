// actionType
export enum ActionType {
  SET = '[loading] SET',
  CLEAR = '[loading] CLEAR',
}

export type TPayloadSet = void;
export type TPayloadClear = void;

// actionCreater
type Set = { type: typeof ActionType.SET; payload: TPayloadSet };
type Clear = { type: typeof ActionType.CLEAR; payload: TPayloadClear };

// actions
const set = (payload: TPayloadSet): Set => ({ type: ActionType.SET, payload });
const clear = (payload: TPayloadClear): Clear => ({ type: ActionType.CLEAR, payload });

export type TLoadingActions = Set | Clear;
export const loadingActions = { set, clear };
