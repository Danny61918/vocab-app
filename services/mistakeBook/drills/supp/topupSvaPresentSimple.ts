import { DrillItem } from '../types';

// Top-up drills (supp2) for the present-simple agreement skills that had only 2-6 items:
// I/you base, third person -s/-es, plural subject, compound subject, don't/doesn't,
// does-question + base verb, short answers. Targets the real errors in data/2026-09-08.ts,
// 2026-10-06.ts, 2026-10-13.ts, 2026-10-23.ts, 2026-10-28.ts, 2026-11-04.ts (dropped -s after
// "but he still", -s kept after combining with "and", "gos", "Yes, there's", Does + -s verb).
// New sub-patterns vs. the existing items: adverbs between subject and verb, -es / -ies / has
// spellings, a singular noun right before the verb (students in my class / Dad after "my sister
// and I"), has after does/doesn't, wh-questions with does, pronoun choice in short answers.

const opt = (text: string, misconception?: string) => (misconception ? { text, misconception } : { text });
const opts = (...texts: string[]) => texts.map((text) => opt(text));

const items: DrillItem[] = [
  // ---- I / you use the base verb ----
  {
    id: 'supp2.G.SVA.I_you_base#v1', skillIds: ['G.SVA.I_you_base'], kind: 'mc',
    stem: 'I always ___ my teeth before bed.', answer: 'brush',
    distractors: [opt('brushes', '3sg_s_on_I'), opt('brushing'), opt('am brush', 'be_plus_base_verb')],
    difficulty: 1, variation: ['verb'],
    explanation: '主詞是 I，動詞用原形 brush。always 夾在中間也不會改變規則，不加 es。',
  },
  {
    id: 'supp2.G.SVA.I_you_base#v2', skillIds: ['G.SVA.I_you_base'], kind: 'mc',
    stem: 'I ___ to bed at nine o\'clock every night.', answer: 'go',
    distractors: [opt('goes', '3sg_s_on_I'), opt('going'), opt('am go', 'be_plus_base_verb')],
    difficulty: 1, variation: ['verb'],
    explanation: '主詞是 I，現在簡單式動詞用原形 go；goes 是給 he／she／it 用的。',
  },
  {
    id: 'supp2.G.SVA.I_you_base#v3', skillIds: ['G.SVA.I_you_base'], kind: 'mc',
    stem: 'My sister likes cats, but I ___ dogs.', answer: 'like',
    distractors: [opt('likes', 'copy_nearby_verb'), opt('liking'), opt('am like', 'be_plus_base_verb')],
    alsoFits: ['love'],
    difficulty: 2, variation: ['subject'],
    explanation: '前半句的主詞是 my sister，所以用 likes；but 後面的主詞換成 I，動詞要用原形 like。每個動詞都要看它自己的主詞。',
  },
  {
    id: 'supp2.G.SVA.I_you_base#v4', skillIds: ['G.SVA.I_you_base'], kind: 'mc',
    stem: 'Ella, you ___ really nice pictures!', answer: 'draw',
    distractors: [opt('draws', '3sg_s_on_you'), opt('drawing'), opt('is draw', 'be_plus_base_verb')],
    difficulty: 2, variation: ['subject'],
    explanation: '這句是對 Ella 說話，主詞是 you。就算 you 只指一個人，動詞也用原形 draw，不加 s。',
  },

  // ---- third person singular takes -s / -es / -ies; have -> has ----
  {
    id: 'supp2.G.SVA.third_person_s#v1', skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'Grandpa is very old, but he still ___ in the park every morning.', answer: 'walks',
    distractors: [opt('walk', 'missing_3sg_s'), opt('walking'), opt('is walk', 'be_plus_base_verb')],
    difficulty: 2, variation: ['subject'],
    explanation: 'but 後面的主詞是 he（第三人稱單數），動詞要加 s：walks。中間有 still 也一樣要加。',
  },
  {
    id: 'supp2.G.SVA.third_person_s#v2', skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'My brother ___ cartoons every Saturday morning.', answer: 'watches',
    distractors: [opt('watch', 'missing_3sg_s'), opt('watchs', 'es_spelling'), opt('watching')],
    difficulty: 2, variation: ['verb'],
    explanation: 'My brother 是 he，動詞要加 s。watch 結尾是 ch，要加 es 變成 watches（像 teach → teaches、wash → washes）。',
  },
  {
    id: 'supp2.G.SVA.third_person_s#v3', skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'Amy ___ math at home every evening.', answer: 'studies',
    distractors: [opt('study', 'missing_3sg_s'), opt('studys', 'ies_spelling'), opt('studying')],
    difficulty: 2, variation: ['verb'],
    explanation: 'Amy 是 she，動詞要加 s。study 是「子音 + y」結尾，要把 y 改成 i 再加 es：studies。（play 這種「母音 + y」就直接加 s：plays。）',
  },
  {
    id: 'supp2.G.SVA.third_person_s#v4', skillIds: ['G.SVA.third_person_s'], kind: 'mc',
    stem: 'My best friend ___ a pet rabbit.', answer: 'has',
    distractors: [opt('have', 'missing_3sg_s'), opt('haves', 'regular_s_on_have'), opt('having')],
    difficulty: 3, variation: ['verb'],
    explanation: 'My best friend 是第三人稱單數，have 要變成 has。have 是特別的字，不是加 s 變 haves。',
  },

  // ---- plural subjects use the base verb ----
  {
    id: 'supp2.G.SVA.plural_subject#v1', skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'My two cousins ___ in Tainan.', answer: 'live',
    distractors: [opt('lives', '3sg_s_on_plural'), opt('living'), opt('is live', 'be_plus_base_verb')],
    difficulty: 1, variation: ['subject'],
    explanation: 'My two cousins 是兩個人（複數），動詞用原形 live，不加 s。',
  },
  {
    id: 'supp2.G.SVA.plural_subject#v2', skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'Many people in Taiwan ___ rice every day.', answer: 'eat',
    distractors: [opt('eats', '3sg_s_on_plural'), opt('eating'), opt('is eat', 'be_plus_base_verb')],
    difficulty: 2, variation: ['subject'],
    explanation: 'people（人們）沒有 s，但它本身就是複數，所以動詞用原形 eat。',
  },
  {
    id: 'supp2.G.SVA.plural_subject#v3', skillIds: ['G.SVA.plural_subject'], kind: 'mc',
    stem: 'The students in my class ___ lunch at twelve o\'clock.', answer: 'have',
    distractors: [opt('has', 'agree_with_nearest_noun'), opt('having'), opt('is have', 'be_plus_base_verb')],
    alsoFits: ['eat'],
    difficulty: 3, variation: ['subject'],
    explanation: '真正的主詞是 the students（複數），不是靠近空格的 class，所以動詞用原形 have，不用 has。',
  },

  // ---- compound subject (A and B) is plural ----
  {
    id: 'supp2.G.SVA.compound_subject#v1', skillIds: ['G.SVA.compound_subject'], kind: 'mc',
    stem: 'Tom and his dad ___ baseball on TV every Sunday.', answer: 'watch',
    distractors: [opt('watches', '3sg_s_on_compound'), opt('watching'), opt('is watch', 'be_plus_base_verb')],
    difficulty: 2, variation: ['subject'],
    explanation: 'Tom and his dad 是兩個人（就是 they），動詞用原形 watch，不加 es。',
  },
  {
    id: 'supp2.G.SVA.compound_subject#v2', skillIds: ['G.SVA.compound_subject'], kind: 'mc',
    stem: 'Grace looks tired. Her brother looks tired, too. Grace and her brother ___ tired.', answer: 'look',
    distractors: [opt('looks', 'keep_s_after_combining'), opt('looking'), opt('is look', 'be_plus_base_verb')],
    alsoFits: ['are', 'feel'],
    difficulty: 3, variation: ['subject'],
    explanation: '分開說時，Grace 和 her brother 各是一個人，所以用 looks；用 and 合在一起就變成兩個人（複數），動詞要變回原形 look。',
  },

  // ---- negatives: don't / doesn't + base verb ----
  {
    id: 'supp2.G.NEG.dont_doesnt#v1', skillIds: ['G.NEG.dont_doesnt'], kind: 'mc',
    stem: 'I ___ TV in the morning. I have no time.', answer: "don't watch",
    distractors: [opt("doesn't watch", 'doesnt_with_I'), opt('not watch', 'missing_do'), opt("don't watches", 's_after_dont')],
    difficulty: 1, variation: ['polarity'],
    explanation: '主詞是 I，否定句用 don\'t，後面接原形 watch。不能只寫 not，要有 don\'t。',
  },
  {
    id: 'supp2.G.NEG.dont_doesnt#v2', skillIds: ['G.NEG.dont_doesnt'], kind: 'mc',
    stem: 'The children ___ to school on Saturdays.', answer: "don't go",
    distractors: [opt("doesn't go", 'doesnt_with_plural'), opt("don't goes", 's_after_dont'), opt("aren't go", 'be_plus_base_verb')],
    difficulty: 2, variation: ['subject', 'polarity'],
    explanation: 'children 是複數（沒有 s 也是複數），否定用 don\'t，後面接原形 go。',
  },
  {
    id: 'supp2.G.NEG.dont_doesnt#v3', skillIds: ['G.NEG.dont_doesnt'], kind: 'mc',
    stem: 'Mr. Lin ___ a car. He takes the bus to work.', answer: "doesn't have",
    distractors: [opt("don't have", 'dont_with_3sg'), opt("doesn't has", 's_after_doesnt'), opt("isn't have", 'be_plus_base_verb')],
    difficulty: 3, variation: ['subject', 'polarity'],
    explanation: 'Mr. Lin 是 he，否定用 doesn\'t；doesn\'t 已經帶了 s，後面要用原形 have，不能用 has。',
  },
  {
    id: 'supp2.G.NEG.dont_doesnt#v4', skillIds: ['G.NEG.dont_doesnt'], kind: 'mc',
    stem: 'My sister and I like cats, but Dad ___ them.', answer: "doesn't like",
    distractors: [opt("don't like", 'copy_nearby_subject'), opt("doesn't likes", 's_after_doesnt'), opt('not like', 'missing_do')],
    difficulty: 3, variation: ['subject', 'polarity'],
    explanation: 'but 後面的主詞是 Dad（he），所以用 doesn\'t，後面接原形 like。前面的 my sister and I 是另一個主詞，不要被它影響。',
  },

  // ---- does-questions: base verb after does; Do / Does choice ----
  {
    id: 'supp2.G.PS.does_question_base#v1', skillIds: ['G.PS.does_question_base'], kind: 'mc',
    stem: 'Does Peter ___ to school by bus?', answer: 'go',
    distractors: [opt('goes', '3sg_s_after_does'), opt('going'), opt('to go')],
    difficulty: 1, variation: ['question'],
    explanation: 'Does 開頭的問句，Does 已經帶了 s，後面的動詞用原形 go。',
  },
  {
    id: 'supp2.G.PS.does_question_base#v2', skillIds: ['G.PS.does_question_base'], kind: 'mc',
    stem: '___ your dog sleep in your bedroom?', answer: 'Does',
    distractors: [opt('Do', 'do_with_3sg'), opt('Is', 'be_plus_base_verb'), opt('Are', 'be_plus_base_verb')],
    difficulty: 2, variation: ['question', 'subject'],
    explanation: 'your dog 是一隻狗（it，第三人稱單數），問句用 Does；後面有原形動詞 sleep，所以不能用 Is／Are。',
  },
  {
    id: 'supp2.G.PS.does_question_base#v3', skillIds: ['G.PS.does_question_base'], kind: 'mc',
    stem: 'Does your school ___ a big library?', answer: 'have',
    distractors: [opt('has', 'has_after_does'), opt('having'), opt('haves')],
    difficulty: 3, variation: ['question', 'verb'],
    explanation: 'Does 後面一定用原形，所以是 have，不是 has。has 已經把 s 交給 Does 了。',
  },
  {
    id: 'supp2.G.PS.does_question_base#v4', skillIds: ['G.PS.does_question_base'], kind: 'mc',
    stem: 'What time does your brother ___ up in the morning?', answer: 'get',
    distractors: [opt('gets', '3sg_s_after_does'), opt('getting'), opt('to get')],
    difficulty: 3, variation: ['question'],
    explanation: 'What time、Where 這種問句裡有 does 時，後面的動詞也用原形：What time does he get up?',
  },

  // ---- short answers: helper verb and pronoun match the question ----
  {
    id: 'supp2.G.PS.short_answer#v1', skillIds: ['G.PS.short_answer'], kind: 'mc',
    stem: 'Do you like apples? Yes, I ___.', answer: 'do',
    distractors: [opt('like', 'repeat_main_verb'), opt('am', 'be_in_do_answer'), opt('does', 'does_with_I')],
    difficulty: 1, variation: ['short_answer'],
    explanation: '問句用 Do，簡答也用 do：Yes, I do. 簡答不重複 like，因為 like 後面一定要接東西。',
  },
  {
    id: 'supp2.G.PS.short_answer#v2', skillIds: ['G.PS.short_answer'], kind: 'mc',
    stem: 'Does your dog like bath time? No, it ___.', answer: "doesn't",
    distractors: [opt("don't", 'dont_with_3sg'), opt("isn't", 'be_in_do_answer'), opt('not', 'missing_do')],
    difficulty: 2, variation: ['short_answer', 'polarity'],
    explanation: '問句用 Does，否定簡答就用 doesn\'t：No, it doesn\'t.',
  },
  {
    id: 'supp2.G.PS.short_answer#v3', skillIds: ['G.PS.short_answer'], kind: 'mc',
    stem: 'Do Amy and Kate like ice cream? Yes, ___ do.', answer: 'they',
    distractors: [opt('she', 'pronoun_for_one_name'), opt('he'), opt('them', 'object_pronoun_as_subject')],
    difficulty: 2, variation: ['short_answer', 'subject'],
    explanation: 'Amy and Kate 是兩個人，簡答要換成代名詞 they：Yes, they do. them 不能當主詞。',
  },
  {
    id: 'supp2.G.PS.short_answer#v4', skillIds: ['G.PS.short_answer'], kind: 'mc',
    stem: 'Is there a park near your home? Yes, ___.', answer: 'there is',
    distractors: [opt("there's", 'contraction_in_positive_short_answer'), opt('there are'), opt('it does')],
    difficulty: 3, variation: ['short_answer'],
    explanation: '問句用 Is there，簡答就用 there is。肯定的簡答最後不能縮寫，所以不能寫 there\'s（否定可以縮寫：No, there isn\'t.）。',
  },
];

export default items;
