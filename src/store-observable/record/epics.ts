import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../store';
import { recordActions } from '.';

// epics
const createRecord: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof recordActions.create.done>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.create.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
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
