import { Nullable } from '../types';

export type TStorageKey = 'category' | 'target' | 'record' | 'user';

export function getStorageKey<T>(): TStorageKey {
  const data = {} as T;
  return 'category';
}

export function setStorage<T>(key: TStorageKey, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStorage<T>(key: TStorageKey): Nullable<T[]> {
  const data = localStorage.getItem(key);
  if (!data) {
    return [];
  }
  return JSON.parse(data) as T[];
}
