export const memoize = (fn: any) => {
  type Cache = {
    [key: string]: any;
  };
  const cache: Cache = {};
  return (...args: any) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};
