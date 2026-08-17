import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


export interface Vocabulary {
  topicId: string;
  word: string;
  level: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  exampleSentence?: string;
  audioFile: File;
  imageFile?: File;
  exampleAudioFile?: File;
}



@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private readonly baseUrl = `${environment.apiAdminUrl}/vocabulary`;

  constructor(private http: HttpClient) { }

  createVocabulary(vocabulary: Vocabulary): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('topicId', vocabulary.topicId);
    formData.append('word', vocabulary.word);
    formData.append('level', vocabulary.level);
    formData.append('phonetic', vocabulary.phonetic);
    formData.append('partOfSpeech', vocabulary.partOfSpeech);
    formData.append('meaning', vocabulary.meaning);
    
    if (vocabulary.exampleSentence) {
      formData.append('exampleSentence', vocabulary.exampleSentence);
    }
    
    formData.append('audioFile', vocabulary.audioFile);
    
    if (vocabulary.imageFile) {
      formData.append('imageFile', vocabulary.imageFile);
    }
    if (vocabulary.exampleAudioFile) {
      formData.append('exampleAudioFile', vocabulary.exampleAudioFile);
    }

    return this.http.post<{ message: string }>(this.baseUrl, formData);
  }

  updateVocabulary(id: string, vocabulary: Partial<Vocabulary>): Observable<{ message: string }> {
    const formData = new FormData();
    
    if (vocabulary.topicId !== undefined) formData.append('topicId', vocabulary.topicId);
    if (vocabulary.word !== undefined) formData.append('word', vocabulary.word);
    if (vocabulary.level !== undefined) formData.append('level', vocabulary.level);
    if (vocabulary.phonetic !== undefined) formData.append('phonetic', vocabulary.phonetic);
    if (vocabulary.partOfSpeech !== undefined) formData.append('partOfSpeech', vocabulary.partOfSpeech);
    if (vocabulary.meaning !== undefined) formData.append('meaning', vocabulary.meaning);
    if (vocabulary.exampleSentence !== undefined) formData.append('exampleSentence', vocabulary.exampleSentence);
    
    if (vocabulary.audioFile) {
      formData.append('audioFile', vocabulary.audioFile);
    }
    if (vocabulary.imageFile) {
      formData.append('imageFile', vocabulary.imageFile);
    }
    if (vocabulary.exampleAudioFile) {
      formData.append('exampleAudioFile', vocabulary.exampleAudioFile);
    }

    return this.http.patch<{ message: string }>(`${this.baseUrl}/${id}`, formData);
  }

  deleteVocabulary(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  } 
}