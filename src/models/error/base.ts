import { getMessage, toError } from '../../helpers/generals/message';
import { IError } from '../../types';
import { TLangCode, TErrorCode } from '../../i18n';

export class ErrorBase<T = TErrorCode> extends Error {
  get error() {
    return this._error;
  }

  protected _error: IError;

  constructor(error: T | any, params: string[] = [], langCode: TLangCode = 'jp') {
    super();
    if (typeof error === 'string') {
      const code = error as TErrorCode;
      const message = getMessage.error(code)(langCode);
      this._error = toError(code, message, params);
      return;
    }

    const errorMessage = error.message || '';
    this._error = { code: 'unknown', message: `An unknown error has occurred. ${errorMessage}` };
  }
}
