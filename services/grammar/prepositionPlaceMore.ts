import { GrammarQuestion, GrammarCategory } from '../../types';

// 地方介系詞: extra questions (2026-11-21), written for the weak spots found in the Week 11-12 papers.
// Every question was blind-solved by a second model before it was added; an item with more than one defensible
// answer was left out. Options are shuffled at battle time (grammarQueue.ts), so the order here does not matter.

const C = GrammarCategory.PREPOSITION_PLACE;

export const PREPOSITION_PLACE_MORE_QUESTIONS: GrammarQuestion[] = [
  {
    id: "prep_place_m2", category: C,
    sentenceContext: "The picture is ___ the wall.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "貼在或放在某物的表面「上面」用 on（on the wall, on the roof, on the grass, on Green Street）。",
  },
  {
    id: "prep_place_m3", category: C,
    sentenceContext: "There is a big tree ___ front of our house.",
    options: ["in", "at", "on"], correctAnswer: "in",
    ruleReminder: "「在…的前面」是固定說法 in front of。",
  },
  {
    id: "prep_place_m4", category: C,
    sentenceContext: "The shoes are ___ the table. They are on the floor.",
    options: ["under", "on", "in"], correctAnswer: "under",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m5", category: C,
    sentenceContext: "My school is ___ the post office and the bank.",
    options: ["between", "behind", "under"], correctAnswer: "between",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m6", category: C,
    sentenceContext: "The bank is ___ the library. They are side by side.",
    options: ["next to", "on", "under"], correctAnswer: "next to",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m7", category: C,
    sentenceContext: "I live ___ Taipei.",
    options: ["in", "at", "on"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m8", category: C,
    sentenceContext: "I'm ___ the bus stop. Where are you?",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "指某個點或地點（門口、入口、車站、家、上班）用 at（at the gate, at home, at work）。",
  },
  {
    id: "prep_place_m9", category: C,
    sentenceContext: "My grandma lives ___ a small village.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m10", category: C,
    sentenceContext: "She hung her coat ___ the hook.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "貼在或放在某物的表面「上面」用 on（on the wall, on the roof, on the grass, on Green Street）。",
  },
  {
    id: "prep_place_m11", category: C,
    sentenceContext: "There are many fish ___ the lake.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m12", category: C,
    sentenceContext: "Wait for me ___ the school gate.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "指某個點或地點（門口、入口、車站、家、上班）用 at（at the gate, at home, at work）。",
  },
  {
    id: "prep_place_m13", category: C,
    sentenceContext: "He put the milk ___ the fridge.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m14", category: C,
    sentenceContext: "The bird is sitting ___ the roof.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "貼在或放在某物的表面「上面」用 on（on the wall, on the roof, on the grass, on Green Street）。",
  },
  {
    id: "prep_place_m15", category: C,
    sentenceContext: "A rainbow is ___ the sky.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m16", category: C,
    sentenceContext: "My dad is ___ work.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "指某個點或地點（門口、入口、車站、家、上班）用 at（at the gate, at home, at work）。",
  },
  {
    id: "prep_place_m17", category: C,
    sentenceContext: "There is a map ___ the wall of our classroom.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "貼在或放在某物的表面「上面」用 on（on the wall, on the roof, on the grass, on Green Street）。",
  },
  {
    id: "prep_place_m19", category: C,
    sentenceContext: "Stand ___ the door and wait.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "指某個點或地點（門口、入口、車站、家、上班）用 at（at the gate, at home, at work）。",
  },
  {
    id: "prep_place_m20", category: C,
    sentenceContext: "Don't sit ___ the floor. It's dirty.",
    options: ["on", "in", "at"], correctAnswer: "on",
    ruleReminder: "貼在或放在某物的表面「上面」用 on（on the wall, on the roof, on the grass, on Green Street）。",
  },
  {
    id: "prep_place_m21", category: C,
    sentenceContext: "I stay ___ home on rainy days.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "指某個點或地點（門口、入口、車站、家、上班）用 at（at the gate, at home, at work）。",
  },
  {
    id: "prep_place_m22", category: C,
    sentenceContext: "The monkey is hiding ___ the tree. I can only see its tail.",
    options: ["behind", "on", "at"], correctAnswer: "behind",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m23", category: C,
    sentenceContext: "The park is ___ my house. It takes two minutes to walk.",
    options: ["near", "on", "in"], correctAnswer: "near",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m24", category: C,
    sentenceContext: "The clock is ___ the door and the window.",
    options: ["between", "under", "at"], correctAnswer: "between",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m25", category: C,
    sentenceContext: "Lily is sitting ___ her mom. They are very close.",
    options: ["next to", "in", "at"], correctAnswer: "next to",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m26", category: C,
    sentenceContext: "There is a bridge ___ the river.",
    options: ["over", "in", "at"], correctAnswer: "over",
    ruleReminder: "under（下面）、behind（後面）、between（兩者中間）、next to（旁邊）、near（附近）、over（上方）是不同的位置詞，看句意選。",
  },
  {
    id: "prep_place_m27", category: C,
    sentenceContext: "We keep the plates ___ the kitchen cabinet.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m28", category: C,
    sentenceContext: "The flowers are ___ the vase.",
    options: ["in", "on", "at"], correctAnswer: "in",
    ruleReminder: "在一個空間、容器、城市或國家「裡面」用 in（in the box, in Taipei, in the sky）。",
  },
  {
    id: "prep_place_m30", category: C,
    sentenceContext: "I'll meet you ___ the entrance.",
    options: ["at", "in", "on"], correctAnswer: "at",
    ruleReminder: "指某個點或地點（門口、入口、車站、家、上班）用 at（at the gate, at home, at work）。",
  },
];
