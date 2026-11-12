import { DrillItem } from '../types';

// Supplementary drills for R.CLIL.numbers and R.CLIL.landmarks (no seed mistake of their own here).
// Facts come only from topicReview/data/famous-buildings.ts (Incredible English 4, Unit 2, L9-10)
// and the 2026-10-22 / 2026-10-25 worksheets. Year readings that are ALSO correct English
// (e.g. "two thousand and eighteen", "eighteen hundred and eighty-nine") are listed in alsoFits
// and never offered, so every distractor is a clearly wrong reading.

const opts = (...texts: string[]) => texts.map((text) => ({ text }));

const numbers: DrillItem[] = [
  {
    id: 'supp.R.CLIL.numbers#v1', skillIds: ['R.CLIL.numbers'], kind: 'mc',
    stem: 'The Eiffel Tower was built in 1889. We usually say: "It was built in ___."',
    answer: 'eighteen eighty-nine',
    distractors: [
      { text: 'one thousand, eight hundred and eighty-nine', misconception: 'year_read_as_number' },
      { text: 'eighteen ninety-eight', misconception: 'digits_swapped' },
      { text: 'one eight eight nine', misconception: 'digits_read_one_by_one' },
    ],
    alsoFits: ['eighteen hundred and eighty-nine', 'eighteen hundred eighty-nine'],
    difficulty: 1, variation: ['context'],
    explanation: '年份要拆成兩組兩位數唸：18｜89 → eighteen eighty-nine。one thousand, eight hundred and eighty-nine 是唸一般數字的方法，不是年份。',
  },
  {
    id: 'supp.R.CLIL.numbers#v2', skillIds: ['R.CLIL.numbers'], kind: 'mc',
    stem: 'My little brother was born in 2018. We say: "He was born in ___."',
    answer: 'twenty eighteen',
    distractors: [
      { text: 'twenty eighty', misconception: 'teen_vs_ty' },
      { text: 'twenty eight', misconception: 'teen_vs_ty' },
      { text: 'two eighteen', misconception: 'year_first_half_dropped' },
    ],
    alsoFits: ['two thousand and eighteen', 'two thousand eighteen'],
    difficulty: 2, variation: ['context'],
    explanation: '2018 拆成 20｜18 → twenty eighteen。18 是 eighteen（-teen），80 才是 eighty（-ty）；twenty eighty 是 2080 年喔！',
  },
  {
    id: 'supp.R.CLIL.numbers#v3', skillIds: ['R.CLIL.numbers'], kind: 'mc',
    stem: 'Our school library has 1,975 books. We say: "It has ___ books."',
    answer: 'one thousand, nine hundred and seventy-five',
    distractors: [
      { text: 'nineteen seventy-five', misconception: 'number_read_as_year' },
      { text: 'one thousand, nine hundreds and seventy-five', misconception: 'plural_hundreds' },
      { text: 'one thousand, nine hundred and fifty-seven', misconception: 'digits_swapped' },
    ],
    alsoFits: ['one thousand nine hundred seventy-five'],
    difficulty: 2, variation: ['context'],
    explanation: '這裡的 1,975 是「書的數量」，不是年份，所以要照千、百、十唸：one thousand, nine hundred and seventy-five。nineteen seventy-five 是年份 1975 的唸法；hundred 前面有數字也不加 s。',
  },
  {
    id: 'supp.R.CLIL.numbers#v4', skillIds: ['R.CLIL.numbers'], kind: 'mc',
    stem: 'The Sapphire Building is 216 metres high. We say: "It is ___ metres high."',
    answer: 'two hundred and sixteen',
    distractors: [
      { text: 'two hundreds and sixteen', misconception: 'plural_hundreds' },
      { text: 'two hundred and sixty', misconception: 'teen_vs_ty' },
      { text: 'twenty-one six', misconception: 'digits_grouped_wrong' },
    ],
    alsoFits: ['two hundred sixteen'],
    difficulty: 1, variation: ['subject'],
    explanation: '216 是高度（一般數字）：two hundred and sixteen。hundred 前面有 two 也不加 s；16 是 sixteen，60 才是 sixty。',
  },
  {
    id: 'supp.R.CLIL.numbers#v5', skillIds: ['R.CLIL.numbers'], kind: 'mc',
    stem: 'Her birthday is on 3 May. We say: "Her birthday is on the ___ of May."',
    answer: 'third',
    distractors: [
      { text: 'three', misconception: 'cardinal_for_date' },
      { text: 'threeth', misconception: 'regular_th_on_irregular_ordinal' },
      { text: 'thirty', misconception: 'teen_vs_ty' },
    ],
    difficulty: 2, variation: ['context'],
    explanation: '日期要用序數（第幾）：the third of May。3 的序數是 third（不規則），不是 threeth；1、2、3 分別是 first、second、third。',
  },
  {
    id: 'supp.R.CLIL.numbers#v6', skillIds: ['R.CLIL.numbers'], kind: 'mc',
    stem: 'People started to build the Leaning Tower of Pisa in 1173. We usually say: "They started in ___."',
    answer: 'eleven seventy-three',
    distractors: [
      { text: 'one thousand, one hundred and seventy-three', misconception: 'year_read_as_number' },
      { text: 'eleven thirty-seven', misconception: 'digits_swapped' },
      { text: 'one seventy-three', misconception: 'year_first_half_dropped' },
    ],
    alsoFits: ['eleven hundred and seventy-three', 'eleven hundred seventy-three'],
    difficulty: 3, variation: ['context'],
    explanation: '課本例子：1173 是年份，拆成 11｜73 → eleven seventy-three。one thousand, one hundred and seventy-three 是一般數字的唸法。',
  },
];

const landmarks: DrillItem[] = [
  {
    id: 'supp.R.CLIL.landmarks#v1', skillIds: ['R.CLIL.landmarks'], kind: 'mc',
    stem: 'The Eiffel Tower is in Paris, so it is in ___.',
    answer: 'France', distractors: opts('Italy', 'Canada', 'England'),
    difficulty: 1, variation: ['context'],
    explanation: '艾菲爾鐵塔在巴黎（Paris），巴黎在法國（France）。',
  },
  {
    id: 'supp.R.CLIL.landmarks#v2', skillIds: ['R.CLIL.landmarks'], kind: 'mc',
    stem: 'The Leaning Tower of ___ is in Italy.',
    answer: 'Pisa',
    distractors: [
      { text: 'Paris', misconception: 'pisa_eiffel_swap' },
      { text: 'London' },
      { text: 'Warsaw' },
    ],
    difficulty: 1, variation: ['context'],
    explanation: '在義大利（Italy）的斜塔叫比薩斜塔（the Leaning Tower of Pisa）。Paris 是艾菲爾鐵塔所在的城市。',
  },
  {
    id: 'supp.R.CLIL.landmarks#v3', skillIds: ['R.CLIL.landmarks'], kind: 'mc',
    stem: 'You can see the whole of Paris from the top of the ___.',
    answer: 'Eiffel Tower',
    distractors: [
      { text: 'CN Tower', misconception: 'cn_tower_in_paris' },
      { text: 'Leaning Tower of Pisa', misconception: 'pisa_eiffel_swap' },
    ],
    difficulty: 2, variation: ['context'],
    explanation: '艾菲爾鐵塔就在巴黎，很高，從頂端可以看到整個巴黎。CN Tower 在加拿大，比薩斜塔在義大利，都看不到巴黎。',
  },
  {
    id: 'supp.R.CLIL.landmarks#v4', skillIds: ['R.CLIL.landmarks'], kind: 'mc',
    stem: 'The ___ is in Istanbul, Turkey. It was built in 2010.',
    answer: 'Sapphire Building', distractors: opts('Eiffel Tower', 'CN Tower', 'Leaning Tower of Pisa'),
    difficulty: 2, variation: ['context'],
    explanation: '課本寫 "The Sapphire Building, Istanbul, Turkey. Built in 2010."：在土耳其伊斯坦堡、2010 年蓋好的是 the Sapphire Building。',
  },
  {
    id: 'supp.R.CLIL.landmarks#v5', skillIds: ['R.CLIL.landmarks'], kind: 'mc',
    stem: 'The Palace of Science and Culture is in Warsaw, ___.',
    answer: 'Poland', distractors: opts('Turkey', 'Italy', 'France'),
    difficulty: 2, variation: ['subject'],
    explanation: '課本寫 "The Palace of Science and Culture, Warsaw, Poland."：科學文化宮在波蘭（Poland）的華沙。',
  },
  {
    id: 'supp.R.CLIL.landmarks#v6', skillIds: ['R.CLIL.landmarks'], kind: 'mc',
    stem: 'The Leaning Tower of Pisa is 55 metres high. The Eiffel Tower is 329 metres high. So the Leaning Tower of Pisa is ___ than the Eiffel Tower.',
    answer: 'shorter',
    distractors: [
      { text: 'taller', misconception: 'comparison_reversed' },
      { text: 'higher', misconception: 'comparison_reversed' },
    ],
    alsoFits: ['lower'],
    difficulty: 3, variation: ['context'],
    explanation: '55 比 329 小，所以比薩斜塔比艾菲爾鐵塔矮：shorter。taller 和 higher 是「比較高」，意思相反。',
  },
];

const items: DrillItem[] = [...numbers, ...landmarks];
export default items;
