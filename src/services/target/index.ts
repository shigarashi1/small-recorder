import { getCollection, QuerySnapshot, getServerTime, toDocRef } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { NestedPartial } from '../../types';
import { TTarget } from '../../types/firebase';
import { toTargets, blankFunc } from '../tools';
import { toOmitUndefinedValueKey } from '../../helpers/conv-object';

const readTargets = async (userId: string) => {
  const userRef = toDocRef('users', userId);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .get()
    .then(toTargets)
    .catch(err => new ApiError(err));
};

const onChangedTargets = (
  userId: string,
  next: (targets: TTarget[]) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  if (userId === '') {
    return blankFunc;
  }
  const query = (q: QuerySnapshot) => next(toTargets(q));
  const userRef = toDocRef('users', userId);
  return (
    getCollection('targets')
      .where('user', '==', userRef)
      // .orderBy('updatedAt', 'asc') // TODO: indexを貼る必要がある
      .onSnapshot(query, error, completed)
  );
};

const createTarget = async (params: Omit<TTarget, 'id'>) => {
  const serverTime = getServerTime();
  const { count, term } = params;
  const user = toDocRef('users', params.user);
  const category = toDocRef('categories', params.category);
  const data = { count, term, user, category, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('targets')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateTarget = async (id: string, params: NestedPartial<Omit<TTarget, 'id' | 'user'>>) => {
  const updatedAt = getServerTime();
  const { count, term } = params;
  const category = params.category ? toDocRef('categories', params.category) : undefined;
  const data = toOmitUndefinedValueKey({ count, term, category });
  return getCollection('targets')
    .doc(id)
    .update({ ...data, updatedAt })
    .catch(err => new ApiError(err));
};

const deleteTarget = async (id: string) => {
  return getCollection('targets')
    .doc(id)
    .delete()
    .catch(err => new ApiError(err));
};

export const TargetService = {
  onChangedTargets,
  readTargets,
  createTarget,
  updateTarget,
  deleteTarget,
};
