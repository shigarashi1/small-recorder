import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map, filter } from 'rxjs/operators';
import { CategoryService } from '../../services/category';
import { appStateSelector } from '../state-selector/objects/app-state';
import { AppState } from '../../store';
import { categoryActions } from './action-reducers';
import { ApiError } from '../../models/error';
import { WrapAction } from '../types';
import { errorActions } from '../error';
import { THandleError } from '../error/action-reducers';

const readCategories: Epic<
  AnyAction,
  Action<void> | WrapAction<typeof categoryActions.read.done> | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(categoryActions.read.started),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      return { payload, userId };
    }),
    filter(({ userId }) => userId !== '' && userId !== null),
    mergeMap(async ({ payload, userId }) => {
      const res = await CategoryService.readCategories({ user: userId });
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [errorActions.handle({ error: res })];
      }
      return [categoryActions.read.done({ params: payload, result: {} })];
    }),
  );

const updateCategory: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof categoryActions.update.done>
  | WrapAction<typeof categoryActions.update.failed>
  | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(categoryActions.update.started),
    filter(({ payload }) => payload.id !== '' && payload.data.name !== undefined),
    mergeMap(async ({ payload }) => {
      const { id, data } = payload;
      const res = await CategoryService.updateCategory(id, { ...data });
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          categoryActions.update.failed({ params: payload, error: {} }),
        ];
      }
      return [categoryActions.update.done({ params: payload, result: {} })];
    }),
  );

const createCategory: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof categoryActions.create.done>
  | WrapAction<typeof categoryActions.create.failed>
  | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(categoryActions.create.started),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      return { payload, userId };
    }),
    filter(({ userId }) => userId !== '' && userId !== null),
    filter(({ payload }) => payload.name !== undefined),
    mergeMap(async ({ payload, userId }) => {
      const res = await CategoryService.createCategory({ user: String(userId), name: payload.name });
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          categoryActions.create.failed({ params: payload, error: {} }),
        ];
      }
      return [categoryActions.create.done({ params: payload, result: {} })];
    }),
  );

const deleteCategory: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof categoryActions.delete.done>
  | WrapAction<typeof categoryActions.delete.failed>
  | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(categoryActions.delete.started),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      return { payload, userId };
    }),
    filter(({ payload }) => payload.id !== undefined),
    mergeMap(async ({ payload }) => {
      const res = await CategoryService.deleteCategory(payload.id);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          categoryActions.delete.failed({ params: payload, error: {} }),
        ];
      }
      return [categoryActions.delete.done({ params: payload, result: {} })];
    }),
  );

export const categoryEpics = combineEpics(readCategories, updateCategory, createCategory, deleteCategory);
