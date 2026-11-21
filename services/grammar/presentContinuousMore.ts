import { GrammarQuestion, GrammarCategory } from '../../types';

// 現在進行式: extra questions (2026-11-21), written for the weak spots found in the Week 11-12 papers.
// Every question was blind-solved by a second model before it was added; an item with more than one defensible
// answer was left out. Options are shuffled at battle time (grammarQueue.ts), so the order here does not matter.

const C = GrammarCategory.TENSE_PRESENT_CONTINUOUS;

export const PRESENT_CONTINUOUS_MORE_QUESTIONS: GrammarQuestion[] = [
  {
    id: "present_cont_m1", category: C,
    sentenceContext: "Look! The monkeys ___ (climb) the tree.",
    options: ["are climbing", "is climbing", "climb"], correctAnswer: "are climbing",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m2", category: C,
    sentenceContext: "Listen! The teacher ___ (call) your name.",
    options: ["is calling", "calls", "are calling"], correctAnswer: "is calling",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m3", category: C,
    sentenceContext: "My parents ___ (watch) TV at the moment.",
    options: ["are watching", "is watching", "watch"], correctAnswer: "are watching",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m4", category: C,
    sentenceContext: "I ___ (do) my homework now.",
    options: ["am doing", "is doing", "do"], correctAnswer: "am doing",
    ruleReminder: "be 動詞要對應主詞：I 用 am，he／she／it／單數用 is，you／we／they／複數用 are。",
  },
  {
    id: "present_cont_m5", category: C,
    sentenceContext: "What ___ the children doing?",
    options: ["are", "is", "do"], correctAnswer: "are",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m6", category: C,
    sentenceContext: "Is Mom ___ (cook) dinner now?",
    options: ["cooking", "cooks", "cook"], correctAnswer: "cooking",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m7", category: C,
    sentenceContext: "They aren't ___ (watch) a movie. They are playing games.",
    options: ["watching", "watch", "watches"], correctAnswer: "watching",
    ruleReminder: "現在進行式的否定是 be 動詞後面加 not（isn't／aren't／am not），動詞仍然用 V-ing。",
  },
  {
    id: "present_cont_m8", category: C,
    sentenceContext: "He ___ talking on the phone. He is eating.",
    options: ["isn't", "aren't", "doesn't"], correctAnswer: "isn't",
    ruleReminder: "現在進行式的否定是 be 動詞後面加 not（isn't／aren't／am not），動詞仍然用 V-ing。",
  },
  {
    id: "present_cont_m9", category: C,
    sentenceContext: "We ___ playing outside because it's raining.",
    options: ["aren't", "isn't", "don't"], correctAnswer: "aren't",
    ruleReminder: "現在進行式的否定是 be 動詞後面加 not（isn't／aren't／am not），動詞仍然用 V-ing。",
  },
  {
    id: "present_cont_m10", category: C,
    sentenceContext: "Are the girls ___ (dance)? Yes, they are.",
    options: ["dancing", "dances", "dance"], correctAnswer: "dancing",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m11", category: C,
    sentenceContext: "The man is ___ (cut) the cake.",
    options: ["cutting", "cuting", "cuts"], correctAnswer: "cutting",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m12", category: C,
    sentenceContext: "The boys are ___ (run) around the track.",
    options: ["running", "runing", "runs"], correctAnswer: "running",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m13", category: C,
    sentenceContext: "Ella is ___ (tie) her shoes.",
    options: ["tying", "tieing", "tiing"], correctAnswer: "tying",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m14", category: C,
    sentenceContext: "The kids are ___ (stop) at the red light.",
    options: ["stopping", "stoping", "stops"], correctAnswer: "stopping",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m15", category: C,
    sentenceContext: "Dad is ___ (take) photos of the flowers.",
    options: ["taking", "takeing", "takes"], correctAnswer: "taking",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m16", category: C,
    sentenceContext: "Anna is ___ (come) to my house now.",
    options: ["coming", "comeing", "comes"], correctAnswer: "coming",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m17", category: C,
    sentenceContext: "The bird is ___ (fly) over the lake.",
    options: ["flying", "flyying", "flies"], correctAnswer: "flying",
    ruleReminder: "V-ing 的拼法：字尾 e 去 e 加 ing（come→coming）；短母音＋單子音要重複字尾（run→running）；ie 結尾變 ying（lie→lying, tie→tying）。",
  },
  {
    id: "present_cont_m18", category: C,
    sentenceContext: "Look! It ___ (rain) hard.",
    options: ["is raining", "rains", "are raining"], correctAnswer: "is raining",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m19", category: C,
    sentenceContext: "Listen! The baby ___ (cry).",
    options: ["cries", "is crying", "are crying"], correctAnswer: "is crying",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m20", category: C,
    sentenceContext: "My sister ___ (sleep) now. Please be quiet.",
    options: ["is sleeping", "sleeps", "are sleeping"], correctAnswer: "is sleeping",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m21", category: C,
    sentenceContext: "At the moment, I ___ (read) a story.",
    options: ["am reading", "reads", "is reading"], correctAnswer: "am reading",
    ruleReminder: "be 動詞要對應主詞：I 用 am，he／she／it／單數用 is，you／we／they／複數用 are。",
  },
  {
    id: "present_cont_m22", category: C,
    sentenceContext: "Tom usually goes by bus, but today he ___ (walk).",
    options: ["is walking", "walks", "walking"], correctAnswer: "is walking",
    ruleReminder: "usually、every day 表示習慣，用現在簡單式；today、now 表示「現在正在」，用現在進行式。",
  },
  {
    id: "present_cont_m23", category: C,
    sentenceContext: "We usually have lunch at noon, but now we ___ (have) a snack.",
    options: ["are having", "have", "has"], correctAnswer: "are having",
    ruleReminder: "usually、every day 表示習慣，用現在簡單式；today、now 表示「現在正在」，用現在進行式。",
  },
  {
    id: "present_cont_m24", category: C,
    sentenceContext: "Mr. Lee ___ (teach) English every day.",
    options: ["teaches", "is teaching", "teaching"], correctAnswer: "teaches",
    ruleReminder: "usually、every day 表示習慣，用現在簡單式；today、now 表示「現在正在」，用現在進行式。",
  },
  {
    id: "present_cont_m25", category: C,
    sentenceContext: "Right now, the dogs ___ (bark) at the mailman.",
    options: ["are barking", "barks", "bark"], correctAnswer: "are barking",
    ruleReminder: "Look!／Listen!／now／right now／at the moment 表示「正在發生」，用現在進行式：be（am／is／are）＋V-ing。",
  },
  {
    id: "present_cont_m26", category: C,
    sentenceContext: "___ you listening to music now?",
    options: ["Are", "Do", "Is"], correctAnswer: "Are",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m27", category: C,
    sentenceContext: "___ it raining outside?",
    options: ["Is", "Are", "Does"], correctAnswer: "Is",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m28", category: C,
    sentenceContext: "Who ___ singing in the music room?",
    options: ["is", "are", "does"], correctAnswer: "is",
    ruleReminder: "be 動詞要對應主詞：I 用 am，he／she／it／單數用 is，you／we／they／複數用 are。",
  },
  {
    id: "present_cont_m29", category: C,
    sentenceContext: "Where are you ___ (go)?",
    options: ["going", "goes", "go"], correctAnswer: "going",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m30", category: C,
    sentenceContext: "Is the water ___ (boil)? Yes, it is.",
    options: ["boiling", "boils", "boil"], correctAnswer: "boiling",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
  {
    id: "present_cont_m31", category: C,
    sentenceContext: "What are you ___ (eat)?",
    options: ["eating", "eat", "eats"], correctAnswer: "eating",
    ruleReminder: "現在進行式的問句把 be 動詞（Am／Is／Are）放到句首，後面接 V-ing。",
  },
];
