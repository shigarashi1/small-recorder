import { QuerySnapshot } from '../../lib/firebase';
import {
  TTarget,
  TCategory,
  TUser,
  TRecord,
  FirebaseUser,
  FirebaseCategory,
  FirebaseTarget,
  FirebaseRecord,
  TFirestoreBase,
  TBase,
} from '../../types/firebase';
import { omitKeysObject } from '../../helpers/conv-object';
import { Nullable } from '../../types';
import Logger from '../../helpers/generals/logger';
import { by } from '../../helpers/generals';

const toStoreType = <T extends TFirestoreBase, K extends TBase>(
  id: string,
  data: any,
  keys: Array<keyof T> = ['createdAt', 'updatedAt'],
): K => ({ id, ...omitKeysObject(data, keys) } as K);

// user
export const toUser = (uid: string, q: QuerySnapshot): Nullable<TUser> =>
  q.docs.map(v => toStoreType<FirebaseUser, TUser>(v.id, v.data())).find(by<TUser>('uid')(uid)) || null;

// category
export const toCategories = (q: QuerySnapshot): TCategory[] =>
  q.docs.map(v => toStoreType<FirebaseCategory, TCategory>(v.id, { ...v.data(), user: v.get('user').id }));

// target
export const toTargets = (q: QuerySnapshot): TTarget[] =>
  q.docs.map(v =>
    toStoreType<FirebaseTarget, TTarget>(v.id, { ...v.data(), user: v.get('user').id, category: v.get('category').id }),
  );

// records
export const toRecords = (q: QuerySnapshot): TRecord[] => {
  const array = q.docs.map(v => ({
    id: v.id,
    data: v.data(),
    user: v.get('user').id,
    category: v.get('category').id,
  }));
  return array.map(v =>
    toStoreType<FirebaseRecord, TRecord>(v.id, {
      ...v.data,
      date: String(v.data.date),
      user: v.user,
      category: v.category,
    }),
  );
};

export const blankFunc = () => {
  Logger.log('onChanged no userId.');
};
