import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map, delay } from 'rxjs/operators';
import { AppState } from '../../store';
import { userActions } from './action-reducers';
import { CallHistoryMethodAction, replace } from 'connected-react-router';
import { EPath } from '../../types';
import { appStateSelector } from '../state-selector/objects/app-state';
import { UserService } from '../../services/user';
import { ApiError } from '../../models/error';
import { THandleError, errorActions } from '../error/action-reducers';
import { WrapAction } from '../types';
import { TInfoDialog } from '../../types/components/dialog';
import { infoDialogActions } from '../utilities';
import Logger from '../../helpers/generals/logger';

const readUser: Epic<
  AnyAction,
  | Action<void>
  | Action<THandleError>
  | WrapAction<typeof userActions.read.done>
  | WrapAction<typeof userActions.read.failed>
  | CallHistoryMethodAction,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(userActions.read.started),
    delay(100),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const uid = payload.uid || stateSelector.uid;
      return { payload, uid };
    }),
    mergeMap(async ({ payload, uid }) => {
      const res = await UserService.readUser(uid);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: res }), //
          userActions.read.failed({ params: payload, error: {} }),
        ];
      }
      if (!res) {
        return [
          errorActions.handle({ error: new ApiError('0002') }), //
          userActions.read.failed({ params: payload, error: {} }),
        ];
      }
      return [
        userActions.read.done({ params: payload, result: { user: res } }), //
        replace(EPath.Home),
      ];
    }),
  );

const createUser: Epic<
  AnyAction,
  | Action<void>
  | Action<THandleError>
  | Action<TInfoDialog>
  | WrapAction<typeof userActions.create.done>
  | WrapAction<typeof userActions.create.failed>
  | WrapAction<typeof userActions.read.started>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(userActions.create.started),
    mergeMap(async ({ payload }) => {
      const { uid, username } = payload;
      const res = await UserService.createUser(uid, username);
      return { payload, res };
    }),
    mergeMap(({ payload, res }) => {
      if (res instanceof ApiError) {
        return [
          errorActions.handle({ error: new ApiError('0003') }), //
          userActions.create.failed({ params: payload, error: {} }),
        ];
      }
      const data = {
        hasOpen: true,
        title: 'Small Recorderへようこそ!',
        context: `${payload.username}さん、お楽しみください!`,
        onClose: () => {
          Logger.log('dummy');
        },
      };
      return [
        userActions.create.done({ params: payload, result: {} }),
        userActions.read.started({ uid: payload.uid }), //
        infoDialogActions.show(data),
      ];
    }),
  );

const deleteUser: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(userActions.delete.started),
    map(({ payload }) => payload),
    mergeMap(action => []),
  );

export const userEpics = combineEpics(readUser, createUser, deleteUser);
