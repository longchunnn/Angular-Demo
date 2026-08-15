
/** GET /dictation/exercises */
export interface DictationExercise{
  id: string;
  level: string;
  title: string;
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
const CONTRACTIONS_MAP: Record<string, string> = {
  "won't": "will not",
  "can't": "can not",
  "cannot": "can not",
  "i'm": "i am",
  "it's": "it is",
  "let's": "let us",
  "that's": "that is",
  "what's": "what is",
  "who's": "who is",
  "there's": "there is",
  "he's": "he is",
  "she's": "she is",
  "we're": "we are",
  "they're": "they are",
  "you're": "you are",
  "n't": " not",
  "'re": " are",
  "'ve": " have",
  "'ll": " will",
  "'d": " would"
};

const CONTRACTION_REGEX = new RegExp(
  `\\b(${Object.keys(CONTRACTIONS_MAP).map(k => k.replace("'", "['’]")).join('|')})\\b`,
  'gi'
);

export const normalize = (text: string): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .replace(/[’]/g, "'") 
    .replace(CONTRACTION_REGEX, (matched) => CONTRACTIONS_MAP[matched.toLowerCase()] || matched)
    .replace(/'s\b/g, '') 
    .replace(/[^\w\s]/g, '') 
    .replace(/\s+/g, ' ') 
    .trim();
};

export const checkAnswer = (userInput: string, correctAnswer: string): boolean => {
  return normalize(userInput) === normalize(correctAnswer);
};

export interface WordDiff {
  word: string;
  isCorrect: boolean;
}

export const getWordByWordDiff = (userInput: string, correctAnswer: string): WordDiff[] => {
  const normInput = normalize(userInput);
  const inputWords = normInput ? normInput.split(' ') : [];
  const answerWords = normalize(correctAnswer).split(' ');

  return answerWords.map((answerWord, index) => ({
    word: answerWord,
    isCorrect: answerWord === (inputWords[index] || '')
  }));
};

export interface HintWord {
  text: string;
  status: 'correct' | 'repaired' | 'hidden';
}


const cleanSingleWord = (word: string): string => {
  return word.toLowerCase().replace(/[^\w]/g, '');
};

export const getHint = (userInput: string, correctAnswer: string): HintWord[] => {
  if (!correctAnswer) return [];

  const origCorrectWords = correctAnswer.trim().split(/\s+/);
  const rawInputWords = userInput.trim() ? userInput.trim().split(/\s+/) : [];

  const cleanInputs = rawInputWords.map(cleanSingleWord);
  const cleanCorrects = origCorrectWords.map(cleanSingleWord);

  let firstErrorIdx = -1;

  for (let i = 0; i < cleanCorrects.length; i++) {
    const userW = cleanInputs[i];
    if (!userW || userW !== cleanCorrects[i]) {
      firstErrorIdx = i;
      break;
    }
  }


  if (firstErrorIdx === -1 && cleanInputs.length >= cleanCorrects.length) {
    return origCorrectWords.map(word => ({ text: word, status: 'correct' }));
  }

  return origCorrectWords.map((origWord, index) => {
    if (index < firstErrorIdx) {
      return { text: origWord, status: 'correct' };
    }
    if (index === firstErrorIdx) {
      return { text: origWord, status: 'repaired' };
    }
    const hiddenText = origWord.replace(/[a-zA-Z0-9]/g, '*');
    return { text: hiddenText, status: 'hidden' };
  });
};