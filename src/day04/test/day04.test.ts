import { expect, test } from "@jest/globals";
import { readFileEagerly } from "../../utils";
import { part1 } from "..";
import { search } from "../search";

test("itGetsTheExampleRight", async () => {
  const getInput = async () =>
    await readFileEagerly("src/day04/test/part1.txt");
  expect(await part1(getInput, "XMAS")).toBe(18);
});

test("itGetsTheModifiedExampleRight", async () => {
  const getInput = async () =>
    await readFileEagerly("src/day04/test/part1-modified.txt");
  expect(await part1(getInput, "XMAS")).toBe(19);
});

test("itSearchesCorrectlyInEveryDirection", () => {
  const word = "bee";
  const grid = [];
  for (let r = 0; r < 5; r++) {
    const row = [];
    for (let c = 0; c < 5; c++) {
      row.push("e");
    }
    grid.push(row);
  }
  grid[2][2] = "b";
  expect(search(grid, word)).toBe(8);
});

test("itGetsPart1Right", async () => {
  const getInput = async () => await readFileEagerly("src/day04/input.txt");
  expect(await part1(getInput, "XMAS")).toBe(2560);
});
