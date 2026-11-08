import { describe, expect, it } from 'vitest';
import { ALL_MISTAKES } from '../mistakeBook';
import { computeMistakeStats, focusAreaOf, FOCUS_ADVICE, topFocus } from '../mistakeBook/stats';
import { MistakeRecord } from '../mistakeBook/types';

const base: MistakeRecord = {
  id: 'x',
  examDate: '2026-10-01',
  section: 'A',
  questionText: 'q',
  studentAnswer: 'a',
  correctAnswer: 'after all',
  errorCategory: 'content_comprehension',
  rawErrorType: 'r',
  teacherExplanation: 'e',
  reviewAdvice: 'a',
  questionType: 'fill_blank',
  importedAt: '2026-11-01T00:00:00.000Z',
};
const rec = (patch: Partial<MistakeRecord>): MistakeRecord => ({ ...base, ...patch });

describe('focusAreaOf', () => {
  it('uses the first registered skill tag', () => {
    expect(focusAreaOf(rec({ skills: ['V.PHRASE'] }))).toBe('phrase');
    expect(focusAreaOf(rec({ skills: ['V.CONTEXT'] }))).toBe('vocab');
    expect(focusAreaOf(rec({ skills: ['R.CLIL.science'] }))).toBe('science');
    expect(focusAreaOf(rec({ skills: ['R.DETAIL'] }))).toBe('reading');
    expect(focusAreaOf(rec({ skills: ['G.POSS.their_its'] }))).toBe('noun');
    expect(focusAreaOf(rec({ skills: ['G.PROG.present_continuous'] }))).toBe('verb');
    expect(focusAreaOf(rec({ skills: ['M.CAP.letter_case'] }))).toBe('writing');
  });

  it('falls back to the error category when there is no registered skill', () => {
    expect(focusAreaOf(rec({ errorCategory: 'plural_possessive' }))).toBe('noun');
    expect(focusAreaOf(rec({ errorCategory: 'verb_tense', skills: ['X.unknown'] }))).toBe('verb');
    expect(focusAreaOf(rec({ errorCategory: 'content_comprehension' }))).toBe('other');
  });
});

describe('computeMistakeStats', () => {
  const data = [
    rec({ id: '1', examDate: '2026-09-10', skills: ['V.PHRASE'], correctAnswer: 'after all' }),
    rec({ id: '2', examDate: '2026-09-20', skills: ['V.PHRASE'], correctAnswer: '(c) After all.' }),
    rec({ id: '3', examDate: '2026-10-05', skills: ['G.POSS.their_its'], correctAnswer: 'T', questionType: 'multiple_choice' }),
    rec({ id: '4', examDate: '2026-10-05', skills: ['G.POSS.their_its'], correctAnswer: 'T', questionType: 'multiple_choice', studentAnswer: '未知（看不到）' }),
    rec({ id: '5', examDate: '2026-10-05', skills: ['M.COMMA.series'], correctAnswer: 'a long rewritten sentence', questionType: 'rewrite' }),
  ];
  const s = computeMistakeStats(data);

  it('counts totals, exams and the date range', () => {
    expect(s.total).toBe(5);
    expect(s.examCount).toBe(3);
    expect(s.firstDate).toBe('2026-09-10');
    expect(s.lastDate).toBe('2026-10-05');
  });

  it('groups by area, largest first, and shares add up to 1', () => {
    expect(s.byArea.map((a) => [a.area, a.count])).toEqual([['phrase', 2], ['noun', 2], ['writing', 1]]);
    expect(s.byArea.reduce((n, a) => n + a.share, 0)).toBeCloseTo(1);
  });

  it('groups by month (oldest first) and by exam (newest first)', () => {
    expect(s.byMonth.map((m) => [m.month, m.total])).toEqual([['2026-09', 2], ['2026-10', 3]]);
    expect(s.byExam.map((e) => e.examDate)).toEqual(['2026-10-05', '2026-09-20', '2026-09-10']);
  });

  it('reports an answer missed in separate questions, ignoring T/F and rewrite answers', () => {
    expect(s.repeated).toEqual([{ answer: 'after all', count: 2, dates: ['2026-09-10', '2026-09-20'] }]);
  });

  it('reports the share of unknown original answers and of tagged records', () => {
    expect(s.unknownAnswerShare).toBeCloseTo(1 / 5);
    expect(s.taggedShare).toBe(1);
  });

  it('gives advice for the top areas and never for "other"', () => {
    const top = topFocus(s, 2);
    expect(top.map((t) => t.area)).toEqual(['phrase', 'noun']);
    expect(top[0].advice).toBe(FOCUS_ADVICE.phrase);
    const withOther = computeMistakeStats([rec({}), rec({ id: '2' })]);
    expect(topFocus(withOther)).toEqual([]);
  });

  it('handles an empty list', () => {
    const e = computeMistakeStats([]);
    expect(e.total).toBe(0);
    expect(e.byArea).toEqual([]);
    expect(e.taggedShare).toBe(0);
  });
});

describe('real mistake data', () => {
  const s = computeMistakeStats(ALL_MISTAKES);

  it('accounts for every record exactly once', () => {
    expect(s.total).toBe(ALL_MISTAKES.length);
    expect(s.byArea.reduce((n, a) => n + a.count, 0)).toBe(ALL_MISTAKES.length);
    expect(s.byMonth.reduce((n, m) => n + m.total, 0)).toBe(ALL_MISTAKES.length);
  });

  it('has skill tags on nearly every record after the backfill', () => {
    expect(s.taggedShare).toBeGreaterThan(0.95);
  });
});
