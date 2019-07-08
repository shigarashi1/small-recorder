import firebase from 'firebase';
import { Nullable } from './index';

type timeStamp = ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;

export interface IFirebaseBase {
  _id: Nullable<string>;
  createdAt: Nullable<timeStamp>;
  updatedAt: Nullable<timeStamp>;
}

export interface IAuth extends IFirebaseBase {
  isAdmin: boolean;
}

export interface IUser extends IFirebaseBase {
  uid: string;
  username: string;
  email: string;
  auth: Nullable<IAuth>;
}

export interface IRecordCategory extends IFirebaseBase {
  user: IUser;
  name: string;
  hasDeleted: boolean;
}

export type TTargetTerm = 'day' | 'week' | 'month';

export interface IRecordTarget extends IFirebaseBase {
  user: IUser;
  category: IRecordCategory;
  count: number;
  term: TTargetTerm;
}

export interface IRecord extends IFirebaseBase {
  user: IUser;
  category: IRecordCategory;
  date: number;
  record: string;
}
