import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DictationExercise,DictationExerciseDetail,SubmitDictation} from '../models/dictation';
import { environment } from 'src/environments/environment';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DictationService {

  constructor(private http: HttpClient) { }

  getDictationExercises(): Observable<DictationExercise[]> {
    return this.http.get<{data: DictationExercise[]}>(`${environment.apiUrl}/dictation/exercises`).pipe(
      map(response => response.data)
    );
  }

  getDictationExerciseDetail(id: string): Observable<DictationExerciseDetail> {
    return this.http.get<{data: DictationExerciseDetail}>(`${environment.apiUrl}/dictation/exercises/${id}`).pipe(
      map(response => response.data)
    );
  }

  submitDictationExercise(id: string, content: string, translation: string): Observable<SubmitDictation> {
    const body = { content, translation };
    return this.http.post<{data: SubmitDictation}>(`${environment.apiUrl}/dictation/exercises/${id}/submit`, body).pipe(
      map(response => response.data)
    );
  }
}
