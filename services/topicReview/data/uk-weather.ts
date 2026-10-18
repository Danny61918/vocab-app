import { ReviewChapter } from '../types';

// Source: Incredible English 4, Unit 1, Lesson 10 ("Learning through English:
// Geography" — UK weather vocabulary + a map showing different weather/temps
// across the UK, plus the "What's the weather like...?" / "What's the
// temperature?" question-answer pattern). The map's city labels (Manchester,
// Dublin, Edinburgh, Belfast, London, Cardiff) are a spoken substitution
// drill tied to the lesson's audio track, not fixed text on the page, so
// questions here only use facts printed directly on the page.
const chapter: ReviewChapter = {
  id: 'uk-weather',
  title: '英國天氣 (UK Weather)',
  sourceRef: 'Incredible English 4, Unit 1, Lesson 10',
  sourceText:
    "It's sunny. It's cloudy. It's windy. It's raining. It's snowing. It's foggy. It's stormy. " +
    "It's 10 degrees. It's minus 5. " +
    "What's the weather like in Cardiff? It's cloudy. What's the temperature? It's eight degrees.",
  glossary: [
    { term: 'sunny', icon: '☀️', zh: '晴天' },
    { term: 'cloudy', icon: '⛅', zh: '多雲' },
    { term: 'windy', icon: '💨', zh: '刮風' },
    { term: 'raining', icon: '🌧️', zh: '下雨' },
    { term: 'snowing', icon: '❄️', zh: '下雪' },
    { term: 'foggy', icon: '🌫️', zh: '起霧' },
    { term: 'stormy', icon: '⛈️', zh: '暴風雨' },
    { term: 'degrees', icon: '🌡️', zh: '溫度／度' },
  ],
  questions: [
    {
      id: 'uw-1',
      questionText: "A picture of the sun with rays means 'It's sunny.'",
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課本第一個圖示就是太陽配上文字 "It\'s sunny."，代表晴天。',
      sourceSentence: "It's sunny.",
      questionType: 'true_false',
      icon: '☀️',
    },
    {
      id: 'uw-2',
      questionText: "A cloud with a lightning bolt in it means 'It's foggy.'",
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: '雲加閃電是 "It\'s stormy."（暴風雨），不是 foggy。foggy 的圖示是寫著 "FOG" 的霧濛濛畫面，代表起霧、視線不清楚。',
      sourceSentence: "It's stormy. / FOG — It's foggy.",
      questionType: 'true_false',
      icon: '⛈️',
    },
    {
      id: 'uw-3',
      questionText: "A leaf blowing sideways in the wind shows the word '___.'",
      correctAnswer: 'windy',
      explanation: '樹葉被風吹得飄起來，配的文字就是 "It\'s windy."（刮風）。',
      sourceSentence: "It's windy.",
      questionType: 'fill_blank',
      icon: '💨',
    },
    {
      id: 'uw-4',
      questionText: "Which word describes thick grey mist where it's hard to see far away?",
      options: ['foggy', 'cloudy'],
      correctAnswer: 'foggy',
      explanation: 'foggy（起霧）指的是視線模糊、看不遠；cloudy（多雲）只是天空有雲，還是看得到遠方。',
      sourceSentence: 'FOG — It\'s foggy.',
      questionType: 'multiple_choice',
      icon: '🌫️',
    },
    {
      id: 'uw-5',
      questionText: "Tiny snowflakes falling from a cloud show the word '___.'",
      correctAnswer: 'snowing',
      explanation: '雲裡飄下雪花的圖示，配的文字是 "It\'s snowing."（下雪）。',
      sourceSentence: "It's snowing.",
      questionType: 'fill_blank',
      icon: '❄️',
    },
    {
      id: 'uw-6',
      questionText: "'+10°C' is written in words as 'It's 10 degrees.'",
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '課本溫度計圖示標著 +10°C，旁邊文字正是 "It\'s 10 degrees."',
      sourceSentence: "It's 10 degrees.",
      questionType: 'true_false',
      icon: '🌡️',
    },
    {
      id: 'uw-7',
      questionText: "'-5°C' is written in words as 'It's minus 5.'",
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '零下的溫度用 minus 來表示，-5°C 就是 "It\'s minus 5."',
      sourceSentence: "It's minus 5.",
      questionType: 'true_false',
      icon: '🥶🌡️',
    },
    {
      id: 'uw-8',
      questionText: "To ask what kind of weather it is (sunny, rainy, etc.), you ask: ___",
      options: ["What's the weather like?", "What's the temperature?"],
      correctAnswer: "What's the weather like?",
      explanation: '問天氣狀況（晴天/雨天等）要用 "What\'s the weather like?"，回答像 "It\'s cloudy."',
      sourceSentence: "What's the weather like in Cardiff? It's cloudy.",
      questionType: 'multiple_choice',
      icon: '⛅❓',
    },
    {
      id: 'uw-9',
      questionText: 'To ask for the number of degrees, you ask: ___',
      options: ["What's the weather like?", "What's the temperature?"],
      correctAnswer: "What's the temperature?",
      explanation: '問溫度幾度要用 "What\'s the temperature?"，回答像 "It\'s eight degrees."',
      sourceSentence: "What's the temperature? It's eight degrees.",
      questionType: 'multiple_choice',
      icon: '🌡️❓',
    },
    {
      id: 'uw-10',
      questionText: 'In the dialogue, the weather in Cardiff is ___.',
      correctAnswer: 'cloudy',
      explanation: '對話裡問 "What\'s the weather like in Cardiff?"，回答是 "It\'s cloudy."（多雲）。',
      sourceSentence: "What's the weather like in Cardiff? It's cloudy.",
      questionType: 'fill_blank',
      icon: '⛅',
    },
  ],
};

export default chapter;
