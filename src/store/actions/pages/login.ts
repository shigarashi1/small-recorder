import { ThunkAction } from 'redux-thunk';
import { AppState } from '../..';
import { Action, Dispatch } from 'redux';

import Logger from '../../../helpers/generals/logger';
import history from '../../../helpers/history';
import { EPath } from '../../../types';
import { delayFunction } from '../../../helpers/generals';

export type TSignIn = {};
function signIn(payload: TSignIn): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] signIn');
  return async (dispatch: Dispatch) => {
    try {
      const login = () => history.push(EPath.Home);
      await delayFunction(login, 500);
    } catch (error) {
      console.error(error);
    }
  };
}

export type TSignOut = {};
function signOut(payload: TSignOut): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] signOut');
  return async (dispatch: Dispatch) => {
    try {
      const logout = () => history.push(EPath.Login);
      await delayFunction(logout, 500);
    } catch (error) {
      console.error(error);
    }
  };
}

export const loginPageActions = {
  signIn,
  signOut,
};
