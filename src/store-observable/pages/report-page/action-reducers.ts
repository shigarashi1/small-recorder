import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth } from '../../../helpers/generals';
import { TDateRange } from '../../record/action-reducers';

// actions
const ac = actionCreatorFactory('[---- ReportsPage]');
const actions = {
  load: ac<void>('load'),
  setDate: ac<{ key: keyof TDateRange<Date>; date: Date }>('setDate'),
  setThisWeekOrMonth: ac<void>('setThisWeekOrMonth'),
  togleTerm: ac<void>('togleTerm'),
};
export const reportPageActions = actions;

// reducers
export type TReportPage = {
  dateRange: TDateRange<Date>;
  isMonth: boolean;
};

const initialState: TReportPage = {
  dateRange: {
    from: getStartOfWeek(),
    to: getEndOfWeek(),
  },
  isMonth: false,
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.setDate, (state, payload) => ({
    ...state,
    dateRange: { ...state.dateRange, [payload.key]: payload.date },
  }))
  .case(actions.setThisWeekOrMonth, (state, payload) => ({
    ...state,
    dateRange: {
      ...state.dateRange,
      from: state.isMonth ? getStartOfMonth() : getStartOfWeek(),
      to: state.isMonth ? getEndOfMonth() : getEndOfWeek(),
    },
  }))
  .case(actions.togleTerm, (state, payload) => ({ ...state, isMonth: !state.isMonth }));
export const reportPageReducers = reducers;
