import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Flashcard {
  title: string;
  description: string; 
}
@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(private http: HttpClient) { }
  createFlashcard(flashcard: Flashcard): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(environment.apiAdminUrl + '/flashcard', flashcard);
  }
  addVocabulary(setId: string, vocabularyId: string[]): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiAdminUrl}/flashcard/${setId}/vocabulary`, { vocabularyId });
  }
  removeVocabulary(setId: string, vocabularyId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiAdminUrl}/flashcard/${setId}/vocabulary/${vocabularyId}`);
  }
  deleteFlashcard(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiAdminUrl}/flashcard/${id}`);
  }
}
