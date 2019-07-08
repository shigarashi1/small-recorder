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
}

export type ISignInForm = ILoginFormBase;
