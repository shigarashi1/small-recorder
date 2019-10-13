import { QuerySnapshot } from '../../lib/firebase';
import { TTarget, TCategory, TUser, TRecord } from '../../types/firebase';
import { toOmitKeysObject } from '../../helpers/conv-object';
import { Nullable } from '../../types';
import Logger from '../../helpers/generals/logger';

// user
export const toUser = (uid: string, q: QuerySnapshot): Nullable<TUser> => {
  const users = q.docs
    .map(v => ({ id: v.id, data: v.data() }))
    .map(v => toOmitKeysObject<TUser>({ id: v.id, ...v.data }, ['createdAt', 'updatedAt']));
  const user = users.find(v => v.uid === uid);
  return user || null;
};

// category
export const toCategories = (q: QuerySnapshot): TCategory[] => {
  const array = q.docs.map(v => ({ id: v.id, data: v.data(), user: v.get('user') }));
  return array.map(v =>
    toOmitKeysObject<TCategory>({ id: v.id, ...v.data, user: v.user.id }, ['createdAt', 'updatedAt']),
  );
};

// target
export const toTargets = (q: QuerySnapshot): TTarget[] => {
  const array = q.docs.map(v => ({ id: v.id, data: v.data(), user: v.get('user'), category: v.get('category') }));
  return array.map(v =>
    toOmitKeysObject<TTarget>({ id: v.id, ...v.data, user: v.user.id, category: v.category.id }, [
      'createdAt',
      'updatedAt',
    ]),
  );
};

// records
export const toRecords = (q: QuerySnapshot): TRecord[] => {
  const array = q.docs.map(v => ({
    id: v.id,
    data: v.data(),
    user: { id: v.get('user').id, ...v.get('user').data() } as TUser,
    category: { id: v.get('category').id, ...(v.get('category').data() as TCategory) },
  }));
  Logger().log('Records population', array);
  return array.map(v =>
    toOmitKeysObject<TRecord>({ id: v.id, ...v.data, user: v.user.id, category: v.category.id }, [
      'createdAt',
      'updatedAt',
    ]),
  );
};

export const blankFunc = () => {
  Logger().log('onChanged no userId.');
};
