import { describe, expect, it } from 'vitest';
import { getSkillWeaknesses } from '../mistakeBook/weakness';
import { SkillProgress } from '../mistakeBook/drillProgress';
import { MistakeRecord } from '../mistakeBook/types';
import { newBoxState } from '../leitner';
import { T0 } from './helpers';

function mistake(id: string, examDate: string, skills?: string[]): MistakeRecord {
  return {
    id, examDate, section: 's', questionText: 'q', studentAnswer: 'a', correctAnswer: 'b',
    errorCategory: 'verb_tense', rawErrorType: 'r', teacherExplanation: 't', reviewAdvice: 'r',
    questionType: 'multiple_choice', importedAt: '2026-11-04T00:00:00.000Z', skills,
  };
}

function progress(key: string, results: boolean[], over: Partial<SkillProgress> = {}): SkillProgress {
  return {
    key, ...newBoxState(T0),
    recent: results.map((correct, i) => ({ date: `2026-11-0${i + 1}`, itemId: `${key}-${i}#v1`, correct, ms: 3000 })),
    ...over,
  };
}

describe('getSkillWeaknesses 弱點排行', () => {
  const mistakes = [
    mistake('m1', '2026-11-04', ['G.SVA.plural_subject']),
    mistake('m2', '2026-10-20', ['G.SVA.plural_subject', 'G.NEG.dont_doesnt']),
    mistake('m3', '2026-11-04', ['V.COLLOC']),
    mistake('m4', '2026-10-01'), // no skills: legacy record, not ranked
  ];

  it('lists only skills that have real mistakes, with counts and the latest exam date', () => {
    const rows = getSkillWeaknesses(mistakes, {});
    expect(rows.map((r) => r.skill.id).sort()).toEqual(['G.NEG.dont_doesnt', 'G.SVA.plural_subject', 'V.COLLOC']);
    const plural = rows.find((r) => r.skill.id === 'G.SVA.plural_subject')!;
    expect(plural.mistakeCount).toBe(2);
    expect(plural.lastExamDate).toBe('2026-11-04');
    expect(plural.status).toBe('new');
    expect(plural.attempts).toBe(0);
  });

  it('most mistakes first', () => {
    const rows = getSkillWeaknesses(mistakes, {});
    expect(rows[0].skill.id).toBe('G.SVA.plural_subject');
  });

  it('reports practising progress and the correct rate over recent attempts', () => {
    const rows = getSkillWeaknesses(mistakes, { 'V.COLLOC': progress('V.COLLOC', [false, true, true, true]) });
    const colloc = rows.find((r) => r.skill.id === 'V.COLLOC')!;
    expect(colloc.status).toBe('practicing');
    expect(colloc.attempts).toBe(4);
    expect(colloc.correctRate).toBeCloseTo(0.75);
  });

  it('graduated skills sink below the ones still being worked on', () => {
    const graduated = progress('G.SVA.plural_subject', [true, true, true], { consecutiveCorrectDays: 3, boxLevel: 3 });
    const rows = getSkillWeaknesses(mistakes, { 'G.SVA.plural_subject': graduated });
    const plural = rows.find((r) => r.skill.id === 'G.SVA.plural_subject')!;
    expect(plural.status).toBe('graduated');
    expect(rows[rows.length - 1].skill.id).toBe('G.SVA.plural_subject');
  });

  it('ignores unknown skill ids instead of crashing', () => {
    const rows = getSkillWeaknesses([mistake('m9', '2026-11-04', ['X.nope'])], {});
    expect(rows).toEqual([]);
  });
});
