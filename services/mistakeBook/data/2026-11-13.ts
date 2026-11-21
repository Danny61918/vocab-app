import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Weekend Homework Week 11 (dated 2026-11-13). The parent did not check it
// beforehand, so the marks are the teacher's marks on the child's first completed attempt. Red circle = deduction, then
// corrected in blue ink (same reading as 2026-11-10 / 2026-11-17). Sections A and B1-B5, B7-B8, B10 had no deductions.
// No total score is written on the paper. Section C (writing) is imported separately once the red marks are confirmed.
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-13_nutlzk",
    "examDate": "2026-11-13",
    "examName": "L7 Weekend Homework Week 11（L7WH-W11）",
    "section": "B. Choose the correct answer",
    "questionText": "Uncle Drew ___ on Mondays.",
    "options": [
      "(a) iron his shirt usually",
      "(b) often goes shopping",
      "(c) never water flowers",
      "(d) visits his friends seldom"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (b)）",
    "correctAnswer": "(b) often goes shopping",
    "errorCategory": "verb_tense",
    "rawErrorType": "頻率副詞位置與第三人稱單數動詞（逐項檢查四句）",
    "skills": [
      "G.SVA.third_person_s",
      "FMT.choose_correct"
    ],
    "teacherExplanation": "Uncle Drew 是第三人稱單數：(a) iron 要加 s，且 usually 要放在動詞前；(c) never water 要加 s；(d) seldom 要放在動詞前。只有 (b) often goes shopping 的頻率副詞位置和動詞形式都正確。",
    "reviewAdvice": "「選正確的句子」要逐項檢查：①主詞單複數，動詞有沒有加 s；②頻率副詞（often、never、usually）要放在一般動詞前面。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_h7dgxw",
    "examDate": "2026-11-13",
    "examName": "L7 Weekend Homework Week 11（L7WH-W11）",
    "section": "B. Choose the correct answer",
    "questionText": "My grandfather ___ every day.",
    "options": [
      "(a) doesn't has fish for dinner",
      "(b) buies fruit from the grocery",
      "(c) don't play computer games",
      "(d) watches the 9 o'clock news"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (d)）",
    "correctAnswer": "(d) watches the 9 o'clock news",
    "errorCategory": "verb_tense",
    "rawErrorType": "第三人稱單數：否定句 doesn't 與動詞變化（逐項檢查）",
    "skills": [
      "G.NEG.dont_doesnt",
      "G.SVA.third_person_s",
      "FMT.choose_correct"
    ],
    "teacherExplanation": "My grandfather 是第三人稱單數：(a) doesn't 後面動詞要用原形 have；(b) buy 去 y 加 ies 是 buies 拼錯，應為 buys；(c) 要用 doesn't。只有 (d) watches 正確（-ch 結尾加 es）。",
    "reviewAdvice": "四個選項都要檢查：doesn't 後面是原形；動詞字尾 y 前面是母音（buy）直接加 s，-ch／-sh／-x／-o 結尾加 es。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
