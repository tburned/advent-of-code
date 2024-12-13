export type Coordinates = {
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

const searchInDirectionStartingAt = (
  grid: string[][],
  chars: string,
  currentCoordinates: Coordinates,
  direction: Direction
) => {
  // shouldn't happen, but just in case
  if (chars.length === 0) {
    return true;
  }

  const { row, column } = currentCoordinates;
  if (!chars.startsWith(grid[row][column])) {
    return false;
  }

  if (chars.length === 1) {
    return true;
  }

  if (!canGo(grid, currentCoordinates, direction)) {
    return false;
  }

  return searchInDirectionStartingAt(
    grid,
    chars.slice(1),
    transforms[direction](currentCoordinates),
    direction
  );
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

export const searchForX = (
  grid: string[][],
  origin: Coordinates = { row: 0, column: 0 }
) => {
  let nextCoordinates = getNextCoordinates(grid, origin);
  if (!nextCoordinates) {
    return 0;
  }

  let count = 0;
  let coordinates: Coordinates | undefined = origin;
  do {
    count += isXMas(grid, coordinates) ? 1 : 0;
    coordinates = getNextCoordinates(grid, coordinates);
  } while (coordinates);

  return count;
};

export const isXMas = (
  grid: string[][],
  coordinates: Coordinates = { row: 0, column: 0 }
) => {
  const { row, column } = coordinates;
  if (
    row === 0 ||
    row >= grid.length - 1 ||
    column === 0 ||
    column >= grid[row].length - 1
  ) {
    return false;
  }

  if (grid[row][column] !== "A") {
    return false;
  }

  const word = "MAS";
  const reversed = "SAM";

  return (
    (searchInDirectionStartingAt(
      grid,
      word,
      transforms.NW(coordinates),
      "SE"
    ) ||
      searchInDirectionStartingAt(
        grid,
        reversed,
        transforms.NW(coordinates),
        "SE"
      )) &&
    (searchInDirectionStartingAt(
      grid,
      word,
      transforms.NE(coordinates),
      "SW"
    ) ||
      searchInDirectionStartingAt(
        grid,
        reversed,
        transforms.NE(coordinates),
        "SW"
      ))
  );
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
  let coordinates: Coordinates | undefined = origin;
  do {
    count += searchInAllDirectionsFrom(grid, word, coordinates);
    coordinates = getNextCoordinates(grid, coordinates);
  } while (coordinates);

  return count;
};
