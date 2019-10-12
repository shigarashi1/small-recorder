import { IError } from '../../types/error';
import { isIError } from '../../helpers/generals/type-guard';
import { ErrorBase } from './base';

/**
 * APIで生じたエラー
 */
export class ApiError extends ErrorBase {
  constructor(error: IError | string | Error) {
    super(error);
    if (isIError(error)) {
      this._error = { ...error };
    }
  }
}
