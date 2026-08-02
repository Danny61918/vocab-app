import { beforeEach, describe, expect, it } from 'vitest';
import {
  BOX_INTERVALS,
  getWordsForLevel,
  markReviewCompleted,
  processForgottenEscapes,
  saveLevelProgress,
  saveMasteryData,
  VocabMastery,
} from '../srsStorage';
import { DAY, fixedDeps, T0 } from './helpers';

const TODAY = '2026-03-02'; // localYmd(T0)

beforeEach(() => {
  localStorage.clear();
});

// Make one word of `level` overdue by `overdueDays` (relative to T0).
function makeLevelOverdue(level: number, overdueDays: number) {
  const word = getWordsForLevel(level)[0];
  const mastery: Record<string, VocabMastery> = {
    [word.id]: {
      wordId: word.id,
      boxLevel: 2,
      intervalDays: BOX_INTERVALS[2],
      dueDate: T0 - overdueDays * DAY,
      consecutiveCorrectDays: 1,
      lastReviewDate: T0 - (overdueDays + BOX_INTERVALS[2]) * DAY,
    },
  };
  saveMasteryData(mastery);
  return word;
}

describe('E2E-5 逃跑保底：當日已複習則豁免', () => {
  it('returns [] when a review was completed today', () => {
    makeLevelOverdue(1, 5);
    saveLevelProgress({
      highestUnlockedLevel: 3,
      unlockedMonsters: [1, 2],
      lastReviewCompletedDate: TODAY,
    });
    expect(processForgottenEscapes(fixedDeps({ now: T0 }))).toEqual([]);
  });
});

describe('E2E-esc-1 遺忘觸發逃跑', () => {
  it('a level overdue >= 3 days makes its monster run off', () => {
    makeLevelOverdue(1, 4);
    saveLevelProgress({ highestUnlockedLevel: 3, unlockedMonsters: [1, 2] });
    const escaped = processForgottenEscapes(fixedDeps({ now: T0 }));
    expect(escaped).toEqual([1]);
    const p = JSON.parse(localStorage.getItem('vocab_level_progress')!);
    expect(p.unlockedMonsters).not.toContain(1);
    expect(p.escapedMonsters).toContain(1);
    expect(p.lastEscapeDate).toBe(TODAY);
  });
});

describe('E2E-esc-2 未達門檻不逃', () => {
  it('overdue by only 2 days does not trigger an escape', () => {
    makeLevelOverdue(1, 2);
    saveLevelProgress({ highestUnlockedLevel: 3, unlockedMonsters: [1, 2] });
    expect(processForgottenEscapes(fixedDeps({ now: T0 }))).toEqual([]);
    const p = JSON.parse(localStorage.getItem('vocab_level_progress')!);
    expect(p.unlockedMonsters).toEqual([1, 2]);
  });
});

describe('E2E-esc-3 單日最多 1 隻', () => {
  it('never escapes more than one monster in a day', () => {
    // make words in both level 1 and level 2 overdue
    const w1 = getWordsForLevel(1)[0];
    const w2 = getWordsForLevel(2)[0];
    saveMasteryData({
      [w1.id]: {
        wordId: w1.id, boxLevel: 2, intervalDays: 3, dueDate: T0 - 5 * DAY,
        consecutiveCorrectDays: 1, lastReviewDate: T0 - 8 * DAY,
      },
      [w2.id]: {
        wordId: w2.id, boxLevel: 2, intervalDays: 3, dueDate: T0 - 5 * DAY,
        consecutiveCorrectDays: 1, lastReviewDate: T0 - 8 * DAY,
      },
    });
    saveLevelProgress({ highestUnlockedLevel: 3, unlockedMonsters: [1, 2] });
    expect(processForgottenEscapes(fixedDeps({ now: T0 }))).toHaveLength(1);
  });
});

describe('E2E-esc-4 複習抓回', () => {
  it('reviewing an escaped level\'s word brings the monster back', () => {
    const word = getWordsForLevel(1)[0];
    saveLevelProgress({
      highestUnlockedLevel: 3,
      unlockedMonsters: [2],
      escapedMonsters: [1],
    });
    const recovered = markReviewCompleted([word.id], fixedDeps({ now: T0 }));
    expect(recovered).toEqual([1]);
    const p = JSON.parse(localStorage.getItem('vocab_level_progress')!);
    expect(p.unlockedMonsters).toContain(1);
    expect(p.escapedMonsters).not.toContain(1);
    expect(p.lastReviewCompletedDate).toBe(TODAY);
  });

  it('completing a review that does not touch the escaped level keeps it escaped but grants immunity', () => {
    const otherWord = getWordsForLevel(5)[0];
    saveLevelProgress({
      highestUnlockedLevel: 3,
      unlockedMonsters: [2],
      escapedMonsters: [1],
    });
    const recovered = markReviewCompleted([otherWord.id], fixedDeps({ now: T0 }));
    expect(recovered).toEqual([]);
    const p = JSON.parse(localStorage.getItem('vocab_level_progress')!);
    expect(p.escapedMonsters).toContain(1);
    expect(p.lastReviewCompletedDate).toBe(TODAY);
  });
});

describe('E2E-esc-5 已逃當日不再逃', () => {
  it('does not escape again if one already escaped today', () => {
    makeLevelOverdue(2, 5);
    saveLevelProgress({
      highestUnlockedLevel: 3,
      unlockedMonsters: [2],
      lastEscapeDate: TODAY,
    });
    expect(processForgottenEscapes(fixedDeps({ now: T0 }))).toEqual([]);
  });
});
