import { TErrorCode, TWarmCode, TInfoCode, TLangCode, getLabel, getMessageObj } from '../../i18n';
import { IError } from '../../types';

const getErrorMessage = (code: TErrorCode) => (langCode: TLangCode) => getLabel(langCode, getMessageObj.error(code));

const getWarmMessage = (code: TWarmCode) => (langCode: TLangCode) => getLabel(langCode, getMessageObj.warm(code));

const getInfoMessage = (code: TInfoCode) => (langCode: TLangCode) => getLabel(langCode, getMessageObj.info(code));

export const getMessage = {
  error: getErrorMessage,
  warm: getWarmMessage,
  info: getInfoMessage,
};

export const replaceMessage = (message: string) => (params: string[] = []) =>
  params.reduce((pre, cur, i) => pre.replace(`{${i}}`, cur), message);

export const toError = (code: string, message: string, params: string[] = []): IError => ({
  code,
  message: replaceMessage(message)(params),
});
