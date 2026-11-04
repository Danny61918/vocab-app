import { beforeEach, describe, expect, it } from 'vitest';
import {
  answerDrill,
  applyDrillToVocab,
  applySeedWordMistakes,
  getConfusionPairs,
  getPlannedTargetWords,
  idsForWord,
} from '../mistakeBook/vocabLink';
import { getDailyHuntWords, loadMasteryData, saveMasteryData, updateWordMastery } from '../srsStorage';
import { BOX_INTERVALS } from '../leitner';
import { loadSkillProgress } from '../mistakeBook/drillProgress';
import { DrillItem } from '../mistakeBook/drills/types';
import { DAY, fixedDeps, seededRng, T0 } from './helpers';

const day = (n: number) => fixedDeps({ now: T0 + n * DAY });

function health(word: string, over: Partial<DrillItem> = {}): DrillItem {
  return {
    id: `${word}-1#v1`,
    skillIds: ['V.CONFUSE'],
    confusionSetId: 'cs.health',
    kind: 'mc',
    stem: 'I have a ___.',
    answer: word,
    distractors: [{ text: 'dizzy' }, { text: 'sick' }, { text: 'headache' }],
    targetWords: [word],
    clue: 'noun',
    difficulty: 1,
    variation: ['context'],
    explanation: '看句意選字。',
    ...over,
  };
}

beforeEach(() => {
  localStorage.clear();
});

describe('idsForWord 單字連動', () => {
  it('returns every vocab id for the same word, phrases included', () => {
    expect(idsForWord('traffic jam').sort()).toEqual(['s1105', 's452']);
    expect(idsForWord('  Traffic Jam ').sort()).toEqual(['s1105', 's452']);
  });
  it('returns [] for unknown words', () => {
    expect(idsForWord('zzzz')).toEqual([]);
  });
});

describe('applySeedWordMistakes 把考卷上錯的字降箱', () => {
  const seeds = [{ id: 'exam-1', words: ['traffic jam', 'cold'] }];

  it('demotes every id of each word to box 1 and flags needsContext', () => {
    applySeedWordMistakes(day(0), seeds);
    const m = loadMasteryData();
    for (const id of [...idsForWord('traffic jam'), ...idsForWord('cold')]) {
      expect(m[id].boxLevel).toBe(1);
      expect(m[id].needsContext).toBe(true);
    }
  });

  it('is applied once per seed: a second call changes nothing', () => {
    expect(applySeedWordMistakes(day(0), seeds)).toBe(1);
    const before = JSON.stringify(loadMasteryData());
    expect(applySeedWordMistakes(day(5), seeds)).toBe(0);
    expect(JSON.stringify(loadMasteryData())).toBe(before);
  });
});

describe('needsContext 規則', () => {
  const id = () => idsForWord('cough')[0];
  const seeds = [{ id: 'exam-1', words: ['cough'] }];

  it('a correct recognition answer does not promote a needsContext word', () => {
    applySeedWordMistakes(day(0), seeds);
    updateWordMastery(id(), true, day(1)); // default source = recognition
    updateWordMastery(id(), true, day(2));
    expect(loadMasteryData()[id()].boxLevel).toBe(1);
    expect(loadMasteryData()[id()].needsContext).toBe(true);
  });

  it('correct sentence answers on 2 different days clear the flag and promote', () => {
    applySeedWordMistakes(day(0), seeds);
    updateWordMastery(id(), true, day(1), 'context');
    expect(loadMasteryData()[id()].needsContext).toBe(true);
    updateWordMastery(id(), true, day(1), 'context'); // same day: not a second count
    expect(loadMasteryData()[id()].needsContext).toBe(true);
    updateWordMastery(id(), true, day(2), 'context');
    const m = loadMasteryData()[id()];
    expect(m.needsContext).toBeFalsy();
    expect(m.boxLevel).toBe(3);
    expect(m.dueDate - (T0 + 2 * DAY)).toBe(BOX_INTERVALS[3] * DAY);
    // once cleared, recognition answers promote normally again
    updateWordMastery(id(), true, day(10));
    expect(loadMasteryData()[id()].boxLevel).toBe(4);
  });

  it('a wrong answer resets the cross-day count', () => {
    applySeedWordMistakes(day(0), seeds);
    updateWordMastery(id(), true, day(1), 'context');
    updateWordMastery(id(), false, day(2), 'context');
    updateWordMastery(id(), true, day(3), 'context');
    expect(loadMasteryData()[id()].needsContext).toBe(true);
    updateWordMastery(id(), true, day(4), 'context');
    expect(loadMasteryData()[id()].needsContext).toBeFalsy();
  });

  it('wrong then right on the same day does not count toward clearing', () => {
    applySeedWordMistakes(day(0), seeds);
    updateWordMastery(id(), false, day(1), 'context');
    updateWordMastery(id(), true, day(1), 'context');
    updateWordMastery(id(), true, day(2), 'context');
    expect(loadMasteryData()[id()].needsContext).toBe(true);
  });

  it('words without the flag behave exactly as before', () => {
    const w = idsForWord('sick')[0];
    updateWordMastery(w, true, day(0));
    updateWordMastery(w, true, day(1));
    expect(loadMasteryData()[w].boxLevel).toBe(2);
  });
});

describe('applyDrillToVocab / answerDrill 作答連動', () => {
  it('a correct sentence answer promotes every id of the target word', () => {
    applyDrillToVocab(health('traffic jam'), true, day(0));
    const m = loadMasteryData();
    for (const id of idsForWord('traffic jam')) expect(m[id].boxLevel).toBe(1);
  });

  it('a wrong answer demotes the answer word but not the distractor words', () => {
    const cold = idsForWord('cold')[0];
    const sick = idsForWord('sick')[0];
    updateWordMastery(cold, true, day(0));
    updateWordMastery(cold, true, day(1));
    updateWordMastery(sick, true, day(0));
    updateWordMastery(sick, true, day(1));
    answerDrill(health('cold'), 'sick', 2000, day(2));
    expect(loadMasteryData()[cold].boxLevel).toBe(1);
    expect(loadMasteryData()[sick].boxLevel).toBe(2);
  });

  it('records skill progress too, and exposes the confusion pair (answer vs picked)', () => {
    const item = health('cold');
    answerDrill(item, 'sick', 2000, day(0));
    answerDrill(item, 'sick', 2000, day(1));
    answerDrill(item, 'cold', 2000, day(2));
    expect(loadSkillProgress()['cs.health'].recent.length).toBe(3);
    const pairs = getConfusionPairs([item]);
    expect(pairs).toEqual([{ answer: 'cold', picked: 'sick', count: 2 }]);
  });

  it('grammar items (no targetWords) leave vocabulary untouched', () => {
    const grammar = health('cold', { skillIds: ['G.SVA.plural_subject'], confusionSetId: undefined, targetWords: undefined });
    answerDrill(grammar, 'wrong', 2000, day(0));
    expect(loadMasteryData()).toEqual({});
  });
});

describe('每日單字複習排除當天錯題練習的字', () => {
  it('getPlannedTargetWords lists the words in today\'s drill plan', () => {
    const bank = [health('cold'), health('cough')];
    expect([...getPlannedTargetWords(day(0), bank)].sort()).toEqual(['cold', 'cough']);
  });

  it('getDailyHuntWords skips excluded words even when they are due', () => {
    const coldIds = idsForWord('cold');
    const mastery: Record<string, any> = {};
    for (const id of coldIds) {
      mastery[id] = { wordId: id, boxLevel: 1, intervalDays: 1, dueDate: T0 - DAY, consecutiveCorrectDays: 0 };
    }
    saveMasteryData(mastery);
    const normal = getDailyHuntWords({ ...fixedDeps({ now: T0, rng: seededRng(1) }) });
    expect(normal.map((w) => w.id)).toContain(coldIds[0]);
    const excluded = getDailyHuntWords({ ...fixedDeps({ now: T0, rng: seededRng(1) }), excludeWords: new Set(['cold']) });
    for (const w of excluded) expect(w.word.toLowerCase()).not.toBe('cold');
  });
});
