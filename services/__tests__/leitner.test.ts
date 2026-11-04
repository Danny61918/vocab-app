import { describe, expect, it } from 'vitest';
import { applyAnswer, BOX_INTERVALS, BoxState, DAY_MS, newBoxState } from '../leitner';
import { loadMasteryData, updateWordMastery } from '../srsStorage';
import { vocabData } from '../newVocabData';
import { DAY, fixedDeps, T0 } from './helpers';

describe('applyAnswer 純函式', () => {
  it('a brand-new state starts at box 0 and is due immediately', () => {
    const s = newBoxState(T0);
    expect(s).toMatchObject({ boxLevel: 0, consecutiveCorrectDays: 0, dueDate: T0 });
  });

  it('cross-day correct promotes one box and schedules by BOX_INTERVALS', () => {
    let s = newBoxState(T0);
    s = applyAnswer(s, true, T0, 'd0');
    expect(s.boxLevel).toBe(1);
    expect(s.dueDate).toBe(T0 + BOX_INTERVALS[1] * DAY_MS);
    s = applyAnswer(s, true, T0 + DAY, 'd1');
    expect(s.boxLevel).toBe(2);
    expect(s.consecutiveCorrectDays).toBe(2);
    expect(s.dueDate).toBe(T0 + DAY + BOX_INTERVALS[2] * DAY_MS);
  });

  it('same-day repeats of a correct answer promote only once', () => {
    let s = newBoxState(T0);
    s = applyAnswer(s, true, T0, 'd0');
    s = applyAnswer(s, true, T0 + 1000, 'd0');
    s = applyAnswer(s, true, T0 + 2000, 'd0');
    expect(s.boxLevel).toBe(1);
    expect(s.consecutiveCorrectDays).toBe(1);
  });

  it('a wrong answer drops to box 1, resets the streak and is due tomorrow', () => {
    let s: BoxState = { ...newBoxState(T0), boxLevel: 4, consecutiveCorrectDays: 4, lastCorrectDate: 'd0' };
    s = applyAnswer(s, false, T0 + DAY, 'd1');
    expect(s.boxLevel).toBe(1);
    expect(s.consecutiveCorrectDays).toBe(0);
    expect(s.dueDate).toBe(T0 + DAY + BOX_INTERVALS[1] * DAY_MS);
  });

  it('same day wrong-then-right does NOT promote (behaviour change vs. P1)', () => {
    let s: BoxState = { ...newBoxState(T0), boxLevel: 2, consecutiveCorrectDays: 2, lastCorrectDate: 'd0' };
    s = applyAnswer(s, false, T0 + DAY, 'd1');
    s = applyAnswer(s, true, T0 + DAY + 1000, 'd1');
    expect(s.boxLevel).toBe(1);
    expect(s.consecutiveCorrectDays).toBe(0);
    // ...but the next day's correct answer does promote.
    s = applyAnswer(s, true, T0 + 2 * DAY, 'd2');
    expect(s.boxLevel).toBe(2);
    expect(s.consecutiveCorrectDays).toBe(1);
  });

  it('same day right-then-wrong-then-right leaves box 1 (no second promotion)', () => {
    let s = newBoxState(T0);
    s = applyAnswer(s, true, T0, 'd0');
    s = applyAnswer(s, false, T0 + 1000, 'd0');
    s = applyAnswer(s, true, T0 + 2000, 'd0');
    expect(s.boxLevel).toBe(1);
    expect(s.consecutiveCorrectDays).toBe(0);
  });

  it('box never exceeds 5', () => {
    let s: BoxState = { ...newBoxState(T0), boxLevel: 5, consecutiveCorrectDays: 9, lastCorrectDate: 'd0' };
    s = applyAnswer(s, true, T0 + DAY, 'd1');
    expect(s.boxLevel).toBe(5);
    expect(s.dueDate).toBe(T0 + DAY + BOX_INTERVALS[5] * DAY_MS);
  });

  it('does not mutate its input', () => {
    const s = newBoxState(T0);
    const frozen = JSON.stringify(s);
    applyAnswer(s, true, T0, 'd0');
    expect(JSON.stringify(s)).toBe(frozen);
  });
});

describe('updateWordMastery 與 applyAnswer 一致', () => {
  it('same-day wrong-then-right on a word leaves it in box 1', () => {
    localStorage.clear();
    const w = vocabData[5].id;
    updateWordMastery(w, true, fixedDeps({ now: T0 }));
    updateWordMastery(w, true, fixedDeps({ now: T0 + DAY }));
    expect(loadMasteryData()[w].boxLevel).toBe(2);

    const d2 = fixedDeps({ now: T0 + 2 * DAY });
    updateWordMastery(w, false, d2);
    updateWordMastery(w, true, d2);
    const m = loadMasteryData()[w];
    expect(m.boxLevel).toBe(1);
    expect(m.consecutiveCorrectDays).toBe(0);
  });
});
