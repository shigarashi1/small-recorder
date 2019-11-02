export interface ILangObj {
  jp: string;
  en?: string;
}

export const Sample1Page = {
  title: {
    jp: '言語選択画面',
    en: 'Selection Language Page',
  },
  color: {
    jp: 'カラー',
    en: 'color',
  },
};

export const Sample2Page = {
  title: {
    jp: 'サンプル2',
    en: 'Sample Page2',
  },
  timer: {
    jp: 'タイマー',
    en: 'timer',
  },
};

export const LANG_RESOURCE = {
  Sample1Page,
  Sample2Page,
};

export const getLabel = (code: keyof ILangObj, resource: ILangObj): string => {
  return typeof resource[code] !== 'undefined' ? String(resource[code]) : resource.jp;
};

// usage
// const title = getLabel('jp', LANG_RESOURCE.Sample1Page.title);
