
import { Word, TestResult, WordStats, LeaderboardEntry, GameType, Difficulty, GameMode } from '../types';
import serverData from './serverData';

const STORAGE_KEY_WORDS = 'vocab_app_words';
const STORAGE_KEY_HISTORY = 'vocab_app_history';
const STORAGE_KEY_STATS = 'vocab_app_stats';
const STORAGE_KEY_LEADERBOARD_PREFIX = 'vocab_app_lb_';
const STORAGE_KEY_LAST_PLAYER = 'vocab_app_last_player';

const DEFAULT_WORDS: Word[] = serverData;

export const getWords = (): Word[] => {
  const stored = localStorage.getItem(STORAGE_KEY_WORDS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse words", e);
    }
  }
  return DEFAULT_WORDS;
};

export const saveWords = (words: Word[]): void => {
  localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(words));
};

export const resetWordsToDefault = (): Word[] => {
  localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(DEFAULT_WORDS));
  return DEFAULT_WORDS;
};

export const getHistory = (): TestResult[] => {
  const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
  return stored ? JSON.parse(stored) : [];
};

export const saveResult = (result: TestResult): void => {
  const history = getHistory();
  history.push(result);
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  updateStats(result);
  
  if (result.mode !== GameMode.CHALLENGE) {
      saveToLeaderboard(result);
  }
};

export const getWordStats = (): Record<number, WordStats> => {
  const stored = localStorage.getItem(STORAGE_KEY_STATS);
  return stored ? JSON.parse(stored) : {};
};

const updateStats = (result: TestResult) => {
  const stats = getWordStats();
  
  // 記錄所有出現過的單字嘗試
  const allAttemptedIds = [...new Set([...result.correctIds, ...result.wrongIds])];
  
  allAttemptedIds.forEach(wordId => {
    if (!stats[wordId]) {
      stats[wordId] = { wordId, attempts: 0, errors: 0 };
    }
    
    // 計算該單字在此次測試中答對與答錯的次數
    const correctCount = result.correctIds.filter(id => id === wordId).length;
    const errorCount = result.wrongIds.filter(id => id === wordId).length;
    
    stats[wordId].attempts += (correctCount + errorCount);
    stats[wordId].errors += errorCount;
  });

  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
};

export const getLastPlayerName = (): string => {
    return localStorage.getItem(STORAGE_KEY_LAST_PLAYER) || '';
}

export const setLastPlayerName = (name: string) => {
    localStorage.setItem(STORAGE_KEY_LAST_PLAYER, name);
}

const getLeaderboardKey = (mode: GameMode, type: GameType, difficulty?: Difficulty) => {
  const diffSuffix = difficulty ? `_${difficulty}` : '';
  return `${STORAGE_KEY_LEADERBOARD_PREFIX}${mode}_${type}${diffSuffix}`;
};

export const getLeaderboard = (mode: GameMode, type: GameType, difficulty?: Difficulty): LeaderboardEntry[] => {
  const key = getLeaderboardKey(mode, type, difficulty);
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const saveToLeaderboard = (result: TestResult) => {
  const key = getLeaderboardKey(result.mode, result.type, result.difficulty);
  const currentBoard = getLeaderboard(result.mode, result.type, result.difficulty);

  const newEntry: LeaderboardEntry = {
    timestamp: result.timestamp,
    score: result.score,
    correctCount: result.correctCount,
    totalQuestions: result.totalQuestions,
    date: new Date(result.timestamp).toLocaleDateString(),
    playerName: result.playerName || 'Anonymous'
  };

  currentBoard.push(newEntry);
  currentBoard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.timestamp - a.timestamp;
  });

  const topScores = currentBoard.slice(0, 20);
  localStorage.setItem(key, JSON.stringify(topScores));
};

export const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY_WORDS);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    localStorage.removeItem(STORAGE_KEY_STATS);
    Object.keys(localStorage).forEach(key => {
        if(key.startsWith(STORAGE_KEY_LEADERBOARD_PREFIX)) {
            localStorage.removeItem(key);
        }
    });
    window.location.reload();
}
