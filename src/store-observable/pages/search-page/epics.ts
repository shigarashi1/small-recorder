import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, mergeMap, filter, debounceTime } from 'rxjs/operators';
import { AppState } from '../../../store';
import { searchPageActions } from '.';
import { appStateSelector } from '../../state-selector';
import { TRecordFeatureState, recordActions } from '../../record/action-reducers';
import {
  formatDate,
  isValidDate,
  toDateRange,
  getThisDateRange,
  getStartDate,
  getEndDate,
} from '../../../helpers/generals';
import { TDateRange } from '../../../types';
import { TSearchPage } from './action-reducers';

const load: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(searchPageActions.load),
    map(({ payload }) => {
      const { searchPageState } = appStateSelector(store.value);
      return { payload, searchPageState };
    }),
    filter(({ searchPageState }) => searchPageState !== undefined),
    map(({ searchPageState }) => {
      const { dateRange } = searchPageState as TSearchPage;
      if (!isValidDate(dateRange.from) || !isValidDate(dateRange.to)) {
        recordActions.setDateRange({
          ...toDateRange(
            getThisDateRange({
              from: getStartDate(true),
              to: getEndDate(true),
            }),
          ),
        });
      }
      return recordActions.setDateRange({ ...toDateRange(dateRange) });
    }),
  );

const setToday: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(searchPageActions.setToday),
    map(({ payload }) => {
      const { recordState } = appStateSelector(store.value);
      return { payload, recordState };
    }),
    filter(({ recordState }) => recordState !== undefined),
    map(({ payload, recordState }) => {
      const { dateRange } = recordState as TRecordFeatureState;
      return recordActions.setDateRange({
        ...dateRange,
        [payload]: formatDate(),
      });
    }),
  );

const setDate: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(searchPageActions.setDate),
    filter(({ payload }) => isValidDate(payload.date)),
    map(({ payload }) => {
      const { recordState } = appStateSelector(store.value);
      return { payload, recordState };
    }),
    filter(({ recordState }) => recordState !== undefined),
    debounceTime(400),
    map(({ payload, recordState }) => {
      const { dateRange } = recordState as TRecordFeatureState;
      return recordActions.setDateRange({
        ...dateRange,
        [payload.key]: formatDate(payload.date),
      });
    }),
  );

export const searchPageEpics = combineEpics(load, setToday, setDate);
