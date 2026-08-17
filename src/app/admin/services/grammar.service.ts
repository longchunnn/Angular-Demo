import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';  

export type BlockType = "THEORY" | "VIDEO" | "QUESTION";

export interface BaseBlock {
  id?: string;
  type: BlockType;
  order: number;
  data: Record<string, any>;
}

export interface Lesson {
  topicId: string;
  title: string;
  contentBlocks?: BaseBlock[]; 
  orderIndex: number;
}
@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  constructor(private http: HttpClient) { }

  createGrammar(lesson: Lesson): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(environment.apiAdminUrl + '/grammar/lesson', lesson);
  }

  updateGrammar(id: string, lesson: Partial<Lesson>): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${environment.apiAdminUrl}/grammar/lesson/${id}`, lesson);
  }

  deleteGrammar(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiAdminUrl}/grammar/lesson/${id}`);
  } 
}
