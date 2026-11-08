import { DrillItem } from './types';
import mistakes from '../data/2026-10-28';

// Practice items grown from the 23 mistakes in data/2026-10-28.ts (seeds are looked up by array
// index, so that file's order must not change). Every item was written so that exactly ONE option
// is acceptable: distractors are either ungrammatical in the slot or contradict the sentence, and
// words that also fit (relax / have a rest) are listed in alsoFits and never offered as options.
// The ambiguous originals (B-1 Q6/Q7 relax vs have a rest, C Q8 "is have") are not reused as-is.
//
// Id = `${seed mistake id}#v${n}`.

const SEED = {
  atATime: mistakes[0].id,      // A Q5
  asWellAs: mistakes[1].id,     // A Q7
  allTheTime: mistakes[2].id,   // A Q8
  afterAll: mistakes[3].id,     // A Q9
  relax: mistakes[4].id,        // B-1 Q7
  goForWalk: mistakes[5].id,    // B-1 Q11
  interview: mistakes[6].id,    // B-2 Q4
  several: mistakes[7].id,      // B-2 Q5
  research: mistakes[8].id,     // B-2 Q6
  trip: mistakes[9].id,         // B-2 Q7
  pirate: mistakes[10].id,      // B-2 Q8
  their: mistakes[11].id,       // C Q6
  progressive: mistakes[12].id, // C Q8
  seaWarm: mistakes[13].id,     // D Q5
  grid: mistakes[14].id,        // D Q9
  title: mistakes[15].id,       // E Q1
  afraid: mistakes[16].id,      // E Q2
  noOne: mistakes[17].id,       // E Q3
  trueStmt: mistakes[18].id,    // E Q6
  compound: mistakes[19].id,    // F Q1
  copyNY: mistakes[20].id,      // F Q2
  mother: mistakes[21].id,      // F Q4
  comma: mistakes[22].id,       // F Q5
};

const opts = (...texts: string[]) => texts.map((text) => ({ text }));

const phrases: DrillItem[] = [
  // ---- at a time ----
  {
    id: `${SEED.atATime}#v1`, seedMistakeId: SEED.atATime, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'The elevator is small, so only three people can get in ___.', answer: 'at a time',
    distractors: opts('after all', 'all the time', 'as well as'), targetWords: ['at a time'],
    difficulty: 1, variation: ['context'], explanation: 'at a time 是「一次、每次」。電梯很小，一次只能進三個人。',
  },
  {
    id: `${SEED.atATime}#v2`, seedMistakeId: SEED.atATime, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'The teacher called the students into the room one ___, not all together.', answer: 'at a time',
    distractors: opts('after all', 'all the time', 'as well as'), targetWords: ['at a time'],
    difficulty: 1, variation: ['context'], explanation: 'one at a time 是「一次一個」。老師讓學生一個一個進教室，而不是全部一起。',
  },
  // ---- as well as ----
  {
    id: `${SEED.asWellAs}#v1`, seedMistakeId: SEED.asWellAs, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'Mia plays the piano ___ the violin.', answer: 'as well as',
    distractors: opts('at a time', 'after all', 'all the time'), targetWords: ['as well as'],
    difficulty: 1, variation: ['context'], explanation: 'as well as 是「以及、還有」，連接兩樣樂器：會彈鋼琴，也會拉小提琴。',
  },
  {
    id: `${SEED.asWellAs}#v2`, seedMistakeId: SEED.asWellAs, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'We bought apples ___ oranges at the market.', answer: 'as well as',
    distractors: opts('at a time', 'after all', 'all the time'), targetWords: ['as well as'],
    difficulty: 1, variation: ['subject'], explanation: 'as well as 把 apples 和 oranges 並列在一起，意思是「蘋果，還有柳橙」。',
  },
  // ---- all the time ----
  {
    id: `${SEED.allTheTime}#v1`, seedMistakeId: SEED.allTheTime, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'My little brother talks ___. He never stops.', answer: 'all the time',
    distractors: opts('at a time', 'as well as', 'after all'), targetWords: ['all the time'],
    difficulty: 1, variation: ['context'], explanation: 'all the time 是「一直、老是」。弟弟老是在講話，從來不停。',
  },
  {
    id: `${SEED.allTheTime}#v2`, seedMistakeId: SEED.allTheTime, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'Tom is always hungry. He eats snacks ___.', answer: 'all the time',
    distractors: opts('at a time', 'as well as', 'after all'), targetWords: ['all the time'],
    difficulty: 1, variation: ['subject'], explanation: 'Tom 總是很餓，所以他「老是」在吃點心：all the time。',
  },
  // ---- after all ----
  {
    id: `${SEED.afterAll}#v1`, seedMistakeId: SEED.afterAll, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'Don\'t be angry with him. ___, he is only five years old.', answer: 'After all',
    distractors: opts('At a time', 'All the time', 'As well as'), targetWords: ['after all'],
    difficulty: 2, variation: ['context'], explanation: 'After all 是「畢竟」，用來補充理由：別生他的氣，畢竟他才五歲。',
  },
  {
    id: `${SEED.afterAll}#v2`, seedMistakeId: SEED.afterAll, skillIds: ['V.PHRASE'], kind: 'mc',
    stem: 'You should forgive Anna. ___, everyone makes mistakes.', answer: 'After all',
    distractors: opts('At a time', 'All the time', 'As well as'), targetWords: ['after all'],
    difficulty: 2, variation: ['context'], explanation: 'After all 是「畢竟」，用來說明原諒她的理由：畢竟每個人都會犯錯。',
  },
];

const words: DrillItem[] = [
  // ---- relax (have a rest also fits, so it is never offered) ----
  {
    id: `${SEED.relax}#v1`, seedMistakeId: SEED.relax, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'After a busy week, my father likes to ___ on the sofa and listen to soft music.', answer: 'relax',
    distractors: opts('raise', 'scare', 'schedule'), alsoFits: ['rest', 'have a rest'], targetWords: ['relax'],
    difficulty: 1, variation: ['context'], explanation: 'relax 是「放鬆」。忙了一個星期，爸爸想坐在沙發上放鬆、聽輕柔的音樂。',
  },
  {
    id: `${SEED.relax}#v2`, seedMistakeId: SEED.relax, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'Yoga helps me ___ when I feel nervous.', answer: 'relax',
    distractors: opts('raise', 'scare', 'wash'), targetWords: ['relax'],
    difficulty: 1, variation: ['context'], explanation: 'relax 是「放鬆」。做瑜伽可以幫助我在緊張的時候放鬆下來。',
  },
  // ---- go for a walk ----
  {
    id: `${SEED.goForWalk}#v1`, seedMistakeId: SEED.goForWalk, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'It\'s a lovely evening. Let\'s ___ along the river.', answer: 'go for a walk',
    distractors: opts('write an email', 'do the dishes', 'brush our teeth'), targetWords: ['go for a walk'],
    difficulty: 1, variation: ['context'], explanation: 'go for a walk 是「去散步」。傍晚天氣很好，沿著河邊散步最適合。',
  },
  {
    id: `${SEED.goForWalk}#v2`, seedMistakeId: SEED.goForWalk, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'My grandparents ___ in the park every morning to stay healthy.', answer: 'go for a walk',
    distractors: opts('write emails', 'do the dishes', 'sleep late'), targetWords: ['go for a walk'],
    difficulty: 1, variation: ['subject'], explanation: '爺爺奶奶每天早上在公園「散步」來保持健康：go for a walk。主詞是複數，動詞用原形。',
  },
  // ---- interview ----
  {
    id: `${SEED.interview}#v1`, seedMistakeId: SEED.interview, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'The reporter had a short ___ with the football player after the game.', answer: 'interview',
    distractors: opts('countryside', 'cartoonist', 'shelf'), targetWords: ['interview'],
    difficulty: 1, variation: ['context'], explanation: 'interview 是「訪問」。記者在比賽後訪問了足球選手。',
  },
  {
    id: `${SEED.interview}#v2`, seedMistakeId: SEED.interview, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'Before the job ___, my uncle put on a nice shirt and a tie.', answer: 'interview',
    distractors: opts('countryside', 'cartoonist', 'shelf'), targetWords: ['interview'],
    difficulty: 2, variation: ['context'], explanation: 'job interview 是「工作面試」。面試前叔叔穿上好看的襯衫、打領帶。',
  },
  // ---- several ----
  {
    id: `${SEED.several}#v1`, seedMistakeId: SEED.several, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'I have visited that museum ___ times. I know it very well.', answer: 'several',
    distractors: opts('wide', 'quiet', 'tall'), targetWords: ['several'],
    difficulty: 1, variation: ['context'], explanation: 'several times 是「好幾次」。去了好幾次，所以對博物館很熟。',
  },
  {
    id: `${SEED.several}#v2`, seedMistakeId: SEED.several, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'There are ___ apples on the table, but I only want one.', answer: 'several',
    distractors: opts('wide', 'quiet', 'angry'), targetWords: ['several'],
    difficulty: 1, variation: ['context'], explanation: 'several 是「好幾個」，後面接複數名詞 apples。桌上有好幾顆蘋果，我只想要一顆。',
  },
  // ---- research ----
  {
    id: `${SEED.research}#v1`, seedMistakeId: SEED.research, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'Doctors do ___ to find a new medicine for the disease.', answer: 'research',
    distractors: opts('tricks', 'dishes', 'shopping'), targetWords: ['research'],
    difficulty: 2, variation: ['context'], explanation: 'do research 是「做研究」。醫生為了找新藥而做研究。',
  },
  {
    id: `${SEED.research}#v2`, seedMistakeId: SEED.research, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'The scientist spent ten years on ___ about how bees find flowers.', answer: 'research',
    distractors: opts('pizza', 'magic', 'shopping'), targetWords: ['research'],
    difficulty: 2, variation: ['context'], explanation: 'research 是「研究」。科學家花十年研究蜜蜂怎麼找到花。',
  },
  // ---- trip ----
  {
    id: `${SEED.trip}#v1`, seedMistakeId: SEED.trip, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'Our class went on a school ___ to the science museum.', answer: 'trip',
    distractors: opts('minute', 'comics', 'artist'), targetWords: ['trip'],
    difficulty: 1, variation: ['context'], explanation: 'go on a trip 是「去旅行、出遊」，school trip 是校外教學。',
  },
  {
    id: `${SEED.trip}#v2`, seedMistakeId: SEED.trip, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'It was a long bus ___ from Taipei to Kaohsiung.', answer: 'trip',
    distractors: opts('minute', 'comics', 'surprise'), targetWords: ['trip'],
    difficulty: 1, variation: ['context'], explanation: 'bus trip 是「搭巴士的旅程」。從台北到高雄是一趟很長的旅程。',
  },
  // ---- pirate ----
  {
    id: `${SEED.pirate}#v1`, seedMistakeId: SEED.pirate, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'The ___ hid the gold on a small island and drew a map to find it again.', answer: 'pirate',
    distractors: opts('planet', 'mountain', 'shelf'), targetWords: ['pirate'],
    difficulty: 1, variation: ['context'], explanation: '藏寶藏、畫藏寶圖的是「海盜」：pirate。',
  },
  {
    id: `${SEED.pirate}#v2`, seedMistakeId: SEED.pirate, skillIds: ['V.CONTEXT'], kind: 'mc',
    stem: 'A ___ ship has a black flag, and its captain looks for treasure.', answer: 'pirate',
    distractors: opts('planet', 'mountain', 'shelf'), targetWords: ['pirate'],
    difficulty: 1, variation: ['context'], explanation: 'pirate ship 是「海盜船」，黑旗和找寶藏都是海盜的特徵。',
  },
];

const grammar: DrillItem[] = [
  // ---- their / its ----
  {
    id: `${SEED.their}#v1`, seedMistakeId: SEED.their, skillIds: ['G.POSS.their_its'], kind: 'mc',
    stem: 'The cows are eating grass. Look at ___ big black spots!', answer: 'their',
    distractors: opts('its', 'theirs', 'it\'s'),
    difficulty: 1, variation: ['subject'], explanation: 'cows 是複數，「牠們的」用 their，後面接名詞 spots。its 是單數，theirs 後面不接名詞，it\'s 是 it is。',
  },
  {
    id: `${SEED.their}#v2`, seedMistakeId: SEED.their, skillIds: ['G.POSS.their_its'], kind: 'mc',
    stem: 'The little bird is singing in the tree. ___ song is beautiful.', answer: 'Its',
    distractors: opts('Their', 'Theirs', 'It\'s'),
    difficulty: 2, variation: ['subject'], explanation: 'bird 是一隻（單數），「牠的」用 its，後面接名詞 song。Their 是複數，It\'s 是 it is。',
  },
  {
    id: `${SEED.their}#v3`, seedMistakeId: SEED.their, skillIds: ['G.POSS.their_its'], kind: 'mc',
    stem: 'The boys left ___ shoes at the door.', answer: 'their',
    distractors: opts('its', 'theirs', 'they\'re'),
    difficulty: 1, variation: ['subject'], explanation: 'boys 是複數，「他們的」用 their，後面接名詞 shoes。they\'re 是 they are。',
  },
  // ---- present continuous ----
  {
    id: `${SEED.progressive}#v1`, seedMistakeId: SEED.progressive, skillIds: ['G.PROG.present_continuous'], kind: 'mc',
    stem: 'My brothers ___ soccer in the park at the moment.', answer: 'are playing',
    distractors: opts('play', 'is playing', 'playing'),
    difficulty: 2, variation: ['context'], explanation: 'at the moment（此刻）要用現在進行式 be + V-ing。brothers 是複數，所以用 are playing。',
  },
  {
    id: `${SEED.progressive}#v2`, seedMistakeId: SEED.progressive, skillIds: ['G.PROG.present_continuous'], kind: 'mc',
    stem: 'Mom ___ dinner at the moment, so please be quiet.', answer: 'is cooking',
    distractors: opts('cooks', 'cooking', 'are cooking'),
    difficulty: 2, variation: ['subject'], explanation: 'at the moment 要用現在進行式。Mom 是單數，用 is cooking；cooking 前面缺 be 動詞。',
  },
  {
    id: `${SEED.progressive}#v3`, seedMistakeId: SEED.progressive, skillIds: ['G.PROG.present_continuous'], kind: 'mc',
    stem: 'Tom ___ TV right now. He is doing his homework.', answer: 'isn\'t watching',
    distractors: opts('isn\'t watch', 'doesn\'t watching', 'not watching'),
    difficulty: 2, variation: ['polarity'], explanation: 'right now 要用現在進行式，否定是 isn\'t + V-ing。isn\'t watch 少了 -ing，doesn\'t watching 助動詞用錯，not watching 缺 be 動詞。',
  },
  // ---- compound subject ----
  {
    id: `${SEED.compound}#v1`, seedMistakeId: SEED.compound, skillIds: ['G.SVA.compound_subject'], kind: 'mc',
    stem: 'Ben and Tom ___ soccer after school every day.', answer: 'play',
    distractors: opts('plays', 'playing', 'is play'),
    difficulty: 1, variation: ['subject'], explanation: 'Ben and Tom 是兩個人（複數主詞），動詞用原形 play，不加 s。',
  },
  {
    id: `${SEED.compound}#v2`, seedMistakeId: SEED.compound, skillIds: ['G.SVA.compound_subject'], kind: 'mc',
    stem: 'My mother and my aunt ___ to the market on Sundays.', answer: 'go',
    distractors: opts('goes', 'going', 'is go'),
    difficulty: 1, variation: ['subject'], explanation: 'My mother and my aunt 是兩個人，複數主詞，動詞用原形 go。',
  },
  // ---- comma in a list of three actions ----
  {
    id: `${SEED.comma}#v1`, seedMistakeId: SEED.comma, skillIds: ['M.COMMA.series'], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'Anna washes the dishes, cleans the table and goes to bed.',
    distractors: opts(
      'Anna washes the dishes cleans the table and goes to bed.',
      'Anna, washes the dishes cleans the table and goes to bed.',
      'Anna washes the dishes cleans, the table and goes to bed.'
    ),
    difficulty: 2, variation: ['context'], explanation: '三個動作並列要寫成 A, B and C：前面的動作用逗號隔開，只在最後一個前面加 and。',
  },
  {
    id: `${SEED.comma}#v2`, seedMistakeId: SEED.comma, skillIds: ['M.COMMA.series'], kind: 'mc',
    stem: 'Choose the correct sentence: ___', answer: 'Sam wakes up, brushes his teeth and eats breakfast.',
    distractors: opts(
      'Sam wakes up brushes his teeth and eats breakfast.',
      'Sam wakes, up brushes his teeth and eats breakfast.',
      'Sam wakes up brushes, his teeth and eats breakfast.'
    ),
    difficulty: 2, variation: ['context'], explanation: '三個動作並列：Sam wakes up, brushes his teeth and eats breakfast。第一個動作後面要有逗號。',
  },
  // ---- careful spelling / copying ----
  {
    id: `${SEED.mother}#v1`, seedMistakeId: SEED.mother, skillIds: ['M.SPELL.careful_copy'], kind: 'mc',
    stem: 'My ___ doesn\'t drink coffee. She likes tea.', answer: 'mother',
    distractors: opts('mather', 'mothar', 'mouther'),
    difficulty: 1, variation: ['context'], explanation: 'mother 的拼法是 m-o-t-h-e-r，第二個字母是 o，不是 a。',
  },
  {
    id: `${SEED.copyNY}#v1`, seedMistakeId: SEED.copyNY, skillIds: ['M.SPELL.careful_copy'], kind: 'mc',
    stem: 'It ___ be faster to take the train than the bus.', answer: 'would',
    distractors: opts('wold', 'woud', 'wuold'),
    difficulty: 1, variation: ['context'], explanation: 'would 的拼法是 w-o-u-l-d，o 後面是 u，l 不能漏掉，也不能把 u 和 l 對調。',
  },
  {
    id: `${SEED.copyNY}#v2`, seedMistakeId: SEED.copyNY, skillIds: ['M.SPELL.careful_copy'], kind: 'mc',
    stem: 'This bag is ___ heavy for me to carry.', answer: 'too',
    distractors: opts('to', 'tou', 'tuu'),
    difficulty: 1, variation: ['context'], explanation: 'too 是「太…」，有兩個 o，放在形容詞前面；to 是「去、向」或不定詞，意思不一樣。',
  },
];

const reading: DrillItem[] = [
  // ---- main idea / title ----
  {
    id: `${SEED.title}#v1`, seedMistakeId: SEED.title, skillIds: ['R.MAIN_IDEA'], kind: 'mc',
    stem: 'Ana forgot her lunch box. Her mom did not bring it to school. She said, "You can learn to take care of your things." Now Ana checks her bag every morning. The best title is ___.',
    answer: 'Learning to Take Care of Your Things',
    distractors: opts('A Delicious Lunch', 'Ana\'s Birthday Party', 'A Day at the Zoo'),
    difficulty: 3, variation: ['context'], explanation: '故事重點是媽媽教 Ana 要學會照顧自己的東西，後來她每天檢查書包，所以標題是 Learning to Take Care of Your Things。',
  },
  {
    id: `${SEED.title}#v2`, seedMistakeId: SEED.title, skillIds: ['R.MAIN_IDEA'], kind: 'mc',
    stem: 'Leo fell down on the playground and everyone saw it. He felt embarrassed, but his teacher said, "Everyone falls sometimes. What matters is getting up again." Leo smiled and stood up. The best title is ___.',
    answer: 'A Good Lesson About Falling Down',
    distractors: opts('A Fun Day at the Beach', 'My New Bike', 'Leo\'s Favorite Food'),
    difficulty: 3, variation: ['context'], explanation: '故事重點是老師告訴 Leo「每個人都會跌倒，重要的是再站起來」，所以標題是 A Good Lesson About Falling Down。',
  },
  // ---- infer what a character is afraid of ----
  {
    id: `${SEED.afraid}#v1`, seedMistakeId: SEED.afraid, skillIds: ['R.INFER'], kind: 'mc',
    stem: 'Kim spilled juice on her skirt right before the class photo. She felt worried. She was most afraid that the other kids would ___ her.',
    answer: 'laugh at',
    distractors: opts('wait for', 'dance with', 'write to'),
    difficulty: 2, variation: ['context'], explanation: '裙子被果汁弄濕、又擔心，她最怕的是被別人取笑：laugh at（嘲笑）。',
  },
  {
    id: `${SEED.afraid}#v2`, seedMistakeId: SEED.afraid, skillIds: ['R.INFER'], kind: 'mc',
    stem: 'Ben missed the bus and ran to school. His teacher gets very angry when students are late. Ben was most afraid that he would ___.',
    answer: 'get in trouble for being late',
    distractors: opts('win a big prize', 'find a lost coin', 'meet a new friend'),
    difficulty: 3, variation: ['context'], explanation: '老師對遲到很生氣，所以 Ben 最怕因為遲到被罵：get in trouble for being late。',
  },
  // ---- details: who / what actually happened ----
  {
    id: `${SEED.noOne}#v1`, seedMistakeId: SEED.noOne, skillIds: ['R.DETAIL'], kind: 'mc',
    stem: 'Mia\'s shirt got wet at lunch. She thought her classmates would laugh. But when she walked into the classroom, nobody said anything. According to the story, ___ laughed at Mia.',
    answer: 'no one',
    distractors: opts('everyone', 'some of her friends', 'her teacher'),
    difficulty: 2, variation: ['context'], explanation: '文章最後說 nobody said anything，沒有人取笑 Mia。她原本只是「擔心」被取笑。',
  },
  {
    id: `${SEED.trueStmt}#v1`, seedMistakeId: SEED.trueStmt, skillIds: ['R.DETAIL'], kind: 'mc',
    stem: 'Dan\'s mom told him, "Don\'t worry about what other people say. Just be kind and do your best." According to the story, Dan\'s mom told him ___.',
    answer: 'not to worry about what others say',
    distractors: opts('to run home and change', 'to stop going to school', 'to buy a new shirt'),
    difficulty: 2, variation: ['context'], explanation: '媽媽說的是 Don\'t worry about what other people say，也就是不要在意別人說什麼。其他選項文章裡都沒有提到。',
  },
  // ---- CLIL science ----
  {
    id: `${SEED.seaWarm}#v1`, seedMistakeId: SEED.seaWarm, skillIds: ['R.CLIL.science'], kind: 'mc',
    stem: 'In the sea, the sun shines on the water all day. The sunlight makes the seawater ___.',
    answer: 'warm',
    distractors: opts('cold', 'frozen', 'dark'),
    difficulty: 1, variation: ['context'], explanation: '太陽整天照在海面上，海水會被曬暖：warm。',
  },
  {
    id: `${SEED.seaWarm}#v2`, seedMistakeId: SEED.seaWarm, skillIds: ['R.CLIL.science'], kind: 'mc',
    stem: 'If the sun shines on the sea for many hours, the water gets ___.',
    answer: 'warmer',
    distractors: opts('colder', 'harder', 'emptier'),
    difficulty: 2, variation: ['context'], explanation: '太陽照很多小時，海水會變得更暖：warmer。colder 是更冷，和事實相反。',
  },
  {
    id: `${SEED.grid}#v1`, seedMistakeId: SEED.grid, skillIds: ['R.CLIL.science'], kind: 'mc',
    stem: 'To copy a picture, you can draw a ___ on it and copy each square one by one.',
    answer: 'grid',
    distractors: opts('cloud', 'bell', 'tent'),
    difficulty: 1, variation: ['context'], explanation: '在圖上畫方格（grid），再一格一格地複製，就能更輕鬆地複製圖片。',
  },
  {
    id: `${SEED.grid}#v2`, seedMistakeId: SEED.grid, skillIds: ['R.CLIL.science'], kind: 'mc',
    stem: 'A grid makes it easier to ___ a picture.',
    answer: 'copy',
    distractors: opts('eat', 'hear', 'smell'),
    difficulty: 1, variation: ['context'], explanation: '方格可以幫助我們更容易地複製（copy）圖片。',
  },
];

const drills: DrillItem[] = [...phrases, ...words, ...grammar, ...reading];

export default drills;
