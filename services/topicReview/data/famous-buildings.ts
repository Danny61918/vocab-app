import { ReviewChapter } from '../types';

// Source: Incredible English 4, Unit 2, Lessons 9-10 ("Learning through
// English: Art" — "Draw with a grid"). The lesson's actual grid-drawing
// activity isn't practice-able as a quiz, so these questions drill the
// factual content built around it instead: five famous buildings (name,
// city/country, year(s) built, height), plus the "Be careful!" box on
// reading large numbers as dates (e.g. 1975 = "nineteen seventy-five", not
// "one thousand, nine hundred and seventy-five").
const chapter: ReviewChapter = {
  id: 'famous-buildings',
  title: '世界知名建築 (Famous Buildings)',
  sourceRef: 'Incredible English 4, Unit 2, Lessons 9-10',
  sourceText:
    'The Sapphire Building, Istanbul, Turkey. Built in 2010. 216 m high. ' +
    'Leaning tower of Pisa, Italy. Built 1173-1350. It is 55 m high. ' +
    'Big Ben, London, England. Built in 1858. It is 98 m high. ' +
    'The Palace of Science and Culture, Warsaw, Poland. Built 1953-1955. It is 230 m high. ' +
    'The Eiffel Tower, Paris, France. Built in 1889. It is 329 m high. ' +
    'Be careful! We say dates and numbers differently: 1,975 = one thousand, nine hundred and seventy-five. ' +
    '1975 = nineteen seventy-five. Here are some more dates: 1173 = eleven seventy-three. 2019 = twenty nineteen. ' +
    "Tell me about this tower. It's 216 metres high. It was built in 2010. It's in Turkey. It's the Sapphire Building.",
  // Photos are real freely-licensed landmark photos from Wikimedia Commons
  // (not the textbook's own photos — those we can't reproduce), downloaded
  // into public/images/clil/famous-buildings/. Credits per Commons license terms.
  //
  // This chapter is a fact list (5 unrelated buildings), not a narrative like
  // water-cycle, so it's rendered as one card per building (photo + key facts)
  // instead of glossary+paragraph — a paragraph with no story line to follow
  // just reads as a wall of disconnected facts.
  factCards: [
    {
      title: 'The Sapphire Building',
      zh: '藍寶石大樓',
      image: 'images/clil/famous-buildings/istanbul-sapphire.jpg',
      imageCredit: 'Artemco, CC BY-SA 4.0, via Wikimedia Commons',
      facts: [
        { label: '國家 Country', value: 'Turkey 土耳其（伊斯坦堡 Istanbul）' },
        { label: '建造年份 Built', value: '2010' },
        { label: '高度 Height', value: '216 m' },
      ],
    },
    {
      title: 'Leaning Tower of Pisa',
      zh: '比薩斜塔',
      image: 'images/clil/famous-buildings/leaning-tower-pisa.jpg',
      imageCredit: 'Arne Müseler / www.arne-mueseler.com, CC BY-SA 3.0 de, via Wikimedia Commons',
      facts: [
        { label: '國家 Country', value: 'Italy 義大利' },
        { label: '建造年份 Built', value: '1173-1350' },
        { label: '高度 Height', value: '55 m' },
      ],
    },
    {
      title: 'Big Ben',
      zh: '大笨鐘',
      image: 'images/clil/famous-buildings/big-ben.jpg',
      imageCredit: 'Christian David, CC BY-SA 4.0, via Wikimedia Commons',
      facts: [
        { label: '國家 Country', value: 'England 英國（倫敦 London）' },
        { label: '建造年份 Built', value: '1858' },
        { label: '高度 Height', value: '98 m' },
      ],
    },
    {
      title: 'The Palace of Science and Culture',
      zh: '科學文化宮',
      image: 'images/clil/famous-buildings/palace-of-culture-science.jpg',
      imageCredit: 'Maciurella, CC BY-SA 4.0, via Wikimedia Commons',
      facts: [
        { label: '國家 Country', value: 'Poland 波蘭（華沙 Warsaw）' },
        { label: '建造年份 Built', value: '1953-1955' },
        { label: '高度 Height', value: '230 m' },
      ],
    },
    {
      title: 'The Eiffel Tower',
      zh: '艾菲爾鐵塔',
      image: 'images/clil/famous-buildings/eiffel-tower.jpg',
      imageCredit: 'Benh Lieu Song, public domain, via Wikimedia Commons',
      facts: [
        { label: '國家 Country', value: 'France 法國（巴黎 Paris）' },
        { label: '建造年份 Built', value: '1889' },
        { label: '高度 Height', value: '329 m' },
      ],
    },
  ],
  notes: [
    {
      title: '📌 唸年份的小技巧（Be careful with dates!）',
      body:
        '年份通常拆成兩組兩位數字唸，不是當成一般大數字整個唸出來：\n' +
        '1975 → "nineteen seventy-five"（不是 one thousand, nine hundred and seventy-five）\n' +
        '1173 → "eleven seventy-three"\n' +
        '2019 → "twenty nineteen"',
    },
  ],
  questions: [
    {
      id: 'fb-1',
      questionText: 'The Sapphire Building is in Istanbul, Turkey.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課本寫著 "The Sapphire Building, Istanbul, Turkey."，就在土耳其的伊斯坦堡。',
      sourceSentence: 'The Sapphire Building, Istanbul, Turkey. Built in 2010. 216 m high.',
      questionType: 'true_false',
      image: 'images/clil/famous-buildings/istanbul-sapphire.jpg',
      imageCredit: 'Artemco, CC BY-SA 4.0, via Wikimedia Commons',
    },
    {
      id: 'fb-2',
      questionText: 'The Leaning Tower of Pisa was built in 2010.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: '比薩斜塔是 1173 到 1350 年蓋的，蓋了超過一百年！2010 年蓋好的其實是 The Sapphire Building。',
      sourceSentence: 'Leaning tower of Pisa, Italy. Built 1173-1350. It is 55 m high.',
      questionType: 'true_false',
      image: 'images/clil/famous-buildings/leaning-tower-pisa.jpg',
      imageCredit: 'Arne Müseler / www.arne-mueseler.com, CC BY-SA 3.0 de, via Wikimedia Commons',
    },
    {
      id: 'fb-3',
      questionText: 'How high is the Eiffel Tower?',
      options: ['329 m', '230 m'],
      correctAnswer: '329 m',
      explanation: '課本寫 "The Eiffel Tower, Paris, France. ... It is 329 m high."，230 m 是波蘭那座科學文化宮的高度。',
      sourceSentence: 'The Eiffel Tower, Paris, France. Built in 1889. It is 329 m high.',
      questionType: 'multiple_choice',
      image: 'images/clil/famous-buildings/eiffel-tower.jpg',
      imageCredit: 'Benh Lieu Song, public domain, via Wikimedia Commons',
    },
    {
      id: 'fb-4',
      questionText: 'The Eiffel Tower is in the city of ___.',
      correctAnswer: 'Paris',
      explanation: '艾菲爾鐵塔在法國巴黎（Paris）。',
      sourceSentence: 'The Eiffel Tower, Paris, France.',
      questionType: 'fill_blank',
      image: 'images/clil/famous-buildings/eiffel-tower.jpg',
      imageCredit: 'Benh Lieu Song, public domain, via Wikimedia Commons',
    },
    {
      id: 'fb-5',
      questionText: 'Big Ben is 98 metres high.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課本寫 "Big Ben, London, England. Built in 1858. It is 98 m high."',
      sourceSentence: 'Big Ben, London, England. Built in 1858. It is 98 m high.',
      questionType: 'true_false',
      image: 'images/clil/famous-buildings/big-ben.jpg',
      imageCredit: 'Christian David, CC BY-SA 4.0, via Wikimedia Commons',
    },
    {
      id: 'fb-6',
      questionText: 'Which country is the Leaning Tower of Pisa in?',
      options: ['Italy', 'Poland'],
      correctAnswer: 'Italy',
      explanation: '比薩斜塔在義大利（Italy）；Poland（波蘭）是科學文化宮所在的國家。',
      sourceSentence: 'Leaning tower of Pisa, Italy.',
      questionType: 'multiple_choice',
      image: 'images/clil/famous-buildings/leaning-tower-pisa.jpg',
      imageCredit: 'Arne Müseler / www.arne-mueseler.com, CC BY-SA 3.0 de, via Wikimedia Commons',
    },
    {
      id: 'fb-7',
      questionText: 'The Palace of Science and Culture is in ___ (the country).',
      correctAnswer: 'Poland',
      explanation: '科學文化宮在波蘭（Poland）的華沙（Warsaw）。',
      sourceSentence: 'The Palace of Science and Culture, Warsaw, Poland.',
      questionType: 'fill_blank',
      image: 'images/clil/famous-buildings/palace-of-culture-science.jpg',
      imageCredit: 'Maciurella, CC BY-SA 4.0, via Wikimedia Commons',
    },
    {
      id: 'fb-8',
      questionText: 'The Palace of Science and Culture was built between 1953 and 1955.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課本寫 "Built 1953-1955."，就是 1953 年到 1955 年之間蓋的。',
      sourceSentence: 'The Palace of Science and Culture, Warsaw, Poland. Built 1953-1955.',
      questionType: 'true_false',
      image: 'images/clil/famous-buildings/palace-of-culture-science.jpg',
      imageCredit: 'Maciurella, CC BY-SA 4.0, via Wikimedia Commons',
    },
    {
      id: 'fb-9',
      questionText: 'How do we SAY the date 1975 out loud (not as a big number)?',
      options: ['nineteen seventy-five', 'one thousand, nine hundred and seventy-five'],
      correctAnswer: 'nineteen seventy-five',
      explanation: '年份通常念成兩組兩位數，1975 唸成 "nineteen seventy-five"；"one thousand, nine hundred and seventy-five" 是唸一般大數字 1,975 的方式，不是年份。',
      sourceSentence: '1,975 = one thousand, nine hundred and seventy-five. 1975 = nineteen seventy-five.',
      questionType: 'multiple_choice',
      icon: '🔢',
    },
    {
      id: 'fb-10',
      questionText: 'How do we say the date 2019?',
      options: ['twenty nineteen', 'two thousand and nineteen'],
      correctAnswer: 'twenty nineteen',
      explanation: '課本直接舉例 "2019 = twenty nineteen"，念年份時習慣拆成兩組數字唸。',
      sourceSentence: '2019 = twenty nineteen.',
      questionType: 'multiple_choice',
      icon: '🔢',
    },
    {
      id: 'fb-11',
      questionText: 'In the example conversation, which building is 216 metres high, built in 2010, and in Turkey?',
      options: ['The Sapphire Building', 'Big Ben'],
      correctAnswer: 'The Sapphire Building',
      explanation: '對話例句："It\'s 216 metres high. It was built in 2010. It\'s in Turkey. It\'s the Sapphire Building."',
      sourceSentence: "It's 216 metres high. It was built in 2010. It's in Turkey. It's the Sapphire Building.",
      questionType: 'multiple_choice',
      image: 'images/clil/famous-buildings/istanbul-sapphire.jpg',
      imageCredit: 'Artemco, CC BY-SA 4.0, via Wikimedia Commons',
    },
  ],
};

export default chapter;
