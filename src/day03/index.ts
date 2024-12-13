import { readFileEagerly } from "../utils";

export type Operation = {
  leftOperand: number;
  rightOperand: number;
};

export const getOperations: (input: string) => Operation[] = (
  input: string
) => {
  const regex = /(mul\((?<leftOperand>[0-9]+),(?<rightOperand>[0-9]+)\)+)/g;
  return [...input.matchAll(regex)].map(({ groups }) => ({
    leftOperand: Number(groups!.leftOperand),
    rightOperand: Number(groups!.rightOperand),
  }));
};

export const aggregateOperations = (operations: Operation[]) => {
  return operations.reduce((acc, { leftOperand, rightOperand }) => {
    return acc + leftOperand * rightOperand;
  }, 0);
};

const part1 = (input: string) => {
  const operations = getOperations(input);
  const result = aggregateOperations(operations);
  return result;
};

const day3 = async (inputFile: string = "src/day03/input.txt") => {
  const input = (await readFileEagerly(inputFile)).reduce(
    (acc, line) => acc + line,
    ""
  );
  const part1Sum = part1(input);
  console.log("Accumulated Operations: %s", part1Sum);
};

export default day3;
