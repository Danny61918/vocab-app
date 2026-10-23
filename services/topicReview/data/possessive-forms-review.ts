import { ReviewChapter } from '../types';

// Source: not a single textbook passage — built from services/mistakeBook,
// which shows possessive-form errors as the single largest ungoverned
// cluster: 41 plural_possessive records across 8 different exams
// (2026-09-08 through 2026-10-23), more than the connector-phrase cluster
// this chapter's sibling (confusable-connector-phrases) already covers.
// Five distinct sub-rules recur: (1) possessive pronouns NEVER take an
// apostrophe (her's/their's/its' don't exist) — the single most repeated
// mistake; (2) possessive adjective (noun follows) vs. possessive pronoun
// (no noun follows); (3) regular plural possessive apostrophe placement
// (bees'/pigs'/boys') vs. irregular plurals (children's/women's, which DO
// take 's because they don't already end in s); (4) singular vs. plural
// possessive judged from a context clue (her → one person → woman's); (5)
// uncountable nouns + is/isn't, never are/aren't. All example sentences
// below are quoted verbatim from the real exam papers in mistakeBook.
const chapter: ReviewChapter = {
  id: 'possessive-forms-review',
  title: '所有格總複習 (Possessive Forms Review)',
  sourceRef: 'L7 Writing Unit / New-Round Up 2 所有格單元（彙整自 09/08–10/23 共 8 份作業的錯題）',
  sourceText:
    "The hunters killed the mother bear. The poor cubs have lost their mother.\n" +
    "My teacher has checked theirs. They're the best ones.\n" +
    "You can borrow ours if you want to read.\n" +
    "My father and I are having our dinner.\n" +
    "The men aren't doing their work.\n" +
    "\n" +
    "Mrs. Wilson has one red car and one white car. They are hers.\n" +
    "They are Jill and Bruce. Their eyes are big and brown.\n" +
    "Tony and Peter are brothers. Their father is a doctor.\n" +
    "\n" +
    "Stay away from the bees' hive, or you probably get bee stings.\n" +
    "The pigs' tails are cute and curly.\n" +
    "These are the boys' bikes.\n" +
    "My children's rooms are very neat and clean.\n" +
    "\n" +
    "Those are the woman's baskets. They are her baskets.\n" +
    "Look at the cat! Its tail is very long.\n" +
    "\n" +
    "There is some cheese in the fridge.\n" +
    "There isn't any chocolate on the table.\n" +
    "There is a pair of new sneakers on the shelf. I like them very much.\n" +
    "\n" +
    "Where is the house's front door?\n" +
    "These are the actor's jackets.",
  notes: [
    {
      title: '📌 所有格代名詞永遠不加撇號',
      body: "hers、theirs、ours、yours、his、its 這幾個字，不管句子多複雜，絕對不會出現撇號。her's、their's、its' 都是不存在的字——這是錯題本裡重複最多次的錯誤。",
      examples: [
        { text: 'They are hers. （正確：hers 沒有撇號）', speak: 'They are hers.' },
        { text: 'Their eyes are big and brown. （Their 後面有名詞 eyes，不是 Theirs）', speak: 'Their eyes are big and brown.' },
      ],
    },
    {
      title: '📌 所有格形容詞 vs. 所有格代名詞：看空格後面有沒有名詞',
      body: '空格後面「還有名詞」，要用 my/your/his/her/its/our/their；空格後面「沒有名詞、句子就結束了」，要用 mine/yours/his/hers/its/ours/theirs。',
      examples: [
        { text: 'The poor cubs have lost their mother. （後面有 mother，用 their）', speak: 'The poor cubs have lost their mother.' },
        { text: 'My teacher has checked theirs. （後面沒有名詞了，用 theirs）', speak: 'My teacher has checked theirs.' },
        { text: 'You can borrow ours if you want to read. （後面沒有名詞，用 ours）', speak: 'You can borrow ours if you want to read.' },
      ],
    },
    {
      title: '📌 複數所有格撇號：規則複數只加一撇，不規則複數正常加 \'s',
      body: '一般複數名詞字尾已經是 s（bees、pigs、boys），所有格只要在字尾加一撇就好。但不規則複數（children、women、men）字尾本來就沒有 s，所有格還是要正常加 \'s。',
      examples: [
        { text: "Stay away from the bees' hive. （bees 是規則複數，只加一撇）", speak: "Stay away from the bees' hive." },
        { text: "The pigs' tails are cute and curly. （同上）", speak: "The pigs' tails are cute and curly." },
        { text: "My children's rooms are very neat and clean. （children 是不規則複數，正常加 's）", speak: "My children's rooms are very neat and clean." },
      ],
    },
    {
      title: '📌 單數還是複數所有格，要看句子裡的線索',
      body: '句子裡常常藏著判斷單複數的線索，例如 her（一個女生）、their（很多人）。看清楚線索，再決定所有格要用單數還是複數形式。',
      examples: [
        { text: "Those are the woman's baskets. They are her baskets. （her = 一個人，所以用單數 woman's）", speak: "Those are the woman's baskets. They are her baskets." },
      ],
    },
    {
      title: '📌 不可數名詞要配 is/isn\'t，不能配 are/aren\'t',
      body: 'cheese、bread、peanut butter、chocolate、flour、sugar 這些食物都是不可數名詞，就算聽起來很多，也要搭配單數的 is/isn\'t。"a pair of + 複數名詞" 也要當作單數看待。',
      examples: [
        { text: 'There is some cheese in the fridge. （cheese 不可數，用 is）', speak: 'There is some cheese in the fridge.' },
        { text: "There isn't any chocolate on the table. （chocolate 不可數，用 isn't）", speak: "There isn't any chocolate on the table." },
        { text: 'There is a pair of new sneakers on the shelf. （sneakers 雖然複數，但 a pair 是單數）', speak: 'There is a pair of new sneakers on the shelf.' },
      ],
    },
    {
      title: "📌 's 所有格 vs. of 所有格：這個單元比較偏好 's",
      body: "the house's front door 跟 the front door of the house 意思一樣，但這個單元的考題比較常把 's 所有格當作標準答案，建議優先使用 's。",
      examples: [
        { text: "Where is the house's front door?", speak: "Where is the house's front door?" },
        { text: "These are the actor's jackets.", speak: "These are the actor's jackets." },
      ],
    },
  ],
  questions: [
    {
      id: 'pfr-1',
      questionText: 'The hunters killed the mother bear. The poor cubs have lost ___ mother.',
      correctAnswer: 'their',
      explanation: '空格後面還有名詞 mother，要用所有格形容詞 their（牠們的），不能用代名詞 theirs。',
      sourceSentence: 'The hunters killed the mother bear. The poor cubs have lost their mother.',
      questionType: 'fill_blank',
      icon: '🐻',
    },
    {
      id: 'pfr-2',
      questionText: "These are Rita's and Peter's compositions. My teacher has checked ___. They're the best ones.",
      correctAnswer: 'theirs',
      explanation: '空格後面沒有名詞了，句子就結束了，要用所有格代名詞 theirs（他們的東西），不能用 their。',
      sourceSentence: "These are Rita's and Peter's compositions. My teacher has checked theirs. They're the best ones.",
      questionType: 'fill_blank',
      icon: '📝',
    },
    {
      id: 'pfr-3',
      questionText: "'They are her's.' is a correct English sentence.",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: "her's 根本不是一個字。所有格代名詞「她的」只能寫 hers，永遠不加撇號。",
      sourceSentence: 'Mrs. Wilson has one red car and one white car. They are hers.',
      questionType: 'true_false',
      icon: '🚫',
    },
    {
      id: 'pfr-4',
      questionText: 'Mrs. Wilson has one red car and one white car. ___.',
      options: ["They are her's", 'They are hers', 'It is hers'],
      correctAnswer: 'They are hers',
      explanation: 'Mrs. Wilson 有兩台車（複數，要用 They are），所有格代名詞是 hers，不加撇號。',
      sourceSentence: 'Mrs. Wilson has one red car and one white car. They are hers.',
      questionType: 'multiple_choice',
      icon: '🚗',
    },
    {
      id: 'pfr-5',
      questionText: "Stay away from the ___ hive, or you probably get bee stings.",
      correctAnswer: "bees'",
      explanation: 'bees 是規則複數（字尾已經是 s），所有格只要加一撇：bees\'。',
      sourceSentence: "Stay away from the bees' hive, or you probably get bee stings.",
      questionType: 'fill_blank',
      icon: '🐝',
    },
    {
      id: 'pfr-6',
      questionText: '___ tails are cute and curly.',
      correctAnswer: "pigs'",
      explanation: '跟 bees\' 是同一條規則：pigs 字尾已經是 s，所有格只加一撇。',
      sourceSentence: "The pigs' tails are cute and curly.",
      questionType: 'fill_blank',
      icon: '🐷',
    },
    {
      id: 'pfr-7',
      questionText: 'These are the ___ bikes.',
      options: ["boys'", 'boys', "boys's"],
      correctAnswer: "boys'",
      explanation: 'boys 是規則複數，所有格只加一撇變成 boys\'，不是完全不加（boys）也不是再加 \'s（boys\'s）。',
      sourceSentence: "These are the boys' bikes.",
      questionType: 'multiple_choice',
      icon: '🚲',
    },
    {
      id: 'pfr-8',
      questionText: "\"Childrens'\" and \"children's\" both correctly mean 'belonging to the children'.",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: "children 是不規則複數，字尾本來就沒有 s，所以所有格要正常加 's 變成 children's，不是 childrens'（這個字不存在）。",
      sourceSentence: "My children's rooms are very neat and clean.",
      questionType: 'true_false',
      icon: '🧒',
    },
    {
      id: 'pfr-9',
      questionText: 'Those are the ___ baskets. They are her baskets.',
      options: ["woman's", "women's", "womens'"],
      correctAnswer: "woman's",
      explanation: '句尾 her 是單數（一位女生），所以要用單數所有格 woman\'s，不是複數的 women\'s。',
      sourceSentence: "Those are the woman's baskets. They are her baskets.",
      questionType: 'multiple_choice',
      icon: '👜',
    },
    {
      id: 'pfr-10',
      questionText: 'Look at the cat! ___ tail is very long.',
      options: ["It's", "Its'", 'Its'],
      correctAnswer: 'Its',
      explanation: "It's 是 it is 的縮寫，Its' 這個字不存在。要說「牠的尾巴」，後面接名詞 tail，要用沒有撇號的 Its。",
      sourceSentence: 'Look at the cat! Its tail is very long.',
      questionType: 'multiple_choice',
      icon: '🐱',
    },
    {
      id: 'pfr-11',
      questionText: '( There isn\'t / There are / There is ) some cheese in the fridge.',
      options: ["There isn't", 'There are', 'There is'],
      correctAnswer: 'There is',
      explanation: 'cheese（起司）是不可數名詞，要搭配單數動詞 is，不能用 are。',
      sourceSentence: 'There is some cheese in the fridge.',
      questionType: 'multiple_choice',
      icon: '🧀',
    },
    {
      id: 'pfr-12',
      questionText: "'There are some chocolate on the table.' is grammatically correct.",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: "chocolate（巧克力）是不可數名詞，要用 There isn't any 或 There is some，不能用 are。",
      sourceSentence: "There isn't any chocolate on the table.",
      questionType: 'true_false',
      icon: '🍫',
    },
    {
      id: 'pfr-13',
      questionText: '___ a pair of new sneakers on the shelf. I like them very much.',
      options: ['There is', 'There are'],
      correctAnswer: 'There is',
      explanation: 'sneakers 雖然是複數，但句子真正的主詞是「a pair（一雙）」，一雙是單數，所以要用 There is。這句是個常考的陷阱句型。',
      sourceSentence: 'There is a pair of new sneakers on the shelf. I like them very much.',
      questionType: 'multiple_choice',
      icon: '👟',
    },
    {
      id: 'pfr-14',
      questionText: 'Choose the sentence this unit prefers.',
      options: ['Where is the front door of the house?', "Where is the house's front door?"],
      correctAnswer: "Where is the house's front door?",
      explanation: '兩句意思一樣，但這個單元的考題比較常把 \'s 所有格當作標準答案，建議優先使用 \'s 的寫法。',
      sourceSentence: "Where is the house's front door?",
      questionType: 'multiple_choice',
      icon: '🚪',
    },
    {
      id: 'pfr-15',
      questionText: 'These are ___.',
      options: ["the actor's jackets", 'the jackets of the actor', "the actors' jacket"],
      correctAnswer: "the actor's jackets",
      explanation: '一位演員（單數）擁有的外套，要用單數所有格 the actor\'s jackets，不是用 of 的寫法，也不是把人變複數（the actors\'）卻把外套變單數（jacket），前後矛盾。',
      sourceSentence: "These are the actor's jackets.",
      questionType: 'multiple_choice',
      icon: '🧥',
    },
    {
      id: 'pfr-16',
      questionText: 'My father and I are having ___ dinner.',
      correctAnswer: 'our',
      explanation: '空格後面還有名詞 dinner，要用所有格形容詞 our（我們的），不能用代名詞 ours。',
      sourceSentence: 'My father and I are having our dinner.',
      questionType: 'fill_blank',
      icon: '🍽️',
    },
    {
      id: 'pfr-17',
      questionText: 'The men aren\'t doing ___ work.',
      correctAnswer: 'their',
      explanation: '空格後面還有名詞 work，要用所有格形容詞 their，不能用代名詞 theirs。',
      sourceSentence: "The men aren't doing their work.",
      questionType: 'fill_blank',
      icon: '🧑‍🔧',
    },
    {
      id: 'pfr-18',
      questionText: 'We have lots of funny comic books. You can borrow ___ if you want to read.',
      correctAnswer: 'ours',
      explanation: '空格後面沒有名詞了，句子就結束了，要用所有格代名詞 ours，不能用 our。',
      sourceSentence: 'We have lots of funny comic books. You can borrow ours if you want to read.',
      questionType: 'fill_blank',
      icon: '📚',
    },
    {
      id: 'pfr-19',
      questionText: "'They are Jill and Bruce. Theirs eyes are big and brown.' — which word is wrong?",
      options: ['Jill and Bruce', 'Theirs', 'big and brown'],
      correctAnswer: 'Theirs',
      explanation: 'eyes 後面有名詞，應該用所有格形容詞 Their（他們的），不能用代名詞 Theirs（Theirs 後面不能再接名詞）。',
      sourceSentence: 'They are Jill and Bruce. Their eyes are big and brown.',
      questionType: 'multiple_choice',
      icon: '👀',
    },
    {
      id: 'pfr-20',
      questionText: "Tony and Peter are brothers. ___ father is a doctor.",
      options: ["Their's", 'Their', 'Theirs'],
      correctAnswer: 'Their',
      explanation: '空格後面有名詞 father，要用所有格形容詞 Their；Their\'s 這個字不存在，Theirs 後面不能接名詞。',
      sourceSentence: 'Tony and Peter are brothers. Their father is a doctor.',
      questionType: 'multiple_choice',
      icon: '👨‍⚕️',
    },
  ],
};

export default chapter;
