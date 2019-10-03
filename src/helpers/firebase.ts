import { isCategoryType } from './type-guard';
import { TBase } from '../types/firebase';

export const getMaxId = <T extends TBase>(arr: T[]): string => {
  if (arr.length === 0) {
    return '1';
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
