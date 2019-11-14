import { TTarget, TCategory, TUser, TRecord } from '../types/firebase';
import { TDateRange } from '../store-observable/record/action-reducers';

export const INITIAL_USER: TUser = { id: '', uid: '', username: '' };
export const INITIAL_TARGET: TTarget = { id: '', category: '', user: '', count: 0, term: 'day' };
export const INITIAL_CATEGORY: TCategory = { id: '', name: '', user: '', hasDeleted: false };
export const INITIAL_RECORD: TRecord = { id: '', category: '', user: '', record: '', date: '' };
export const INITIAL_DATE_RANGE: TDateRange = { from: '', to: '' };
