import { Direction, Report, ReportDampener } from "./types";

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

export const _isReportSafe = (report: Report): boolean => {
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

export const isReportSafe = (
  report: Report,
  reportDampener?: ReportDampener
): boolean => {
  // TODO: Figure out a more interesting way to solve this problem that's not O(n*m)
  if (isReportSafe(report)) {
    return true;
  }

  if (!reportDampener) {
    return false;
  }

  return reportDampener(report).reduce(
    (acc, dampenedReport) => acc || isReportSafe(dampenedReport),
    false
  );
};

export const omit1Dampener: ReportDampener = (report) => {
  let dampenedReports: Report[] = [];
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
    dampenedReports.push(dampenedReport);
  }

  return dampenedReports;
};
