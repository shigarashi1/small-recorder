import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap } from 'rxjs/operators';
import { AppState } from '../../store';
import { authActions } from '.';
import { AuthenticationService } from '../../services/auth';
import { ApiError } from '../../models/ApiError';
import Logger from '../../helpers/generals/logger';
import { replace, CallHistoryMethodAction } from 'connected-react-router';
import { EPath } from '../../types';

const signIn: Epic<
  AnyAction,
  Action<void> | Action<Parameters<typeof authActions.signIn.done>[0]> | CallHistoryMethodAction,
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
        return [];
      }
      const uid = res.user ? res.user.uid : '';
      Logger.log('signIn uid', uid);
      // userの取得に進む
      return [authActions.signIn.done({ params: payload, result: {} }), replace(EPath.Home)];
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
        return new ApiError({ code: '0000', error: 'パスワードが一致しません.' });
      }
      return await AuthenticationService.signUp(email, password);
    }),
    mergeMap(res => {
      if (res instanceof ApiError) {
        return [];
      }
      const uid = res.user ? res.user.uid : '';
      Logger.log('signUp uid', uid);
      // TODO: 未定
      return [];
    }),
  );

const signOut: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signOut.started),
    mergeMap(({ payload }) => AuthenticationService.signOut()),
    mergeMap(res => {
      if (res instanceof ApiError) {
        return [];
      }
      // TODO: 未定
      return [];
    }),
  );

export const authEpics = combineEpics(signIn, signUp, signOut);
