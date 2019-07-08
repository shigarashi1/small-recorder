import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppState } from '../index';

import Logger from '../../helpers/logger';
import history from '../../helpers/history';
import { EPath } from '../../types';
import { IError } from '../../types/error';

export enum ActionType {
  SIGN_IN_REQUEST = '[User Feature] SIGN_IN_REQUEST',
  SIGN_IN_REQUEST_SUCCESS = '[User Feature] SIGN_IN_REQUEST_SUCCESS',
  SIGN_IN_REQUEST_FAILTURE = '[User Feature] SIGN_IN_REQUEST_FAILTURE',
  SIGN_OUT_REQUEST = '[User Feature] SIGN_OUT_REQUEST',
  SIGN_OUT_REQUEST_SUCCESS = '[User Feature] SIGN_OUT_REQUEST_SUCCESS',
  SIGN_OUT_REQUEST_FAILTURE = '[User Feature] SIGN_OUT_REQUEST_FAILTURE',
  SIGN_UP_REQUEST = '[User Feature] SIGN_UP_REQUEST',
  SIGN_UP_REQUEST_SUCCESS = '[User Feature] SIGN_UP_REQUEST_SUCCESS',
  SIGN_UP_REQUEST_FAILTURE = '[User Feature] SIGN_UP_REQUEST_FAILTURE',
  LOAD_USER_REQUEST = '[User Feature] LOAD_USER_REQUEST',
  LOAD_USER_REQUEST_SUCCESS = '[User Feature] LOAD_USER_REQUEST_SUCCESS',
  LOAD_USER_REQUEST_FAILTURE = '[User Feature] LOAD_USER_REQUEST_FAILTURE',
  UPDATE_USER_REQUEST = '[User Feature] UPDATE_USER_REQUEST',
  UPDATE_USER_REQUEST_SUCCESS = '[User Feature] UPDATE_USER_REQUEST_SUCCESS',
  UPDATE_USER_REQUEST_FAILTURE = '[User Feature] UPDATE_USER_REQUEST_FAILTURE',
}

// login
export type SignInRequest = { type: typeof ActionType.SIGN_IN_REQUEST };
export type SignInRequestSuccess = { type: typeof ActionType.SIGN_IN_REQUEST_SUCCESS; payload: any };
export type SignInRequestFailture = { type: typeof ActionType.SIGN_IN_REQUEST_FAILTURE; ex: IError[] };

// logout
export type SignOutRequest = { type: typeof ActionType.SIGN_OUT_REQUEST };

export type SignOutRequestSuccess = { type: typeof ActionType.SIGN_OUT_REQUEST_SUCCESS; payload: any };

export type SignOutRequestFailture = {
  type: typeof ActionType.SIGN_OUT_REQUEST_FAILTURE;
  ex: IError[];
};

// load
export type LoadUsersRequest = { type: typeof ActionType.LOAD_USER_REQUEST };

// Actions
export function signInRequest(): SignInRequest {
  return { type: ActionType.SIGN_IN_REQUEST };
}

export function signInRequestSuccess(payload: any): SignInRequestSuccess {
  return { type: ActionType.SIGN_IN_REQUEST_SUCCESS, payload };
}

export function signInRequestFailture(ex: IError[]): SignInRequestFailture {
  return { type: ActionType.SIGN_IN_REQUEST_FAILTURE, ex };
}

export function signOutRequest(): SignOutRequest {
  return { type: ActionType.SIGN_OUT_REQUEST };
}

export function signOutRequestSuccess(payload: any): SignOutRequestSuccess {
  return { type: ActionType.SIGN_OUT_REQUEST_SUCCESS, payload };
}

export function signOutRequestFailture(ex: IError[]): SignOutRequestFailture {
  return { type: ActionType.SIGN_OUT_REQUEST_FAILTURE, ex };
}

export function loadUsersRequest(): LoadUsersRequest {
  return { type: ActionType.LOAD_USER_REQUEST };
}

// Action Creater
export function signIn(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] login');
  return (dispatch: Dispatch) => {
    dispatch(signInRequest());
    setTimeout(() => {
      dispatch(signInRequestSuccess({}));
      history.push(EPath.Home);
    }, 300);
  };
}

export function signOut(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] logout');
  return (dispatch: Dispatch) => {
    dispatch(signOutRequest());
    setTimeout(() => {
      dispatch(signOutRequestSuccess({}));
      history.push(EPath.Login);
    }, 300);
  };
}

export function getUser(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] getUser');
  return (dispatch: Dispatch) => {
    dispatch(loadUsersRequest());
  };
}

export type UsersActions =
  | SignInRequest
  | SignInRequestSuccess
  | SignInRequestFailture
  | SignOutRequest
  | SignOutRequestSuccess
  | SignOutRequestFailture
  | LoadUsersRequest;
