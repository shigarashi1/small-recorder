import { IMessage } from '../types/message';

export const ERROR_MESSAGES: IMessage[] = [
  {
    code: '0000',
    message: 'Unknown System Error.\nmessage: {0}, stacktrace: {1}',
  },
  {
    code: '0001',
    message: 'System Error. message: {0}',
  },
  {
    code: '0002',
    message: 'ログインに失敗しました.',
  },
  {
    code: '0003',
    message: 'ユーザーの作成に失敗しました.',
  },
  {
    code: '0004',
    message: 'ログアウトに失敗しました.',
  },
];

export const WARN_MESSAGES: IMessage[] = [
  {
    code: '0001',
    message: 'Bussiness Error. message: {0}',
  },
];

export const INFO_MESSAGES: IMessage[] = [
  {
    code: '0001',
    message: 'Infomation Message Sample. message: {0}',
  },
];
