import { TRecord } from '../../types/firebase';
import { NestedPartial } from '../../types';
import { getCollection, getServerTime, toDocRef, QuerySnapshot } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { toRecords } from '../tools';
import Logger from '../../helpers/generals/logger';
import { omitUndefinedValueKeys } from '../../helpers/conv-object';

const readRecords = async (userId: string, from: string, to: string) => {
  const userRef = toDocRef('users', userId);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .where('date', '>=', from)
    .where('date', '<=', to)
    // .orderBy('updatedAt', 'desc') // TODO: indexを貼る必要がある
    .get()
    .then(toRecords)
    .catch(err => new ApiError(err));
};

const createRecord = async (params: Omit<TRecord, 'id'>) => {
  const serverTime = getServerTime();
  const { date, record } = params;
  const user = toDocRef('users', typeof params.user === 'string' ? params.user : params.user.id || '');
  const category = toDocRef(
    'categories',
    typeof params.category === 'string' ? params.category : params.category.id || '',
  );
  const data = { date: +date, record, user, category, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('records')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateRecord = async (id: string, params: NestedPartial<Omit<TRecord, 'id' | 'user'>>) => {
  const updatedAt = getServerTime();
  const category =
    typeof params.category !== 'undefined'
      ? toDocRef('categories', typeof params.category === 'string' ? params.category : params.category.id || '')
      : undefined;
  const data = omitUndefinedValueKeys({ ...params, category });
  return getCollection('records')
    .doc(id)
    .update({ ...data, updatedAt })
    .catch(err => new ApiError(err));
};

const deleteRecord = async (id: string) => {
  return getCollection('records')
    .doc(id)
    .delete()
    .catch(err => new ApiError(err));
};

const onChangedRecords = (
  userId: string,
  params: { from: string; to: string },
  next: (records: TRecord[]) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  if (!userId || !params.from || !params.to) {
    return () => {
      Logger.log(`not enough onChanged Paramaters`);
    };
  }
  const query = (q: QuerySnapshot) => next(toRecords(q));
  const userRef = toDocRef('users', userId);
  return getCollection('records')
    .where('user', '==', userRef)
    .where('date', '<=', +params.to)
    .where('date', '>=', +params.from)
    .orderBy('date')
    .orderBy('createdAt')
    .onSnapshot(query, error, completed);
};

export const RecordService = {
  readRecords,
  createRecord,
  updateRecord,
  deleteRecord,
  onChangedRecords,
};
