import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap } from 'rxjs/operators';
import { AppState } from '../../store';
import { authActions } from '.';
import { AuthenticationService } from '../../services/auth';
import { ApiError } from '../../models/error';
import Logger from '../../helpers/generals/logger';
import { replace, CallHistoryMethodAction } from 'connected-react-router';
import { EPath } from '../../types';
import { userActions } from '../user';
import { rootActions } from '../actions';

const signIn: Epic<
  AnyAction,
  | Action<void>
  | Action<Parameters<typeof authActions.signIn.done>[0]>
  | Action<Parameters<typeof userActions.read.started>[0]>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signIn.started),
    mergeMap(async ({ payload }) => {
      const res = await AuthenticationService.signIn(payload.email, payload.password);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        // TODO: errorの実装
        return [];
      }
      const { user } = res;
      return [authActions.signIn.done({ params: payload, result: { user } }), userActions.read.started({})];
    }),
  );

const signUp: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signUp.started),
    mergeMap(async ({ payload }) => {
      const { email, password, confirmation } = payload;
      // TODO: emailのフォーマット確認
      if (password !== confirmation) {
        // FIXME: business error classを用意する
        const businessError = new ApiError({ code: '0000', message: 'パスワードが一致しません.' });
        return { payload, res: businessError };
      }
      const res = await AuthenticationService.signUp(email, password);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      // FIXME: business error

      if (res instanceof ApiError) {
        // TODO: errorHandling
        return [];
      }

      const { user } = res;
      const { username } = payload;
      Logger().log('signUp', { user, username });
      // TODO: ユーザーを登録する
      return [];
    }),
  );

const signOut: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof authActions.signOut.done>[0]> | CallHistoryMethodAction,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signOut.started),
    mergeMap(async ({ payload }) => {
      const res = await AuthenticationService.signOut();
      return { res, payload };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [];
      }
      return [
        authActions.signOut.done({ params: payload, result: {} }),
        rootActions.clearAllState(),
        replace(EPath.Login),
      ];
    }),
  );

export const authEpics = combineEpics(signIn, signUp, signOut);
