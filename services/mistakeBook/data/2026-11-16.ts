import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Week 12 daily quiz of 2026-11-16 (22/30: A -2, B -2, D -4; the two D sentences each lost 2).
// Red circle = deduction, corrected afterwards in blue ink, so the original answers are mostly not visible (same reading as 2026-11-17).
// Part-of-speech circles are recorded as errorCategory 'other' on purpose: a candidate for a new category/skill.
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-16_s7w9xt",
    "examDate": "2026-11-16",
    "examName": "L7 Week 12 日常小考（11/16，22/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：對…生氣 (ph.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈在 angry，已訂正）",
    "correctAnswer": "be angry with",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：be angry with",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "be angry with（(ph.)）的意思是「對…生氣」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-16_oardry",
    "examDate": "2026-11-16",
    "examName": "L7 Week 12 日常小考（11/16，22/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "詞性：scare（使驚嚇）要標什麼詞性",
    "studentAnswer": "未知（原答案看不到，詞性處被紅圈，已訂正為 (v.)）",
    "correctAnswer": "(v.)",
    "errorCategory": "other",
    "rawErrorType": "詞性標註錯誤（scare）",
    "skills": [
      "V.POS_LABEL"
    ],
    "teacherExplanation": "scare 的詞性是 (v.)。單字測驗要同時寫出拼字和詞性，詞性寫錯也會被扣分。",
    "reviewAdvice": "背單字時把詞性一起背：動作→v.、名稱→n.、形容→adj.、整個片語→ph.；默寫時先寫詞性再拼字。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-16_1ltunv9",
    "examDate": "2026-11-16",
    "examName": "L7 Week 12 日常小考（11/16，22/30）",
    "section": "B. Complete the sentences using the words above（a-e）",
    "questionText": "After Sam finished ten worksheets, his ___ hurt.（字庫：a thumb、b finger、c heart、d blood、e wrist）",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (b)）",
    "correctAnswer": "(b) finger",
    "errorCategory": "content_comprehension",
    "rawErrorType": "單字辨析：finger 與 thumb（句中選字）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "寫了十張作業，手指（finger）會痠痛；thumb 是大拇指，只是其中一根，句子要的是一般的手指。",
    "reviewAdvice": "選字題把五個字都帶進句子試讀，再用整句意思決定；finger 是手指、thumb 是大拇指。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-16_phsz3i",
    "examDate": "2026-11-16",
    "examName": "L7 Week 12 日常小考（11/16，22/30）",
    "section": "B. Complete the sentences using the words above（a-e）",
    "questionText": "Missing a ___ makes it impossible for us to write or draw pictures with a pencil at all.（字庫：a thumb、b finger、c heart、d blood、e wrist）",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (a)）",
    "correctAnswer": "(a) thumb",
    "errorCategory": "content_comprehension",
    "rawErrorType": "單字辨析：thumb 與 finger（句中選字）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "少了一根大拇指（thumb）就無法握筆，所以寫字、畫畫都不可能；thumb 是握筆必要的那根手指。",
    "reviewAdvice": "thumb（大拇指）和 finger（手指）、wrist（手腕）要成組背，並用「握筆」「戴手錶」這類情境記。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-16_1x72a08",
    "examDate": "2026-11-16",
    "examName": "L7 Week 12 日常小考（11/16，22/30）",
    "section": "D. Combine the sentences（Because ...）",
    "questionText": "Combine with \"Because ...\": Jason has to catch the last bus home. / Jason can't work late.",
    "studentAnswer": "第一次寫 Because Jason has to catch the last bus home, can't work late.（逗號後漏了主詞 he，旁邊用綠框補上 he；紅筆圈起整句）",
    "correctAnswer": "Because Jason has to catch the last bus home, he can't work late.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "合併句漏字（逗號後面缺主詞 he）",
    "skills": [
      "M.COMBINE.missing_words"
    ],
    "teacherExplanation": "Because 放句首時：Because ①, ②。後面的結果句要有完整的主詞和動詞，所以逗號後面要寫 he can't work late。",
    "reviewAdvice": "寫完把兩個分句分別讀一遍，每個分句都要有主詞（Jason／he）和動詞。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-16_1pl6kni",
    "examDate": "2026-11-16",
    "examName": "L7 Week 12 日常小考（11/16，22/30）",
    "section": "D. Combine the sentences（... because ...）",
    "questionText": "Combine with \"... because ...\": Jason has to catch the last bus home. / Jason can't work late.",
    "studentAnswer": "第一次寫 Jason can't work late because has to catch the last bus home.（推測 because 後面漏了 he；he 是後來擠在 because 和 has 中間補上的；紅筆圈起整句）",
    "correctAnswer": "Jason can't work late because he has to catch the last bus home.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "合併句漏字（because 後面缺主詞 he）",
    "skills": [
      "M.COMBINE.missing_words"
    ],
    "teacherExplanation": "② because ①：because 後面要接完整的句子，所以是 because he has to catch the last bus home。",
    "reviewAdvice": "because 後面一定要有主詞；原句裡重複的人名換成 he／she，不要直接刪掉。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
