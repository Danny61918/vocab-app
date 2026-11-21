import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Week 12 daily quiz of 2026-11-19 (27/30: A -2, D -1).
// Red circle = deduction, corrected afterwards in blue ink, so the original answers are mostly not visible (same reading as 2026-11-17).
// Part-of-speech circles are recorded as errorCategory 'other' on purpose: a candidate for a new category/skill.
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-19_1cvf0sp",
    "examDate": "2026-11-19",
    "examName": "L7 Week 12 日常小考（11/19，27/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：相乘 (v.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈住 multiply，已訂正）",
    "correctAnswer": "multiply",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：multiply",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "multiply（(v.)）的意思是「相乘」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-19_1xmsjyd",
    "examDate": "2026-11-19",
    "examName": "L7 Week 12 日常小考（11/19，27/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：心跳 (n.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈住 heartbeat，老師紅筆註記 one word）",
    "correctAnswer": "heartbeat",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：heartbeat 要寫成一個字（老師註記 one word）",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "heartbeat（心跳）是一個單字，中間不分開、不加空格或連字號。",
    "reviewAdvice": "複合名詞（heart＋beat）背的時候看成一個整體；抄寫時注意中間沒有空格。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-19_1qenon",
    "examDate": "2026-11-19",
    "examName": "L7 Week 12 日常小考（11/19，27/30）",
    "section": "D. Combine the sentences（Because ...）",
    "questionText": "Combine with \"Because ...\": Kevin studies English every day. / He will have an English test next month.",
    "studentAnswer": "第一次寫 Because Kevin will have an English test next month, he studies English every day.（紅筆框住 studies，推測是 studies 的拼字；紙上有訂正後的句子）",
    "correctAnswer": "Because Kevin will have an English test next month, he studies English every day.",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：studies（紅框，推測）",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "句型正確：Because ①, ②。study 字尾是 子音＋y，要去 y 加 ies 變成 studies。",
    "reviewAdvice": "子音＋y 的動詞（study、carry、tidy）第三人稱單數：去 y 加 ies；寫完逐字檢查。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
