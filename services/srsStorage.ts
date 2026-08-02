import { vocabData, VocabWord } from './newVocabData';

const SRS_STORAGE_KEY = 'vocab_srs_mastery';
const LEVEL_PROGRESS_KEY = 'vocab_level_progress';

export const DAY_MS = 24 * 60 * 60 * 1000;

// Leitner box intervals in days; index === boxLevel (0..5)
export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30];

export interface VocabMastery {
  wordId: string;
  boxLevel: number;               // 0..5, Leitner box
  intervalDays: number;           // derived: BOX_INTERVALS[boxLevel]
  dueDate: number;                // timestamp of next review
  consecutiveCorrectDays: number; // cross-day correct streak (same-day repeats count once)
  lastCorrectDate?: string;       // 'YYYY-MM-DD', for cross-day judgement
  lastReviewDate?: number;        // timestamp
}

export interface LevelProgress {
  highestUnlockedLevel: number;
  unlockedMonsters: number[];
  lastEscapeDate?: string; // 'YYYY-MM-DD' (legacy field, no longer written)
}

// ---- Injectable seams (default = real behaviour) so time/randomness are testable ----
export interface SrsDeps {
  now?: number;
  today?: string;
  rng?: () => number;
}

export function localYmd(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function resolveDeps(deps?: SrsDeps): { now: number; today: string; rng: () => number } {
  const now = deps?.now ?? Date.now();
  const today = deps?.today ?? localYmd(now);
  const rng = deps?.rng ?? Math.random;
  return { now, today, rng };
}

export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- Migration: old {masteryLevel,consecutiveCorrect} -> new box model (lossless) ----
export function migrateMasteryData(
  raw: Record<string, any>,
  deps?: SrsDeps
): Record<string, VocabMastery> {
  const { now } = resolveDeps(deps);
  const out: Record<string, VocabMastery> = {};
  for (const key of Object.keys(raw || {})) {
    const e = raw[key] || {};
    if (typeof e.boxLevel === 'number') {
      out[key] = e as VocabMastery; // already new format
      continue;
    }
    const oldLevel = typeof e.masteryLevel === 'number' ? e.masteryLevel : 0;
    const boxLevel = oldLevel >= 2 ? 4 : oldLevel === 1 ? 2 : 0; // 0->0, 1->2, 2->4
    const intervalDays = BOX_INTERVALS[boxLevel];
    const lastReviewDate =
      typeof e.lastReviewDate === 'number' && e.lastReviewDate > 0 ? e.lastReviewDate : undefined;
    const base = lastReviewDate ?? now;
    out[key] = {
      wordId: e.wordId ?? key,
      boxLevel,
      intervalDays,
      dueDate: base + intervalDays * DAY_MS,
      consecutiveCorrectDays: Math.min(
        typeof e.consecutiveCorrect === 'number' ? e.consecutiveCorrect : 0,
        3
      ),
      lastCorrectDate: lastReviewDate ? localYmd(lastReviewDate) : undefined,
      lastReviewDate,
    };
  }
  return out;
}

export function loadMasteryData(deps?: SrsDeps): Record<string, VocabMastery> {
  try {
    const data = localStorage.getItem(SRS_STORAGE_KEY);
    const raw = data ? JSON.parse(data) : {};
    const migrated = migrateMasteryData(raw, deps);
    const needsWrite = Object.values(raw).some(
      (e: any) => !(e && typeof e.boxLevel === 'number')
    );
    if (needsWrite && Object.keys(raw).length > 0) {
      saveMasteryData(migrated);
    }
    return migrated;
  } catch {
    return {};
  }
}

export function saveMasteryData(data: Record<string, VocabMastery>) {
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
}

// A word is shown as "mastered" but is NEVER removed from scheduling (box 5 recirculates).
export function isMastered(m: VocabMastery | undefined): boolean {
  return !!m && m.boxLevel >= 4 && m.consecutiveCorrectDays >= 3;
}

// Level Progress (untouched by the SRS migration — protects the child's monster gallery)
export function loadLevelProgress(): LevelProgress {
  try {
    const data = localStorage.getItem(LEVEL_PROGRESS_KEY);
    if (!data) return { highestUnlockedLevel: 1, unlockedMonsters: [] };
    const parsed = JSON.parse(data);
    return {
      highestUnlockedLevel: parsed.highestUnlockedLevel || 1,
      unlockedMonsters: parsed.unlockedMonsters || [],
      lastEscapeDate: parsed.lastEscapeDate,
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

  if (currentLevel <= 20 && !progress.unlockedMonsters.includes(currentLevel)) {
    progress.unlockedMonsters.push(currentLevel);
    updated = true;
  }

  if (currentLevel >= progress.highestUnlockedLevel) {
    progress.highestUnlockedLevel = currentLevel + 1;
    updated = true;
  }

  if (updated) {
    saveLevelProgress(progress);
  }
}

export function unlockMonster(id: number) {
  const progress = loadLevelProgress();
  if (!progress.unlockedMonsters.includes(id)) {
    progress.unlockedMonsters.push(id);
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
  if (masteredCount >= vocabData.length) unlock(23);

  if (newlyUnlocked.length > 0) {
    saveLevelProgress(progress);
  }

  return newlyUnlocked;
}

// NOTE: A monster-escape mechanism was designed for P4 but the product owner decided against
// surfacing any "escape/loss" concept to the child (see .doc/v2.0/phase-4-monster-escape).
// No escape logic ships. The old random processSpontaneousEscapes (dead code) was also removed.

export const WORDS_PER_LEVEL = 10;
export const TOTAL_LEVELS = Math.ceil(vocabData.length / WORDS_PER_LEVEL);

export function getWordsForLevel(level: number): VocabWord[] {
  const startIndex = (level - 1) * WORDS_PER_LEVEL;
  return vocabData.slice(startIndex, startIndex + WORDS_PER_LEVEL);
}

// ---- Scheduling engine (expanding-interval Leitner SRS) ----

const MAX_DUE = 10;
const MAX_NEW = 5;
const DAILY_CAP = 15;

// Update mastery after answering. Cross-day gating prevents same-session "fake mastery".
export function updateWordMastery(wordId: string, isCorrect: boolean, deps?: SrsDeps) {
  const { now, today } = resolveDeps(deps);
  const data = loadMasteryData(deps);
  const m: VocabMastery =
    data[wordId] || {
      wordId,
      boxLevel: 0,
      intervalDays: BOX_INTERVALS[0],
      dueDate: now,
      consecutiveCorrectDays: 0,
    };

  if (isCorrect) {
    if (m.lastCorrectDate !== today) {
      // cross-day correct: promote one box
      m.consecutiveCorrectDays += 1;
      m.boxLevel = Math.min(m.boxLevel + 1, 5);
      m.intervalDays = BOX_INTERVALS[m.boxLevel];
      m.dueDate = now + m.intervalDays * DAY_MS;
      m.lastCorrectDate = today;
    }
    // same-day correct: no promotion (only lastReviewDate updates below)
  } else {
    // wrong: drop back to box 1, due tomorrow
    m.boxLevel = 1;
    m.consecutiveCorrectDays = 0;
    m.intervalDays = BOX_INTERVALS[1];
    m.dueDate = now + BOX_INTERVALS[1] * DAY_MS;
  }

  m.lastReviewDate = now;
  data[wordId] = m;
  saveMasteryData(data);
}

// Pick up to 15 words: due words first (incl. box-5 maintenance), then new words.
export function getDailyHuntWords(deps?: SrsDeps): VocabWord[] {
  const { now, rng } = resolveDeps(deps);
  const mastery = loadMasteryData(deps);

  const stats = vocabData.map((word) => ({ word, m: mastery[word.id] as VocabMastery | undefined }));

  // Due words (have mastery and dueDate reached), most overdue first
  const due = stats
    .filter((s) => s.m && s.m.dueDate <= now)
    .sort((a, b) => (a.m!.dueDate - b.m!.dueDate))
    .slice(0, MAX_DUE)
    .map((s) => s.word);

  // New words (never reviewed), in vocab order
  const fresh = stats
    .filter((s) => !s.m)
    .slice(0, MAX_NEW)
    .map((s) => s.word);

  let selected = [...due, ...fresh];

  if (selected.length < DAILY_CAP) {
    const chosen = new Set(selected);
    const rest = stats.map((s) => s.word).filter((w) => !chosen.has(w));
    selected = [...selected, ...shuffle(rest, rng).slice(0, DAILY_CAP - selected.length)];
  }

  selected = selected.slice(0, DAILY_CAP); // hard cap
  return shuffle(selected, rng);
}

export function getDistractors(correctWordId: string, limit: number = 3): string[] {
  const others = vocabData.filter((v) => v.id !== correctWordId);
  const shuffled = shuffle(others);
  return shuffled.slice(0, limit).map((v) => v.meaning);
}
