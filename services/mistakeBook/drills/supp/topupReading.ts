import { DrillItem } from '../types';

// Top-up drills for the three reading skills (main idea / infer / detail), which had only 2 items each.
// Modeled on the child's real mistakes in data/2026-10-28.ts (E Reading 1): pick the title that sums up
// the whole story (not one part of it), infer what a character feels or fears from clues, and answer
// who/what/when/which-is-true from what the story actually says. Each stem is a short original passage
// followed by one blank; every distractor is contradicted by, or not supported by, the passage.

const opt = (text: string, misconception?: string) => (misconception ? { text, misconception } : { text });
const opts = (...texts: string[]) => texts.map((t) => opt(t));

const MAIN = 'R.MAIN_IDEA';
const INFER = 'R.INFER';
const DETAIL = 'R.DETAIL';

const items: DrillItem[] = [
  // ---- R.MAIN_IDEA ----
  {
    id: `supp2.${MAIN}#v1`, skillIds: [MAIN], kind: 'mc',
    stem: 'Tom has a new puppy. He feeds it every morning. He walks it after school. At night, the puppy sleeps next to his bed. The best title is ___.',
    answer: 'Tom Takes Care of His Puppy',
    distractors: [
      opt('Tom\'s New Bed', 'picks_a_detail_not_the_main_idea'),
      opt('Animals Around the World', 'title_too_broad'),
      opt('A Rainy Day', 'off_topic'),
    ],
    alsoFits: ['Tom and His New Puppy'],
    difficulty: 1, variation: ['context'],
    explanation: '每一句都在說 Tom 怎麼照顧小狗：早上餵牠、放學遛牠、晚上陪牠睡。所以標題是 Tom Takes Care of His Puppy。床只是其中一個小細節。',
  },
  {
    id: `supp2.${MAIN}#v2`, skillIds: [MAIN], kind: 'mc',
    stem: 'Lily\'s grandma lives on a farm. Every summer, Lily visits her. They pick apples, feed the chickens, and swim in the river. Lily loves her summers on the farm. The best title is ___.',
    answer: 'Summer at Grandma\'s Farm',
    distractors: [
      opt('Feeding the Chickens', 'picks_a_detail_not_the_main_idea'),
      opt('Lily\'s First Day at School', 'off_topic'),
      opt('How to Grow Apples', 'off_topic'),
    ],
    difficulty: 2, variation: ['context'],
    explanation: '整篇在講 Lily 每年夏天去奶奶農場做的事，最後一句也說她很愛農場的夏天。餵雞只是其中一件事，太小了；文章沒有教怎麼種蘋果。',
  },
  {
    id: `supp2.${MAIN}#v3`, skillIds: [MAIN], kind: 'mc',
    stem: 'Ken was afraid of the water, so he did not want to go to swimming class. His dad said, "Try one small step every day." First Ken put his face in the water. Then he learned to kick. Soon he could swim! The best title is ___.',
    answer: 'Small Steps Help Ken Swim',
    distractors: [
      opt('Ken Is Afraid of the Water', 'picks_only_the_beginning'),
      opt('A Fun Day at the Beach', 'off_topic'),
      opt('Dad\'s New Job', 'off_topic'),
    ],
    difficulty: 3, variation: ['context'],
    explanation: '爸爸教 Ken「每天試一小步」，最後 Ken 學會游泳了，這才是整個故事的重點。Ken 怕水只是故事的開頭，而且最後他已經不怕、會游了。',
  },
  {
    id: `supp2.${MAIN}#v4`, skillIds: [MAIN], kind: 'mc',
    stem: 'Our class planted a garden. We put seeds in the soil and gave them water every day. After four weeks, we had tomatoes and beans to eat. The main idea is that ___.',
    answer: 'the class grew food in a garden',
    distractors: [
      opt('the class gave the seeds water', 'picks_a_detail_not_the_main_idea'),
      opt('the class bought vegetables at a market', 'contradicts_the_story'),
      opt('everyone in the class loves tomatoes', 'not_in_the_story'),
    ],
    difficulty: 2, variation: ['context'],
    explanation: '全班種菜、澆水，最後收成番茄和豆子，重點是「全班在花園種出食物」。澆水只是其中一個步驟；菜是自己種的，不是去市場買的；文章也沒說大家都愛番茄。',
  },

  // ---- R.INFER ----
  {
    id: `supp2.${INFER}#v1`, skillIds: [INFER], kind: 'mc',
    stem: 'Amy\'s goldfish died this morning. She did not eat her breakfast, and tears ran down her face. Amy felt ___.',
    answer: 'sad',
    distractors: opts('excited', 'proud', 'bored'),
    alsoFits: ['unhappy', 'upset'],
    difficulty: 1, variation: ['context'],
    explanation: '金魚死了、吃不下早餐、還流眼淚（tears），這些線索都表示 Amy 很難過：sad。',
  },
  {
    id: `supp2.${INFER}#v2`, skillIds: [INFER], kind: 'mc',
    stem: 'Jack has a math test tomorrow. He left his math book at school, so he cannot study tonight. Jack is worried that he will ___.',
    answer: 'not do well on the test',
    distractors: [
      opt('miss the school bus', 'not_in_the_story'),
      opt('eat too much for dinner', 'not_in_the_story'),
      opt('get a new math book', 'not_in_the_story'),
    ],
    difficulty: 2, variation: ['context'],
    explanation: '明天要考數學，但課本留在學校、今晚不能讀書，所以 Jack 擔心考不好：not do well on the test。其他選項文章完全沒提到。',
  },
  {
    id: `supp2.${INFER}#v3`, skillIds: [INFER], kind: 'mc',
    stem: 'Ben\'s grandpa is coming to visit today. Ben has not seen him for a whole year. Ben runs to the window again and again to look for his car. Ben feels ___.',
    answer: 'excited',
    distractors: opts('bored', 'sleepy', 'angry'),
    alsoFits: ['happy', 'eager'],
    difficulty: 2, variation: ['context'],
    explanation: '一整年沒見到爺爺，今天爺爺要來，Ben 一直跑到窗邊看爺爺的車來了沒，表示他很期待、很興奮：excited。',
  },
  {
    id: `supp2.${INFER}#v4`, skillIds: [INFER], kind: 'mc',
    stem: 'Max broke his mom\'s favorite cup. He hid the pieces under the sofa and did not tell anyone. Max hid the pieces because he was afraid his mom would be ___.',
    answer: 'angry',
    distractors: [
      opt('happy', 'opposite_feeling'),
      opt('proud', 'opposite_feeling'),
      opt('hungry', 'not_a_feeling_from_the_clue'),
    ],
    alsoFits: ['mad', 'upset', 'sad'],
    difficulty: 3, variation: ['context'],
    explanation: '打破媽媽「最喜歡」的杯子，還把碎片藏起來不敢說，表示 Max 怕媽媽會生氣：angry。打破東西媽媽不會開心或驕傲。',
  },

  // ---- R.DETAIL ----
  {
    id: `supp2.${DETAIL}#v1`, skillIds: [DETAIL], kind: 'mc',
    stem: 'Peter has two pets, a cat and a rabbit. The cat is white. The rabbit is brown. According to the story, the rabbit is ___.',
    answer: 'brown',
    distractors: [
      opt('white', 'mixes_up_two_characters'),
      opt('black', 'not_in_the_story'),
      opt('gray', 'not_in_the_story'),
    ],
    difficulty: 1, variation: ['context'],
    explanation: '文章說 The rabbit is brown，兔子是咖啡色。白色的是貓，不要搞混了。',
  },
  {
    id: `supp2.${DETAIL}#v2`, skillIds: [DETAIL], kind: 'mc',
    stem: 'On Saturday, Jenny went to the library with her brother. On Sunday, she helped her mom cook dinner. According to the story, Jenny went to the library on ___.',
    answer: 'Saturday',
    distractors: [
      opt('Sunday', 'mixes_up_two_events'),
      opt('Monday', 'not_in_the_story'),
      opt('Friday', 'not_in_the_story'),
    ],
    difficulty: 2, variation: ['context'],
    explanation: '第一句說 On Saturday, Jenny went to the library，所以去圖書館是星期六。星期天她是幫媽媽煮晚餐。',
  },
  {
    id: `supp2.${DETAIL}#v3`, skillIds: [DETAIL], kind: 'mc',
    stem: 'Ray wanted to make a cake. His sister got the eggs, and his dad turned on the oven. Ray mixed everything in a big bowl. According to the story, ___ turned on the oven.',
    answer: 'Ray\'s dad',
    distractors: [
      opt('Ray\'s sister', 'mixes_up_two_characters'),
      opt('Ray', 'mixes_up_two_characters'),
      opt('Ray\'s mom', 'not_in_the_story'),
    ],
    difficulty: 2, variation: ['context'],
    explanation: '文章說 his dad turned on the oven，是爸爸開烤箱。姊姊（妹妹）拿蛋，Ray 自己攪拌，媽媽沒有出現在故事裡。',
  },
  {
    id: `supp2.${DETAIL}#v4`, skillIds: [DETAIL], kind: 'mc',
    stem: 'Kelly lost her pencil case at the park. She looked under the bench, but it was not there. Then a boy gave it back to her. It was next to the slide. According to the story, it is true that ___.',
    answer: 'the pencil case was next to the slide',
    distractors: [
      opt('the pencil case was under the bench', 'misses_the_word_not'),
      opt('Kelly lost her pencil case at school', 'contradicts_the_story'),
      opt('Kelly never got her pencil case back', 'contradicts_the_story'),
    ],
    alsoFits: ['a boy gave the pencil case back to Kelly'],
    difficulty: 3, variation: ['context'],
    explanation: '最後一句說 It was next to the slide，鉛筆盒在溜滑梯旁邊。長椅下面 it was not there（不在那裡）；她是在公園弄丟的；一個男孩已經把它還給她了。',
  },
];

export default items;
