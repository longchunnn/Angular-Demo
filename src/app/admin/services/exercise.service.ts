import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Exercise {
  topicId: string;
  questionText: string;
  exerciseType: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
  }
  createExercise(exercise: Exercise): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(environment.apiAdminUrl + '/exercise', exercise);
  }

  updateExercise(id: string, exercise: Partial<Exercise>): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${environment.apiAdminUrl}/exercise/${id}`, exercise);
  }

  deleteExercise(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiAdminUrl}/exercise/${id}`);
  } 
}
