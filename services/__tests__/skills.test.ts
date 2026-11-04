import { describe, expect, it } from 'vitest';
import { ALL_SKILLS, getSkill, SKILL_IDS } from '../mistakeBook/skills';
import { ALL_CONFUSION_SETS, getConfusionSet } from '../mistakeBook/confusionSets';
import { vocabData } from '../newVocabData';

describe('skills 技能表', () => {
  it('skill ids are unique', () => {
    expect(new Set(SKILL_IDS).size).toBe(SKILL_IDS.length);
  });

  it('every skill has a known domain, a label, and an id prefixed by its domain', () => {
    for (const s of ALL_SKILLS) {
      expect(['G', 'V', 'R', 'M', 'FMT']).toContain(s.domain);
      expect(s.label.trim().length).toBeGreaterThan(0);
      expect(s.id.startsWith(`${s.domain}.`)).toBe(true);
    }
  });

  it('getSkill finds registered ids and returns undefined for unknown ones', () => {
    expect(getSkill('G.SVA.plural_subject')?.domain).toBe('G');
    expect(getSkill('nope')).toBeUndefined();
  });
});

describe('confusionSets 易混字組', () => {
  it('ids are unique and each set has at least 2 words and a contrast note', () => {
    const ids = ALL_CONFUSION_SETS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of ALL_CONFUSION_SETS) {
      expect(c.words.length).toBeGreaterThanOrEqual(2);
      expect(c.contrastNote.trim().length).toBeGreaterThan(0);
    }
  });

  it('cs.health covers the words the child mixed up', () => {
    const health = getConfusionSet('cs.health');
    expect(health).toBeDefined();
    for (const w of ['cold', 'sick', 'cough', 'dizzy', 'headache', 'stomachache']) {
      expect(health!.words).toContain(w);
    }
  });

  it('words in a set are lower-case, trimmed, and exist in the vocab list', () => {
    const known = new Set(vocabData.map((v) => v.word.trim().toLowerCase()));
    for (const c of ALL_CONFUSION_SETS) {
      for (const w of c.words) {
        expect(w).toBe(w.trim().toLowerCase());
        expect(known.has(w), `${c.id}: "${w}" not in vocab`).toBe(true);
      }
    }
  });
});
