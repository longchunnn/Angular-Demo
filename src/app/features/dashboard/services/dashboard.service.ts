import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Heatmap } from '../models/dashboard';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {

  }
  getHeatmapData(): Observable<Heatmap[]> {
  return this.http
    .get<{ data: Heatmap[] }>(`${environment.apiUrl}/dashboard/heatmap`)
    .pipe(
      map(response => response.data) 
    );
}
}
