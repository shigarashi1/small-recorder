const error = {
  '0000': {
    jp: '不明なエラーが発生しました. message: {0}, stacktrace: {1}',
    en: 'Unknown System Error.\nmessage: {0}, stacktrace: {1}',
  },
  '0001': {
    jp: '不明なエラーが発生しました. message: {0}',
    en: 'System Error. message: {0}',
  },
  '0002': {
    jp: 'ログインに失敗しました.',
    en: 'failture login.',
  },
  '0003': {
    jp: 'ユーザーの作成に失敗しました.',
    en: 'failture create user.',
  },
  '0004': {
    jp: 'ログアウトに失敗しました.',
    en: 'failture logout.',
  },
};

const warm = {
  '0000': {
    jp: '不正な操作です.',
    en: 'Bussiness Error. message: {0}',
  },
  '0001': {
    jp: 'パスワードが一致しません.',
    en: 'not correct password confirm.',
  },
  '0002': {
    jp: '',
    en: '',
  },
  '0003': {
    jp: 'カテゴリを選択してください.',
    en: 'please select category.',
  },
  '0004': {
    jp: '記録を入力してください.',
    en: 'please input record.',
  },
};

const info = {
  '0000': {
    jp: '',
    en: '',
  },
  '0001': {
    jp: '',
    en: 'Infomation Message Sample. message: {0}',
  },
  '0002': {
    jp: '',
    en: '',
  },
  '0003': {
    jp: '',
    en: '',
  },
};

export const MESSAGES = {
  error,
  warm,
  info,
};
