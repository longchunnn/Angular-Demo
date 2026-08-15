export interface WeekData {
  days: (Heatmap | null)[];
  monthLabel?: string;
}
export interface Heatmap {
  date: string;
  minutes: number;
}