import { GrammarQuestion, GrammarCategory } from '../types';

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  // ----------------------------------------------------
  // Prepositions of Time
  // ----------------------------------------------------
  {
    id: "prep_time_1",
    category: GrammarCategory.PREPOSITION_TIME,
    sentenceContext: "I will call you ___ 8 o'clock.",
    options: ["At", "In", "On"],
    correctAnswer: "At",
    ruleReminder: "特定時刻前使用 At (例: at 8 o'clock, at noon, at midnight)。"
  },
  {
    id: "prep_time_2",
    category: GrammarCategory.PREPOSITION_TIME,
    sentenceContext: "I like to go jogging ___ the morning.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "長時間段像是早中晚使用 In (例: in the morning, in the afternoon)。"
  },
  {
    id: "prep_time_3",
    category: GrammarCategory.PREPOSITION_TIME,
    sentenceContext: "We don't go to school ___ Monday.",
    options: ["At", "In", "On"],
    correctAnswer: "On",
    ruleReminder: "特定的星期或日期使用 On (例: on Monday, on May first)。"
  },
  {
    id: "prep_time_4",
    category: GrammarCategory.PREPOSITION_TIME,
    sentenceContext: "What are you doing ___ the weekend?",
    options: ["At", "In", "On"],
    correctAnswer: "At",
    ruleReminder: "在週末通常使用 At (at the weekend)。"
  },
  {
    id: "prep_time_5",
    category: GrammarCategory.PREPOSITION_TIME,
    sentenceContext: "My birthday is ___ June.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "特定月份前使用 In (例: in June)。"
  },
  {
    id: "prep_time_6",
    category: GrammarCategory.PREPOSITION_TIME,
    sentenceContext: "We wear warm clothes ___ winter.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "季節前使用 In (例: in winter, in the spring)。"
  },

  // ----------------------------------------------------
  // Prepositions of Place
  // ----------------------------------------------------
  {
    id: "prep_place_1",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "He is waiting ___ the airport.",
    options: ["At", "In", "On"],
    correctAnswer: "At",
    ruleReminder: "特定地點使用 At (例: at the airport, at work, at school)。"
  },
  {
    id: "prep_place_2",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "There is a cat sleeping ___ the sofa.",
    options: ["At", "In", "On"],
    correctAnswer: "On",
    ruleReminder: "位於某物的表面上使用 On (例: on a chair, on the sofa, on the floor)。"
  },
  {
    id: "prep_place_3",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The toys are ___ the box.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "在某個三維空間或容器內使用 In (例: in a box, in a room)。"
  },
  {
    id: "prep_place_4",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Look at that beautiful bird ___ the sky.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "在天空中使用 In (in the sky)。"
  },
  {
    id: "prep_place_5",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "I left my keys ___ my desk.",
    options: ["At", "In", "On"],
    correctAnswer: "At",
    ruleReminder: "在某人的書桌前或特定設施旁使用 At (at one's desk, at the window)。"
  },
  {
    id: "prep_place_6",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "They live ___ a farm.",
    options: ["At", "In", "On"],
    correctAnswer: "On",
    ruleReminder: "在農場上使用 On (on the farm)。"
  },

  // ----------------------------------------------------
  // Present Simple
  // ----------------------------------------------------
  {
    id: "tense_simple_1",
    category: GrammarCategory.TENSE_PRESENT_SIMPLE,
    sentenceContext: "Annie ___ (do) her homework every day.",
    options: ["do", "does", "doing", "is doing"],
    correctAnswer: "does",
    ruleReminder: "every day 代表重複發生或習慣，使用現在簡單式。第三人稱單數 do 的字尾為 o，需加 es (does)。"
  },
  {
    id: "tense_simple_2",
    category: GrammarCategory.TENSE_PRESENT_SIMPLE,
    sentenceContext: "He usually ___ (cry) when he watches sad movies.",
    options: ["cry", "crys", "cries", "is crying"],
    correctAnswer: "cries",
    ruleReminder: "usually 代表常態，使用現在簡單式。cry 字尾為子音加 y，需去 y 加 ies (cries)。"
  },
  {
    id: "tense_simple_3",
    category: GrammarCategory.TENSE_PRESENT_SIMPLE,
    sentenceContext: "My dog never ___ (watch) TV.",
    options: ["watch", "watches", "is watching", "watching"],
    correctAnswer: "watches",
    ruleReminder: "never 代表習慣頻率，使用現在簡單式。watch 字尾為 ch，單數主詞需加 es (watches)。"
  },
  {
    id: "tense_simple_4",
    category: GrammarCategory.TENSE_PRESENT_SIMPLE,
    sentenceContext: "___ he run at the weekend?",
    options: ["Do", "Does", "Is", "Are"],
    correctAnswer: "Does",
    ruleReminder: "現在簡單式的疑問句，主詞為第三人稱單數 He/She/It 時，助動詞使用 Does。"
  },
  {
    id: "tense_simple_5",
    category: GrammarCategory.TENSE_PRESENT_SIMPLE,
    sentenceContext: "They often ___ (play) football on Mondays.",
    options: ["play", "plays", "playing", "are playing"],
    correctAnswer: "play",
    ruleReminder: "如果主詞是 You/We/They，現在簡單式的動詞保持原形不需要加 s。"
  },

  // ----------------------------------------------------
  // Present Continuous
  // ----------------------------------------------------
  {
    id: "tense_cont_1",
    category: GrammarCategory.TENSE_PRESENT_CONTINUOUS,
    sentenceContext: "Look! The dog ___ (run).",
    options: ["run", "runs", "is running", "running"],
    correctAnswer: "is running",
    ruleReminder: "句子中有 Look! 或 now，代表正在發生，使用現在進行式。單字 run 為 CVC (子母子) 結尾，需重複字尾 (is running)。"
  },
  {
    id: "tense_cont_2",
    category: GrammarCategory.TENSE_PRESENT_CONTINUOUS,
    sentenceContext: "We are ___ (take) a break at the moment.",
    options: ["take", "takes", "taking", "takeing"],
    correctAnswer: "taking",
    ruleReminder: "at the moment 代表此時此刻正在發生。字尾有 e 時，去掉 e 再加 ing (taking)。"
  },
  {
    id: "tense_cont_3",
    category: GrammarCategory.TENSE_PRESENT_CONTINUOUS,
    sentenceContext: "Listen! She ___ (sing) your favorite song.",
    options: ["sing", "sings", "is singing", "singing"],
    correctAnswer: "is singing",
    ruleReminder: "Listen! 暗示動作正在進行中，使用 is + V-ing。直接在字尾加 ing (is singing)。"
  },
  {
    id: "tense_cont_4",
    category: GrammarCategory.TENSE_PRESENT_CONTINUOUS,
    sentenceContext: "They ___ (swim) in the pool right now.",
    options: ["swim", "swims", "are swimming", "are swiming"],
    correctAnswer: "are swimming",
    ruleReminder: "主詞 They 搭配 are，並且 swim (CVC 結尾) 須重複字尾 m + ing (are swimming)。"
  },
  {
    id: "tense_cont_5",
    category: GrammarCategory.TENSE_PRESENT_CONTINUOUS,
    sentenceContext: "She isn't ___ (dance), she is resting today.",
    options: ["dance", "dances", "dancing", "danceing"],
    correctAnswer: "dancing",
    ruleReminder: "today 常搭配進行式。dance 字尾有 e，去掉 e 加 ing (dancing)。"
  },
  {
    id: "tense_cont_6",
    category: GrammarCategory.TENSE_PRESENT_CONTINUOUS,
    sentenceContext: "Look! The cat ___ (lie) on the sofa.",
    options: ["lying", "liing", "lieing", "lyeing"],
    correctAnswer: "lying",
    ruleReminder: "特殊變化：lie 字尾 ie 要改成 y 再加 ing (lying)，不是 liing。"
  },

  // ----------------------------------------------------
  // Possessives (所有格形容詞/代名詞、's 與 s'、Whose)
  // ----------------------------------------------------
  {
    id: "possessive_1",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "This is Tom. ___ bag is red.",
    options: ["He", "His", "Him"],
    correctAnswer: "His",
    ruleReminder: "Possessive Adjective 後面要接名詞 (bag)，He 的所有格形容詞是 His。"
  },
  {
    id: "possessive_2",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "That pencil case isn't mine, it's ___.",
    options: ["you", "your", "yours"],
    correctAnswer: "yours",
    ruleReminder: "後面沒有接名詞時要用 Possessive Pronoun (不加名詞)，your 的代名詞是 yours。"
  },
  {
    id: "possessive_3",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "We have a new puppy. ___ name is Max.",
    options: ["It's", "Its", "It"],
    correctAnswer: "Its",
    ruleReminder: "Its (無撇號) 是所有格形容詞，表示「牠的」；It's (有撇號) 則是 It is 的縮寫，兩者意思完全不同。"
  },
  {
    id: "possessive_4",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "The boys are in the garden. Look at ___ kite!",
    options: ["boy's", "boys'", "boys's"],
    correctAnswer: "boys'",
    ruleReminder: "兩個以上的人要用 s' (在複數字尾後只加一撇)，例如 the boys' kite、the girls' skirts。"
  },
  {
    id: "possessive_5",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "___ is this umbrella? It's Mary's.",
    options: ["Who", "Whose", "Who's"],
    correctAnswer: "Whose",
    ruleReminder: "Whose 用來詢問某樣東西是誰的 (詢問所有權)；Who's 是 Who is 的縮寫，意思不同，小心不要混淆。"
  },
  {
    id: "possessive_6",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "These seats aren't ours, they are ___.",
    options: ["they", "their", "theirs"],
    correctAnswer: "theirs",
    ruleReminder: "句尾沒有接名詞時要用 Possessive Pronoun，their 的代名詞是 theirs。"
  },
  {
    id: "possessive_7",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Look at the ___ toys. They are all over the floor.",
    options: ["child's", "childs'", "children's"],
    correctAnswer: "children's",
    ruleReminder: "child 的複數是不規則變化 children，所有格仍然用 's (children's)，不是 childs'。"
  },
  {
    id: "possessive_8",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Is this backpack ___? No, it isn't. It's Ben's.",
    options: ["you", "your", "yours"],
    correctAnswer: "yours",
    ruleReminder: "問句句尾沒有名詞時要用 Possessive Pronoun，your 的代名詞是 yours。"
  },

  // ----------------------------------------------------
  // There is / There are - Some / Any
  // ----------------------------------------------------
  {
    id: "there_be_1",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "___ a cat under the table.",
    options: ["There's", "There are", "There"],
    correctAnswer: "There's",
    ruleReminder: "後面接單數名詞 (a cat) 要用 There's (There is 的縮寫)。"
  },
  {
    id: "there_be_2",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "___ three students in the classroom.",
    options: ["There's", "There are", "There is"],
    correctAnswer: "There are",
    ruleReminder: "後面接複數名詞 (three students) 要用 There are。"
  },
  {
    id: "there_be_3",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "___ any milk in the bottle?",
    options: ["Is there", "Are there"],
    correctAnswer: "Is there",
    ruleReminder: "milk 是不可數名詞 (單數概念)，疑問句用 Is there...any。"
  },
  {
    id: "there_be_4",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "___ any books on the desk?",
    options: ["Is there", "Are there"],
    correctAnswer: "Are there",
    ruleReminder: "books 是複數可數名詞，疑問句用 Are there...any。"
  },
  {
    id: "there_be_5",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "There ___ any sugar in the jar.",
    options: ["isn't", "aren't"],
    correctAnswer: "isn't",
    ruleReminder: "sugar 是不可數名詞，否定句用 There isn't any。"
  },
  {
    id: "there_be_6",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "There ___ any eggs in the basket.",
    options: ["isn't", "aren't"],
    correctAnswer: "aren't",
    ruleReminder: "eggs 是複數可數名詞，否定句用 There aren't any。"
  },
  {
    id: "there_be_7",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "There are ___ oranges on the table.",
    options: ["some", "any"],
    correctAnswer: "some",
    ruleReminder: "肯定句 (affirmative) 用 some，不管後面是可數還是不可數名詞。"
  },
  {
    id: "there_be_8",
    category: GrammarCategory.THERE_BE_SOME_ANY,
    sentenceContext: "There isn't ___ juice left.",
    options: ["some", "any"],
    correctAnswer: "any",
    ruleReminder: "否定句和疑問句 (negative/question) 要用 any，不用 some。"
  }
];

// Helper Function
export const getRandomGrammarQuestions = (count: number = 10): GrammarQuestion[] => {
  const shuffled = [...GRAMMAR_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const GRAMMAR_BOSS_MAP: Record<GrammarCategory, number> = {
  [GrammarCategory.PREPOSITION_TIME]: 24, // 時光幽魂
  [GrammarCategory.PREPOSITION_PLACE]: 25, // 大地護衛
  [GrammarCategory.TENSE_PRESENT_SIMPLE]: 26, // 永恆機甲
  [GrammarCategory.TENSE_PRESENT_CONTINUOUS]: 27, // 烈焰之舞
  [GrammarCategory.POSSESSIVE]: 30, // 格鬥鋼拳
  [GrammarCategory.THERE_BE_SOME_ANY]: 39, // 聖光獨角獸
};
