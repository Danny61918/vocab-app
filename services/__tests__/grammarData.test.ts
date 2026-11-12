import { describe, expect, it } from 'vitest';
import { GrammarCategory } from '../../types';
import { GRAMMAR_BOSS_MAP, GRAMMAR_QUESTIONS } from '../grammarData';

describe('grammar question bank', () => {
  it('has unique ids and sentences', () => {
    const ids = GRAMMAR_QUESTIONS.map(q => q.id);
    const sents = GRAMMAR_QUESTIONS.map(q => q.sentenceContext.trim().toLowerCase());
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(sents).size).toBe(sents.length);
  });

  it('every question is well-formed', () => {
    for (const q of GRAMMAR_QUESTIONS) {
      expect(q.options, q.id).toContain(q.correctAnswer);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
      expect(q.sentenceContext.split('___').length - 1, q.id).toBe(1);
      expect(q.ruleReminder.length, q.id).toBeGreaterThan(0);
    }
  });

  it('each category has at least 51 questions (3 battles x 17) and a boss', () => {
    for (const c of Object.values(GrammarCategory)) {
      const n = GRAMMAR_QUESTIONS.filter(q => q.category === c).length;
      expect(n, c).toBeGreaterThanOrEqual(51);
      expect(GRAMMAR_BOSS_MAP[c]).toBeDefined();
    }
  });
});
