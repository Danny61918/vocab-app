import { GrammarQuestion, GrammarCategory } from '../../types';

const C = GrammarCategory.TENSE_PRESENT_CONTINUOUS;

export const PRESENT_CONTINUOUS_QUESTIONS: GrammarQuestion[] = [
  // ---- am / is / are + V-ing ----
  {
    id: "present_cont_7",
    category: C,
    sentenceContext: "Look! The baby ___ (sleep) on the bed.",
    options: ["sleeps", "is sleeping", "are sleeping"],
    correctAnswer: "is sleeping",
    ruleReminder: "Look! 表示「現在正在發生」。主詞 The baby 是一個人，用 is + V-ing：is sleeping。"
  },
  {
    id: "present_cont_8",
    category: C,
    sentenceContext: "Listen! The birds ___ (sing) in the tree.",
    options: ["are singing", "is singing", "sing"],
    correctAnswer: "are singing",
    ruleReminder: "Listen! 代表正在發生。The birds 是很多隻（複數），用 are + V-ing：are singing。"
  },
  {
    id: "present_cont_9",
    category: C,
    sentenceContext: "I ___ (read) a book now.",
    options: ["is reading", "reading", "am reading"],
    correctAnswer: "am reading",
    ruleReminder: "now 表示現在正在做。主詞 I 永遠搭配 am：I am reading.（不能只寫 reading）"
  },
  {
    id: "present_cont_10",
    category: C,
    sentenceContext: "Tom ___ (eat) his lunch at the moment.",
    options: ["are eating", "is eating", "eat"],
    correctAnswer: "is eating",
    ruleReminder: "at the moment = 此時此刻。Tom 是一個人（he），用 is + V-ing：is eating。"
  },
  {
    id: "present_cont_11",
    category: C,
    sentenceContext: "My mom ___ (cook) dinner right now.",
    options: ["is cooking", "cooks", "cooking"],
    correctAnswer: "is cooking",
    ruleReminder: "right now 表示正在做。My mom 是 she，用 is + V-ing：is cooking。只寫 cooking 少了 is！"
  },
  {
    id: "present_cont_12",
    category: C,
    sentenceContext: "We ___ (play) soccer in the park now.",
    options: ["is playing", "plays", "are playing"],
    correctAnswer: "are playing",
    ruleReminder: "主詞 We 搭配 are。現在正在做：We are playing。"
  },
  {
    id: "present_cont_13",
    category: C,
    sentenceContext: "Look! The boys ___ (jump) on the bed.",
    options: ["are jumping", "jump", "is jumping"],
    correctAnswer: "are jumping",
    ruleReminder: "Look! 表示正在發生。The boys 是複數，用 are + V-ing：are jumping。"
  },
  {
    id: "present_cont_14",
    category: C,
    sentenceContext: "I ___ (wait) for my mom at the moment.",
    options: ["is waiting", "am waiting", "are waiting"],
    correctAnswer: "am waiting",
    ruleReminder: "I 配 am，you/we/they 配 are，he/she/it 配 is。I am waiting."
  },
  {
    id: "present_cont_15",
    category: C,
    sentenceContext: "Look! It ___ (snow) outside.",
    options: ["snows", "are snowing", "is snowing"],
    correctAnswer: "is snowing",
    ruleReminder: "天氣用 it 當主詞，it 配 is。Look! 正在下雪：It is snowing."
  },
  {
    id: "present_cont_16",
    category: C,
    sentenceContext: "Be quiet! Grandma ___ (rest).",
    options: ["is resting", "rests", "are resting"],
    correctAnswer: "is resting",
    ruleReminder: "Be quiet!（安靜！）表示現在有人正在做某事。Grandma 是 she，用 is resting。"
  },
  {
    id: "present_cont_17",
    category: C,
    sentenceContext: "Listen! Someone ___ (knock) on the door.",
    options: ["are knocking", "is knocking", "knocks"],
    correctAnswer: "is knocking",
    ruleReminder: "Listen! 正在發生。Someone（某個人）當單數，用 is + V-ing：is knocking。"
  },
  {
    id: "present_cont_18",
    category: C,
    sentenceContext: "Hurry up! The bus ___ (come).",
    options: ["comes", "are coming", "is coming"],
    correctAnswer: "is coming",
    ruleReminder: "Hurry up!（快點！）表示事情正在發生。The bus 是單數，用 is；come 去 e 加 ing：is coming。"
  },
  {
    id: "present_cont_19",
    category: C,
    sentenceContext: "Right now, my friends and I ___ (fly) a kite.",
    options: ["are flying", "am flying", "is flying"],
    correctAnswer: "are flying",
    ruleReminder: "my friends and I = we（我們），所以用 are，不是 am：We are flying a kite."
  },
  {
    id: "present_cont_20",
    category: C,
    sentenceContext: "Look at Peter! He ___ (climb) the tree.",
    options: ["climbs", "is climbing", "are climbing"],
    correctAnswer: "is climbing",
    ruleReminder: "Look at...! 表示正在發生。He 配 is：He is climbing."
  },
  {
    id: "present_cont_21",
    category: C,
    sentenceContext: "The students ___ (clean) the classroom now.",
    options: ["is cleaning", "cleans", "are cleaning"],
    correctAnswer: "are cleaning",
    ruleReminder: "The students 是複數（they），用 are + V-ing：are cleaning。"
  },

  // ---- -ing spelling ----
  {
    id: "present_cont_22",
    category: C,
    sentenceContext: "She is ___ (make) a cake.",
    options: ["makeing", "making"],
    correctAnswer: "making",
    ruleReminder: "字尾是不發音的 e，先去掉 e 再加 ing：make → making，bake → baking。"
  },
  {
    id: "present_cont_23",
    category: C,
    sentenceContext: "He is ___ (write) a letter to his grandma.",
    options: ["writing", "writeing", "writting"],
    correctAnswer: "writing",
    ruleReminder: "write 字尾有 e，去 e 加 ing：writing（只有一個 t）。"
  },
  {
    id: "present_cont_24",
    category: C,
    sentenceContext: "The kids are ___ (sit) on the floor.",
    options: ["siting", "sitting"],
    correctAnswer: "sitting",
    ruleReminder: "sit 是「子音+母音+子音」(CVC) 短字，要重複最後一個字母再加 ing：sit → sitting。"
  },
  {
    id: "present_cont_25",
    category: C,
    sentenceContext: "I am ___ (have) breakfast now.",
    options: ["having", "haveing"],
    correctAnswer: "having",
    ruleReminder: "have 字尾有 e，去 e 加 ing：having。（have breakfast = 吃早餐）"
  },
  {
    id: "present_cont_26",
    category: C,
    sentenceContext: "Dad is ___ (run) in the park.",
    options: ["runing", "running"],
    correctAnswer: "running",
    ruleReminder: "run 是 CVC 短字（r-u-n），重複 n 再加 ing：running。"
  },
  {
    id: "present_cont_27",
    category: C,
    sentenceContext: "The girls are ___ (dance) on the stage.",
    options: ["dancing", "danceing"],
    correctAnswer: "dancing",
    ruleReminder: "dance 字尾有 e，去 e 加 ing：dancing。"
  },
  {
    id: "present_cont_28",
    category: C,
    sentenceContext: "My brother is ___ (swim) in the sea.",
    options: ["swiming", "swims", "swimming"],
    correctAnswer: "swimming",
    ruleReminder: "swim 是 CVC 結尾（i-m），重複 m 再加 ing：swimming。is 後面不能接 swims。"
  },
  {
    id: "present_cont_29",
    category: C,
    sentenceContext: "She is ___ (ride) her bike now.",
    options: ["rideing", "riding", "ridding"],
    correctAnswer: "riding",
    ruleReminder: "ride 字尾有 e，去 e 加 ing：riding（只有一個 d）。"
  },
  {
    id: "present_cont_30",
    category: C,
    sentenceContext: "We are ___ (get) on the bus.",
    options: ["getting", "geting"],
    correctAnswer: "getting",
    ruleReminder: "get 是 CVC 短字（g-e-t），重複 t 再加 ing：getting。"
  },
  {
    id: "present_cont_31",
    category: C,
    sentenceContext: "The dog is ___ (play) with a ball.",
    options: ["plaing", "plays", "playing"],
    correctAnswer: "playing",
    ruleReminder: "play 字尾是 y，直接加 ing 就好，y 不用改：playing。"
  },
  {
    id: "present_cont_32",
    category: C,
    sentenceContext: "He is ___ (study) English now.",
    options: ["studying", "studing", "studys"],
    correctAnswer: "studying",
    ruleReminder: "加 ing 時 y 要保留：study → studying（不是 studing）。"
  },
  {
    id: "present_cont_33",
    category: C,
    sentenceContext: "Mom is ___ (shop) at the market.",
    options: ["shoping", "shopping"],
    correctAnswer: "shopping",
    ruleReminder: "shop 是 CVC 短字（o-p），重複 p 再加 ing：shopping。"
  },
  {
    id: "present_cont_34",
    category: C,
    sentenceContext: "The sun is ___ (shine) today.",
    options: ["shineing", "shining"],
    correctAnswer: "shining",
    ruleReminder: "shine 字尾有 e，去 e 加 ing：shining。"
  },
  {
    id: "present_cont_35",
    category: C,
    sentenceContext: "Look! Amy is ___ (wear) a pink hat.",
    options: ["wearing", "wearring"],
    correctAnswer: "wearing",
    ruleReminder: "wear 是兩個母音 ea + r，不用重複字母，直接加 ing：wearing。"
  },
  {
    id: "present_cont_36",
    category: C,
    sentenceContext: "I am ___ (drink) a glass of milk.",
    options: ["drink", "drinkking", "drinking"],
    correctAnswer: "drinking",
    ruleReminder: "am 後面要接 V-ing。drink 直接加 ing：drinking。"
  },
  {
    id: "present_cont_37",
    category: C,
    sentenceContext: "Ann is ___ (put) her toys in the box.",
    options: ["putting", "puting"],
    correctAnswer: "putting",
    ruleReminder: "put 是 CVC 短字（p-u-t），重複 t 再加 ing：putting。"
  },

  // ---- Questions ----
  {
    id: "present_cont_38",
    category: C,
    sentenceContext: "___ she watching TV now?",
    options: ["Are", "Does", "Is"],
    correctAnswer: "Is",
    ruleReminder: "進行式問句：把 is/am/are 搬到句首。she 配 is：Is she watching TV?"
  },
  {
    id: "present_cont_39",
    category: C,
    sentenceContext: "___ they playing in the garden?",
    options: ["Are", "Is", "Do"],
    correctAnswer: "Are",
    ruleReminder: "they 配 are，問句把 Are 放最前面：Are they playing...?"
  },
  {
    id: "present_cont_40",
    category: C,
    sentenceContext: "___ you listening to me?",
    options: ["Do", "Are", "Is"],
    correctAnswer: "Are",
    ruleReminder: "you 配 are。有 V-ing 的問句不用 do：Are you listening?"
  },
  {
    id: "present_cont_41",
    category: C,
    sentenceContext: "Is Ben ___ (draw) a picture?",
    options: ["draws", "drawing", "draw"],
    correctAnswer: "drawing",
    ruleReminder: "Is 開頭的進行式問句，動詞要用 V-ing：Is Ben drawing...?"
  },
  {
    id: "present_cont_42",
    category: C,
    sentenceContext: "What ___ you doing now?",
    options: ["is", "do", "are"],
    correctAnswer: "are",
    ruleReminder: "What + are + you + doing? = 你正在做什麼？you 配 are。"
  },
  {
    id: "present_cont_43",
    category: C,
    sentenceContext: "What is your sister ___ (do) right now?",
    options: ["doing", "does", "do"],
    correctAnswer: "doing",
    ruleReminder: "What is + 主詞 + doing? 問「正在做什麼」，is 後面用 V-ing：doing。"
  },
  {
    id: "present_cont_44",
    category: C,
    sentenceContext: "Where ___ Grandpa going?",
    options: ["are", "is", "does"],
    correctAnswer: "is",
    ruleReminder: "Grandpa 是 he，配 is：Where is Grandpa going?（爺爺要去哪裡？）"
  },

  // ---- Negatives ----
  {
    id: "present_cont_45",
    category: C,
    sentenceContext: "I ___ watching TV. I am doing my homework.",
    options: ["am not", "isn't", "aren't"],
    correctAnswer: "am not",
    ruleReminder: "否定句在 am/is/are 後面加 not。I 只能配 am not：I am not watching TV."
  },
  {
    id: "present_cont_46",
    category: C,
    sentenceContext: "He ___ sleeping now. He is reading.",
    options: ["aren't", "isn't", "don't"],
    correctAnswer: "isn't",
    ruleReminder: "He 配 is，否定是 is not = isn't：He isn't sleeping."
  },
  {
    id: "present_cont_47",
    category: C,
    sentenceContext: "We ___ walking to school today. We are taking the bus.",
    options: ["isn't", "doesn't", "aren't"],
    correctAnswer: "aren't",
    ruleReminder: "We 配 are，否定是 are not = aren't：We aren't walking."
  },
  {
    id: "present_cont_48",
    category: C,
    sentenceContext: "The cat isn't ___ (eat) its food.",
    options: ["eating", "eats", "eat"],
    correctAnswer: "eating",
    ruleReminder: "isn't 後面還是要接 V-ing：The cat isn't eating."
  },

  // ---- Short answers ----
  {
    id: "present_cont_49",
    category: C,
    sentenceContext: "Is your dad cooking now? Yes, he ___.",
    options: ["does", "is", "are"],
    correctAnswer: "is",
    ruleReminder: "用 Is 問，就用 is 回答：Yes, he is. / No, he isn't."
  },
  {
    id: "present_cont_50",
    category: C,
    sentenceContext: "Are the children sleeping? No, they ___.",
    options: ["aren't", "isn't", "don't"],
    correctAnswer: "aren't",
    ruleReminder: "用 Are 問，就用 are 回答：Yes, they are. / No, they aren't."
  },
  {
    id: "present_cont_51",
    category: C,
    sentenceContext: "Are you washing your hands? Yes, I ___.",
    options: ["are", "do", "am"],
    correctAnswer: "am",
    ruleReminder: "問 Are you...? 回答要換成 I，I 配 am：Yes, I am. / No, I'm not."
  },
  {
    id: "present_cont_52",
    category: C,
    sentenceContext: "Is it raining now? No, it ___.",
    options: ["doesn't", "isn't", "aren't"],
    correctAnswer: "isn't",
    ruleReminder: "用 Is 問，就用 is 回答：Yes, it is. / No, it isn't."
  },

  // ---- Contrast with present simple ----
  {
    id: "present_cont_53",
    category: C,
    sentenceContext: "Kate usually walks to school, but today she ___ (ride) her bike.",
    options: ["rides", "is riding"],
    correctAnswer: "is riding",
    ruleReminder: "usually（通常）用現在簡單式；but today（但今天）是今天正在發生的，用進行式：is riding。"
  },
  {
    id: "present_cont_54",
    category: C,
    sentenceContext: "Sam ___ (play) the piano every Sunday.",
    options: ["plays", "is playing"],
    correctAnswer: "plays",
    ruleReminder: "every Sunday（每個星期天）是習慣，用現在簡單式：Sam plays。now / Look! 才用進行式。"
  },
];
