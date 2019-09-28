import { DocRef, ServerTimestamp } from '../lib/firebase';
import { Nullable } from './index';
import { TUser, TCategory, TTarget, TAuth, TRecord, TBase } from './redux';

export type TFirebaseBase = {
  _ref: string;
  createdAt: Nullable<ServerTimestamp>;
  updatedAt: Nullable<ServerTimestamp>;
};

type OmitStoreType = keyof TBase | 'category' | 'user' | 'auth';
type OmitDocObj<T> = Omit<T, OmitStoreType>;
export type TFirebase<T, U> = OmitDocObj<T> & TFirebaseBase & U;

// とりあえず作ってみた
export type FirebaseAuth = TFirebase<TAuth, {}>;

export type FirestoreUser = TFirebase<
  TUser,
  {
    auth: Nullable<DocRef>;
  }
>;

export type FirestoreCategory = TFirebase<
  TCategory,
  {
    user: DocRef;
  }
>;

export type FirestoreTarget = TFirebase<
  TTarget,
  {
    user: DocRef;
    category: DocRef;
  }
>;

export type FirestoreRecord = TFirebase<
  TRecord,
  {
    user: DocRef;
    category: DocRef;
  }
>;
