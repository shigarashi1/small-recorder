import { IError } from '../../../types/error';

// actionType
export enum ActionType {
  SET = '[error] SET',
  CLEAR = '[error] CLEAR',
}

export type TPayloadSet = IError;
export type TPayloadClear = void;

// actionCreater
type Set = { type: typeof ActionType.SET; payload: TPayloadSet };
type Clear = { type: typeof ActionType.CLEAR; payload: TPayloadClear };

// actions
const set = (payload: TPayloadSet): Set => ({ type: ActionType.SET, payload });
const clear = (payload: TPayloadClear): Clear => ({ type: ActionType.CLEAR, payload });

export type TErrorActions = Set | Clear;
export const errorActions = { set, clear };
