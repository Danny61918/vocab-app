import { ReviewChapter } from '../types';

// Source: not a single textbook passage — this chapter is built directly
// from services/mistakeBook, which shows the same handful of connector/time
// phrases from the L7 "Idioms" vocabulary unit recurring wrong across FOUR
// separate exams (2026-09-15, 2026-10-13 B-vocab item, 2026-10-20,
// 2026-10-22): according to (4x), after all (3x), as a result (2x+),
// above all, arrive(s/d) at, as well as, a long time ago, all of a sudden,
// and the at a time / all the time / at any time trio. All example
// sentences below are quoted verbatim from those real exam papers, not
// invented, so sourceText/sourceSentence stay traceable to the actual
// worksheets even though there's no single underlying passage.
const chapter: ReviewChapter = {
  id: 'confusable-connector-phrases',
  title: '易混淆片語整理 (Confusable Connector Phrases)',
  sourceRef: 'L7 Vocabulary — Idioms Lesson 1 (recurring across L7VOC-W03, Week 8 Voc. Homework, Week 8 Examination)',
  // One real exam sentence per line (not one flowing paragraph — these are
  // 12 unrelated sentences from different exams, so a merged paragraph just
  // reads as a wall of text with no story to follow). Grouped to match the
  // `notes` clusters below, with a blank line between groups.
  sourceText:
    "Alex loves eating junk food and hates having fruit and vegetables. As a result, he is overweight.\n" +
    "According to his doctor, he will be really sick if he doesn't change his eating habits.\n" +
    "I don't want to lend Amy any money. After all, she isn't my family or friend.\n" +
    "Gill is a very talented and nice girl. Above all, she helps stray animals when she is free.\n" +
    "\n" +
    "The first bus to Taichung arrives at 6:00 am.\n" +
    "Mike arrived at the airport too late because he forgot his passport.\n" +
    "\n" +
    "The alarm in the elevator rings when too many people are in it. It can only carry about 4-5 people at a time.\n" +
    "I think about my summer vacation all the time because I can't wait to go to Disneyland in Japan.\n" +
    "My teacher tells us that we can call her at any time if we have questions about our homework.\n" +
    "\n" +
    "The guard dog crawled slowly and quietly when the thief came into my yard. All of a sudden it began to bark loudly.\n" +
    "My grandpa and his best friend have known each other for thirty years. He told me how they met in Japan a long time ago.\n" +
    "My sister likes to wear my clothes without asking me again and again.\n" +
    "\n" +
    "On October 31st, my family will celebrate my birthday as well as Halloween.",
  glossary: [
    { term: 'according to', icon: '🗣️➡️', zh: '根據、按照（轉述別人的話）' },
    { term: 'agree with', icon: '👍', zh: '同意（某人的看法）' },
    { term: 'as a result', icon: '💥➡️📈', zh: '結果、因此（接在原因後面）' },
    { term: 'after all', icon: '🤷', zh: '畢竟、說到底（做總結的理由）' },
    { term: 'above all', icon: '⭐', zh: '最重要的是（列舉優點後強調重點）' },
    { term: 'as well as', icon: '➕', zh: '以及、還有（兩者並列）' },
    { term: 'arrive at / arrives at / arrived at', icon: '🛬', zh: '抵達（動詞要隨時態變化）' },
    { term: 'all of a sudden', icon: '⚡', zh: '突然間（毫無預警發生）' },
    { term: 'a long time ago', icon: '⏳', zh: '很久以前' },
    { term: 'again and again', icon: '🔁', zh: '一再、一次又一次' },
    { term: 'at a time', icon: '1️⃣', zh: '一次（一次的量）' },
    { term: 'all the time', icon: '🔄', zh: '總是、一直' },
    { term: 'at any time', icon: '🕐', zh: '隨時、任何時候' },
  ],
  notes: [
    {
      title: '📌 according to vs. agree with',
      body: '這兩個常常一起出現在同一句情境：一個是「轉述」別人說的話，一個是「表態」同意。',
      examples: [
        { text: 'According to my mom, I need to sleep early. （根據——轉述）', speak: 'According to my mom, I need to sleep early.' },
        { text: 'I agree with my mom. （同意——表態）', speak: 'I agree with my mom.' },
      ],
    },
    {
      title: '📌 above all vs. after all',
      body: '兩個字長得很像（都是 a... all），但方向不同：above all 放在列舉優點之後，強調「最重要的一項」；after all 放在理由之後，強調「最終、最根本的原因」。',
      examples: [
        { text: 'She is smart, kind, and funny. Above all, she is honest. （最重要的是）', speak: 'Above all, she is honest.' },
        { text: 'I trust him. After all, he is my best friend. （畢竟）', speak: 'After all, he is my best friend.' },
      ],
    },
    {
      title: '📌 as a result vs. according to',
      body: 'as a result 表示「結果」，前面通常是一個原因；according to 表示「根據」，後面通常接一個人或消息來源。',
      examples: [
        { text: 'He ate too much candy. As a result, he has a toothache. （結果）', speak: 'He ate too much candy. As a result, he has a toothache.' },
        { text: 'According to the weather report, it will rain. （根據）', speak: 'According to the weather report, it will rain.' },
      ],
    },
    {
      title: '📌 arrive at 的動詞變化',
      body: 'arrive at 表示「抵達」一個具體地點，動詞要隨主詞和時態變化：現在式單數主詞加 s（arrives at）、過去式用 arrived at。',
      examples: [
        { text: 'The bus arrives at 7am. （現在式，單數主詞 + s）', speak: 'The bus arrives at 7am.' },
        { text: 'Mike arrived at the airport too late. （過去式）', speak: 'Mike arrived at the airport too late.' },
      ],
    },
    {
      title: '📌 at a time / all the time / at any time',
      body: '三個都有 time，但意思完全不同：at a time 指「一次的量」，all the time 指「總是、一直」，at any time 指「任何時候、隨時」。',
      examples: [
        { text: 'I can carry two bags at a time. （一次）', speak: 'I can carry two bags at a time.' },
        { text: 'She smiles all the time. （總是）', speak: 'She smiles all the time.' },
        { text: 'Call me at any time. （隨時）', speak: 'Call me at any time.' },
      ],
    },
    {
      title: '📌 all of a sudden / a long time ago / again and again',
      body: '三個都是時間相關的片語，但方向不同：all of a sudden 是「突然」發生，a long time ago 是「很久以前」，again and again 是「一再、反覆」發生。',
      examples: [
        { text: 'All of a sudden, the dog began to bark. （突然間）', speak: 'All of a sudden, the dog began to bark.' },
        { text: 'A long time ago, there were no cars. （很久以前）', speak: 'A long time ago, there were no cars.' },
        { text: 'He asked the same question again and again. （一再）', speak: 'He asked the same question again and again.' },
      ],
    },
  ],
  questions: [
    {
      id: 'ccp-1',
      questionText: "Alex loves eating junk food and hates having fruit and vegetables. ___, he is overweight.",
      options: ['As a result', 'According to', 'After all'],
      correctAnswer: 'As a result',
      explanation: '前面是原因（愛吃垃圾食物、不吃蔬果），後面是結果（變超重），中間要用 As a result（結果/因此）。這題她在 10/20 和 10/22 的考卷都考過，都錯，是目前累計錯最多次的片語之一。',
      sourceSentence: "Alex loves eating junk food and hates having fruit and vegetables. ___, he is overweight.",
      questionType: 'multiple_choice',
      icon: '💥➡️📈',
    },
    {
      id: 'ccp-2',
      questionText: "I don't want to lend Amy any money. ___, she isn't my family or friend.",
      options: ['As a result', 'After all'],
      correctAnswer: 'After all',
      explanation: '這句是在做「結論」——畢竟她不是家人或朋友，所以不想借錢，要用 After all（畢竟）。As a result 是用在「原因 → 結果」的句子，這裡沒有先講一個原因，不適合。',
      sourceSentence: "I don't want to lend Amy any money. ___, she isn't my family or friend.",
      questionType: 'multiple_choice',
      icon: '🤷',
    },
    {
      id: 'ccp-3',
      questionText: '___ the weather report, it is going to keep raining all week.',
      options: ['According to', 'As a result', 'Agree with'],
      correctAnswer: 'According to',
      explanation: '空格後面接的是一個消息來源（天氣預報），要用 According to（根據）。這個片語是目前錯題本裡出現次數最多的（4 次），務必確認她能馬上答對。',
      sourceSentence: '___ the weather report, it is going to keep raining all week. I hope it’s wrong.',
      questionType: 'multiple_choice',
      icon: '🗣️➡️',
    },
    {
      id: 'ccp-4',
      questionText: "In the sentence 'My parents agree with her,' agree with means 根據/按照 (according to).",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'agree with 是「同意」某人，不是「根據」。根據/轉述要用 according to，同意表態要用 agree with，這兩個常常一起出現、也常常被搞混。',
      sourceSentence: 'My parents agree with her and they want me to go to the same class with Annie.',
      questionType: 'true_false',
      icon: '👍',
    },
    {
      id: 'ccp-5',
      questionText: 'She can paint, cook, and dance well. ___, she helps stray animals when she is free.',
      options: ['Above all', 'After all'],
      correctAnswer: 'Above all',
      explanation: '這句先列出一堆優點，最後用 Above all 強調「最重要的是」哪一項。After all 不會用在「列舉優點」後面，它是用在「講完理由做總結」的時候。',
      sourceSentence: 'Gill is a very talented and nice girl. She can paint and cook well, play the violin and dance ballet. ___, she helps stray animals when she is free.',
      questionType: 'multiple_choice',
      icon: '⭐',
    },
    {
      id: 'ccp-6',
      questionText: 'Mike ___ (arrive at) the airport too late because he forgot his passport.',
      options: ['arrived at', 'arrives at', 'arrive at'],
      correctAnswer: 'arrived at',
      explanation: '要抵達一個地點（機場），主詞 Mike 配合整句的過去式（forgot, had to go back home），動詞要用過去式 arrived at，不是現在式 arrives at。',
      sourceSentence: 'Mike ___ the airport too late because he forgot his passport and had to go back home.',
      questionType: 'multiple_choice',
      icon: '🛬',
    },
    {
      id: 'ccp-7',
      questionText: "'The first bus arrives at 6:00 am' is correct because the subject 'bus' is singular, so the verb needs an -s.",
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'bus 是單數第三人稱，動詞要加 s，所以是 arrives at，不是 arrive at。',
      sourceSentence: 'The first bus to Taichung arrives at 6:00 am.',
      questionType: 'true_false',
      icon: '🚌',
    },
    {
      id: 'ccp-8',
      questionText: 'The alarm in the elevator rings when too many people are in it. It can only carry about 4-5 people ___.',
      options: ['at a time', 'all the time', 'at any time'],
      correctAnswer: 'at a time',
      explanation: '這裡是說電梯每「一次」最多能載 4-5 人，要用 at a time（一次的量）。all the time 是「總是」，at any time 是「任何時候」，意思都不對。',
      sourceSentence: 'The alarm in the elevator rings when too many people are in it. It can only carry about 4-5 people ___.',
      questionType: 'multiple_choice',
      icon: '1️⃣',
    },
    {
      id: 'ccp-9',
      questionText: 'My teacher tells us that we can call her ___ if we have questions about our homework.',
      options: ['at any time', 'at a time', 'all the time'],
      correctAnswer: 'at any time',
      explanation: '這裡是說「任何時候」都可以打電話問問題，要用 at any time（隨時）。',
      sourceSentence: 'My teacher tells us that we can call her ___ if we have questions about our homework.',
      questionType: 'multiple_choice',
      icon: '🕐',
    },
    {
      id: 'ccp-10',
      questionText: "'I think about my summer vacation all the time' means she only thinks about it once.",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'all the time 是「總是、一直」，表示她常常、持續在想，不是只想過一次。',
      sourceSentence: "I think about my summer vacation all the time because I can't wait to go to Disneyland in Japan.",
      questionType: 'true_false',
      icon: '🔄',
    },
    {
      id: 'ccp-11',
      questionText: 'The guard dog crawled slowly and quietly when the thief came into my yard. ___ it began to bark loudly.',
      options: ['All of a sudden', 'A long time ago', 'Again and again'],
      correctAnswer: 'All of a sudden',
      explanation: '狗原本很安靜，然後「突然」大叫，要用 All of a sudden（突然間）。這個片語在 10/20 和 10/22 的考卷都考過、都錯。',
      sourceSentence: 'The guard dog crawled slowly and quietly when the thief came into my yard. ___ it began to bark loudly.',
      questionType: 'multiple_choice',
      icon: '⚡',
    },
    {
      id: 'ccp-12',
      questionText: 'He told me how they met in Japan ___.',
      options: ['a long time ago', 'all of a sudden', 'again and again'],
      correctAnswer: 'a long time ago',
      explanation: '這句在說很久以前發生的事，要用 a long time ago（很久以前）。',
      sourceSentence: 'My grandpa and his best friend, Mr. Yamasaki, have known each other for thirty years. He told me how they met in Japan ___.',
      questionType: 'multiple_choice',
      icon: '⏳',
    },
    {
      id: 'ccp-13',
      questionText: "'My sister likes to wear my clothes without asking me again and again' means it happened only one time.",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'again and again 是「一次又一次、反覆」發生，代表這件事發生很多次，不是只有一次。',
      sourceSentence: 'My sister likes to wear my clothes without asking me ___. It happened last week again and I got very angry.',
      questionType: 'true_false',
      icon: '🔁',
    },
    {
      id: 'ccp-14',
      questionText: "We'll go hiking for a long time, so we need to bring water ___ snacks for the field trip.",
      options: ['as well as', 'according to', 'all of a sudden'],
      correctAnswer: 'as well as',
      explanation: '要帶水「以及」點心，兩者並列，要用 as well as。這個字跟 both...and... 意思相通，這題她在 10/20 和 10/22 都考過、都錯。',
      sourceSentence: "We'll go hiking for a long time, so we need to bring water ___ snacks for the field trip.",
      questionType: 'multiple_choice',
      icon: '➕',
    },
    {
      id: 'ccp-15',
      questionText: 'On October 31st, my family will celebrate my birthday ___ Halloween.',
      options: ['as well as', 'according to', 'above all'],
      correctAnswer: 'as well as',
      explanation: '同一天慶祝生日「以及」萬聖節，兩者並列，要用 as well as。',
      sourceSentence: 'On October 31st, my family will celebrate my birthday ___ Halloween. We have both a birthday and a Halloween party on this day.',
      questionType: 'multiple_choice',
      icon: '➕',
    },
    {
      id: 'ccp-16',
      questionText: 'Which word means 根據/轉述某人說的話？',
      options: ['According to', 'Agree with', 'After all'],
      correctAnswer: 'According to',
      explanation: 'According to 是「根據/轉述」，Agree with 是「同意」，After all 是「畢竟」。這題直接考三個最常搞混的字放在一起，務必確認她能馬上分辨，不用想太久。',
      sourceSentence: 'According to his doctor, he will be really sick if he doesn’t change his eating habits.',
      questionType: 'multiple_choice',
      icon: '🗣️➡️',
    },
  ],
};

export default chapter;
