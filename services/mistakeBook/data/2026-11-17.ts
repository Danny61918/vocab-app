import { MistakeRecord } from '../types';

// Imported from the parent's photos of the Week 12 paper done on 2026-11-17 (L7W12, 6 pages; the page 3 photo for
// sections C and D arrived separately). Score 83/100, so 17 points were deducted. How the marks were read:
//   - A red circle is a teacher deduction; the child then corrected the answer in blue ink and the circle stayed on
//     the corrected spot (same as 2026-11-10). C is marked "-6" with exactly six circled items (Q5, 6, 7, 10, 11, 12);
//     Reading 2 is marked "-3" with three circles (Q1, 3, 5); Reading 1 has three circles (Q1, 4, 5); E is marked "-5".
//     6 + 3 + 3 + 5 = 17, so Sections A, B and D had no deductions and are not imported.
//   - The original wrong answers are not visible for C and Reading 2, so studentAnswer says so; the C "probably wrote X"
//     notes are inferences from the red brackets/arrows. Reading 1 Q4 and Q5 are still uncorrected, so those are her real answers.
//   - E: the first attempts are visible and are recorded as written. The "-5" is not split per question, and the red box
//     around "Mark" in Q5 has no visible reason, so it is recorded as unclear.
//   - Possible slip the teacher did not deduct: B #6 drive -> "drivies" (should be drives). Not imported as a mistake.
// Same date, second paper: the L7 Week 12 vocabulary test (46/50, -2 at A-2 Q2 and -2 at A-2 Q9, both red-circled and corrected; A-1 and B had no deductions).
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-17_170yfz7",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "C. Fill in the blanks — Present Simple",
    "questionText": "People from all over the world ___ (climb) Mount Everest every year.",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 climb）；推測原本寫 climbs",
    "correctAnswer": "climb",
    "errorCategory": "verb_tense",
    "rawErrorType": "複數主詞 People 後動詞要用原形",
    "skills": [
      "G.SVA.plural_subject"
    ],
    "teacherExplanation": "People 是複數主詞，現在簡單式動詞用原形 climb，不加 s。",
    "reviewAdvice": "先看主詞：people、children 這類複數字雖然沒有 s，仍然是複數，動詞用原形。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_ajdm3c",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "C. Fill in the blanks — Present Simple",
    "questionText": "A: When does Miss Wang ___ (arrive)?  B: She arrives at 9:30.",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 arrive）；推測原本寫 arrives（紅筆從 does 拉箭頭指向空格）",
    "correctAnswer": "arrive",
    "errorCategory": "sentence_structure",
    "rawErrorType": "does 問句後的動詞要用原形（重複加 -s）",
    "skills": [
      "G.PS.does_question_base"
    ],
    "teacherExplanation": "does 已經負責第三人稱單數，後面的動詞回到原形 arrive；回答的句子沒有 does，才用 arrives。",
    "reviewAdvice": "問句有 Do／Does 時，動詞用原形；回答的肯定句沒有 does，第三人稱單數就要加 -s／-es。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_16advke",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "C. Fill in the blanks — Present Simple",
    "questionText": "___ Jack and Tina ___ (wear) trousers every Tuesday?",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 wear）；紅圈只在 wear，Do 沒有圈，推測原本寫 wears",
    "correctAnswer": "Do / wear",
    "errorCategory": "verb_tense",
    "rawErrorType": "Jack and Tina 是複數主詞，Do 問句後的動詞用原形",
    "skills": [
      "G.SVA.compound_subject",
      "G.PS.does_question_base"
    ],
    "teacherExplanation": "Jack and Tina 是兩個人（複數主詞），問句用 Do；Do 後面的動詞用原形 wear，不加 s。",
    "reviewAdvice": "A and B 合在一起是複數；Do／Does 問句後的動詞一律用原形。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_1jmizl2",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "C. Fill in the blanks — Present Simple",
    "questionText": "My brother and I ___ (wake) up at 6 o'clock every morning.",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 wake）；推測原本寫 wakes",
    "correctAnswer": "wake",
    "errorCategory": "verb_tense",
    "rawErrorType": "合併主詞 My brother and I 後動詞要用原形",
    "skills": [
      "G.SVA.compound_subject"
    ],
    "teacherExplanation": "My brother and I 是兩個人（複數主詞），動詞用原形 wake，不加 s。",
    "reviewAdvice": "主詞裡有 and 就是複數；不要因為 brother 單獨是單數就加 s。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_1pqputk",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "C. Fill in the blanks — Present Simple",
    "questionText": "___ the child ___ (water) the flowers on Monday morning?",
    "studentAnswer": "未知（原答案看不到，Does 和 water 兩個空格都被紅圈，已訂正為 Does / water）",
    "correctAnswer": "Does / water",
    "errorCategory": "sentence_structure",
    "rawErrorType": "Does 問句的助動詞與後面動詞原形",
    "skills": [
      "G.PS.does_question_base",
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "the child 是單數，問句用 Does；Does 後面的動詞用原形 water，不加 s。",
    "reviewAdvice": "先判斷主詞單複數決定 Do 或 Does，再把後面的動詞寫成原形；兩個空格都要檢查。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_1ol5k28",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "C. Fill in the blanks — Present Simple",
    "questionText": "The strange man never ___ (stay) in the same town for too long. Probably only three months.",
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 stays）；推測原本寫 stay（漏了 -s，與前面幾題相反）",
    "correctAnswer": "stays",
    "errorCategory": "verb_tense",
    "rawErrorType": "頻率副詞 never 後面的第三人稱單數動詞仍要加 -s",
    "skills": [
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "The strange man 是第三人稱單數，never 只是頻率副詞，沒有改變動詞的形式，所以仍然是 stays。",
    "reviewAdvice": "沒有 do／does 的肯定句（含 always、never、often 的句子），第三人稱單數動詞要加 -s／-es；只有 does 問句和 doesn't 後才回到原形。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_78w84e",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "Reading 1（Music Town Grand Opening 廣告）",
    "questionText": "Why is Music Town celebrating?（廣告：Music Town has finally arrived in Taiwan! … Grand Opening celebration）",
    "options": [
      "(a) It is opening a larger store.",
      "(b) It is opening its first store in Taiwan.",
      "(c) It is opening again after holidays.",
      "(d) It is opening a new CD section."
    ],
    "studentAnswer": "未知（紅圈；括號現在是 (b)，推測是訂正後的答案）",
    "correctAnswer": "(b) It is opening its first store in Taiwan.",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：慶祝開幕的原因（文章細節）",
    "skills": [
      "R.DETAIL"
    ],
    "teacherExplanation": "廣告第一句 Music Town has finally arrived in Taiwan! 說它「終於來到台灣」，Grand Opening 就是在台灣的第一家店開幕。",
    "reviewAdvice": "問「為什麼」的題目，先回文章第一、二句找原因；finally arrived in Taiwan＝第一次來到台灣。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_i3jqoh",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "Reading 1（Music Town Grand Opening 廣告）",
    "questionText": "According to the advertisement, what does Music Town NOT promise to do during the sale?",
    "options": [
      "(a) Deliver CDs free",
      "(b) Give gifts to its one-thousandth customer",
      "(c) Offer a wide variety of music",
      "(d) Lower its prices"
    ],
    "studentAnswer": "(d) Lower its prices（紅圈；括號仍是 (d)，尚未訂正；旁邊藍筆筆記顯示她已看出 15%、30% off 就是降價）",
    "correctAnswer": "(a) Deliver CDs free",
    "errorCategory": "context_carelessness",
    "rawErrorType": "NOT 題：選到廣告有承諾的項目",
    "skills": [
      "FMT.careless",
      "R.DETAIL"
    ],
    "teacherExplanation": "題目問的是 NOT promise（沒有承諾的事）。廣告有 15 到 30 percent 折扣（降價）、第一千位客人有獎品、種類很多；完全沒有提到免費寄送，所以選 (a)。",
    "reviewAdvice": "看到 NOT／EXCEPT 先圈起來；把四個選項逐一回文章找證據，有找到的就刪掉，剩下找不到的才是答案。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_prqfbt",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "Reading 1（Music Town Grand Opening 廣告）",
    "questionText": "When will the Grand Opening celebration probably start?（廣告：starting this weekend!）",
    "options": [
      "(a) On Monday",
      "(b) On Tuesday",
      "(c) On Thursday",
      "(d) On Saturday"
    ],
    "studentAnswer": "(c) On Thursday（紅圈；括號仍是 (c)，尚未訂正）",
    "correctAnswer": "(d) On Saturday",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：從 this weekend 推論開始的日子",
    "skills": [
      "R.INFER"
    ],
    "teacherExplanation": "廣告說 starting this weekend，週末的日子只有 Saturday 在選項裡，所以慶祝活動可能從星期六開始。",
    "reviewAdvice": "weekend＝Saturday 和 Sunday；遇到 probably 的推論題，把文章的時間線索換成具體的星期再比對選項。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_5j42f4",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "Reading 2（自製微波爆米花）",
    "questionText": "What is the reading about?（文章：如何用紙袋和一般爆米花自己做微波爆米花）",
    "options": [
      "(a) A way to do something",
      "(b) Bad things about microwave popcorn",
      "(c) The best popcorn company",
      "(d) Differences in kinds of popcorn"
    ],
    "studentAnswer": "未知（紅圈；括號現在是 (a)，推測是訂正後的答案）",
    "correctAnswer": "(a) A way to do something",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：文章主旨",
    "skills": [
      "R.MAIN_IDEA"
    ],
    "teacherExplanation": "文章一開始就說 Here is what you need to make microwave popcorn yourself，接著一步一步說明做法，主旨是「做某件事的方法」。",
    "reviewAdvice": "主旨題先看第一句和每段的動詞：need、put、fold、cook 都是步驟，代表文章在教做法。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_1imq4zp",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "Reading 2（自製微波爆米花）",
    "questionText": "What kind of bag do you need to make microwave popcorn?",
    "options": [
      "(a) A bag with thick paper",
      "(b) A brown microwave popcorn bag",
      "(c) A special microwave bag",
      "(d) Any plain bag"
    ],
    "studentAnswer": "未知（紅圈；括號現在是 (d)，推測是訂正後的答案）",
    "correctAnswer": "(d) Any plain bag",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：文章細節（plain bag）",
    "skills": [
      "R.DETAIL"
    ],
    "teacherExplanation": "文章說 It does not need to be a special bag at all. A plain brown paper bag is fine，所以普通的袋子就可以。",
    "reviewAdvice": "文章裡有 does not need to be special 這類否定句時，答案通常是「普通的就好」，不要被 brown、thick 這些字吸引。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_ko9nq1",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "Reading 2（自製微波爆米花）",
    "questionText": "According to the reading, which of the following is NOT TRUE?",
    "options": [
      "(a) Microwave popcorn cooks in less than one minute.",
      "(b) People can make popcorn with very little money.",
      "(c) Plain paper bags are fine for microwave popcorn.",
      "(d) Plain popcorn is fine for microwave popcorn."
    ],
    "studentAnswer": "未知（紅圈；括號現在是 (a)，推測是訂正後的答案）",
    "correctAnswer": "(a) Microwave popcorn cooks in less than one minute.",
    "errorCategory": "context_carelessness",
    "rawErrorType": "NOT TRUE 題：要逐項回文章核對",
    "skills": [
      "FMT.careless",
      "R.DETAIL"
    ],
    "teacherExplanation": "文章說 cook the bag in the microwave for two minutes（煮兩分鐘），不是不到一分鐘，所以 (a) 是不正確的敘述。其他三項文章都有支持。",
    "reviewAdvice": "NOT TRUE 題：每個選項都要回文章找證據，有證據的是 true，找不到或數字不一樣的才是答案。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_jy8kga",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "E. Combine or rewrite（... because ...）",
    "questionText": "Combine with \"because\": Movies and music are fun and relaxing. / Almost everyone enjoys movies and music.",
    "studentAnswer": "第一次寫的句子漏了 because 後面的主詞 they（老師用紅筆補上 they）；藍筆重寫為 Almost everyone enjoys movies and music because they are fun and relaxing.",
    "correctAnswer": "Almost everyone enjoys movies and music because they are fun and relaxing.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "合併句子漏字（because 後面缺主詞 they）",
    "skills": [
      "M.COMBINE.missing_words"
    ],
    "teacherExplanation": "because 後面要接完整的句子，有主詞和動詞：they are fun and relaxing。Movies and music 在後面要換成代名詞 they。",
    "reviewAdvice": "合併完用手指檢查：because 後面有沒有主詞？原句的名詞有沒有換成 it／they？",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_10jm19p",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "E. Combine or rewrite（... because ...）",
    "questionText": "Combine with \"because\": Emma practices the piano every evening. / She will perform at a concert next weekend.（句首已印 Because）",
    "studentAnswer": "第一次寫的句子把 practices 拼成 praticos（紅筆圈起整句）；藍筆重寫為 Because Emma will perform at a concert next weekend, she practices the piano every evening.",
    "correctAnswer": "Because Emma will perform at a concert next weekend, she practices the piano every evening.",
    "errorCategory": "spelling",
    "rawErrorType": "拼字：practices 寫成 praticos",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "句意正確（先寫原因再寫結果），錯在第三人稱單數動詞 practices 的拼字。Because 放句首時，原因子句後面要加逗號。",
    "reviewAdvice": "寫完用手指逐字對照原句，動詞 practice 加 -s 變成 practices，拼字要核對；because 放句首時別忘了逗號。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_bj2bun",
    "examDate": "2026-11-17",
    "examName": "Week 12 單元小考（Incredible English 4 U3、New Round-Up 2 U6、Writing TB A1 U6）",
    "section": "E. Combine or rewrite（... because ...）",
    "questionText": "Combine with \"because\": Mark is going to bed early tonight. / He has a big presentation tomorrow.（句首已印 Because）",
    "studentAnswer": "第一次寫 Mark has a big presentation tomorrow, he is going to bed early, tonight.（early 後多了一個逗號；紅筆框住 Mark，原因看不清楚）；藍筆重寫為正確版本",
    "correctAnswer": "Because Mark has a big presentation tomorrow, he is going to bed early tonight.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "標點：early 後面多了逗號（Mark 被框的原因不明）",
    "skills": [
      "M.PUNCT.comma_period"
    ],
    "teacherExplanation": "Because 放句首時，原因子句後面加一個逗號，後面的結果句不需要再加逗號：he is going to bed early tonight。",
    "reviewAdvice": "Because A, B. 只在 A 和 B 之間放一個逗號；寫完把整句讀一遍，逗號只放在停頓的地方。",
    "questionType": "rewrite",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_m68697",
    "examDate": "2026-11-17",
    "examName": "L7 Week 12 單字測驗（L7VOC-W12）",
    "section": "A-2 Choose the best answer",
    "questionText": "I got a big ___ of fries. I couldn't eat them all.",
    "options": [
      "(a) toothache",
      "(b) tunnel",
      "(c) portion"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (c) portion）",
    "correctAnswer": "(c) portion",
    "errorCategory": "content_comprehension",
    "rawErrorType": "單字：portion（一份、一部分食物）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "a big portion of fries 是「一大份薯條」，所以吃不完。toothache 是牙痛、tunnel 是隧道，放進句子都不通。",
    "reviewAdvice": "portion ＝一份、一部分（食物）；看到 a big／small portion of ___ 就想到「分量」。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  },
  {
    "id": "2026-11-17_1qh9a7p",
    "examDate": "2026-11-17",
    "examName": "L7 Week 12 單字測驗（L7VOC-W12）",
    "section": "A-2 Choose the best answer",
    "questionText": "We have a ___ tomorrow. I want to visit my grandma.",
    "options": [
      "(a) programme",
      "(b) medicine",
      "(c) holiday"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (c) holiday）",
    "correctAnswer": "(c) holiday",
    "errorCategory": "content_comprehension",
    "rawErrorType": "單字：holiday（假日）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "明天放假（holiday）才有空去看奶奶。programme 是節目、medicine 是藥，都不符合「想去拜訪」的語意。",
    "reviewAdvice": "用整句的線索選字：visit my grandma 需要有空，所以是假日 holiday。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-21T12:00:00.000Z"
  }
];

export default data;
