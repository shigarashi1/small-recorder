import { IRecordCategory } from '../types/firebase';

export function isCategoryType(v: any): v is IRecordCategory {
  return v.name !== undefined && v.hasDeleted !== undefined;
}

export function isTargetType(v: any): v is IRecordCategory {
  return v.category !== undefined && v.count !== undefined;
}

export function isRecordType(v: any): v is IRecordCategory {
  return v.category !== undefined && v.record !== undefined;
}

export function isUserType(v: any): v is IRecordCategory {
  return v.uid !== undefined && v.username !== undefined;
}
