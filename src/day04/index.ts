import { memoize, readFileEagerly, readFileLazily } from "../utils";
import { search } from "./search";

const parseGrid = (input: string[]): string[][] => {
  return input.map((line) => line.split(""));
};

export const part1 = async (
  getInput: () => Promise<string[]>,
  word: string = "XMAS"
): Promise<number> => {
  const input = await getInput();
  const grid = parseGrid(input);
  return search(grid, word);
};

const day4 = async (inputFileName: string = "src/day04/input.txt") => {
  const getInput = memoize(async () => readFileEagerly(inputFileName));
  const part1Count = await part1(getInput);
  console.log("Part 1:", part1Count);
};

export default day4;
