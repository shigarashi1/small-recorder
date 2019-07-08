import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { TLoginState, TUserErrorState, IUserState, userReducer, userErrorReducer, loginReducer } from './reducer';
import { AppState } from '../index';

export * from './action';

export interface IUserFeature {
  user: IUserState;
  login: TLoginState;
  errors: TUserErrorState;
}

export const reducers = combineReducers({
  user: userReducer,
  login: loginReducer,
  errors: userErrorReducer,
});

const featureSelector = (state: AppState): IUserFeature => state.userFeature;

const getUserState = createSelector(
  featureSelector,
  state => state.user,
);

export const getUser = createSelector(
  getUserState,
  state => state.user,
);

export const getIsLoading = createSelector(
  getUserState,
  state => state.isLoading,
);

export const getIsLoaded = createSelector(
  getUserState,
  state => state.isLoaded,
);

export const getUserErrors = createSelector(
  featureSelector,
  state => state.errors,
);

const getLoginState = createSelector(
  featureSelector,
  state => state.login,
);

export const getIsLoggedIn = createSelector(
  getLoginState,
  state => state.isLoggedIn,
);
