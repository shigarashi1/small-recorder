import * as TPayload from './payload-type';

// actionType
export enum ActionType {
  OPEN = '[keyboard] OPEN',
  CLOSE = '[keyboard] CLOSE',
  CHANGE_VALUE = '[keyboard] CHANGE_VALUE',
  CHANGE_POSITION = '[keyboard] CHANGE_POSITION',
  RESET = '[keyboard] RESET',
}

// actionCreater
type Open = { type: typeof ActionType.OPEN; payload: TPayload.TPayloadOpen };
type Close = { type: typeof ActionType.CLOSE; payload: TPayload.TPayloadClose };
type ChangeValue = { type: typeof ActionType.CHANGE_VALUE; payload: TPayload.TPayloadChangeValue };
type ChangePosition = { type: typeof ActionType.CHANGE_POSITION; payload: TPayload.TPayloadChangePosition };
type Reset = { type: typeof ActionType.RESET; payload: TPayload.TPayloadReset };

// actions
const open = (payload: TPayload.TPayloadOpen): Open => ({ type: ActionType.OPEN, payload });
const close = (payload: TPayload.TPayloadClose): Close => ({ type: ActionType.CLOSE, payload });
const changeValue = (payload: TPayload.TPayloadChangeValue): ChangeValue => ({
  type: ActionType.CHANGE_VALUE,
  payload,
});
const changePosition = (payload: TPayload.TPayloadChangePosition): ChangePosition => ({
  type: ActionType.CHANGE_POSITION,
  payload,
});
const reset = (payload: TPayload.TPayloadReset): Reset => ({ type: ActionType.RESET, payload });

export type TKeyboardActions = Open | Close | ChangeValue | ChangePosition | Reset;
export const keyboardActions = { open, close, changeValue, changePosition, reset };
