import { AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../../../store';
import { settingPageActions } from './actions';
import { categoryActions } from '../../category';
import { WrapAction } from '../../types';
import Logger from '../../../helpers/generals/logger';
import { targetActions } from '../../target';

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

const createTarget: Epic<AnyAction, WrapAction<typeof targetActions.create.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.createTarget),
    tap(v => Logger.log(v)),
    map(({ payload }) => targetActions.create.started(payload)),
  );

const updateTarget: Epic<AnyAction, WrapAction<typeof targetActions.update.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.updateTarget),
    map(({ payload }) => targetActions.update.started(payload)),
  );

const deleteTarget: Epic<AnyAction, WrapAction<typeof targetActions.delete.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(settingPageActions.deleteTarget),
    map(({ payload }) => targetActions.delete.started(payload)),
  );

export const settingPageEpics = combineEpics(
  createCategory,
  updateCategory,
  deleteCategory,
  createTarget,
  updateTarget,
  deleteTarget,
);
