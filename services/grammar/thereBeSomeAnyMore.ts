import { GrammarQuestion, GrammarCategory } from '../../types';

// There is/are, Some/Any: extra questions (2026-11-21), written for the weak spots found in the Week 11-12 papers.
// Every question was blind-solved by a second model before it was added; an item with more than one defensible
// answer was left out. Options are shuffled at battle time (grammarQueue.ts), so the order here does not matter.

const C = GrammarCategory.THERE_BE_SOME_ANY;

export const THERE_BE_SOME_ANY_MORE_QUESTIONS: GrammarQuestion[] = [
  {
    id: "there_be_m1", category: C,
    sentenceContext: "___ any bread on the table?",
    options: ["Is there", "Are there"], correctAnswer: "Is there",
    ruleReminder: "不可數名詞（milk、bread、juice）的問句用 Is there ... any；可數的複數（cookies、books）用 Are there ... any。",
  },
  {
    id: "there_be_m2", category: C,
    sentenceContext: "___ any cookies in the jar?",
    options: ["Is there", "Are there"], correctAnswer: "Are there",
    ruleReminder: "不可數名詞（milk、bread、juice）的問句用 Is there ... any；可數的複數（cookies、books）用 Are there ... any。",
  },
  {
    id: "there_be_m3", category: C,
    sentenceContext: "Is there a bank near here? Yes, ___.",
    options: ["there is", "there are", "it is"], correctAnswer: "there is",
    ruleReminder: "Is there ...? 答 Yes, there is. ／ No, there isn't.；Are there ...? 答 Yes, there are. ／ No, there aren't.",
  },
  {
    id: "there_be_m4", category: C,
    sentenceContext: "Are there any pandas in Taiwan? No, ___.",
    options: ["there isn't", "there aren't", "they aren't"], correctAnswer: "there aren't",
    ruleReminder: "Is there ...? 答 Yes, there is. ／ No, there isn't.；Are there ...? 答 Yes, there are. ／ No, there aren't.",
  },
  {
    id: "there_be_m5", category: C,
    sentenceContext: "Is there any juice left? No, ___.",
    options: ["there isn't", "there aren't", "it isn't"], correctAnswer: "there isn't",
    ruleReminder: "Is there ...? 答 Yes, there is. ／ No, there isn't.；Are there ...? 答 Yes, there are. ／ No, there aren't.",
  },
  {
    id: "there_be_m6", category: C,
    sentenceContext: "How many students ___ there in your class?",
    options: ["is", "are", "does"], correctAnswer: "are",
    ruleReminder: "How many 後面接可數複數名詞，動詞用 are；How much 後面接不可數名詞，動詞用 is。",
  },
  {
    id: "there_be_m7", category: C,
    sentenceContext: "How much milk ___ there in the bottle?",
    options: ["is", "are", "does"], correctAnswer: "is",
    ruleReminder: "How many 後面接可數複數名詞，動詞用 are；How much 後面接不可數名詞，動詞用 is。",
  },
  {
    id: "there_be_m9", category: C,
    sentenceContext: "There ___ a lot of water in the lake.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "a lot of 後面接複數可數名詞用 are，接不可數名詞（water、snow）用 is。",
  },
  {
    id: "there_be_m10", category: C,
    sentenceContext: "There ___ some cheese on the plate.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "不可數名詞（cheese、sugar、rice）前面用 There is，不用 There are。",
  },
  {
    id: "there_be_m11", category: C,
    sentenceContext: "There ___ some grapes in the bowl.",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "複數可數名詞（grapes）前面用 There are。",
  },
  {
    id: "there_be_m12", category: C,
    sentenceContext: "There aren't ___ eggs in the fridge.",
    options: ["some", "any"], correctAnswer: "any",
    ruleReminder: "肯定句用 some，否定句和疑問句用 any。",
  },
  {
    id: "there_be_m15", category: C,
    sentenceContext: "Is there ___ cheese in the fridge?",
    options: ["some", "any"], correctAnswer: "any",
    ruleReminder: "肯定句用 some，否定句和疑問句用 any。",
  },
  {
    id: "there_be_m16", category: C,
    sentenceContext: "I don't have ___ brothers or sisters.",
    options: ["some", "any"], correctAnswer: "any",
    ruleReminder: "肯定句用 some，否定句和疑問句用 any。",
  },
  {
    id: "there_be_m17", category: C,
    sentenceContext: "I have ___ good friends at school.",
    options: ["some", "any"], correctAnswer: "some",
    ruleReminder: "肯定句用 some，否定句和疑問句用 any。",
  },
  {
    id: "there_be_m18", category: C,
    sentenceContext: "There ___ a pair of shoes under the bed.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "a pair of ... 是「一雙／一副」，看成單數，用 There is。",
  },
  {
    id: "there_be_m19", category: C,
    sentenceContext: "There ___ a pair of scissors on the desk.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "a pair of ... 是「一雙／一副」，看成單數，用 There is。",
  },
  {
    id: "there_be_m20", category: C,
    sentenceContext: "There ___ many people in the park today.",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "people 是複數，用 There are。",
  },
  {
    id: "there_be_m21", category: C,
    sentenceContext: "There ___ too much homework today!",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "homework 是不可數名詞，用 There is。",
  },
  {
    id: "there_be_m22", category: C,
    sentenceContext: "There ___ any milk in the fridge.",
    options: ["isn't", "aren't"], correctAnswer: "isn't",
    ruleReminder: "不可數名詞（milk）的否定句用 There isn't any。",
  },
  {
    id: "there_be_m23", category: C,
    sentenceContext: "There ___ any tomatoes in the soup.",
    options: ["isn't", "aren't"], correctAnswer: "aren't",
    ruleReminder: "複數可數名詞（tomatoes）的否定句用 There aren't any。",
  },
  {
    id: "there_be_m24", category: C,
    sentenceContext: "___ there any chairs in the room?",
    options: ["Is", "Are"], correctAnswer: "Are",
    ruleReminder: "不可數名詞（milk、bread、juice）的問句用 Is there ... any；可數的複數（cookies、books）用 Are there ... any。",
  },
  {
    id: "there_be_m25", category: C,
    sentenceContext: "___ there a post office near here?",
    options: ["Is", "Are"], correctAnswer: "Is",
    ruleReminder: "單數（a post office）的問句用 Is there。",
  },
  {
    id: "there_be_m26", category: C,
    sentenceContext: "There's ___ rice in the bowl.",
    options: ["some", "any"], correctAnswer: "some",
    ruleReminder: "肯定句用 some，否定句和疑問句用 any。",
  },
  {
    id: "there_be_m27", category: C,
    sentenceContext: "There ___ no time to play.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "time 是不可數名詞，用 There is。",
  },
  {
    id: "there_be_m28", category: C,
    sentenceContext: "How many books ___ there on the shelf?",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "How many 後面接可數複數名詞，動詞用 are；How much 後面接不可數名詞，動詞用 is。",
  },
  {
    id: "there_be_m29", category: C,
    sentenceContext: "There ___ a lot of snow on the mountain.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "a lot of 後面接複數可數名詞用 are，接不可數名詞（water、snow）用 is。",
  },
  {
    id: "there_be_m30", category: C,
    sentenceContext: "Are there any questions? No, ___.",
    options: ["there aren't", "there isn't", "they aren't"], correctAnswer: "there aren't",
    ruleReminder: "Is there ...? 答 Yes, there is. ／ No, there isn't.；Are there ...? 答 Yes, there are. ／ No, there aren't.",
  },
];
