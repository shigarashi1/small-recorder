import { TCategory, TTarget, TRecord, TUser } from '../../types/firebase';
import { IError } from '../../types';

export const isIError = (value: any): value is IError =>
  value.hasOwnProperty('code') && value.hasOwnProperty('message');

export function isCategoryType(v: any): v is TCategory {
  return v.name !== undefined && v.hasDeleted !== undefined;
}

export function isTargetType(v: any): v is TTarget {
  return v.category !== undefined && v.count !== undefined;
}

export function isRecordType(v: any): v is TRecord {
  return v.category !== undefined && v.record !== undefined;
}

export function isUserType(v: any): v is TUser {
  return v.uid !== undefined && v.username !== undefined;
}
