import { beforeEach, describe, expect, it } from 'vitest';
import { ALL_DRILLS } from '../mistakeBook/drills';
import { loadSkillProgress, presentOptions, recordDrillAnswer } from '../mistakeBook/drillProgress';
import { getSkill } from '../mistakeBook/skills';

const SUPP = ALL_DRILLS.filter((d) => d.id.startsWith('supp.'));

describe('supplementary drill bank (supp/)', () => {
  beforeEach(() => localStorage.clear());

  it('has 6 items for each of the 12 newly covered skills', () => {
    const by = new Map<string, number>();
    for (const d of SUPP) by.set(d.skillIds[0], (by.get(d.skillIds[0]) ?? 0) + 1);
    expect(by.size).toBe(12);
    for (const [skill, n] of by) {
      expect(getSkill(skill), skill).toBeDefined();
      expect(n, skill).toBe(6);
    }
    expect(SUPP).toHaveLength(72);
  });

  it('every item grades correctly: the answer is right, every distractor is wrong', () => {
    for (const d of SUPP) {
      const shown = presentOptions(d);
      expect(shown.slice().sort(), d.id).toEqual([d.answer, ...d.distractors.map((x) => x.text)].sort());
      expect(recordDrillAnswer(d, d.answer, 1000).correct, d.id).toBe(true);
      for (const x of d.distractors) {
        expect(recordDrillAnswer(d, x.text, 1000).correct, `${d.id} / ${x.text}`).toBe(false);
      }
    }
    expect(Object.keys(loadSkillProgress()).length).toBe(12);
  });
});
