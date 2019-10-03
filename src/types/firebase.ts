import { ServerTimestamp } from '../lib/firebase';
import { Nullable } from './index';

export type TFirestoreBase = {
  createdAt?: Nullable<ServerTimestamp>;
  updatedAt?: Nullable<ServerTimestamp>;
};

type TTargetTerm = 'day' | 'week' | 'month';
export type Firestore<T> = Omit<T, 'id'> & TFirestoreBase;

export type TBase = {
  id: Nullable<string>;
};

export type TUser = TBase & {
  uid: string;
  username: string;
};
export type FirebaseUser = Firestore<TUser>;

export type TCategory = TBase & {
  user: string;
  name: string;
  hasDeleted: boolean;
};
export type FirebaseCategory = Firestore<TCategory>;

export type TTarget = TBase & {
  user: string;
  category: string;
  count: number;
  term: TTargetTerm;
};
export type FirebaseTarget = Firestore<TTarget>;

export type TRecord = TBase & {
  user: string;
  category: string;
  date: string;
  record: string;
};
export type FirebaseRecord = Firestore<TRecord>;
