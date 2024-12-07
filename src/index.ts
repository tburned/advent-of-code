import { jack } from "jackspeak";

import Day1 from "./day01/day01";

type AoCFunctionMap = {
  [year: number]: {
    [day: number]: () => void;
  };
};

const years: AoCFunctionMap = {
  2024: {
    1: Day1,
  },
};

const { values } = jack({})
  .opt({
    year: {
      description: "Year of the Advent Of Code puzzle. Must be a number",
    },
    day: {
      description:
        "Day of the Advent Of Code puzzle. Must be a number (without a leading 0)",
    },
  })
  .parse(process.argv);
console.log(process.argv);
console.log(values);

// years[values.year][values.day]();
