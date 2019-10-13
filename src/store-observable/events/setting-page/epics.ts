import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../store';
import { settingPageActions } from './actions';
import { categoryActions } from '../../category';
import { WrapAction } from '../../types';

const createCategory: Epic<AnyAction, WrapAction<typeof categoryActions.create.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.createCategory),
    map(({ payload }) => categoryActions.create.started({ name: payload.name })),
  );

const updateCategory: Epic<AnyAction, WrapAction<typeof categoryActions.update.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.updateCategory),
    map(({ payload }) => categoryActions.update.started({ id: payload.id, data: { name: payload.name } })),
  );

const deleteCategory: Epic<AnyAction, WrapAction<typeof categoryActions.delete.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.deleteCategory),
    map(({ payload }) => categoryActions.delete.started({ id: payload.id })),
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
