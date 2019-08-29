import { IRecordCategory, IUser } from '../../../types/firebase';

// actionType
export enum ActionType {
  CREATE = '[category] CREATE',
  READ = '[category] READ',
  UPDATE = '[category] UPDATE',
  DEL = '[category] DEL',
}

type TPayloadCreate = Pick<IRecordCategory, 'name'>;
type TPayloadRead = Pick<IUser, 'uid'>;
type TPayloadUpdate = Pick<IRecordCategory, '_id' | 'name'>;
type TPayloadDel = Pick<IRecordCategory, '_id'>;

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

export type TCategoryActions = Create | Read | Update | Del;
export const categoryActions = { create, read, update, del };
