import { jack } from "jackspeak";

import Day1 from "./day01/day01";
import Day2 from "./day02/day2";

type AoCFunctionMap = {
  [year: number]: {
    [day: number]: () => void;
  };
};

const solutions: AoCFunctionMap = {
  2024: {
    1: Day1,
    2: Day2,
  },
};

type UnvalidatedArgs = {
  year: number | undefined;
  day: number | undefined;
};
type ValidatedArgs = {
  year: number;
  day: number;
};

const validateArgs = (args: UnvalidatedArgs) => {
  if (!values.year || !values.day) {
    console.error(
      "Year and day are required. Please provide a --year and a --day"
    );
    process.exit(1);
  }

  if (!solutions[values.year]) {
    console.error(
      `Year ${values.year} is not supported. Valid values: [%s]`,
      Object.keys(solutions).join(", ")
    );
    process.exit(1);
  }

  if (!solutions[values.year][values.day]) {
    console.error(
      `Day ${values.day} is not supported for year ${values.year}. Valid values: [%s]`,
      Object.keys(solutions[values.year]).join(", ")
    );
    process.exit(1);
  }

  return { ...args } as ValidatedArgs;
};

const { values } = jack({})
  .num({
    year: {
      required: true,
      description: "Year of the Advent Of Code puzzle. Must be a number",
    },
    day: {
      required: true,
      description:
        "Day of the Advent Of Code puzzle. Must be a number (without a leading 0)",
    },
  })
  .parse(process.argv);

const validatedArgs = validateArgs(values);
solutions[validatedArgs.year][validatedArgs.day]();
