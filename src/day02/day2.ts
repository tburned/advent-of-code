import { memoize, readFileEagerly } from "../utils";

export type Level = number;
export type Report = Level[];
type Direction = "ascending" | "descending";

type ReportFetcher = (fileName: string) => Promise<Report[]>;

export const getReports: ReportFetcher = async (fileName) => {
  const lines = await readFileEagerly(fileName);
  const reports: Report[] = lines.map((line) => line.split(/\s+/).map(Number));
  console.log("Reports: ", reports);
  return reports;
};

const isDirectionCorrect = (
  direction: Direction,
  difference: number
): boolean => {
  if (direction === "ascending") {
    return difference >= 0;
  }

  return difference <= 0;
};

const isMagnitudeCorrect = (difference: number): boolean => {
  return Math.abs(difference) <= 3 && Math.abs(difference) > 0;
};

export const isReportSafe = (report: Report): boolean => {
  type Accumulator = {
    isSafe: boolean;
    previousLevel?: number;
    direction?: "ascending" | "descending";
  };
  const result: Accumulator = report.reduce(
    (acc, level) => {
      if (!acc.previousLevel) {
        return { ...acc, previousLevel: level };
      }
      const difference = level - acc.previousLevel;
      const direction =
        acc.direction ?? (difference > 0 ? "ascending" : "descending");
      const isSafe =
        acc.isSafe &&
        isDirectionCorrect(direction, difference) &&
        isMagnitudeCorrect(difference);

      return {
        previousLevel: level,
        direction,
        isSafe,
      };
    },
    { isSafe: true } as Accumulator
  );
  return result.isSafe;
};

export const isReportSafeWithDampeners = (report: Report): boolean => {
  // TODO: Figure out a more interesting way to solve this problem that's not O(n*m)
  if (isReportSafe(report)) {
    return true;
  }
  for (let indexToOmit = 0; indexToOmit < report.length; indexToOmit++) {
    let dampenedReport;
    if (indexToOmit == 0) {
      dampenedReport = report.slice(1);
    } else if (indexToOmit == report.length - 1) {
      dampenedReport = report.slice(0, report.length - 1);
    } else {
      dampenedReport = [
        report.slice(0, indexToOmit),
        report.slice(indexToOmit + 1),
      ].flat();
    }
    if (isReportSafe(dampenedReport)) {
      return true;
    }
  }

  return false;
};

export const countSafeReports = (
  reports: Report[],
  reportSafetyPredicate: (arg0: Report) => boolean
): number => {
  return reports.reduce((acc, report) => {
    return acc + (reportSafetyPredicate(report) ? 1 : 0);
  }, 0);
};

export const part1 = async (
  fileName: string,
  fetchReports: ReportFetcher = getReports
): Promise<number> => {
  const reports = await fetchReports(fileName);
  return countSafeReports(reports, isReportSafe);
};

export const part2 = async (
  fileName: string,
  fetchReports: ReportFetcher = getReports
): Promise<number> => {
  const reports = await fetchReports(fileName);
  return countSafeReports(reports, isReportSafeWithDampeners);
};

const main = async (fileName: string = "src/day02/input.txt") => {
  const memoizedReportFetch = memoize(getReports);
  await part1(fileName, memoizedReportFetch).then((result) => {
    console.log("Number of safe reports: %s", result);
  });

  await part2(fileName, memoizedReportFetch).then((result) => {
    console.log("Number of safe reports: %s", result);
  });
};

export default main;
