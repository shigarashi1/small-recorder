import { Nullable } from '../index';

export interface ILoginFormBase {
  email: string;
  password: string;
}

export interface ISignUpForm extends ILoginFormBase {
  username: string;
  confirmation: string;
}

export interface ILogin {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  additionalInfo: Nullable<ILoginAddtionalInfo>;
}

export interface ILoginAddtionalInfo {
  email: string;
}

export type TSignInForm = ILoginFormBase;
