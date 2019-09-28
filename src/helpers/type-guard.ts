import { TCategory, TRecord, TTarget, TUser } from '../types/redux';

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
