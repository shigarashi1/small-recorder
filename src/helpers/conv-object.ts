export const toPickKeysObject = <T>(obj: any, keys: Array<keyof T>) =>
  Object.keys(obj).reduce(
    (pre, key) => (keys.includes(key as keyof T) ? { ...pre, [key]: obj[key] } : { ...pre }),
    {} as T,
  );

export const toOmitKeysObject = <T>(obj: any, keys: string[]) =>
  Object.keys(obj).reduce((pre, key) => (keys.includes(key) ? { ...pre } : { ...pre, [key]: obj[key] }), {} as T);

export const toOmitUndefinedValueKey = <T>(obj: T): any =>
  Object.keys(obj)
    .map(k => k as keyof T)
    .reduce((pre, key) => (typeof obj[key] !== 'undefined' ? { ...pre, key: obj[key] } : { ...pre }), {});
