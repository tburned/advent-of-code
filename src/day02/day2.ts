import { memoize, readFileEagerly } from "../utils";
import { isReportSafe, omit1Dampener } from "./reportSafety";
import { ReportFetcher, Report } from "./types";

export const getReports: ReportFetcher = async (fileName) => {
  const lines = await readFileEagerly(fileName);
  const reports: Report[] = lines.map((line) => line.split(/\s+/).map(Number));
  console.log("Reports: ", reports);
  return reports;
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
  return countSafeReports(reports, (report) =>
    isReportSafe(report, omit1Dampener)
  );
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
