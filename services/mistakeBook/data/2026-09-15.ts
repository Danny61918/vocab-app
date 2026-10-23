import { MistakeRecord } from '../types';

// Imported from two photos of the 2026-09-15 "(L7) Week 3 Vocabulary Test"
// (L7VOC-W03), read directly — page 2 (Section B, idioms) was photographed
// first and page 1 (Section A-1/A-2) confirmed the date afterward. Same
// situation as the other 2026 imports: Annie's original wrong answers are
// overwritten by the correction, so studentAnswer records that honestly.
// A-1 wrong items confirmed via the "-8" deduction matching 4 items x 2pts;
// B wrong items confirmed via red circle + per-item point deduction. A-2
// (multiple choice, items 4-10 not photographed) is not included here. See
// services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    id: "2026-09-15_1v45b2b",
    examDate: "2026-09-15",
    examName: "(L7) Week 3 Vocabulary Test",
    section: "A-1. Complete the sentences with the words from the box.",
    questionText: "2. This sofa is very ___. I want to sit here all day.",
    studentAnswer: "（原始作答已被訂正覆蓋，無法辨識；此題判斷錯誤）",
    correctAnswer: "comfortable",
    errorCategory: "content_comprehension",
    rawErrorType: "字庫配對題：comfortable 語意判斷錯誤",
    teacherExplanation: "這句在說沙發讓人想整天坐在這，要用「comfortable」（舒服的）來形容坐起來的感受。",
    reviewAdvice: "請孩子形容自己房間裡覺得舒服的東西（枕頭、椅子等），用『My ... is very comfortable.』造句。",
    questionType: "fill_blank",
    importedAt: "2026-10-23T10:00:00.000Z",
  },
  {
    id: "2026-09-15_ibti9z",
    examDate: "2026-09-15",
    examName: "(L7) Week 3 Vocabulary Test",
    section: "A-1. Complete the sentences with the words from the box.",
    questionText: "3. We're going to a(n) ___ this weekend. There will be games, hiking, and campfires!",
    studentAnswer: "（原始作答已被訂正覆蓋，無法辨識；此題判斷錯誤）",
    correctAnswer: "adventure camp",
    errorCategory: "content_comprehension",
    rawErrorType: "字庫配對題：adventure camp 語意判斷錯誤",
    teacherExplanation: "這句在說週末要去的地方有遊戲、健行、營火晚會，這些都是「探險營」的活動，要用「adventure camp」。",
    reviewAdvice: "請孩子說說自己想參加的營隊活動，用『I want to go to a(n) adventure camp because...』造句。",
    questionType: "fill_blank",
    importedAt: "2026-10-23T10:00:00.000Z",
  },
  {
    id: "2026-09-15_uv9dxp",
    examDate: "2026-09-15",
    examName: "(L7) Week 3 Vocabulary Test",
    section: "A-1. Complete the sentences with the words from the box.",
    questionText: "5. Do we have ___ water for the trip? Let's bring one more bottle, just in case.",
    studentAnswer: "（原始作答已被訂正覆蓋，無法辨識；此題判斷錯誤）",
    correctAnswer: "enough",
    errorCategory: "content_comprehension",
    rawErrorType: "字庫配對題：enough 語意判斷錯誤",
    teacherExplanation: "這句在問水「夠不夠」帶去旅行，要用「enough」（足夠的）。",
    reviewAdvice: "請孩子練習用 enough 問問題，例如：『Do we have enough snacks/money/time?』感受它是用來問「夠不夠」的。",
    questionType: "fill_blank",
    importedAt: "2026-10-23T10:00:00.000Z",
  },
  {
    id: "2026-09-15_ls3m6m",
    examDate: "2026-09-15",
    examName: "(L7) Week 3 Vocabulary Test",
    section: "A-1. Complete the sentences with the words from the box.",
    questionText: "8. There are many books on the ___ in the library. Just pick one you like.",
    studentAnswer: "（原始作答已被訂正覆蓋，無法辨識；此題判斷錯誤）",
    correctAnswer: "shelves",
    errorCategory: "content_comprehension",
    rawErrorType: "字庫配對題：shelf 複數變化（shelves）錯誤",
    teacherExplanation: "這句在說圖書館的書架上有很多書，「書架」的複數要用「shelves」（shelf 的複數，字尾 f 要變 ves）。",
    reviewAdvice: "請孩子練習 shelf→shelves 這種 f 結尾名詞變複數的規則，還可以跟 leaf→leaves、knife→knives 等類似的字一起複習。",
    questionType: "fill_blank",
    importedAt: "2026-10-23T10:00:00.000Z",
  },
  {
    id: "2026-09-15_195n4i",
    examDate: "2026-09-15",
    examName: "(L7) Week 3 Vocabulary Test",
    section: "B. Choose the correct idioms or phrases to complete the sentences. Capitalize where necessary.",
    questionText: "2. I don't want to lend Amy any money. ___, she isn't my family or friend.",
    studentAnswer: "（原始作答已被訂正覆蓋，無法辨識；此題判斷錯誤）",
    correctAnswer: "After all",
    errorCategory: "content_comprehension",
    rawErrorType: "片語語意判斷錯誤（after all 與 above all 混淆，累計第 3 次錯）",
    teacherExplanation: "這句是在解釋「不想借錢給 Amy」的理由：「畢竟，她不是我的家人或朋友」，用「after all」（畢竟、說到底）強調最根本的理由。這個片語在 10/20、10/22 的考卷也都錯過，是目前最需要加強的混淆點之一。",
    reviewAdvice: "這是目前累計錯最多次的片語之一，建議優先做對比練習：after all（畢竟，放在理由後面總結）vs above all（最重要的是，放在列舉後面強調重點）。",
    questionType: "fill_blank",
    importedAt: "2026-10-23T10:00:00.000Z",
  },
  {
    id: "2026-09-15_1o7rg0z",
    examDate: "2026-09-15",
    examName: "(L7) Week 3 Vocabulary Test",
    section: "B. Choose the correct idioms or phrases to complete the sentences. Capitalize where necessary.",
    questionText: "4. ___ the teacher, we have no homework today. Everyone in class was so happy!",
    studentAnswer: "（原始作答已被訂正覆蓋，無法辨識；此題判斷錯誤）",
    correctAnswer: "According to",
    errorCategory: "content_comprehension",
    rawErrorType: "片語語意判斷錯誤（according to 轉述來源，累計第 4 次錯）",
    teacherExplanation: "空格後面接「the teacher」（老師），表示這是轉述老師說的話，要用「According to」（根據、按照）。這個片語是目前錯題本裡出現次數最多的一個（10/20、10/22 的考卷都考過、都錯）。",
    reviewAdvice: "這是目前累計錯最多次的片語，建議優先加強：教孩子判斷技巧——空格後面接「某個人」時通常用 according to。",
    questionType: "fill_blank",
    importedAt: "2026-10-23T10:00:00.000Z",
  },
];

export default data;
