import { DrillItem } from '../types';

// Supplementary drills for skills that had no drill items: possessive 's / s' / of,
// plural noun forms, and pronoun reference. Each stem has exactly one acceptable answer;
// the clue that decides singular/plural owner is written into the sentence itself.

const opts = (...texts: string[]) => texts.map((text) => ({ text }));

const POSS = 'G.POSS.apostrophe_s';
const PLURAL = 'G.PLURAL.noun_form';
const PRON = 'G.PRON.reference';

const items: DrillItem[] = [
  // ---- possessive 's / s' / of ----
  {
    id: `supp.${POSS}#v1`, skillIds: [POSS], kind: 'mc',
    stem: "I have one brother. My ___ room is very clean.", answer: "brother's",
    distractors: [{ text: "brothers'", misconception: 'plural_possessive_for_singular' }, { text: 'brothers', misconception: 'missing_apostrophe' }],
    difficulty: 1, variation: ['context'],
    explanation: "我只有一個哥哥（弟弟），一個人的東西用單數所有格：brother + 's = brother's。brothers' 是「很多兄弟的」。",
  },
  {
    id: `supp.${POSS}#v2`, skillIds: [POSS], kind: 'mc',
    stem: 'Mom and Dad share one car. My ___ car is blue.', answer: "parents'",
    distractors: [{ text: "parent's", misconception: 'singular_possessive_for_plural' }, { text: 'parents', misconception: 'missing_apostrophe' }],
    difficulty: 2, variation: ['subject'],
    explanation: "車是爸爸和媽媽兩個人的，parents 是複數，字尾已經有 s，所有格只加一撇：parents'。",
  },
  {
    id: `supp.${POSS}#v3`, skillIds: [POSS], kind: 'mc',
    stem: 'In the library, the ___ books are on the low shelves.', answer: "children's",
    distractors: [{ text: "childrens'", misconception: 'apostrophe_after_s_on_irregular' }, { text: "childs'", misconception: 'regular_plural_on_irregular' }],
    difficulty: 2, variation: ['context'],
    explanation: "children 是 child 的不規則複數，字尾沒有 s，所有格要加 's：children's（兒童的）。",
  },
  {
    id: `supp.${POSS}#v4`, skillIds: [POSS], kind: 'mc',
    stem: 'I have two ___. They are black and white.', answer: 'cats',
    distractors: [{ text: "cat's", misconception: 'apostrophe_for_plural' }, { text: "cats'", misconception: 'apostrophe_for_plural' }],
    difficulty: 1, variation: ['context'],
    explanation: "這裡只是說「兩隻貓」，是複數，加 s 就好：cats。後面沒有接「誰的什麼東西」，所以不用撇號（'）。",
  },
  {
    id: `supp.${POSS}#v5`, skillIds: [POSS], kind: 'mc',
    stem: 'There is snow on the top ___ the mountain.', answer: 'of',
    distractors: opts('for', 'in'),
    difficulty: 2, variation: ['context'],
    explanation: "山是東西，不是人或動物，常用 of 表示「……的」：the top of the mountain（山的頂端）。",
  },
  {
    id: `supp.${POSS}#v6`, skillIds: [POSS], kind: 'mc',
    stem: 'These shoes are for men. They are ___ shoes.', answer: "men's",
    distractors: [{ text: "mens'", misconception: 'apostrophe_after_s_on_irregular' }, { text: 'mens', misconception: 'regular_plural_on_irregular' }],
    difficulty: 3, variation: ['context'],
    explanation: "men 是 man 的不規則複數，字尾沒有 s，所有格要加 's：men's（男人們的）。mens 這個字不存在。",
  },

  // ---- plural noun forms ----
  {
    id: `supp.${PLURAL}#v1`, skillIds: [PLURAL], kind: 'mc',
    stem: 'Mom buys three ___ at the market.', answer: 'watermelons',
    distractors: [{ text: 'watermelon', misconception: 'missing_plural_s' }, { text: 'watermelones', misconception: 'es_overuse' }],
    difficulty: 1, variation: ['context'],
    explanation: "three 表示三個，名詞要用複數；watermelon 直接加 s：watermelons。",
  },
  {
    id: `supp.${PLURAL}#v2`, skillIds: [PLURAL], kind: 'mc',
    stem: 'There are five ___ under the bed.', answer: 'boxes',
    distractors: [{ text: 'boxs', misconception: 'es_after_x_missing' }, { text: 'box', misconception: 'missing_plural_s' }],
    difficulty: 1, variation: ['context'],
    explanation: "five 表示五個，要用複數。字尾是 x 的名詞要加 es：box → boxes。",
  },
  {
    id: `supp.${PLURAL}#v3`, skillIds: [PLURAL], kind: 'mc',
    stem: 'Look! There are three ___ on the flower.', answer: 'butterflies',
    distractors: [{ text: 'butterflys', misconception: 'y_to_ies_missing' }, { text: 'butterfly', misconception: 'missing_plural_s' }],
    difficulty: 2, variation: ['context'],
    explanation: "子音 + y 結尾的名詞，複數要把 y 改成 i 再加 es：butterfly → butterflies。",
  },
  {
    id: `supp.${PLURAL}#v4`, skillIds: [PLURAL], kind: 'mc',
    stem: 'There are three ___ in my bedroom. They are full of books.', answer: 'shelves',
    distractors: [{ text: 'shelfs', misconception: 'f_to_ves_missing' }, { text: 'shelf', misconception: 'missing_plural_s' }],
    difficulty: 2, variation: ['context'],
    explanation: "three 表示三個，要用複數。shelf 字尾是 f，複數要把 f 改成 ves：shelf → shelves（leaf → leaves、knife → knives 也一樣；但不是每個 f 結尾的字都這樣，例如 roof → roofs）。",
  },
  {
    id: `supp.${PLURAL}#v5`, skillIds: [PLURAL], kind: 'mc',
    stem: 'There are twenty ___ in my class.', answer: 'children',
    distractors: [{ text: 'childs', misconception: 'regular_plural_on_irregular' }, { text: 'childrens', misconception: 'double_plural' }],
    difficulty: 2, variation: ['context'],
    explanation: "child 的複數是不規則的 children，不加 s。childs 和 childrens 都是錯的字。",
  },
  {
    id: `supp.${PLURAL}#v6`, skillIds: [PLURAL], kind: 'mc',
    stem: 'The two ___ are playing football in the park.', answer: 'boys',
    distractors: [{ text: 'boies', misconception: 'y_to_ies_overuse' }, { text: 'boy', misconception: 'missing_plural_s' }],
    difficulty: 3, variation: ['subject'],
    explanation: "boy 的 y 前面是母音 o，所以直接加 s：boys。只有「子音 + y」才改成 ies（例如 baby → babies）。",
  },

  // ---- pronoun reference ----
  {
    id: `supp.${PRON}#v1`, skillIds: [PRON], kind: 'mc',
    stem: 'My grandma loves flowers. I often visit ___ on Sundays.', answer: 'her',
    distractors: [{ text: 'she', misconception: 'subject_pronoun_as_object' }, { text: 'hers', misconception: 'possessive_pronoun_as_object' }],
    difficulty: 1, variation: ['context'],
    explanation: "visit（拜訪）後面要放受詞，奶奶是女生，受格用 her。she 只能當主詞（放在動詞前面）。",
  },
  {
    id: `supp.${PRON}#v2`, skillIds: [PRON], kind: 'mc',
    stem: 'Ben and Tom are my friends. ___ play basketball after school.', answer: 'They',
    distractors: [{ text: 'Them', misconception: 'object_pronoun_as_subject' }, { text: 'Their', misconception: 'possessive_as_subject' }],
    difficulty: 1, variation: ['subject'],
    explanation: "Ben and Tom 是兩個人，放在動詞 play 前面當主詞，要用主格 They。Them 是受格，Their 是「他們的」。",
  },
  {
    id: `supp.${PRON}#v3`, skillIds: [PRON], kind: 'mc',
    stem: 'Look at ___ socks! They are so colorful.', answer: 'these',
    distractors: [{ text: 'they', misconception: 'they_for_these' }, { text: 'this', misconception: 'this_with_plural_noun' }],
    difficulty: 2, variation: ['context'],
    explanation: "socks 是複數，指著眼前的東西說「這些襪子」要用 these。they 後面不能直接接名詞；this 只能接單數名詞。",
  },
  {
    id: `supp.${PRON}#v4`, skillIds: [PRON], kind: 'mc',
    stem: 'I like apples. I eat ___ every day.', answer: 'them',
    distractors: [{ text: 'it', misconception: 'it_for_plural' }, { text: 'they', misconception: 'subject_pronoun_as_object' }],
    difficulty: 2, variation: ['context'],
    explanation: "這裡指的是 apples（複數），放在動詞 eat 後面當受詞，要用 them。it 只能指一個東西；they 只能當主詞。",
  },
  {
    id: `supp.${PRON}#v5`, skillIds: [PRON], kind: 'mc',
    stem: 'Judy has a little dog. ___ dog is white.', answer: 'Her',
    distractors: [{ text: 'His', misconception: 'wrong_gender' }, { text: 'She', misconception: 'subject_pronoun_as_possessive' }],
    difficulty: 2, variation: ['context'],
    explanation: "Judy 是女生，「她的」狗要用 Her。His 是「他的」（男生）；She 是「她」，不能表示「她的」。",
  },
  {
    id: `supp.${PRON}#v6`, skillIds: [PRON], kind: 'mc',
    stem: 'My brother and I like music. ___ play the piano every day.', answer: 'We',
    distractors: [{ text: 'They', misconception: 'they_for_speaker_group' }, { text: 'Us', misconception: 'object_pronoun_as_subject' }],
    difficulty: 3, variation: ['subject'],
    explanation: "My brother and I 裡面有「我」，所以要用「我們」We 當主詞。They 是「他們」，不包括我；Us 是受格，不能當主詞。",
  },
];

export default items;
