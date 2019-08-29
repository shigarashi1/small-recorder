// actionType
export enum ActionType {
  OPEN = '[keyboard] OPEN',
  CLOSE = '[keyboard] CLOSE',
  CHANGE_VALUE = '[keyboard] CHANGE_VALUE',
  CHANGE_POSITION = '[keyboard] CHANGE_POSITION',
  RESET = '[keyboard] RESET',
}

export type TPayloadOpen = void;
export type TPayloadClose = void;
export type TPayloadChangeValue = void;
export type TPayloadChangePosition = void;
export type TPayloadReset = void;

// actionCreater
type Open = { type: typeof ActionType.OPEN; payload: TPayloadOpen };
type Close = { type: typeof ActionType.CLOSE; payload: TPayloadClose };
type ChangeValue = { type: typeof ActionType.CHANGE_VALUE; payload: TPayloadChangeValue };
type ChangePosition = { type: typeof ActionType.CHANGE_POSITION; payload: TPayloadChangePosition };
type Reset = { type: typeof ActionType.RESET; payload: TPayloadReset };

// actions
const open = (payload: TPayloadOpen): Open => ({ type: ActionType.OPEN, payload });
const close = (payload: TPayloadClose): Close => ({ type: ActionType.CLOSE, payload });
const changeValue = (payload: TPayloadChangeValue): ChangeValue => ({
  type: ActionType.CHANGE_VALUE,
  payload,
});
const changePosition = (payload: TPayloadChangePosition): ChangePosition => ({
  type: ActionType.CHANGE_POSITION,
  payload,
});
const reset = (payload: TPayloadReset): Reset => ({ type: ActionType.RESET, payload });

export type TKeyboardActions = Open | Close | ChangeValue | ChangePosition | Reset;
export const keyboardActions = { open, close, changeValue, changePosition, reset };
