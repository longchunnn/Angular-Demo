import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Heatmap } from '../../models/dashboard';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedDate: Date = new Date();
  heatmapMap: Map<string, number> = new Map();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.heatmapMap.set('2026-08-01', 10); 
    this.heatmapMap.set('2026-08-05', 30); 
    this.heatmapMap.set('2026-08-11', 60); 
    this.heatmapMap.set('2026-08-14', 100);  
    this.fetchHeatmap();
  }

  fetchHeatmap(): void {
    this.dashboardService.getHeatmapData().subscribe({
      next: (data: Heatmap[]) => {
        data.forEach((item) => {
          this.heatmapMap.set(item.date, item.minutes);
        });
      },
      error: (err) => console.error('Lỗi lấy dữ liệu Heatmap:', err),
    });
  }
  getMinutes(date: { year: number; month: number; day: number }): number {
    const y = date.year;
    const m = String(date.month + 1).padStart(2, '0');
    const d = String(date.day).padStart(2, '0');
    const key = `${y}-${m}-${d}`;
    return this.heatmapMap.get(key) || 0;
  }

  isFuture(date: any): boolean {
    if (!date) return false;
    const cellDate = new Date(date.year, date.month, date.day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return cellDate > today;
  }

  getHeatmapClass(date: any): string {
    if (this.isFuture(date)) {
      return 'future-day';
    }
    const minutes = this.getMinutes(date);
    if (minutes === 0) return 'heat-0';
    if (minutes <= 20) return 'heat-1';
    if (minutes <= 45) return 'heat-2';
    if (minutes <= 80) return 'heat-3';
    return 'heat-4';
  }
}
