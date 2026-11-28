import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Week 12 daily quiz of 2026-11-20 (29/30: C -1).
// Red circle = deduction, corrected afterwards in blue ink, so the original answers are mostly not visible (same reading as 2026-11-17).
// Part-of-speech circles are recorded as errorCategory 'other' on purpose: a candidate for a new category/skill.
// Second paper of the same day: the L7 Weekend Homework Week 12 (L7WH-W12), dated 2026-11-20; no total on the paper, the
// teacher wrote "OK". Sections A and B had no mistakes (the parent confirmed; B3 only carries a red RW arrow because the
// handwriting of the "a" was too messy, so it is NOT a mistake). C3 and C4 carry red ticks. C1 and C2 (arrows) are recorded:
// the originals are covered by the blue-ink correction, so studentAnswer is unknown (same reading as 2026-11-13).
// C1: the teacher boxed "their" but what was wrong is not visible, so no skill is guessed. C2: the red "there" suggests the
// child left it out, marked as an inference. The paper also has a stray X before the number of A2 that nobody could explain.
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
  },
  {
    "id": "2026-11-20_xm8slz",
    "examDate": "2026-11-20",
    "examName": "L7 Weekend Homework Week 12（L7WH-W12）",
    "section": "C. Writing — combine with \"because\"",
    "questionText": "Combine with \"because\": They are cleaning every room in the house. / Their grandparents will stay for the weekend.",
    "studentAnswer": "未知（原答案看不到，紙上留下的是藍筆訂正後的句子；老師用紅框框住 their）",
    "correctAnswer": "They are cleaning every room in the house because their grandparents will stay for the weekend.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "because 合併句（老師紅框框住 their，原本的錯誤看不到，不猜）",
    "teacherExplanation": "句型是「結果 because 原因」：They are cleaning every room in the house（結果）because their grandparents will stay for the weekend（原因）。老師框住的是 their，但原本錯在哪看不到。",
    "reviewAdvice": "先找出哪句是原因、哪句是結果；結果放前面，because 接原因。寫完逐字檢查 their / there / they 有沒有用對。",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T11:00:00.000Z"
  },
  {
    "id": "2026-11-20_zfll5a",
    "examDate": "2026-11-20",
    "examName": "L7 Weekend Homework Week 12（L7WH-W12）",
    "section": "C. Writing — combine with \"because\"",
    "questionText": "Combine with \"Because\": The library is quiet. / I often go to the library to read story books after school.（句首已印 Because）",
    "studentAnswer": "未知（原答案看不到，紙上留下訂正後的句子；老師用紅字寫了 there，推測原本漏了 there）",
    "correctAnswer": "Because the library is quiet, I often go there to read story books after school.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "合併句：重複的地點用 there 代替（原答案看不到，漏 there 為推測）",
    "skills": [
      "M.COMBINE.missing_words"
    ],
    "teacherExplanation": "Because 開頭：Because the library is quiet,（原因）I often go there to read…（結果）。第二句的 the library 已經出現過，所以改成 there（那裡），不要漏掉也不要再重複 the library。",
    "reviewAdvice": "合併後檢查：有沒有漏掉地點？重複的地點用 there 代替（go there），重複的人用 he / she / they 代替。",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T11:00:00.000Z"
  }
];

export default data;
