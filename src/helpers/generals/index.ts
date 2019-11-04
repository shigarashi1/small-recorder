export const delayFunction = async <T>(func: () => T, ms: number = 100): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func());
    }, ms);
  });
};

export const generateId = <T extends { id: number }>(array: T[]) =>
  array.length !== 0 ? Math.max(...array.map(v => v.id)) : 0;

export const by = <T>(key: keyof T) => (v: any) => (data: T): boolean => data[key] === v;
