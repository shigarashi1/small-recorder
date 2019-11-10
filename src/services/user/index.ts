import { TUser } from '../../types/firebase';
import { Nullable, NestedPartial } from '../../types';
import { getCollection, QuerySnapshot, getServerTime } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { toUser, blankFunc } from '../tools';

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
  if (uid === '') {
    return blankFunc;
  }
  return getCollection('users')
    .where('uid', '==', uid)
    .onSnapshot(query, error, completed);
};

export const UserService = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  onChangedUser,
};
