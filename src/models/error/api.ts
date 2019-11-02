import { IError } from '../../types';
import { isIError } from '../../helpers/generals/type-guard';
import { ErrorBase } from './base';
import { TErrorCode } from '../../i18n';

/**
 * APIで生じたエラー
 */
export class ApiError extends ErrorBase<TErrorCode> {
  constructor(error: IError | TErrorCode | Error) {
    super(error);
    if (isIError(error)) {
      this._error = { ...error };
    }
  }
}
