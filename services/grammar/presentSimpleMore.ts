import { GrammarQuestion, GrammarCategory } from '../../types';

// 現在簡單式: extra questions (2026-11-21), written for the weak spots found in the Week 11-12 papers.
// Every question was blind-solved by a second model before it was added; an item with more than one defensible
// answer was left out. Options are shuffled at battle time (grammarQueue.ts), so the order here does not matter.

const C = GrammarCategory.TENSE_PRESENT_SIMPLE;

export const PRESENT_SIMPLE_MORE_QUESTIONS: GrammarQuestion[] = [
  {
    id: "present_simple_m1", category: C,
    sentenceContext: "Mom and Dad ___ (walk) in the park every evening.",
    options: ["walk", "walks"], correctAnswer: "walk",
    ruleReminder: "主詞是複數（兩個人以上，或 A and B）時，現在簡單式動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m2", category: C,
    sentenceContext: "Emma and her sister ___ (live) near the school.",
    options: ["live", "lives"], correctAnswer: "live",
    ruleReminder: "主詞是複數（兩個人以上，或 A and B）時，現在簡單式動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m3", category: C,
    sentenceContext: "Tom and I ___ (play) chess on Sundays.",
    options: ["play", "plays"], correctAnswer: "play",
    ruleReminder: "主詞是複數（兩個人以上，或 A and B）時，現在簡單式動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m4", category: C,
    sentenceContext: "The teacher and the students ___ (sing) a song every morning.",
    options: ["sing", "sings"], correctAnswer: "sing",
    ruleReminder: "主詞是複數（兩個人以上，或 A and B）時，現在簡單式動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m5", category: C,
    sentenceContext: "Does Lily ___ (help) her mother at home?",
    options: ["help", "helps", "helping"], correctAnswer: "help",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m6", category: C,
    sentenceContext: "Where does your uncle ___ (work)?",
    options: ["works", "work", "working"], correctAnswer: "work",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m7", category: C,
    sentenceContext: "Does the bus ___ (stop) here?",
    options: ["stops", "stop"], correctAnswer: "stop",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m8", category: C,
    sentenceContext: "What does your cat ___ (eat) for breakfast?",
    options: ["eats", "eat", "eating"], correctAnswer: "eat",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m9", category: C,
    sentenceContext: "When does Mr. Wang ___ (arrive) at school?",
    options: ["arrives", "arrive"], correctAnswer: "arrive",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m10", category: C,
    sentenceContext: "Does the child ___ (water) the flowers on Monday mornings?",
    options: ["waters", "water"], correctAnswer: "water",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m11", category: C,
    sentenceContext: "Why does your brother ___ (study) so late?",
    options: ["study", "studies", "studying"], correctAnswer: "study",
    ruleReminder: "問句裡有 Do／Does，後面的動詞用原形，不加 s／es。",
  },
  {
    id: "present_simple_m12", category: C,
    sentenceContext: "My grandfather never ___ (eat) spicy food.",
    options: ["eats", "eat"], correctAnswer: "eats",
    ruleReminder: "never、always、often 只是頻率副詞，不會改變動詞：he／she／it 的肯定句，動詞還是要加 s／es。",
  },
  {
    id: "present_simple_m13", category: C,
    sentenceContext: "Lucy never ___ (forget) her homework.",
    options: ["forgets", "forget"], correctAnswer: "forgets",
    ruleReminder: "never、always、often 只是頻率副詞，不會改變動詞：he／she／it 的肯定句，動詞還是要加 s／es。",
  },
  {
    id: "present_simple_m14", category: C,
    sentenceContext: "The boy always ___ (say) thank you.",
    options: ["says", "say"], correctAnswer: "says",
    ruleReminder: "never、always、often 只是頻率副詞，不會改變動詞：he／she／it 的肯定句，動詞還是要加 s／es。",
  },
  {
    id: "present_simple_m15", category: C,
    sentenceContext: "Mia seldom ___ (miss) the bus.",
    options: ["misses", "miss", "missing"], correctAnswer: "misses",
    ruleReminder: "never、always、often 只是頻率副詞，不會改變動詞：he／she／it 的肯定句，動詞還是要加 s／es。",
  },
  {
    id: "present_simple_m16", category: C,
    sentenceContext: "My parents never ___ (watch) TV on school nights.",
    options: ["watch", "watches"], correctAnswer: "watch",
    ruleReminder: "主詞是複數（兩個人以上，或 A and B）時，現在簡單式動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m17", category: C,
    sentenceContext: "Ken doesn't ___ (like) carrots.",
    options: ["like", "likes"], correctAnswer: "like",
    ruleReminder: "don't／doesn't 後面的動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m18", category: C,
    sentenceContext: "My sisters don't ___ (play) video games.",
    options: ["play", "plays"], correctAnswer: "play",
    ruleReminder: "don't／doesn't 後面的動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m19", category: C,
    sentenceContext: "The bus doesn't ___ (stop) at this corner.",
    options: ["stop", "stops"], correctAnswer: "stop",
    ruleReminder: "don't／doesn't 後面的動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m20", category: C,
    sentenceContext: "My dad doesn't ___ (drive) to work.",
    options: ["drive", "drives"], correctAnswer: "drive",
    ruleReminder: "don't／doesn't 後面的動詞用原形，不加 s。",
  },
  {
    id: "present_simple_m21", category: C,
    sentenceContext: "Does your grandma drink tea? Yes, she ___.",
    options: ["does", "do", "is"], correctAnswer: "does",
    ruleReminder: "簡答要用和問句相同的助動詞：問句用 Do／Does，答 Yes, ... do／does；答 No, ... don't／doesn't。",
  },
  {
    id: "present_simple_m22", category: C,
    sentenceContext: "Do your friends ride bikes to school? Yes, they ___.",
    options: ["do", "does", "are"], correctAnswer: "do",
    ruleReminder: "簡答要用和問句相同的助動詞：問句用 Do／Does，答 Yes, ... do／does；答 No, ... don't／doesn't。",
  },
  {
    id: "present_simple_m23", category: C,
    sentenceContext: "Does Peter play the violin? No, he ___.",
    options: ["doesn't", "don't", "isn't"], correctAnswer: "doesn't",
    ruleReminder: "簡答要用和問句相同的助動詞：問句用 Do／Does，答 Yes, ... do／does；答 No, ... don't／doesn't。",
  },
  {
    id: "present_simple_m24", category: C,
    sentenceContext: "Do Anna and Kate like pizza? No, they ___.",
    options: ["don't", "doesn't", "aren't"], correctAnswer: "don't",
    ruleReminder: "簡答要用和問句相同的助動詞：問句用 Do／Does，答 Yes, ... do／does；答 No, ... don't／doesn't。",
  },
  {
    id: "present_simple_m25", category: C,
    sentenceContext: "Mr. Chen ___ (fix) cars at a garage.",
    options: ["fixes", "fix", "fixs"], correctAnswer: "fixes",
    ruleReminder: "字尾是 s、sh、ch、x、o 的動詞，第三人稱單數加 es。",
  },
  {
    id: "present_simple_m26", category: C,
    sentenceContext: "My cat ___ (carry) its toys in its mouth.",
    options: ["carries", "carrys", "carry"], correctAnswer: "carries",
    ruleReminder: "子音＋y 結尾的動詞，第三人稱單數要去 y 加 ies。",
  },
  {
    id: "present_simple_m27", category: C,
    sentenceContext: "She ___ (kiss) her baby brother every night.",
    options: ["kisses", "kiss", "kisss"], correctAnswer: "kisses",
    ruleReminder: "字尾是 s、sh、ch、x、o 的動詞，第三人稱單數加 es。",
  },
  {
    id: "present_simple_m28", category: C,
    sentenceContext: "Our teacher ___ (finish) class at 3:30.",
    options: ["finishes", "finishs", "finish"], correctAnswer: "finishes",
    ruleReminder: "字尾是 s、sh、ch、x、o 的動詞，第三人稱單數加 es。",
  },
  {
    id: "present_simple_m29", category: C,
    sentenceContext: "My brother ___ (tidy) his room on Saturdays.",
    options: ["tidies", "tidys", "tidy"], correctAnswer: "tidies",
    ruleReminder: "子音＋y 結尾的動詞，第三人稱單數要去 y 加 ies。",
  },
  {
    id: "present_simple_m30", category: C,
    sentenceContext: "My mom ___ (do) yoga every morning.",
    options: ["does", "do"], correctAnswer: "does",
    ruleReminder: "do 遇到 he／she／it 或單數主詞，要變成 does（字尾 o 加 es）。",
  },
  {
    id: "present_simple_m31", category: C,
    sentenceContext: "The farmer ___ (have) five cows and ten chickens.",
    options: ["has", "have"], correctAnswer: "has",
    ruleReminder: "have 遇到 he／she／it 或單數主詞，要變成 has。",
  },
];
