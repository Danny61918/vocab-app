import { ReviewChapter } from '../types';

// Source: the Unit 3 textbook ("Unit 3 textbook" — the book title is not recorded), lessons named in sourceRef. Every question is built from a
// sentence printed in the book (sourceSentence). Designed and checked in .doc/v2.0/phase-10-clil-unit3/RESEARCH.md: each question has exactly one
// acceptable answer (options are wrong for a clear reason: they do not fit the grammar or they contradict the text). Fill-in-the-blank
// questions are single words answered with the letter tiles (the tiles only offer the target letters plus a few decoys).
const chapter: ReviewChapter = {
  id: "u3-should-advice",
  title: "生病了怎麼辦 (You should… / You shouldn't…)",
  sourceRef: "Unit 3 textbook, Lesson 4 (p22)",
  sourceText:
    "You should go to the doctor's. / You shouldn't eat so many sweets.\n" +
    "stay in bed / go out in the rain / drink some water / sit down\n" +
    "I've got a cold. / You should stay in bed. / I feel sick. / You shouldn't eat so many sweets.\n" +
    "If you feel dizzy, you should ____. / If you've got a cold, you shouldn't ____. / If you've got an earache, you should ____.",
  glossary: [
    { term: "cold", icon: "🤧", zh: "感冒" },
    { term: "earache", icon: "👂", zh: "耳朵痛" },
    { term: "go to the doctor's", icon: "🩺", zh: "去看醫生" },
    { term: "stay in bed", icon: "🛏️", zh: "待在床上" },
    { term: "go out in the rain", icon: "🌧️", zh: "冒雨出門" },
    { term: "sit down", icon: "🪑", zh: "坐下" },
    { term: "drink some water", icon: "🥤", zh: "喝一些水" },
  ],
  notes: [
    {
      title: "should／shouldn't 給建議",
      body: "should（應該）、shouldn't（不應該）後面接動詞原形；should 本身永遠不加 s，主詞是 he／she／Molly 也一樣。",
      examples: [
        { text: "You should stay in bed.", speak: "You should stay in bed." },
        { text: "You shouldn't eat so many sweets.", speak: "You shouldn't eat so many sweets." },
        { text: "Molly should drink some water.", speak: "Molly should drink some water." },
      ],
    },
  ],
  questions: [
    {
      id: "u3-should-1",
      questionText: "\"I've got a cold.\" \"You should ___.\"",
      options: ["go out in the rain","stay in bed","eat so many sweets"],
      correctAnswer: "stay in bed",
      explanation: "感冒（a cold）應該待在床上休息（stay in bed）。go out in the rain（冒雨出去）會更嚴重；eat so many sweets 是課本裡「不應該」做的事。",
      sourceSentence: "I've got a cold. / You should stay in bed.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-2",
      questionText: "\"I feel sick.\" \"You ___ eat so many sweets.\"",
      options: ["should","shouldn't"],
      correctAnswer: "shouldn't",
      explanation: "吃太多糖果會想吐，所以「不應該」吃那麼多：shouldn't。should 是「應該」，意思剛好相反。英式英文 I feel sick 常指「想吐、反胃」。",
      sourceSentence: "I feel sick. / You shouldn't eat so many sweets.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-3",
      questionText: "\"You shouldn't eat so many sweets\" means eating lots of sweets is a good idea.",
      options: ["True","False"],
      correctAnswer: "False",
      explanation: "shouldn't＝should not（不應該），意思是吃很多糖果「不是」好主意。看到 n't 要停下來，它把整句的意思翻過來。",
      sourceSentence: "You shouldn't eat so many sweets.",
      questionType: "true_false",
    },
    {
      id: "u3-should-4",
      questionText: "I've got a ___.",
      options: ["sick","dizzy","cold"],
      correctAnswer: "cold",
      explanation: "I've got a 後面要接名詞：a cold（感冒）、a headache（頭痛）。sick（不舒服的）和 dizzy（頭暈的）是形容詞，要說 I feel sick.、I feel dizzy.，前面不能加 a。",
      sourceSentence: "I've got a cold.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-5",
      questionText: "I feel ___.",
      options: ["dizzy","a cold","a headache"],
      correctAnswer: "dizzy",
      explanation: "feel 後面接形容詞：dizzy（頭暈的）、sick（不舒服的）。a cold、a headache 是名詞，要用 I've got a cold.、I've got a headache.。這題和上一題是一對，練「a 後面放名詞，feel 後面放形容詞」。",
      sourceSentence: "I feel dizzy.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-6",
      questionText: "Molly ___ some water.",
      options: ["should drinks","should drink","shoulds drink"],
      correctAnswer: "should drink",
      explanation: "should 後面一定接動詞原形（drink），而且 should 本身永遠不加 s，主詞是 Molly（她）也一樣。",
      sourceSentence: "You should drink some water, Molly.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-7",
      questionText: "If you've got a cold, you shouldn't ___.",
      options: ["stay in bed","drink some water","go out in the rain"],
      correctAnswer: "go out in the rain",
      explanation: "注意是 shouldn't（不應該）！感冒時不應該冒雨出去（go out in the rain）。stay in bed 和 drink some water 都是「應該做」的好建議，放在 shouldn't 後面意思就反了。",
      sourceSentence: "If you've got a cold, you shouldn't ___.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-8",
      questionText: "If you feel dizzy, you should ___.",
      options: ["sit down","go out in the rain","eat so many sweets"],
      correctAnswer: "sit down",
      explanation: "頭暈（dizzy）應該坐下（sit down），故事裡 Eve 頭暈時大家也叫她 sit down。冒雨出去、吃很多糖果都不是好建議。",
      sourceSentence: "If you feel dizzy, you should ___. / You need to sit down, Eve.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-should-9",
      questionText: "If you've got an earache, you should ___.",
      options: ["eat so many sweets","go to the doctor's","go out in the rain"],
      correctAnswer: "go to the doctor's",
      explanation: "earache＝ear（耳朵）＋ache（痛），耳朵痛應該去看醫生。go to the doctor's 的 's 指「醫生的診所」。另外兩個是不應該做的事。",
      sourceSentence: "If you've got an earache, you should ___. / You should go to the doctor's.",
      questionType: "multiple_choice",
    },
  ],
};

export default chapter;
