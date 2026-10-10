/**
 * 錯題本 (Mistake Book) — independent of the vocab library (serverData.ts /
 * newVocabData.ts). Data comes from a parent running a photographed exam
 * paper through Gemini, which produces a JSON blob of incorrect questions.
 * That JSON's shape is NOT trusted directly: a human (via Claude, in chat)
 * reads it, maps it onto this fixed schema, and only the resulting records
 * — which must satisfy MistakeRecord[] per data file, so `tsc` enforces the
 * shape — are written into services/mistakeBook/data/. The app itself never
 * parses raw Gemini output at runtime.
 *
 * See scripts/mistakeBook/validate_import.cjs for the required-field +
 * duplicate-id check that should be run after every import.
 */

// Fixed taxonomy. Gemini's free-text error_type (kept verbatim in
// rawErrorType below) gets mapped onto one of these at import time — see
// categoryMap.ts for the mapping table and known examples. Keep this list
// short; if 'other' starts accumulating a lot of records, that's the signal
// to add a new category rather than let 'other' become a dumping ground.
export type ErrorCategory =
  | 'capitalization'              // 大小寫（字母大小寫本身，不含逗號/句號）
  | 'plural_possessive'           // 複數/所有格（含不規則、's vs of、it's vs its、可數/不可數名詞）
  | 'preposition'                 // 介系詞（時間/地方）
  | 'verb_tense'                  // 動詞時態
  | 'pronoun_reference'           // 代名詞指涉（例如 they 指的是誰）——純文法/邏輯推理，不是內容知識
  | 'content_comprehension'       // 讀懂文章內容本身／科普知識／一字多義要靠上下文判斷（區別於 pronoun_reference：這裡考的是「文章在講什麼」，不是代名詞文法）
  | 'context_carelessness'        // 粗心看錯關鍵字、答題太快、未作答
  | 'spelling'                    // 拼字
  | 'sentence_structure'          // 句型／連接詞／合併句子的標點（逗號、句尾句號），不含單純大小寫
  | 'other';

export type QuestionType =
  | 'multiple_choice'   // has `options`; can be auto-graded
  | 'rewrite'            // combine/rewrite sentences; no options, needs manual grading
  | 'fill_blank'         // single word/phrase blank; no options
  | 'reading_comprehension'; // passage-based; usually has options

export interface MistakeRecord {
  // Stable id derived from (examDate + questionText + correctAnswer) — see
  // idForMistake() in idUtil.ts. NOT a running counter: re-importing the same
  // exam (or the same question appearing verbatim again) must produce the
  // same id, so the import step can detect and skip exact duplicates.
  id: string;

  examDate: string;       // 'YYYY-MM-DD'
  examName?: string;      // e.g. "Level 7 第二次段考" — display only

  section: string;        // original section label from the exam (display only, free text)
  questionText: string;
  options?: string[];     // only present for multiple_choice / some reading_comprehension
  studentAnswer: string;
  correctAnswer: string;

  errorCategory: ErrorCategory;  // fixed taxonomy — see categoryMap.ts
  rawErrorType: string;          // Gemini's original free-text label, kept for audit/traceability

  teacherExplanation: string;    // why the answer is what it is
  reviewAdvice: string;          // how to practice this at home

  questionType: QuestionType;    // drives which review UI this can use

  importedAt: string;     // ISO timestamp of when this record was written (not the exam date)
}
