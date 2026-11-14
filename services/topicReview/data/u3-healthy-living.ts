import { ReviewChapter } from '../types';

// Source: the Unit 3 textbook ("Unit 3 textbook" — the book title is not recorded), lessons named in sourceRef. Every question is built from a
// sentence printed in the book (sourceSentence). Designed and checked in .doc/v2.0/phase-10-clil-unit3/RESEARCH.md: each question has exactly one
// acceptable answer (options are wrong for a clear reason: they do not fit the grammar or they contradict the text). Fill-in-the-blank
// questions are single words answered with the letter tiles (the tiles only offer the target letters plus a few decoys).
const chapter: ReviewChapter = {
  id: "u3-healthy-living",
  title: "健康生活四規則 (Four Rules for Healthy Living)",
  sourceRef: "Unit 3 textbook, Lesson 7 (p23)",
  sourceText:
    "Four rules for healthy living. Your health is very important! Here are four rules to keep you healthy:\n" +
    "1 Eat healthy food. It's a good idea to eat five portions of fruit and vegetables every day. Don't eat lots of junk food. If you feel hungry between meals, eat an apple or a banana.\n" +
    "2 Drink lots of water. Your body is 70% water, so it needs lots of water to keep it healthy. You should drink six to eight glasses of water every day. Don't drink lots of sweet drinks because the sugar is bad for your teeth.\n" +
    "3 Get enough sleep. Your body needs to rest every day. Most adults need seven or eight hours of sleep every night, and children need more. Don't be tired!\n" +
    "4 Do some exercise every day. You can go for a walk, go swimming or play football. You need exercise because it makes you strong and it's good for your heart. And it makes you feel good too!",
  glossary: [
    { term: "fruit and vegetables", icon: "🍎", zh: "水果和蔬菜" },
    { term: "junk food", icon: "🍔", zh: "垃圾食物" },
    { term: "water", icon: "💧", zh: "水" },
    { term: "sweet drinks", icon: "🍭", zh: "甜飲料" },
    { term: "teeth", icon: "🦷", zh: "牙齒" },
    { term: "sleep", icon: "😴", zh: "睡覺" },
    { term: "rest", icon: "🛌", zh: "休息" },
    { term: "exercise", icon: "⚽", zh: "運動" },
    { term: "heart", icon: "❤️", zh: "心臟" },
  ],
  notes: [
    {
      title: "海報上的數字",
      body: "海報裡數字很多，要看清楚是哪一條規則。",
      examples: [
        { text: "five portions of fruit and vegetables", speak: "five portions of fruit and vegetables" },
        { text: "70% water", speak: "seventy percent water" },
        { text: "six to eight glasses of water", speak: "six to eight glasses of water" },
        { text: "seven or eight hours of sleep", speak: "seven or eight hours of sleep" },
      ],
    },
  ],
  questions: [
    {
      id: "u3-healthy-1",
      questionText: "The poster says it's a good idea to eat ___ portions of fruit and vegetables every day.",
      options: ["six","five","seven"],
      correctAnswer: "five",
      explanation: "海報第 1 條：每天吃 5 份蔬菜水果。six 是喝水杯數的開頭（six to eight）、seven 是大人睡覺的時數，海報裡數字很多，要對準是哪一條。",
      sourceSentence: "It's a good idea to eat five portions of fruit and vegetables every day.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-healthy-2",
      questionText: "Your body is ___ water.",
      options: ["70%","17%","7%"],
      correctAnswer: "70%",
      explanation: "海報第 2 條：身體有 70%（seventy percent）是水。注意 seventy（70）和 seventeen（17）聽起來很像。",
      sourceSentence: "Your body is 70% water, so it needs lots of water to keep it healthy.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-healthy-3",
      questionText: "Hamburgers, chips and sweets are not healthy food. They are ___.",
      options: ["junk food","exercise","rest"],
      correctAnswer: "junk food",
      explanation: "漢堡、薯條、糖果不是健康食物，是 junk food（垃圾食物）。英式英文的 chips 是「薯條」。exercise 是運動、rest 是休息，都不是食物。",
      sourceSentence: "Don't eat lots of junk food.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-healthy-4",
      questionText: "Exercise is good for your heart.",
      options: ["True","False"],
      correctAnswer: "True",
      explanation: "海報第 4 條：運動讓你強壯，而且對心臟好（good for your heart）。這句是對的。句子跟課文長得不完全一樣，但意思一樣，也是 True。",
      sourceSentence: "You need exercise because it makes you strong and it's good for your heart.",
      questionType: "true_false",
    },
    {
      id: "u3-healthy-5",
      questionText: "Why shouldn't you drink lots of sweet drinks?",
      options: ["Because your body is 70% water.","Because it makes you strong.","Because the sugar is bad for your teeth."],
      correctAnswer: "Because the sugar is bad for your teeth.",
      explanation: "甜飲料裡的糖對牙齒不好。第一個選項是「為什麼要多喝水」的原因，第二個是「為什麼要運動」的原因，都不是這題問的。",
      sourceSentence: "Don't drink lots of sweet drinks because the sugar is bad for your teeth.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-healthy-6",
      questionText: "Children need less sleep than adults.",
      options: ["True","False"],
      correctAnswer: "False",
      explanation: "課文說小孩需要「更多」（more）睡眠，不是更少（less）。",
      sourceSentence: "Most adults need seven or eight hours of sleep every night, and children need more.",
      questionType: "true_false",
    },
    {
      id: "u3-healthy-7",
      questionText: "Which is NOT one of the four rules?",
      options: ["Eat healthy food.","Get enough sleep.","Drink lots of sweet drinks.","Do some exercise every day."],
      correctAnswer: "Drink lots of sweet drinks.",
      explanation: "先圈 NOT！四條規則是 Eat healthy food、Drink lots of water、Get enough sleep、Do some exercise every day。規則是多喝「水」，海報反而說「不要」喝很多甜飲料。",
      sourceSentence: "Drink lots of water. … Don't drink lots of sweet drinks because the sugar is bad for your teeth.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-healthy-8",
      questionText: "When we sleep or ___, our body stops moving.",
      correctAnswer: "rest",
      explanation: "rest＝休息。睡覺或休息的時候，身體停下來不動。這是課本 p23 練習 3 的第 1 題（底線字）。",
      sourceSentence: "Your body needs to rest every day.",
      questionType: "fill_blank",
    },
    {
      id: "u3-healthy-9",
      questionText: "Dancing, tennis and running are different kinds of ___.",
      correctAnswer: "exercise",
      explanation: "跳舞、網球、跑步都是運動（exercise）。課本練習 3 第 4 題。",
      sourceSentence: "Do some exercise every day.",
      questionType: "fill_blank",
    },
    {
      id: "u3-healthy-10",
      questionText: "A ___ drink has got lots of sugar in it.",
      correctAnswer: "sweet",
      explanation: "sweet 是形容詞「甜的」，放在 drink 前面；故事裡的 sweets（多一個 s）是名詞「糖果」。這裡空格後面接 drink，所以用沒有 s 的 sweet。",
      sourceSentence: "Don't drink lots of sweet drinks because the sugar is bad for your teeth.",
      questionType: "fill_blank",
    },
  ],
};

export default chapter;
