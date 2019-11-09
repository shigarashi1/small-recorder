const excludeKeyObject = <T>(isPick: boolean, keys: Array<keyof T>, obj: T) => {
  const isMatch = (key: keyof T) => keys.includes(key);
  const isExcludeKey = (key: keyof T) => (isPick ? !isMatch(key) : isMatch(key));
  return Object.keys(obj)
    .map(v => v as keyof T)
    .reduce((pre, key) => (isExcludeKey(key) ? { ...pre } : { ...pre, [key]: obj[key] }), {} as any);
};

export const pickKeysObject = <T>(obj: T, keys: Array<keyof T>) => excludeKeyObject(true, keys, obj);
export const omitKeysObject = <T>(obj: any, keys: Array<keyof T>) => excludeKeyObject(false, keys, obj as T);

export const omitUndefinedValueKeys = <T>(obj: T): any =>
  Object.keys(obj)
    .map(k => k as keyof T)
    .reduce((pre, key) => {
      const value = obj[key];
      if (typeof value === 'undefined') {
        return { ...pre };
      }
      if (typeof value === 'function') {
        return { ...pre };
      }
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return { ...pre, [key]: value.map(omitUndefinedValueKeys) };
        }
        return { ...pre, [key]: omitUndefinedValueKeys(value) };
      }
      return { ...pre, [key]: value };
    }, {});
