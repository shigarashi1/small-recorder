import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getStartOfWeek, getEndOfWeek } from '../../../helpers/generals';
import { TDateRange, OrderBy, TOrderBy } from '../../../types';

// actions
const ac = actionCreatorFactory('[---- SearchPage]');
const actions = {
  load: ac<void>('load'),
  setToday: ac<keyof TDateRange<Date>>('setToday'),
  setDate: ac<{ key: keyof TDateRange<Date>; date: Date }>('setDate'),
  setState: ac<{ key: keyof Omit<TSearchPage, 'dateRange'>; value: string | boolean | TOrderBy }>('setState'),
};
export const searchPageActions = actions;

// reducers
export type TSearchPage = {
  dateRange: TDateRange<Date>;
  category: string;
  canShowDeletedCategory: boolean;
  record: string;
  orderBy: TOrderBy; // DATE, TITLE, CATEGORY
  isDesc: boolean;
};

const initialState: TSearchPage = {
  dateRange: {
    from: getStartOfWeek(),
    to: getEndOfWeek(),
  },
  category: '',
  canShowDeletedCategory: false,
  record: '',
  orderBy: OrderBy.Date as TOrderBy,
  isDesc: false,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.setDate, (state, payload) => ({
    ...state,
    dateRange: { ...state.dateRange, [payload.key]: payload.date },
  }))
  .case(actions.setToday, (state, payload) => ({
    ...state,
    dateRange: {
      ...state.dateRange,
      [payload]: new Date(),
    },
  }))
  .case(actions.setState, (state, payload) => ({
    ...state,
    [payload.key]: payload.value,
  }));
export const searchPageReducers = reducers;
