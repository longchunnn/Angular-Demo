import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlashCard,FlashCardSet } from '../models/vocabulary';
@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  constructor(private http: HttpClient) { 
  }
  getListFlashCards(): Observable<FlashCardSet[]> {
    return this.http.get<{data: FlashCardSet[]}>(`${environment.apiUrl}/flashcards/sets`).pipe(
      map(response => response.data)
    );
  }
  getFlashCardById(id: string): Observable<FlashCard[]> {
    return this.http.get<{data: FlashCard[]}>(`${environment.apiUrl}/flashcards/sets/${id}/vocabularies`).pipe(
      map(response => response.data)
    );
  }
}
