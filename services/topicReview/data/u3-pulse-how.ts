import { ReviewChapter } from '../types';
import lesson from './u3-pulse-lesson';

// Source: the Unit 3 textbook ("Unit 3 textbook" — the book title is not recorded), lessons named in sourceRef. Every question is built from a
// sentence printed in the book (sourceSentence). Designed and checked in .doc/v2.0/phase-10-clil-unit3/RESEARCH.md: each question has exactly one
// acceptable answer (options are wrong for a clear reason: they do not fit the grammar or they contradict the text). Fill-in-the-blank
// questions are single words answered with the letter tiles (the tiles only offer the target letters plus a few decoys).
const chapter: ReviewChapter = {
  id: "u3-pulse-how",
  title: "脈搏（一）心臟與量脈搏 (Pulse Rates)",
  sourceRef: "Unit 3 textbook, Lesson 9 (p24)",
  availableFrom: "2026-11-16", // pulse lessons go with the week-12 words (2026-11-16 to 11-20)
  lesson, // the same teaching lesson sits in front of both pulse chapters
  sourceText:
    "Your heart pumps blood around your body. Your heart usually beats about 70 times per minute. When you do a lot of exercise, your heart works more and so it beats more.\n" +
    "You can feel these heartbeats. Put two fingers under the thumb on your left wrist. Press your wrist gently with your fingers. This is your pulse. You measure your pulse in beats per minute (BPM). Take your pulse for 10 seconds. How many beats? Now multiply this number by 6. How many beats per minute is your pulse?",
  glossary: [
    { term: "heart", icon: "❤️", zh: "心臟" },
    { term: "blood", icon: "🩸", zh: "血液" },
    { term: "fingers", icon: "👆", zh: "手指" },
    { term: "thumb", icon: "👍", zh: "大拇指（b 不發音）" },
    { term: "wrist", icon: "⌚", zh: "手腕（w 不發音）" },
    { term: "pulse", icon: "💓", zh: "脈搏" },
    { term: "heartbeat", icon: "💗", zh: "心跳" },
    { term: "measure", icon: "📏", zh: "測量" },
    { term: "multiply", icon: "✖️", zh: "相乘" },
  ],
  notes: [
    {
      title: "怎麼量脈搏",
      body: "照順序做五步：找位置、輕壓、數 10 秒、乘以 6、得到每分鐘幾下（BPM）。",
      examples: [
        { text: "1. Put two fingers under the thumb on your left wrist.", speak: "Put two fingers under the thumb on your left wrist." },
        { text: "2. Press your wrist gently with your fingers.", speak: "Press your wrist gently with your fingers." },
        { text: "3. Take your pulse for 10 seconds.", speak: "Take your pulse for 10 seconds." },
        { text: "4. Multiply this number by 6.", speak: "Multiply this number by 6." },
        { text: "5. This is your pulse in beats per minute (BPM).", speak: "This is your pulse in beats per minute, B P M." },
      ],
    },
  ],
  questions: [
    {
      id: "u3-pulse-1",
      questionText: "Your heart usually beats about ___ times per minute.",
      options: ["70","17","700"],
      correctAnswer: "70",
      explanation: "課本說心臟通常每分鐘跳大約 70 下（seventy）。17 太少、700 太多。（小朋友的心跳通常比 70 快一些，這是正常的。）",
      sourceSentence: "Your heart usually beats about 70 times per minute.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-pulse-2",
      questionText: "Put two fingers under the ___ on your left wrist.",
      options: ["heart","thumb","blood"],
      correctAnswer: "thumb",
      explanation: "兩根手指放在左手腕上、大拇指（thumb）的下方。heart（心臟）和 blood（血液）不在手腕上。",
      sourceSentence: "Put two fingers under the thumb on your left wrist.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-pulse-3",
      questionText: "You can feel your heartbeats in your wrist.",
      options: ["True","False"],
      correctAnswer: "True",
      explanation: "在手腕摸到的一下一下的跳動，就是心跳傳過來的，叫做脈搏（pulse）。這句是對的。",
      sourceSentence: "You can feel these heartbeats. Put two fingers under the thumb on your left wrist. … This is your pulse.",
      questionType: "true_false",
    },
    {
      id: "u3-pulse-4",
      questionText: "Your heart pumps ___ around your body.",
      correctAnswer: "blood",
      explanation: "心臟像幫浦，把血液（blood）送到全身。",
      sourceSentence: "Your heart pumps blood around your body.",
      questionType: "fill_blank",
    },
    {
      id: "u3-pulse-5",
      questionText: "When you do a lot of exercise, your heart beats less.",
      options: ["True","False"],
      correctAnswer: "False",
      explanation: "運動時心臟工作更多，所以跳得「更多」（more），不是更少（less）。只差一個字的是非題要特別小心。",
      sourceSentence: "When you do a lot of exercise, your heart works more and so it beats more.",
      questionType: "true_false",
    },
    {
      id: "u3-pulse-6",
      questionText: "Your heart ___ blood around your body.",
      options: ["pump","pumps","pumping"],
      correctAnswer: "pumps",
      explanation: "主詞 your heart 是「一個」心臟（it），一般句子的動詞要加 s：pumps。這題是「該加 s」的例子，跟 should、Does 後面「不加 s」的題目對照著練。",
      sourceSentence: "Your heart pumps blood around your body.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-pulse-7",
      questionText: "You ___ your pulse in beats per minute (BPM).",
      options: ["multiply","pump","measure"],
      correctAnswer: "measure",
      explanation: "measure＝測量，脈搏的單位是 BPM（每分鐘幾下）。multiply 是「乘」、pump 是「打（血）」，三個都是第 12 週的新字，放在一起比較。",
      sourceSentence: "You measure your pulse in beats per minute (BPM).",
      questionType: "multiple_choice",
    },
    {
      id: "u3-pulse-8",
      questionText: "You take your pulse with your thumb.",
      options: ["True","False"],
      correctAnswer: "False",
      explanation: "量脈搏是用兩根手指（fingers）輕輕壓，大拇指只是告訴你「位置在它下面」。補充常識：大拇指本身也有脈搏，用它壓會數到自己大拇指的跳動，所以不用大拇指。",
      sourceSentence: "Put two fingers under the thumb on your left wrist. Press your wrist gently with your fingers.",
      questionType: "true_false",
    },
    {
      id: "u3-pulse-9",
      questionText: "Take your pulse for 10 seconds. Now ___ this number by 6.",
      correctAnswer: "multiply",
      explanation: "multiply＝乘。數 10 秒的次數，再乘以 6。multiply … by 6 是「乘以 6」的固定說法。",
      sourceSentence: "Take your pulse for 10 seconds. How many beats? Now multiply this number by 6.",
      questionType: "fill_blank",
    },
  ],
};

export default chapter;
