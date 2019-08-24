import { TStorageKey, getStorage } from '../../helpers/local-storage';
import { Nullable } from '../../types';

function set<T>(data: T): string {
  return '';
}

function get<T>(id: string): Nullable<T[]> {
  return null;
}

function generateId(key: TStorageKey): string {
  const data = getStorage(key);
  return '';
}

export const localStorageService = {
  set,
  get,
};
