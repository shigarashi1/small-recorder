import { getCollection, QuerySnapshot, getServerTime, toDocRef } from '../../lib/firebase';
import { TCategory } from '../../types/firebase';
import { ApiError } from '../../models/error';
import { NestedPartial } from '../../types';
import { toCategories, blankFunc } from '../tools';
import Logger from '../../helpers/generals/logger';

const readCategories = async (params: { userId: string }) => {
  const userRef = toDocRef('users', params.userId);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .get()
    .then(toCategories)
    .catch(err => new ApiError(err));
};

const onChangedCategories = (
  userId: string,
  next: (categories: TCategory[]) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  Logger().log(userId);
  if (userId === '') {
    return blankFunc;
  }
  const query = (q: QuerySnapshot) => next(toCategories(q));
  const userRef = toDocRef('users', userId);
  return (
    getCollection('categories')
      .where('user', '==', userRef)
      // .orderBy('updatedAt', 'asc') // TODO: indexを貼る必要がある
      .onSnapshot(query, error, completed)
  );
};

const createCategory = async (params: Omit<TCategory, 'id' | 'hasDeleted'>) => {
  const serverTime = getServerTime();
  const user = toDocRef('users', params.user);
  const data = { user, name: params.name, hasDeleted: false, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('categories')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateCategory = async (id: string, data: NestedPartial<Omit<TCategory, 'id' | 'user'>>) => {
  const updatedAt = getServerTime();
  return getCollection('categories')
    .doc(id)
    .update({ ...data, updatedAt })
    .catch(err => new ApiError(err));
};

const deleteCategory = async (id: string) => {
  return updateCategory(id, { hasDeleted: true });
};

export const CategoryService = {
  readCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  onChangedCategories,
};
