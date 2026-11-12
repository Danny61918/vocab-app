import { DrillItem } from '../types';

// Top-up drills (supp2) for V.COLLOC, V.POS_SLOT, V.POLYSEMY and R.CLIL.science, which had too few
// items. Words/sub-patterns are deliberately different from the existing items in 2026-11-04.ts
// (catch a cold, sit/stay still, traffic jam, health words) and 2026-10-28.ts (sea warm, grid).
// Science facts come only from topicReview/data/water-cycle.ts (Incredible English 4, U1 L9) and
// target the child's real evaporation/condensation and "hotter air" mistakes.

const opt = (text: string, misconception?: string) => (misconception ? { text, misconception } : { text });
const opts = (...texts: string[]) => texts.map((t) => opt(t));

const colloc: DrillItem[] = [
  {
    id: 'supp2.V.COLLOC#v1', skillIds: ['V.COLLOC'], kind: 'mc',
    stem: 'It rained a lot last night. There was ___ rain, and the streets were full of water.',
    answer: 'heavy',
    distractors: [opt('big', 'chinese_literal_da_yu'), opt('fast'), opt('tall')],
    difficulty: 2, variation: ['context'],
    explanation: '「大雨」英文要說 heavy rain（很重的雨），不能照中文說 big rain。就像 heavy traffic（交通很擠）一樣，heavy 是固定搭配。',
  },
  {
    id: 'supp2.V.COLLOC#v2', skillIds: ['V.COLLOC'], kind: 'mc',
    stem: 'I ___ my homework after dinner every day. Then I can watch TV.',
    answer: 'do',
    distractors: [opt('make', 'do_make_confusion'), opt('play'), opt('take')],
    alsoFits: ['finish', 'start', 'check'],
    difficulty: 1, variation: ['verb'],
    explanation: '「寫功課」英文是 do my homework，是固定搭配；不能說 make my homework。',
  },
];

const posSlot: DrillItem[] = [
  {
    id: 'supp2.V.POS_SLOT#v1', skillIds: ['V.POS_SLOT'], kind: 'mc',
    stem: 'Playing with fire is very ___. Please never do it!',
    answer: 'dangerous',
    distractors: [opt('danger', 'noun_after_be'), opt('dangers', 'noun_after_be')],
    difficulty: 2, variation: ['context'],
    explanation: 'is very 後面要接形容詞。dangerous 是「危險的」（形容詞）；danger 是「危險」（名詞），不能放在 very 後面。',
  },
  {
    id: 'supp2.V.POS_SLOT#v2', skillIds: ['V.POS_SLOT'], kind: 'mc',
    stem: 'Look up! There is a big white ___ in the sky. It looks like a sheep.',
    answer: 'cloud',
    distractors: [opt('cloudy', 'adj_after_article'), opt('clouds', 'plural_after_a')],
    difficulty: 1, variation: ['context'],
    explanation: 'a big white 後面要接一個名詞：a cloud（一朵雲）。cloudy 是形容詞「多雲的」；clouds 是很多朵，不能跟 a 一起用。',
  },
  {
    id: 'supp2.V.POS_SLOT#v3', skillIds: ['V.POS_SLOT'], kind: 'mc',
    stem: 'Ben is very sleepy. He wants to ___ now.',
    answer: 'sleep',
    distractors: [opt('sleepy', 'adj_after_to'), opt('asleep', 'adj_after_to')],
    difficulty: 2, variation: ['verb'],
    explanation: 'wants to 後面要接動詞原形：sleep（睡覺）。sleepy（想睡的）和 asleep（睡著的）都是形容詞，不能放在 to 後面。',
  },
];

const polysemy: DrillItem[] = [
  {
    id: 'supp2.V.POLYSEMY#v1', skillIds: ['V.POLYSEMY'], kind: 'mc',
    stem: 'Hold your pencil in your ___ hand, and hold the paper with your left hand.',
    answer: 'right',
    distractors: [opt('correct', 'right_only_means_correct'), opt('true', 'right_only_means_correct'), opt('left')],
    difficulty: 1, variation: ['context'],
    explanation: 'right 有兩個意思：「對的」和「右邊的」。這裡和 left hand（左手）相對，所以是 right hand（右手）。correct、true 只有「對的」意思，不能指右手。',
  },
  {
    id: 'supp2.V.POLYSEMY#v2', skillIds: ['V.POLYSEMY'], kind: 'mc',
    stem: 'My school bag is very ___ today. It only has one small book in it, so it is easy to carry.',
    answer: 'light',
    distractors: [opt('heavy'), opt('full'), opt('dark', 'light_only_means_lamp')],
    difficulty: 2, variation: ['context'],
    explanation: 'light 除了「光、燈」，也有「輕的」意思。書包裡只有一本小書、很好拿，所以是 light（輕的）。heavy 是重的、full 是滿的，都和句意相反。',
  },
  {
    id: 'supp2.V.POLYSEMY#v3', skillIds: ['V.POLYSEMY'], kind: 'mc',
    stem: 'What ___ of fruit do you like? I like apples and bananas.',
    answer: 'kind',
    distractors: [opt('nice', 'kind_only_means_nice'), opt('friendly', 'kind_only_means_nice'), opt('much')],
    alsoFits: ['type', 'sort'],
    difficulty: 2, variation: ['question'],
    explanation: 'kind 除了「親切的」，還有「種類」的意思：What kind of fruit…? 是「你喜歡哪一種水果？」。nice、friendly 只有「好、友善」的意思，不能這樣用。',
  },
  {
    id: 'supp2.V.POLYSEMY#v4', skillIds: ['V.POLYSEMY'], kind: 'mc',
    stem: 'Our class is acting in a ___ about a brave little bear. I am the bear, and Amy is the rabbit.',
    answer: 'play',
    distractors: [opt('game', 'play_only_means_have_fun'), opt('sport'), opt('toy')],
    alsoFits: ['show'],
    difficulty: 3, variation: ['context'],
    explanation: 'play 除了「玩」，也可以當名詞「戲劇、話劇」。全班一起演、每個人扮演一個角色，就是 a play（一齣戲）。game 是遊戲，不是用來「演」的。',
  },
];

const science: DrillItem[] = [
  {
    id: 'supp2.R.CLIL.science#v1', skillIds: ['R.CLIL.science'], kind: 'mc',
    stem: 'The sun warms the water in the sea. The water becomes water vapour and goes up into the air. This process is called ___.',
    answer: 'evaporation',
    distractors: [opt('condensation', 'evaporation_condensation_swap'), opt('rain'), opt('snow')],
    difficulty: 2, variation: ['context'],
    explanation: '太陽把水曬熱，水變成水蒸氣往上飄，叫 evaporation（蒸發）。condensation（凝結）是反過來：水蒸氣遇冷變回小水滴。記法：熱 → 蒸發，冷 → 凝結。',
  },
  {
    id: 'supp2.R.CLIL.science#v2', skillIds: ['R.CLIL.science'], kind: 'mc',
    stem: 'High in the sky, the air is ___. When the water vapour meets this air, it becomes very small drops of water that form clouds.',
    answer: 'cooler',
    distractors: [opt('hotter', 'condensation_needs_heat'), opt('warmer', 'condensation_needs_heat')],
    difficulty: 3, variation: ['context'],
    explanation: '高空的空氣比較冷（cooler）。水蒸氣遇到冷空氣，才會變成小水滴、形成雲，這叫 condensation（凝結）。不是遇到熱空氣喔！',
  },
];

const items: DrillItem[] = [...colloc, ...posSlot, ...polysemy, ...science];

export default items;
