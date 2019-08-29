export const delayFunction = async <T>(func: () => T, ms: number = 100): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func());
    }, ms);
  });
};
