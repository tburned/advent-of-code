import { memoize, readFileEagerly, readFileLazily } from "../utils";
import { search, searchForX } from "./search";

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

export const part2 = async (getInput: () => Promise<string[]>) => {
  const input = await getInput();
  const grid = parseGrid(input);
  return searchForX(grid);
};

const day4 = async (inputFileName: string = "src/day04/input.txt") => {
  const getInput = memoize(async () => readFileEagerly(inputFileName));
  const part1Count = await part1(getInput);
  console.log("Part 1:", part1Count);

  const part2Count = await part2(getInput);
  console.log("Part 2:", part2Count);
};

export default day4;
