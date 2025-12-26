
export interface Word {
  id: number;
  chinese: string;
  english: string;
  part_of_speech: string;
  date?: string; // YYYY-MM-DD
}

export enum GameType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // Chinese -> Choose English
  MATCHING = 'MATCHING', // English -> Choose Chinese+POS
  CLOZE = 'CLOZE', // Fill in the blank
  CHINESE_TO_ENGLISH = 'CHINESE_TO_ENGLISH', // New: Chinese (Meaning) -> Choose English
}

export enum Difficulty {
  EASY = 'EASY', // Random distractors
  MEDIUM = 'MEDIUM', // Same starting letter or similar length
  HARD = 'HARD', // Fake words with typos (apple vs appie)
}

export enum GameMode {
  PRACTICE = 'PRACTICE',
  TIMED = 'TIMED',
  CHALLENGE = 'CHALLENGE', // For Daily Challenge specific logic
}

export interface Question {
  targetWord: Word;
  options: string[] | Word[]; // Strings for Multi-choice/Hard, Words for Matching
  correctAnswer: string | number; // String answer or Word ID
  clozeMask?: string; // For Cloze mode (e.g., "a_p_e")
}

export interface TestResult {
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  score: number;
  mode: GameMode;
  type: GameType;
  difficulty?: Difficulty;
  correctIds: number[]; // Array of Word IDs that were correct
  wrongIds: number[];   // Array of Word IDs that were wrong
  playerName?: string;
}

export interface WordStats {
  wordId: number;
  attempts: number;
  errors: number;
}

export interface LeaderboardEntry {
  timestamp: number;
  score: number;
  correctCount: number;
  totalQuestions: number;
  date: string;
  playerName?: string;
}
