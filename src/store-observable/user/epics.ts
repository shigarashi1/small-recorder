import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map, filter } from 'rxjs/operators';
import { AppState } from '../../store';
import { userActions } from './action-reducers';
import { CallHistoryMethodAction, replace } from 'connected-react-router';
import { EPath } from '../../types';
import { appStateSelector } from '../state-selector/objects/app-state';
import { UserService } from '../../services/user';
import { ApiError } from '../../models/ApiError';
import Logger from '../../helpers/generals/logger';
import { CategoryService } from '../../services/category';

const readUser: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof userActions.readUser.done>[0]> | CallHistoryMethodAction,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(userActions.readUser.started),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const uid = stateSelector.uid;
      return { payload, uid };
    }),
    mergeMap(async ({ payload, uid }) => {
      const res = await UserService.readUser(uid);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [];
      }
      if (!res) {
        // TODO: うーん、エラー画面に遷移？？？
        return [];
      }
      const user = res;
      Logger.log('user', user);
      return [replace(EPath.Home), userActions.readUser.done({ params: payload, result: { user } })];
    }),
  );

// TODO: あとで移動
const readCategories: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(userActions.readUser.done),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const userId = stateSelector.userId;
      return { payload, userId };
    }),
    filter(({ userId }) => userId !== '' && userId !== null),
    mergeMap(async ({ payload, userId }) => {
      const res = await CategoryService.readCategories({ userId: String(userId) });
      return { payload, res, userId };
    }),
    mergeMap(({ payload, res, userId }) => {
      console.log(res);
      return [];
    }),
  );

export const userEpics = combineEpics(readUser, readCategories);
