export const toPickKeysObject = <T>(obj: T, keys: Array<keyof T>) =>
  Object.keys(obj)
    .map(v => v as keyof T)
    .reduce((pre, key) => (keys.includes(key) ? { ...pre, [key]: obj[key] } : { ...pre }), {} as any);

export const toOmitKeysObject = <T>(obj: any, keys: string[]) =>
  Object.keys(obj).reduce((pre, key) => (keys.includes(key) ? { ...pre } : { ...pre, [key]: obj[key] }), {} as T);

export const toOmitUndefinedValueKey = <T>(obj: T): any =>
  Object.keys(obj)
    .map(k => k as keyof T)
    .reduce((pre, key) => (typeof obj[key] !== 'undefined' ? { ...pre, key: obj[key] } : { ...pre }), {});
