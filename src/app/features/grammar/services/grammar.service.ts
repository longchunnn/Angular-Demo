import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrammarTopic,GrammarExercise,LessonContentBlock,LessonDetail,LessonInTopic,UserExerciseResult,UserLessonProgress } from '../models/grammar';
@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  constructor(private http: HttpClient) { }
  getGrammarTopics(): Observable<GrammarTopic[]> {
    return this.http.get<{data: GrammarTopic[]}>(`${environment.apiUrl}/grammar/topics`).pipe(
      map(response => response.data)
    );
  }
  getLessioninTopic(topicId: string): Observable<LessonInTopic[]> {
    return this.http.get<{data: LessonInTopic[]}>(`${environment.apiUrl}/grammar/topics/${topicId}/lessons`).pipe(
      map(response => response.data)
    );
  }
  getLessonDetail(lessonId: string): Observable<LessonDetail> {
    return this.http.get<{data: LessonDetail}>(`${environment.apiUrl}/grammar/lessons/${lessonId}`).pipe(
      map(response => response.data)
    );
  }
  getGrammarExercise(topicId: string): Observable<GrammarExercise[]> {
    return this.http.get<{data: GrammarExercise[]}>(`${environment.apiUrl}/grammar/topics/${topicId}/exercises`).pipe(
      map(response => response.data)
    );
  }
}
