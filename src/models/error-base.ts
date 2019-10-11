import { IError } from '../types/error';

type TError = string | IError | IError[];

export class ErrorBase<T = TError> extends Error {
  private _errors: IError[] = [];

  constructor(error: T) {
    super();
    if (typeof error === 'string') {
      this._errors.push({ code: 'E0000', message: error });
    } else if (Array.isArray(error)) {
      this._errors = [...error];
    } else if (isIError(error)) {
      this._errors.push({ ...error });
    }
  }

  get errors() {
    return this._errors;
  }
}

function isIError(value: any): value is IError {
  return value.hasOwnProperty('code');
}
