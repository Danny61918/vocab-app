import { ReviewChapter } from '../types';
import lesson from './u3-pulse-lesson';

// Source: the Unit 3 textbook ("Unit 3 textbook" — the book title is not recorded), lessons named in sourceRef. Every question is built from a
// sentence printed in the book (sourceSentence). Designed and checked in .doc/v2.0/phase-10-clil-unit3/RESEARCH.md: each question has exactly one
// acceptable answer (options are wrong for a clear reason: they do not fit the grammar or they contradict the text). Fill-in-the-blank
// questions are single words answered with the letter tiles (the tiles only offer the target letters plus a few decoys).
const chapter: ReviewChapter = {
  id: "u3-pulse-bpm",
  title: "脈搏（二）數字與活動 (BPM and Activities)",
  sourceRef: "Unit 3 textbook, Lessons 9–10 (p24–25)",
  availableFrom: "2026-11-16", // pulse lessons go with the week-12 words (2026-11-16 to 11-20)
  lesson, // the same teaching lesson sits in front of both pulse chapters
  sourceText:
    "What's her pulse after sleeping? It's 68. What's her pulse after playing football? It's 120.\n" +
    "Time 7.00 / 7.30 / 8.00 — A: 150 BPM, 70 BPM, 100 BPM. B: 70 BPM, 75 BPM, 80 BPM. C: 65 BPM, 70 BPM, 150 BPM.\n" +
    "Olga gets up early and goes running at seven o'clock. Then at 7.30 she has breakfast and watches TV. At eight o'clock she goes to school. She walks to school.\n" +
    "Milly reads in bed at seven o'clock. She gets up and has breakfast at 7.30. At eight o'clock she runs to school. She's always late!\n" +
    "Josh has breakfast at seven o'clock. At 7.30 he gets dressed. At eight o'clock he takes the bus to school.",
  glossary: [
    { term: "sleeping", icon: "😴", zh: "睡覺" },
    { term: "reading", icon: "📖", zh: "看書" },
    { term: "playing computer games", icon: "🎮", zh: "玩電腦遊戲" },
    { term: "walking to school", icon: "🚶", zh: "走路上學" },
    { term: "playing football", icon: "⚽", zh: "踢足球" },
    { term: "skipping", icon: "🪢", zh: "跳繩" },
  ],
  notes: [
    {
      title: "活動和脈搏（BPM）",
      body: "越激烈的活動，脈搏越高。數字是課本照片上標的。",
      examples: [
        { text: "sleeping → 68 BPM", speak: "sleeping, sixty-eight B P M" },
        { text: "reading → 78 BPM", speak: "reading, seventy-eight B P M" },
        { text: "playing computer games → 89 BPM", speak: "playing computer games, eighty-nine B P M" },
        { text: "walking to school → 97 BPM", speak: "walking to school, ninety-seven B P M" },
        { text: "playing football → 120 BPM", speak: "playing football, one hundred and twenty B P M" },
        { text: "skipping → 140 BPM", speak: "skipping, one hundred and forty B P M" },
      ],
    },
  ],
  questions: [
    {
      id: "u3-bpm-1",
      questionText: "\"What's her pulse after playing football?\" \"___\"",
      options: ["It's 140.","It's 68.","It's 120."],
      correctAnswer: "It's 120.",
      explanation: "課本 p25 的對話：踢足球後她的脈搏是 120。68 是睡覺後、140 是跳繩後。",
      sourceSentence: "What's her pulse after playing football? / It's 120.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-2",
      questionText: "After sleeping, her pulse is 86.",
      options: ["True","False"],
      correctAnswer: "False",
      explanation: "睡覺後是 68（sixty-eight），不是 86（eighty-six）。兩個數字只是位置對調，看數字要一位一位對。",
      sourceSentence: "What's her pulse after sleeping? It's 68.",
      questionType: "true_false",
    },
    {
      id: "u3-bpm-3",
      questionText: "Her pulse after skipping (140 BPM) is higher than after walking to school (97 BPM).",
      options: ["True","False"],
      correctAnswer: "True",
      explanation: "140 比 97 大，所以跳繩後的脈搏比走路上學後高。跳繩比走路激烈，心臟要跳得更快。",
      sourceSentence: "1 Listen and find.（照片數字 140 BPM、97 BPM）",
      questionType: "true_false",
    },
    {
      id: "u3-bpm-4",
      questionText: "Her pulse is 97 BPM after walking to school, 89 BPM after playing computer games and 78 BPM after reading. After which activity is it the LOWEST?",
      options: ["walking to school","reading","playing computer games"],
      correctAnswer: "reading",
      explanation: "先看清楚問的是 LOWEST（最低），不是最高。78 最小，所以是 reading（看書）。看書時身體幾乎不動，心跳比較慢。",
      sourceSentence: "1 Listen and find.（照片數字 97、89、78 BPM）",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-5",
      questionText: "When you do exercise, your pulse rate ___.",
      options: ["increases","goes down","stops"],
      correctAnswer: "increases",
      explanation: "increase＝增加（第 12 週新字）。運動時心跳變多，脈搏率就增加。goes down（下降）和 stops（停止）都跟課文相反。",
      sourceSentence: "When you do a lot of exercise, your heart works more and so it beats more.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-6",
      questionText: "___ your heart ___ more when you do exercise?",
      options: ["Do … beats","Does … beats","Does … beat"],
      correctAnswer: "Does … beat",
      explanation: "your heart 是一個（it），問句用 Does；Does 已經負責第三人稱，後面的動詞回到原形 beat，不再加 s。",
      sourceSentence: "When you do a lot of exercise, your heart works more and so it beats more.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-7",
      questionText: "You count 12 beats in 10 seconds. 12 × 6 = ___ BPM.",
      options: ["72","18","120"],
      correctAnswer: "72",
      explanation: "12 × 6 = 72，所以脈搏是每分鐘 72 下。18 是把 6「加」上去（12 + 6）；120 是誤以為要乘 10。課本說的是乘以 6。",
      sourceSentence: "Take your pulse for 10 seconds. How many beats? Now multiply this number by 6.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-8",
      questionText: "Why do we multiply by 6?",
      options: ["Because we use two fingers.","Because 10 seconds × 6 = 60 seconds, and 60 seconds is one minute.","Because the heart beats 6 times."],
      correctAnswer: "Because 10 seconds × 6 = 60 seconds, and 60 seconds is one minute.",
      explanation: "脈搏的單位是「每分鐘」。只數了 10 秒，6 個 10 秒是 60 秒（1 分鐘），所以乘以 6。跟用幾根手指無關。",
      sourceSentence: "Take your pulse for 10 seconds. … Now multiply this number by 6. How many beats per minute is your pulse?",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-9",
      questionText: "At 7.00, A is 150 BPM, B is 70 BPM and C is 65 BPM. Olga goes running at seven o'clock. Which one is Olga?",
      options: ["A","B","C"],
      correctAnswer: "A",
      explanation: "跑步的時候心跳最快，7 點時 A 是 150，最高，所以 Olga 是 A。（英式寫法 7.00 就是 7:00。）",
      sourceSentence: "Olga gets up early and goes running at seven o'clock.",
      questionType: "multiple_choice",
    },
    {
      id: "u3-bpm-10",
      questionText: "Milly reads in bed at seven o'clock. At eight o'clock she runs to school. Which pulses are Milly's?",
      options: ["7.00: 150 BPM, 8.00: 100 BPM","7.00: 70 BPM, 8.00: 80 BPM","7.00: 65 BPM, 8.00: 150 BPM"],
      correctAnswer: "7.00: 65 BPM, 8.00: 150 BPM",
      explanation: "7 點在床上看書，心跳低（65）；8 點跑步上學，心跳高（150）。所以是「先低後高」那一組，也就是表格的 C。第一組是先跑步（Olga），第二組都不高（Josh 搭公車）。",
      sourceSentence: "Milly reads in bed at seven o'clock. … At eight o'clock she runs to school.",
      questionType: "multiple_choice",
    },
  ],
};

export default chapter;
