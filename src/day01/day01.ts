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

const main = async () => {
  const entries = await readInput();
  console.log("Entries:", entries);
  let totalDistance = entries.reduce(
    (acc, entry) => Math.abs(entry.left - entry.right) + acc,
    0
  );
  console.log("Total distance between list entries: %d", totalDistance);
};

export default main;
