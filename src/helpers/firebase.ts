import * as R from 'ramda';
import { TBase, TDocIdOrObject } from '../types/firebase';
import { NestedPartial } from '../types';
import { by } from './generals';

export const getMaxId = <T extends TBase>(arr: T[]): string => {
  if (arr.length === 0) {
    return '0';
  }
  return String(Math.max(...arr.map(v => (v.id !== null ? +v.id : 0))));
};

export const editArray = <T extends TBase>(arr: T[], data: T, isDelete = false): T[] => {
  const matched = arr.find(v => v.id === data.id);
  // insert
  if (!matched) {
    const newData = {
      ...data,
      id: getMaxId(arr) + 1,
    };
    return [...arr, newData];
  }

  const excludedArr = arr.filter(v => v.id !== data.id);
  // delete
  if (isDelete) {
    return [...excludedArr];
  }
  // update
  return [...excludedArr, data].sort((a, b) => +String(a.id) - +String(b.id));
};

export const getDocId = <T extends TBase>(idOrObject: TDocIdOrObject<T>): string =>
  typeof idOrObject === 'string' ? idOrObject : idOrObject.id;

export const getDocIdPartial = <T extends TBase>(idOrObject?: TDocIdOrObject<NestedPartial<T>>): string | undefined =>
  !idOrObject || typeof idOrObject === 'string' ? idOrObject : R.path(['id'], idOrObject);

export const populate = <T extends TBase, K extends keyof T, P extends TBase>(key: K, objs: P[], defaultObj: P) => (
  obj: T,
) =>
  typeof obj[key] !== 'string'
    ? obj
    : { ...obj, [key]: objs.find(by('id')(String(obj[key]))) || { ...defaultObj, [key]: String(obj[key]) } };

export const findDocObj = <T extends TBase>(objects: T[], defaultObj: T) => (obj: TDocIdOrObject<T>) =>
  typeof obj !== 'string' ? obj : objects.find(by('id')(getDocId(obj))) || { ...defaultObj };
