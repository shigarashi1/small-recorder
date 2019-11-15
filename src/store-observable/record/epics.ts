import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../store';
import { recordActions } from '.';
import { appStateSelector } from '../state-selector';
import { RecordService } from '../../services';
import { WrapAction } from '../../types/action';
import { errorActions } from '../error';
import { THandleError } from '../error/action-reducers';
import { ApiError } from '../../models/error';
import { loadingActions } from '../utilities';

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
  | Action<THandleError>
  | Action<Parameters<typeof recordActions.update.done>[0]>
  | Action<Parameters<typeof recordActions.update.failed>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.update.started),
    mergeMap(async ({ payload }) => {
      const { id, data } = payload;
      const res = await RecordService.updateRecord(id, data);
      return { payload, res };
    }),
    mergeMap(({ res, payload }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          recordActions.update.failed({ params: payload, error: {} }),
        ];
      }
      return [recordActions.update.done({ params: payload, result: {} })];
    }),
  );

const deleteRecord: Epic<
  AnyAction,
  | Action<void>
  | Action<THandleError>
  | Action<Parameters<typeof recordActions.delete.done>[0]>
  | Action<Parameters<typeof recordActions.delete.failed>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.delete.started),
    mergeMap(async ({ payload }) => {
      const res = await RecordService.deleteRecord(payload.id);
      return { payload, res };
    }),
    mergeMap(({ res, payload }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          recordActions.delete.failed({ params: payload, error: {} }),
        ];
      }
      return [
        loadingActions.end(), // 削除の場合、ローディングが消えないので.
        recordActions.delete.done({ params: payload, result: {} }),
      ];
    }),
  );

export const recordEpics = combineEpics(createRecord, updateRecord, deleteRecord);
