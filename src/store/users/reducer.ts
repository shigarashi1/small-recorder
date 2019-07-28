import { ActionType, UsersActions } from './action';
import { TApiError } from '../../types/api';
import { IPageBase } from '../../types/page-base';
import { ILogin } from '../../types/login-page';
import { IUser } from '../../types/firebase';
import config from '../../configuration/config';

export interface IUserState extends IPageBase {
  user: IUser;
}

const initialUserState: IUserState = {
  user: {
    _id: null,
    uid: '',
    username: '',
    auth: null,
    createdAt: null,
    updatedAt: null,
  },
  isLoaded: false,
  isLoading: false,
};

export type TUserErrorState = TApiError[];

export type TLoginState = ILogin;

const initialLoginState: TLoginState = {
  isLoggedIn: config.isDev ? true : false,
  isLoggingIn: false,
  additionalInfo: null,
};

export function userReducer(state: IUserState = initialUserState, action: UsersActions): IUserState {
  switch (action.type) {
    case ActionType.LOAD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
  }

  return state;
}

export function userErrorReducer(state: TUserErrorState = [], action: UsersActions): TUserErrorState {
  switch (action.type) {
    case ActionType.SIGN_IN_REQUEST_FAILTURE:
      return [];
  }

  return state;
}

export function loginReducer(state: TLoginState = initialLoginState, action: UsersActions): TLoginState {
  switch (action.type) {
    case ActionType.SIGN_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };

    case ActionType.SIGN_IN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
      };

    case ActionType.SIGN_OUT_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };

    case ActionType.SIGN_OUT_REQUEST_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
  }

  return state;
}
