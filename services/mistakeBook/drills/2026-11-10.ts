import { DrillItem } from './types';
import mistakes from '../data/2026-11-10';

// Practice items grown from the 2026-11-10 papers (data/2026-11-10.ts; seeds are looked up by array index, so
// that file's order must not change). The bulk of the grammar practice (Do/Does questions, -s forms, short
// answers, don't/doesn't) is generated into supp/genPresentSimple.ts; this file holds the hand-written items:
//   * the three "at ..." phrases (new confusion set cs.at_phrases) — at first / at last / at least;
//   * extra "cold" sentences (it was wrong again after the 2026-11-04 drills);
//   * spelling items for sore throat and cough (the paper errors were spelling, so the options are
//     correctly / incorrectly spelled forms of the same word);
//   * a few "help + base verb" items for grammar A Q2.
// Reading Q3 / Q4 are attention slips and deliberately have no drills (parent's choice).
// Every item was written so that exactly ONE option is acceptable.

const SEED = {
  helpBase: mistakes[0].id,   // A Q2   We always ___ our mom do the housework.
  doesShort: mistakes[1].id,  // A Q11  Does Rosa ___ shopping ...? No, she ___.
  soreThroat: mistakes[11].id, // A-1 #3
  coughs: mistakes[12].id,     // A-1 #7
  cold: mistakes[13].id,       // A-2 #2
  atLeast: mistakes[14].id,    // B #1
  atLast: mistakes[15].id,     // B #3
  atFirst: mistakes[16].id,    // B #4
};

const opt = (text: string, misconception?: string) => (misconception ? { text, misconception } : { text });

function phrase(
  word: 'at first' | 'at last' | 'at least',
  n: number,
  seed: string,
  clue: NonNullable<DrillItem['clue']>,
  stem: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3
): DrillItem {
  return {
    id: `${seed}#v${n}`,
    seedMistakeId: seed,
    skillIds: ['V.PHRASE'],
    confusionSetId: 'cs.at_phrases',
    kind: 'mc',
    stem,
    answer: word,
    distractors: distractors.map((d) => opt(d)),
    targetWords: [word],
    clue,
    difficulty,
    variation: ['context'],
    explanation,
  };
}

const atPhrases: DrillItem[] = [
  // ---- at first ＝ 起初（常和 but now / then 對照）----
  phrase('at first', 1, SEED.atFirst, 'meaning',
    '___, Mia was shy, but now she has many friends.', ['at last', 'at least'],
    'at first 是「起初、一開始」；後面用 but now 對照現在的情況，所以前面是一開始的樣子。', 1),
  phrase('at first', 2, SEED.atFirst, 'collocation',
    'I did not understand the game ___, but now I love it.', ['at last', 'at least'],
    '「at first …, but now …」是常見的對照用法：一開始不懂，現在喜歡。', 2),
  phrase('at first', 3, SEED.atFirst, 'meaning',
    'The water felt very cold ___. Then my body got used to it.', ['at last', 'at least'],
    '一開始水很冷，後來習慣了，所以填 at first（起初）。', 2),

  // ---- at last ＝ 終於、最後（等了很久之後）----
  phrase('at last', 1, SEED.atLast, 'meaning',
    'We waited for two hours, and the bus came ___.', ['at first', 'at least'],
    'at last 是「終於」：等了兩個小時之後，公車終於來了。', 1),
  phrase('at last', 2, SEED.atLast, 'collocation',
    'My mom was away for six months. She came home ___!', ['at first', 'at least'],
    '離開了六個月，媽媽「終於」回家了，用 at last；at first 是「起初」，at least 是「至少」，意思都不對。', 2),
  phrase('at last', 3, SEED.atLast, 'meaning',
    'Summer vacation is here ___! I am so happy.', ['at first', 'at least'],
    '期待很久的暑假「終於」來了，用 at last。', 1),

  // ---- at least ＝ 至少（後面常接數量）----
  phrase('at least', 1, SEED.atLeast, 'collocation',
    'You should read ___ ten pages every day.', ['at first', 'at last'],
    'at least 是「至少」，後面常接數量：at least ten pages＝至少十頁。', 1),
  phrase('at least', 2, SEED.atLeast, 'meaning',
    'Bags in this shop cost ___ 500 dollars, so they are not cheap.', ['at first', 'at last'],
    '「至少要 500 元」所以不便宜；at least 表示最低的數量，後面常接數字。', 2),
  phrase('at least', 3, SEED.atLeast, 'meaning',
    'The trip to Tainan takes ___ three hours by car.', ['at first', 'at last'],
    'at least three hours 是「至少三個小時」，表示最少的時間。', 2),
];

// ---- cold: wrong again on 2026-11-10, so add sentences that are not the ones from 2026-11-04 ----
function cold(n: number, clue: NonNullable<DrillItem['clue']>, stem: string, explanation: string, difficulty: 1 | 2 | 3, alsoFits?: string[], wrong: string[] = ['sick', 'dizzy', 'stomachache']): DrillItem {
  return {
    id: `${SEED.cold}#v${n}`,
    seedMistakeId: SEED.cold,
    skillIds: ['V.CONFUSE'],
    confusionSetId: 'cs.health',
    kind: 'mc',
    stem,
    answer: 'cold',
    distractors: wrong.map((w) => opt(w)),
    alsoFits,
    targetWords: ['cold'],
    clue,
    difficulty,
    variation: ['context'],
    explanation,
  };
}

const coldItems: DrillItem[] = [
  cold(3, 'noun', 'Dad has a ___. He sneezes all day and needs a lot of tissues.',
    'a 後面要接名詞；打噴嚏、要很多衛生紙是感冒（a cold）。sick、dizzy 是形容詞，不能放在 a 後面；stomachache 是肚子痛，和打噴嚏無關。', 2, ['cough', 'sore throat', 'headache']),
  cold(4, 'collocation', 'Ben cannot go swimming today because he has a bad ___.',
    'have a bad cold 是「得了重感冒」；a bad 後面要接名詞，sick、dizzy 是形容詞，不能放在這裡。', 2, ['cough', 'headache', 'sore throat', 'stomachache'], ['sick', 'dizzy']),
];

// ---- Spelling: choose the correctly spelled form (the paper errors were spelling, not meaning) ----
function spell(
  word: string,
  n: number,
  seed: string,
  stem: string,
  answer: string,
  wrong: [string, string][],
  explanation: string,
  difficulty: 1 | 2 | 3
): DrillItem {
  return {
    id: `${seed}#v${n}`,
    seedMistakeId: seed,
    skillIds: ['M.SPELL.careful_copy'],
    kind: 'mc',
    stem,
    answer,
    distractors: wrong.map(([t, m]) => opt(t, m)),
    targetWords: [word],
    difficulty,
    variation: ['context'],
    explanation,
  };
}

const spelling: DrillItem[] = [
  spell('sore throat', 1, SEED.soreThroat, "My sister has a ___. She can't talk loudly today.", 'sore throat',
    [['sore throt', 'dropped_letters'], ['sore thraot', 'letter_order_swap'], ['sor throat', 'dropped_letters']],
    '喉嚨痛是 sore throat：sore（痛的）＋ throat（喉嚨）。throat 是 t-h-r-o-a-t，不要漏字母。', 1),
  spell('sore throat', 2, SEED.soreThroat, 'I drink warm water when I have a ___.', 'sore throat',
    [['sore throte', 'extra_letter'], ['sore thrat', 'dropped_letters'], ['sore throut', 'vowel_swap']],
    'sore throat 是喉嚨痛；寫的時候 throat 要拼完整：t-h-r-o-a-t。', 2),
  spell('cough', 1, SEED.coughs, 'Tim ___ a lot. His mom gives him some warm tea.', 'coughs',
    [['coghs', 'dropped_letters'], ['couhgs', 'letter_order_swap'], ['coughes', 'extra_letter']],
    'Tim 是一個人（he），動詞加 s：coughs。cough 的 gh 在後面，唸 f 的音：c-o-u-g-h。', 2),
  spell('cough', 2, SEED.coughs, 'The doctor says my ___ will go away soon.', 'cough',
    [['cogh', 'dropped_letters'], ['couhg', 'letter_order_swap'], ['cuogh', 'letter_order_swap']],
    '咳嗽是 cough：c-o-u-g-h。字尾 gh 要寫完整。', 2),
];

// ---- Grammar A Q2: help + base verb, plural subjects ----
const helpItems: DrillItem[] = [
  {
    id: `${SEED.helpBase}#v1`, seedMistakeId: SEED.helpBase, skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'Ben and I always ___ our dad wash the car on Sundays.', answer: 'help',
    distractors: [opt('helps', '3sg_s_on_plural'), opt('helping'), opt('is help', 'be_plus_base_verb')],
    difficulty: 1, variation: ['subject'], explanation: 'Ben and I 是兩個人，複數主詞，動詞用原形 help，不加 s。',
  },
  {
    id: `${SEED.helpBase}#v2`, seedMistakeId: SEED.helpBase, skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'My friends often ___ me with my homework.', answer: 'help',
    distractors: [opt('helps', '3sg_s_on_plural'), opt('helping'), opt('is help', 'be_plus_base_verb')],
    difficulty: 1, variation: ['subject'], explanation: 'My friends 是複數，現在簡單式動詞用原形 help。',
  },
  {
    id: `${SEED.helpBase}#v3`, seedMistakeId: SEED.helpBase, skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'My big sister always ___ me with my homework.', answer: 'helps',
    distractors: [opt('help', 'missing_3sg_s'), opt('helping'), opt('is help', 'be_plus_base_verb')],
    difficulty: 1, variation: ['subject'], explanation: 'My big sister 是一個人（she），第三人稱單數，動詞要加 s：helps。',
  },
];

const items: DrillItem[] = [...atPhrases, ...coldItems, ...spelling, ...helpItems];

export default items;
