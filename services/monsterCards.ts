// 怪獸卡片背面：英文名字、三句簡單英文介紹（句型都是學校教過的）、一個中文小知識、一個重點單字。
// 以怪獸 id 為 key；沒有寫在這裡的怪獸，圖鑑裡就不會出現翻面卡。
// 寫作規則：句子只用簡單字，三句分別帶出 be 動詞／地點／頻率副詞或 can／have 等句型；小知識必須是正確的事實，
// 神話、傳說要明講「傳說」「故事裡」。每一批都要請第二個模型檢查事實與英文，並由家長抽查。
export interface CardSentence {
  en: string;
  zh: string;
}

export interface MonsterCard {
  en: string; // English name of the creature
  sentences: [CardSentence, CardSentence, CardSentence];
  fact: string; // Chinese fun fact
  word: { en: string; zh: string }; // one key word to remember
}

const s = (en: string, zh: string): CardSentence => ({ en, zh });

export const MONSTER_CARDS: Record<number, MonsterCard> = {
  169: { en: 'Panda', sentences: [s('It is a baby panda.', '牠是一隻熊貓寶寶。'), s('It usually eats bamboo.', '牠通常吃竹子。'), s('Pandas live in China.', '熊貓住在中國。')], fact: '熊貓一天要花十幾個小時吃竹子。', word: { en: 'bamboo', zh: '竹子' } },
  170: { en: 'Koala', sentences: [s('It is a koala.', '牠是一隻無尾熊。'), s('It lives in Australia.', '牠住在澳洲。'), s('It often sleeps in a tree.', '牠常常在樹上睡覺。')], fact: '無尾熊很愛睡覺，一天要睡將近二十個小時。', word: { en: 'sleep', zh: '睡覺' } },
  171: { en: 'Sloth', sentences: [s('It is a sloth.', '牠是一隻樹懶。'), s('It moves very slowly.', '牠動作非常慢。'), s('It lives in the forest.', '牠住在森林裡。')], fact: '樹懶動作很慢，大部分的時間都掛在樹上。', word: { en: 'slowly', zh: '慢慢地' } },
  172: { en: 'Alpaca', sentences: [s('It is an alpaca.', '牠是一隻羊駝。'), s('It has soft wool.', '牠有柔軟的毛。'), s('Alpacas live in South America.', '羊駝住在南美洲。')], fact: '羊駝的毛又軟又保暖，可以用來做毛衣。', word: { en: 'wool', zh: '羊毛' } },
  173: { en: 'Meerkat', sentences: [s('It is a meerkat.', '牠是一隻狐獴。'), s('It often stands up and looks around.', '牠常常站起來四處看。'), s('Meerkats live in Africa.', '狐獴住在非洲。')], fact: '狐獴會輪流站崗，看到危險就叫同伴快躲起來。', word: { en: 'look around', zh: '四處看' } },
  174: { en: 'Fawn', sentences: [s('It is a baby deer.', '牠是一隻小鹿。'), s('It has white spots.', '牠身上有白色斑點。'), s('It usually stays in the forest.', '牠通常待在森林裡。')], fact: '小鹿身上的白斑點，可以幫牠躲在樹林裡不被發現。', word: { en: 'deer', zh: '鹿' } },
  175: { en: 'Ladybug', sentences: [s('It is a ladybug.', '牠是一隻瓢蟲。'), s('It is red with black spots.', '牠是紅色的，有黑色斑點。'), s('It can fly.', '牠會飛。')], fact: '很多瓢蟲愛吃會傷害植物的小蟲，所以是農夫的好朋友。', word: { en: 'spot', zh: '斑點' } },
  176: { en: 'Caterpillar', sentences: [s('It is a caterpillar.', '牠是一隻毛毛蟲。'), s('It eats green leaves every day.', '牠每天吃綠色的葉子。'), s('It will become a butterfly.', '牠以後會變成蝴蝶。')], fact: '毛毛蟲會先變成蛹，再變成蝴蝶或蛾。', word: { en: 'leaf', zh: '葉子' } },
  177: { en: 'Sea turtle', sentences: [s('It is a sea turtle.', '牠是一隻海龜。'), s('It swims in the sea.', '牠在海裡游泳。'), s('It has a hard shell.', '牠有硬硬的殼。')], fact: '很多母海龜長大後，會回到自己出生的海灘附近產卵。', word: { en: 'shell', zh: '殼' } },
  178: { en: 'Dolphin', sentences: [s('It is a dolphin.', '牠是一隻海豚。'), s('It jumps out of the water.', '牠跳出水面。'), s('Dolphins are very smart.', '海豚非常聰明。')], fact: '海豚會用口哨般的聲音互相溝通。', word: { en: 'jump', zh: '跳' } },
  179: { en: 'Flamingo', sentences: [s('It is a flamingo.', '牠是一隻紅鶴。'), s('It is pink.', '牠是粉紅色的。'), s('It often stands on one leg.', '牠常常用一隻腳站著。')], fact: '紅鶴吃的小蝦和藻類，會讓牠的羽毛變成粉紅色。', word: { en: 'leg', zh: '腿' } },
  180: { en: 'Peacock', sentences: [s('It is a peacock.', '牠是一隻孔雀。'), s('It has a big colorful tail.', '牠有又大又色彩繽紛的尾巴。'), s('It spreads its tail like a fan.', '牠把尾巴像扇子一樣打開。')], fact: '只有雄孔雀有華麗的大尾巴，開屏是為了吸引雌孔雀。', word: { en: 'tail', zh: '尾巴' } },
  181: { en: 'Chick', sentences: [s('It is a baby chick.', '牠是一隻小雞。'), s('It has soft yellow feathers.', '牠有柔軟的黃色羽毛。'), s('It wears an eggshell hat.', '牠戴著一頂蛋殼帽子。')], fact: '小雞會用嘴尖上小小的破殼齒，把蛋殼啄破才孵出來。', word: { en: 'egg', zh: '蛋' } },
  182: { en: 'Mermaid', sentences: [s('It is a baby mermaid.', '牠是一隻人魚寶寶。'), s('It has a fish tail.', '牠有魚的尾巴。'), s('It lives under the sea.', '牠住在海底。')], fact: '人魚是很多地方都有的傳說，有人說是水手看到海裡的動物後想像出來的。', word: { en: 'mermaid', zh: '人魚' } },
  183: { en: 'Fox spirit', sentences: [s('It is a fox.', '牠是一隻狐狸。'), s('It has a big fluffy tail.', '牠有一條大大蓬蓬的尾巴。'), s('It is a magic animal in old stories.', '牠是古老故事裡的魔法動物。')], fact: '狐仙在中國、日本、韓國的傳說裡都有出現，有些傳說說牠能長出九條尾巴。', word: { en: 'magic', zh: '魔法' } },
  184: { en: 'Qilin', sentences: [s('It is a qilin.', '牠是一隻麒麟。'), s('It brings good luck.', '牠會帶來好運。'), s('It has gold scales.', '牠有金色的鱗片。')], fact: '麒麟是中國傳說裡的瑞獸，傳說牠一出現就代表有好事要發生。', word: { en: 'luck', zh: '運氣' } },
  185: { en: 'Chinese dragon', sentences: [s('It is a baby dragon.', '牠是一隻龍寶寶。'), s('It has a long body.', '牠有長長的身體。'), s('In old stories, it can bring rain.', '在古老的故事裡，牠能帶來雨水。')], fact: '中國的龍和西方會噴火的龍不一樣，傳說牠會帶來雨水，是好運的象徵。', word: { en: 'rain', zh: '雨' } },
  186: { en: 'Pegasus', sentences: [s('It is a baby pegasus.', '牠是一隻飛馬寶寶。'), s('It has white wings.', '牠有白色的翅膀。'), s('It can fly in the sky.', '牠能在天空飛。')], fact: '飛馬是希臘神話裡長著翅膀的白馬。', word: { en: 'wing', zh: '翅膀' } },
  187: { en: 'Sphinx', sentences: [s('It is a baby sphinx.', '牠是一隻獅身人面獸寶寶。'), s('It has the body of a lion.', '牠有獅子的身體。'), s('In old stories, it lives in Egypt.', '在古老的故事裡，牠住在埃及。')], fact: '埃及的金字塔旁邊，有一座很有名的巨大人面獅身像。', word: { en: 'lion', zh: '獅子' } },
  188: { en: 'Gnome', sentences: [s('It is a gnome.', '牠是一位小地精。'), s('It has a long white beard.', '牠有長長的白鬍子。'), s('It carries a small lantern.', '牠提著一盞小燈籠。')], fact: '地精是歐洲民間故事裡的小矮人，傳說牠們住在地底下，守護著寶藏。', word: { en: 'beard', zh: '鬍子' } },
  189: { en: 'Fairy', sentences: [s('It is a fairy.', '她是一位小仙子。'), s('It has shiny wings.', '她有閃亮的翅膀。'), s('It uses magic with a star wand.', '她用星星魔杖施魔法。')], fact: '仙子是歐洲故事裡的小小魔法生物，常住在森林和花園裡。', word: { en: 'wand', zh: '魔杖' } },
  190: { en: 'Yeti', sentences: [s('It is a yeti.', '牠是一隻雪怪。'), s('It lives in the snowy mountains.', '牠住在下雪的山上。'), s('It has thick white fur.', '牠有厚厚的白毛。')], fact: '雪怪是喜馬拉雅山傳說裡的神祕毛怪，沒有人真的證明過牠存在。', word: { en: 'snow', zh: '雪' } },
  191: { en: 'Kraken', sentences: [s('It is a baby kraken.', '牠是一隻小海怪。'), s('It lives in the deep sea.', '牠住在很深的海裡。'), s('It has long arms.', '牠有長長的觸手。')], fact: '海怪 kraken 是北歐水手傳說裡的巨大海怪，有人說靈感來自大王烏賊。', word: { en: 'deep', zh: '深的' } },
  192: { en: 'Nian', sentences: [s('It is a Nian beast.', '牠是一隻年獸。'), s('It is red and has gold horns.', '牠是紅色的，有金色的角。'), s('It is afraid of loud noises.', '牠害怕很大的聲音。')], fact: '傳說年獸怕紅色和鞭炮的聲音，所以過年要貼紅色春聯、放鞭炮。', word: { en: 'red', zh: '紅色' } },
};
