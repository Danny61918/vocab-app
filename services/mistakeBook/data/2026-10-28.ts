import { MistakeRecord } from '../types';

// Imported from the parent's photos of the 115 Fall Semester 1st Examination (Annie, 4A), taken
// 2026-10-28; paper score 75. Marked-wrong items are those with a red slash/cross plus a blue-pen
// correction and a green check (A: Q5, Q7, Q8, Q9; B-1: Q7, Q11; B-2: Q4-Q8; C: Q6, Q8; D: Q5, Q9;
// E Reading 1: Q1, Q2, Q3, Q6; F: Q1, Q2, Q4, Q5) = 23 questions, 25 points lost (checked against the 75).
// The original wrong answers are covered or crossed out, so studentAnswer says "unknown" and shows
// the blue-pen correction. Reading 2 (page 7) had no wrong answers.
// The "skills" field (P9) feeds the mistake drill: see services/mistakeBook/drills/2026-10-28.ts,
// which uses these records as seeds (by array index, so keep the order).
//
// Known ambiguities in the originals — none of these is reused as-is for practice:
//   - B-1 Q6 / Q7: "have a rest" and "relax" both fit either sentence; the key is Q6 = have a rest,
//     Q7 = relax (Q6 was answered correctly, only Q7 is recorded here).
//   - C Q8: option (c) is printed as "is have" (the child wrote "ng" next to it); the key is (a).
//   - E Q2: the child's "b" is written on a white correction sticker, the red mark shows under it.
//   - F Q1/Q2/Q4/Q5: the exact original mistake is not visible; Q1 was "shops" (confirmed by the
//     parent), Q2/Q4 are marked in red on would/too and mother, Q5 on the comma spot after "things".
//
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-10-28_1w2mn6u",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "一、片語填空（A. Fill in the blanks with the phrases from the box）",
    "questionText": "There were many people waiting for the ride. The staff let only two people get on it ___ because the ride was small.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 at a time）",
    "correctAnswer": "at a time",
    "errorCategory": "content_comprehension",
    "rawErrorType": "片語意思與句意配對（at a time）",
    "skills": [
      "V.PHRASE"
    ],
    "teacherExplanation": "at a time 是「一次、每次」。設施很小，所以工作人員一次只讓兩個人上去。",
    "reviewAdvice": "把 at a time 和 one by one 一起記：one at a time＝一次一個。造一句：Please come in one at a time.",
    "questionType": "fill_blank",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_1dzlt9t",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "一、片語填空（A. Fill in the blanks with the phrases from the box）",
    "questionText": "Judy invited her classmates ___ her neighbors to her birthday party. She wanted everyone she cared about to come.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 as well as）",
    "correctAnswer": "as well as",
    "errorCategory": "content_comprehension",
    "rawErrorType": "片語意思與句意配對（as well as）",
    "skills": [
      "V.PHRASE"
    ],
    "teacherExplanation": "as well as 是「以及、還有」，用來把兩群人並列在一起：邀請同學，也邀請鄰居。",
    "reviewAdvice": "as well as 和 and 意思接近。試著把 I like apples and oranges 改寫成 I like apples as well as oranges。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_5n4szq",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "一、片語填空（A. Fill in the blanks with the phrases from the box）",
    "questionText": "My 4-year-old daughter asks me questions ___. Sometimes, I just want to have a quiet moment.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 all the time）",
    "correctAnswer": "all the time",
    "errorCategory": "content_comprehension",
    "rawErrorType": "片語意思與句意配對（all the time）",
    "skills": [
      "V.PHRASE"
    ],
    "teacherExplanation": "all the time 是「一直、老是」。四歲女兒一直發問，所以爸媽有時只想安靜一下。",
    "reviewAdvice": "看到「有時只想安靜」這種線索，要想到前一句在說「很常、一直」。造一句：My dog sleeps all the time.",
    "questionType": "fill_blank",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_1x5n3yi",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "一、片語填空（A. Fill in the blanks with the phrases from the box）",
    "questionText": "I didn't buy the expensive jacket. ___, I already have a warm one at home.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 after all）",
    "correctAnswer": "after all",
    "errorCategory": "content_comprehension",
    "rawErrorType": "片語意思與句意配對（after all）",
    "skills": [
      "V.PHRASE"
    ],
    "teacherExplanation": "After all 是「畢竟、說到底」，用來補充理由：沒買貴的外套，畢竟家裡已經有一件暖的。",
    "reviewAdvice": "After all 放在句首，後面接逗號再說理由。造一句：Don't be angry with him. After all, he is only five.",
    "questionType": "fill_blank",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_12ekvb9",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-1 單字填空（Complete the sentences with the words from the box）",
    "questionText": "After running for two hours, we decided to ___ and drink some water.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 relax（12））",
    "correctAnswer": "relax",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（relax／have a rest 語意相近）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "跑了兩小時很累，所以要放鬆休息一下：relax。注意 have a rest 也說得通，本卷 Q6 的標準答案是 have a rest，所以這題配 relax。",
    "reviewAdvice": "遇到兩個字都說得通的填空題，要先把整份詞庫的題目都看過，再決定哪個字放哪一題；先填最確定的，剩下的再配。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_79opyl",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-1 單字填空（Complete the sentences with the words from the box）",
    "questionText": "After sitting in front of the computer all day, Kevin wanted to ___ in the park to get some exercise and fresh air.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 go for a walk（1））",
    "correctAnswer": "go for a walk",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（go for a walk）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "想在公園「運動、呼吸新鮮空氣」，適合的動作是 go for a walk（散步）。",
    "reviewAdvice": "看到 exercise、fresh air、park 這些線索，要想到戶外活動。造一句：Let's go for a walk after dinner.",
    "questionType": "fill_blank",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_wgxsr4",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-2 單字選擇（Choose the correct answer）",
    "questionText": "The host is having a(n) ___ with a famous singer. They're talking about her new album.",
    "options": [
      "(a) countryside",
      "(b) interview",
      "(c) cartoonist"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (b) interview）",
    "correctAnswer": "(b) interview",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（interview）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "主持人和歌手聊新專輯，是在做「訪問」：interview。countryside 是鄉下，cartoonist 是漫畫家。",
    "reviewAdvice": "用 have an interview with 造句：The reporter had an interview with the player。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_12ipsev",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-2 單字選擇（Choose the correct answer）",
    "questionText": "I have visited Japan ___ times. Every time I go there, I can find something new.",
    "options": [
      "(a) several",
      "(b) brilliant",
      "(c) enough"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (a) several）",
    "correctAnswer": "(a) several",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（several times 的搭配）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "several times 是「好幾次」。去了好幾次，每次都有新發現。brilliant 是很棒的，不能修飾 times。",
    "reviewAdvice": "背 several times、many times、a few times 這類「次數」搭配，並注意 several 後面要接複數名詞。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_1nnr97n",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-2 單字選擇（Choose the correct answer）",
    "questionText": "Scientists are ___ to learn more about the disease. Their work may help doctors.",
    "options": [
      "(a) doing research",
      "(b) doing tricks",
      "(c) taking medicine"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (a) doing research）",
    "correctAnswer": "(a) doing research",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（do research）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "科學家為了更了解疾病而「做研究」：do research。他們的研究可能幫助醫生。",
    "reviewAdvice": "記下 do research（做研究）、do homework（寫功課）這類 do 的搭配。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_1k2ph58",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-2 單字選擇（Choose the correct answer）",
    "questionText": "We went on a ___ to the North Pole last summer. Every single day was a fun adventure.",
    "options": [
      "(a) minute",
      "(b) comics",
      "(c) trip"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (c) trip）",
    "correctAnswer": "(c) trip",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（go on a trip）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "go on a trip 是「去旅行」。去北極的每一天都是有趣的冒險，所以是 trip。",
    "reviewAdvice": "用 go on a trip 造三句不同地點的句子，例如 go on a trip to Taichung。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_dj6rq8",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "B-2 單字選擇（Choose the correct answer）",
    "questionText": "Speaking of ___, Captain Hook is probably the most famous one. He sails the seas with his crew and looks for treasure.",
    "options": [
      "(a) planets",
      "(b) pirates",
      "(c) mountains"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (b) pirates）",
    "correctAnswer": "(b) pirates",
    "errorCategory": "content_comprehension",
    "rawErrorType": "依句意選字（pirate）",
    "skills": [
      "V.CONTEXT"
    ],
    "teacherExplanation": "虎克船長出海、帶著船員找寶藏，所以他是「海盜」：pirate，這裡用複數 pirates。",
    "reviewAdvice": "看到 sail the seas、crew、treasure 這些線索，要連結到 pirate（海盜）。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_wuzpiu",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "C 文法選擇（Choose the correct answer）",
    "questionText": "The pigs are cute. Look at ___ tails!",
    "options": [
      "(a) their",
      "(b) its",
      "(c) theirs",
      "(d) it's"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (a) their）",
    "correctAnswer": "(a) their",
    "errorCategory": "plural_possessive",
    "rawErrorType": "所有格 their／its／theirs／it's 的選擇",
    "skills": [
      "G.POSS.their_its"
    ],
    "teacherExplanation": "pigs 是複數，「他們的、牠們的」要用 their，後面接名詞 tails。its 是單數的「它的」，theirs 後面不接名詞，it's 是 it is 的縮寫。",
    "reviewAdvice": "先看擁有者是單數還是複數，再看後面有沒有名詞：後面有名詞用 their／its，沒有名詞才用 theirs。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_1tr2me8",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "C 文法選擇（Choose the correct answer）",
    "questionText": "Monica ___ pizza at the moment.",
    "options": [
      "(a) isn't having",
      "(b) has",
      "(c) is have",
      "(d) having"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (a) isn't having）",
    "correctAnswer": "(a) isn't having",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在進行式（at the moment 的時態）",
    "skills": [
      "G.PROG.present_continuous"
    ],
    "teacherExplanation": "at the moment（此刻）要用現在進行式 be + V-ing，所以 isn't having 是對的。has 是現在簡單式，is have 少了 -ing，having 前面缺 be 動詞。（卷上選項 (c) 印成 is have，旁邊孩子手寫補了 ng。）",
    "reviewAdvice": "看到 now、right now、at the moment、Look! 這些字，就要馬上想到 be + V-ing；選項裡先檢查有沒有 be 動詞和 -ing。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_2jacjo",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "D CLIL 科普 True or False",
    "questionText": "The shining sun over the sea would make the seawater warm.",
    "options": [
      "T",
      "F"
    ],
    "studentAnswer": "原本寫 F（藍筆已訂正為 T）",
    "correctAnswer": "T",
    "errorCategory": "content_comprehension",
    "rawErrorType": "科普內容理解（太陽使海水變暖）",
    "skills": [
      "R.CLIL.science"
    ],
    "teacherExplanation": "太陽照在海面上，海水會被曬暖，這是水循環的第一步。所以這句是 True。",
    "reviewAdvice": "把水循環的順序說一遍：太陽曬熱海水 → 水蒸發成水蒸氣 → 遇冷變成雲 → 變成雨雪落下 → 流回海裡。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_8pvvyk",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "D CLIL 科普 True or False",
    "questionText": "We can copy pictures more easily by using a grid.",
    "options": [
      "T",
      "F"
    ],
    "studentAnswer": "原本寫 F（藍筆已訂正為 T）",
    "correctAnswer": "T",
    "errorCategory": "content_comprehension",
    "rawErrorType": "科普內容理解（用方格複製圖片）",
    "skills": [
      "R.CLIL.science"
    ],
    "teacherExplanation": "用方格（grid）可以把圖片一格一格地複製，所以更容易。這句是 True。",
    "reviewAdvice": "自己畫一個方格，把一張小圖片一格一格抄到大方格上，並用英文說：I use a grid to copy the picture.",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_131whf0",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "E Reading 1 閱讀測驗",
    "questionText": "Reading 1: What is the best title for this story?",
    "options": [
      "(a) An Embarrassing Experience",
      "(b) Accidents Happen All the Time",
      "(c) My Father's Great Advice"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (c) My Father's Great Advice）",
    "correctAnswer": "(c) My Father's Great Advice",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：選最適合的標題（主旨）",
    "skills": [
      "R.MAIN_IDEA"
    ],
    "teacherExplanation": "文章講男孩的褲子被熱豆漿弄濕，爸爸教他要學會忽略愚蠢的玩笑，最後他說 I really learned an important lesson from my dad。重點是爸爸的建議，所以標題選 (c)。",
    "reviewAdvice": "選標題時，先看文章最後一段在總結什麼，再排除只講故事一小部分的選項（例如只講尷尬經驗的 (a)）。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_12a9g9u",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "E Reading 1 閱讀測驗",
    "questionText": "Reading 1: What was the boy most afraid of after his pants got wet?",
    "options": [
      "(a) The hot soy milk would burn him.",
      "(b) He would be laughed at by others.",
      "(c) He would be late for school."
    ],
    "studentAnswer": "未知（原答案被白色修正貼紙蓋住，貼紙下露出紅線，藍筆在貼紙上寫 b）",
    "correctAnswer": "(b) He would be laughed at by others.",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：找出人物的擔心（推論）",
    "skills": [
      "R.INFER"
    ],
    "teacherExplanation": "原文說 I felt upset because I knew some of my classmates would make fun of me。他最怕被同學取笑，所以選 (b)。make fun of 就是 laugh at。",
    "reviewAdvice": "遇到「最怕什麼」這類問題，找文中 afraid、worried、upset 附近的那一句，再把原文換個說法的選項配回去。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_zs0jej",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "E Reading 1 閱讀測驗",
    "questionText": "Reading 1: According to this story, who made fun of the boy?",
    "options": [
      "(a) Everyone in his class",
      "(b) Some of his friends",
      "(c) No one"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (c) No one）",
    "correctAnswer": "(c) No one",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：依文章細節作答（誰取笑他）",
    "skills": [
      "R.DETAIL"
    ],
    "teacherExplanation": "最後一段說 only a few classmates noticed my pants, but nobody said anything，沒有人取笑他。所以是 (c) No one。他原本只是「擔心」被取笑。",
    "reviewAdvice": "分清楚「擔心會發生」和「真的發生」：這題問的是故事結果，要看最後一段。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_wt92s2",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "E Reading 1 閱讀測驗",
    "questionText": "Reading 1: According to this story, which of the following is TRUE?",
    "options": [
      "(a) The father ran home to get new pants for his son.",
      "(b) The father told his son not to worry about other people's jokes.",
      "(c) The boy felt upset because his expensive pants got dirty."
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (b) The father told his son not to worry about other people's jokes.）",
    "correctAnswer": "(b) The father told his son not to worry about other people's jokes.",
    "errorCategory": "content_comprehension",
    "rawErrorType": "閱讀：依文章細節作答（哪一句正確）",
    "skills": [
      "R.DETAIL"
    ],
    "teacherExplanation": "爸爸說 you will have to learn to ignore stupid jokes，意思就是別理會別人的玩笑，所以 (b) 正確。(a) 爸爸拒絕讓他跑回家換褲子；(c) 褲子是被熱豆漿弄濕，不是弄髒了昂貴的褲子。",
    "reviewAdvice": "做 TRUE 題要一個一個選項回原文核對，把不符合的畫掉，不要只憑印象。",
    "questionType": "reading_comprehension",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_1ypvvsj",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "F 連接詞合併句子（Choose the proper conjunction to combine the sentences）",
    "questionText": "Combine with \"and\": Irene shops online on Wednesdays. / Claire shops online on Wednesdays.",
    "studentAnswer": "原本寫 Irene and Claire shops online on Wednesdays（動詞加了 s，藍筆改為 shop）",
    "correctAnswer": "Irene and Claire shop online on Wednesdays.",
    "errorCategory": "verb_tense",
    "rawErrorType": "合併主詞後動詞要用複數（原形）",
    "skills": [
      "G.SVA.compound_subject"
    ],
    "teacherExplanation": "Irene and Claire 是兩個人（複數主詞），動詞用原形 shop，不加 s。",
    "reviewAdvice": "把兩個主詞用 and 合併後，馬上把動詞改成原形：A and B + 動詞原形。",
    "questionType": "rewrite",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_qmrqfw",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "F 連接詞合併句子（Choose the proper conjunction to combine the sentences）",
    "questionText": "Combine with \"but\": It would be much faster to fly to New York. / The ticket is too expensive.",
    "studentAnswer": "未知（紅筆標在第一行的 would 和 too 上，原本的錯字看不清楚；藍筆訂正時一度漏抄 New，孩子自己補上）",
    "correctAnswer": "It would be much faster to fly to New York, but the ticket is too expensive.",
    "errorCategory": "context_carelessness",
    "rawErrorType": "抄寫／拼字粗心（would、too、漏抄 New）",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "but 連接「搭飛機比較快」和「機票太貴」這兩個相反的意思，but 前面要加逗號。紅筆標在 would 和 too，抄寫時要逐字核對；New York 是地名，兩個字都要抄、首字母大寫。",
    "reviewAdvice": "寫完合併句後，用手指逐字對照原句：每個字母、每個地名、每個逗號都要核對一次。",
    "questionType": "rewrite",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_jo3yo3",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "F 連接詞合併句子（Choose the proper conjunction to combine the sentences）",
    "questionText": "Combine with \"or\": My mother doesn't drink soda. / My mother doesn't drink coffee.",
    "studentAnswer": "未知（紅筆在 mother 的字母上畫圈，原本的錯字看不清楚；藍筆已訂正）",
    "correctAnswer": "My mother doesn't drink soda or coffee.",
    "errorCategory": "spelling",
    "rawErrorType": "拼字（mother）",
    "skills": [
      "M.SPELL.careful_copy"
    ],
    "teacherExplanation": "否定句裡「兩樣都不要」用 or 連接：doesn't drink soda or coffee。紅筆圈在 mother 的字母上，要把 mother 拼對（o 不是 a）。",
    "reviewAdvice": "把 mother、brother、another 這幾個 -other 的字連著寫三遍，並大聲唸出 /ʌ/ 的音來記字母 o。",
    "questionType": "rewrite",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
  {
    "id": "2026-10-28_dc251q",
    "examDate": "2026-10-28",
    "examName": "115 學年度上學期第一次段考",
    "section": "F 連接詞合併句子（Choose the proper conjunction to combine the sentences）",
    "questionText": "Combine: Rick packs up his things. / Rick picks up the trash. / Rick drives away.",
    "studentAnswer": "未知（紅筆畫在 things 與逗號之間，訂正後的句子在 things 後面多了逗號）",
    "correctAnswer": "Rick packs up his things, picks up the trash and drives away.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "三個動作並列的標點（逗號）",
    "skills": [
      "M.COMMA.series"
    ],
    "teacherExplanation": "三個動作並列時，前面的動作用逗號隔開，只在最後一個前面加 and：A, B and C。第二個動作 picks up the trash 前面少了逗號。",
    "reviewAdvice": "寫 A, B and C 的句子時，數一數有幾個動作：三個就要有兩個分隔，前一個用逗號、最後一個用 and。",
    "questionType": "rewrite",
    "importedAt": "2026-11-08T12:00:00.000Z"
  },
];

export default data;
