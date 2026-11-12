import { describe, expect, it } from 'vitest';
import { ALL_DRILLS } from '../mistakeBook/drills';
import { DrillItem } from '../mistakeBook/drills/types';
import { validateDrillBank, validateDrillItem } from '../mistakeBook/drills/validate';
import { ALL_CONFUSION_SETS } from '../mistakeBook/confusionSets';
import { ALL_MISTAKES } from '../mistakeBook';
import { getSkill } from '../mistakeBook/skills';
import { SEED_WORD_MISTAKES } from '../mistakeBook/drills/seedWords';

const good: DrillItem = {
  id: 'seed-a#v1',
  skillIds: ['V.CONFUSE', 'V.COLLOC'],
  confusionSetId: 'cs.health',
  kind: 'mc',
  stem: 'Mia stayed home because she caught a ___.',
  answer: 'cold',
  distractors: [{ text: 'cough' }, { text: 'dizzy' }, { text: 'headache' }],
  targetWords: ['cold'],
  clue: 'collocation',
  difficulty: 1,
  variation: ['context'],
  explanation: 'catch a cold 是「感冒」的固定搭配。',
};

function problems(patch: Partial<DrillItem>): string[] {
  return validateDrillItem({ ...good, ...patch });
}

describe('validateDrillItem 單題驗證', () => {
  it('accepts a well-formed item', () => {
    expect(validateDrillItem(good)).toEqual([]);
  });

  it('stem must have exactly one blank', () => {
    expect(problems({ stem: 'She caught a cold.' }).join()).toMatch(/blank/);
    expect(problems({ stem: '___ caught a ___.' }).join()).toMatch(/blank/);
    expect(problems({ stem: 'She caught a _____.' }).join()).toMatch(/blank/);
  });

  it('options must be unique after stripping labels, and the answer must appear exactly once', () => {
    expect(problems({ distractors: [{ text: 'cough' }, { text: 'Cough' }, { text: 'dizzy' }] }).join()).toMatch(/duplicate/);
    expect(problems({ distractors: [{ text: 'cold' }, { text: 'cough' }, { text: 'dizzy' }] }).join()).toMatch(/duplicate|answer/);
    expect(problems({ distractors: [{ text: '(a) cough' }, { text: 'dizzy' }] }).join()).toMatch(/label/);
  });

  it('needs at least two distractors', () => {
    expect(problems({ distractors: [{ text: 'cough' }] }).join()).toMatch(/distractor/);
  });

  it('distractors must not overlap alsoFits', () => {
    expect(problems({ alsoFits: ['dizzy'] }).join()).toMatch(/alsoFits/);
    expect(problems({ alsoFits: ['sick'] })).toEqual([]);
  });

  it('English parts must not contain Chinese; explanation must be Chinese', () => {
    expect(problems({ stem: '她 caught a ___.' }).join()).toMatch(/Chinese|CJK/);
    expect(problems({ distractors: [{ text: '咳嗽' }, { text: 'dizzy' }] }).join()).toMatch(/Chinese|CJK/);
    expect(problems({ explanation: 'It is a collocation.' }).join()).toMatch(/explanation/);
  });

  it('blank must not be glued to letters (avoids "_____ing")', () => {
    expect(problems({ stem: 'She was ___ing all night.' }).join()).toMatch(/glued/);
  });

  it('targetWords must exist in the vocab list and be normalized', () => {
    expect(problems({ targetWords: ['coldd'] }).join()).toMatch(/targetWords/);
    expect(problems({ targetWords: ['Cold'] }).join()).toMatch(/targetWords/);
    expect(problems({ targetWords: ['traffic jam'] })).toEqual([]);
  });

  it('skillIds and confusionSetId must be registered', () => {
    expect(problems({ skillIds: ['X.nope'] }).join()).toMatch(/skill/);
    expect(problems({ skillIds: [] }).join()).toMatch(/skill/);
    expect(problems({ confusionSetId: 'cs.nope' }).join()).toMatch(/confusion/);
  });

  it('id format and difficulty are checked', () => {
    expect(problems({ id: 'no-version' }).join()).toMatch(/id/);
    expect(problems({ difficulty: 4 as DrillItem['difficulty'] }).join()).toMatch(/difficulty/);
  });
});

describe('validateDrillBank 題庫驗證', () => {
  it('ids must be unique across the bank', () => {
    expect(validateDrillBank([good, { ...good }]).join()).toMatch(/duplicate id/);
  });

  it('every confusion-set word needs >= 2 items with different clues', () => {
    const one = validateDrillBank([good]).join();
    expect(one).toMatch(/cs\.health.*sick/);

    const items: DrillItem[] = [];
    for (const w of ALL_CONFUSION_SETS[0].words) {
      const others = ALL_CONFUSION_SETS[0].words.filter((x) => x !== w).slice(0, 3);
      const mk = (n: number, clue: DrillItem['clue']): DrillItem => ({
        ...good,
        id: `${w.replace(/\s/g, '_')}#v${n}`,
        stem: `Sentence ${n} about ___.`,
        answer: w,
        distractors: others.map((text) => ({ text })),
        targetWords: [w],
        clue,
      });
      items.push(mk(1, 'noun'), mk(2, 'collocation'));
    }
    expect(validateDrillBank(items)).toEqual([]);

    const sameClue = items.map((i) => ({ ...i, clue: 'noun' as const }));
    expect(validateDrillBank(sameClue).join()).toMatch(/clue/);
  });
});

describe('ALL_DRILLS 實際題庫', () => {
  it('every item passes single-item validation', () => {
    for (const item of ALL_DRILLS) {
      expect(validateDrillItem(item), item.id).toEqual([]);
    }
  });

  it('the bank as a whole passes validation', () => {
    expect(ALL_DRILLS.length).toBeGreaterThan(0);
    expect(validateDrillBank(ALL_DRILLS)).toEqual([]);
  });

  it('every seedMistakeId points at a real mistake record', () => {
    const ids = new Set(ALL_MISTAKES.map((m) => m.id));
    for (const item of ALL_DRILLS) {
      if (item.seedMistakeId) expect(ids.has(item.seedMistakeId), item.id).toBe(true);
    }
  });

  it('every skill tag on a mistake record is registered', () => {
    for (const m of ALL_MISTAKES) {
      for (const s of m.skills ?? []) expect(getSkill(s), `${m.id}: ${s}`).toBeDefined();
    }
  });

  it('every word that is flagged needsContext has at least 2 sentence items to clear it', () => {
    for (const seed of SEED_WORD_MISTAKES) {
      for (const word of seed.words) {
        const n = ALL_DRILLS.filter((i) => i.targetWords?.includes(word)).length;
        expect(n, `${seed.id}: ${word}`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('keeps a reasonable size: at least 15 grammar items and 16 word items, and no runaway growth', () => {
    const vocab = ALL_DRILLS.filter((i) => i.targetWords && i.targetWords.length > 0);
    expect(ALL_DRILLS.length - vocab.length).toBeGreaterThanOrEqual(15);
    expect(ALL_DRILLS.length - vocab.length).toBeLessThanOrEqual(200);
    expect(vocab.length).toBeGreaterThanOrEqual(16);
    expect(vocab.length).toBeLessThanOrEqual(60);
  });
});
