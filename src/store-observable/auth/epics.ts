import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap } from 'rxjs/operators';
import { AppState } from '../../store';
import { authActions } from '.';
import { AuthenticationService } from '../../services/auth';
import { ApiError } from '../../models/error';
import { replace, CallHistoryMethodAction } from 'connected-react-router';
import { EPath } from '../../types';
import { userActions } from '../user';
import { rootActions } from '../actions';
import { errorActions } from '../error';
import { THandleError } from '../error/action-reducers';
import { WrapAction } from '../../types/action';

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
      const { email, password } = payload;
      const res = await AuthenticationService.signIn(email, password);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          authActions.signIn.failed({ params: payload, error: {} }),
        ];
      }
      const { user } = res;
      return [
        authActions.signIn.done({ params: payload, result: { user } }),
        userActions.read.started({}), // MEMO: backgroundで自動読み込みにしたので不要
      ];
    }),
  );

const signUp: Epic<
  AnyAction,
  | Action<THandleError>
  | Action<void>
  | WrapAction<typeof userActions.create.started>
  | WrapAction<typeof authActions.signUp.failed>
  | WrapAction<typeof authActions.signUp.done>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signUp.started),
    mergeMap(async ({ payload }) => {
      const { email, password } = payload;
      const res = await AuthenticationService.signUp(email, password);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          authActions.signUp.failed({ params: payload, error: {} }),
        ];
      }
      if (!res.user || !res.user.uid) {
        return [
          errorActions.handle({ error: new ApiError('0003') }), //
          authActions.signUp.failed({ params: payload, error: {} }),
        ];
      }
      return [
        authActions.signUp.done({ params: payload, result: {} }), //
        userActions.create.started({ uid: res.user.uid, username: payload.username }),
      ];
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
