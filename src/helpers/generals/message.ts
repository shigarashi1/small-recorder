import { TMessageType } from '../../types/error';
import { IMessage } from '../../types/message';
import { INFO_MESSAGES, WARN_MESSAGES, ERROR_MESSAGES } from '../../lookups/message';

// FIXME: カリー化する
export const getMessage = (type: TMessageType, targetCode: string, value: string[] = []): IMessage => {
  const messageList = getMessageList(type);
  const { code, message } = findMessage(targetCode, messageList, type);
  return { code, message: replaceMessage(message, value) };
};

const getMessageList = (type: TMessageType): IMessage[] => {
  switch (type) {
    case 'info':
      return INFO_MESSAGES;
    case 'warn':
      return WARN_MESSAGES;
    default:
      return ERROR_MESSAGES;
  }
};

const findMessage = (code: string, messageList: IMessage[], type: TMessageType): IMessage =>
  messageList.find(v => v.code === code) || {
    code: 'unknown',
    message: `not found message. type: ${type}, code: ${code}`,
  };

const replaceMessage = (message: string, value: string[]): string =>
  value.reduce((pre, cur, i) => pre.replace(`{${i}}`, cur), message);
