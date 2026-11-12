import { GrammarQuestion, GrammarCategory } from '../../types';

const C = GrammarCategory.TENSE_PRESENT_SIMPLE;

export const PRESENT_SIMPLE_QUESTIONS: GrammarQuestion[] = [
  // ---------- 第三人稱單數 -s / -es / -ies / has ----------
  {
    id: "present_simple_6", category: C,
    sentenceContext: "My sister ___ (go) to school by bus.",
    options: ["go", "goes"], correctAnswer: "goes",
    ruleReminder: "主詞是 he/she/it 或一個人時，動詞要加 s。go 字尾是 o，要加 es (goes, does)。"
  },
  {
    id: "present_simple_7", category: C,
    sentenceContext: "Tom ___ (brush) his teeth after breakfast.",
    options: ["brushes", "brush", "brushs"], correctAnswer: "brushes",
    ruleReminder: "字尾是 sh、ch、s、x、o 的動詞，第三人稱單數加 es (brushes, watches, fixes)。"
  },
  {
    id: "present_simple_8", category: C,
    sentenceContext: "The baby ___ (cry) a lot at night.",
    options: ["cry", "crys", "cries"], correctAnswer: "cries",
    ruleReminder: "子音 + y 結尾，要去 y 加 ies (cry → cries, study → studies)。"
  },
  {
    id: "present_simple_9", category: C,
    sentenceContext: "Grandpa ___ a big garden behind his house.",
    options: ["has", "have"], correctAnswer: "has",
    ruleReminder: "have 遇到 he/she/it 要變成 has (例: Grandpa has a garden.)。"
  },
  {
    id: "present_simple_10", category: C,
    sentenceContext: "My friends ___ (play) basketball after school.",
    options: ["plays", "play"], correctAnswer: "play",
    ruleReminder: "主詞是複數 (my friends, they, we) 時，動詞用原形，不加 s。"
  },
  {
    id: "present_simple_17", category: C,
    sentenceContext: "Mr. Lin ___ (teach) English at our school.",
    options: ["teach", "teachs", "teaches"], correctAnswer: "teaches",
    ruleReminder: "teach 字尾是 ch，第三人稱單數加 es → teaches。"
  },
  {
    id: "present_simple_18", category: C,
    sentenceContext: "My mom ___ (wash) the dishes after dinner.",
    options: ["wash", "washs", "washes"], correctAnswer: "washes",
    ruleReminder: "wash 字尾是 sh，第三人稱單數加 es → washes。"
  },
  {
    id: "present_simple_19", category: C,
    sentenceContext: "Ben ___ (study) math every night.",
    options: ["studies", "studys", "study"], correctAnswer: "studies",
    ruleReminder: "study 是子音 d + y 結尾，去 y 加 ies → studies。"
  },
  {
    id: "present_simple_28", category: C,
    sentenceContext: "The sun ___ (rise) in the east.",
    options: ["rises", "rise"], correctAnswer: "rises",
    ruleReminder: "不會改變的事實也用現在簡單式。The sun 是單數，動詞加 s → rises。"
  },
  {
    id: "present_simple_29", category: C,
    sentenceContext: "Birds ___ (fly) in the sky.",
    options: ["flies", "fly", "flys"], correctAnswer: "fly",
    ruleReminder: "Birds 是複數，動詞用原形 fly。一隻鳥才說 A bird flies.。"
  },
  {
    id: "present_simple_30", category: C,
    sentenceContext: "A spider ___ eight legs.",
    options: ["have", "has"], correctAnswer: "has",
    ruleReminder: "A spider 是一隻 (單數)，have 要變成 has。"
  },
  {
    id: "present_simple_34", category: C,
    sentenceContext: "Water ___ (boil) at 100 degrees.",
    options: ["boil", "boils"], correctAnswer: "boils",
    ruleReminder: "科學事實用現在簡單式。Water 不可數，當單數 → boils。"
  },
  {
    id: "present_simple_35", category: C,
    sentenceContext: "My parents ___ (drink) coffee every morning.",
    options: ["drink", "drinks"], correctAnswer: "drink",
    ruleReminder: "My parents 是兩個人 (複數)，動詞用原形 drink。"
  },
  {
    id: "present_simple_36", category: C,
    sentenceContext: "The dog and the cat ___ (sleep) on the sofa.",
    options: ["sleeps", "sleep"], correctAnswer: "sleep",
    ruleReminder: "A and B 是兩個 (複數)，動詞用原形 → sleep。"
  },
  {
    id: "present_simple_37", category: C,
    sentenceContext: "Everyone in my class ___ a pencil box.",
    options: ["has", "have"], correctAnswer: "has",
    ruleReminder: "everyone (每個人) 要當單數，所以用 has。"
  },
  {
    id: "present_simple_38", category: C,
    sentenceContext: "My uncle ___ (drive) to work every day.",
    options: ["drive", "driving", "drives"], correctAnswer: "drives",
    ruleReminder: "every day 是習慣，用現在簡單式。My uncle 是單數 → drives。"
  },
  {
    id: "present_simple_42", category: C,
    sentenceContext: "The shop ___ (open) at nine o'clock.",
    options: ["open", "opens"], correctAnswer: "opens",
    ruleReminder: "固定的時間表用現在簡單式。The shop 是單數 → opens。"
  },
  {
    id: "present_simple_43", category: C,
    sentenceContext: "She ___ (ride) her bike in the park on weekends.",
    options: ["ride", "rides"], correctAnswer: "rides",
    ruleReminder: "主詞 she 的動詞要加 s → rides。"
  },
  {
    id: "present_simple_44", category: C,
    sentenceContext: "My little brother ___ (play) with his toy cars every day.",
    options: ["play", "plays", "plaies"], correctAnswer: "plays",
    ruleReminder: "母音 + y 結尾 (ay, ey, oy) 直接加 s → plays, says。只有子音 + y 才改 ies。"
  },
  {
    id: "present_simple_45", category: C,
    sentenceContext: "Dad ___ (fix) my bike when it breaks.",
    options: ["fixs", "fix", "fixes"], correctAnswer: "fixes",
    ruleReminder: "fix 字尾是 x，第三人稱單數加 es → fixes。"
  },
  {
    id: "present_simple_46", category: C,
    sentenceContext: "My dog ___ (catch) the ball with its mouth.",
    options: ["catches", "catchs", "catch"], correctAnswer: "catches",
    ruleReminder: "catch 字尾是 ch，加 es → catches。"
  },
  {
    id: "present_simple_47", category: C,
    sentenceContext: "My best friend ___ a dog and two cats.",
    options: ["have", "haves", "has"], correctAnswer: "has",
    ruleReminder: "have 的第三人稱單數是 has，不是 haves。"
  },
  {
    id: "present_simple_48", category: C,
    sentenceContext: "I ___ my homework before dinner.",
    options: ["does", "do"], correctAnswer: "do",
    ruleReminder: "主詞是 I / you 時，動詞用原形 → I do, you do。"
  },
  {
    id: "present_simple_53", category: C,
    sentenceContext: "Cows ___ (eat) grass.",
    options: ["eat", "eats"], correctAnswer: "eat",
    ruleReminder: "Cows 是複數，動詞用原形 eat。一頭牛才說 A cow eats grass.。"
  },
  {
    id: "present_simple_54", category: C,
    sentenceContext: "Grandma always ___ (tell) me stories at bedtime.",
    options: ["tell", "tells", "telling"], correctAnswer: "tells",
    ruleReminder: "always 是頻率副詞，代表習慣。主詞 Grandma 是單數 → tells。"
  },

  // ---------- do / does 問句與否定 ----------
  {
    id: "present_simple_11", category: C,
    sentenceContext: "___ your brother like ice cream?",
    options: ["Does", "Do", "Is"], correctAnswer: "Does",
    ruleReminder: "問句主詞是 he/she/it (your brother) 時用 Does，後面動詞用原形 (Does he like...?)。"
  },
  {
    id: "present_simple_12", category: C,
    sentenceContext: "___ you eat breakfast every morning?",
    options: ["Does", "Do"], correctAnswer: "Do",
    ruleReminder: "問句主詞是 I/you/we/they 時用 Do (例: Do you eat...?)。"
  },
  {
    id: "present_simple_13", category: C,
    sentenceContext: "Amy doesn't ___ milk.",
    options: ["drinks", "drinking", "drink"], correctAnswer: "drink",
    ruleReminder: "doesn't 後面的動詞要用原形，不加 s (例: She doesn't drink milk.)。"
  },
  {
    id: "present_simple_14", category: C,
    sentenceContext: "My cat ___ like water.",
    options: ["don't", "doesn't"], correctAnswer: "doesn't",
    ruleReminder: "否定句主詞是 he/she/it (my cat) 時用 doesn't + 原形動詞。"
  },
  {
    id: "present_simple_15", category: C,
    sentenceContext: "We ___ have class on Sunday.",
    options: ["don't", "doesn't"], correctAnswer: "don't",
    ruleReminder: "否定句主詞是 I/you/we/they 時用 don't + 原形動詞。"
  },
  {
    id: "present_simple_20", category: C,
    sentenceContext: "Where ___ your father work?",
    options: ["do", "does", "is"], correctAnswer: "does",
    ruleReminder: "疑問詞 + does + he/she/it + 原形動詞 (例: Where does he work?)。"
  },
  {
    id: "present_simple_21", category: C,
    sentenceContext: "What time ___ the movie start?",
    options: ["does", "do"], correctAnswer: "does",
    ruleReminder: "the movie 是單數，問句用 does，動詞 start 保持原形。"
  },
  {
    id: "present_simple_33", category: C,
    sentenceContext: "Kevin doesn't ___ the piano on Sundays.",
    options: ["plays", "play"], correctAnswer: "play",
    ruleReminder: "doesn't 已經代表第三人稱，後面動詞用原形 → doesn't play。"
  },
  {
    id: "present_simple_39", category: C,
    sentenceContext: "How ___ you go to school?",
    options: ["do", "does"], correctAnswer: "do",
    ruleReminder: "主詞是 you，問句用 do (例: How do you go to school?)。"
  },
  {
    id: "present_simple_40", category: C,
    sentenceContext: "How often ___ Peter swim?",
    options: ["do", "does", "is"], correctAnswer: "does",
    ruleReminder: "Peter 是一個人 (單數)，問句用 does + 原形動詞 swim。"
  },
  {
    id: "present_simple_41", category: C,
    sentenceContext: "What ___ your sister want for her birthday?",
    options: ["does", "do"], correctAnswer: "does",
    ruleReminder: "your sister 是 she，問句用 does，want 保持原形。"
  },
  {
    id: "present_simple_49", category: C,
    sentenceContext: "___ they live near the park?",
    options: ["Does", "Are", "Do"], correctAnswer: "Do",
    ruleReminder: "主詞 they 是複數，問句用 Do + 原形動詞 (Do they live...?)。"
  },

  // ---------- 簡答 ----------
  {
    id: "present_simple_22", category: C,
    sentenceContext: "Does Mia like cats? Yes, she ___.",
    options: ["does", "do", "is"], correctAnswer: "does",
    ruleReminder: "用 Does 問，就用 does 回答 (Yes, she does. / No, she doesn't.)。"
  },
  {
    id: "present_simple_23", category: C,
    sentenceContext: "Do your parents cook dinner? No, they ___.",
    options: ["doesn't", "aren't", "don't"], correctAnswer: "don't",
    ruleReminder: "用 Do 問，否定回答用 don't (No, they don't.)。"
  },
  {
    id: "present_simple_24", category: C,
    sentenceContext: "Is your teacher kind? Yes, she ___.",
    options: ["does", "is"], correctAnswer: "is",
    ruleReminder: "用 Is 問，就用 is 回答 (Yes, she is.)。用 Does 問才用 does 回答。"
  },
  {
    id: "present_simple_50", category: C,
    sentenceContext: "Does Sam like soccer? No, he ___.",
    options: ["don't", "doesn't", "isn't"], correctAnswer: "doesn't",
    ruleReminder: "Does 問句的否定簡答：No, he doesn't.。"
  },
  {
    id: "present_simple_51", category: C,
    sentenceContext: "Do you have a pet? Yes, I ___.",
    options: ["do", "does", "am"], correctAnswer: "do",
    ruleReminder: "Do you...? 的回答：Yes, I do. / No, I don't.。"
  },

  // ---------- 頻率副詞位置 ----------
  {
    id: "present_simple_25", category: C,
    sentenceContext: "She ___ to bed at nine.",
    options: ["always goes", "goes always"], correctAnswer: "always goes",
    ruleReminder: "頻率副詞 (always, usually, never) 放在一般動詞前面 (例: She always goes...)。"
  },
  {
    id: "present_simple_26", category: C,
    sentenceContext: "Tim ___ late for class.",
    options: ["never is", "is never"], correctAnswer: "is never",
    ruleReminder: "頻率副詞放在 be 動詞 (am/is/are) 後面 (例: He is never late.)。"
  },
  {
    id: "present_simple_27", category: C,
    sentenceContext: "We ___ pizza on Fridays.",
    options: ["eat usually", "usually eat"], correctAnswer: "usually eat",
    ruleReminder: "usually 要放在一般動詞前面 → We usually eat pizza.。"
  },

  // ---------- be 動詞 vs do/does ----------
  {
    id: "present_simple_16", category: C,
    sentenceContext: "Lucy ___ never late for school.",
    options: ["is", "does", "do"], correctAnswer: "is",
    ruleReminder: "late 是形容詞，前面要用 be 動詞 (is)，不是 does。"
  },
  {
    id: "present_simple_31", category: C,
    sentenceContext: "___ she a student?",
    options: ["Does", "Is"], correctAnswer: "Is",
    ruleReminder: "句子裡沒有一般動詞，只有名詞 (a student)，所以用 Is 問。"
  },
  {
    id: "present_simple_32", category: C,
    sentenceContext: "___ he speak Chinese?",
    options: ["Is", "Does"], correctAnswer: "Does",
    ruleReminder: "有一般動詞 speak，問句要用 Does + 原形動詞。"
  },
  {
    id: "present_simple_52", category: C,
    sentenceContext: "My mom ___ busy on Mondays.",
    options: ["is", "does"], correctAnswer: "is",
    ruleReminder: "busy 是形容詞，要用 be 動詞 → My mom is busy.。"
  },
];
