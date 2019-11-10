import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../store';
import { recordActions } from '.';
import { appStateSelector } from '../state-selector';
import { RecordService } from '../../services';
import { WrapAction } from '../types';
import { errorActions } from '../error';
import { THandleError } from '../error/action-reducers';
import { ApiError } from '../../models/error';

// epics
const createRecord: Epic<
  AnyAction,
  Action<THandleError> | WrapAction<typeof recordActions.create.done> | WrapAction<typeof recordActions.create.failed>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.create.started),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      return { payload, userId };
    }),
    mergeMap(async ({ payload, userId }) => {
      const { category, date, record } = payload;
      const res = await RecordService.createRecord({ user: userId, category, date, record });
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          recordActions.create.failed({ params: payload, error: {} }),
        ];
      }
      return [recordActions.create.done({ params: payload, result: {} })];
    }),
  );

const updateRecord: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof recordActions.update.done>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.update.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
  );

const deleteRecord: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof recordActions.delete.done>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.delete.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
  );

export const recordEpics = combineEpics(createRecord, updateRecord, deleteRecord);
