export const toKeysPickObject = <T, K>(obj: K, keys: Array<keyof K>) => {
  return keys.reduce((pre, key) => ({ ...pre, [key]: obj[key] }), {} as T);
};
