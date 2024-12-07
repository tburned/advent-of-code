export type Level = number;
export type Report = Level[];
export type Direction = "ascending" | "descending";

export type ReportFetcher = (fileName: string) => Promise<Report[]>;
export type ReportDampener = (report: Report) => Report[];
