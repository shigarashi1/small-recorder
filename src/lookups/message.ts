import { IMessage } from '../types/message';

export const ERROR_MESSAGES: IMessage[] = [
  {
    code: '0000',
    message: 'Catched Unknown Error.\nmessage: {0}, stacktrace: {1}',
  },
  {
    code: '0001',
    message: 'Catched App Error.\nmessage: {0}, stacktrace: {1}',
  },
];
