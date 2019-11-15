import { TRecord, TReadRecord, TCreateRecord, TUpdateRecord } from '../../types/firebase';
import { getCollection, getServerTime, toDocRef, QuerySnapshot } from '../../lib/firebase';
import { ApiError } from '../../models/error';
import { toRecords } from '../tools';
import Logger from '../../helpers/generals/logger';
import { omitUndefinedValueKeys } from '../../helpers/conv-object';
import { getDocId, getDocIdPartial } from '../../helpers/firebase';

const readRecords = async (params: TReadRecord) => {
  const userRef = toDocRef('users', params.user);
  return await getCollection('categories')
    .where('user', '==', userRef)
    .where('date', '>=', params.from)
    .where('date', '<=', params.to)
    .orderBy('updatedAt')
    .get()
    .then(toRecords)
    .catch(err => new ApiError(err));
};

const createRecord = async (params: TCreateRecord) => {
  const serverTime = getServerTime();
  const { date, record } = params;
  const user = toDocRef('users', getDocId(params.user));
  const category = toDocRef('categories', getDocId(params.category));
  const data = { date: +date, record, user, category, createdAt: serverTime, updatedAt: serverTime };
  return getCollection('records')
    .add(data)
    .catch(err => new ApiError(err));
};

const updateRecord = async (id: string, params: TUpdateRecord) => {
  const updatedAt = getServerTime();
  const categoryId = getDocIdPartial(params.category);
  const category = categoryId ? toDocRef('categories', categoryId) : undefined;
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
  params: TReadRecord,
  next: (records: TRecord[]) => void,
  error: (err: any) => void,
  completed?: () => void,
) => {
  if (!params.user || !params.from || !params.to) {
    return () => {
      Logger.log(`not enough onChanged Paramaters`);
    };
  }
  const query = (q: QuerySnapshot) => next(toRecords(q));
  const userRef = toDocRef('users', params.user);
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
