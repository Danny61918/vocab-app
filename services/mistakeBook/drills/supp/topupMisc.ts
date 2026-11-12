import { DrillItem } from '../types';

// Top-up drills (round 2) for skills whose banks were too small: their/its, present continuous,
// series commas, careful spelling and "choose the correct sentence". Sub-patterns differ from the
// existing items in drills/2026-10-28.ts and 2026-11-04.ts (theirs with no noun, it's = it is,
// its for things, questions/first person in the progressive, commas in lists of four, etc.).
// Series-comma blanks always sit at a separator that is required (never the optional comma before
// "and"), so the answer does not depend on the Oxford-comma style.

const opt = (text: string, misconception?: string) => (misconception ? { text, misconception } : { text });

const POSS = 'G.POSS.their_its';
const PROG = 'G.PROG.present_continuous';
const COMMA = 'M.COMMA.series';
const SPELL = 'M.SPELL.careful_copy';
const CHOOSE = 'FMT.choose_correct';

const items: DrillItem[] = [
  // ---- G.POSS.their_its ----
  {
    id: `supp2.${POSS}#v1`, skillIds: [POSS], kind: 'mc',
    stem: 'Lily and Max have a little dog. The dog is ___.', answer: 'theirs',
    distractors: [opt('their', 'possessive_adj_without_noun'), opt("their's", 'apostrophe_on_theirs'), opt("it's", 'its_vs_it_is')],
    difficulty: 2, variation: ['context'],
    explanation: '空格後面沒有名詞了，「他們的（那隻）」要用 theirs。their 後面一定要接名詞；their\'s 不是一個字，theirs 不加撇號。',
  },
  {
    id: `supp2.${POSS}#v2`, skillIds: [POSS], kind: 'mc',
    stem: 'Look at that old house. ___ door is red.', answer: 'Its',
    distractors: [opt("It's", 'its_vs_it_is'), opt('Their', 'plural_for_singular_owner'), opt('Theirs', 'possessive_pronoun_before_noun')],
    difficulty: 2, variation: ['subject'],
    explanation: 'house 是一間（單數），「它的門」用 Its，後面接名詞 door。It\'s 是 It is（它是），Their 是複數的「他們的」，Theirs 後面不能接名詞。',
  },
  {
    id: `supp2.${POSS}#v3`, skillIds: [POSS], kind: 'mc',
    stem: 'Look at the kitten! ___ playing with a ball of yarn.', answer: "It's",
    distractors: [opt('Its', 'its_vs_it_is'), opt("Its'", 'apostrophe_after_its'), opt('Theirs', 'plural_for_singular_owner')],
    difficulty: 3, variation: ['context'],
    explanation: '這裡要說「牠正在玩」= It is playing，縮寫成 It\'s。Its（牠的）後面要接名詞，例如 its tail；Its\' 不是一個字。',
  },

  // ---- G.PROG.present_continuous ----
  {
    id: `supp2.${PROG}#v1`, skillIds: [PROG], kind: 'mc',
    stem: 'Look! I ___ a picture of our cat.', answer: 'am drawing',
    distractors: [opt('drawing', 'missing_be'), opt('is drawing', 'wrong_be_for_subject'), opt('am draw', 'missing_ing')],
    difficulty: 1, variation: ['subject'],
    explanation: 'Look!（你看！）表示正在發生，用現在進行式 be + V-ing。主詞是 I，be 動詞用 am：I am drawing。drawing 前面缺 be 動詞；am draw 少了 -ing。',
  },
  {
    id: `supp2.${PROG}#v2`, skillIds: [PROG], kind: 'mc',
    stem: '___ you listening to me now?', answer: 'Are',
    distractors: [opt('Do', 'do_with_ing'), opt('Does', 'do_with_ing'), opt('Is', 'wrong_be_for_subject')],
    difficulty: 2, variation: ['question'],
    explanation: '現在進行式的問句是把 be 動詞放到前面：Are you listening...? 後面是 V-ing，就不能用 Do／Does。you 配 are，不配 is。',
  },
  {
    id: `supp2.${PROG}#v3`, skillIds: [PROG], kind: 'mc',
    stem: 'Look! Mary and her sister ___ in the kitchen right now.', answer: 'are making a cake',
    distractors: [opt('is making a cake', 'singular_be_for_compound_subject'), opt('making a cake', 'missing_be'), opt('are make a cake', 'missing_ing')],
    difficulty: 3, variation: ['subject'],
    explanation: 'right now 要用現在進行式 be + V-ing。Mary and her sister 是兩個人，用 are：are making。making 前面不能少了 be 動詞；are make 少了 -ing。',
  },

  // ---- M.COMMA.series ----
  {
    id: `supp2.${COMMA}#v1`, skillIds: [COMMA], kind: 'mc',
    stem: 'After school, I do my ___ play the piano and feed my fish.', answer: 'homework,',
    distractors: [opt('homework', 'missing_series_comma'), opt('homework.', 'period_inside_sentence')],
    difficulty: 1, variation: ['context'],
    explanation: '三個動作 do my homework、play the piano、feed my fish 並列，寫成 A, B and C：第一個動作後面要加逗號。句子還沒結束，不能用句號。',
  },
  {
    id: `supp2.${COMMA}#v2`, skillIds: [COMMA], kind: 'mc',
    stem: 'To make pancakes, we need flour, ___ milk and butter.', answer: 'eggs,',
    distractors: [opt('eggs', 'missing_series_comma'), opt('eggs.', 'period_inside_sentence')],
    difficulty: 2, variation: ['context'],
    explanation: '四樣東西 flour、eggs、milk、butter 並列：最後兩樣之間用 and 連接，其他每一樣後面加逗號：flour, eggs, milk and butter。',
  },
  {
    id: `supp2.${COMMA}#v3`, skillIds: [COMMA], kind: 'mc',
    stem: 'Kim washes her face brushes her hair and puts on her shoes. Where must we add a comma? ___', answer: 'after face',
    distractors: [opt('after Kim', 'comma_after_subject'), opt('after washes', 'comma_splits_verb_object'), opt('after brushes', 'comma_splits_verb_object')],
    difficulty: 2, variation: ['context'],
    explanation: '先找出三個動作：washes her face／brushes her hair／puts on her shoes。逗號要放在第一個動作結束的地方（face 後面），不能把主詞 Kim 和動詞分開，也不能把動詞和後面的東西分開。',
  },
  {
    id: `supp2.${COMMA}#v4`, skillIds: [COMMA], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'At the party, we sing, dance, draw and play games.',
    distractors: [
      opt('At the party, we sing dance draw and play games.', 'missing_series_comma'),
      opt('At the party, we sing, dance draw and play games.', 'missing_series_comma'),
      opt('At the party, we, sing, dance, draw and play games.', 'comma_after_subject'),
    ],
    difficulty: 3, variation: ['context'],
    explanation: '四個動作 sing、dance、draw、play games 並列：最後兩個之間用 and，前面的 sing、dance 後面加逗號：sing, dance, draw and play games。主詞 we 和動詞之間不能加逗號。',
  },

  // ---- M.SPELL.careful_copy ----
  {
    id: `supp2.${SPELL}#v1`, skillIds: [SPELL], kind: 'mc',
    stem: 'My brother likes pizza and ___.', answer: 'hamburgers',
    distractors: [opt('hambers', 'dropped_letters'), opt('hamburgars', 'vowel_swap'), opt('hamberguers', 'vowel_swap')],
    difficulty: 1, variation: ['context'],
    explanation: 'hamburgers 拆成 ham-bur-ger-s 來拼：中間是 bur，後面是 ger。不能漏掉字母，也不能把 e 寫成 a。',
  },
  {
    id: `supp2.${SPELL}#v2`, skillIds: [SPELL], kind: 'mc',
    stem: 'It is cold outside. You ___ wear a coat.', answer: 'should',
    distractors: [opt('shuold', 'letter_order_swap'), opt('shoud', 'dropped_letters'), opt('shold', 'dropped_letters')],
    difficulty: 2, variation: ['context'],
    explanation: 'should 和 would、could 是一家人，結尾都是 -ould（o-u-l-d）：s-h-o-u-l-d。l 雖然不發音，但一定要寫。',
  },
  {
    id: `supp2.${SPELL}#v3`, skillIds: [SPELL], kind: 'mc',
    stem: 'My best ___ lives next door.', answer: 'friend',
    distractors: [opt('freind', 'letter_order_swap'), opt('frend', 'dropped_letters'), opt('firend', 'letter_order_swap')],
    difficulty: 2, variation: ['context'],
    explanation: 'friend 的拼法是 f-r-i-e-n-d，先 i 後 e。可以記「fri + end」：朋友到最後（end）都在。',
  },

  // ---- FMT.choose_correct ----
  {
    id: `supp2.${CHOOSE}#v1`, skillIds: [CHOOSE], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'Those books are ours.',
    distractors: [
      opt('Those books are our.', 'possessive_adj_without_noun'),
      opt('Those book are ours.', 'missing_plural_s'),
      opt('That books are ours.', 'this_that_number'),
    ],
    difficulty: 2, variation: ['subject'],
    explanation: '後面沒有名詞要用 ours，不是 our；Those 後面的名詞要用複數 books；That 只配單數。四句都要逐句檢查，每句只錯一個小地方。',
  },
  {
    id: `supp2.${CHOOSE}#v2`, skillIds: [CHOOSE], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'Does she have a cat?',
    distractors: [
      opt('Does she has a cat?', 'does_with_3sg_verb'),
      opt('Do she have a cat?', 'do_for_3sg'),
      opt('Does she have a cats?', 'a_with_plural'),
    ],
    difficulty: 2, variation: ['question'],
    explanation: 'she 是單數，問句用 Does，後面動詞用原形 have（不是 has）；a 後面接單數 cat。一定要四句都看完再選。',
  },
  {
    id: `supp2.${CHOOSE}#v3`, skillIds: [CHOOSE], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'There is a pair of socks on the bed.',
    distractors: [
      opt('There are a pair of socks on the bed.', 'pair_of_as_plural'),
      opt('There is a pair of sock on the bed.', 'missing_plural_s'),
      opt('There is a pair socks on the bed.', 'missing_of'),
    ],
    difficulty: 3, variation: ['subject'],
    explanation: 'a pair of（一雙）是單數，要用 There is（口語有時會聽到 there are，但考試要用 is）；但 a pair of 後面的東西要用複數 socks，中間的 of 也不能漏。',
  },
  {
    id: `supp2.${CHOOSE}#v4`, skillIds: [CHOOSE], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: "Whose bag is this? It's Amy's.",
    distractors: [
      opt("Whose bag is this? It's Amys.", 'missing_possessive_apostrophe'),
      opt("Whose bag is this? Its Amy's.", 'its_vs_it_is'),
      opt("Who bag is this? It's Amy's.", 'who_vs_whose'),
    ],
    difficulty: 3, variation: ['question'],
    explanation: '問「誰的」要用 Whose；回答「它是 Amy 的」= It is Amy\'s，縮寫 It\'s，Amy 後面要加 \'s 表示「的」。每句都要找找看有沒有少一撇或用錯字。',
  },
];

export default items;
