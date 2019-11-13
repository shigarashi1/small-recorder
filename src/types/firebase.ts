import { ServerTimestamp } from '../lib/firebase';

export type TDocIdOrObject<T> = T | string;
export type TFirestoreBase = {
  createdAt: ServerTimestamp;
  updatedAt: ServerTimestamp;
};

type TTargetTerm = 'day' | 'week' | 'month';
export type Firestore<T> = Omit<T, 'id'> & TFirestoreBase;

export type TBase = {
  id: string;
};

export type TUser = TBase & {
  uid: string;
  username: string;
};
export type FirebaseUser = Firestore<TUser>;

export type TCategory = TBase & {
  user: TDocIdOrObject<TUser>;
  name: string;
  hasDeleted: boolean;
};
export type FirebaseCategory = Firestore<TCategory>;

export type TTarget = TBase & {
  user: TDocIdOrObject<TUser>;
  category: TDocIdOrObject<TCategory>;
  count: number;
  term: TTargetTerm;
};
export type FirebaseTarget = Firestore<TTarget>;

export type TRecord = TBase & {
  user: TDocIdOrObject<TUser>;
  category: TDocIdOrObject<TCategory>;
  date: string;
  record: string;
};
export type FirebaseRecord = Firestore<TRecord>;
