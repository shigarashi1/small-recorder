import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map, filter } from 'rxjs/operators';
import { AppState } from '../../store';
import { targetActions } from '.';
import { WrapAction } from '../types';
import { appStateSelector } from '../state-selector';
import { TargetService } from '../../services';
import { THandleError, errorActions } from '../error/action-reducers';
import { ApiError } from '../../models/error';
import { loadingActions } from '../utilities';

// epics
const createTarget: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof targetActions.create.done>
  | WrapAction<typeof targetActions.create.failed>
  | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(targetActions.create.started),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      return { payload, userId };
    }),
    filter(({ userId }) => userId !== '' && userId !== null),
    // FIXME: この手のチェックはpageのactionsに移動
    filter(({ payload }) => payload.category !== '' && payload.category !== null),
    mergeMap(async ({ payload, userId }) => {
      const { category, term, count } = payload;
      const res = await TargetService.createTarget({ user: userId, category, term, count });
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          targetActions.create.failed({ params: payload, error: {} }),
        ];
      }
      return [targetActions.create.done({ params: payload, result: {} })];
    }),
  );

const updateTarget: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof targetActions.update.done>
  | WrapAction<typeof targetActions.update.failed>
  | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(targetActions.update.started),
    mergeMap(async ({ payload }) => {
      const res = await TargetService.updateTarget(payload.id, { ...payload.data });
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          targetActions.update.failed({ params: payload, error: {} }),
        ];
      }
      return [targetActions.update.done({ params: payload, result: {} })];
    }),
  );

const deleteTarget: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof targetActions.delete.done>
  | WrapAction<typeof targetActions.delete.failed>
  | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(targetActions.delete.started),
    mergeMap(async ({ payload }) => {
      const res = await TargetService.deleteTarget(payload.id);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          targetActions.delete.failed({ params: payload, error: {} }),
        ];
      }
      return [
        loadingActions.end(), // 削除の場合、ローディングが消えないので.
        targetActions.delete.done({ params: payload, result: {} }),
      ];
    }),
  );

export const targetEpics = combineEpics(createTarget, updateTarget, deleteTarget);
