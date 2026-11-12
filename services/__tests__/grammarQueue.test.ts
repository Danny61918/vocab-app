import { beforeEach, describe, expect, it } from 'vitest';
import { GrammarCategory, GrammarQuestion } from '../../types';
import { pickBattleQuestions } from '../grammarQueue';

const mkPool = (n: number): GrammarQuestion[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `q${i}`,
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: `___ ${i}`,
    options: ['a', 'b', 'c'],
    correctAnswer: 'a',
    ruleReminder: '',
  }));

describe('pickBattleQuestions', () => {
  beforeEach(() => localStorage.clear());

  it('never repeats within a battle', () => {
    const picked = pickBattleQuestions('C', mkPool(54), 20);
    expect(new Set(picked.map(q => q.id)).size).toBe(20);
  });

  it('gives 2 full battles with no overlap from a 54-question pool', () => {
    const pool = mkPool(54);
    const a = pickBattleQuestions('C', pool, 20).map(q => q.id);
    const b = pickBattleQuestions('C', pool, 20).map(q => q.id);
    expect(a.filter(id => b.includes(id))).toHaveLength(0);
  });

  it('wraps around when the pool runs out, still without duplicates in a battle', () => {
    const pool = mkPool(25);
    pickBattleQuestions('C', pool, 20);
    const second = pickBattleQuestions('C', pool, 20);
    expect(second).toHaveLength(20);
    expect(new Set(second.map(q => q.id)).size).toBe(20);
  });

  it('tracks categories independently and keeps option sets intact', () => {
    const pool = mkPool(30);
    const a = pickBattleQuestions('X', pool, 20);
    const b = pickBattleQuestions('Y', pool, 20);
    expect(a.length + b.length).toBe(40);
    expect([...a[0].options].sort()).toEqual(['a', 'b', 'c']);
  });
});
