export type TrendDirection = "up" | "down";

export interface DashboardMetric {
  title: string;
  value: number;
  change: number;
  trend: TrendDirection;
}