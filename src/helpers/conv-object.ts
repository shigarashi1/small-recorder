const excludeObjectKey = <T>(isPick: boolean, keys: Array<keyof T>, obj: T) => {
  const isMatch = (key: keyof T) => keys.includes(key);
  const isExcludeKey = (key: keyof T) => !((isMatch(key) && isPick) || (!isMatch(key) && !isPick));
  return Object.keys(obj)
    .map(v => v as keyof T)
    .reduce((pre, key) => (isExcludeKey(key) ? { ...pre } : { ...pre, [key]: obj[key] }), {} as any);
};

export const pickKeysObject = <T>(obj: T, keys: Array<keyof T>) => excludeObjectKey(true, keys, obj);
export const omitKeysObject = <T>(obj: any, keys: Array<keyof T>) => excludeObjectKey(false, keys, obj as T);

export const omitUndefinedValueKeys = <T>(obj: T): any =>
  Object.keys(obj)
    .map(k => k as keyof T)
    .reduce((pre, key) => {
      const value = obj[key];
      const type = typeof obj[key];
      if (type === 'undefined') {
        return { ...pre };
      }
      if (type === 'object') {
        if (Array.isArray(value)) {
          return { ...pre, [key]: value.map(omitUndefinedValueKeys) };
        }
        return { ...pre, [key]: omitUndefinedValueKeys(value) };
      }
      return { ...pre, [key]: value };
    }, {});
