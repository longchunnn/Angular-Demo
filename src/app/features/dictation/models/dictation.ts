// src/app/models/dictation.ts

/** GET /dictation/exercises */
export interface DictationExercise{
  id: string;
  level: string;
  title: string;
  audioUrl: string;
  isCompleted: boolean;
}

/** GET /dictation/exercises/:id */
export interface DictationExerciseDetail {
  id: string;
  level: string;
  title: string;
  audioUrl: string;
  content: string;
  translation: string;
  isCompleted: boolean;
}

/** POST /dictation/exercises/:id/submit response */
export interface SubmitDictation {
  dictationExerciseId: string;
  isCompleted: boolean;
  content: string;
  translation: string;
}