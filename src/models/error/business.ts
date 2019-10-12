import { ErrorBase } from './base';

/**
 * ユーザー操作で回復可能なエラー（警告）
 */
export class BusinessError extends ErrorBase {
  // eslint-disable-next-line
  constructor(error: string) {
    super(error, 'warn');
  }
}
