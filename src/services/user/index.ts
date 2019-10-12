import { TUser } from '../../types/firebase';
import { Nullable, NestedPartial } from '../../types';
import { getCollection, QuerySnapshot, getServerTime } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { toKeysPickObject } from '../../helpers/conv-object';

const toUser = (uid: string, q: QuerySnapshot): Nullable<TUser> => {
  const users = q.docs.map(v => ({ id: v.id, ...(v.data() as TUser) }));
  const user = users.find(v => v.uid === uid);
  return user ? toKeysPickObject(user, ['id', 'uid', 'username']) : null;
};

const readUser = async (uid: string) => {
  return await getCollection('users')
    .where('uid', '==', uid)
    .get()
    .then(q => toUser(uid, q))
    .catch(err => new ApiError(err));
};

const createUser = async (uid: string, username: string) => {
  const serverTime = getServerTime();
  const data = { uid, username, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('users')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateUser = async (id: string, param: NestedPartial<Omit<TUser, 'id'>>) => {
  const updatedAt = getServerTime();
  return getCollection('users')
    .doc(id)
    .update({ ...param, updatedAt })
    .catch(err => new ApiError(err));
};

const deleteUser = async (id: string) => {
  return getCollection('users')
    .doc(id)
    .delete()
    .catch(err => new ApiError(err));
};

const onChangedUser = (
  uid: string,
  next: (user: Nullable<TUser>) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  const query = (q: QuerySnapshot) => next(toUser(uid, q));
  return (
    getCollection('users')
      .where('uid', '==', uid)
      // .orderBy('updatedAt', 'desc') // TODO: indexを貼る必要がある
      .limit(3)
      .onSnapshot(query, error, completed)
  );
};

export const UserService = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  onChangedUser,
};
