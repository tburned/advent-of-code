import fs from "fs";
import readline from "readline";
import { MaxHeap, MinHeap } from "@datastructures-js/heap";

type ListEntry = {
  left: number;
  right: number;
};

const readInput: () => Promise<ListEntry[]> = async () => {
  const fileStream = fs.createReadStream("src/day01/input.txt");

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const left = new MaxHeap<number>();
  const right = new MaxHeap<number>();
  for await (const line of lines) {
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

const sortListEntries = (entries: ListEntry[]) => {
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

const calculateTotalDistance = (entries: ListEntry[]) => {
  return entries.reduce(
    (acc, entry) => Math.abs(entry.left - entry.right) + acc,
    0
  );
};

const calculateSimilarityScore = (entries: ListEntry[]) => {
  const leftItems = new Set(entries.map((entry) => entry.left));

  type FrequencyMap = {
    [key: number]: number;
  };
  const rightFrequencies = entries
    .map((entry) => entry.right)
    .filter((item) => leftItems.has(item))
    .reduce((acc, number) => {
      acc[number] = (acc[number] ?? 0) + 1;
      return acc;
    }, {} as FrequencyMap);

  return Object.entries(rightFrequencies).reduce((acc, [number, frequency]) => {
    const weightedOccurrence = parseInt(number) * frequency;
    return acc + weightedOccurrence;
  }, 0);
};

const main = async () => {
  const entries = await readInput();
  const sortedEntries = sortListEntries(entries);
  console.log("Entries:", sortedEntries);

  let totalDistance = calculateTotalDistance(sortedEntries);
  console.log("Total distance between list entries: %d", totalDistance);

  let similarityScore = calculateSimilarityScore(sortedEntries);
  console.log("Similarity score between lists: %d", similarityScore);
};

export default main;
