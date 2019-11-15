import { getCollection, QuerySnapshot, getServerTime, toDocRef } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { TTarget, TReadTarget, TCreateTarget, TUpdateTarget } from '../../types/firebase';
import { toTargets, blankFunc } from '../tools';
import { getDocId, getDocIdPartial } from '../../helpers/firebase';

const readTargets = async (params: TReadTarget) => {
  const userRef = toDocRef('users', params.user);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .get()
    .then(toTargets)
    .catch(err => new ApiError(err));
};

const onChangedTargets = (
  params: TReadTarget,
  next: (targets: TTarget[]) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  if (!params.user) {
    return blankFunc;
  }
  const query = (q: QuerySnapshot) => next(toTargets(q));
  const userRef = toDocRef('users', params.user);
  return getCollection('targets')
    .where('user', '==', userRef)
    .orderBy('createdAt')
    .onSnapshot(query, error, completed);
};

const createTarget = async (params: TCreateTarget) => {
  const serverTime = getServerTime();
  const { count, term } = params;
  const user = toDocRef('users', getDocId(params.user));
  const category = toDocRef('categories', getDocId(params.category));
  const data = { count, term, user, category, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('targets')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateTarget = async (id: string, params: TUpdateTarget) => {
  const updatedAt = getServerTime();
  const categoryId = getDocIdPartial(params.category);
  const category = categoryId ? toDocRef('categories', categoryId) : undefined;
  const data = {
    ...params,
    category,
    updatedAt,
  };
  return getCollection('targets')
    .doc(id)
    .update({ ...data })
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
