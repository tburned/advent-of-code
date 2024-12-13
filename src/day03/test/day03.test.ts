import { expect, test } from "@jest/globals";
import { getOperations } from "..";
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
  const input = (await readFileEagerly("src/day03/test/input.txt"))[0];
  expect(getOperations(input)).toEqual([
    { leftOperand: 2, rightOperand: 4 },
    { leftOperand: 5, rightOperand: 5 },
    { leftOperand: 11, rightOperand: 8 },
    { leftOperand: 8, rightOperand: 5 },
  ]);
});
