// Leitner box scheduling shared by vocab mastery (srsStorage.ts) and skill progress
// (mistakeBook/drillProgress.ts). Pure: no storage, no clock — callers pass `now` and `today`.

export const DAY_MS = 24 * 60 * 60 * 1000;

// Leitner box intervals in days; index === boxLevel (0..5)
export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30];

export interface BoxState {
  boxLevel: number;               // 0..5, Leitner box
  intervalDays: number;           // derived: BOX_INTERVALS[boxLevel]
  dueDate: number;                // timestamp of next review
  consecutiveCorrectDays: number; // cross-day correct streak (same-day repeats count once)
  lastCorrectDate?: string;       // 'YYYY-MM-DD', for cross-day judgement
  lastWrongDate?: string;         // 'YYYY-MM-DD'; a wrong answer today blocks promotion today
  lastReviewDate?: number;        // timestamp
}

export function newBoxState(now: number): BoxState {
  return { boxLevel: 0, intervalDays: BOX_INTERVALS[0], dueDate: now, consecutiveCorrectDays: 0 };
}

// Returns the next state; never mutates `prev`. Cross-day gating prevents same-session
// "fake mastery": a correct answer promotes at most once per day, and not at all on a day
// the item was already answered wrong (wrong-then-right the same day stays in box 1).
export function applyAnswer<T extends BoxState>(prev: T, isCorrect: boolean, now: number, today: string): T {
  const next: T = { ...prev };

  if (isCorrect) {
    if (next.lastCorrectDate !== today && next.lastWrongDate !== today) {
      next.consecutiveCorrectDays += 1;
      next.boxLevel = Math.min(next.boxLevel + 1, 5);
      next.intervalDays = BOX_INTERVALS[next.boxLevel];
      next.dueDate = now + next.intervalDays * DAY_MS;
      next.lastCorrectDate = today;
    }
  } else {
    next.boxLevel = 1;
    next.consecutiveCorrectDays = 0;
    next.intervalDays = BOX_INTERVALS[1];
    next.dueDate = now + BOX_INTERVALS[1] * DAY_MS;
    next.lastWrongDate = today;
  }

  next.lastReviewDate = now;
  return next;
}
