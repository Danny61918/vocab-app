import { DrillItem } from '../types';

// Supplementary drills for three grammar skills that had no drill items yet:
// G.COUNT.uncountable, G.BE.agreement, G.MODAL.base_verb (6 items each).
// Targets the real errors in data/2026-09-24.ts, 2026-10-02.ts, 2026-10-06.ts, 2026-10-13.ts
// (cheese/bread/chocolate + are/aren't, some in negatives, jam -> jams, compound subject + is,
// can't + walks). "a pair of" is deliberately avoided (agreement varies between teachers).

const opts = (...texts: string[]) => texts.map((text) => ({ text }));

const count: DrillItem[] = [
  {
    id: 'supp.G.COUNT.uncountable#v1', skillIds: ['G.COUNT.uncountable'], kind: 'mc',
    stem: 'There ___ some milk in the fridge.', answer: 'is',
    distractors: [{ text: 'are', misconception: 'plural_be_with_uncountable' }, { text: 'am' }],
    difficulty: 1, variation: ['context'],
    explanation: 'milk（牛奶）是不可數名詞，不可數名詞當單數看，所以用 There is。',
  },
  {
    id: 'supp.G.COUNT.uncountable#v2', skillIds: ['G.COUNT.uncountable'], kind: 'mc',
    stem: 'My brother drinks a lot of ___ after soccer.', answer: 'water',
    distractors: [{ text: 'waters', misconception: 'plural_s_on_uncountable' }, { text: 'a water', misconception: 'a_with_uncountable' }],
    difficulty: 1, variation: ['subject'],
    explanation: 'water（水）是不可數名詞，不能加 s，前面也不能放 a。a lot of water 就是「很多水」。',
  },
  {
    id: 'supp.G.COUNT.uncountable#v3', skillIds: ['G.COUNT.uncountable'], kind: 'mc',
    stem: 'How ___ rice do you want?', answer: 'much',
    distractors: [{ text: 'many', misconception: 'many_with_uncountable' }, { text: 'any' }],
    difficulty: 2, variation: ['question'],
    explanation: 'rice（米飯）是不可數名詞，問「多少」要用 How much；How many 是給可數的複數名詞用的，例如 How many apples。',
  },
  {
    id: 'supp.G.COUNT.uncountable#v4', skillIds: ['G.COUNT.uncountable'], kind: 'mc',
    stem: 'Tom has a lot of ___ today, so he can\'t play outside.', answer: 'homework',
    distractors: [{ text: 'homeworks', misconception: 'plural_s_on_uncountable' }, { text: 'a homework', misconception: 'a_with_uncountable' }],
    difficulty: 2, variation: ['context'],
    explanation: 'homework（功課）是不可數名詞，就算很多也不能加 s，前面也不能放 a，要說 a lot of homework。',
  },
  {
    id: 'supp.G.COUNT.uncountable#v5', skillIds: ['G.COUNT.uncountable'], kind: 'mc',
    stem: 'Are there ___ eggs in the basket?', answer: 'any',
    distractors: [{ text: 'much', misconception: 'much_with_countable' }, { text: 'a' }],
    alsoFits: ['many', 'some'],
    difficulty: 2, variation: ['question'],
    explanation: 'eggs 是可數名詞的複數，疑問句用 any：Are there any eggs?。much 只能接不可數名詞，a 後面不能接複數。',
  },
  {
    id: 'supp.G.COUNT.uncountable#v6', skillIds: ['G.COUNT.uncountable'], kind: 'mc',
    stem: 'There ___ any juice in the fridge. Let\'s buy some.', answer: "isn't",
    distractors: [{ text: "aren't", misconception: 'plural_be_with_uncountable' }, { text: 'is' }, { text: 'are' }],
    difficulty: 3, variation: ['polarity'],
    explanation: 'juice（果汁）是不可數名詞，要用 is，不能用 aren\'t；後面說要去買，表示沒有了，而且 any 用在否定句，所以是 There isn\'t any juice。',
  },
];

const be: DrillItem[] = [
  {
    id: 'supp.G.BE.agreement#v1', skillIds: ['G.BE.agreement'], kind: 'mc',
    stem: 'There ___ three dogs in the park.', answer: 'are',
    distractors: opts('is', 'am'),
    difficulty: 1, variation: ['subject'],
    explanation: 'three dogs 是複數（三隻狗），所以用 There are。',
  },
  {
    id: 'supp.G.BE.agreement#v2', skillIds: ['G.BE.agreement'], kind: 'mc',
    stem: 'Emma, Ben and Lucy ___ happy today.', answer: 'are',
    distractors: [{ text: 'is', misconception: 'agree_with_last_name_only' }, { text: 'am' }],
    difficulty: 2, variation: ['subject'],
    explanation: '主詞是 Emma、Ben 和 Lucy 三個人，是複數，所以用 are。不要只看最後一個名字 Lucy 就用 is。',
  },
  {
    id: 'supp.G.BE.agreement#v3', skillIds: ['G.BE.agreement'], kind: 'mc',
    stem: 'There ___ a bag of apples on the table.', answer: 'is',
    distractors: [{ text: 'are', misconception: 'agree_with_noun_after_of' }, { text: 'am' }],
    difficulty: 2, variation: ['context'],
    explanation: '這裡真正的東西是 a bag（一袋），一袋是單數，所以用 There is；apples 只是在說袋子裡裝什麼。',
  },
  {
    id: 'supp.G.BE.agreement#v4', skillIds: ['G.BE.agreement'], kind: 'mc',
    stem: 'Every student in my class ___ nine years old.', answer: 'is',
    distractors: [{ text: 'are', misconception: 'every_as_plural' }, { text: 'am' }],
    difficulty: 3, variation: ['subject'],
    explanation: 'every student 是「每一個學生」，後面接單數名詞 student，要當單數看，所以用 is。',
  },
  {
    id: 'supp.G.BE.agreement#v5', skillIds: ['G.BE.agreement'], kind: 'mc',
    stem: '___ there any birds in the tree?', answer: 'Are',
    distractors: opts('Is', 'Am'),
    difficulty: 1, variation: ['question'],
    explanation: 'birds 是複數（有 s），問「有沒有」要用 Are there any birds?。',
  },
  {
    id: 'supp.G.BE.agreement#v6', skillIds: ['G.BE.agreement'], kind: 'mc',
    stem: 'The cookies in the box ___ for Grandma, not for you.', answer: 'are',
    distractors: [{ text: 'is', misconception: 'agree_with_nearest_noun' }, { text: 'am' }],
    difficulty: 2, variation: ['context'],
    explanation: '主詞是 the cookies（餅乾，複數），in the box 只是說餅乾在哪裡，所以用 are，不要看到 box 就用 is。',
  },
];

const modal: DrillItem[] = [
  {
    id: 'supp.G.MODAL.base_verb#v1', skillIds: ['G.MODAL.base_verb'], kind: 'mc',
    stem: 'My sister can ___ very fast.', answer: 'swim',
    distractors: [{ text: 'swims', misconception: 'third_person_s_after_modal' }, { text: 'swimming', misconception: 'ing_after_modal' }, { text: 'to swim', misconception: 'to_after_modal' }],
    difficulty: 1, variation: ['subject'],
    explanation: 'can 後面的動詞一定用原形。就算主詞是 my sister（她），也是 can swim，不加 s、不加 ing、不加 to。',
  },
  {
    id: 'supp.G.MODAL.base_verb#v2', skillIds: ['G.MODAL.base_verb'], kind: 'mc',
    stem: 'The baby is only one, so he can\'t ___ yet.', answer: 'walk',
    distractors: [{ text: 'walks', misconception: 'third_person_s_after_modal' }, { text: 'walking', misconception: 'ing_after_modal' }, { text: 'to walk', misconception: 'to_after_modal' }],
    difficulty: 1, variation: ['polarity'],
    explanation: 'can\'t 後面也要接動詞原形：can\'t walk，不能寫 walks。',
  },
  {
    id: 'supp.G.MODAL.base_verb#v3', skillIds: ['G.MODAL.base_verb'], kind: 'mc',
    stem: 'It\'s cold outside. You should ___ a coat.', answer: 'wear',
    distractors: [{ text: 'wears' }, { text: 'wearing', misconception: 'ing_after_modal' }, { text: 'to wear', misconception: 'to_after_modal' }],
    difficulty: 2, variation: ['verb', 'context'],
    explanation: 'should（應該）跟 can 一樣是助動詞，後面接動詞原形：should wear。',
  },
  {
    id: 'supp.G.MODAL.base_verb#v4', skillIds: ['G.MODAL.base_verb'], kind: 'mc',
    stem: 'We must ___ quiet in the library.', answer: 'be',
    distractors: [{ text: 'are', misconception: 'conjugated_be_after_modal' }, { text: 'is' }, { text: 'being', misconception: 'ing_after_modal' }],
    difficulty: 2, variation: ['verb'],
    explanation: 'must（必須）後面接動詞原形。am、is、are 的原形是 be，所以是 must be quiet。',
  },
  {
    id: 'supp.G.MODAL.base_verb#v5', skillIds: ['G.MODAL.base_verb'], kind: 'mc',
    stem: 'Can your dad ___ a car?', answer: 'drive',
    distractors: [{ text: 'drives', misconception: 'third_person_s_after_modal' }, { text: 'driving', misconception: 'ing_after_modal' }, { text: 'to drive', misconception: 'to_after_modal' }],
    difficulty: 2, variation: ['question'],
    explanation: '問句 Can your dad...? 裡，can 已經放到前面了，後面的動詞還是用原形 drive，不加 s。',
  },
  {
    id: 'supp.G.MODAL.base_verb#v6', skillIds: ['G.MODAL.base_verb'], kind: 'mc',
    stem: 'Amy is sick, so she ___ go to school today.', answer: "can't",
    distractors: [{ text: "doesn't can", misconception: 'do_support_with_modal' }, { text: "can't to", misconception: 'to_after_modal' }, { text: "can'ts", misconception: 'third_person_s_on_modal' }],
    alsoFits: ["won't", "shouldn't"],
    difficulty: 3, variation: ['polarity', 'context'],
    explanation: 'can 的否定就是 can\'t，後面直接接原形 go。不用 doesn\'t，不加 to，can 本身也不會加 s。',
  },
];

const items: DrillItem[] = [...count, ...be, ...modal];
export default items;
