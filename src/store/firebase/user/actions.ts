// actionType
export enum ActionType {
  CREATE = '[user] CREATE',
  READ = '[user] READ',
  UPDATE = '[user] UPDATE',
  DEL = '[user] DEL',
}

export type TPayloadCreate = void;
export type TPayloadRead = void;
export type TPayloadUpdate = void;
export type TPayloadDel = void;

// actionCreater
type Create = { type: typeof ActionType.CREATE; payload: TPayloadCreate };
type Read = { type: typeof ActionType.READ; payload: TPayloadRead };
type Update = { type: typeof ActionType.UPDATE; payload: TPayloadUpdate };
type Del = { type: typeof ActionType.DEL; payload: TPayloadDel };

// actions
const create = (payload: TPayloadCreate): Create => ({ type: ActionType.CREATE, payload });
const read = (payload: TPayloadRead): Read => ({ type: ActionType.READ, payload });
const update = (payload: TPayloadUpdate): Update => ({ type: ActionType.UPDATE, payload });
const del = (payload: TPayloadDel): Del => ({ type: ActionType.DEL, payload });

export type TUserActions = Create | Read | Update | Del;
export const userActions = { create, read, update, del };
