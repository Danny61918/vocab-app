import { GrammarQuestion, GrammarCategory } from '../../types';

// 時間介系詞: extra questions (2026-11-21), written for the weak spots found in the Week 11-12 papers.
// Every question was blind-solved by a second model before it was added; an item with more than one defensible
// answer was left out. Options are shuffled at battle time (grammarQueue.ts), so the order here does not matter.

const C = GrammarCategory.PREPOSITION_TIME;

export const PREPOSITION_TIME_MORE_QUESTIONS: GrammarQuestion[] = [
  {
    id: "prep_time_m1", category: C,
    sentenceContext: "The concert starts ___ 7:45.",
    options: ["at", "on", "in"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
  {
    id: "prep_time_m2", category: C,
    sentenceContext: "We have English class ___ Tuesdays.",
    options: ["on", "at", "in"], correctAnswer: "on",
    ruleReminder: "星期幾、日期、特定的日子前面用 on（on Tuesday, on October 12th, on Christmas Day）。",
  },
  {
    id: "prep_time_m3", category: C,
    sentenceContext: "My family goes camping ___ summer.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m4", category: C,
    sentenceContext: "The stars come out ___ night.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
  {
    id: "prep_time_m5", category: C,
    sentenceContext: "I was born ___ 2016.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m6", category: C,
    sentenceContext: "Our school trip is ___ October 12th.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "星期幾、日期、特定的日子前面用 on（on Tuesday, on October 12th, on Christmas Day）。",
  },
  {
    id: "prep_time_m8", category: C,
    sentenceContext: "I do my homework ___ the evening.",
    options: ["in", "at", "on"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m9", category: C,
    sentenceContext: "The shop opens ___ Sunday morning.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "星期幾加上時段，用 on（on Sunday morning, on Wednesday afternoons）。",
  },
  {
    id: "prep_time_m10", category: C,
    sentenceContext: "Flowers bloom ___ spring.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m11", category: C,
    sentenceContext: "I get up ___ six o'clock.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
  {
    id: "prep_time_m12", category: C,
    sentenceContext: "We have a party ___ Christmas Day.",
    options: ["on", "at", "in"], correctAnswer: "on",
    ruleReminder: "星期幾、日期、特定的日子前面用 on（on Tuesday, on October 12th, on Christmas Day）。",
  },
  {
    id: "prep_time_m13", category: C,
    sentenceContext: "Wash your hands ___ dinner.",
    options: ["before", "at", "on"], correctAnswer: "before",
    ruleReminder: "before（在…之前）、after（在…之後）後面直接接事件或時間，不加 at／on。",
  },
  {
    id: "prep_time_m15", category: C,
    sentenceContext: "She was sick ___ three days.",
    options: ["for", "at", "on"], correctAnswer: "for",
    ruleReminder: "for 後面接一段時間的長度（for three days, for two hours）。",
  },
  {
    id: "prep_time_m16", category: C,
    sentenceContext: "My birthday party is ___ Saturday afternoon.",
    options: ["on", "at", "in"], correctAnswer: "on",
    ruleReminder: "星期幾加上時段，用 on（on Sunday morning, on Wednesday afternoons）。",
  },
  {
    id: "prep_time_m17", category: C,
    sentenceContext: "It's very cold ___ January.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m18", category: C,
    sentenceContext: "We watch fireworks ___ New Year's Eve.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "星期幾、日期、特定的日子前面用 on（on Tuesday, on October 12th, on Christmas Day）。",
  },
  {
    id: "prep_time_m19", category: C,
    sentenceContext: "The train leaves ___ midnight.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
  {
    id: "prep_time_m20", category: C,
    sentenceContext: "Our English test is ___ Friday.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "星期幾、日期、特定的日子前面用 on（on Tuesday, on October 12th, on Christmas Day）。",
  },
  {
    id: "prep_time_m21", category: C,
    sentenceContext: "It often rains ___ the afternoon.",
    options: ["in", "at", "on"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m22", category: C,
    sentenceContext: "I have swimming class ___ Wednesday afternoons.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "星期幾加上時段，用 on（on Sunday morning, on Wednesday afternoons）。",
  },
  {
    id: "prep_time_m23", category: C,
    sentenceContext: "I drink milk ___ the morning.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m24", category: C,
    sentenceContext: "My mom gets home ___ 6:30.",
    options: ["at", "on", "in"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
  {
    id: "prep_time_m25", category: C,
    sentenceContext: "Winter vacation starts ___ January.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m26", category: C,
    sentenceContext: "The baby wakes up ___ midnight.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
  {
    id: "prep_time_m27", category: C,
    sentenceContext: "Do you go to school ___ Saturdays?",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "星期幾、日期、特定的日子前面用 on（on Tuesday, on October 12th, on Christmas Day）。",
  },
  {
    id: "prep_time_m28", category: C,
    sentenceContext: "He plays video games ___ the evening.",
    options: ["in", "at", "on"], correctAnswer: "in",
    ruleReminder: "月份、季節、年份、一天中的時段前面用 in（in May, in summer, in 2016, in the evening）。",
  },
  {
    id: "prep_time_m29", category: C,
    sentenceContext: "I have a piano lesson ___ 4:00 p.m.",
    options: ["at", "on", "in"], correctAnswer: "at",
    ruleReminder: "鐘點、正午、夜晚前面用 at（at 7:45, at noon, at midnight, at night）。",
  },
];
