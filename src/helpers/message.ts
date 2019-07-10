import { TMessageType } from '../types/error';
import { IMessage } from '../types/message';
import { INFO_MESSAGES, WARN_MESSAGES, ERROR_MESSAGES } from '../lookups/message';

export function getMessage(type: TMessageType, code: string, value: string[]): string {
  const messageList = getMessageList(type);
  const message = findMessage(code, messageList, type);
  return replaceMessage(message, value);
}

function getMessageList(type: TMessageType): IMessage[] {
  switch (type) {
    case 'info':
      return INFO_MESSAGES;
    case 'warn':
      return WARN_MESSAGES;
    default:
      return ERROR_MESSAGES;
  }
}

function findMessage(code: string, messageList: IMessage[], type: TMessageType): string {
  const message = messageList.find(v => v.code === code);
  if (!message) {
    return `not found message. type: ${type}, code: ${code}`;
  }
  return message.message;
}

function replaceMessage(message: string, value: string[]): string {
  return value.reduce((pre, cur, i) => {
    return pre.replace(`{${i}}`, cur);
  }, message);
}
