import { doesNotThrow } from "assert";
import { memoize, readFileEagerly } from "../utils";

export type Operation = Mul | Enable;

type Mul = {
  leftOperand: number;
  rightOperand: number;
};

type Enable = {
  enable: boolean;
};

export const readFileAsOneLine = async (inputFile: string) => {
  return (await readFileEagerly(inputFile)).reduce(
    (acc, line) => acc + line,
    ""
  );
};

export const getOperations: (input: string) => Operation[] = (
  input: string
) => {
  const regex =
    /((?<do>do\(\))|(?<dont>don't\(\))|(mul\((?<leftOperand>[0-9]+),(?<rightOperand>[0-9]+)\)+))/g;
  return [...input.matchAll(regex)].map(({ groups }) => {
    if ("do" in groups! && groups!.do) {
      return { enable: true };
    }
    if ("dont" in groups! && groups!.dont) {
      return { enable: false };
    }

    return {
      leftOperand: Number(groups!.leftOperand),
      rightOperand: Number(groups!.rightOperand),
    };
  });
};

export const aggregateOperationsIgnoringEnableDisable = (
  operations: Operation[]
) => {
  return operations
    .map((operation) =>
      "enable" in operation
        ? { leftOperand: 0, rightOperand: 0 }
        : { ...operation }
    )
    .reduce((acc, { leftOperand, rightOperand }) => {
      return acc + leftOperand * rightOperand;
    }, 0);
};

export const part1 = async (input: () => Promise<string>) => {
  const operations = getOperations(await input());
  const result = aggregateOperationsIgnoringEnableDisable(operations);
  return result;
};

const day3 = async (inputFile: string = "src/day03/input.txt") => {
  const input = memoize(() => readFileAsOneLine(inputFile));
  const part1Sum: number = await part1(input);
  console.log("Accumulated Operations: %s", part1Sum);
};

export default day3;
