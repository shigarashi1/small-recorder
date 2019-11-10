import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, filter, debounceTime } from 'rxjs/operators';
import { AppState } from '../../../store';
import { recordPageActions } from '.';
import { isInvalidDate, matchCondition } from '../../../helpers/generals';
import { formatDate, isPast } from '../../../helpers/generals/date';
import { recordActions } from '../../record';
import { TDateRange } from '../../record/action-reducers';
import { appStateSelector } from '../../state-selector';
import { WrapAction } from '../../types';
import { THandleError, errorActions } from '../../error/action-reducers';
import { BusinessError } from '../../../models/error';
import { TWarmCode } from '../../../i18n';

const changeDate: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.changeDate),
    filter(({ payload }) => !isInvalidDate(payload.date) && isPast(payload.date)),
    debounceTime(400),
    map(({ payload }) => {
      const date = formatDate(payload.date);
      return recordActions.setDateRange({ from: date, to: date });
    }),
  );

const createRecord: Epic<
  AnyAction,
  Action<void> | WrapAction<typeof recordActions.create.started> | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.createRecord),
    debounceTime(200),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      const dateRange = stateSelector.recordDateRange;
      return { payload, userId, dateRange };
    }),
    map(({ payload, userId, dateRange }) => {
      const { category, record } = payload;
      const errorCode = matchCondition<TWarmCode>(
        [['0000', !userId], ['0003', !category], ['0004', !record], ['0000', dateRange.from !== dateRange.to]],
        undefined,
      );
      if (errorCode) {
        return errorActions.handle({ error: new BusinessError(errorCode) });
      }
      return recordActions.create.started({ category, date: dateRange.from, record });
    }),
  );

export const recordPageEpics = combineEpics(changeDate, createRecord);
