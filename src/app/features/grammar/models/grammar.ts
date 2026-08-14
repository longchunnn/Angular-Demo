export interface GrammarTopic {
  id: string;
  title: string;
  orderIndex: number;
  totalLessons: number;
  completedLessons: number;
  progress: number; // Phần trăm hoàn thành của Topic (0 - 100)
}

/** GET /grammar/topics/:topicId/lessons */
export interface LessonInTopic {
  id: string;
  title: string;
  orderIndex: number;
  progress: number; // Phần trăm tiến độ của riêng Lesson này (0 - 100)
  isCompleted: boolean;
}

/** Cấu trúc 1 Block nội dung trong bài học (JSON ContentBlock) */
export interface LessonContentBlock {
  id: string;
  type: 'text' | 'video' | 'audio' | 'quiz' | string;
  content?: string;
  url?: string;
  // Dành cho block dạng câu hỏi (Quiz)
  isScored?: boolean;
  question?: string;
  options?: string[];
  correctAnswer?: number | string;
  explanation?: string;
}

export interface UserLessonProgress{
  completedBlocks: string[]; 
  progress: number;
  isCompleted: boolean;
}

export interface LessonDetail {
  id: string;
  topicId: string;
  title: string;
  orderIndex: number;
  contentBlocks: LessonContentBlock[];
  userProgress: UserLessonProgress;
}

export interface UserExerciseResult {
  userAnswer: string | null;
  isCorrect: boolean;
}

export interface GrammarExercise {
  id: string;
  questionText: string;
  exerciseType: string; 
  correctAnswer: string;
  explanation: string | null;
  userResult: UserExerciseResult | null; 
}