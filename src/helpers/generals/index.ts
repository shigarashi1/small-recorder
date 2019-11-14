import * as R from 'ramda';
export * from './date';

export const delayFunction = async <T>(func: () => T, ms: number = 100): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func());
    }, ms);
  });
};

export const generateId = <T extends { id: number }>(array: T[]) =>
  array.length !== 0 ? Math.max(...array.map(v => v.id)) : 0;

export const by = <T = any>(key: keyof T) => (v: any) => (value: T): boolean =>
  typeof v !== 'object' && value[key] === v;

export const matchCondition = <T1, T2 = undefined>(
  conditions: Array<[T1, boolean]>,
  defaultValue: T1 | T2,
): T1 | T2 => {
  let ret = defaultValue;
  for (const condition of conditions) {
    if (condition[1]) {
      ret = condition[0];
      break;
    }
  }
  return ret;
};

export const matchConditionAll = <T1, T2 = undefined>(
  conditions: Array<[T1, boolean]>,
  defaultValue: T1 | T2,
): T1 | T1[] | T2 => {
  const retList = conditions.filter(v => !!v[1]).map(v => v[0]);
  return retList.length > 0 ? retList : defaultValue;
};

export const path = <T, K extends keyof T>(obj: T, key: K) => R.path<T[K]>([String(key)], obj);
