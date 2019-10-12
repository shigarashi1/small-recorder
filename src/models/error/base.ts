import { IError, TMessageType } from '../../types/error';
import { getMessage } from '../../helpers/generals/message';

export class ErrorBase extends Error {
  get error() {
    return this._error;
  }

  protected _error: IError;

  constructor(error: any, type: TMessageType = 'err') {
    super();
    if (typeof error === 'string') {
      const { code, message } = getMessage(type, error);
      this._error = { code, message };
      return;
    }

    const errorMessage = error.message || '';
    this._error = { code: 'unknown', message: `An unknown error has occurred. ${errorMessage}` };
  }
}
