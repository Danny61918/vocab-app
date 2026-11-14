import { ChapterLesson } from '../types';

// Teaching lesson for the Unit 3 textbook, Lessons 9–10 (p24–p25, "Pulse rates").
// Shown BEFORE the practice chapters u3-pulse-how and u3-pulse-bpm; ungraded.
// Textbook sentences in `lines` are copied exactly from the page (see .doc/v2.0/phase-10-clil-unit3/RESEARCH.md, section 1);
// the few extra lines are short helper sentences. Design notes and every fact added beyond the pages:
// .doc/v2.0/phase-10-clil-unit3/TEACHING.md
const lesson: ChapterLesson = {
  title: "脈搏小教室：先看懂，再練習",
  intro:
    "跟著 8 個小步驟，你會知道心臟和脈搏是什麼、怎麼量自己的脈搏，還能看懂課本 p24、p25 的表格和數字。一次一小步，慢慢來就好！",
  steps: [
    // ---- 1 ----
    {
      id: "heart-blood",
      title: "心臟和血液",
      zh:
        "你的身體裡有一個很認真的小幫手：心臟（heart）。它在胸口，大約跟你的拳頭一樣大。\n" +
        "心臟像按壓式洗手乳的瓶子：按一下，洗手乳就被推出來。心臟一縮一放，每一下就把血液（blood）推出去。\n" +
        "血液就這樣被送到全身，從頭頂一直到腳趾頭。\n" +
        "課本圖上紅紅的那一顆就是心臟，身上一條一條的紅線和藍線，是血液走的路。",
      lines: [
        { en: "Your heart pumps blood around your body.", zh: "你的心臟把血液送到全身各處。" },
        { en: "My heart is a pump.", zh: "我的心臟就像一個幫浦（會一直把東西推出去的機器）。" },
      ],
      words: [
        { term: "heart", zh: "心臟", icon: "❤️" },
        { term: "blood", zh: "血液", icon: "🩸", tip: "oo 在這裡唸短短的「ㄚ」，跟 food 的 oo 不一樣。" },
        { term: "pump", zh: "幫浦；把東西推送出去", icon: "🧴", tip: "Your heart pumps…：your heart 是「它」（一個東西），所以 pump 要加 s：it pumps。" },
        { term: "around your body", zh: "在全身各處", icon: "🧍" },
      ],
    },

    // ---- 2 ----
    {
      id: "beats-per-minute",
      title: "心臟一分鐘跳幾下？",
      zh:
        "心臟每把血推出去一次，就是「跳一下」，英文叫 a beat。\n" +
        "課本說：心臟通常每分鐘跳大約 70 下。差不多是一秒鐘跳一下，再多一點點。\n" +
        "about 是「大約」，不是剛好 70。小朋友的心臟常常跳得比 70 快一點，這樣也沒關係。\n" +
        "「每分鐘跳幾下」英文叫 beats per minute，簡寫成 BPM。per 就是「每」。",
      lines: [
        { en: "Your heart usually beats about 70 times per minute.", zh: "你的心臟通常每分鐘跳大約 70 下。" },
        { en: "BPM means beats per minute.", zh: "BPM 的意思是「每分鐘跳幾下」。", speak: "B P M means beats per minute." },
      ],
      words: [
        { term: "beat", zh: "（心臟）跳一下", icon: "💓", tip: "beats 就是好幾下。ea 唸長長的「一」。" },
        { term: "usually", zh: "通常", icon: "🔁", tip: "usually 是「通常」，不是「每一次都」。" },
        { term: "about", zh: "大約", icon: "🤔", tip: "about 70 = 大約 70，可能多一點或少一點。" },
        { term: "times", zh: "次、下", icon: "🔢", tip: "70 times 是「70 次」，這裡的 times 不是「時間」。" },
        { term: "per minute", zh: "每分鐘", icon: "⏱️", tip: "BPM 就是 beats per minute，唸 B-P-M 三個字母。" },
      ],
      check: {
        prompt: "BPM 是什麼意思？",
        options: ["每分鐘跳幾下", "每秒鐘跳幾下", "每小時跳幾下"],
        answer: "每分鐘跳幾下",
        hintZh: "BPM = beats per minute。minute 是「分鐘」，所以 BPM 就是心臟一分鐘跳幾下。",
      },
    },

    // ---- 3 ----
    {
      id: "exercise-more",
      title: "運動時，心臟為什麼跳更快？",
      zh:
        "跑步、跳舞的時候，你的手和腳都在用力，它們需要更多血液來幫忙。\n" +
        "所以心臟也要更努力：工作更多（works more），就跳更多下（beats more）。\n" +
        "就像餐廳客人突然變多，服務生就要跑得更快，才送得完餐點。\n" +
        "休息、睡覺的時候，身體不太需要用力，心臟就跳得比較少（less）。",
      lines: [
        {
          en: "When you do a lot of exercise, your heart works more and so it beats more.",
          zh: "當你做很多運動的時候，你的心臟工作得更多，所以它跳得更多。",
        },
        { en: "When you rest, your heart beats less.", zh: "當你休息的時候，你的心臟跳得比較少。" },
      ],
      words: [
        { term: "exercise", zh: "運動", icon: "🏃", tip: "do exercise = 做運動。" },
        { term: "a lot of", zh: "很多", icon: "➕" },
        { term: "and so", zh: "所以", icon: "➡️", tip: "and so 後面接的是「結果」。" },
        { term: "more / less", zh: "更多／更少", icon: "⬆️", tip: "句子裡只換了這一個字，意思就剛好相反！讀到這裡要停一下，看清楚。" },
        { term: "increase", zh: "增加", icon: "📈", tip: "課本說 beats more；也可以說 your pulse increases（脈搏增加）。" },
      ],
      check: {
        prompt: "You are running. Your heart works ___.",
        options: ["more", "less"],
        answer: "more",
        hintZh: "跑步是運動，身體需要更多血液，心臟就工作更多（more）、跳更多下。less 是「更少」，意思剛好相反。",
      },
    },

    // ---- 4 ----
    {
      id: "pulse-where",
      title: "脈搏是什麼？在哪裡摸得到？",
      zh:
        "心臟每跳一下，血液就被推一下，這一推會一路傳到手腕。\n" +
        "所以在手腕上，你可以摸到「咚、咚、咚」一下一下的跳動。這就是脈搏（pulse），也就是「摸得到的心跳」。\n" +
        "就像用水管澆花時，手摸著水管，也感覺得到水一陣一陣被推過來。\n" +
        "位置在哪裡？左手手心朝上，在手腕上、大拇指（thumb）的下方。",
      lines: [
        { en: "You can feel these heartbeats.", zh: "你可以感覺到這些心跳。" },
        { en: "This is your pulse.", zh: "這就是你的脈搏。" },
        { en: "A pulse is a heartbeat you can feel.", zh: "脈搏就是你摸得到的心跳。" },
      ],
      words: [
        { term: "pulse", zh: "脈搏", icon: "💓", tip: "pulse 的 u 唸短短的「ㄚ」，最後的 se 唸「斯」。" },
        { term: "heartbeat", zh: "心跳", icon: "💗", tip: "heart（心臟）+ beat（跳一下）= heartbeat（心跳）。" },
        { term: "feel", zh: "感覺到、摸到", icon: "✋" },
        { term: "wrist", zh: "手腕", icon: "⌚", tip: "w 不發音，唸起來像 rist。手錶就是戴在 wrist 上。" },
        { term: "thumb", zh: "大拇指", icon: "👍", tip: "b 不發音，唸起來像 thum。" },
        { term: "fingers", zh: "手指（好幾根）", icon: "✌️", tip: "two fingers = 兩根手指。" },
      ],
      check: {
        prompt: "What is a pulse?",
        options: ["a heartbeat you can feel", "a part of your thumb", "a kind of exercise"],
        answer: "a heartbeat you can feel",
        hintZh: "脈搏（pulse）就是在手腕上摸得到的心跳。它不是大拇指的一部分（大拇指只是幫你找位置），也不是一種運動。",
      },
    },

    // ---- 5 ----
    {
      id: "measure",
      title: "跟著做：量脈搏",
      zh:
        "量脈搏只要照順序做，一次做一個動作就好。\n" +
        "① 左手手心朝上。② 右手的兩根手指（食指和中指）放在左手腕上、大拇指的下方。\n" +
        "③ 輕輕地壓，像摸小貓一樣輕。太用力反而不容易摸到。\n" +
        "④ 摸到「咚、咚」以後，數 10 秒鐘裡跳了幾下，把數字記下來。⑤ 把數字乘以 6（下一步會說為什麼）。\n" +
        "記住：是用兩根手指量，不是用大拇指。大拇指只是告訴你手指要放在哪裡。",
      lines: [
        { en: "Put two fingers under the thumb on your left wrist.", zh: "把兩根手指放在左手腕上、大拇指的下方。" },
        { en: "Press your wrist gently with your fingers.", zh: "用你的手指輕輕地按壓手腕。" },
        { en: "Take your pulse for 10 seconds.", zh: "量你的脈搏 10 秒鐘。", speak: "Take your pulse for ten seconds." },
        { en: "How many beats?", zh: "跳了幾下？" },
      ],
      words: [
        { term: "put", zh: "放", icon: "👉" },
        { term: "under", zh: "在……下面", icon: "⬇️", tip: "under the thumb = 在大拇指下面。" },
        { term: "press", zh: "按、壓", icon: "👇" },
        { term: "gently", zh: "輕輕地", icon: "🍃", tip: "gently 和 gentle（溫柔的）是一家人。" },
        { term: "take your pulse", zh: "量脈搏", icon: "⏱️", tip: "這裡的 take 不是「拿」，take your pulse 是「量脈搏」。" },
        { term: "seconds", zh: "秒", icon: "⏲️", tip: "10 seconds = 10 秒。" },
      ],
      tryIt:
        "爸爸媽媽一起來（大約 2 分鐘）：\n" +
        "1. 先坐好，安靜休息一下。一起唸：Put two fingers under the thumb on your left wrist. Press your wrist gently.\n" +
        "2. 摸到「咚、咚」以後，家長用手機碼錶喊 \"Go!\"，10 秒到了喊 \"Stop!\"。孩子一邊摸一邊小聲數 one, two, three…\n" +
        "3. 把數到的數字寫下來（下一步要用）。家長問：How many beats?\n" +
        "4. 如果身體覺得舒服，可以做 20 下輕鬆的開合跳，馬上再量一次 10 秒，比比看哪一個數字比較大。\n" +
        "安全提醒：覺得頭暈或喘不過氣，就馬上停下來坐著休息。如果家長知道孩子心臟有任何狀況，就不要做開合跳，只做第 1～3 步。\n" +
        "摸不到也沒關係：手指稍微移一下位置、壓輕一點再試，或請家長幫忙找。",
      check: {
        prompt: "You take your pulse with ___.",
        options: ["two fingers", "your thumb"],
        answer: "two fingers",
        hintZh: "用兩根手指（two fingers）輕輕壓。大拇指（thumb）只是告訴你位置：手指要放在它的下面。",
      },
    },

    // ---- 6 ----
    {
      id: "times-six",
      title: "為什麼要乘以 6？",
      zh:
        "BPM 是「一分鐘」跳幾下。可是數滿一整分鐘有點久，很容易數亂，所以課本教一個小撇步：只數 10 秒。\n" +
        "1 分鐘有 60 秒，裡面剛好有 6 個 10 秒：10 + 10 + 10 + 10 + 10 + 10 = 60。\n" +
        "所以：10 秒數到幾下，再乘以 6，就是 1 分鐘大約跳幾下。\n" +
        "例子：10 秒數到 12 下，12 × 6 = 72，脈搏就是 72 BPM。\n" +
        "就像一包餅乾有 12 片，買 6 包就是 72 片。",
      lines: [
        {
          en: "You measure your pulse in beats per minute (BPM).",
          zh: "脈搏是用「每分鐘跳幾下」（BPM）來測量的。",
          speak: "You measure your pulse in beats per minute, B P M.",
        },
        { en: "Now multiply this number by 6.", zh: "現在把這個數字乘以 6。", speak: "Now multiply this number by six." },
        { en: "How many beats per minute is your pulse?", zh: "你的脈搏是每分鐘幾下？" },
        {
          en: "10 seconds × 6 = 60 seconds = 1 minute",
          zh: "10 秒 × 6 = 60 秒 = 1 分鐘",
          speak: "Ten seconds times six is sixty seconds. That is one minute.",
        },
      ],
      words: [
        { term: "measure", zh: "測量", icon: "📏" },
        { term: "multiply … by 6", zh: "乘以 6", icon: "✖️", tip: "是「乘」，不是「加」。12 乘以 6 是 72，不是 18。" },
        { term: "this number", zh: "這個數字", icon: "🔢", tip: "就是你在 10 秒裡數到的那個數字。" },
        { term: "minute", zh: "分鐘", icon: "⏰", tip: "1 minute = 60 seconds。" },
      ],
      widget: "pulse-calc",
      check: {
        prompt: "You count 15 beats in 10 seconds. What is your pulse?",
        options: ["90 BPM", "21 BPM", "150 BPM"],
        answer: "90 BPM",
        hintZh: "15 × 6 = 90，所以是 90 BPM。21 是 15 + 6（變成加法了）；150 是 15 × 10（乘錯數字了）。記得：乘以 6。",
      },
    },

    // ---- 7 ----
    {
      id: "table-match",
      title: "看表格：猜猜誰是誰",
      zh:
        "課本 p24 的表格：A、B、C 三個小朋友，在 7 點、7 點半、8 點的脈搏（單位都是 BPM）。\n" +
        "A：150 → 70 → 100\nB：70 → 75 → 80\nC：65 → 70 → 150\n" +
        "記住一條規則：動得越多，脈搏越高；越安靜，脈搏越低。\n" +
        "先看 Olga：她 7 點去跑步，所以 7 點的數字要很高。A 在 7 點是 150，最高！\n" +
        "Olga 7 點半吃早餐、看電視，A 降到 70。8 點走路上學，A 是 100，不高也不低。所以 Olga 是 A。\n" +
        "小提醒：課本把時間寫成 7.30，就是 7:30（七點半）。",
      lines: [
        { en: "The more you move, the higher your pulse.", zh: "你動得越多，脈搏就越高。" },
        { en: "Olga gets up early and goes running at seven o'clock.", zh: "Olga 很早起床，七點去跑步。" },
        {
          en: "Then at 7.30 she has breakfast and watches TV.",
          zh: "然後七點半她吃早餐、看電視。",
          speak: "Then at seven thirty she has breakfast and watches TV.",
        },
        { en: "At eight o'clock she goes to school.", zh: "八點她去上學。" },
        { en: "She walks to school.", zh: "她走路上學。" },
        { en: "Milly reads in bed at seven o'clock.", zh: "Milly 七點在床上看書。" },
        {
          en: "She gets up and has breakfast at 7.30.",
          zh: "她七點半起床、吃早餐。",
          speak: "She gets up and has breakfast at seven thirty.",
        },
        { en: "At eight o'clock she runs to school.", zh: "八點她跑步去上學。" },
        { en: "She's always late!", zh: "她總是遲到！" },
        { en: "Josh has breakfast at seven o'clock.", zh: "Josh 七點吃早餐。" },
        { en: "At 7.30 he gets dressed.", zh: "七點半他穿衣服。", speak: "At seven thirty he gets dressed." },
        { en: "At eight o'clock he takes the bus to school.", zh: "八點他搭公車去上學。" },
      ],
      words: [
        { term: "7.30", zh: "七點半（7:30）", icon: "🕢", tip: "英國課本用「.」寫時間，唸 seven thirty。" },
        { term: "goes running", zh: "去跑步", icon: "🏃" },
        { term: "gets dressed", zh: "穿衣服", icon: "👕" },
        { term: "takes the bus", zh: "搭公車", icon: "🚌" },
        { term: "late", zh: "遲到", icon: "⏰" },
        { term: "high / low", zh: "高／低", icon: "📊", tip: "higher = 比較高，lower = 比較低。" },
      ],
      check: {
        prompt: "Milly reads in bed at 7.00. At 8.00 she runs to school. Which one is Milly?",
        options: ["A", "B", "C"],
        answer: "C",
        hintZh:
          "7 點在床上看書很安靜，數字要低；8 點跑步上學，數字要很高。C 是 65 → 70 → 150，先低後高，所以 Milly 是 C。剩下的 B 就是 Josh：吃早餐、穿衣服、搭公車都不太費力，所以一直是 70、75、80。",
      },
    },

    // ---- 8 ----
    {
      id: "activities-bpm",
      title: "做不同的事，脈搏不一樣",
      zh:
        "課本 p25 有同一個女孩做六件事之後的脈搏。\n" +
        "從最安靜到最累：睡覺 68 → 看書 78 → 玩電腦遊戲 89 → 走路上學 97 → 踢足球 120 → 跳繩 140。\n" +
        "睡覺最安靜，所以最低（lowest）；跳繩一直跳，所以最高（highest）。\n" +
        "看數字要一位一位看：68 和 86 長得很像，但是不一樣喔！\n" +
        "after 後面的動作要加 ing：after sleeping 就是「睡覺之後」。",
      lines: [
        { en: "What's her pulse after sleeping?", zh: "她睡覺之後的脈搏是多少？" },
        { en: "It's 68.", zh: "是 68。", speak: "It's sixty-eight." },
        { en: "What's her pulse after playing football?", zh: "她踢足球之後的脈搏是多少？" },
        { en: "It's 120.", zh: "是 120。", speak: "It's one hundred and twenty." },
        { en: "Her pulse is the highest after skipping.", zh: "跳繩之後，她的脈搏最高。" },
        { en: "Her pulse is the lowest after sleeping.", zh: "睡覺之後，她的脈搏最低。" },
      ],
      words: [
        { term: "after", zh: "在……之後", icon: "⏩", tip: "after + 動作 ing：after reading = 看書之後。" },
        { term: "sleeping", zh: "睡覺", icon: "😴" },
        { term: "reading", zh: "看書", icon: "📖" },
        { term: "playing computer games", zh: "玩電腦遊戲", icon: "🎮" },
        { term: "walking to school", zh: "走路上學", icon: "🚶" },
        { term: "playing football", zh: "踢足球", icon: "⚽", tip: "英國說的 football 是足球。" },
        { term: "skipping", zh: "跳繩", icon: "🪢" },
        { term: "highest / lowest", zh: "最高／最低", icon: "📊", tip: "題目問 highest 還是 lowest，要先看清楚。" },
      ],
      widget: "bpm-compare",
      check: {
        prompt: "What's her pulse after walking to school?",
        options: ["It's 97.", "It's 68.", "It's 140."],
        answer: "It's 97.",
        hintZh: "走路上學之後是 97。68 是睡覺之後（最低），140 是跳繩之後（最高）。走路比睡覺累，但比跳繩輕鬆，所以在中間。",
      },
    },
  ],
};

export default lesson;
