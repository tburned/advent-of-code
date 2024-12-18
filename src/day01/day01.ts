import { MaxHeap } from "@datastructures-js/heap";
import { readFileEagerly } from "../utils";
import { ListEntry } from "./types";

export const readInput: (inputFile: string) => Promise<ListEntry[]> = async (
  inputFile
) => {
  const lines = await readFileEagerly(inputFile);

  const left = new MaxHeap<number>();
  const right = new MaxHeap<number>();
  for (const line of lines) {
    const items = line.split(/\s+/); // should always be a pair
    left.push(parseInt(items[0]));
    right.push(parseInt(items[1]));
  }

  const leftAsArray = left.sort();
  const rightAsArray = right.sort();
  const entries: ListEntry[] = [];
  for (let i = 0; i < left.size(); i++) {
    entries.push({ left: leftAsArray[i], right: rightAsArray[i] });
  }

  return entries;
};

export const sortListEntries = (entries: ListEntry[]) => {
  const left = new MaxHeap<number>();
  const right = new MaxHeap<number>();
  entries.forEach((entry) => {
    left.push(entry.left);
    right.push(entry.right);
  });

  const leftAsArray = left.sort();
  const rightAsArray = right.sort();
  const results: ListEntry[] = [];
  for (let i = 0; i < left.size(); i++) {
    results.push({ left: leftAsArray[i], right: rightAsArray[i] });
  }

  return results;
};

export const calculateTotalDistance = (entries: ListEntry[]) => {
  return entries.reduce(
    (acc, entry) => Math.abs(entry.left - entry.right) + acc,
    0
  );
};

export const calculateSimilarityScore = (entries: ListEntry[]) => {
  const leftItems = new Set(entries.map(({ left }) => left));

  type FrequencyMap = {
    [key: number]: number;
  };
  const rightFrequencies = entries
    .map(({ right }) => right)
    .filter((number) => leftItems.has(number))
    .reduce((acc, number) => {
      acc[number] = (acc[number] ?? 0) + 1;
      return acc;
    }, {} as FrequencyMap);

  return entries.reduce((acc, { left: number }) => {
    const weightedOccurrence = number * (rightFrequencies[number] ?? 0);
    return acc + weightedOccurrence;
  }, 0);
};

const main = async (inputFile: string = "src/day01/input.txt") => {
  const entries = await readInput(inputFile);
  const sortedEntries = sortListEntries(entries);
  console.log("Entries:", sortedEntries);

  let totalDistance = calculateTotalDistance(sortedEntries);
  console.log("Total distance between list entries: %d", totalDistance);

  let similarityScore = calculateSimilarityScore(sortedEntries);
  console.log("Similarity score between lists: %d", similarityScore);
};

export default main;
