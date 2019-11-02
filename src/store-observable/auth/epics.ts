import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap } from 'rxjs/operators';
import { AppState } from '../../store';
import { authActions } from '.';
import { AuthenticationService } from '../../services/auth';
import { ApiError, BusinessError } from '../../models/error';
import { replace, CallHistoryMethodAction } from 'connected-react-router';
import { EPath } from '../../types';
import { userActions } from '../user';
import { rootActions } from '../actions';
import { errorActions } from '../error';
import { THandleError } from '../error/action-reducers';
import { WrapAction } from '../types';
import Logger from '../../helpers/generals/logger';

const signIn: Epic<
  AnyAction,
  | Action<THandleError>
  | WrapAction<typeof authActions.signIn.done>
  | WrapAction<typeof authActions.signIn.failed>
  | WrapAction<typeof userActions.read.started>,
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
        return [errorActions.handle({ error: res }), authActions.signIn.failed({ params: payload, error: {} })];
      }
      const { user } = res;
      return [
        authActions.signIn.done({ params: payload, result: { user } }),
        // userActions.read.started({}) // MEMO: backgroundで自動読み込みにしたので不要
      ];
    }),
  );

const signUp: Epic<
  AnyAction,
  Action<THandleError> | Action<void> | WrapAction<typeof authActions.signUp.failed>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signUp.started),
    mergeMap(async ({ payload }) => {
      const { email, password, confirmation } = payload;
      // TODO: emailとかのバリデーションを実行する
      if (password !== confirmation) {
        // FIXME: これはpageのactionに移動
        const businessError = new BusinessError('0001');
        return { payload, res: businessError };
      }
      const res = await AuthenticationService.signUp(email, password);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof BusinessError || res instanceof ApiError) {
        return [errorActions.handle({ error: res }), authActions.signUp.failed({ params: payload, error: {} })];
      }
      if (!res.user) {
        return [];
      }

      Logger.log('signUp', { uid: res.user.uid, username: payload.username });

      // TODO: ユーザーを登録する
      return [];
    }),
  );

const signOut: Epic<
  AnyAction,
  | Action<void>
  | Action<THandleError>
  | WrapAction<typeof authActions.signOut.done>
  | WrapAction<typeof authActions.signOut.failed>
  | CallHistoryMethodAction,
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
        return [errorActions.handle({ error: res }), authActions.signOut.failed({ params: payload, error: {} })];
      }
      return [
        authActions.signOut.done({ params: payload, result: {} }), // signout 完了
        rootActions.clearAllState(), // state clear
        replace(EPath.Login), // login画面に遷移
      ];
    }),
  );

export const authEpics = combineEpics(signIn, signUp, signOut);
