import { ReviewChapter } from '../types';

// Source: the Unit 3 textbook ("Unit 3 textbook" — the book title is not recorded), lessons named in sourceRef. Every question is built from a
// sentence printed in the book (sourceSentence). Designed and checked in .doc/v2.0/phase-10-clil-unit3/RESEARCH.md: each question has exactly one
// acceptable answer (options are wrong for a clear reason: they do not fit the grammar or they contradict the text). Fill-in-the-blank
// questions are single words answered with the letter tiles (the tiles only offer the target letters plus a few decoys).
const chapter: ReviewChapter = {
  id: "u3-concert-story",
  title: "故事：音樂會 (The Concert)",
  sourceRef: "Unit 3 textbook, Lesson 3 (p20–21)",
  sourceText:
    "On the way to the concert!\n" +
    "I can't wait for the concert! / Suzy Silver is brilliant! / Are we nearly there? / Can you sit still, please?\n" +
    "Oh no, a traffic jam! We're late! / Look. We can go on that road.\n" +
    "I've got a headache. / And I feel sick. / You shouldn't eat so many sweets!\n" +
    "You should drink some water, Molly. Here you are. / Thanks.\n" +
    "Look! It's Suzy Silver! / There's a problem with her van. / Can you help me? I'm late! / Yes, of course. We can give you a lift.\n" +
    "Suzy, I can do all our dances! / Sit still and be quiet! PLEASE!\n" +
    "Come with me – I can get you seats at the front! / Hurray! I'm so excited! / Me too!\n" +
    "This is fantastic!\n" +
    "What's the matter, Eve? / I feel dizzy.\n" +
    "You need to sit down, Eve. / That's right. Sit still and be quiet!",
  glossary: [
    { term: "concert", icon: "🎤", zh: "演唱會" },
    { term: "traffic jam", icon: "🚗", zh: "塞車" },
    { term: "headache", icon: "🤕", zh: "頭痛" },
    { term: "feel sick", icon: "🤢", zh: "想吐、不舒服" },
    { term: "sweets", icon: "🍬", zh: "糖果" },
    { term: "van", icon: "🚐", zh: "廂型車" },
    { term: "give you a lift", icon: "🚙", zh: "載你一程" },
    { term: "dizzy", icon: "😵", zh: "頭暈的" },
    { term: "sit still", icon: "🪑", zh: "坐著不動" },
    { term: "fantastic", icon: "🤩", zh: "太棒了" },
  ],
  notes: [
    {
      title: "說身體不舒服",
      body: "I've got a ＋名詞（a headache、a cold）；I feel ＋形容詞（sick、dizzy）。",
      examples: [
        { text: "I've got a headache.", speak: "I've got a headache." },
        { text: "I feel sick.", speak: "I feel sick." },
        { text: "I feel dizzy.", speak: "I feel dizzy." },
        { text: "What's the matter?", speak: "What's the matter?" },
      ],
    },
  ],
  questions: [
    {
      id: "u3-concert-1",
      questionText: "Oh no, a ___! We're late!",
      options: ["headache","traffic jam","lift"],
      correctAnswer: "traffic jam",
      explanation: "第 2 格：遇到塞車（traffic jam）所以遲到。headache 是頭痛，不會讓車子遲到；lift 在這個故事裡是「載一程」。",
      sourceSentence: "Oh no, a traffic jam! We're late!",
      questionType: "multiple_choice",
    },
    {
      id: "u3-concert-2",
      questionText: "Eve and the children give Suzy Silver a lift.",
      options: ["True","False"],
      correctAnswer: "True",
      explanation: "第 5 格 Suzy Silver 的車壞了，他們說 We can give you a lift.（我們可以載你一程），課本摘要也寫 so they give her a lift。這句是對的。",
      sourceSentence: "Yes, of course. We can give you a lift.",
      questionType: "true_false",
    },
    {
      id: "u3-concert-3",
      questionText: "\"What's the matter, Eve?\" means: ___",
      options: ["\"What's wrong, Eve?\"","\"What's your name, Eve?\"","\"Where are you, Eve?\""],
      correctAnswer: "\"What's wrong, Eve?\"",
      explanation: "What's the matter? 是「怎麼了？哪裡不舒服？」，跟 What's wrong? 一樣。不是問名字，也不是問在哪裡。後面 Eve 回答 I feel dizzy.（我頭暈）。",
      sourceSentence: "What's the matter, Eve?",
      questionType: "multiple_choice",
    },
    {
      id: "u3-concert-4",
      questionText: "Which sentence is NOT in the story?",
      options: ["I've got a headache.","And I feel sick.","I've got a cold.","I feel dizzy."],
      correctAnswer: "I've got a cold.",
      explanation: "先把 NOT 圈起來！要找「故事裡沒有」的句子。headache 和 feel sick 在第 3 格、feel dizzy 在第 9 格；I've got a cold（我感冒了）是下一頁 p22 練習的句子，不在故事裡。",
      sourceSentence: "I've got a headache. / And I feel sick. / I feel dizzy.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-concert-5",
      questionText: "In the story, Eve feels tired.",
      options: ["True","False"],
      correctAnswer: "False",
      explanation: "第 9 格 Eve 說的是 I feel dizzy.（我頭暈），不是 tired（累）。課本練習 3 就是要把 tired 改成 dizzy。整句只差一個字的時候最容易看漏，要一個字一個字對。",
      sourceSentence: "What's the matter, Eve? / I feel dizzy.",
      questionType: "true_false",
    },
    {
      id: "u3-concert-6",
      questionText: "\"Archie has got a toothache.\" One word is wrong. Which word?",
      options: ["Archie","got","toothache"],
      correctAnswer: "toothache",
      explanation: "故事裡沒有人牙痛（toothache）；第 3 格說的是 I've got a headache.（頭痛）。所以錯的字是 toothache。這是課本 p21 練習 3 的第一題。",
      sourceSentence: "I've got a headache.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-concert-7",
      questionText: "Archie has got a ___, not a toothache.",
      correctAnswer: "headache",
      explanation: "head（頭）＋ache（痛）＝headache 頭痛；tooth（牙齒）＋ache＝toothache 牙痛；ear（耳朵）＋ache＝earache 耳朵痛。用「哪裡＋ache」來記。",
      sourceSentence: "I've got a headache.",
      questionType: "fill_blank",
    },
    {
      id: "u3-concert-8",
      questionText: "\"We can give you a lift.\" This means: ___",
      options: ["We can lift your van.","We can give you a present.","We can take you in our car."],
      correctAnswer: "We can take you in our car.",
      explanation: "give someone a lift 是「開車載某人一程」（單字庫 give a lift / ride）。lift 單獨用時也有「舉起」的意思，但這裡是片語，不是把車子舉起來，也不是送禮物。",
      sourceSentence: "Yes, of course. We can give you a lift.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-concert-9",
      questionText: "\"Can you sit still, please?\" Here, \"still\" means ___.",
      options: ["not moving","even now","very fast"],
      correctAnswer: "not moving",
      explanation: "sit still＝坐著不要動，still 在這裡是「靜止的」。still 另一個意思是「仍然」（I'm still hungry.），要看句子判斷。very fast 跟「不動」意思相反。",
      sourceSentence: "Can you sit still, please?",
      questionType: "multiple_choice",
    },
    {
      id: "u3-concert-10",
      questionText: "In the story, the children say, \"Sit still and be quiet!\" Who are they talking to?",
      options: ["Molly","Suzy Silver","Eve"],
      correctAnswer: "Eve",
      explanation: "第 10 格孩子們對 Eve 說 You need to sit down, Eve. … Sit still and be quiet!。第 6 格開車的 Eve 也對孩子們說過同一句話（圖中開車的人就是 Eve），後來角色對調，是故事好笑的地方。",
      sourceSentence: "You need to sit down, Eve. / That's right. Sit still and be quiet!",
      questionType: "multiple_choice",
    },
  ],
};

export default chapter;
