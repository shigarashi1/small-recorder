import { IError } from '../types/error';
import Logger from '../helpers/generals/logger';
import { getMessage } from '../helpers/generals/message';

export class ApiError extends Error {

  get error() {
    return this._errors;
  }
  private _errors: IError[] = [];

  constructor(error: IError | string | Error) {
    super();
    if (typeof error === 'string') {
      const code = error;
      const message = getMessage('err', error, []);
      this._errors.push({ code, error: message });
    } else if (this.isIError(error)) {
      this._errors.push({ ...error });
    } else if (this.isError(error)) {
      this._errors.push({ code: 'unknown', error: error.stack ? error.stack : error.toString() });
    }
    Logger.error('ApiError', error);
  }
  private isIError = (value: any): value is IError => value.hasOwnProperty('code');
  private isError = (value: any): value is Error => value.hasOwnProperty('stack');
}
