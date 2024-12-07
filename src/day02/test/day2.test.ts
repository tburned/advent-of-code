import { expect, test } from "@jest/globals";

import {
  part1,
  isReportSafe,
  isReportSafeWithDampeners,
  getReports,
  Report,
  part2,
} from "../day2";

const testFileName = "src/day02/test/testInput.txt";

const safeReport: Report = [7, 6, 4, 2, 1];
const unsafeReport: Report = [1, 2, 7, 8, 9];

test("it reads the input", async () => {
  const reports = await getReports(testFileName);
  expect(reports.length).toEqual(6);
  expect(reports[0]).toEqual([7, 6, 4, 2, 1]);
});

test("it calls safe reports safe", () => {
  expect(isReportSafe(safeReport)).toEqual(true);

  expect(isReportSafe([1, 3, 6, 7, 9])).toEqual(true);
});

test("it calls not safe reports not safe", () => {
  const result = isReportSafe(unsafeReport);
  expect(result).toEqual(false);
});

test("it calls dampener-safe reports safe", () => {
  expect(isReportSafeWithDampeners(safeReport)).toEqual(true);

  expect(isReportSafeWithDampeners([1, 3, 2, 4, 5])).toEqual(true);

  expect(isReportSafeWithDampeners([8, 6, 4, 4, 1])).toEqual(true);

  expect(isReportSafeWithDampeners([10, 12, 9, 7, 6])).toEqual(true);
});

test("it calls not dampener-safe reports unsafe", () => {
  expect(isReportSafeWithDampeners([1, 2, 7, 8, 9])).toEqual(false);

  expect(isReportSafeWithDampeners([9, 7, 6, 2, 1])).toEqual(false);
});

test("Day 2: Part 1", async () => {
  const result = await part1(testFileName);
  expect(result).toEqual(2);
});

test("Day 2: Part 2", async () => {
  const result = await part2(testFileName);
  expect(result).toEqual(4);
});
