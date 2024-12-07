import fs from "fs";
import readline from "readline";

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

export const readFileLazily = (inputFile: string) => {
  const fileStream = fs.createReadStream(inputFile);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
};

export const readFileEagerly = async (inputFile: string) => {
  const lines = readFileLazily(inputFile);
  const results: string[] = [];
  for await (const line of lines) {
    results.push(line);
  }
  return results;
};
