import { vocabData, VocabWord } from './newVocabData';

const SRS_STORAGE_KEY = 'vocab_srs_mastery';
const LEVEL_PROGRESS_KEY = 'vocab_level_progress';

export interface VocabMastery {
  wordId: string;
  masteryLevel: number; // 0 = New/Learning, 1 = Familiar, 2 = Mastered
  consecutiveCorrect: number;
  lastReviewDate?: number; // timestamp
}

export interface LevelProgress {
  highestUnlockedLevel: number;
  unlockedMonsters: number[];
}

// Ensure the mastery dictionary is loaded
export function loadMasteryData(): Record<string, VocabMastery> {
  try {
    const data = localStorage.getItem(SRS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveMasteryData(data: Record<string, VocabMastery>) {
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
}

// Level Progress
export function loadLevelProgress(): LevelProgress {
  try {
    const data = localStorage.getItem(LEVEL_PROGRESS_KEY);
    if (!data) return { highestUnlockedLevel: 1, unlockedMonsters: [] };
    const parsed = JSON.parse(data);
    return {
      highestUnlockedLevel: parsed.highestUnlockedLevel || 1,
      unlockedMonsters: parsed.unlockedMonsters || []
    };
  } catch {
    return { highestUnlockedLevel: 1, unlockedMonsters: [] };
  }
}

export function saveLevelProgress(progress: LevelProgress) {
  localStorage.setItem(LEVEL_PROGRESS_KEY, JSON.stringify(progress));
}

export function unlockNextLevel(currentLevel: number) {
  const progress = loadLevelProgress();
  let updated = false;

  // Unlock the monster for clearing this level (Monster IDs are 1-20)
  if (currentLevel <= 20 && !progress.unlockedMonsters.includes(currentLevel)) {
    progress.unlockedMonsters.push(currentLevel);
    updated = true;
  }

  // Unlock next level
  if (currentLevel >= progress.highestUnlockedLevel) {
    progress.highestUnlockedLevel = currentLevel + 1;
    updated = true;
  }
  
  if (updated) {
    saveLevelProgress(progress);
  }
}

export function checkAndUnlockLegendaryMonsters(masteredCount: number): number[] {
  const progress = loadLevelProgress();
  const newlyUnlocked: number[] = [];

  const unlock = (id: number) => {
    if (!progress.unlockedMonsters.includes(id)) {
      progress.unlockedMonsters.push(id);
      newlyUnlocked.push(id);
    }
  };

  if (masteredCount >= 50) unlock(21);
  if (masteredCount >= 100) unlock(22);
  if (masteredCount >= vocabData.length) unlock(23); // 192

  if (newlyUnlocked.length > 0) {
    saveLevelProgress(progress);
  }
  
  return newlyUnlocked;
}

export const WORDS_PER_LEVEL = 10;
export const TOTAL_LEVELS = Math.ceil(vocabData.length / WORDS_PER_LEVEL);

// Get words for a specific level (1-indexed)
export function getWordsForLevel(level: number): VocabWord[] {
  const startIndex = (level - 1) * WORDS_PER_LEVEL;
  return vocabData.slice(startIndex, startIndex + WORDS_PER_LEVEL);
}

// Update mastery after a quiz
export function updateWordMastery(wordId: string, isCorrect: boolean) {
  const data = loadMasteryData();
  const wordData = data[wordId] || {
    wordId,
    masteryLevel: 0,
    consecutiveCorrect: 0
  };

  if (isCorrect) {
    wordData.consecutiveCorrect += 1;
    if (wordData.consecutiveCorrect >= 3 && wordData.masteryLevel < 2) {
      wordData.masteryLevel += 1;
      // Depending on the level up mechanics, we can reset consecutiveCorrect if we want
      // For now, let's keep it ticking up.
    }
  } else {
    // If wrong, reset consecutive correct but maybe don't drop mastery too harshly
    wordData.consecutiveCorrect = 0;
    if (wordData.masteryLevel > 0) {
      wordData.masteryLevel -= 1;
    }
  }

  wordData.lastReviewDate = Date.now();
  data[wordId] = wordData;
  saveMasteryData(data);
}

// Daily mixing logic: Pick 15 words (Priority: unmastered, hasn't been reviewed today, random new)
export function getDailyHuntWords(): VocabWord[] {
  const mastery = loadMasteryData();
  
  // Create an array mapping each word to its mastery
  const allWordStats = vocabData.map(word => {
    return {
      word,
      mastery: mastery[word.id] || { wordId: word.id, masteryLevel: 0, consecutiveCorrect: 0, lastReviewDate: 0 }
    };
  });

  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // Words that aren't mastered yet, prioritizing those not reviewed in the last 12 hours
  const dueForReview = allWordStats
    .filter(ws => ws.mastery.masteryLevel < 2)
    .filter(ws => {
      if (!ws.mastery.lastReviewDate) return true; // Never reviewed
      return (now - ws.mastery.lastReviewDate) > (ONE_DAY_MS / 2); // 12 hours buffer
    })
    // Sort by mostly lowest mastery
    .sort((a, b) => a.mastery.masteryLevel - b.mastery.masteryLevel);

  let selected = dueForReview.slice(0, 15).map(ws => ws.word);

  // If we don't have enough (very rare unless fully mastered), fill with random words
  if (selected.length < 15) {
    const extraNeeded = 15 - selected.length;
    const remainingPool = vocabData.filter(v => !selected.includes(v));
    const shuffled = remainingPool.sort(() => 0.5 - Math.random());
    selected = [...selected, ...shuffled.slice(0, extraNeeded)];
  }

  // Shuffle the final selection
  return selected.sort(() => 0.5 - Math.random());
}

// Utility to get 3 random wrong options
export function getDistractors(correctWordId: string, limit: number = 3): string[] {
  const others = vocabData.filter(v => v.id !== correctWordId);
  others.sort(() => 0.5 - Math.random());
  
  return others.slice(0, limit).map(v => v.meaning); // we use chinese meaning as options
}
