import { GrammarQuestion, GrammarCategory } from '../../types';

export const PREPOSITION_PLACE_QUESTIONS: GrammarQuestion[] = [
  // ---------- At：特定地點、一個「點」 ----------
  {
    id: "prep_place_7",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Let's meet ___ the bus stop after class.",
    options: ["At", "In", "On"],
    correctAnswer: "At",
    ruleReminder: "在某個「地點」碰面用 At (例: at the bus stop, at the gate)。"
  },
  {
    id: "prep_place_8",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Mom, I'm ___ the front door. Please open it!",
    options: ["On", "At", "Under"],
    correctAnswer: "At",
    ruleReminder: "站在門口用 At (例: at the door, at the front door)。"
  },
  {
    id: "prep_place_9",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My sister is ___ home today because she is sick.",
    options: ["In", "On", "At"],
    correctAnswer: "At",
    ruleReminder: "在家要說 at home，home 前面不加 the (例: stay at home)。"
  },
  {
    id: "prep_place_10",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Dad is ___ work now. He will come home at six.",
    options: ["At", "On", "In"],
    correctAnswer: "At",
    ruleReminder: "在上班、在工作的地方用 At (例: at work, at school)。"
  },
  {
    id: "prep_place_11",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My dad is ___ the doctor's. He has a bad cold.",
    options: ["In", "At", "On"],
    correctAnswer: "At",
    ruleReminder: "在醫生那裡(診所)用 At (例: at the doctor's, at the dentist's)。"
  },
  {
    id: "prep_place_12",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The supermarket is ___ the end of the street.",
    options: ["On", "Under", "At"],
    correctAnswer: "At",
    ruleReminder: "在某條路的盡頭用 At (例: at the end of the street)。"
  },
  {
    id: "prep_place_13",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My uncle works ___ the airport. He helps people find their planes.",
    options: ["At", "Under", "On"],
    correctAnswer: "At",
    ruleReminder: "在機場、車站這類地點工作用 At (例: work at the airport)。"
  },
  {
    id: "prep_place_14",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Let's meet ___ the train station at nine o'clock.",
    options: ["Under", "At", "On"],
    correctAnswer: "At",
    ruleReminder: "約在車站碰面用 At (例: at the train station, at the bus stop)。"
  },
  {
    id: "prep_place_15",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "I like to sit ___ the window and look outside.",
    options: ["On", "Under", "At"],
    correctAnswer: "At",
    ruleReminder: "坐在窗邊用 At (例: sit at the window, at the table)。"
  },
  {
    id: "prep_place_16",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Write your name ___ the top of the page.",
    options: ["At", "In", "Under"],
    correctAnswer: "At",
    ruleReminder: "在最上面、最下面用 At (例: at the top, at the bottom)。"
  },

  // ---------- On：在表面上、交通工具上 ----------
  {
    id: "prep_place_17",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "There are many pictures ___ the wall.",
    options: ["On", "At", "In"],
    correctAnswer: "On",
    ruleReminder: "貼在、掛在牆面上用 On (例: on the wall)。"
  },
  {
    id: "prep_place_18",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Help! There is a spider ___ the floor!",
    options: ["At", "On", "In"],
    correctAnswer: "On",
    ruleReminder: "在地板表面上用 On (例: on the floor, on the ground)。"
  },
  {
    id: "prep_place_19",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "We read a storybook ___ the train to Tainan.",
    options: ["Under", "At", "On"],
    correctAnswer: "On",
    ruleReminder: "搭火車、公車時說 On (例: on the train, on the bus)。"
  },
  {
    id: "prep_place_20",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Look at the picture ___ page 12.",
    options: ["On", "In", "At"],
    correctAnswer: "On",
    ruleReminder: "在第幾頁用 On (例: on page 5)。"
  },
  {
    id: "prep_place_21",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My best friend lives ___ Rose Street.",
    options: ["Under", "On", "At"],
    correctAnswer: "On",
    ruleReminder: "住在某條街上用 On (例: on Rose Street, on Main Street)。"
  },
  {
    id: "prep_place_22",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My name is ___ the cover of my notebook.",
    options: ["At", "Under", "On"],
    correctAnswer: "On",
    ruleReminder: "寫在封面上、表面上用 On (例: on the cover)。"
  },
  {
    id: "prep_place_23",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "We sat ___ the grass and had a picnic.",
    options: ["On", "Under", "At"],
    correctAnswer: "On",
    ruleReminder: "坐在草地上用 On (例: sit on the grass, on the beach)。"
  },
  {
    id: "prep_place_24",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "I'm ___ the bus now. I'll be there soon.",
    options: ["At", "On", "Under"],
    correctAnswer: "On",
    ruleReminder: "在公車上用 On (例: on the bus, on the train, on a plane)。"
  },
  {
    id: "prep_place_25",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "There is a little boat ___ the lake.",
    options: ["Under", "At", "On"],
    correctAnswer: "On",
    ruleReminder: "浮在水面上用 On (例: a boat on the lake, on the river)。"
  },
  {
    id: "prep_place_26",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The shoe store is ___ the first floor of the mall.",
    options: ["On", "At", "Under"],
    correctAnswer: "On",
    ruleReminder: "在第幾樓用 On (例: on the first floor, on the 3rd floor)。"
  },
  {
    id: "prep_place_27",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Dad's car is parked ___ the street.",
    options: ["At", "On", "Under"],
    correctAnswer: "On",
    ruleReminder: "停在路上、街上用 On (例: on the street, on the road)。"
  },
  {
    id: "prep_place_28",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Hang your hat ___ the hook, please.",
    options: ["On", "In", "At"],
    correctAnswer: "On",
    ruleReminder: "掛在掛鉤上用 On (例: on the hook)。"
  },
  {
    id: "prep_place_29",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Don't move! There's a butterfly ___ your head!",
    options: ["In", "At", "On"],
    correctAnswer: "On",
    ruleReminder: "停在某物上面(接觸表面)用 On (例: on your head, on your nose)。"
  },

  // ---------- In：在裡面、城市、國家 ----------
  {
    id: "prep_place_30",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My clothes are ___ the closet.",
    options: ["In", "At", "On"],
    correctAnswer: "In",
    ruleReminder: "在衣櫃、櫃子裡面用 In (例: in the closet)。"
  },
  {
    id: "prep_place_31",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "It's ten o'clock at night. Tom is ___ bed now.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "躺在床上睡覺說 in bed，不加 the (例: go to bed, stay in bed)。"
  },
  {
    id: "prep_place_32",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My grandparents live ___ Taipei.",
    options: ["On", "At", "In"],
    correctAnswer: "In",
    ruleReminder: "在城市用 In (例: in Taipei, in Tokyo)。"
  },
  {
    id: "prep_place_33",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Kangaroos live ___ Australia.",
    options: ["In", "On", "At"],
    correctAnswer: "In",
    ruleReminder: "在國家、洲用 In (例: in Australia, in Taiwan, in Asia)。"
  },
  {
    id: "prep_place_34",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My pencils are ___ my pencil case.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "在盒子、袋子裡面用 In (例: in my pencil case, in my bag)。"
  },
  {
    id: "prep_place_35",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "There are many fish ___ the sea.",
    options: ["On", "At", "In"],
    correctAnswer: "In",
    ruleReminder: "在水裡面用 In (例: in the sea, in the river)。"
  },
  {
    id: "prep_place_36",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The goldfish are swimming ___ the fish tank.",
    options: ["In", "At", "On"],
    correctAnswer: "In",
    ruleReminder: "在魚缸、杯子這類容器裡面用 In (例: in the fish tank)。"
  },
  {
    id: "prep_place_37",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "There are five apples ___ the basket.",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "在籃子裡面用 In (例: in the basket, in the box)。"
  },
  {
    id: "prep_place_38",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The milk is ___ the fridge.",
    options: ["On", "At", "In"],
    correctAnswer: "In",
    ruleReminder: "在冰箱裡面用 In (例: in the fridge)。"
  },
  {
    id: "prep_place_39",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The students are reading ___ the classroom.",
    options: ["In", "On", "At"],
    correctAnswer: "In",
    ruleReminder: "在房間、教室裡面用 In (例: in the classroom, in the kitchen)。"
  },
  {
    id: "prep_place_40",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Do you have any money ___ your pocket?",
    options: ["At", "In", "On"],
    correctAnswer: "In",
    ruleReminder: "在口袋裡面用 In (例: in my pocket)。"
  },

  // ---------- Under / Behind / Between / Next to / Near / Above / Opposite ----------
  {
    id: "prep_place_41",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "I can't see the cat. It is hiding ___ the bed.",
    options: ["Under", "On", "Above"],
    correctAnswer: "Under",
    ruleReminder: "在某物的下面用 Under (例: under the bed, under the table)。"
  },
  {
    id: "prep_place_42",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The ball rolled ___ the table, so I got down on the floor to get it.",
    options: ["On", "Under", "Above"],
    correctAnswer: "Under",
    ruleReminder: "滾到某物下面用 Under (例: under the table, under the chair)。"
  },
  {
    id: "prep_place_43",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The lion is sleeping ___ the tree, out of the hot sun.",
    options: ["Above", "On", "Under"],
    correctAnswer: "Under",
    ruleReminder: "在樹下乘涼用 Under (例: under the tree)。"
  },
  {
    id: "prep_place_44",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Tim is tall and Amy is short. Amy is standing ___ Tim, so we can't see her.",
    options: ["Behind", "In front of", "Next to"],
    correctAnswer: "Behind",
    ruleReminder: "在某人或某物的後面用 Behind (例: behind Tim, behind the door)。"
  },
  {
    id: "prep_place_45",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My bike is ___ the tree, so you can't see it from the road.",
    options: ["Above", "Behind", "On"],
    correctAnswer: "Behind",
    ruleReminder: "被擋住、在後面用 Behind (例: behind the tree)。"
  },
  {
    id: "prep_place_46",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "In the photo, I am ___ Mom and Dad. Mom is on my left and Dad is on my right.",
    options: ["Behind", "Under", "Between"],
    correctAnswer: "Between",
    ruleReminder: "在兩者「中間」用 Between，常和 and 一起用 (例: between Mom and Dad)。"
  },
  {
    id: "prep_place_47",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The bank is ___ the post office and the bakery.",
    options: ["Between", "Under", "In"],
    correctAnswer: "Between",
    ruleReminder: "在 A 和 B 中間用 Between (例: between the post office and the bakery)。"
  },
  {
    id: "prep_place_48",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Please stand ___ the board so everyone can see you.",
    options: ["Behind", "Under", "In front of"],
    correctAnswer: "In front of",
    ruleReminder: "在某物的前面用 In front of (例: in front of the board)。"
  },
  {
    id: "prep_place_49",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "My house is ___ the school. It only takes two minutes to walk there.",
    options: ["Above", "Near", "Under"],
    correctAnswer: "Near",
    ruleReminder: "離某地很近用 Near (例: near the school, near my house)。"
  },
  {
    id: "prep_place_50",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The lamp is ___ the table. It hangs from the ceiling.",
    options: ["Above", "Under", "In"],
    correctAnswer: "Above",
    ruleReminder: "在某物的上方(沒有碰到)用 Above (例: above the table)。"
  },
  {
    id: "prep_place_51",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Look! There is a rainbow ___ the mountains.",
    options: ["Under", "In", "Above"],
    correctAnswer: "Above",
    ruleReminder: "高高在某物的上方用 Above (例: above the mountains, above the clouds)。"
  },
  {
    id: "prep_place_52",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Come and sit ___ me, so we can share this book.",
    options: ["Under", "Next to", "Behind"],
    correctAnswer: "Next to",
    ruleReminder: "在某人的旁邊用 Next to (例: sit next to me)。"
  },
  {
    id: "prep_place_53",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "Our school is ___ the hospital. The two buildings are side by side.",
    options: ["Above", "Under", "Next to"],
    correctAnswer: "Next to",
    ruleReminder: "緊靠在旁邊用 Next to (例: next to the hospital)。"
  },
  {
    id: "prep_place_54",
    category: GrammarCategory.PREPOSITION_PLACE,
    sentenceContext: "The library is ___ the park, on the other side of the street.",
    options: ["Opposite", "Under", "In"],
    correctAnswer: "Opposite",
    ruleReminder: "在馬路的對面用 Opposite (例: opposite the park)。"
  },
];
