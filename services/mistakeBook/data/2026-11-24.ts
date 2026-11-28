import { MistakeRecord } from '../types';

// Imported from the parent's photos of the L7 Week 13 weekly test of 2026-11-24 (Annie, 4A; Incredible English 4 U3,
// New Round-Up 2 U6, Writing TB A1 U6). Paper score 73. Section G (reading) was all correct (10%).
// Red circle / red slash + blue-ink correction + green check = deducted and corrected, so the original
// answers are not visible for A, B5, D, and the 'T' of E2/E9 is inferred (true/false). Original answers ARE
// visible for C3 (are you going), C5 (drive), B2, B3, F5 (her own writing is still on the page).
//
// Score check (NOT fully reconciled): the visible red numbers add up to A -8, B -5, C -2, D -3, E -2, F -2 = 22,
// which gives 78, not 73. A number written beside Q1 may be the section subtotal (B's -5 sits beside B1, which was
// correct), so F's -2 may be the whole of F. The parent confirms F Q3 and F Q5 are both wrong; if their
// deductions are unwritten and make up the other 5 points, the total works out, but that is unconfirmed and the
// 5 points could be somewhere else. The 15 records below do not depend on it.
//
// Known ambiguities, none reused as-is for practice:
//   - B2: no answer key on the paper; "Eason doesn't always get up late on Sundays." is inferred from the words.
//   - B4: "The student are never nevous..." was accepted by the teacher (the parent confirmed B4 is correct),
//     so it is NOT recorded.
//   - D: -3 split as D2 -2 and D4 -1 (parent confirmed the reading).
//   - F1: a -2 is written beside it but the answer itself reads correct; the parent guesses the task wanted both
//     patterns (Because (1),(2) and (2) because (1)) and only one was written. Unconfirmed; not recorded.
//   - F3: the expected answer is inferred from the red "it" written over "the piano".
// Second paper of the same day: the L7 Week 13 vocabulary test (40/50). Points lost: A-1 -4 (Q6, Q9), A-2 -2 (Q8),
// B -4 (Q2, Q4) = 10, which reconciles with the 40. Same reading as the weekly test: red circle (or red slash) plus a
// blue-ink correction = deducted and corrected, so the original answers are not visible. A-1 Q6 (capital B, red note
// "first letter") and A-1 Q9 (red circle on the s of "beats", and the same s circled in the word box) suggest the
// originals, but those are inferred. B Q2/Q4: the parent read the original (partly legible) writing on the paper: Q2 was
// "is covered with" and Q4 was "is anx... about", i.e. the two phrases were swapped. The blue "(ph.) 中文" notes are on every corrected item.
// A-2 Q2 carries a big red mark, read as a tick (correct), because the A-2 total is only -2 (Q8).
// See services/mistakeBook/types.ts for the import process.
const data: MistakeRecord[] = [
  {
    "id": "2026-11-24_xhzi7x",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "A. Choose the correct answer（38%）",
    "questionText": "James ___ at the bakery in the evening.",
    "options": [
      "(a) work",
      "(b) works",
      "(c) working",
      "(d) is working"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (b) works）",
    "correctAnswer": "(b) works",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在簡單式：第三人稱單數動詞加 -s",
    "skills": [
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "James 是第三人稱單數，描述固定的習慣用現在簡單式，動詞要加 s：works。",
    "reviewAdvice": "看到 he / she / 人名當主詞，現在簡單式的動詞就加 -s：James works, Mary plays。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_g40jko",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "A. Choose the correct answer（38%）",
    "questionText": "We ___ our mom with the cooking.",
    "options": [
      "(a) always help",
      "(b) help always",
      "(c) always helps",
      "(d) helps always"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (a) always help）",
    "correctAnswer": "(a) always help",
    "errorCategory": "sentence_structure",
    "rawErrorType": "頻率副詞位置／複數主詞動詞原形（原答案不可見，兩者皆為推測）",
    "skills": [
      "G.ADV.frequency_position",
      "G.SVA.plural_subject"
    ],
    "teacherExplanation": "頻率副詞 always 放在一般動詞前面；We 是複數主詞，動詞用原形 help，不加 s。所以是 always help。",
    "reviewAdvice": "口訣：頻率副詞放在「be 動詞後、一般動詞前」。造一句：We always help our mom.",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_1adbcfm",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "A. Choose the correct answer（38%）",
    "questionText": "Judy ___ her desk every Friday.",
    "options": [
      "(a) cleans",
      "(b) study",
      "(c) is learning",
      "(d) doesn't sleep"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (a) cleans）",
    "correctAnswer": "(a) cleans",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在簡單式：第三人稱單數動詞加 -s",
    "skills": [
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "every Friday 表示固定習慣，用現在簡單式；Judy 是第三人稱單數，所以 cleans。",
    "reviewAdvice": "看到 every + 時間，先想到現在簡單式；主詞是 he/she/人名就加 -s。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_h26p07",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "A. Choose the correct answer（38%）",
    "questionText": "It ___ Monday afternoon, and my classmates and I ___ in the classroom taking a difficult math test.",
    "options": [
      "(a) does / be",
      "(b) do / am",
      "(c) being / do",
      "(d) is / are"
    ],
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 (d) is / are）",
    "correctAnswer": "(d) is / are",
    "errorCategory": "verb_tense",
    "rawErrorType": "be 動詞要對應主詞（It / my classmates and I）",
    "skills": [
      "G.BE.agreement"
    ],
    "teacherExplanation": "It 用 is；my classmates and I 是合併的複數主詞，用 are。",
    "reviewAdvice": "先找主詞：單數用 is，複數（含 A and B）用 are，再選答案。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_1eopost",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "B. Unscramble sentences into Present Simple（10%）",
    "questionText": "Unscramble: on Sundays / not get up / always / late / Eason / .",
    "studentAnswer": "Eason always don't get up late on Sundays.（紅框標在 always don't get）",
    "correctAnswer": "Eason doesn't always get up late on Sundays.",
    "errorCategory": "verb_tense",
    "rawErrorType": "第三人稱單數的否定要用 doesn't；always 與否定的位置",
    "skills": [
      "G.NEG.dont_doesnt",
      "G.ADV.frequency_position"
    ],
    "teacherExplanation": "Eason 是第三人稱單數，否定要用 doesn't，不是 don't。「不是總是」要寫成 doesn't always，不是 always don't。（標準答案是依題目字詞推出，紙上沒有寫標準答案。）",
    "reviewAdvice": "否定句先決定助動詞：he/she/人名 → doesn't + 動詞原形。想表達「不總是」就放在 doesn't always + 動詞。",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_oklgvg",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "B. Unscramble sentences into Present Simple（10%）",
    "questionText": "Unscramble: usually / be / polite / Hellen / others / to / .",
    "studentAnswer": "Hellen is usually to others polite.（紅框標在 is usually to）",
    "correctAnswer": "Hellen is usually polite to others.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "形容詞與介系詞片語的語序（polite to others）",
    "teacherExplanation": "句型是 主詞 + be + 頻率副詞 + 形容詞 + to + 人。polite（形容詞）要緊接在 be 後面，to others 放最後。",
    "reviewAdvice": "先排主詞和 be，再放頻率副詞，然後是形容詞，最後才是 to + 對象：She is usually kind to animals.",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_das9dh",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "B. Unscramble sentences into Present Simple（10%）",
    "questionText": "Unscramble: you / the class / talk / do / in / often / ?",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 Do you often talk in the class?）",
    "correctAnswer": "Do you often talk in the class?",
    "errorCategory": "sentence_structure",
    "rawErrorType": "一般問句：Do + 主詞 + 頻率副詞 + 動詞原形（原答案不可見，為推測）",
    "skills": [
      "G.PS.does_question_base"
    ],
    "teacherExplanation": "Do 開頭的問句，主詞 you 後面先放頻率副詞 often，再接動詞原形 talk。",
    "reviewAdvice": "問句公式：Do/Does + 主詞 + 頻率副詞 + 動詞原形 + 其他？",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_wsqt9w",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "C. Circle the correct answer（9%）",
    "questionText": "How often (are you going / do you go) to the cinema?",
    "options": [
      "are you going",
      "do you go"
    ],
    "studentAnswer": "are you going（紅斜線劃在她的選擇上）",
    "correctAnswer": "do you go",
    "errorCategory": "verb_tense",
    "rawErrorType": "How often 問習慣要用現在簡單式，不是現在進行式",
    "skills": [
      "G.PROG.present_continuous"
    ],
    "teacherExplanation": "How often（多久一次）問的是習慣，用現在簡單式：How often do you go…? 現在進行式只用在「現在正在做」。",
    "reviewAdvice": "看到 How often、every、usually 這類頻率線索，就用現在簡單式，不要用 be + V-ing。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_19ssoqw",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "C. Circle the correct answer（9%）",
    "questionText": "The tall man (drive / drives) to the club every Wednesday.",
    "options": [
      "drive",
      "drives"
    ],
    "studentAnswer": "drive（紅斜線劃在她的選擇上）",
    "correctAnswer": "drives",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在簡單式：第三人稱單數動詞加 -s",
    "skills": [
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "The tall man 是第三人稱單數，every Wednesday 是習慣，動詞要加 s：drives。",
    "reviewAdvice": "主詞 = he / she / 一個人 → 動詞加 -s。可以先把主詞換成 he，看順不順。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_1mbu1z8",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "D. Fill in the blanks with Present Continuous Tense（8%）",
    "questionText": "The boys ___ (sit) under the tree now. They're standing behind the tree.",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 aren't sitting）",
    "correctAnswer": "aren't sitting",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在進行式的否定：be + not + V-ing",
    "skills": [
      "G.PROG.present_continuous"
    ],
    "teacherExplanation": "現在進行式否定是 be + not + V-ing。男孩們（複數）用 aren't，sit 的 -ing 要重複字尾 t：sitting。",
    "reviewAdvice": "排列：主詞 + be (not) + V-ing。注意短母音加子音的動詞要重複字尾：sit→sitting, run→running。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_h6i4ku",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "D. Fill in the blanks with Present Continuous Tense（8%）",
    "questionText": "Why ___ the people ___ (run)?",
    "studentAnswer": "未知（原答案看不到，藍筆已訂正為 are）",
    "correctAnswer": "are / running",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在進行式的疑問句：疑問詞 + be + 主詞 + V-ing",
    "skills": [
      "G.PROG.present_continuous",
      "G.BE.agreement"
    ],
    "teacherExplanation": "the people 是複數，be 動詞用 are；run 的 -ing 要重複字尾 n：running。",
    "reviewAdvice": "疑問詞開頭的進行式問句：Why + be + 主詞 + V-ing？",
    "questionType": "fill_blank",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_t6jcpv",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "E. CLIL True or False（10%）",
    "questionText": "We measure our pulse in beats per second (BPS).",
    "options": [
      "T",
      "F"
    ],
    "studentAnswer": "原本寫 T（由 T/F 與藍筆訂正的 F 推得）",
    "correctAnswer": "F",
    "errorCategory": "content_comprehension",
    "rawErrorType": "科普內容：脈搏的單位是每分鐘（BPM），不是每秒",
    "skills": [
      "R.CLIL.science"
    ],
    "teacherExplanation": "脈搏的單位是 beats per minute（BPM，每分鐘幾下），不是每秒。這句是 False。",
    "reviewAdvice": "背一句：We measure our pulse in beats per MINUTE (BPM). 單元三的 pulse 練習章節可以複習。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_lfelo3",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "E. CLIL True or False（10%）",
    "questionText": "Your heart usually beats about 70 times per hour.",
    "options": [
      "T",
      "F"
    ],
    "studentAnswer": "原本寫 T（由 T/F 與藍筆訂正的 F 推得）",
    "correctAnswer": "F",
    "errorCategory": "content_comprehension",
    "rawErrorType": "科普內容：心跳約每分鐘 70 下，不是每小時",
    "skills": [
      "R.CLIL.science"
    ],
    "teacherExplanation": "課文說心臟通常每分鐘跳約 70 下（70 times per minute），不是每小時。這句是 False。",
    "reviewAdvice": "和上一題一起記：脈搏、心跳的單位都是 per minute。",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_1vms5wj",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "F. Combine the sentences with the given conjunctions（15%）",
    "questionText": "Combine with \"because\": Playing the piano is fun. / Lots of people love playing it.",
    "studentAnswer": "Lots of people love playing it because playing the piano is fun.（第一次寫後被紅線劃掉，重寫一次幾乎相同）",
    "correctAnswer": "Lots of people love playing the piano because it is fun.",
    "errorCategory": "sentence_structure",
    "rawErrorType": "合併句子：代名詞要放在它所指的名詞「後面」（推測）",
    "skills": [
      "G.PRON.reference"
    ],
    "teacherExplanation": "「it」指的是 playing the piano，先出現的應該是完整的名詞，後面的原因子句才用 it：love playing the piano because it is fun。她的寫法把代名詞放在前面，名詞放在後面。（標準答案是依老師的紅筆推測，紙上沒有寫。）",
    "reviewAdvice": "合併句子時先寫完整名詞，之後再用 it / they 代替。",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_13x6jvx",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 週考（11/24，73 分）",
    "section": "F. Combine the sentences with the given conjunctions（15%）",
    "questionText": "Combine with \"Because\": Thomas is a smart boy. / Every teacher likes Thomas.",
    "studentAnswer": "Because Thomas is a smart boy, every teacher like he.（老師只框了 he）",
    "correctAnswer": "Because Thomas is a smart boy, every teacher likes him.",
    "errorCategory": "verb_tense",
    "rawErrorType": "合併句子：every teacher 動詞加 -s；受詞要用受格 him",
    "skills": [
      "G.SVA.third_person_s",
      "G.PRON.reference"
    ],
    "teacherExplanation": "every teacher 是單數，動詞要加 s：likes。Thomas 在動詞後面當受詞，代名詞要用受格 him，不是 he。老師只框了 he，但 like 也要改。",
    "reviewAdvice": "兩個檢查：1. every + 單數名詞，動詞加 s。2. 動詞後面的代名詞用 him / her / them。",
    "questionType": "rewrite",
    "importedAt": "2026-11-28T09:00:00.000Z"
  },
  {
    "id": "2026-11-24_1l7vlu",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 單字測驗（11/24，40/50）",
    "section": "A-1. Complete the sentences with the words from the box（20%）",
    "questionText": "___ is red and warm. It moves through my body to keep me alive.",
    "studentAnswer": "推測原本寫小寫 blood（老師在 B 上畫紅圈並寫 first letter，已訂正為 Blood）",
    "correctAnswer": "Blood",
    "errorCategory": "capitalization",
    "rawErrorType": "句首第一個字母要大寫",
    "skills": [
      "M.CAP.letter_case"
    ],
    "teacherExplanation": "這個空格在句子的第一個字，所以 blood 的第一個字母要大寫：Blood。老師寫的 first letter 就是這個意思。（原答案是否為小寫是依老師的註記推測。）",
    "reviewAdvice": "寫完一句話，先檢查「第一個字有沒有大寫」。單字框裡的字都是小寫，放在句首時要自己改成大寫。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-28T10:00:00.000Z"
  },
  {
    "id": "2026-11-24_ol6637",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 單字測驗（11/24，40/50）",
    "section": "A-1. Complete the sentences with the words from the box（20%）",
    "questionText": "Your heart ___ faster when you run and slower when you rest.",
    "studentAnswer": "推測原本寫 beat（紅圈圈在 s 上，已訂正為 beats）",
    "correctAnswer": "beats",
    "errorCategory": "verb_tense",
    "rawErrorType": "現在簡單式：第三人稱單數動詞加 -s",
    "skills": [
      "G.SVA.third_person_s"
    ],
    "teacherExplanation": "Your heart 是單數主詞（it），描述一般事實用現在簡單式，動詞要加 s：beats。（少了 s 是依紅圈位置推測。）",
    "reviewAdvice": "單字測驗裡的動詞也要看主詞：heart = it，所以 beats。造一句：My heart beats faster when I run.",
    "questionType": "fill_blank",
    "importedAt": "2026-11-28T10:00:00.000Z"
  },
  {
    "id": "2026-11-24_1t2a7mp",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 單字測驗（11/24，40/50）",
    "section": "A-2. Choose the best answer to complete the sentence（20%）",
    "questionText": "The sky ___ dark at night, and then the stars come out.",
    "options": [
      "(a) health",
      "(b) portion",
      "(c) becomes"
    ],
    "studentAnswer": "未知（原答案看不到，紅圈處已訂正為 (c) becomes）",
    "correctAnswer": "(c) becomes",
    "errorCategory": "content_comprehension",
    "rawErrorType": "詞性位置：空格要放動詞（become）",
    "skills": [
      "V.POS_SLOT"
    ],
    "teacherExplanation": "空格在主詞 The sky 後面，需要動詞；health 和 portion 都是名詞，放不進去。becomes 是「變成」，become + 形容詞：becomes dark。",
    "reviewAdvice": "填空前先判斷空格要放哪一種詞：主詞後面通常是動詞。造一句：The sky becomes dark at night.",
    "questionType": "multiple_choice",
    "importedAt": "2026-11-28T10:00:00.000Z"
  },
  {
    "id": "2026-11-24_1vu6eer",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 單字測驗（11/24，40/50）",
    "section": "B. Choose the correct idioms or phrases（10%，Capitalize where necessary）",
    "questionText": "Kenny ___ the weather for the trip tomorrow. He hopes it will be sunny and warm.",
    "options": [
      "is angry with",
      "is anxious about",
      "is anxious to",
      "is covered with",
      "At first"
    ],
    "studentAnswer": "is covered with（家長讀紙上原跡；藍筆已訂正為 is anxious about，與 Q4 對調）",
    "correctAnswer": "is anxious about",
    "errorCategory": "content_comprehension",
    "rawErrorType": "兩個片語對調：沒有依句意與主詞配對（Q2 ⇄ Q4）",
    "skills": [
      "V.PHRASE"
    ],
    "teacherExplanation": "be anxious about + 名詞（the weather）＝為某事擔心；be anxious to + 動詞＝渴望做某事。這句 Kenny 擔心天氣，所以用 is anxious about。她原本寫成 is covered with，變成「Kenny 被天氣覆蓋」，意思不通。",
    "reviewAdvice": "一起記一組對照：about 後面接事情（擔心），to 後面接動作（渴望）。Sherry is anxious to see the movie. / Kenny is anxious about the weather.",
    "questionType": "fill_blank",
    "importedAt": "2026-11-28T10:00:00.000Z"
  },
  {
    "id": "2026-11-24_4gccqi",
    "examDate": "2026-11-24",
    "examName": "L7 Week 13 單字測驗（11/24，40/50）",
    "section": "B. Choose the correct idioms or phrases（10%，Capitalize where necessary）",
    "questionText": "Jim's shirt ___ paint, but he doesn't mind. His mom will wash it for him.",
    "options": [
      "is angry with",
      "is anxious about",
      "is anxious to",
      "is covered with",
      "At first"
    ],
    "studentAnswer": "is anxious about（家長讀紙上原跡，部分字跡不清；藍筆已訂正為 is covered with，與 Q2 對調）",
    "correctAnswer": "is covered with",
    "errorCategory": "content_comprehension",
    "rawErrorType": "兩個片語對調：東西（襯衫）不會「擔心」，要依主詞與句意配對（Q2 ⇄ Q4）",
    "skills": [
      "V.PHRASE"
    ],
    "teacherExplanation": "be covered with 是「被…覆蓋」，襯衫沾滿油漆就是 is covered with paint。她原本寫成 is anxious about，變成「襯衫擔心油漆」，但衣服是東西，不會擔心。",
    "reviewAdvice": "把 be covered with 和東西一起記：The table is covered with paper. 看到「被某物蓋滿」就想到它。",
    "questionType": "fill_blank",
    "importedAt": "2026-11-28T10:00:00.000Z"
  }
];

export default data;
