import { beforeEach, describe, expect, it } from 'vitest';
import {
  getRemainingDrill,
  getRoundDrill,
  getRoundsAfterCurrent,
  getTodayDrill,
  isGraduated,
  loadSkillProgress,
  MAX_PER_SKILL,
  MAX_PER_DAY,
  ROUND_SIZE,
  presentOptions,
  recordDrillAnswer,
} from '../mistakeBook/drillProgress';
import { DrillItem } from '../mistakeBook/drills/types';
import { MistakeRecord } from '../mistakeBook/types';
import { DAY, fixedDeps, seededRng, T0 } from './helpers';

const day = (n: number) => fixedDeps({ now: T0 + n * DAY });

function mk(id: string, skill: string, over: Partial<DrillItem> = {}): DrillItem {
  return {
    id: `${id}#v1`,
    skillIds: [skill],
    kind: 'mc',
    stem: 'She ___ to school.',
    answer: 'goes',
    distractors: [{ text: 'go' }, { text: 'going' }, { text: 'gone' }],
    difficulty: 1,
    variation: ['subject'],
    explanation: '第三人稱單數動詞要加 -es。',
    ...over,
  };
}

const G_SKILLS = ['G.SVA.I_you_base', 'G.SVA.plural_subject', 'G.SVA.compound_subject', 'G.SVA.third_person_s', 'G.NEG.dont_doesnt'];
const V_SKILLS = ['V.COLLOC', 'V.CONFUSE', 'V.POS_SLOT', 'V.POLYSEMY'];

function bigBank(): DrillItem[] {
  const items: DrillItem[] = [];
  for (const s of [...G_SKILLS, ...V_SKILLS]) {
    for (let n = 1; n <= 4; n++) items.push(mk(`${s}-${n}`, s));
  }
  return items;
}

beforeEach(() => {
  localStorage.clear();
});

describe('getTodayDrill 每日出題', () => {
  it('returns at most 10 items, at most 4 per skill, with no duplicates', () => {
    const plan = getTodayDrill(day(0), bigBank());
    expect(plan.length).toBe(MAX_PER_DAY);
    expect(new Set(plan.map((i) => i.id)).size).toBe(plan.length);
    const perSkill = new Map<string, number>();
    for (const i of plan) perSkill.set(i.skillIds[0], (perSkill.get(i.skillIds[0]) ?? 0) + 1);
    for (const n of perSkill.values()) expect(n).toBeLessThanOrEqual(MAX_PER_SKILL);
  });

  it('mixes grammar and vocabulary skills on the first day', () => {
    const plan = getTodayDrill(day(0), bigBank());
    expect(plan.some((i) => i.skillIds[0].startsWith('G.'))).toBe(true);
    expect(plan.some((i) => i.skillIds[0].startsWith('V.'))).toBe(true);
  });

  it('caches the plan for the day and rebuilds it the next day', () => {
    const bank = bigBank();
    const first = getTodayDrill(day(0), bank);
    const a = first.map((i) => i.id);
    recordDrillAnswer(first[0], 'wrong', 3000, day(0)); // state changes, today's plan must not
    const b = getTodayDrill(day(0), bank).map((i) => i.id);
    expect(b).toEqual(a);
    const c = getTodayDrill(day(1), bank).map((i) => i.id);
    expect(c).not.toEqual(a);
  });

  it('prefers items not seen before within a skill', () => {
    const bank = [mk('a-1', 'G.SVA.I_you_base'), mk('a-2', 'G.SVA.I_you_base'), mk('a-3', 'G.SVA.I_you_base')];
    const d0 = getTodayDrill(day(0), bank);
    recordDrillAnswer(d0[0], d0[0].answer, 3000, day(0));
    const d1 = getTodayDrill(day(1), bank);
    expect(d1[0].id).not.toBe(d0[0].id);
  });

  it('skips a skill that is not due yet and brings it back when it is', () => {
    const bank = [mk('a-1', 'G.SVA.I_you_base'), mk('a-2', 'G.SVA.I_you_base'), mk('b-1', 'V.COLLOC'), mk('b-2', 'V.COLLOC')];
    // Push G.SVA.I_you_base to box 3 over three days (due +7d); V.COLLOC stays new.
    for (let n = 0; n < 3; n++) {
      const it = bank[n % 2];
      recordDrillAnswer(it, it.answer, 3000, day(n));
    }
    const plan = getTodayDrill(day(3), bank);
    expect(plan.every((i) => i.skillIds[0] === 'V.COLLOC')).toBe(true);
    const later = getTodayDrill(day(11), bank);
    expect(later.some((i) => i.skillIds[0] === 'G.SVA.I_you_base')).toBe(true);
  });

  it('after a wrong answer, the skill returns the next day at an easier difficulty', () => {
    const bank = [
      mk('a-hard', 'G.NEG.dont_doesnt', { difficulty: 3 }),
      mk('a-mid', 'G.NEG.dont_doesnt', { difficulty: 2 }),
      mk('a-easy', 'G.NEG.dont_doesnt', { difficulty: 1 }),
    ];
    // first attempt is the hard one, answered wrong
    recordDrillAnswer(bank[0], 'wrong', 3000, day(0));
    const next = getTodayDrill(day(1), bank);
    expect(next[0].difficulty).toBeLessThan(3);
    expect(next[0].id).not.toBe(bank[0].id);
  });
});

describe('recordDrillAnswer 作答紀錄', () => {
  it('updates every skill key and the confusion set, and reports correctness', () => {
    const it = mk('c-1', 'V.CONFUSE', { skillIds: ['V.CONFUSE', 'V.COLLOC'], confusionSetId: 'cs.health', answer: 'cold' });
    const right = recordDrillAnswer(it, ' Cold ', 2500, day(0));
    expect(right.correct).toBe(true);
    const prog = loadSkillProgress();
    expect(Object.keys(prog).sort()).toEqual(['V.COLLOC', 'V.CONFUSE', 'cs.health']);
    expect(prog['cs.health'].boxLevel).toBe(1);
    expect(prog['V.CONFUSE'].recent[0]).toMatchObject({ itemId: it.id, correct: true, ms: 2500 });
  });

  it('records the picked distractor and resets the box on a wrong answer', () => {
    const it = mk('c-2', 'G.SVA.plural_subject', { answer: 'visit' });
    recordDrillAnswer(it, 'visit', 3000, day(0));
    recordDrillAnswer(it, 'visits', 3000, day(1));
    const p = loadSkillProgress()['G.SVA.plural_subject'];
    expect(p.boxLevel).toBe(1);
    expect(p.consecutiveCorrectDays).toBe(0);
    expect(p.recent[p.recent.length - 1]).toMatchObject({ correct: false, picked: 'visits' });
  });

  it('same-day wrong-then-right does not promote the skill', () => {
    const it = mk('c-3', 'G.SVA.third_person_s', { answer: 'eats' });
    recordDrillAnswer(it, 'eat', 3000, day(0));
    recordDrillAnswer(it, 'eats', 3000, day(0));
    expect(loadSkillProgress()['G.SVA.third_person_s'].boxLevel).toBe(1);
  });

  it('keeps only the 10 most recent attempts', () => {
    const it = mk('c-4', 'V.POLYSEMY', { answer: 'still' });
    for (let n = 0; n < 14; n++) recordDrillAnswer(it, 'still', 3000, day(n));
    expect(loadSkillProgress()['V.POLYSEMY'].recent.length).toBe(10);
  });

  it('marks the item answered in today\'s plan, so getRemainingDrill shrinks', () => {
    const bank = bigBank();
    const plan = getTodayDrill(day(0), bank);
    expect(getRemainingDrill(day(0), bank).length).toBe(plan.length);
    recordDrillAnswer(plan[0], plan[0].answer, 3000, day(0));
    const left = getRemainingDrill(day(0), bank);
    expect(left.length).toBe(plan.length - 1);
    expect(left.map((i) => i.id)).not.toContain(plan[0].id);
  });
});

describe('isGraduated 畢業判定', () => {
  const answerOn = (it: DrillItem, n: number, ok = true) => recordDrillAnswer(it, ok ? it.answer : 'wrong', 3000, day(n));
  const progress = () => loadSkillProgress()['G.PS.short_answer'];

  it('3 different days, 3 different items, all correct → graduated', () => {
    const items = [1, 2, 3].map((n) => mk(`g-${n}`, 'G.PS.short_answer'));
    answerOn(items[0], 0);
    answerOn(items[1], 1);
    expect(isGraduated(progress())).toBe(false);
    answerOn(items[2], 2);
    expect(isGraduated(progress())).toBe(true);
  });

  it('the same item three times does not graduate the skill', () => {
    const it = mk('g-1', 'G.PS.short_answer');
    answerOn(it, 0);
    answerOn(it, 1);
    answerOn(it, 2);
    expect(isGraduated(progress())).toBe(false);
  });

  it('a wrong answer in the middle breaks the streak', () => {
    const items = [1, 2, 3, 4].map((n) => mk(`g-${n}`, 'G.PS.short_answer'));
    answerOn(items[0], 0);
    answerOn(items[1], 1, false);
    answerOn(items[2], 2);
    answerOn(items[3], 3);
    expect(isGraduated(progress())).toBe(false);
  });

  it('same-day repeats do not count as separate days', () => {
    const items = [1, 2, 3].map((n) => mk(`g-${n}`, 'G.PS.short_answer'));
    answerOn(items[0], 0);
    answerOn(items[1], 0);
    answerOn(items[2], 0);
    expect(isGraduated(progress())).toBe(false);
  });

  it('undefined progress is not graduated', () => {
    expect(isGraduated(undefined)).toBe(false);
  });
});

describe('presentOptions 選項打亂', () => {
  it('contains exactly the answer plus the distractors, in a seed-dependent order', () => {
    const it = mk('p-1', 'G.SVA.I_you_base');
    const a = presentOptions(it, seededRng(1));
    const b = presentOptions(it, seededRng(2));
    const expected = ['goes', 'go', 'going', 'gone'].sort();
    expect([...a].sort()).toEqual(expected);
    expect([...b].sort()).toEqual(expected);
    expect(presentOptions(it, seededRng(1))).toEqual(a);
  });
});

describe('brand-new skills are scheduled by how often the child got them wrong', () => {
  beforeEach(() => localStorage.clear());

  it('on day 1 the most-missed vocab skill and a verb-form skill are both in the plan', async () => {
    const { ALL_DRILLS } = await import('../mistakeBook/drills');
    const { ALL_MISTAKES } = await import('../mistakeBook');
    const count = new Map<string, number>();
    for (const m of ALL_MISTAKES) for (const s of m.skills ?? []) count.set(s, (count.get(s) ?? 0) + 1);
    const drilled = [...new Set(ALL_DRILLS.map((d) => d.skillIds[0]))];
    const topVocab = drilled.filter((s) => s.startsWith('V.')).sort((a, b) => (count.get(b) ?? 0) - (count.get(a) ?? 0))[0];

    const plan = getTodayDrill(day(0), ALL_DRILLS).map((i) => i.skillIds[0]);
    expect(plan).toContain(topVocab);
    expect(plan.some((s) => /^G\.(SVA|PS|NEG|PROG|MODAL)\./.test(s))).toBe(true);
    expect(plan.length).toBe(MAX_PER_DAY);
  });
});


const fakeMistake = (skill: string, examDate: string): MistakeRecord =>
  ({ id: skill + examDate + Math.random(), examDate, skills: [skill] }) as unknown as MistakeRecord;

describe('weighted slots', () => {
  beforeEach(() => localStorage.clear());

  it('gives a skill with many recent mistakes more slots than the others', () => {
    const mistakes = Array.from({ length: 12 }, () => fakeMistake('G.NEG.dont_doesnt', '2026-03-01'));
    const plan = getTodayDrill(day(0), bigBank(), mistakes).map((i) => i.skillIds[0]);
    const n = (s: string) => plan.filter((x) => x === s).length;
    expect(n('G.NEG.dont_doesnt')).toBeGreaterThan(n('G.SVA.I_you_base'));
    expect(n('G.NEG.dont_doesnt')).toBeLessThanOrEqual(MAX_PER_SKILL);
  });

  it('weights a recent mistake above an old one', () => {
    const recent = [fakeMistake('V.COLLOC', '2026-03-01'), fakeMistake('V.COLLOC', '2026-03-01')];
    const old = [fakeMistake('V.CONFUSE', '2025-01-01'), fakeMistake('V.CONFUSE', '2025-01-01')];
    const plan = getTodayDrill(day(0), bigBank(), [...recent, ...old]).map((i) => i.skillIds[0]);
    const n = (s: string) => plan.filter((x) => x === s).length;
    expect(n('V.COLLOC')).toBeGreaterThanOrEqual(n('V.CONFUSE'));
  });
});

describe('原題重考 ordering', () => {
  beforeEach(() => localStorage.clear());

  it('shows an unseen retest item before the made-up variations of the same skill', () => {
    const bank = [
      mk('v-1', 'G.SVA.I_you_base', { difficulty: 1 }),
      mk('v-2', 'G.SVA.I_you_base', { difficulty: 1 }),
      { ...mk('retest.x', 'G.SVA.I_you_base', { difficulty: 3 }), id: 'retest.x#v0' },
    ];
    const plan = getTodayDrill(day(0), bank, []);
    expect(plan[0].id).toBe('retest.x#v0');
  });
});

describe('group quotas', () => {
  beforeEach(() => localStorage.clear());

  it('spreads a group quota over distinct skills before a heavy skill takes a second slot', () => {
    const bank = [
      ...['M.SPELL.careful_copy', 'M.COMBINE.missing_words'].flatMap((s) => [mk(s + '-1', s), mk(s + '-2', s)]),
      ...bigBank(),
    ];
    const heavy = Array.from({ length: 30 }, () => fakeMistake('M.SPELL.careful_copy', '2026-03-01'));
    const plan = getTodayDrill(day(0), bank, [...heavy, fakeMistake('M.COMBINE.missing_words', '2026-03-01')]).map((i) => i.skillIds[0]);
    expect(plan).toContain('M.COMBINE.missing_words');
    expect(plan).toContain('M.SPELL.careful_copy');
  });
});

describe('rounds of five', () => {
  beforeEach(() => localStorage.clear());

  it('shows round 1 first, and round 2 only after round 1 is answered', () => {
    const bank = bigBank();
    const plan = getTodayDrill(day(0), bank);
    expect(plan.length).toBe(MAX_PER_DAY);
    const r1 = getRoundDrill(day(0), bank);
    expect(r1.map((i) => i.id)).toEqual(plan.slice(0, ROUND_SIZE).map((i) => i.id));
    expect(getRoundsAfterCurrent(day(0), bank)).toBe(1);
    for (const it of r1) recordDrillAnswer(it, it.answer, 3000, day(0));
    const r2 = getRoundDrill(day(0), bank);
    expect(r2.map((i) => i.id)).toEqual(plan.slice(ROUND_SIZE).map((i) => i.id));
    expect(getRoundsAfterCurrent(day(0), bank)).toBe(0);
    for (const it of r2) recordDrillAnswer(it, it.answer, 3000, day(0));
    expect(getRoundDrill(day(0), bank)).toEqual([]);
  });

  it('resumes the unfinished part of a round', () => {
    const bank = bigBank();
    const r1 = getRoundDrill(day(0), bank);
    recordDrillAnswer(r1[0], r1[0].answer, 3000, day(0));
    recordDrillAnswer(r1[1], r1[1].answer, 3000, day(0));
    const left = getRoundDrill(day(0), bank);
    expect(left.length).toBe(ROUND_SIZE - 2);
    expect(getRoundsAfterCurrent(day(0), bank)).toBe(1);
  });
});

describe('a practised skill that goes wrong again on a later exam', () => {
  beforeEach(() => localStorage.clear());
  const bank = () => [mk('a-1', 'G.SVA.I_you_base'), mk('a-2', 'G.SVA.I_you_base'), mk('b-1', 'V.COLLOC'), mk('b-2', 'V.COLLOC')];

  function practiseToBox3(items: DrillItem[]) {
    for (let n = 0; n < 3; n++) {
      const it = items[n % 2];
      recordDrillAnswer(it, it.answer, 3000, day(n));
    }
  }

  it('comes back at once when the exam date is after its last practice', () => {
    const items = bank();
    practiseToBox3(items); // last attempt on day(2); due again about a week later
    const later = [fakeMistake('G.SVA.I_you_base', '2026-03-05')]; // today is 03-05, last practice 03-04
    const plan = getTodayDrill(day(3), items, later).map((i) => i.skillIds[0]);
    expect(plan).toContain('G.SVA.I_you_base');
  });

  it('does not come back for an exam dated after today', () => {
    const items = bank();
    practiseToBox3(items);
    const future = [fakeMistake('G.SVA.I_you_base', '2026-03-20')];
    const plan = getTodayDrill(day(3), items, future).map((i) => i.skillIds[0]);
    expect(plan.every((s) => s === 'V.COLLOC')).toBe(true);
  });

  it('does not come back for an exam dated before its last practice', () => {
    const items = bank();
    practiseToBox3(items);
    const old = [fakeMistake('G.SVA.I_you_base', '2026-03-01')];
    const plan = getTodayDrill(day(3), items, old).map((i) => i.skillIds[0]);
    expect(plan.every((s) => s === 'V.COLLOC')).toBe(true);
  });
});
