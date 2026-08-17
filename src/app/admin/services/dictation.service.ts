import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Dictation{
  level: string;
  title: string;
  content: string;
  translation: string;
  audioFile: File;
}

@Injectable({
  providedIn: 'root'
})
export class DictationService {

  constructor( private http: HttpClient ) {
   }
  createDictation(dictation: Dictation) :Observable<{message: string}>  {
    const formData = new FormData();
    formData.append('level', dictation.level);
    formData.append('title', dictation.title);
    formData.append('content', dictation.content);
    formData.append('translation', dictation.translation);
    formData.append('audioFile', dictation.audioFile);

    return this.http.post<{message: string}>(environment.apiAdminUrl + '/dictation', formData);
  }

  updateDictation(id: string, dictation: Partial<Dictation>): Observable<{message: string}> {
    const formData = new FormData();
   if (dictation.level !== undefined) formData.append('level', dictation.level);
    if (dictation.title !== undefined) formData.append('title', dictation.title);
    if (dictation.content !== undefined) formData.append('content', dictation.content);
    if (dictation.translation !== undefined) formData.append('translation', dictation.translation);
    if (dictation.audioFile) {
      formData.append('audioFile', dictation.audioFile);
    }

    return this.http.patch<{message: string}>(`${environment.apiAdminUrl}/dictation/${id}`, formData);
  }

  deleteDictation(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${environment.apiAdminUrl}/dictation/${id}`);
  }
}
