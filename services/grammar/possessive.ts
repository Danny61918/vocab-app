import { GrammarQuestion, GrammarCategory } from '../../types';

export const POSSESSIVE_QUESTIONS: GrammarQuestion[] = [
  // ---------- Possessive adjectives (my/your/his/her/its/our/their) ----------
  {
    id: "possessive_9",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Lily has a cat. ___ cat is white.",
    options: ["She", "Her", "Hers"],
    correctAnswer: "Her",
    ruleReminder: "後面接名詞 (cat) 要用所有格形容詞。she → her，例如 her cat、her book。"
  },
  {
    id: "possessive_10",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "This is my brother. ___ name is Sam.",
    options: ["His", "He", "Him"],
    correctAnswer: "His",
    ruleReminder: "「他的」名字要用 his + 名詞，例如 his name、his dog。"
  },
  {
    id: "possessive_11",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "I love ___ mom very much.",
    options: ["me", "mine", "my"],
    correctAnswer: "my",
    ruleReminder: "「我的」+ 名詞用 my，例如 my mom、my bag。mine 後面不能接名詞。"
  },
  {
    id: "possessive_12",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "We are in Class 3. ___ teacher is Miss Lin.",
    options: ["Ours", "Our", "We"],
    correctAnswer: "Our",
    ruleReminder: "「我們的」+ 名詞用 our，例如 our teacher、our school。"
  },
  {
    id: "possessive_13",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Tim and Amy are twins. ___ birthday is in May.",
    options: ["They", "Theirs", "Their"],
    correctAnswer: "Their",
    ruleReminder: "「他們的」+ 名詞用 their，例如 their birthday、their house。"
  },
  {
    id: "possessive_14",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "The dog is wagging ___ tail.",
    options: ["its", "it's", "it"],
    correctAnswer: "its",
    ruleReminder: "動物或東西的「它的 / 牠的」用 its (沒有撇號)，例如 its tail。it's = it is。"
  },
  {
    id: "possessive_15",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Please tell me ___ phone number.",
    options: ["you", "your", "yours"],
    correctAnswer: "your",
    ruleReminder: "「你的」+ 名詞用 your，例如 your phone number、your name。"
  },
  {
    id: "possessive_16",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "This is Sally's room. ___ bed is next to the window.",
    options: ["Hers", "She's", "Her"],
    correctAnswer: "Her",
    ruleReminder: "後面有名詞 (bed) 用 her；hers 後面不接名詞；she's = she is。"
  },

  // ---------- Possessive pronouns (mine/yours/his/hers/ours/theirs) ----------
  {
    id: "possessive_17",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "This blue pencil is ___. I bought it yesterday.",
    options: ["my", "mine", "me"],
    correctAnswer: "mine",
    ruleReminder: "後面沒有名詞時用所有格代名詞 mine (= my pencil)。"
  },
  {
    id: "possessive_18",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Mark has a red bike. The red bike is ___.",
    options: ["he", "him", "his"],
    correctAnswer: "his",
    ruleReminder: "his 很特別：後面有沒有名詞都用 his，例如 his bike / The bike is his。"
  },
  {
    id: "possessive_19",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Amy has a pink hat. The pink hat is ___.",
    options: ["hers", "her", "she"],
    correctAnswer: "hers",
    ruleReminder: "句尾沒有名詞要用 hers (= her hat)，例如 The hat is hers。"
  },
  {
    id: "possessive_20",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "We made this cake together. It's ___!",
    options: ["our", "ours", "us"],
    correctAnswer: "ours",
    ruleReminder: "句尾沒有名詞用 ours (= our cake)。our 後面一定要接名詞。"
  },
  {
    id: "possessive_21",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Those comic books belong to Mike and Ann. They're ___.",
    options: ["them", "their", "theirs"],
    correctAnswer: "theirs",
    ruleReminder: "句尾沒有名詞用 theirs (= their books)，例如 They're theirs。"
  },
  {
    id: "possessive_22",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Can I use your eraser? I can't find ___.",
    options: ["mine", "my", "me"],
    correctAnswer: "mine",
    ruleReminder: "find 後面沒有名詞，用 mine (= my eraser)。"
  },
  {
    id: "possessive_23",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "These aren't my socks. ___ are blue.",
    options: ["My", "Me", "Mine"],
    correctAnswer: "Mine",
    ruleReminder: "Mine 可以單獨當主詞 (= My socks)，例如 Mine are blue。"
  },

  // ---------- 's (one owner) vs s' (plural owners) ----------
  {
    id: "possessive_24",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "This bike belongs to Tom. It is ___ bike.",
    options: ["Tom's", "Toms'", "Tom"],
    correctAnswer: "Tom's",
    ruleReminder: "一個人的東西用 's，例如 Tom's bike、Mary's dog。"
  },
  {
    id: "possessive_25",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "My ___ name is Peter.",
    options: ["fathers", "father's", "fathers'"],
    correctAnswer: "father's",
    ruleReminder: "只有一位爸爸，用 's：my father's name。"
  },
  {
    id: "possessive_26",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Both girls are in Class 2. Those are the ___ coats.",
    options: ["girl's", "girls's", "girls'"],
    correctAnswer: "girls'",
    ruleReminder: "很多個人 (字尾已有 s) 只加一撇：the girls' coats。"
  },
  {
    id: "possessive_27",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "My sister Kate has a new doll. That is ___ doll.",
    options: ["Kates", "Kate's", "Kates'"],
    correctAnswer: "Kate's",
    ruleReminder: "一個人的名字 + 's 表示「誰的」：Kate's doll。"
  },
  {
    id: "possessive_28",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "All the teachers eat lunch in the ___ room.",
    options: ["teachers'", "teacher's", "teachers"],
    correctAnswer: "teachers'",
    ruleReminder: "所有的老師 (複數 teachers) 共用，只加一撇：the teachers' room。"
  },
  {
    id: "possessive_29",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Both women are ready to go. The ___ shoes are by the door.",
    options: ["woman's", "women's", "womens'"],
    correctAnswer: "women's",
    ruleReminder: "woman 的複數是 women (不規則，沒有 s)，所以加 's：women's。"
  },
  {
    id: "possessive_30",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Dad and Uncle Joe play soccer. The ___ team is winning!",
    options: ["mens'", "man's", "men's"],
    correctAnswer: "men's",
    ruleReminder: "man 的複數是 men (不規則)，所有格加 's：men's，就像 children's。"
  },
  {
    id: "possessive_31",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "All the students made these together. Look at the ___ paintings!",
    options: ["students'", "student's", "students"],
    correctAnswer: "students'",
    ruleReminder: "很多學生 (students) 的東西，只在 s 後加一撇：the students' paintings。"
  },
  {
    id: "possessive_32",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "I have one sister. My ___ bedroom is next to mine.",
    options: ["sisters'", "sister's", "sisters"],
    correctAnswer: "sister's",
    ruleReminder: "只有一個姊妹，用 's：my sister's bedroom。"
  },
  {
    id: "possessive_33",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "I have two brothers. My ___ room is very messy.",
    options: ["brother's", "brothers", "brothers'"],
    correctAnswer: "brothers'",
    ruleReminder: "兩個哥哥共用房間，複數 brothers 後只加一撇：my brothers' room。"
  },

  // ---------- whose / who's / who ----------
  {
    id: "possessive_34",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "___ is that boy? He's my cousin.",
    options: ["Who", "Whose", "Who's"],
    correctAnswer: "Who",
    ruleReminder: "問「是誰」用 Who；問「誰的東西」才用 Whose。"
  },
  {
    id: "possessive_35",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "___ your best friend? Lucy is.",
    options: ["Whose", "Who's", "Who"],
    correctAnswer: "Who's",
    ruleReminder: "Who's = Who is，句子裡沒有 is 時用 Who's：Who's your best friend?"
  },
  {
    id: "possessive_36",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "___ shoes are these? They're my sister's.",
    options: ["Who's", "Who", "Whose"],
    correctAnswer: "Whose",
    ruleReminder: "Whose + 名詞 問「誰的」：Whose shoes are these?"
  },
  {
    id: "possessive_37",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "___ at the door? It's Grandma!",
    options: ["Whose", "Who's", "Who"],
    correctAnswer: "Who's",
    ruleReminder: "Who's = Who is，問「誰在門口？」用 Who's at the door?"
  },

  // ---------- Whose ...? It's ___. ----------
  {
    id: "possessive_38",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Whose bag is this? It's ___.",
    options: ["mine", "I", "my"],
    correctAnswer: "mine",
    ruleReminder: "回答 Whose 時後面沒名詞，用 mine / yours / his / hers。"
  },
  {
    id: "possessive_39",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Whose cap is this? It's ___. He wears it every day.",
    options: ["him", "his", "he"],
    correctAnswer: "his",
    ruleReminder: "「他的」單獨用也是 his：It's his。him 是「他」(受詞)。"
  },
  {
    id: "possessive_40",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Whose kite is that? It's ___. She made it herself.",
    options: ["her", "she", "hers"],
    correctAnswer: "hers",
    ruleReminder: "後面沒有名詞，「她的」要用 hers：It's hers。"
  },
  {
    id: "possessive_41",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Whose puppy is this? It's ___ puppy.",
    options: ["Anna's", "Anna", "Annas'"],
    correctAnswer: "Anna's",
    ruleReminder: "人名 + 's 表示「某人的」：Anna's puppy。"
  },
  {
    id: "possessive_42",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Whose crayons are these? They're ___. We share them.",
    options: ["our", "ours", "us"],
    correctAnswer: "ours",
    ruleReminder: "句尾沒有名詞用 ours：They're ours (= our crayons)。"
  },

  // ---------- its vs it's ----------
  {
    id: "possessive_43",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Look at that bird! ___ very small.",
    options: ["Its", "It", "It's"],
    correctAnswer: "It's",
    ruleReminder: "It's = It is：It's very small。Its 是「它的」，後面接名詞。"
  },
  {
    id: "possessive_44",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "___ raining. Take your umbrella!",
    options: ["It's", "Its", "It"],
    correctAnswer: "It's",
    ruleReminder: "It's raining = It is raining。有 is 的意思就用 It's。"
  },
  {
    id: "possessive_45",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "The bird is building ___ nest in the tree.",
    options: ["it's", "its", "it"],
    correctAnswer: "its",
    ruleReminder: "「牠的」巢用 its + 名詞：its nest。it's 是 it is。"
  },
  {
    id: "possessive_46",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "I like this school. ___ playground is very big.",
    options: ["It", "It's", "Its"],
    correctAnswer: "Its",
    ruleReminder: "「它的」操場用 Its + 名詞：Its playground。"
  },

  // ---------- subject / object / possessive (he / him / his) ----------
  {
    id: "possessive_47",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Ben is my friend. I play with ___ every day.",
    options: ["his", "him", "he"],
    correctAnswer: "him",
    ruleReminder: "介系詞 (with) 後面要用受詞：him、her、me、them。"
  },
  {
    id: "possessive_48",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Look at that boy. ___ is running fast.",
    options: ["He", "His", "Him"],
    correctAnswer: "He",
    ruleReminder: "句子開頭當主詞 (做動作的人) 用 He、She、I、We、They。"
  },
  {
    id: "possessive_49",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "This is Sally. Do you know ___?",
    options: ["hers", "her", "she"],
    correctAnswer: "her",
    ruleReminder: "動詞 (know) 後面要用受詞：know her、know him。"
  },
  {
    id: "possessive_50",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "My grandparents live in Tainan. I visit ___ every summer.",
    options: ["their", "theirs", "them"],
    correctAnswer: "them",
    ruleReminder: "動詞 (visit) 後面要用受詞 them (他們)，their 後面要接名詞。"
  },
  {
    id: "possessive_51",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Mom and I made cookies. Mom gave ___ the biggest one.",
    options: ["me", "my", "mine"],
    correctAnswer: "me",
    ruleReminder: "gave 後面「給誰」要用受詞：gave me、gave him、gave her。"
  },

  // ---------- a friend of mine ----------
  {
    id: "possessive_52",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Jack is a friend of ___.",
    options: ["my", "me", "mine"],
    correctAnswer: "mine",
    ruleReminder: "a friend of + 所有格代名詞：a friend of mine / yours / his / hers。"
  },
  {
    id: "possessive_53",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Emma sits next to Leo. She is a good friend of ___.",
    options: ["his", "him", "he"],
    correctAnswer: "his",
    ruleReminder: "a friend of his = 他的一個朋友。of 後面用 his，不用 him。"
  },
  {
    id: "possessive_54",
    category: GrammarCategory.POSSESSIVE,
    sentenceContext: "Are Sue and Ken friends of ___? Yes, they're our friends.",
    options: ["our", "ours", "us"],
    correctAnswer: "ours",
    ruleReminder: "friends of + 所有格代名詞：friends of ours (= our friends)。"
  },
];
