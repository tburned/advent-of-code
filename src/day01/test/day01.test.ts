import { expect, test } from "@jest/globals";

import {
  readInput,
  sortListEntries,
  calculateTotalDistance,
  calculateSimilarityScore,
} from "../day01";

const testFileName = "src/day01/test/testInput.txt";

test("Day 1: Part 1", async () => {
  const entries = await readInput(testFileName);
  const sortedEntries = sortListEntries(entries);
  expect(calculateTotalDistance(sortedEntries)).toBe(11);
});

test("Day 1: Part 2", async () => {
  const entries = await readInput(testFileName);
  const sortedEntries = sortListEntries(entries);
  console.log(sortedEntries);
  expect(calculateSimilarityScore(sortedEntries)).toBe(31);
});
