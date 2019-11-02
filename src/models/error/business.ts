import { ErrorBase } from './base';
import { TWarmCode, TLangCode } from '../../i18n';
import { getMessage, toError } from '../../helpers/generals/message';

/**
 * ユーザー操作で回復可能なエラー（警告）
 */
export class BusinessError extends ErrorBase<TWarmCode> {
  // eslint-disable-next-line
  constructor(code: TWarmCode, params: string[] = [], langCode: TLangCode = 'jp') {
    super('');
    const message = getMessage.warm(code)(langCode);
    this._error = toError(code, message, params);
  }
}
