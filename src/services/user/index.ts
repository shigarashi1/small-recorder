import { TUser } from '../../types/firebase';
import { Nullable, NestedPartial } from '../../types';
import { getCollection, QuerySnapshot, getServerTime } from '../../lib/firebase';
import { ApiError } from '../../models/ApiError';

const toUser = (uid: string, q: QuerySnapshot): Nullable<TUser> => {
  const users = q.docs.map(v => ({ id: v.id, ...(v.data() as TUser) }));
  return users.find(v => v.uid === uid) || null;
};

const readUser = async (uid: string) => {
  return await getCollection('users')
    .where('uid', '==', uid)
    .get()
    .then(q => toUser(uid, q))
    .catch(err => {
      // TODO: error handling
      return new ApiError('0004');
    });
};

const createUser = async (uid: string, username: string) => {
  const serverTime = getServerTime();
  const data = { uid, username, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('users')
    .add(data)
    .catch(err => {
      // TODO: error handling
      return new ApiError('0003');
    });
};

const updateUser = async (id: string, param: NestedPartial<Omit<TUser, 'id'>>) => {
  const updatedAt = getServerTime();
  return getCollection('users')
    .doc(id)
    .update({ ...param, updatedAt })
    .catch(err => {
      // TODO: error handling
      return new ApiError('0003');
    });
};

const deleteUser = async (id: string) => {
  return getCollection('users')
    .doc(id)
    .delete()
    .catch(err => {
      // TODO: error handling
      return new ApiError('0003');
    });
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
