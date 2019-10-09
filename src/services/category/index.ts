import { getCollection, QuerySnapshot, getServerTime } from '../../lib/firebase';
import { TCategory } from '../../types/firebase';
import { ApiError } from '../../models/ApiError';
import { NestedPartial } from '../../types';

const toUserRef = (id: string) => getCollection('users').doc(id);

const toCategories = (q: QuerySnapshot): TCategory[] => {
  const array = q.docs.map(v => ({ id: v.id, data: v.data(), user: v.get('user') }));
  return array.map(v => ({ id: v.id, ...v.data, user: v.user.id } as TCategory));
};

const readCategories = async (params: { userId: string }) => {
  const userRef = toUserRef(params.userId);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .get()
    .then(toCategories)
    .catch(err => {
      console.log(err);
      // TODO: error handling
      return new ApiError('0004');
    });
};

const createCategory = async (name: string, userId: string) => {
  const serverTime = getServerTime();
  const user = toUserRef(userId);
  const data = { name, user, hasDeleted: false, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('categories')
    .add(data)
    .catch(err => {
      // TODO: error handling
      return new ApiError('0004');
    });
};

const updateCategory = async (id: string, data: NestedPartial<Omit<TCategory, 'id' | 'user'>>) => {
  const updatedAt = getServerTime();
  return getCollection('categories')
    .doc(id)
    .update({ ...data, updatedAt })
    .catch(err => {
      // TODO: error handling
      return new ApiError('0004');
    });
};

const deleteCategory = async (id: string) => {
  return updateCategory(id, { hasDeleted: true });
};

export const CategoryService = {
  readCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
