import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, filter, debounceTime } from 'rxjs/operators';
import { AppState } from '../../../store';
import { reportPageActions } from '.';
import { appStateSelector } from '../../state-selector';
import { TReportPage } from './action-reducers';
import {
  getThisDateRange,
  toDateRange,
  isValidDate,
  getDateRange,
  getStartDate,
  getEndDate,
} from '../../../helpers/generals';
import { recordActions } from '../../record';
import { addMonths, addWeeks } from 'date-fns';
import { TDateRange } from '../../../types';

// epics
const load: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(reportPageActions.load),
    map(({ payload }) => {
      const { reportPageState } = appStateSelector(store.value);
      return { payload, reportPageState };
    }),
    filter(({ reportPageState }) => reportPageState !== undefined),
    map(obj => {
      const { isMonth, dateRange } = obj.reportPageState as TReportPage;
      if (!isValidDate(dateRange.from) || !isValidDate(dateRange.to)) {
        recordActions.setDateRange({
          ...toDateRange(
            getThisDateRange({
              from: getStartDate(isMonth),
              to: getEndDate(isMonth),
            }),
          ),
        });
      }
      return recordActions.setDateRange({ ...toDateRange(dateRange) });
    }),
  );

const setDate: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(reportPageActions.setDate),
    filter(({ payload }) => isValidDate(payload.date)),
    map(({ payload }) => {
      const { reportPageState } = appStateSelector(store.value);
      return { payload, reportPageState };
    }),
    filter(({ reportPageState }) => reportPageState !== undefined),
    debounceTime(400),
    map(obj => {
      const { isMonth } = obj.reportPageState as TReportPage;
      const { key, date } = obj.payload;
      const addDate = isMonth ? addMonths : addWeeks;
      const dateRange = getDateRange(key, addDate, date);
      return recordActions.setDateRange({ ...toDateRange(dateRange) });
    }),
  );

const setThisWeekOrMonth: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(reportPageActions.setThisWeekOrMonth),
    debounceTime(200),
    map(({ payload }) => {
      const { reportPageState } = appStateSelector(store.value);
      return { payload, reportPageState };
    }),
    filter(({ reportPageState }) => reportPageState !== undefined),
    map(obj => {
      const { isMonth } = obj.reportPageState as TReportPage;
      const dateRange = getThisDateRange({
        from: getStartDate(isMonth),
        to: getEndDate(isMonth),
      });
      return recordActions.setDateRange({ ...toDateRange(dateRange) });
    }),
  );

export const reportPageEpics = combineEpics(load, setDate, setThisWeekOrMonth);
