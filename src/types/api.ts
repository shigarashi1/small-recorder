import { IError } from './error';

export interface IApiResponseSuccess<T = any> {
  data: T;
}

export interface IApiResponseError {
  errors: TApiError;
}

export type TApiError = IError[];
