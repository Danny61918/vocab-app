import { describe, expect, it } from 'vitest';
import { getAllSentences, tryCreateCloze } from '../exampleLookup';

describe('tryCreateCloze 單字邊界', () => {
  it('does not match a word inside a longer word (no "_____ing")', () => {
    expect(tryCreateCloze('I was coughing at midnight.', 'cough')?.blankedSentence).toBe('I was _____ at midnight.');
    expect(tryCreateCloze('The teacher scolded him.', 'cold')).toBeNull();
  });

  it('still blanks exact words and phrases, keeping the text before them', () => {
    expect(tryCreateCloze('She caught a cold.', 'cold')?.blankedSentence).toBe('She caught a _____.');
    expect(tryCreateCloze('Cold water is nice.', 'cold')?.blankedSentence).toBe('_____ water is nice.');
    expect(tryCreateCloze('I have a sore throat today.', 'sore throat')?.blankedSentence).toBe('I have a _____ today.');
  });

  it('blanks the whole inflected word, phrases and "(s)" entries included', () => {
    expect(tryCreateCloze('She wore pink in-line skates.', 'in-line skate')?.blankedSentence).toBe('She wore pink _____.');
    expect(tryCreateCloze('Walk down the steps slowly.', 'step(s)')?.blankedSentence).toBe('Walk down the _____ slowly.');
    expect(tryCreateCloze('We watched raindrops race.', 'raindrop(s)')?.blankedSentence).toBe('We watched _____ race.');
    expect(tryCreateCloze('He hates the smell.', 'hate')?.blankedSentence).toBe('He _____ the smell.');
  });

  it('still handles plurals and inflections through the prefix rule', () => {
    expect(tryCreateCloze('The knights ride horses.', 'knight')?.blankedSentence).toBe('The _____ ride horses.');
    expect(tryCreateCloze('He is juggling balls.', 'juggle')).toBeNull(); // "juggle" is not a prefix of "juggling"; unchanged behaviour
  });
});

describe('健康字例句', () => {
  const words = ['cold', 'cough', 'sick', 'stomachache', 'sore throat', 'dizzy', 'headache'];

  it('each health word has at least 2 usable cloze sentences where the word appears exactly once', () => {
    for (const w of words) {
      const usable = getAllSentences(w).filter((s) => {
        const c = tryCreateCloze(s, w);
        if (!c) return false;
        // the answer must not leak: the blanked sentence no longer contains the word itself
        return !new RegExp(`(^|[^A-Za-z])${w}(?![A-Za-z])`, 'i').test(c.blankedSentence);
      });
      expect(usable.length, w).toBeGreaterThanOrEqual(2);
    }
  });
});
