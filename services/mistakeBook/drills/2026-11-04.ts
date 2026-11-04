import { DrillItem } from './types';
import mistakes from '../data/2026-11-04';

// Practice items grown from the ten mistakes in data/2026-11-04.ts (seeds are looked up by array
// index, so that file's order must not change). Every item was written so that exactly ONE option
// is acceptable: distractors are either ungrammatical in the slot or contradict the sentence, and
// words that also fit (sick/dizzy, cold/cough …) are listed in alsoFits and never offered as options.
// The two ambiguous originals (page 1 Q1 "eat/don't eat", page 2 Q3 "sick/dizzy") are not reused.
//
// Id = `${seed mistake id}#v${n}`; health words that have no seed of their own use `cs.health:<word>#v${n}`.

const SEED = {
  iYouBase: mistakes[0].id,   // P1 Q1  I ___ vegetables
  plural: mistakes[1].id,     // P1 Q2  The children ___
  compound: mistakes[2].id,   // P1 Q3  Mark and I ___ tea or coffee
  doesQ: mistakes[3].id,      // P1 Q4  choose the correct sentence
  shortAns: mistakes[4].id,   // P1 Q9  Yes, he does.
  cold: mistakes[5].id,       // P2 Q1
  sick: mistakes[6].id,       // P2 Q3
  cough: mistakes[7].id,      // P2 Q6
  still: mistakes[8].id,      // P2 Q8
  trafficJam: mistakes[9].id, // P2 Q9
};

const opts = (...texts: string[]) => texts.map((text) => ({ text }));

const grammar: DrillItem[] = [
  // ---- I / you use the base verb ----
  {
    id: `${SEED.iYouBase}#v1`, seedMistakeId: SEED.iYouBase, skillIds: ['G.SVA.I_you_base'], kind: 'mc',
    stem: 'I ___ milk for breakfast every day.', answer: 'drink', distractors: opts('drinks', 'drinking', 'is drink'),
    difficulty: 1, variation: ['verb'], explanation: '主詞是 I，現在簡單式的動詞用原形 drink，不加 s。',
  },
  {
    id: `${SEED.iYouBase}#v2`, seedMistakeId: SEED.iYouBase, skillIds: ['G.SVA.I_you_base'], kind: 'mc',
    stem: 'You ___ your homework after dinner every evening.', answer: 'do', distractors: opts('does', 'doing', 'is do'),
    difficulty: 1, variation: ['subject'], explanation: '主詞是 you，動詞用原形 do；does 是給 he／she／it 用的。',
  },
  // ---- third person singular takes -s / -es ----
  {
    id: `${SEED.iYouBase}#v3`, seedMistakeId: SEED.iYouBase, skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'My grandmother ___ tea every afternoon.', answer: 'drinks', distractors: opts('drink', 'drinking', 'is drink'),
    difficulty: 1, variation: ['subject'], explanation: 'My grandmother 是第三人稱單數（she），動詞要加 s：drinks。',
  },
  {
    id: `${SEED.iYouBase}#v4`, seedMistakeId: SEED.iYouBase, skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'Ben ___ his bike to school every morning.', answer: 'rides', distractors: opts('ride', 'riding', 'is ride'),
    difficulty: 1, variation: ['subject', 'verb'], explanation: 'Ben 是一個人（he），動詞要加 s：rides。',
  },
  // ---- plural subjects (including children / women with no -s) use the base verb ----
  {
    id: `${SEED.plural}#v1`, seedMistakeId: SEED.plural, skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'The children ___ the zoo every summer.', answer: 'visit', distractors: opts('visits', 'visiting', 'is visit'),
    difficulty: 2, variation: ['verb'], explanation: 'children 是 child 的複數，雖然沒有 s，還是複數主詞，動詞用原形 visit。',
  },
  {
    id: `${SEED.plural}#v2`, seedMistakeId: SEED.plural, skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'My parents ___ breakfast at seven every morning.', answer: 'make', distractors: opts('makes', 'making', 'is make'),
    difficulty: 2, variation: ['subject'], explanation: 'parents 是複數（有 s），動詞用原形 make，不加 s。',
  },
  {
    id: `${SEED.plural}#v3`, seedMistakeId: SEED.plural, skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'The women ___ in the library every Saturday.', answer: 'work', distractors: opts('works', 'working', 'is work'),
    difficulty: 3, variation: ['subject'], explanation: 'women 是 woman 的不規則複數，沒有 s，但是複數主詞，動詞用原形 work。',
  },
  // ---- compound subject (A and B) is plural ----
  {
    id: `${SEED.compound}#v1`, seedMistakeId: SEED.compound, skillIds: ['G.SVA.compound_subject'], kind: 'mc',
    stem: 'Lily and I ___ the bus to school every day.', answer: 'take', distractors: opts('takes', 'taking', 'is take'),
    difficulty: 1, variation: ['subject'], explanation: 'Lily and I 是兩個人，當複數主詞，動詞用原形 take。',
  },
  {
    id: `${SEED.compound}#v2`, seedMistakeId: SEED.compound, skillIds: ['G.SVA.compound_subject'], kind: 'mc',
    stem: 'Dad and Mom ___ for a walk after dinner every day.', answer: 'go', distractors: opts('goes', 'going', 'is go'),
    difficulty: 2, variation: ['subject', 'verb'], explanation: 'Dad and Mom 是兩個人，複數主詞，動詞用原形 go。',
  },
  // ---- negatives: don't / doesn't + base verb ----
  {
    id: `${SEED.compound}#v3`, seedMistakeId: SEED.compound, skillIds: ['G.NEG.dont_doesnt', 'G.SVA.compound_subject'], kind: 'mc',
    stem: 'Anna and I like milk, but we ___ tea or coffee.', answer: "don't drink",
    distractors: opts("doesn't drink", 'not drink', "isn't drink"),
    difficulty: 2, variation: ['subject', 'polarity'],
    explanation: 'but 表示相反，所以是否定句；we 是複數，用 don\'t + 原形 drink。',
  },
  {
    id: `${SEED.compound}#v4`, seedMistakeId: SEED.compound, skillIds: ['G.NEG.dont_doesnt', 'G.SVA.third_person_s'], kind: 'mc',
    stem: 'My cat ___ fish. It only eats chicken.', answer: "doesn't eat",
    distractors: opts("don't eat", "doesn't eats", 'not eat'),
    difficulty: 2, variation: ['subject', 'polarity'],
    explanation: 'My cat 是第三人稱單數（it），否定用 doesn\'t；doesn\'t 後面的動詞用原形 eat，不加 s。',
  },
  // ---- does-questions: base verb after Does; Do / Does choice ----
  {
    id: `${SEED.doesQ}#v1`, seedMistakeId: SEED.doesQ, skillIds: ['G.PS.does_question_base'], kind: 'mc',
    stem: 'Does your sister ___ English every day?', answer: 'study', distractors: opts('studies', 'studying', 'studied'),
    difficulty: 1, variation: ['question'], explanation: 'Does 開頭的問句，動詞要用原形 study，Does 已經帶了 s。',
  },
  {
    id: `${SEED.doesQ}#v2`, seedMistakeId: SEED.doesQ, skillIds: ['G.PS.does_question_base', 'G.SVA.plural_subject'], kind: 'mc',
    stem: '___ your parents watch TV after dinner?', answer: 'Do', distractors: opts('Does', 'Is', 'Are'),
    difficulty: 2, variation: ['question', 'subject'], explanation: 'your parents 是複數，問句用 Do；Does 是給單數主詞用的。',
  },
  // ---- short answers repeat the helper verb ----
  {
    id: `${SEED.shortAns}#v1`, seedMistakeId: SEED.shortAns, skillIds: ['G.PS.short_answer'], kind: 'mc',
    stem: 'Does your mother cook dinner every day? Yes, she ___.', answer: 'does', distractors: opts('do', 'is', 'has'),
    difficulty: 1, variation: ['short_answer'], explanation: '問句用 Does，簡答也用 does：Yes, she does.',
  },
  {
    id: `${SEED.shortAns}#v2`, seedMistakeId: SEED.shortAns, skillIds: ['G.PS.short_answer'], kind: 'mc',
    stem: 'Do your friends play baseball? No, they ___.', answer: "don't", distractors: opts("doesn't", "aren't", "isn't"),
    difficulty: 2, variation: ['short_answer', 'polarity'], explanation: '問句用 Do，they 是複數，否定簡答是 No, they don\'t.',
  },
  // ---- "choose the correct sentence": check all four ----
  {
    id: `${SEED.doesQ}#v3`, seedMistakeId: SEED.doesQ, skillIds: ['FMT.choose_correct', 'G.PS.does_question_base'], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'Does your uncle work in a bank?',
    distractors: opts(
      'Do your uncle work in a bank?',
      'Does your uncle works in a bank?',
      'Your uncle work in a bank?'
    ),
    difficulty: 2, variation: ['question'], explanation: 'your uncle 是單數，問句用 Does，後面動詞用原形 work；其他三句各錯一處。',
  },
  {
    id: `${SEED.doesQ}#v4`, seedMistakeId: SEED.doesQ, skillIds: ['FMT.choose_correct', 'G.NEG.dont_doesnt', 'G.SVA.compound_subject'], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: "My brother and I don't like spicy food.",
    distractors: opts(
      "My brother and I doesn't like spicy food.",
      "My brother and I don't likes spicy food.",
      'My brother and I not like spicy food.'
    ),
    difficulty: 3, variation: ['subject', 'polarity'],
    explanation: 'My brother and I 是兩個人，用 don\'t；don\'t 後面動詞用原形 like；一定要逐句檢查。',
  },
];

// Health words: every word has two sentences with different clues. Options come from the same set
// (cs.health) where possible, but only words that cannot fit the slot (wrong part of speech or
// contradicting the sentence) are offered as options.
function health(
  word: string,
  n: number,
  seed: string | undefined,
  skillIds: string[],
  clue: NonNullable<DrillItem['clue']>,
  stem: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  alsoFits?: string[]
): DrillItem {
  return {
    id: `${seed ?? `cs.health:${word.replace(/\s+/g, '_')}`}#v${n}`,
    seedMistakeId: seed,
    skillIds,
    confusionSetId: 'cs.health',
    kind: 'mc',
    stem,
    answer: word,
    distractors: opts(...distractors),
    alsoFits,
    targetWords: [word],
    clue,
    difficulty,
    variation: ['context'],
    explanation,
  };
}

const healthItems: DrillItem[] = [
  health('cold', 1, SEED.cold, ['V.COLLOC', 'V.CONFUSE'], 'collocation',
    'Mia stayed home from school because she caught a ___.', ['sick', 'dizzy', 'stomachache'],
    'catch a cold 是「感冒」的固定說法；a 後面要接名詞，sick、dizzy 是形容詞，不能放在這裡。', 1),
  health('cold', 2, SEED.cold, ['V.CONFUSE'], 'meaning',
    'I have a runny nose and I keep sneezing. I think I have a ___.', ['sick', 'dizzy', 'stomachache'],
    '流鼻水、一直打噴嚏是感冒（a cold）的症狀；a 後面要接名詞。', 2, ['cough', 'sore throat', 'headache']),

  health('sick', 1, SEED.sick, ['V.POS_SLOT', 'V.CONFUSE'], 'adj',
    'Tom is ___ today, so he is staying in bed and taking medicine.', ['cough', 'headache', 'stomachache'],
    'is 後面接形容詞，sick 是「生病的」；cough、headache 是名詞，不能直接放在 is 後面。', 1, ['dizzy']),
  health('sick', 2, SEED.sick, ['V.COLLOC', 'V.CONFUSE'], 'collocation',
    'If you feel ___, tell your teacher and go to the nurse.', ['cough', 'headache', 'sore throat'],
    'feel 後面接形容詞，feel sick 是「覺得不舒服、想吐」；cough、headache、sore throat 是名詞，要說 have a headache、have a sore throat，不能放在 feel 後面。', 2, ['dizzy']),

  health('cough', 1, SEED.cough, ['V.POS_SLOT', 'V.CONFUSE'], 'verb',
    'Remember to cover your mouth when you sneeze or ___.', ['sick', 'dizzy', 'headache'],
    'sneeze or ___ 前後要同詞性，sneeze 是動詞，所以要選動詞 cough（咳嗽）。', 2),
  health('cough', 2, SEED.cough, ['V.CONFUSE'], 'noun',
    'Grandpa has a bad ___. He coughs all night and cannot sleep.', ['dizzy', 'sick', 'stomachache'],
    '整晚咳嗽，所以是 a bad cough（咳嗽）；a bad 後面接名詞。', 2, ['cold', 'sore throat']),

  health('dizzy', 1, undefined, ['V.POS_SLOT', 'V.CONFUSE'], 'adj',
    'After spinning around ten times, Leo felt ___ and sat down.', ['cough', 'headache', 'stomachache'],
    '轉圈圈之後覺得天旋地轉是 dizzy（頭暈的）；felt 後面接形容詞。', 1, ['sick']),
  health('dizzy', 2, undefined, ['V.CONFUSE'], 'meaning',
    'The room is spinning, so I need to sit down. I am ___.', ['cough', 'sore throat', 'stomachache'],
    '房間在轉是頭暈 dizzy；am 後面接形容詞。', 2, ['sick']),

  health('headache', 1, undefined, ['V.CONFUSE'], 'noun',
    'My head hurts a lot. I have a ___.', ['sick', 'dizzy', 'stomachache'],
    '頭痛是 headache（head + ache）；a 後面接名詞。', 1, ['cold']),
  health('headache', 2, undefined, ['V.CONFUSE'], 'meaning',
    "Lucy's head hurts, so she needs to rest. She has a bad ___.", ['sick', 'cough', 'stomachache'],
    '頭痛是 headache（head + ache）；a bad 後面接名詞。', 2, ['cold']),

  health('stomachache', 1, undefined, ['V.CONFUSE'], 'meaning',
    'Ben ate too much, and now his stomach hurts. He has a ___.', ['headache', 'sore throat', 'dizzy'],
    '肚子痛是 stomachache（stomach + ache）。', 1),
  health('stomachache', 2, undefined, ['V.CONFUSE'], 'noun',
    'Ben ate five hot dogs and felt pain in his belly. The doctor said it was a ___.', ['headache', 'cough', 'sick'],
    '吃太多、肚子痛，醫生說是 a stomachache；a 後面接名詞。', 2),

  health('sore throat', 1, undefined, ['V.CONFUSE'], 'meaning',
    "Ann's throat hurts when she eats or talks. She has a ___.", ['headache', 'stomachache', 'dizzy'],
    '喉嚨痛是 sore throat；throat 是「喉嚨」，sore 是「痛的」。', 1),
  health('sore throat', 2, undefined, ['V.CONFUSE'], 'noun',
    'My throat is red and it hurts when I talk. I have a ___.', ['headache', 'stomachache', 'sick'],
    '喉嚨紅腫、說話會痛是 a sore throat。', 2),
];

const otherWords: DrillItem[] = [
  // still: "not moving" (the exam sense) and "even now"
  {
    id: `${SEED.still}#v1`, seedMistakeId: SEED.still, skillIds: ['V.POLYSEMY', 'V.COLLOC'], kind: 'mc',
    stem: 'Please sit ___ while Mom takes your photo.', answer: 'still', distractors: opts('slow', 'loud', 'busy'),
    targetWords: ['still'], clue: 'collocation', difficulty: 1, variation: ['context'],
    explanation: 'sit still 是「坐著不動」，stay still 是「保持不動」；still 在這裡是「靜止的、不動的」。',
  },
  {
    id: `${SEED.still}#v2`, seedMistakeId: SEED.still, skillIds: ['V.POLYSEMY'], kind: 'mc',
    stem: 'It is already 10 p.m., but Grandpa is ___ watching TV.', answer: 'still', distractors: opts('very', 'too', 'so'),
    alsoFits: ['just', 'always'], targetWords: ['still'], clue: 'meaning', difficulty: 2, variation: ['context'],
    explanation: 'still 還有「仍然、還在」的意思：已經十點了，爺爺「還在」看電視。',
  },
  // traffic jam: one phrase
  {
    id: `${SEED.trafficJam}#v1`, seedMistakeId: SEED.trafficJam, skillIds: ['V.COLLOC'], kind: 'mc',
    stem: 'We were late for school because we got stuck in a ___ on the highway.', answer: 'traffic jam',
    distractors: opts('bicycle', 'umbrella', 'sandwich'),
    targetWords: ['traffic jam'], clue: 'collocation', difficulty: 1, variation: ['context'],
    explanation: 'stuck in a traffic jam 是「被塞在車陣裡」，traffic jam 要整組記。',
  },
  {
    id: `${SEED.trafficJam}#v2`, seedMistakeId: SEED.trafficJam, skillIds: ['V.COLLOC'], kind: 'mc',
    stem: 'Many cars were on the road, so there was a big ___ and the bus moved very slowly.', answer: 'traffic jam',
    distractors: opts('snowman', 'rainbow', 'picnic'),
    targetWords: ['traffic jam'], clue: 'meaning', difficulty: 2, variation: ['context'],
    explanation: '很多車、公車開很慢，就是塞車 traffic jam。',
  },
];

const items: DrillItem[] = [...grammar, ...healthItems, ...otherWords];

export default items;
