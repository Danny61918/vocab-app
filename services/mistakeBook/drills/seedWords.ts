/**
 * 考卷上「單字題」答錯的字（每份考卷一筆）。App 第一次看到某筆時，把這些字在單字複習裡
 * 降到第 1 箱並標 `needsContext`（見 vocabLink.applySeedWordMistakes），之後不再重複套用。
 * words 為正規化（小寫、去頭尾空白）的單字／片語，同字的所有單字庫 id 都會一起處理。
 */
export interface SeedWordMistakes {
  id: string;       // 通常是考卷日期；已套用的 id 記在 localStorage
  words: string[];
}

export const SEED_WORD_MISTAKES: SeedWordMistakes[] = [
  { id: '2026-10-28', words: ['at a time', 'as well as', 'all the time', 'after all', 'relax', 'go for a walk', 'interview', 'several', 'research', 'trip', 'pirate'] },
  { id: '2026-11-04', words: ['cold', 'sick', 'cough', 'still', 'traffic jam'] },
  { id: '2026-11-10', words: ['sore throat', 'cough', 'cold', 'at least', 'at last', 'at first'] },
];
