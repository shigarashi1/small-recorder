// actionType
export enum ActionType {
  TOGLE = '[sidebar] TOGLE',
}

type TPayloadTogle = void;

// actionCreater
type Togle = { type: typeof ActionType.TOGLE; payload: TPayloadTogle };

// actions
const togle = (payload: TPayloadTogle): Togle => ({ type: ActionType.TOGLE, payload });

export type TSidebarActions = Togle;
export const sidebarActions = { togle };
