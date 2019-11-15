import { ServerTimestamp } from '../lib/firebase';
import { NestedPartial, TDateRange } from '.';

export type TDocIdOrObject<T> = T | string;
export type TFirestoreBase = {
  createdAt: ServerTimestamp;
  updatedAt: ServerTimestamp;
};
export type TBase = {
  id: string;
};

type TTargetTerm = 'day' | 'week' | 'month';
type OmitId<T> = Omit<T, 'id'>;
type OmitIdUser<T> = Omit<T, 'id' | 'user'>;
type PartialUpdateObject<T> = NestedPartial<OmitIdUser<T>>;
export type NestIdData<T> = { data: T } & TBase;
export type OmitUser<T> = Omit<T, 'user'>;

export type Firestore<T> = OmitId<T> & TFirestoreBase;

export type TUser = TBase & {
  uid: string;
  username: string;
};
export type FirebaseUser = Firestore<TUser>;
export type TCreateUser = OmitId<TUser>;
export type TReadUser = Pick<TUser, 'uid'>;
export type TUpdateUser = Pick<TUser, 'username'>;

export type TCategory = TBase & {
  user: TUser;
  name: string;
  hasDeleted: boolean;
};
export type Category = Omit<TCategory, 'user'> & {
  user: string;
};
export type FirebaseCategory = Firestore<Category>;
export type TCreateCategory = Omit<Category, 'id' | 'hasDeleted'>;
export type TReadCategory = Pick<Category, 'user'>;
export type TUpdateCategory = PartialUpdateObject<Category>;

export type TTarget = TBase & {
  user: TUser;
  category: TCategory;
  count: number;
  term: TTargetTerm;
};
export type Target = Omit<TTarget, 'user' | 'category'> & {
  user: string;
  category: string;
};
export type FirebaseTarget = Firestore<Target>;
export type TCreateTarget = OmitId<Target>;
export type TReadTarget = Pick<Target, 'user'>;
export type TUpdateTarget = PartialUpdateObject<Target>;

export type TRecord = TBase & {
  user: TUser;
  category: TCategory;
  date: string;
  record: string;
};
export type Record = Omit<TRecord, 'user' | 'category'> & {
  user: string;
  category: string;
};
export type FirebaseRecord = Firestore<Record>;
export type TCreateRecord = OmitId<Record>;
export type TReadRecord = Pick<Record, 'user'> & TDateRange;
export type TUpdateRecord = PartialUpdateObject<Record>;
