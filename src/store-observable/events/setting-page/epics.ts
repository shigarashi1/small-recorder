import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../store';
import { settingPageActions } from './actions';

const createCategory: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.createCategory),
    mergeMap(({ payload }) => []),
  );

const updateCategory: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.updateCategory),
    mergeMap(({ payload }) => []),
  );

const deleteCategory: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.deleteCategory),
    mergeMap(({ payload }) => []),
  );

const createTarget: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.createTarget),
    mergeMap(({ payload }) => []),
  );

const updateTarget: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.updateTarget),
    mergeMap(({ payload }) => []),
  );

const deleteTarget: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.deleteTarget),
    mergeMap(({ payload }) => []),
  );

export const settingPageEpics = combineEpics(
  createCategory,
  updateCategory,
  deleteCategory,
  createTarget,
  updateTarget,
  deleteTarget,
);
