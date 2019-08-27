import * as TPayload from './payload-type';

// actionType
export enum ActionType {
  CREATE = '[category] CREATE',
  READ = '[category] READ',
  UPDATE = '[category] UPDATE',
  DEL = '[category] DEL',
}

// actionCreater
type Create = { type: typeof ActionType.CREATE; payload: TPayload.TPayloadCreate };
type Read = { type: typeof ActionType.READ; payload: TPayload.TPayloadRead };
type Update = { type: typeof ActionType.UPDATE; payload: TPayload.TPayloadUpdate };
type Del = { type: typeof ActionType.DEL; payload: TPayload.TPayloadDel };

// actions
const create = (payload: TPayload.TPayloadCreate): Create => ({ type: ActionType.CREATE, payload });
const read = (payload: TPayload.TPayloadRead): Read => ({ type: ActionType.READ, payload });
const update = (payload: TPayload.TPayloadUpdate): Update => ({ type: ActionType.UPDATE, payload });
const del = (payload: TPayload.TPayloadDel): Del => ({ type: ActionType.DEL, payload });

export type TCategoryActions = Create | Read | Update | Del;
export const categoryActions = { create, read, update, del };
