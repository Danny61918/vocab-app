/**
 * 變化題（種子錯題擴增出來的練習題）。**一律在匯入時由人／Claude 寫成靜態 TS 並經
 * validate.ts 驗證**；執行時只做重組（選項順序、選題），不動態組句，避免產生有歧義或
 * 文法錯誤的句子教壞孩子。
 */
export type DrillVariation = 'subject' | 'verb' | 'polarity' | 'question' | 'short_answer' | 'context';

// 易混字組題用：這句靠什麼線索判斷。同一個字至少要有兩種不同線索（validate.ts）。
export type DrillClue = 'noun' | 'adj' | 'verb' | 'collocation' | 'meaning';

export interface DrillOption {
  text: string;
  misconception?: string; // 選到這個干擾項代表的迷思，例如 '3sg_s_on_plural'
}

export interface DrillItem {
  id: string;                  // `${seedId}#v${n}`；不用文字 hash，改字不會讓進度變孤兒
  seedMistakeId?: string;
  skillIds: string[];          // 皆須登記於 skills.ts
  confusionSetId?: string;     // 登記於 confusionSets.ts
  kind: 'mc' | 'word_bank';
  stem: string;                // 英文，恰好一個 ___
  answer: string;
  distractors: DrillOption[];  // 不帶 (a)(b) 標號
  alsoFits?: string[];         // 組內其他也說得通的字：禁止出現在干擾項
  targetWords?: string[];      // 正規化（小寫、去頭尾空白）的單字／片語，須存在於單字庫
  clue?: DrillClue;
  difficulty: 1 | 2 | 3;
  variation: DrillVariation[];
  explanation: string;         // 中文，答錯時顯示
}
