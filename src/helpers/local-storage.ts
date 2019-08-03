import { Nullable } from '../types';

type TStorageKey = 'category' | 'target' | 'record' | 'user';

function set<T>(key: TStorageKey, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

function get<T>(key: TStorageKey): Nullable<T> {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data) as T;
}

const storage = {
  set,
  get,
};

export default storage;
