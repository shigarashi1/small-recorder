import { TTarget, TCategory, TUser, TRecord } from '../types/firebase';
import { TDateRange } from '../types';

export const INITIAL_USER: TUser = {
  id: '',
  uid: '',
  username: '',
};

export const INITIAL_CATEGORY: TCategory = {
  id: '',
  name: '',
  user: { ...INITIAL_USER },
  hasDeleted: false,
};

export const INITIAL_TARGET: TTarget = {
  id: '',
  category: { ...INITIAL_CATEGORY },
  user: { ...INITIAL_USER },
  count: 0,
  term: 'day',
};

export const INITIAL_RECORD: TRecord = {
  id: '',
  category: { ...INITIAL_CATEGORY },
  user: { ...INITIAL_USER },
  record: '',
  date: '',
};

export const INITIAL_DATE_RANGE: TDateRange = {
  from: '',
  to: '',
};
