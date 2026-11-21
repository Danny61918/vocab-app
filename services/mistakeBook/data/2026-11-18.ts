import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Week 12 daily quiz of 2026-11-18 (21/30: A -5 as five red circles, C -3, D -1) plus the same-day L7 worksheet (unscored; spelling/POS circles).
// Red circle = deduction, corrected afterwards in blue ink, so the original answers are mostly not visible (same reading as 2026-11-17).
// Part-of-speech circles are recorded as errorCategory 'other' on purpose: a candidate for a new category/skill.
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-18_3drnwn",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "詞性：beat（(心臟)跳動）要標什麼詞性",
    "studentAnswer": "未知（原答案看不到，詞性處被紅圈，已訂正為 (v.)）",
    "correctAnswer": "(v.)",
    "errorCategory": "other",
    "rawErrorType": "詞性標註錯誤（beat）",
    "skills": [
      "V.POS_LABEL"
    ],
    "teacherExplanation": "beat 的詞性是 (v.)。單字測驗要同時寫出拼字和詞性，詞性寫錯也會被扣分。",
    "reviewAdvice": "背單字時把詞性一起背：動作→v.、名稱→n.、形容→adj.、整個片語→ph.；默寫時先寫詞性再拼字。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_12va85s",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：增加 (v.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈住 increase 這個字，詞性 (v.) 也被紅圈，已訂正）",
    "correctAnswer": "increase",
    "errorCategory": "spelling",
    "rawErrorType": "拼字與詞性：increase（單字和詞性都被紅圈）",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "increase（(v.)）的意思是「增加」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_j4qqpl",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "詞性：measure（測量）要標什麼詞性",
    "studentAnswer": "未知（原答案看不到，詞性處被紅圈，已訂正為 (v.)）",
    "correctAnswer": "(v.)",
    "errorCategory": "other",
    "rawErrorType": "詞性標註錯誤（measure）",
    "skills": [
      "V.POS_LABEL"
    ],
    "teacherExplanation": "measure 的詞性是 (v.)。單字測驗要同時寫出拼字和詞性，詞性寫錯也會被扣分。",
    "reviewAdvice": "背單字時把詞性一起背：動作→v.、名稱→n.、形容→adj.、整個片語→ph.；默寫時先寫詞性再拼字。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_1x7ov49",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "A. Spelling Test（Spell out the words）",
    "questionText": "拼字：擔憂 (ph.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈在 about，已訂正）",
    "correctAnswer": "be anxious about",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：be anxious about",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "be anxious about（(ph.)）的意思是「擔憂」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_1iwyx5c",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "C. Choose the correct answer（a-d）",
    "questionText": "The cat always ___ its toy mouse under the sofa.",
    "options": [
      "(a) hide",
      "(b) hidies",
      "(c) doesn't hide",
      "(d) hides"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (d)）",
    "correctAnswer": "(d) hides",
    "errorCategory": "verb_tense",
    "rawErrorType": "第三人稱單數動詞加 -s（hide → hides）",
    "skills": [
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "The cat 是第三人稱單數，現在簡單式動詞加 s；hide 字尾是 e，直接加 s 變成 hides（不是 hidies）。",
    "reviewAdvice": "單數主詞＋always：動詞要變化；字尾是 e 直接加 s，子音＋y 才改成 ies。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_12jg3ca",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "C. Choose the correct answer（a-d）",
    "questionText": "Alex tries to get to school on time, but he ___ late.",
    "options": [
      "(a) is sometimes",
      "(b) sometimes be",
      "(c) sometimes is",
      "(d) sometimes"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (a)）",
    "correctAnswer": "(a) is sometimes",
    "errorCategory": "sentence_structure",
    "rawErrorType": "頻率副詞與 be 動詞的位置（be 動詞後面接 sometimes）",
    "skills": [
      "G.ADV.frequency_position"
    ],
    "teacherExplanation": "late 是形容詞，前面要有 be 動詞：he is sometimes late。頻率副詞（sometimes、always）放在 be 動詞的後面、一般動詞的前面。",
    "reviewAdvice": "頻率副詞口訣：be 動詞「後」、一般動詞「前」；沒有動詞的選項（只有 sometimes）一定不通。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_afv9dt",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "C. Choose the correct answer（a-d）",
    "questionText": "My sister and I have piano lessons ___.",
    "options": [
      "(a) at every weekend",
      "(b) on afternoon Thursdays",
      "(c) in 8 o'clock everyevening",
      "(d) on Saturday mornings"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (d)）",
    "correctAnswer": "(d) on Saturday mornings",
    "errorCategory": "preposition",
    "rawErrorType": "時間片語：on + 星期幾 + 時段",
    "skills": [
      "G.PREP.time_on_at"
    ],
    "teacherExplanation": "星期幾前面用 on：on Saturday mornings。(a) every 前面不加 at；(b) 順序要 Thursday afternoons；(c) 幾點用 at，且 every evening 是兩個字。",
    "reviewAdvice": "on＋星期（on Saturday mornings），at＋鐘點（at 8 o'clock）；every 前面不加介系詞。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_1mmgggk",
    "examDate": "2026-11-18",
    "examName": "L7 Week 12 日常小考（11/18，21/30）",
    "section": "D. Combine the sentences（Because ...）",
    "questionText": "Combine with \"Because ...\": It is very noisy in the city. / I prefer living in the countryside.",
    "studentAnswer": "未知（原答案看不到，紅圈在句尾句號旁，細節看不清楚；紙上留下的是訂正後的句子）",
    "correctAnswer": "Because it is very noisy in the city, I prefer living in the countryside.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "Because 句首合併句（紅圈在句尾，細節看不清楚）",
    "skills": [
      "M.PUNCT.comma_period"
    ],
    "teacherExplanation": "Because 放句首：Because ①, ②；原因子句後面加逗號，句尾加句號。",
    "reviewAdvice": "寫完檢查三件事：Because 句首大寫、原因後有逗號、句尾有句號。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_1nevek",
    "examDate": "2026-11-18",
    "examName": "L7 Worksheet 2026/11/18（時間副詞與單字拼寫）",
    "section": "A. Write down the time words（Present Simple）",
    "questionText": "寫出現在簡單式的頻率副詞：rarely（很少）",
    "studentAnswer": "未知（原寫法看不到，老師用紅筆在旁邊重寫 rarely 並畫箭頭；推測拼錯）",
    "correctAnswer": "rarely",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：rarely",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "rarely（很少）是頻率副詞，拼字是 r-a-r-e-l-y。",
    "reviewAdvice": "頻率副詞排序抄寫：always, usually, often, sometimes, rarely, seldom, never，每個逐字母核對。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_sgnax",
    "examDate": "2026-11-18",
    "examName": "L7 Worksheet 2026/11/18（時間副詞與單字拼寫）",
    "section": "A. Spelling out the words",
    "questionText": "詞性：be about to（正要）要標什麼詞性",
    "studentAnswer": "未知（原答案看不到，詞性處被紅圈，已訂正為 (ph.)）",
    "correctAnswer": "(ph.)",
    "errorCategory": "other",
    "rawErrorType": "詞性標註錯誤（be about to）",
    "skills": [
      "V.POS_LABEL"
    ],
    "teacherExplanation": "be about to 的詞性是 (ph.)。單字測驗要同時寫出拼字和詞性，詞性寫錯也會被扣分。",
    "reviewAdvice": "背單字時把詞性一起背：動作→v.、名稱→n.、形容→adj.、整個片語→ph.；默寫時先寫詞性再拼字。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_tvtn4d",
    "examDate": "2026-11-18",
    "examName": "L7 Worksheet 2026/11/18（時間副詞與單字拼寫）",
    "section": "A. Spelling out the words",
    "questionText": "拼字：1.做運動 2.運動 (v.)／(n.)",
    "studentAnswer": "未知（原答案看不到，紅圈圈住 exercise，已訂正）",
    "correctAnswer": "exercise",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：exercise",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "exercise（(v.)／(n.)）的意思是「1.做運動 2.運動」，拼字要每個字母都正確。",
    "reviewAdvice": "把單字拆成音節或小段，唸著抄寫；默寫完逐字母對照課本。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_b8bm7n",
    "examDate": "2026-11-18",
    "examName": "L7 Worksheet 2026/11/18（時間副詞與單字拼寫）",
    "section": "A. Spelling out the words",
    "questionText": "詞性：be absent from（缺席）要標什麼詞性",
    "studentAnswer": "未知（原答案看不到，詞性處被紅圈，已訂正為 (ph.)）",
    "correctAnswer": "(ph.)",
    "errorCategory": "other",
    "rawErrorType": "詞性標註錯誤（be absent from）",
    "skills": [
      "V.POS_LABEL"
    ],
    "teacherExplanation": "be absent from 的詞性是 (ph.)。單字測驗要同時寫出拼字和詞性，詞性寫錯也會被扣分。",
    "reviewAdvice": "背單字時把詞性一起背：動作→v.、名稱→n.、形容→adj.、整個片語→ph.；默寫時先寫詞性再拼字。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-18_1oo1puj",
    "examDate": "2026-11-18",
    "examName": "L7 Worksheet 2026/11/18（時間副詞與單字拼寫）",
    "section": "A. Spelling out the words",
    "questionText": "詞性：be afraid of（害怕）要標什麼詞性",
    "studentAnswer": "未知（原答案看不到，詞性處被紅圈，已訂正為 (ph.)）",
    "correctAnswer": "(ph.)",
    "errorCategory": "other",
    "rawErrorType": "詞性標註錯誤（be afraid of）",
    "skills": [
      "V.POS_LABEL"
    ],
    "teacherExplanation": "be afraid of 的詞性是 (ph.)。單字測驗要同時寫出拼字和詞性，詞性寫錯也會被扣分。",
    "reviewAdvice": "背單字時把詞性一起背：動作→v.、名稱→n.、形容→adj.、整個片語→ph.；默寫時先寫詞性再拼字。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
