import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Weekend Homework Week 11 (dated 2026-11-13). The parent did not check it
// beforehand, so the marks are the teacher's marks on the child's first completed attempt. Red circle = deduction, then
// corrected in blue ink (same reading as 2026-11-10 / 2026-11-17). Sections A and B1-B5, B7-B8, B10 had no deductions.
// No total score is written on the paper. Section C (writing, 4 items): the paper shows only the corrected sentences and the parent cannot tell the original errors either,
// so all four are recorded with an unknown original answer (red RW marks / circles on each); the error cause is not guessed.
// Same date, second paper: the L7 Week 11 daily quiz (26/30: A -3 with three red circles on scare / the rain / of, D -1).
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
  },
  {
    "id": "2026-11-13_lqx8qv",
    "examDate": "2026-11-13",
    "examName": "L7 Weekend Homework Week 11（L7WH-W11）",
    "section": "C. Writing — combine with \"because\"",
    "questionText": "Combine with \"because\": There will be tests. / My friends and I are studying.",
    "studentAnswer": "未知（原答案看不到，只知道老師標了 RW 並圈出幾個字；紙上留下的是訂正後的句子）",
    "correctAnswer": "My friends and I are studying because there will be tests.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "because 合併句（老師標 RW，錯誤細節看不清楚）",
    "teacherExplanation": "句型是「結果 because 原因」：My friends and I are studying（結果）because there will be tests（原因）。",
    "reviewAdvice": "先找出哪句是原因、哪句是結果；結果放前面，because 接原因，寫完逐字檢查拼字與單複數。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_1608hm8",
    "examDate": "2026-11-13",
    "examName": "L7 Weekend Homework Week 11（L7WH-W11）",
    "section": "C. Writing — combine with \"because\"",
    "questionText": "Combine with \"because\": Mr. Dixon is good at telling stories. / Mr. Dixon's students enjoy listening to his stories.（句首已印 Because）",
    "studentAnswer": "未知（原答案看不到，紙上留下的是訂正後的句子；紅筆圈在 Mr 和 his students）",
    "correctAnswer": "Because Mr. Dixon is good at telling stories, his students enjoy listening to his stories.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "Because 放句首的合併句（老師紅筆圈出幾處，細節看不清楚）",
    "teacherExplanation": "Because 放句首時，原因子句在前、後面加逗號，再接結果：Because Mr. Dixon is good at telling stories, his students enjoy listening to his stories。enjoy 後面接動詞要用 -ing（listening）。",
    "reviewAdvice": "Because 放句首要在原因後加逗號；Mr. 後面有句點；enjoy＋V-ing。寫完把整句讀一遍。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_rn8g9f",
    "examDate": "2026-11-13",
    "examName": "L7 Weekend Homework Week 11（L7WH-W11）",
    "section": "C. Writing — combine with \"because\"",
    "questionText": "Combine with \"because\": All my kids like me. / I am a very nice mother.",
    "studentAnswer": "未知（原答案看不到，老師標了 RW；紙上留下的是訂正後的句子）",
    "correctAnswer": "All my kids like me because I am a very nice mother.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "because 合併句（老師標 RW，錯誤細節看不清楚）",
    "teacherExplanation": "結果 because 原因：All my kids like me（結果）because I am a very nice mother（原因）。",
    "reviewAdvice": "合併後把兩個分句再核對一次：主詞、動詞、拼字、句尾句號。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_ri2nv3",
    "examDate": "2026-11-13",
    "examName": "L7 Weekend Homework Week 11（L7WH-W11）",
    "section": "C. Writing — combine with \"because\"",
    "questionText": "Combine with \"because\": Alice can't go camping with her family. / She is unhappy.",
    "studentAnswer": "未知（原答案看不到，紅筆圈在句尾 with her family；紙上留下的是訂正後的句子）",
    "correctAnswer": "Alice is unhappy because she can't go camping with her family.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "because 合併句（老師紅圈句尾，錯誤細節看不清楚）",
    "teacherExplanation": "Alice is unhappy（結果）because she can't go camping with her family（原因）。because 後面的 Alice 要換成代名詞 she。",
    "reviewAdvice": "because 後面的人名要換成 she／he／they，句尾記得加句號。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_ibhtpb",
    "examDate": "2026-11-13",
    "examName": "L7 Week 11 日常小考（11/13，26/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：使驚嚇 (v.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈住整個單字，已訂正）",
    "correctAnswer": "scare",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：scare",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "scare（(v.)）的意思是「使驚嚇」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_djkc9m",
    "examDate": "2026-11-13",
    "examName": "L7 Week 11 日常小考（11/13，26/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：冒雨出去 (ph.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈在 the rain，已訂正）",
    "correctAnswer": "go out in the rain",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：go out in the rain",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "go out in the rain（(ph.)）的意思是「冒雨出去」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_1007bkk",
    "examDate": "2026-11-13",
    "examName": "L7 Week 11 日常小考（11/13，26/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：害怕 (ph.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈在 of，已訂正）",
    "correctAnswer": "be afraid of",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：be afraid of",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "be afraid of（(ph.)）的意思是「害怕」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-13_379r38",
    "examDate": "2026-11-13",
    "examName": "L7 Week 11 日常小考（11/13，26/30）",
    "section": "D. Combine the sentences（... because ...）",
    "questionText": "Combine with \"because\": Amy enjoys reading books. / Amy goes to the library every weekend.",
    "studentAnswer": "未知（原答案看不到，紅圈圈在 because 後面的 she；推測原本沒有把 Amy 換成代名詞 she，已訂正）",
    "correctAnswer": "Amy goes to the library every weekend because she enjoys reading books.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "because 合併句（紅圈在 she，推測是漏了代名詞）",
    "skills": [
      "M.COMBINE.missing_words"
    ],
    "teacherExplanation": "結果 because 原因：because 後面要有完整的句子，Amy 換成 she，再接 enjoys reading books。",
    "reviewAdvice": "合併完檢查 because 後面有沒有主詞，原句重複的人名要換成 she／he／they。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
