import { ReviewChapter } from '../types';

// Source: Incredible English 4, Unit 1, Lesson 9 ("The water cycle and the weather").
// Built because the mistake book shows evaporation/condensation direction
// confusion recurring across 3 separate exams (2026-10-02, 2026-10-06,
// 2026-10-13) — see services/mistakeBook. Q7/Q8 target that confusion
// directly: evaporation happens because the sun WARMS water; condensation
// happens because the air gets COOLER.
const chapter: ReviewChapter = {
  id: 'water-cycle',
  title: '水循環 (The Water Cycle)',
  sourceRef: 'Incredible English 4, Unit 1, Lesson 9',
  sourceText:
    "Rain comes from the water in the sea. First, the sun shines on the sea. It warms the water. " +
    "The water becomes water vapour. This process is called evaporation. The wind carries the water vapour up into the sky. " +
    "High in the sky the air is cooler. When the water vapour meets the cooler air, it becomes very small drops of water that form clouds. This process is called condensation. " +
    "The small drops of water join together and become rain drops. The raindrops are bigger and heavier than the clouds and fall to the ground. It's raining! " +
    "If it's very cold or high in the mountains, it snows. " +
    "The rain and snow falls into the rivers and the rivers carry the water back to the sea. And it starts all over again! This is the water cycle.",
  questions: [
    {
      id: 'wc-1',
      questionText: 'The sun shines on the sea and warms the water.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課文第一句就這樣寫：太陽照在海上，把海水曬熱，這是整個水循環的起點。',
      sourceSentence: 'First, the sun shines on the sea. It warms the water.',
      questionType: 'true_false',
    },
    {
      id: 'wc-2',
      questionText: 'When water becomes water vapour, this process is called condensation.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: '水變成水蒸氣叫做「蒸發 evaporation」，不是凝結。凝結 (condensation) 是相反方向：水蒸氣變回水滴。',
      sourceSentence: 'The water becomes water vapour. This process is called evaporation.',
      questionType: 'true_false',
    },
    {
      id: 'wc-3',
      questionText: 'The water becomes water vapour. This process is called ___.',
      correctAnswer: 'evaporation',
      explanation: '太陽把水曬熱、水變成水蒸氣往上飄，這個過程叫 evaporation（蒸發）。',
      sourceSentence: 'The water becomes water vapour. This process is called evaporation.',
      questionType: 'fill_blank',
    },
    {
      id: 'wc-4',
      questionText: 'High in the sky, the air is warmer than it is near the sea.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: '課文說高空的空氣「比較冷 (cooler)」，不是比較熱。水蒸氣飄到高空遇到冷空氣，才會開始變成水滴。',
      sourceSentence: 'High in the sky the air is cooler.',
      questionType: 'true_false',
    },
    {
      id: 'wc-5',
      questionText: 'When water vapour meets cooler air and becomes small drops of water, this is called condensation.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '水蒸氣遇到冷空氣，變成小水滴（也就是雲），這個過程叫 condensation（凝結）。',
      sourceSentence: 'When the water vapour meets the cooler air, it becomes very small drops of water that form clouds. This process is called condensation.',
      questionType: 'true_false',
    },
    {
      id: 'wc-6',
      questionText: 'When the water vapour meets the cooler air, it becomes very small drops of water that form clouds. This process is called ___.',
      correctAnswer: 'condensation',
      explanation: '水蒸氣變冷、變回水滴、形成雲，這個過程叫 condensation（凝結）。',
      sourceSentence: 'This process is called condensation.',
      questionType: 'fill_blank',
    },
    {
      id: 'wc-7',
      questionText: 'Which process happens because the air gets COOLER?',
      options: ['evaporation', 'condensation'],
      correctAnswer: 'condensation',
      explanation: '這題直接考方向：「變冷」觸發的是 condensation（凝結，水蒸氣變回水滴）。這是她最常搞反的地方，務必確認她能馬上答對。',
      sourceSentence: 'High in the sky the air is cooler. ... This process is called condensation.',
      questionType: 'multiple_choice',
    },
    {
      id: 'wc-8',
      questionText: 'Which process happens because the SUN WARMS the water?',
      options: ['evaporation', 'condensation'],
      correctAnswer: 'evaporation',
      explanation: '「變熱」觸發的是 evaporation（蒸發，水變成水蒸氣）。跟上一題放在一起比較，幫助她記住：熱 → 蒸發，冷 → 凝結。',
      sourceSentence: 'First, the sun shines on the sea. It warms the water. The water becomes water vapour. This process is called evaporation.',
      questionType: 'multiple_choice',
    },
    {
      id: 'wc-9',
      questionText: 'Raindrops are smaller and lighter than clouds.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: '課文說雨滴比雲「更大更重 (bigger and heavier)」，所以才會掉下來變成雨，不是更小更輕。',
      sourceSentence: 'The raindrops are bigger and heavier than the clouds and fall to the ground.',
      questionType: 'true_false',
    },
    {
      id: 'wc-10',
      questionText: "If it's very cold or high in the mountains, it snows instead of rains.",
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課文說天氣非常冷，或是在高山上，就會下雪而不是下雨。',
      sourceSentence: "If it's very cold or high in the mountains, it snows.",
      questionType: 'true_false',
    },
    {
      id: 'wc-11',
      questionText: 'The rivers carry the water back to the sea, and then the water cycle starts all over again.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '雨跟雪落下後流進河裡，河流把水帶回大海，整個循環又重新開始——這就是為什麼叫做「水循環 cycle」。',
      sourceSentence: 'The rain and snow falls into the rivers and the rivers carry the water back to the sea. And it starts all over again!',
      questionType: 'true_false',
    },
  ],
};

export default chapter;
