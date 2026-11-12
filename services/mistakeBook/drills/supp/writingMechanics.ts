import { DrillItem } from '../types';

// Supplementary drills for writing-mechanics skills that had no drill items yet:
// capitalization, end marks / commas, combining sentences, and -ing spelling.
// Patterns are taken from the child's real mistakes (data/2026-09-29, 10-02, 10-06, 10-13, 10-22, 10-23,
// 09-18, 09-24). Each blank holds the whole word/phrase being tested, so exactly one option is acceptable.

const opt = (text: string, misconception?: string) => (misconception ? { text, misconception } : { text });

const CAP = 'M.CAP.letter_case';
const PUNCT = 'M.PUNCT.comma_period';
const COMBINE = 'M.COMBINE.missing_words';
const ING = 'M.SPELL.ing_form';

const items: DrillItem[] = [
  // ---- M.CAP.letter_case ----
  // Grading compares answers case-insensitively (drillProgress.ts), so options can NOT differ only in
  // letter case. Each item instead shows a sentence with wrong capitals and asks WHICH words to change.
  {
    id: `supp.${CAP}#v1`, skillIds: [CAP], kind: 'mc',
    stem: 'Which words need a capital letter? "after school, i walk my dog." Answer: ___', answer: 'after and i',
    distractors: [opt('only after', 'lowercase_i'), opt('after, i, and dog', 'capitalize_ordinary_word')],
    difficulty: 1, variation: ['subject'],
    explanation: '句子第一個字 After 要大寫；「我」I 不管在句子哪裡都要大寫。dog 是普通的字，不用大寫。',
  },
  {
    id: `supp.${CAP}#v2`, skillIds: [CAP], kind: 'mc',
    stem: 'Which words need a capital letter? "we have art class every friday morning." Answer: ___', answer: 'we and friday',
    distractors: [opt('only we', 'lowercase_day'), opt('we, friday, and morning', 'capitalize_ordinary_word')],
    difficulty: 1, variation: ['context'],
    explanation: '句首的 We 要大寫；星期幾（Friday）一定要大寫。morning 是普通的字，不用大寫。',
  },
  {
    id: `supp.${CAP}#v3`, skillIds: [CAP], kind: 'mc',
    stem: 'Which words need a capital letter? "my cousin amy lives in tainan." Answer: ___', answer: 'my, amy, and tainan',
    distractors: [opt('my and amy', 'lowercase_place_name'), opt('my, cousin, amy, and tainan', 'capitalize_ordinary_word')],
    difficulty: 2, variation: ['subject'],
    explanation: '句首的 My 要大寫；人名 Amy 和地名 Tainan 也要大寫。cousin 是普通的字，不用大寫。',
  },
  {
    id: `supp.${CAP}#v4`, skillIds: [CAP], kind: 'mc',
    stem: 'Ben likes to swim. His sister likes to swim. → "Ben and His Sister like to swim." Which words should start with a small letter? ___', answer: 'his and sister',
    distractors: [opt('only sister', 'keep_capital_after_combining'), opt('ben and his', 'lowercase_name')],
    difficulty: 2, variation: ['context'],
    explanation: '合併句子後，His 已經不在句首，要改成小寫 his；sister 是普通的字也要小寫。Ben 是人名，一定要大寫。',
  },
  {
    id: `supp.${CAP}#v5`, skillIds: [CAP], kind: 'mc',
    stem: 'Which words need a capital letter? "it is very hot in july and august." Answer: ___', answer: 'it, july, and august',
    distractors: [opt('only it', 'lowercase_month'), opt('it, hot, july, and august', 'capitalize_ordinary_word')],
    difficulty: 2, variation: ['context'],
    explanation: '句首的 It 要大寫；月份（July、August）一定要大寫。hot 是普通的字，不用大寫。',
  },
  {
    id: `supp.${CAP}#v6`, skillIds: [CAP], kind: 'mc',
    stem: 'All the children like Miss Lin, But The new boy does not. Which words should start with a small letter? ___', answer: 'but and the',
    distractors: [opt('only the', 'capitalize_after_comma'), opt('but, the, and miss', 'lowercase_title')],
    difficulty: 3, variation: ['context'],
    explanation: '逗號後面的 but the new boy 還是同一個句子，不是新句子的開頭，所以 but 和 the 都要小寫。Miss Lin 是稱呼加姓名，要大寫。',
  },

  // ---- M.PUNCT.comma_period ----
  {
    id: `supp.${PUNCT}#v1`, skillIds: [PUNCT], kind: 'mc',
    stem: 'Does Tom like cats? Does Amy like cats? → Do Tom and Amy like ___', answer: 'cats?',
    distractors: [opt('cats.', 'period_on_question'), opt('cats,', 'comma_as_end_mark')],
    difficulty: 1, variation: ['question'],
    explanation: '合併以後還是一個問句（Do 開頭），句尾要用問號 ?。',
  },
  {
    id: `supp.${PUNCT}#v2`, skillIds: [PUNCT], kind: 'mc',
    stem: 'I go to school by ___', answer: 'bus.',
    distractors: [opt('bus?', 'question_mark_on_statement'), opt('bus,', 'comma_as_end_mark')],
    difficulty: 1, variation: ['context'],
    explanation: '這是一般的直述句（在說一件事），句尾要用句號 .，不是問號，也不能用逗號結束。',
  },
  {
    id: `supp.${PUNCT}#v3`, skillIds: [PUNCT], kind: 'mc',
    stem: 'Do you like apples? ___ I do.', answer: 'Yes,',
    distractors: [opt('Yes', 'missing_comma_after_yes'), opt('Yes?', 'question_mark_on_answer')],
    difficulty: 2, variation: ['short_answer'],
    explanation: '簡答句 Yes, I do. 的 Yes 後面要加逗號，再接 I do.；回答不是問句，不用問號。',
  },
  {
    id: `supp.${PUNCT}#v4`, skillIds: [PUNCT], kind: 'mc',
    stem: 'For lunch I want ___ an egg, and some soup.', answer: 'rice,',
    distractors: [opt('rice', 'missing_series_comma'), opt('rice.', 'period_mid_sentence')],
    difficulty: 2, variation: ['context'],
    explanation: '列出三樣以上的東西時，前面的東西之間要用逗號隔開：rice, an egg, and some soup。句子還沒結束，不能用句號。',
  },
  {
    id: `supp.${PUNCT}#v5`, skillIds: [PUNCT], kind: 'mc',
    stem: 'Wendy likes ___ Vicky does not.', answer: 'fish, but',
    distractors: [opt('fish, so', 'wrong_connector'), opt('fish. but', 'period_before_but')],
    difficulty: 2, variation: ['polarity'],
    explanation: '兩個意思相反的完整句子用 but 連接（Wendy 喜歡，Vicky 不喜歡），but 前面加逗號：fish, but。so 表示「所以」，意思不通；用句號的話 but 就變成新句子的開頭，不能這樣寫。',
  },
  {
    id: `supp.${PUNCT}#v6`, skillIds: [PUNCT], kind: 'mc',
    stem: 'I do not know where Amy ___', answer: 'lives.',
    distractors: [opt('lives?', 'question_mark_on_statement'), opt('lives,', 'comma_as_end_mark')],
    difficulty: 3, variation: ['question'],
    explanation: '句子裡雖然有 where，但整句是「我不知道 Amy 住哪裡」，是在說一件事，不是在問問題，所以用句號。',
  },

  // ---- M.COMBINE.missing_words ----
  {
    id: `supp.${COMBINE}#v1`, skillIds: [COMBINE], kind: 'mc',
    stem: 'Tom has a dog. The dog is brown. → Tom has ___ dog.', answer: 'a brown',
    distractors: [opt('brown', 'drop_article'), opt('brown a', 'article_after_adjective')],
    difficulty: 1, variation: ['context'],
    explanation: '合併時冠詞 a 不能漏掉，形容詞 brown 要放在 a 和 dog 中間：a brown dog。',
  },
  {
    id: `supp.${COMBINE}#v2`, skillIds: [COMBINE], kind: 'mc',
    stem: 'Ben likes cats. Ben likes dogs. → Ben likes cats ___ dogs.', answer: 'and',
    distractors: [opt('but', 'wrong_connector'), opt('so', 'wrong_connector')],
    difficulty: 1, variation: ['verb'],
    explanation: '兩句都說 Ben 喜歡，意思是「也喜歡」，要用 and 把兩樣東西連起來。',
  },
  {
    id: `supp.${COMBINE}#v3`, skillIds: [COMBINE], kind: 'mc',
    stem: 'I have an apple. I have a banana. → I have an apple and ___', answer: 'a banana.',
    distractors: [opt('banana.', 'drop_article'), opt('an banana.', 'copy_first_article')],
    difficulty: 2, variation: ['context'],
    explanation: '合併時第二個東西的冠詞要保留：banana 是 b 開頭（子音），要用 a，所以是 a banana。',
  },
  {
    id: `supp.${COMBINE}#v4`, skillIds: [COMBINE], kind: 'mc',
    stem: 'Davis has a violin. Davis plays the violin every day. → Davis has a violin and plays ___ every day.', answer: 'it',
    alsoFits: ['the violin'],
    distractors: [opt('them', 'plural_pronoun_for_one_thing'), opt('its', 'possessive_for_object'), opt('he', 'subject_pronoun_as_object')],
    difficulty: 2, variation: ['context'],
    explanation: 'plays 後面要有東西（受詞），不能省略。violin 前面已經出現過，可以用 it 代替一把小提琴；them 是很多個，its 是「它的」，he 是主詞。',
  },
  {
    id: `supp.${COMBINE}#v5`, skillIds: [COMBINE], kind: 'mc',
    stem: 'Mia goes to school by bus. Her brother goes to school by bus. → Mia and her brother go ___ by bus.', answer: 'to school',
    distractors: [opt('school', 'drop_preposition'), opt('at school', 'wrong_preposition')],
    difficulty: 2, variation: ['subject'],
    explanation: '原句是 go to school（去上學），合併時 to 不能漏掉，也不能換成 at。',
  },
  {
    id: `supp.${COMBINE}#v6`, skillIds: [COMBINE], kind: 'mc',
    stem: 'Ben is not taking a bath now. Ben is not talking on the phone now. → Ben is not taking a bath or ___ now.', answer: 'talking on the phone',
    distractors: [opt('talking the phone', 'drop_preposition'), opt('talk on the phone', 'base_verb_in_progressive'), opt('talking on the phone now', 'repeat_now')],
    difficulty: 3, variation: ['polarity'],
    explanation: '兩個動作都要保留：taking a bath 和 talking on the phone，所以 talking 不能漏；now 只要在句尾出現一次。',
  },

  // ---- M.SPELL.ing_form ----
  {
    id: `supp.${ING}#v1`, skillIds: [ING], kind: 'mc',
    stem: 'Mom is ___ a cake in the kitchen.', answer: 'making',
    distractors: [opt('makeing', 'keep_silent_e'), opt('makking', 'double_after_e_drop')],
    difficulty: 1, variation: ['verb'],
    explanation: 'make 是不發音的 e 結尾，加 ing 時要去掉 e：make → making。',
  },
  {
    id: `supp.${ING}#v2`, skillIds: [ING], kind: 'mc',
    stem: 'The dog is ___ a hole in the garden.', answer: 'digging',
    distractors: [opt('diging', 'no_double_consonant'), opt('digeing', 'add_e')],
    difficulty: 1, variation: ['verb'],
    explanation: 'dig 是「一個母音 + 一個子音」結尾的短字，要重複最後的 g 再加 ing：dig → digging。',
  },
  {
    id: `supp.${ING}#v3`, skillIds: [ING], kind: 'mc',
    stem: 'My grandpa is ___ on the sofa because he is tired.', answer: 'lying',
    distractors: [opt('liying', 'keep_i_add_y'), opt('lieing', 'keep_ie'), opt('liing', 'drop_e_only')],
    difficulty: 2, variation: ['subject'],
    explanation: 'ie 結尾的動詞（lie、tie、die），加 ing 時要把 ie 改成 y：lie → lying。',
  },
  {
    id: `supp.${ING}#v4`, skillIds: [ING], kind: 'mc',
    stem: 'Amy is ___ English in her room.', answer: 'studying',
    distractors: [opt('studing', 'drop_y'), opt('studiing', 'y_to_i')],
    difficulty: 2, variation: ['subject'],
    explanation: 'y 結尾的動詞加 ing 時，y 要留著，直接加 ing：study → studying（y 不改成 i）。',
  },
  {
    id: `supp.${ING}#v5`, skillIds: [ING], kind: 'mc',
    stem: 'Look! The sun is ___ in the sky.', answer: 'shining',
    distractors: [opt('shinning', 'double_after_silent_e'), opt('shineing', 'keep_silent_e')],
    difficulty: 2, variation: ['context'],
    explanation: 'shine 是不發音的 e 結尾，去 e 加 ing 就好，n 不用重複：shine → shining。',
  },
  {
    id: `supp.${ING}#v6`, skillIds: [ING], kind: 'mc',
    stem: 'Tom is ___ a letter to his grandma.', answer: 'writing',
    distractors: [opt('writting', 'double_after_silent_e'), opt('writeing', 'keep_silent_e')],
    difficulty: 3, variation: ['verb'],
    explanation: 'write 是不發音的 e 結尾，去 e 加 ing：writing。t 不用重複，因為 write 結尾是 e，不是「一個母音 + 一個子音」。',
  },
];

export default items;
