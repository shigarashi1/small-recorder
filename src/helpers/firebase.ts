import { IFirebaseBase } from '../types/firebase';
import { isCategoryType } from './type-guard';

export const getMaxId = <T extends IFirebaseBase>(arr: T[]): string => {
  if (arr.length === 0) {
    return '1';
  }
  return String(Math.max(...arr.map(v => (v._id !== null ? +v._id : 0))));
};

export const editArray = <T extends IFirebaseBase>(arr: T[], data: T, isDelete = false): T[] => {
  const matched = arr.find(v => v._id === data._id);
  // insert
  if (!matched) {
    const newData = {
      ...data,
      id: getMaxId(arr) + 1,
    };
    return [...arr, newData];
  }

  const excludedArr = arr.filter(v => v._id !== data._id);
  // delete
  if (isDelete) {
    if (isCategoryType(data)) {
      const newData = {
        ...data,
        hasDeleted: true,
      };
      return [...arr, newData];
    }
    return [...excludedArr];
  }
  // update
  return [...excludedArr, data].sort((a, b) => +a - +b);
};
