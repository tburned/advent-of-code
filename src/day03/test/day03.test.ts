import { expect, test } from "@jest/globals";
import {
  aggregateOperationsRespectingEnableDisable,
  getOperations,
  Operation,
  part1,
  part2,
  readFileAsOneLine,
} from "..";
import { readFileEagerly } from "../../utils";

test("itParsesSimpleOperations", () => {
  const input = "mul(2,3)";
  expect(getOperations(input)).toEqual([{ leftOperand: 2, rightOperand: 3 }]);
});

test("itParsesMultipleOperations", () => {
  const input = "mul(2,3)mul(4,5)";
  expect(getOperations(input)).toEqual([
    { leftOperand: 2, rightOperand: 3 },
    { leftOperand: 4, rightOperand: 5 },
  ]);
});

test("itParsesOperandsOver10", () => {
  const input = "mul(11,12)";
  expect(getOperations(input)).toEqual([{ leftOperand: 11, rightOperand: 12 }]);
});

test("itParsesOperationsWhenNearCorruption", async () => {
  const input = (await readFileEagerly("src/day03/test/part1.txt"))[0];
  expect(
    getOperations(input).filter((operation) => "leftOperand" in operation)
  ).toEqual([
    { leftOperand: 2, rightOperand: 4 },
    { leftOperand: 5, rightOperand: 5 },
    { leftOperand: 11, rightOperand: 8 },
    { leftOperand: 8, rightOperand: 5 },
  ]);
});

test("itParsesDosAndDonts", () => {
  const input = "mul(2,3)don't()mul(4,5)do()mul(1,2)";
  const operations = getOperations(input);
  expect(operations).toEqual([
    { leftOperand: 2, rightOperand: 3 },
    { enable: false },
    { leftOperand: 4, rightOperand: 5 },
    { enable: true },
    { leftOperand: 1, rightOperand: 2 },
  ]);
});

test("itRespectsEnableDisable", () => {
  const operations: Operation[] = [
    { leftOperand: 2, rightOperand: 3 },
    { enable: false },
    { leftOperand: 4, rightOperand: 5 },
    { enable: true },
    { leftOperand: 1, rightOperand: 2 },
  ];
  expect(aggregateOperationsRespectingEnableDisable(operations).sum).toEqual(8);
});

test("itGetsTheRightAnswerForPart2Test", async () => {
  const input = () => readFileAsOneLine("src/day03/test/part2.txt");
  expect(await part2(input)).toEqual(48);
});

test("itGetsTheCorrectRealAnswerPart1", async () => {
  const input = () => readFileAsOneLine("src/day03/input.txt");
  expect(await part1(input)).toBe(181345830);
});

test("itGetsCorrectAnswerPart2", async () => {
  const input = () => readFileAsOneLine("src/day03/input.txt");
  expect(await part2(input)).toBe(98729041);
});
