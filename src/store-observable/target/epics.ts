import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../store';
import { targetActions } from '.';

// epics
const createTarget: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof targetActions.create.done>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(targetActions.create.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
  );

const updateTarget: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof targetActions.update.done>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(targetActions.update.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
  );

const deleteTarget: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof targetActions.delete.done>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(targetActions.delete.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
  );

export const targetEpics = combineEpics(createTarget, updateTarget, deleteTarget);
