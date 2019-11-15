import { getCollection, QuerySnapshot, getServerTime, toDocRef } from '../../lib/firebase';
import { TCategory, TReadCategory, TCreateCategory, TUpdateCategory } from '../../types/firebase';
import { ApiError } from '../../models/error';
import { toCategories, blankFunc } from '../tools';
import { getDocId } from '../../helpers/firebase';

const readCategories = async (params: TReadCategory) => {
  const userRef = toDocRef('users', params.user);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .get()
    .then(toCategories)
    .catch(err => new ApiError(err));
};

const onChangedCategories = (
  params: TReadCategory,
  next: (categories: TCategory[]) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  if (params.user === '') {
    return blankFunc;
  }
  const query = (q: QuerySnapshot) => next(toCategories(q));
  const userRef = toDocRef('users', params.user);
  return getCollection('categories')
    .where('user', '==', userRef)
    .orderBy('createdAt')
    .onSnapshot(query, error, completed);
};

const createCategory = async (params: TCreateCategory) => {
  const serverTime = getServerTime();
  const user = toDocRef('users', getDocId(params.user));
  const data = { user, name: params.name, hasDeleted: false, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('categories')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateCategory = async (id: string, data: TUpdateCategory) => {
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
