import { ErrorBase } from './base';

/**
 * システムエラー
 */
export class SystemError extends ErrorBase {
  // eslint-disable-next-line
  constructor(error: string) {
    super(error);
  }
}
