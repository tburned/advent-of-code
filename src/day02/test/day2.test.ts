import { expect, test } from "@jest/globals";

import { part1, getReports, part2 } from "../day2";
import { Report } from "../types";
import { isReportSafe, omit1Dampener } from "../reportSafety";

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
  expect(isReportSafe(safeReport, omit1Dampener)).toEqual(true);

  expect(isReportSafe([1, 3, 2, 4, 5], omit1Dampener)).toEqual(true);

  expect(isReportSafe([8, 6, 4, 4, 1], omit1Dampener)).toEqual(true);

  expect(isReportSafe([10, 12, 9, 7, 6], omit1Dampener)).toEqual(true);
});

test("it calls not dampener-safe reports unsafe", () => {
  expect(isReportSafe([1, 2, 7, 8, 9], omit1Dampener)).toEqual(false);

  expect(isReportSafe([9, 7, 6, 2, 1], omit1Dampener)).toEqual(false);
});

test("Day 2: Part 1", async () => {
  const result = await part1(testFileName);
  expect(result).toEqual(2);
});

test("Day 2: Part 2", async () => {
  const result = await part2(testFileName);
  expect(result).toEqual(4);
});
