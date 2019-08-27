import { ThunkAction } from 'redux-thunk';
import { AppState } from '../..';
import { Action, Dispatch } from 'redux';

import Logger from '../../../helpers/logger';
import history from '../../../helpers/history';
import { EPath } from '../../../types';

function signIn(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] login');
  return async (dispatch: Dispatch) => {
    try {
      setTimeout(() => {
        // dispatch(signInRequestSuccess({}));
        history.push(EPath.Home);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };
}

function signOut(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] logout');
  return async (dispatch: Dispatch) => {
    try {
      setTimeout(() => {
        // dispatch(signInRequestSuccess({}));
        history.push(EPath.Login);
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };
}

export const loginPageAction = {
  signIn,
  signOut,
};
