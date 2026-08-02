import { beforeEach, describe, expect, it } from 'vitest';
import {
  AnswerRecord,
  clearAnswerLog,
  errorRateByGameType,
  loadAnswerLog,
  logAnswer,
  makeWordKey,
  MAX_RECORDS,
  parseWordKey,
} from '../answerLog';
import { fixedDeps, T0 } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('E2E-log-1 append + date', () => {
  it('stores a record with date derived from injected now', () => {
    const rec = logAnswer(
      { wordId: makeWordKey('server', 802), gameType: 'cloze', correct: true, responseMs: 1500 },
      fixedDeps({ now: T0 })
    );
    expect(rec.date).toBe('2026-03-02');
    const log = loadAnswerLog();
    expect(log).toHaveLength(1);
    expect(log[0]).toEqual<AnswerRecord>({
      wordId: 'server:802',
      gameType: 'cloze',
      correct: true,
      responseMs: 1500,
      date: '2026-03-02',
    });
  });
});

describe('E2E-log-2 composite word key', () => {
  it('formats and round-trips both sources', () => {
    expect(makeWordKey('server', 802)).toBe('server:802');
    expect(makeWordKey('srs', 'knight_a1b2c')).toBe('srs:knight_a1b2c');
    expect(parseWordKey('server:802')).toEqual({ source: 'server', id: '802' });
    expect(parseWordKey('srs:knight_a1b2c')).toEqual({ source: 'srs', id: 'knight_a1b2c' });
  });
});

describe('E2E-log-3 ring buffer caps at 2000', () => {
  it('keeps only the most recent MAX_RECORDS, dropping oldest', () => {
    for (let i = 0; i < MAX_RECORDS + 1; i++) {
      logAnswer(
        {
          wordId: makeWordKey('server', i),
          gameType: 'matching',
          correct: true,
          responseMs: i,
        },
        fixedDeps({ now: T0 })
      );
    }
    const log = loadAnswerLog();
    expect(log).toHaveLength(MAX_RECORDS);
    // oldest (i=0) dropped, newest (i=2000) kept
    expect(log[0].wordId).toBe('server:1');
    expect(log[log.length - 1].wordId).toBe(`server:${MAX_RECORDS}`);
  });
});

describe('E2E-log-4 error rate by gameType', () => {
  it('aggregates attempts/errors/errorRate per gameType', () => {
    const deps = fixedDeps({ now: T0 });
    const k = makeWordKey('server', 1);
    // cloze: 3 attempts, 2 wrong
    logAnswer({ wordId: k, gameType: 'cloze', correct: false, responseMs: 1 }, deps);
    logAnswer({ wordId: k, gameType: 'cloze', correct: false, responseMs: 1 }, deps);
    logAnswer({ wordId: k, gameType: 'cloze', correct: true, responseMs: 1 }, deps);
    // matching: 2 attempts, 0 wrong
    logAnswer({ wordId: k, gameType: 'matching', correct: true, responseMs: 1 }, deps);
    logAnswer({ wordId: k, gameType: 'matching', correct: true, responseMs: 1 }, deps);

    const stats = errorRateByGameType();
    const cloze = stats.find((s) => s.gameType === 'cloze')!;
    const matching = stats.find((s) => s.gameType === 'matching')!;
    expect(cloze).toMatchObject({ attempts: 3, errors: 2 });
    expect(cloze.errorRate).toBeCloseTo(2 / 3, 5);
    expect(matching).toMatchObject({ attempts: 2, errors: 0, errorRate: 0 });
  });

  it('clearAnswerLog empties the log', () => {
    logAnswer(
      { wordId: makeWordKey('srs', 'x'), gameType: 'sentence_cloze', correct: true, responseMs: 1 },
      fixedDeps({ now: T0 })
    );
    clearAnswerLog();
    expect(loadAnswerLog()).toHaveLength(0);
  });
});
