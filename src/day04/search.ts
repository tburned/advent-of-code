import { get } from "http";

type Coordinates = {
  row: number;
  column: number;
};

type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

type Transforms = {
  [key in Direction]: (coordinates: Coordinates) => Coordinates;
};
const transforms: Transforms = {
  N: (coordinates) => ({
    row: coordinates.row - 1,
    column: coordinates.column,
  }),
  NE: (coordinates) => ({
    row: coordinates.row - 1,
    column: coordinates.column + 1,
  }),
  E: (coordinates) => ({
    row: coordinates.row,
    column: coordinates.column + 1,
  }),
  SE: (coordinates) => ({
    row: coordinates.row + 1,
    column: coordinates.column + 1,
  }),
  S: (coordinates) => ({
    row: coordinates.row + 1,
    column: coordinates.column,
  }),
  SW: (coordinates) => ({
    row: coordinates.row + 1,
    column: coordinates.column - 1,
  }),
  W: (coordinates) => ({
    row: coordinates.row,
    column: coordinates.column - 1,
  }),
  NW: (coordinates) => ({
    row: coordinates.row - 1,
    column: coordinates.column - 1,
  }),
};

const canGo = (
  grid: string[][],
  coordinates: Coordinates,
  direction: Direction
): boolean => {
  const newCoordinates = transforms[direction](coordinates);
  return (
    grid[newCoordinates.row] &&
    grid[newCoordinates.row][newCoordinates.column] !== undefined
  );
};

const searchInDirection = (
  grid: string[][],
  chars: string,
  currentCoordinates: Coordinates,
  direction: Direction
) => {
  // shouldn't happen, but just in case
  if (chars.length === 0) {
    return true;
  }

  if (!canGo(grid, currentCoordinates, direction)) {
    return false;
  }

  const newCoordinates = transforms[direction](currentCoordinates);
  if (!chars.startsWith(grid[newCoordinates.row][newCoordinates.column])) {
    return false;
  }

  if (chars.length === 1) {
    return true;
  }

  return searchInDirection(grid, chars.slice(1), newCoordinates, direction);
};

const getNextCoordinates = (
  grid: string[][],
  { row, column }: Coordinates
): Coordinates | undefined => {
  if (grid.length === row) {
    return undefined;
  }

  if (grid[row].length === column) {
    if (grid.length === row + 1) {
      return undefined;
    }
    return {
      row: row + 1,
      column: 0,
    };
  }

  return {
    row,
    column: column + 1,
  };
};

export const searchInAllDirectionsFrom = (
  grid: string[][],
  word: string,
  coordinates: Coordinates = { row: 0, column: 0 }
): number => {
  if (word.length === 0 || grid.length === 0) {
    return 0;
  }

  if (!word.startsWith(grid[coordinates.row][coordinates.column])) {
    return 0;
  }

  return Object.keys(transforms)
    .map((direction) =>
      searchInDirection(
        grid,
        word.slice(1),
        coordinates,
        direction as Direction
      )
    )
    .reduce((acc, found) => acc + (found ? 1 : 0), 0);
};

export const search = (
  grid: string[][],
  word: string,
  origin: Coordinates = { row: 0, column: 0 }
): number => {
  if (word.length === 0 || grid.length === 0) {
    return 0;
  }

  let nextCoordinates = getNextCoordinates(grid, origin);
  if (!nextCoordinates) {
    return 0;
  }

  let count = 0;
  do {
    console.log(nextCoordinates);
    count += searchInAllDirectionsFrom(grid, word, nextCoordinates);
    nextCoordinates = getNextCoordinates(grid, nextCoordinates);
  } while (nextCoordinates != null);

  return count;
};
