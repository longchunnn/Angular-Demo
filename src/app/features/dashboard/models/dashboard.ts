export interface WeekData {
  days: (HeatmapData | null)[];
  monthLabel?: string;
}
export interface HeatmapData {
  date: string;
  minutes: number;
}