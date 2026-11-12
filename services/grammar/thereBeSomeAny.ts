import { GrammarQuestion, GrammarCategory } from '../../types';

const C = GrammarCategory.THERE_BE_SOME_ANY;

export const THERE_BE_SOME_ANY_QUESTIONS: GrammarQuestion[] = [
  {
    id: "there_be_9", category: C,
    sentenceContext: "___ a dog in the garden.",
    options: ["There is", "There are"], correctAnswer: "There is",
    ruleReminder: "a dog 是單數，用 There is。例：There is a bird."
  },
  {
    id: "there_be_10", category: C,
    sentenceContext: "There ___ two birds in the tree.",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "two birds 是複數，用 There are。例：There are two cats."
  },
  {
    id: "there_be_11", category: C,
    sentenceContext: "There ___ some water in the glass.",
    options: ["are", "is"], correctAnswer: "is",
    ruleReminder: "water 不可數，當單數看，用 There is。例：There is some milk."
  },
  {
    id: "there_be_12", category: C,
    sentenceContext: "There ___ some rice in the bowl.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "rice 不可數，用 There is some rice。"
  },
  {
    id: "there_be_13", category: C,
    sentenceContext: "There ___ a lot of toys in my room.",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "a lot of 後面是複數 toys，用 There are。"
  },
  {
    id: "there_be_14", category: C,
    sentenceContext: "There ___ a lot of rain in June.",
    options: ["are", "is"], correctAnswer: "is",
    ruleReminder: "rain 不可數，就算有 a lot of 也用 There is。"
  },
  {
    id: "there_be_15", category: C,
    sentenceContext: "___ an apple in my lunch box.",
    options: ["There are", "There's"], correctAnswer: "There's",
    ruleReminder: "an apple 是單數，用 There's (= There is)。"
  },
  {
    id: "there_be_16", category: C,
    sentenceContext: "___ any pencils in your bag?",
    options: ["Is there", "Are there"], correctAnswer: "Are there",
    ruleReminder: "pencils 是複數，問句用 Are there any...？"
  },
  {
    id: "there_be_17", category: C,
    sentenceContext: "___ a park near your house?",
    options: ["Are there", "Is there"], correctAnswer: "Is there",
    ruleReminder: "a park 是單數，問句用 Is there a...？"
  },
  {
    id: "there_be_18", category: C,
    sentenceContext: "___ any homework today?",
    options: ["Is there", "Are there"], correctAnswer: "Is there",
    ruleReminder: "homework 不可數，問句用 Is there any homework？"
  },
  {
    id: "there_be_19", category: C,
    sentenceContext: "Are there any cookies in the box? Yes, there ___.",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "用 Are there 問，就用 Yes, there are. 回答。"
  },
  {
    id: "there_be_20", category: C,
    sentenceContext: "Is there a clock in the kitchen? No, there ___.",
    options: ["isn't", "aren't"], correctAnswer: "isn't",
    ruleReminder: "用 Is there 問，否定回答是 No, there isn't."
  },
  {
    id: "there_be_21", category: C,
    sentenceContext: "Are there any fish in the pond? No, there ___.",
    options: ["aren't", "isn't"], correctAnswer: "aren't",
    ruleReminder: "用 Are there 問，否定回答是 No, there aren't."
  },
  {
    id: "there_be_22", category: C,
    sentenceContext: "Is there any bread on the plate? Yes, there ___.",
    options: ["are", "is"], correctAnswer: "is",
    ruleReminder: "bread 不可數，用 Is there 問，回答 Yes, there is."
  },
  {
    id: "there_be_23", category: C,
    sentenceContext: "There aren't ___ chairs in the empty room.",
    options: ["some", "any"], correctAnswer: "any",
    ruleReminder: "否定句用 any。例：There aren't any chairs."
  },
  {
    id: "there_be_24", category: C,
    sentenceContext: "Would you like ___ cake?",
    options: ["any", "some"], correctAnswer: "some",
    ruleReminder: "請別人吃東西 (Would you like...?) 要用 some。"
  },
  {
    id: "there_be_25", category: C,
    sentenceContext: "Can I have ___ water, please?",
    options: ["some", "any"], correctAnswer: "some",
    ruleReminder: "向別人要東西 (Can I have...?) 用 some。"
  },
  {
    id: "there_be_26", category: C,
    sentenceContext: "There is ___ umbrella by the door.",
    options: ["a", "an", "some"], correctAnswer: "an",
    ruleReminder: "umbrella 開頭是母音 u，用 an。例：an umbrella"
  },
  {
    id: "there_be_27", category: C,
    sentenceContext: "There is ___ cat on the sofa.",
    options: ["a", "an", "any"], correctAnswer: "a",
    ruleReminder: "cat 是單數，開頭不是母音，用 a。例：a cat"
  },
  {
    id: "there_be_28", category: C,
    sentenceContext: "There is ___ juice in the cup.",
    options: ["a", "some", "an"], correctAnswer: "some",
    ruleReminder: "juice 不可數，不能用 a/an，肯定句用 some。"
  },
  {
    id: "there_be_29", category: C,
    sentenceContext: "There are ___ eggs in the nest.",
    options: ["an", "a", "some"], correctAnswer: "some",
    ruleReminder: "eggs 是複數，不能用 a/an，肯定句用 some。"
  },
  {
    id: "there_be_30", category: C,
    sentenceContext: "Is there ___ cheese in the sandwich?",
    options: ["many", "any"], correctAnswer: "any",
    ruleReminder: "cheese 不可數，問句用 any。many 只能接複數名詞。"
  },
  {
    id: "there_be_31", category: C,
    sentenceContext: "There isn't ___ money in my piggy bank.",
    options: ["any", "some"], correctAnswer: "any",
    ruleReminder: "否定句用 any。例：There isn't any money."
  },
  {
    id: "there_be_32", category: C,
    sentenceContext: "There are ___ flowers in the vase.",
    options: ["any", "some"], correctAnswer: "some",
    ruleReminder: "肯定句用 some。例：There are some flowers."
  },
  {
    id: "there_be_33", category: C,
    sentenceContext: "There ___ any students in the library on Sunday.",
    options: ["isn't", "aren't"], correctAnswer: "aren't",
    ruleReminder: "students 是複數，否定句用 There aren't any。"
  },
  {
    id: "there_be_34", category: C,
    sentenceContext: "There ___ any ice cream in the freezer.",
    options: ["aren't", "isn't"], correctAnswer: "isn't",
    ruleReminder: "ice cream 不可數，否定句用 There isn't any。"
  },
  {
    id: "there_be_35", category: C,
    sentenceContext: "___ two bedrooms in our apartment.",
    options: ["There's", "There are"], correctAnswer: "There are",
    ruleReminder: "two bedrooms 是複數，用 There are。"
  },
  {
    id: "there_be_36", category: C,
    sentenceContext: "___ some soup on the stove.",
    options: ["There are", "There's"], correctAnswer: "There's",
    ruleReminder: "soup 不可數，用 There's (= There is) some soup。"
  },
  {
    id: "there_be_37", category: C,
    sentenceContext: "How ___ children are there in your class?",
    options: ["many", "much"], correctAnswer: "many",
    ruleReminder: "children 可數 (複數)，問數量用 How many。"
  },
  {
    id: "there_be_38", category: C,
    sentenceContext: "How ___ milk is there in the bottle?",
    options: ["many", "much"], correctAnswer: "much",
    ruleReminder: "milk 不可數，問多少用 How much。"
  },
  {
    id: "there_be_39", category: C,
    sentenceContext: "How many windows ___ in your bedroom?",
    options: ["is there", "are there"], correctAnswer: "are there",
    ruleReminder: "How many + 複數名詞，後面用 are there。"
  },
  {
    id: "there_be_40", category: C,
    sentenceContext: "How much rice ___ in the pot?",
    options: ["is there", "are there"], correctAnswer: "is there",
    ruleReminder: "How much + 不可數名詞，後面用 is there。"
  },
  {
    id: "there_be_41", category: C,
    sentenceContext: "There ___ many people at the beach today.",
    options: ["are", "is"], correctAnswer: "are",
    ruleReminder: "people 是複數 (很多人)，用 There are。"
  },
  {
    id: "there_be_42", category: C,
    sentenceContext: "There ___ no bananas in the kitchen.",
    options: ["is", "are"], correctAnswer: "are",
    ruleReminder: "bananas 是複數，用 There are no...。"
  },
  {
    id: "there_be_43", category: C,
    sentenceContext: "Would you like ___ grapes?",
    options: ["a", "some"], correctAnswer: "some",
    ruleReminder: "grapes 是複數，請別人吃用 Would you like some...？"
  },
  {
    id: "there_be_44", category: C,
    sentenceContext: "Could I have ___ paper, please?",
    options: ["some", "an"], correctAnswer: "some",
    ruleReminder: "paper (紙) 不可數，要東西時用 some。"
  },
  {
    id: "there_be_45", category: C,
    sentenceContext: "___ any snow on the mountain?",
    options: ["Are there", "Is there"], correctAnswer: "Is there",
    ruleReminder: "snow 不可數，問句用 Is there any snow？"
  },
  {
    id: "there_be_46", category: C,
    sentenceContext: "I can't find my socks. There ___ any socks in the drawer.",
    options: ["aren't", "isn't"], correctAnswer: "aren't",
    ruleReminder: "socks 是複數，否定句用 There aren't any。"
  },
  {
    id: "there_be_47", category: C,
    sentenceContext: "There are ___ lot of trees in the park.",
    options: ["some", "an", "a"], correctAnswer: "a",
    ruleReminder: "「很多」是 a lot of，固定用 a。例：a lot of trees"
  },
  {
    id: "there_be_48", category: C,
    sentenceContext: "There is ___ old house on the hill.",
    options: ["a", "some", "an"], correctAnswer: "an",
    ruleReminder: "old 開頭是母音 o，用 an。例：an old house"
  },
  {
    id: "there_be_49", category: C,
    sentenceContext: "There isn't ___ bus at the bus stop.",
    options: ["a", "an", "some"], correctAnswer: "a",
    ruleReminder: "bus 是單數，開頭不是母音，用 a。There isn't a bus."
  },
  {
    id: "there_be_50", category: C,
    sentenceContext: "Is there ___ elephant at the zoo?",
    options: ["a", "an"], correctAnswer: "an",
    ruleReminder: "elephant 開頭是母音 e，用 an。例：an elephant"
  },
  {
    id: "there_be_51", category: C,
    sentenceContext: "___ there a swimming pool at your school? Yes, there is.",
    options: ["Are", "Is"], correctAnswer: "Is",
    ruleReminder: "a swimming pool 是單數，問句用 Is there...？"
  },
  {
    id: "there_be_52", category: C,
    sentenceContext: "Is there a TV in your bedroom? ___, there isn't.",
    options: ["Yes", "No"], correctAnswer: "No",
    ruleReminder: "there isn't 是否定，前面要配 No。Yes 配 there is。"
  },
  {
    id: "there_be_53", category: C,
    sentenceContext: "There ___ a lot of homework this weekend.",
    options: ["is", "are"], correctAnswer: "is",
    ruleReminder: "homework 不可數，就算有 a lot of 也用 There is。"
  },
  {
    id: "there_be_54", category: C,
    sentenceContext: "There are ___ boys and girls in the playground.",
    options: ["a", "any", "some"], correctAnswer: "some",
    ruleReminder: "肯定句 + 複數名詞，用 some。例：There are some kids."
  }
];
