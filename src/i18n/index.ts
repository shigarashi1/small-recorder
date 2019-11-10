import { TI18nObj } from '../types';
import { MESSAGES } from './resouce';

export type TLangCode = keyof TI18nObj;
export type TErrorCode = keyof typeof MESSAGES.error;
export type TWarmCode = keyof typeof MESSAGES.warm;
export type TInfoCode = keyof typeof MESSAGES.info;

/**
 * ext: const title = getLabel('jp', LANG_RESOURCE.Sample1Page.title);
 * @param langCode jp | en
 * @param resource TI18nObj
 */
export const getLabel = (langCode: TLangCode, resource: TI18nObj): string =>
  typeof resource[langCode] !== undefined ? String(resource[langCode]) : resource.jp;

const getErrorMessageObj = (code: TErrorCode): TI18nObj => MESSAGES.error[code];
const getWarmMessageObj = (code: TWarmCode): TI18nObj => MESSAGES.warm[code];
const getInfoMessageObj = (code: TInfoCode): TI18nObj => MESSAGES.info[code];

/**
 * usage sample:
 * const messageObj = getMessageObj.error('0001')
 */
export const getMessageObj = {
  error: getErrorMessageObj,
  warm: getWarmMessageObj,
  info: getInfoMessageObj,
};
