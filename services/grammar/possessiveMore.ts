import { GrammarQuestion, GrammarCategory } from '../../types';

// 所有格: extra questions (2026-11-21), written for the weak spots found in the Week 11-12 papers.
// Every question was blind-solved by a second model before it was added; an item with more than one defensible
// answer was left out. Options are shuffled at battle time (grammarQueue.ts), so the order here does not matter.

const C = GrammarCategory.POSSESSIVE;

export const POSSESSIVE_MORE_QUESTIONS: GrammarQuestion[] = [
  {
    id: "possessive_m1", category: C,
    sentenceContext: "My parents have a car. The car is ___.",
    options: ["their", "theirs", "them"], correctAnswer: "theirs",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m2", category: C,
    sentenceContext: "Those aren't your shoes. They are ___.",
    options: ["my", "mine", "me"], correctAnswer: "mine",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m3", category: C,
    sentenceContext: "The cat is licking ___ paws.",
    options: ["its", "it's", "it"], correctAnswer: "its",
    ruleReminder: "its（它的）沒有撇號，後面接名詞；it's 是 it is 或 it has 的縮寫。",
  },
  {
    id: "possessive_m4", category: C,
    sentenceContext: "___ a sunny day today.",
    options: ["It's", "Its", "Is"], correctAnswer: "It's",
    ruleReminder: "its（它的）沒有撇號，後面接名詞；it's 是 it is 或 it has 的縮寫。",
  },
  {
    id: "possessive_m5", category: C,
    sentenceContext: "The monkey is eating ___ banana.",
    options: ["its", "it's", "it"], correctAnswer: "its",
    ruleReminder: "its（它的）沒有撇號，後面接名詞；it's 是 it is 或 it has 的縮寫。",
  },
  {
    id: "possessive_m6", category: C,
    sentenceContext: "My teacher gave ___ a gift.",
    options: ["me", "my", "mine"], correctAnswer: "me",
    ruleReminder: "動詞或介系詞後面的「我／你／他…」要用受格：me、you、him、her、us、them。",
  },
  {
    id: "possessive_m7", category: C,
    sentenceContext: "Is that umbrella ___? Yes, it's mine.",
    options: ["your", "yours", "you"], correctAnswer: "yours",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m8", category: C,
    sentenceContext: "There are three teachers in the office. Those are the ___ desks.",
    options: ["teachers'", "teacher's", "teachers"], correctAnswer: "teachers'",
    ruleReminder: "名詞複數字尾是 s 時，所有格只加撇號（teachers'）；不是 s 結尾的複數才加 's。",
  },
  {
    id: "possessive_m9", category: C,
    sentenceContext: "I have one dog. My ___ name is Lucky.",
    options: ["dogs'", "dog's", "dogs"], correctAnswer: "dog's",
    ruleReminder: "只有一隻（單數）的所有格，在名詞後面加 's（dog's）。",
  },
  {
    id: "possessive_m10", category: C,
    sentenceContext: "The ___ hats are on the shelf. They belong to two babies.",
    options: ["babies'", "baby's", "babys'"], correctAnswer: "babies'",
    ruleReminder: "baby 的複數是 babies（y 變 ies），字尾是 s，所有格只加撇號：babies'。",
  },
  {
    id: "possessive_m11", category: C,
    sentenceContext: "Look at that dog. ___ tail is wagging.",
    options: ["Its", "It's", "Their"], correctAnswer: "Its",
    ruleReminder: "its（它的）沒有撇號，後面接名詞；it's 是 it is 或 it has 的縮寫。",
  },
  {
    id: "possessive_m12", category: C,
    sentenceContext: "Sam and I love ___ new school.",
    options: ["our", "ours", "us"], correctAnswer: "our",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m13", category: C,
    sentenceContext: "The red house is ___. We live there.",
    options: ["our", "ours", "us"], correctAnswer: "ours",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m14", category: C,
    sentenceContext: "I'd like to introduce ___ friends, Ann and Lee.",
    options: ["my", "mine", "me"], correctAnswer: "my",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m15", category: C,
    sentenceContext: "Where are ___ shoes, Tom?",
    options: ["you", "your", "yours"], correctAnswer: "your",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m16", category: C,
    sentenceContext: "Anna lost ___ pencil case.",
    options: ["she", "her", "hers"], correctAnswer: "her",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m17", category: C,
    sentenceContext: "Dad washes ___ car on Sundays.",
    options: ["he", "his", "him"], correctAnswer: "his",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m18", category: C,
    sentenceContext: "Mom and Dad love ___ children.",
    options: ["they", "their", "theirs"], correctAnswer: "their",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m19", category: C,
    sentenceContext: "That seat isn't free. It's ___.",
    options: ["she", "her", "hers"], correctAnswer: "hers",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m20", category: C,
    sentenceContext: "My brother's name is Ted. ___ is nine years old.",
    options: ["He", "His", "Him"], correctAnswer: "He",
    ruleReminder: "當句子的主詞（做動作的人）用 He／She／They；His／Her／Their 後面要接名詞。",
  },
  {
    id: "possessive_m21", category: C,
    sentenceContext: "Ted's birthday is in May. ___ birthday is in June.",
    options: ["Mine", "My", "I"], correctAnswer: "My",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m22", category: C,
    sentenceContext: "These books are ___. Please give them to her.",
    options: ["her", "hers", "she"], correctAnswer: "hers",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m23", category: C,
    sentenceContext: "The twins look the same. ___ mother can't tell them apart.",
    options: ["Their", "Theirs", "Them"], correctAnswer: "Their",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
  {
    id: "possessive_m24", category: C,
    sentenceContext: "Whose gloves are these? They are my ___ gloves.",
    options: ["mother's", "mothers", "mothers'"], correctAnswer: "mother's",
    ruleReminder: "一個人（單數）的所有格，在名詞後面加 's（mother's）。",
  },
  {
    id: "possessive_m25", category: C,
    sentenceContext: "I borrowed Kate's pen. I gave ___ back to her.",
    options: ["it", "its", "it's"], correctAnswer: "it",
    ruleReminder: "動詞或介系詞後面的「我／你／他…」要用受格：me、you、him、her、us、them。",
  },
  {
    id: "possessive_m26", category: C,
    sentenceContext: "Is this the girls' room? Yes, it's ___.",
    options: ["their", "theirs", "them"], correctAnswer: "theirs",
    ruleReminder: "mine／yours／hers／ours／theirs 後面不接名詞，直接代表「某人的東西」，而且沒有撇號。",
  },
  {
    id: "possessive_m27", category: C,
    sentenceContext: "___ turn is it? It's Anna's.",
    options: ["Who's", "Whose", "Who"], correctAnswer: "Whose",
    ruleReminder: "Whose 問「誰的」，後面接名詞；Who's 是 Who is 的縮寫，Who 問「誰」。",
  },
  {
    id: "possessive_m28", category: C,
    sentenceContext: "___ coming to the party? Tom and Mia.",
    options: ["Whose", "Who's", "Who"], correctAnswer: "Who's",
    ruleReminder: "Whose 問「誰的」，後面接名詞；Who's 是 Who is 的縮寫，Who 問「誰」。",
  },
  {
    id: "possessive_m29", category: C,
    sentenceContext: "My friend and I are the same age. ___ birthdays are in the same month.",
    options: ["Our", "Ours", "We"], correctAnswer: "Our",
    ruleReminder: "his／her／its／our／their／my／your 後面要接名詞，用來說「誰的」。",
  },
];
