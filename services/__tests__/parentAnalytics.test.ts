import { beforeEach, describe, expect, it } from 'vitest';
import {
  dailyStudyMinutes,
  diagnoseByGameType,
  GAME_TYPE_DIAGNOSIS,
  logAnswer,
  makeWordKey,
} from '../answerLog';
import { BOX_INTERVALS, getOverdueWords, saveMasteryData, VocabMastery } from '../srsStorage';
import { vocabData } from '../newVocabData';
import { DAY, fixedDeps, T0 } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('E2E-p5-1 diagnoseByGameType 標籤/weak', () => {
  it('labels each game type and flags weak only above thresholds', () => {
    const deps = fixedDeps({ now: T0 });
    const k = makeWordKey('srs', 'x');
    // cloze: 6 attempts, 4 wrong -> errorRate .667 >= .34, attempts >=5 -> weak
    for (let i = 0; i < 4; i++) logAnswer({ wordId: k, gameType: 'cloze', correct: false, responseMs: 1000 }, deps);
    for (let i = 0; i < 2; i++) logAnswer({ wordId: k, gameType: 'cloze', correct: true, responseMs: 1000 }, deps);
    // matching: 3 attempts, 3 wrong -> errorRate 1 but attempts < 5 -> NOT weak
    for (let i = 0; i < 3; i++) logAnswer({ wordId: k, gameType: 'matching', correct: false, responseMs: 1000 }, deps);

    const diag = diagnoseByGameType();
    const cloze = diag.find((d) => d.gameType === 'cloze')!;
    const matching = diag.find((d) => d.gameType === 'matching')!;
    expect(cloze.label).toBe(GAME_TYPE_DIAGNOSIS.cloze);
    expect(cloze.weak).toBe(true);
    expect(matching.weak).toBe(false); // too few attempts
  });
});

describe('E2E-p5-2 dailyStudyMinutes 加總', () => {
  it('sums responseMs per date into minutes', () => {
    const k = makeWordKey('server', 1);
    // day A: 60000 + 30000 ms = 1.5 min
    logAnswer({ wordId: k, gameType: 'cloze', correct: true, responseMs: 60000, date: '2026-08-01' });
    logAnswer({ wordId: k, gameType: 'cloze', correct: true, responseMs: 30000, date: '2026-08-01' });
    // day B: 120000 ms = 2 min
    logAnswer({ wordId: k, gameType: 'cloze', correct: true, responseMs: 120000, date: '2026-08-02' });

    const daily = dailyStudyMinutes();
    expect(daily).toEqual([
      { date: '2026-08-01', minutes: 1.5 },
      { date: '2026-08-02', minutes: 2 },
    ]);
  });
});

describe('E2E-p5-3 getOverdueWords', () => {
  it('returns only due words, with correct daysOverdue, sorted desc', () => {
    const w0 = vocabData[0];
    const w1 = vocabData[1];
    const w2 = vocabData[2];
    const mastery: Record<string, VocabMastery> = {
      [w0.id]: mk(w0.id, T0 - 2 * DAY), // 2 days overdue
      [w1.id]: mk(w1.id, T0 - 5 * DAY), // 5 days overdue
      [w2.id]: mk(w2.id, T0 + 3 * DAY), // not due yet
    };
    saveMasteryData(mastery);

    const overdue = getOverdueWords(fixedDeps({ now: T0 }));
    expect(overdue.map((o) => o.word.id)).toEqual([w1.id, w0.id]); // most overdue first, w2 excluded
    expect(overdue[0].daysOverdue).toBe(5);
    expect(overdue[1].daysOverdue).toBe(2);
  });
});

function mk(wordId: string, dueDate: number): VocabMastery {
  return {
    wordId,
    boxLevel: 2,
    intervalDays: BOX_INTERVALS[2],
    dueDate,
    consecutiveCorrectDays: 1,
    lastReviewDate: dueDate - BOX_INTERVALS[2] * DAY,
  };
}
