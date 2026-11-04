# P9 — 錯題練習化 · DESIGN

> 對應 [REQUIREMENTS.md](./REQUIREMENTS.md)。以下「現況」皆為 2026-11-04 實際讀過的程式碼；標「待查」的是尚未確認的事。

## 1. 現況（會影響設計的事實）

- `services/mistakeBook/data/*.ts` 共 166 筆：`content_comprehension` 84、`plural_possessive` 41、`verb_tense` 8、`sentence_structure` 8、`capitalization` 7、`pronoun_reference` 6、`context_carelessness` 6、`spelling` 4、`other` 2。分類已失真（一半在同一類），今天頁 1 嚴格說不是時態、頁 2 會被丟進 `content_comprehension`。
- 舊資料不能直接重考：選項帶標號（`"(a) his"`，`correctAnswer` 也帶標號）；2026-10-06 松鼠題 (b)、(c) 文字相同；約 18 筆 `studentAnswer` 是「未知（推測…）」；19 筆 `rewrite` 無法自動判分。
- `services/newVocabData.ts` 有 1308 筆、不重複的字約 873 個。traffic jam 是 `s452` 與 `s1105`，at first 是 `s1094` 與 `s1106`。`updateWordMastery` 依 id 寫入，所以同一個字會被分開排程。
- `exampleSentencesData` 沒有 1089–1100（earache…matter）的例句；cold／cough 只剩 serverData 那句共用例句。`tryCreateCloze` 精確比對沒有單字邊界（cough 會被挖成 `I was _____ing`）；`buildClozeQueue` 的干擾項是同 session 的隨機字。
- `cloudSync` 是匿名登入、依 uid 存單一文件；`pullFromCloud` 只在本機為空時還原，push 整個欄位覆蓋。新 key 要加進 `LS_KEYS`、`CloudDocument`、`pairs` 三處。
- `updateWordMastery` 的既有怪癖：答錯後 `lastCorrectDate` 不更新，所以同一天「先錯再對」會直接升到第 2 箱。兩套系統連動後更容易發生，需處理（TASK-03）。
- **待查**：新增 `AnswerSource = 'mistake'` 對 `parentAnalytics` 的影響（TASK-08 先確認）。

## 2. 分類架構

```ts
export interface SkillTag {
  id: string;                       // 'G.SVA.plural_subject'
  domain: 'G' | 'V' | 'R' | 'M' | 'FMT'; // FMT = 題型技能
  label: string;                    // 中文顯示名
  legacyCategory?: ErrorCategory;
}
```

第一期用到的技能（`services/mistakeBook/skills.ts`）：

| 技能 id | 說明 |
|---|---|
| `G.SVA.I_you_base` | 主詞 I／you 用動詞原形 |
| `G.SVA.plural_subject` | 複數主詞（含 children 這類不規則複數）用原形 |
| `G.SVA.compound_subject` | 合併主詞（Mark and I）用原形 |
| `G.SVA.third_person_s` | 第三人稱單數加 -s／-es |
| `G.NEG.dont_doesnt` | 否定句 don't／doesn't 的選擇 |
| `G.PS.does_question_base` | does 問句後用原形 |
| `G.PS.short_answer` | 簡答的助動詞對應主詞 |
| `FMT.choose_correct` | 題型技能：「選正確的句子」要逐項檢查四句 |
| `V.COLLOC` | 搭配詞（catch a cold、heavy traffic jam、stay still） |
| `V.CONFUSE` | 易混辨析（cold／sick／cough） |
| `V.POS_SLOT` | 詞性位置（are + 形容詞、you + 動詞） |
| `V.POLYSEMY` | 一字多義（still：仍然／靜止） |

**今天兩頁的標註：**

| 題 | 技能 | 備註 |
|---|---|---|
| P1-1 eat | `G.SVA.I_you_base` | 原題有歧義，只當種子，不原樣出題 |
| P1-2 visit | `G.SVA.plural_subject` | children 沒有 s，容易被當成單數 |
| P1-3 don't drink | `G.SVA.compound_subject`、`G.NEG.dont_doesnt` | 「tea or coffee」是否定的線索 |
| P1-4 | `G.PS.does_question_base`、`FMT.choose_correct` | 第 5 題找錯句她答對，所以重點在「選正確句」要逐項檢查 |
| P1-9 | `G.PS.short_answer` | father 換成 he，助動詞 does 要對應 |
| P2-1 cold | `V.COLLOC`、`V.CONFUSE` | 易混字組 `cs.health` |
| P2-3 sick | `V.POS_SLOT`、`V.CONFUSE` | dizzy 也通，記入 `alsoFits` |
| P2-6 cough | `V.POS_SLOT`、`V.CONFUSE` | 單字庫標 n.，考卷考動詞用法 |
| P2-8 still | `V.POLYSEMY`、`V.COLLOC` | 可能只知道「仍然」 |
| P2-9 traffic jam | `V.COLLOC` | 不屬於健康字組 |

字庫題有「連鎖錯」（錯一格會連帶錯另一格），頁 2 的 5 題錯真正的混淆可能只有 2–3 個，診斷時不要過度加權。

**與既有 `errorCategory` 的相容**：`MistakeRecord` 加選填 `skills?: string[]`，`errorCategory` 原樣保留；`scripts/mistakeBook/validate_import.cjs` 擴充檢查 `skills` 皆已登記。回填 2026-10-13 起共 103 筆；更早的給 `legacy.<category>`。

## 3. 錯誤性質（從練習結果推算）

- **混淆**：選到的干擾項屬於同一易混字組，或帶特定 `misconception`（如 `3sg_s_on_plural`）。
- **不會**：同一技能不同變化題連續錯。
- **粗心**：同技能大多答對、偶爾錯，且作答 < 1200 ms（沿用 `GUESSING_THRESHOLD_MS`）。

## 4. 資料模型

```ts
interface ConfusionSet { id: string; words: string[]; contrastNote: string }
interface DrillOption  { text: string; misconception?: string }

interface DrillItem {
  id: string;                 // `${seedId}#v${n}`，不用文字 hash（改字不會讓進度變孤兒）
  seedMistakeId?: string;
  skillIds: string[];
  confusionSetId?: string;
  kind: 'mc' | 'word_bank';
  stem: string;               // 恰好一個 ___
  answer: string;
  distractors: DrillOption[];
  alsoFits?: string[];        // 組內其他也說得通的字，禁止當干擾項
  targetWords?: string[];     // 正規化（小寫、去頭尾空白）後的單字／片語
  difficulty: 1 | 2 | 3;
  variation: ('subject' | 'verb' | 'polarity' | 'question' | 'short_answer' | 'context')[];
  explanation: string;        // 中文，答錯時顯示
}

interface SkillProgress {
  key: string;                // skillId 或 confusionSetId
  box: number;
  dueDate: number;
  consecutiveCorrectDays: number;
  lastCorrectDate?: string;
  recent: { date: string; itemId: string; correct: boolean; ms: number; picked?: string }[]; // 最近 10 筆
}
```

- **靜態資料**（進 git）：`mistakeBook/data`、`drills/<date>.ts`、`skills.ts`、`confusionSets.ts`。
- **動態狀態**：localStorage key `vocab_skill_progress`，以 `skillId`／`confusionSetId` 為 key；單字熟練度仍只存 `vocab_srs_mastery`，`needsContext` 加為 `VocabMastery` 的選填欄位（`migrateMasteryData` 原樣保留）。

## 5. 驗證（`services/__tests__/drills.test.ts`，跟 `npm test` 一起跑）

1. 題幹恰好一個 `___`；選項去標號後彼此不重複，正解恰好出現一次。
2. 干擾項與 `alsoFits` 沒有交集。
3. 英文題幹沒有中文；正解字形與空格相容（避免 `_____ing`）。
4. `targetWords` 都能在單字庫找到；`skillIds`、`confusionSetId` 都已登記；id 不重複。
5. 同一字組的每個字至少 2 句、線索類型不同（以 `variation`／標記檢查）。

另加人工把關：**盲解**——把題目丟給 Gemini 作答，答案與標準答案不同就交給家長看；家長在對話中確認後才 commit。驗證程式抓不到語意歧義，所以這一道不能省。

## 6. 排程與出題

- `applyAnswer`：把 `updateWordMastery` 的跨日判斷抽成純函式，單字與技能共用；順手修正「同日先錯再對」的升箱問題（行為變更要在測試中明寫）。
- `getTodayDrill(deps)`：每日 ≤ 8 題、同一技能 ≤ 2 題；優先到期技能、再優先沒出過的變化題；答錯後下一次降一級難度；選項順序打亂。
- 題庫飽和策略：同一技能已有足夠題庫時，新錯題只連到該技能並補 1–2 題，匯入成本遞減。
- 當天計畫先算出並快取，`getDailyHuntWords` 讀它來排除重複字。

## 7. UI

- 新增 `components/MistakeDrill.tsx`，不塞進 635 行的 `SmartDailyReview`。
- `SmartDailyReview` 結算畫面加「接著練錯題」導向（D4）；`App.tsx` 保留獨立入口。
- `MistakeBookView.tsx`：選做「弱點排行」分頁（TASK-10）。

## 8. 風險

| 風險 | 對策 |
|---|---|
| 生成的題目有文法／歧義錯誤 | §5 驗證 + 盲解 + 家長確認，列為 GATE |
| 兩套排程互相打架 | 當天計畫快取 + 單字排除 + `needsContext` |
| `parentAnalytics` 受新 `AnswerSource` 影響 | TASK-08 先讀程式與測試再改 |
| cloudSync 覆蓋式 push | 資料量小；新 key 加入三處並寫測試；只在孩子的一台裝置練習 |
