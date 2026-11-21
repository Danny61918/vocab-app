import { describe, expect, it } from 'vitest';
import { buildAskAiPrompt, explainSteps, pickExplainerMonster } from '../mistakeBook/explainer';
import { ALL_DRILLS } from '../mistakeBook/drills';
import { KID_EXPLAIN } from '../mistakeBook/drills/kidExplain';
import { validateDrillItem } from '../mistakeBook/drills/validate';
import { DrillItem } from '../mistakeBook/drills/types';
import { MONSTER_DATA } from '../monsterData';

const base: DrillItem = {
  id: 'x#v1',
  skillIds: ['G.PS.does_question_base'],
  kind: 'mc',
  stem: 'Does Mia ___ dinner?',
  answer: 'cook',
  distractors: [{ text: 'cooks' }, { text: 'cooking' }],
  difficulty: 1,
  variation: ['question'],
  explanation: '問句用了 Does，後面的動詞用原形。',
};

describe('pickExplainerMonster', () => {
  it('picks from the monsters the child owns', () => {
    for (const r of [0, 0.5, 0.99]) expect([3, 7]).toContain(pickExplainerMonster([3, 7], () => r).id);
  });
  it('falls back to an ordinary monster when none is owned or the ids are unknown', () => {
    expect(MONSTER_DATA[pickExplainerMonster([], () => 0.3).id].isLegendary).toBeFalsy();
    expect(pickExplainerMonster([99999], () => 0.3)).toBeDefined();
  });
});

describe('explainSteps', () => {
  it('falls back to the single existing explanation', () => {
    const steps = explainSteps(base);
    expect(steps).toHaveLength(1);
    expect(steps[0].body).toBe(base.explanation);
  });
  it('walks why, how, then a right/wrong pair when kidExplain exists', () => {
    const steps = explainSteps({ ...base, kidExplain: { why: '因為。', how: '這樣想。', example: { right: 'Does Mia cook?', wrong: 'Does Mia cooks?' } } });
    expect(steps).toHaveLength(3);
    expect(steps[0].body).toBe('因為。');
    expect(steps[1].body).toBe('這樣想。');
    expect(steps[2].example?.right).toBe('Does Mia cook?');
  });
});

describe('buildAskAiPrompt', () => {
  it('contains the question, the options, the pick and the answer', () => {
    const text = buildAskAiPrompt(base, 'cooks');
    expect(text).toContain('Does Mia ___ dinner?');
    expect(text).toContain('孩子選的：cooks');
    expect(text).toContain('正確答案：cook');
    expect(text).toContain('cooking');
  });
});

describe('kidExplain data', () => {
  it('every key belongs to a real drill item, and the merged items pass validation', () => {
    const ids = new Set(ALL_DRILLS.map((i) => i.id));
    for (const key of Object.keys(KID_EXPLAIN)) expect(ids.has(key), key).toBe(true);
    for (const item of ALL_DRILLS.filter((i) => i.kidExplain)) expect(validateDrillItem(item), item.id).toEqual([]);
    expect(ALL_DRILLS.filter((i) => i.kidExplain).length).toBe(Object.keys(KID_EXPLAIN).length);
  });
  it('rejects an explanation written in English or with identical right/wrong sentences', () => {
    const bad = (k: DrillItem['kidExplain']) => validateDrillItem({ ...base, kidExplain: k }).join();
    expect(bad({ why: 'because', how: '這樣想。', example: { right: 'a b', wrong: 'a c' } })).toMatch(/Chinese/);
    expect(bad({ why: '因為。', how: '這樣想。', example: { right: 'Same', wrong: 'same' } })).toMatch(/differ/);
    expect(bad({ why: '因為。', how: '這樣想。', example: { right: '對的句子', wrong: 'wrong' } })).toMatch(/English/);
  });
  it('the right example sentence uses the answer of the item it explains', () => {
    for (const item of ALL_DRILLS.filter((i) => i.kidExplain)) {
      expect(item.kidExplain!.example.right.toLowerCase(), item.id).toContain(item.answer.toLowerCase());
    }
  });
});
