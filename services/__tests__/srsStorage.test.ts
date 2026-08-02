import { beforeEach, describe, expect, it } from 'vitest';
import {
  BOX_INTERVALS,
  getDailyHuntWords,
  loadMasteryData,
  migrateMasteryData,
  saveMasteryData,
  updateWordMastery,
  VocabMastery,
} from '../srsStorage';
import { vocabData } from '../newVocabData';
import { DAY, fixedDeps, seededRng, T0 } from './helpers';

const SRS_KEY = 'vocab_srs_mastery';
const LEVEL_KEY = 'vocab_level_progress';

function readMastery(): Record<string, VocabMastery> {
  return JSON.parse(localStorage.getItem(SRS_KEY) || '{}');
}

beforeEach(() => {
  localStorage.clear();
});

describe('E2E-1 防假精通（同場同日連對只升一級）', () => {
  it('same-day 3x correct promotes box by exactly 1 and ccd == 1', () => {
    const w = vocabData[0].id;
    const deps = fixedDeps({ now: T0 });
    updateWordMastery(w, true, deps);
    updateWordMastery(w, true, deps);
    updateWordMastery(w, true, deps);
    const m = readMastery()[w];
    expect(m.boxLevel).toBe(1);
    expect(m.consecutiveCorrectDays).toBe(1);
    expect(m.lastReviewDate).toBe(T0);
  });
});

describe('E2E-2 間隔遞增（連續三天各答對一次 → +1/+3/+7）', () => {
  it('dueDate offsets follow BOX_INTERVALS[1..3]', () => {
    const w = vocabData[1].id;
    const d0 = T0;
    const d1 = T0 + 1 * DAY;
    const d2 = T0 + 2 * DAY;

    updateWordMastery(w, true, fixedDeps({ now: d0 }));
    expect(readMastery()[w].dueDate - d0).toBe(BOX_INTERVALS[1] * DAY); // +1

    updateWordMastery(w, true, fixedDeps({ now: d1 }));
    expect(readMastery()[w].dueDate - d1).toBe(BOX_INTERVALS[2] * DAY); // +3

    updateWordMastery(w, true, fixedDeps({ now: d2 }));
    const m = readMastery()[w];
    expect(m.dueDate - d2).toBe(BOX_INTERVALS[3] * DAY); // +7
    expect(m.boxLevel).toBe(3);
    expect(m.consecutiveCorrectDays).toBe(3);
  });
});

describe('E2E-3 box5 維護回鍋（精通字 30 天後仍出現）', () => {
  it('a box-5 word whose dueDate has passed appears in the daily hunt', () => {
    const w = vocabData[3].id;
    saveMasteryData({
      [w]: {
        wordId: w,
        boxLevel: 5,
        intervalDays: BOX_INTERVALS[5],
        dueDate: T0 + 30 * DAY,
        consecutiveCorrectDays: 5,
        lastReviewDate: T0,
      },
    });
    // fast-forward past the 30-day interval
    const later = T0 + 31 * DAY;
    const hunt = getDailyHuntWords(fixedDeps({ now: later, rng: seededRng(7) }));
    expect(hunt.map((x) => x.id)).toContain(w);
  });
});

describe('E2E-4 答錯降級（box3 答錯 → box1、明日到期）', () => {
  it('wrong answer drops to box 1 and dueDate ~ +1 day', () => {
    const w = vocabData[2].id;
    saveMasteryData({
      [w]: {
        wordId: w,
        boxLevel: 3,
        intervalDays: BOX_INTERVALS[3],
        dueDate: T0 + 7 * DAY,
        consecutiveCorrectDays: 3,
        lastReviewDate: T0 - DAY,
        lastCorrectDate: '2026-03-01',
      },
    });
    updateWordMastery(w, false, fixedDeps({ now: T0 }));
    const m = readMastery()[w];
    expect(m.boxLevel).toBe(1);
    expect(m.consecutiveCorrectDays).toBe(0);
    expect(m.dueDate - T0).toBe(BOX_INTERVALS[1] * DAY);
  });
});

describe('E2E-7 遷移無損（舊 masteryLevel → 新 boxLevel）', () => {
  it('maps 0->0, 1->2, 2->4 without losing entries or touching level progress', () => {
    const old = {
      a: { wordId: 'a', masteryLevel: 0, consecutiveCorrect: 0, lastReviewDate: T0 },
      b: { wordId: 'b', masteryLevel: 1, consecutiveCorrect: 2, lastReviewDate: T0 },
      c: { wordId: 'c', masteryLevel: 2, consecutiveCorrect: 5 },
    };
    localStorage.setItem(SRS_KEY, JSON.stringify(old));
    localStorage.setItem(LEVEL_KEY, JSON.stringify({ highestUnlockedLevel: 6, unlockedMonsters: [1, 2, 3] }));

    const migrated = loadMasteryData(fixedDeps({ now: T0 }));

    expect(Object.keys(migrated)).toHaveLength(3);
    expect(migrated.a.boxLevel).toBe(0);
    expect(migrated.b.boxLevel).toBe(2);
    expect(migrated.c.boxLevel).toBe(4);
    // consecutiveCorrect clamped to <= 3
    expect(migrated.c.consecutiveCorrectDays).toBe(3);
    // interval derived from box
    expect(migrated.b.intervalDays).toBe(BOX_INTERVALS[2]);
    // level progress (monster gallery) untouched
    const lvl = JSON.parse(localStorage.getItem(LEVEL_KEY)!);
    expect(lvl.unlockedMonsters).toEqual([1, 2, 3]);
  });

  it('direct migrateMasteryData is idempotent on already-new data', () => {
    const now = T0;
    const once = migrateMasteryData(
      { a: { wordId: 'a', masteryLevel: 2, consecutiveCorrect: 1, lastReviewDate: now } },
      fixedDeps({ now })
    );
    const twice = migrateMasteryData(once as any, fixedDeps({ now }));
    expect(twice).toEqual(once);
  });
});

describe('E2E-8 總量約束（Daily Hunt ≤ 15）', () => {
  it('never returns more than 15 words even when everything is due', () => {
    const now = T0 + 100 * DAY;
    const all: Record<string, VocabMastery> = {};
    for (const w of vocabData) {
      all[w.id] = {
        wordId: w.id,
        boxLevel: 2,
        intervalDays: BOX_INTERVALS[2],
        dueDate: T0, // long overdue
        consecutiveCorrectDays: 1,
        lastReviewDate: T0,
      };
    }
    saveMasteryData(all);
    const hunt = getDailyHuntWords(fixedDeps({ now, rng: seededRng(3) }));
    expect(hunt.length).toBeLessThanOrEqual(15);
    // no duplicates
    expect(new Set(hunt.map((x) => x.id)).size).toBe(hunt.length);
  });

  it('mixes up to 10 due + 5 new when both are plentiful', () => {
    const now = T0 + 10 * DAY;
    const all: Record<string, VocabMastery> = {};
    // make the first 20 words "due", leave the rest as brand-new
    for (const w of vocabData.slice(0, 20)) {
      all[w.id] = {
        wordId: w.id,
        boxLevel: 1,
        intervalDays: BOX_INTERVALS[1],
        dueDate: T0,
        consecutiveCorrectDays: 1,
        lastReviewDate: T0,
      };
    }
    saveMasteryData(all);
    const hunt = getDailyHuntWords(fixedDeps({ now, rng: seededRng(9) }));
    expect(hunt.length).toBe(15);
    const dueIds = new Set(vocabData.slice(0, 20).map((w) => w.id));
    const dueCount = hunt.filter((x) => dueIds.has(x.id)).length;
    const newCount = hunt.length - dueCount;
    expect(dueCount).toBeLessThanOrEqual(10);
    expect(newCount).toBeLessThanOrEqual(5);
  });
});
