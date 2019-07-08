import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppState } from '../index';

import Logger from '../../helpers/logger';
import history from '../../helpers/history';
import { EPath } from '../../types';
import { IError } from '../../types/error';

export enum ActionType {
  LOGIN_REQUEST = '[User Feature] LOGIN_REQUEST',
  LOGIN_REQUEST_SUCCESS = '[User Feature] LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_FAILTURE = '[User Feature] LOGIN_REQUEST_FAILTURE',
  LOGOUT_REQUEST = '[User Feature] LOGOUT_REQUEST',
  LOGOUT_REQUEST_SUCCESS = '[User Feature] LOGOUT_REQUEST_SUCCESS',
  LOGOUT_REQUEST_FAILTURE = '[User Feature] LOGOUT_REQUEST_FAILTURE',
  LOAD_USER_REQUEST = '[User Feature] LOAD_USER_REQUEST',
  LOAD_USER_REQUEST_SUCCESS = '[User Feature] LOAD_USER_REQUEST_SUCCESS',
  LOAD_USER_REQUEST_FAILTURE = '[User Feature] LOAD_USER_REQUEST_FAILTURE',
  CREATE_USER_REQUEST = '[User Feature] CREATE_USER_REQUEST',
  CREATE_USER_REQUEST_SUCCESS = '[User Feature] CREATE_USER_REQUEST_SUCCESS',
  CREATE_USER_REQUEST_FAILTURE = '[User Feature] CREATE_USER_REQUEST_FAILTURE',
  UPDATE_USER_REQUEST = '[User Feature] UPDATE_USER_REQUEST',
  UPDATE_USER_REQUEST_SUCCESS = '[User Feature] UPDATE_USER_REQUEST_SUCCESS',
  UPDATE_USER_REQUEST_FAILTURE = '[User Feature] UPDATE_USER_REQUEST_FAILTURE',
}

// login
export type LoginRequest = { type: typeof ActionType.LOGIN_REQUEST };
export type LoginRequestSuccess = { type: typeof ActionType.LOGIN_REQUEST_SUCCESS; payload: any };
export type LoginRequestFailture = { type: typeof ActionType.LOGIN_REQUEST_FAILTURE; ex: IError[] };

// logout
export type LogoutRequest = { type: typeof ActionType.LOGOUT_REQUEST };
export type LogoutRequestSuccess = { type: typeof ActionType.LOGOUT_REQUEST_SUCCESS; payload: any };
export type LogoutRequestFailture = { type: typeof ActionType.LOGOUT_REQUEST_FAILTURE; ex: IError[] };

// load
export type LoadUsersRequest = { type: typeof ActionType.LOAD_USER_REQUEST };

// Actions
export function loginRequest(): LoginRequest {
  return { type: ActionType.LOGIN_REQUEST };
}

export function loginRequestSuccess(payload: any): LoginRequestSuccess {
  return { type: ActionType.LOGIN_REQUEST_SUCCESS, payload };
}

export function loginRequestFailture(ex: IError[]): LoginRequestFailture {
  return { type: ActionType.LOGIN_REQUEST_FAILTURE, ex };
}

export function logoutRequest(): LogoutRequest {
  return { type: ActionType.LOGOUT_REQUEST };
}

export function logoutRequestSuccess(payload: any): LogoutRequestSuccess {
  return { type: ActionType.LOGOUT_REQUEST_SUCCESS, payload };
}

export function logoutRequestFailture(ex: IError[]): LogoutRequestFailture {
  return { type: ActionType.LOGOUT_REQUEST_FAILTURE, ex };
}

export function loadUsersRequest(): LoadUsersRequest {
  return { type: ActionType.LOAD_USER_REQUEST };
}

// Action Creater
export function login(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] login');
  return (dispatch: Dispatch) => {
    dispatch(loginRequest());
    setTimeout(() => {
      dispatch(loginRequestSuccess({}));
      history.push(EPath.Home);
    }, 300);
  };
}

export function logout(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] logout');
  return (dispatch: Dispatch) => {
    dispatch(logoutRequest());
    setTimeout(() => {
      dispatch(logoutRequestSuccess({}));
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
  | LoginRequest
  | LoginRequestSuccess
  | LoginRequestFailture
  | LogoutRequest
  | LogoutRequestSuccess
  | LogoutRequestFailture
  | LoadUsersRequest;
