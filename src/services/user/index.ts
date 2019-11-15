import { TUser, TCreateUser, TUpdateUser, TReadUser } from '../../types/firebase';
import { getCollection, QuerySnapshot, getServerTime } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { toUser, blankFunc } from '../tools';
import { Nullable } from '../../types';

const readUser = async (params: TReadUser) => {
  return await getCollection('users')
    .where('uid', '==', params.uid)
    .orderBy('createdAt')
    .get()
    .then(q => toUser(params.uid, q))
    .catch(err => new ApiError(err));
};

const createUser = async (params: TCreateUser) => {
  const serverTime = getServerTime();
  const data = { ...params, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('users')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateUser = async (id: string, params: TUpdateUser) => {
  const updatedAt = getServerTime();
  return getCollection('users')
    .doc(id)
    .update({ ...params, updatedAt })
    .catch(err => new ApiError(err));
};

const deleteUser = async (id: string) => {
  return getCollection('users')
    .doc(id)
    .delete()
    .catch(err => new ApiError(err));
};

const onChangedUser = (
  params: TReadUser,
  next: (user: Nullable<TUser>) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  const query = (q: QuerySnapshot) => next(toUser(params.uid, q));
  if (!params.uid) {
    return blankFunc;
  }
  return getCollection('users')
    .where('uid', '==', params.uid)
    .orderBy('createdAt')
    .onSnapshot(query, error, completed);
};

export const UserService = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  onChangedUser,
};
