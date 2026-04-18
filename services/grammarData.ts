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
};
