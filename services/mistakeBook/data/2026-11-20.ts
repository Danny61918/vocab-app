import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Week 12 daily quiz of 2026-11-20 (29/30: C -1).
// Red circle = deduction, corrected afterwards in blue ink, so the original answers are mostly not visible (same reading as 2026-11-17).
// Part-of-speech circles are recorded as errorCategory 'other' on purpose: a candidate for a new category/skill.
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-20_1f1r1ui",
    "examDate": "2026-11-20",
    "examName": "L7 Week 12 日常小考（11/20，29/30）",
    "section": "C. Choose the correct answer（a-d）",
    "questionText": "___ they ___ to music at the moment?",
    "options": [
      "(a) Are / listening",
      "(b) Do / listen",
      "(c) Are / listen",
      "(d) Do / listening"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (a)）",
    "correctAnswer": "(a) Are / listening",
    "errorCategory": "verb_tense",
    "rawErrorType": "at the moment 要用現在進行式（Are ＋ V-ing）",
    "skills": [
      "G.PROG.present_continuous"
    ],
    "teacherExplanation": "at the moment（現在）表示正在進行：Are they listening to music at the moment?，Are 和 listening 要一起用。",
    "reviewAdvice": "看到 at the moment、now、Look!、Listen! 就用 be ＋ V-ing；Do／Does 搭配的是原形動詞。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
