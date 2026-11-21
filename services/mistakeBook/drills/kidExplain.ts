import { KidExplain } from './types';

// 給小朋友的怪獸解說（答錯後由怪獸分三步講：為什麼 → 怎麼想 → 比比看）。
// 以題目 id 為 key，合併進題庫的邏輯在 drills/index.ts。沒有寫在這裡的題目，答錯時只顯示原本的一句解說。
// 寫作規則：why／how 用中文、短句、不用文法術語；example 的對、錯兩句都是英文，只差要教的那一點。
// 每一批都要請第二個模型檢查「有沒有講錯」，並由家長抽查學校的教法。
export const KID_EXPLAIN: Record<string, KidExplain> = {
  'gen.G.PS.does_question_base#v1': {
    why: '問句裡的 Does 已經幫 Mia（她）管好動詞了，所以後面的動詞不用再加 s，要變回原形。',
    how: '看到 Do 或 Does 開頭的問句，就告訴自己：後面的動詞要用「原形」，不加 s。',
    example: { right: 'Does Mia cook dinner every evening?', wrong: 'Does Mia cooks dinner every evening?' },
  },
  'retest.2026-10-23_zd2hwd#v0': {
    why: '「現在」的固定說法是 at present，中間沒有 the。at the moment 才有 the，兩個說法長得像，但不能混著用。',
    how: '把兩個片語分開記：at present（沒有 the）、at the moment（有 the）。看到 the，就想到 moment。',
    example: { right: 'They are playing video games at present.', wrong: 'They are playing video games at the present.' },
  },
  'supp3.G.ADV.frequency_position#v1': {
    why: 'late（遲到的）是形容詞，形容詞前面要先有 be 動詞 is；never 這類頻率副詞要放在 be 動詞的後面。',
    how: '口訣：be 動詞「後面」，一般動詞「前面」。先找有沒有 is／am／are，有的話，never 就放在它後面。',
    example: { right: 'Tina is never late for class.', wrong: 'Tina never is late for class.' },
  },
};
