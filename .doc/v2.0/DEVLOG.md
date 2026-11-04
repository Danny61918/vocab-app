# v2.0 開發日誌（DEVLOG）

Append-only 過程紀錄。用途：追蹤自主開發迴圈中發生的事、紅燈與修正，供事後覆盤。格式見 [WORKFLOW.md](./WORKFLOW.md#開發日誌devlogmd--可覆盤的稽核軌跡)。最新在最上方。

---

## [2026-08-03] P5 — 家長診斷（TASK-07a+b）
- 動作：`answerLog.ts` 加 `GAME_TYPE_DIAGNOSIS`/`diagnoseByGameType`/`dailyStudyMinutes`；`srsStorage.ts` 加 `getOverdueWords`；`AnalyticsDashboard.tsx` 加標題長按 1.5s 解鎖的家長面板（錯誤類型診斷 / 逾期字清單 / 每日投入時間）。新增 `parentAnalytics.test.ts`（E2E-p5-1~3）。展開 P5 五件式。
- 結果：**vitest 17/17 綠**、tsc ✅、build ✅、無回歸。**Browser 冒煙通過**：長按解鎖面板，真資料顯示——詞義辨識 1/16(6%)、語境/閱讀 5/9(**56%，正確標為弱項**)、逾期 0 字、08-02 投入 2.7 分；非責備文案就位。
- 問題：Browser 自動化長按（按住 1.5s）無法用一般 click 觸發（click 太快會取消計時）→ 改以 dispatch pointerdown 事件驗證（真 handler）。
- 待使用者手動驗收：長按秒數、面板位置/tone 實機確認（低風險）。
- commit：（見下方）

## [2026-08-03] P4 — 取消（產品決定）
- 動作：使用者決定「這個機制不要」——不向孩子呈現任何逃跑/失去概念（Prime Directive）。移除 `processForgottenEscapes`/`markReviewCompleted`/`FORGET_THRESHOLD_DAYS` 與 LevelProgress 相關欄位、刪除 `monsterEscape.test.ts`。P4 文件標記取消、保留設計紀錄。
- 結果：vitest **14/14**、tsc ✅、build ✅。淨結果＝無任何逃跑邏輯（新舊皆不留）。
- 覆盤：本階段先實作再依產品決定移除——SDD 的文案/tone GATE 應在寫 code 前先問，可省一次往返。已內化：**child-facing 情緒性功能，先問 tone 再實作。**
- commit：（見下方）

## [2026-08-03] P4/TASK-03a — 怪獸逃跑/抓回邏輯（後被取消）
- 動作：確認舊 `processSpontaneousEscapes` 為 dead code（全庫 grep 無呼叫端）→ 刪除。`LevelProgress` 加 `escapedMonsters`/`lastReviewCompletedDate`（`loadLevelProgress` 給預設，相容）。實作 `processForgottenEscapes`（逾期≥3天觸發、當日已複習豁免、單日≤1、確定性取最低關卡）、`markReviewCompleted`（複習到逃跑關卡的字→抓回）。新增 `services/__tests__/monsterEscape.test.ts`（E2E-5 + esc-1~5）。展開 P4 五件式。
- 結果：**vitest 21/21 綠**（8 P1 + 6 P2 + 7 P4）、tsc ✅、build ✅、無回歸；running app HMR 後 console 無錯。
- 問題：發現隨機逃跑其實從未接進 UI（RC-3 目前非 active）→ P4 改為「建正確版 + 刪 dead code」。
- 待使用者 GATE：UI 接線（TASK-03b）前需確認**逃跑/抓回文案 tone**、以及是否要向孩子顯示「逃跑」概念（Prime Directive）。
- commit：（見下方）

## [2026-08-02] P2/TASK-04b — 四題型 UI 埋点
- 動作：`answerLog.ts` 加 `gameTypeToAnswerGameType`（GameType enum→log 型別）。`QuizArea.tsx` 在單一漏斗 `handleAnswer` 埋 `logAnswer`（四題型皆經此），用 `questionShownAtRef`(useEffect on currentQuestion) 算 responseMs、`makeWordKey('server', id)`。`SmartDailyReview.tsx` 兩個作答點埋点：`handleQuizAnswer`→'multiple_choice'、`handleClozeAnswer`→'sentence_cloze'，各自 shown-at ref、`makeWordKey('srs', id)`。
- 結果：**vitest 14/14 綠**、tsc ✅、build ✅、無回歸。
- 問題：無。
- 待使用者手動驗收：實際玩一輪確認 responseMs 計時合理、作答有寫入 log（端到端行為機器難自動測）。
- commit：（見下方）

## [2026-08-02] P2/TASK-04a — Answer Log 資料層
- 動作：展開 P2 五件式 + ADR-002（wordId 複合 key `<source>:<id>` 橋接雙資料集）；新增 `services/answerLog.ts`（`makeWordKey/parseWordKey`、`logAnswer` 環形緩衝 2000、`errorRateByGameType` 聚合、注入式時間複用 `srsStorage.localYmd`）；新增 `services/__tests__/answerLog.test.ts`（E2E-log-1~4）。
- 結果：**vitest 13/13 綠**（8 P1 + 5 P2）、tsc ✅、build ✅、P1 無回歸。
- 問題：無。
- 決策：wordId 型別橋接由我定案為複合字串 key（ADR-002），未打擾使用者。
- 待下一 chunk：TASK-04b 四題型 UI 埋点（responseMs 計時，部分靠手動驗收）。
- commit：（見下方）

## [2026-08-02] P1/收尾 — Phase DoD 檢查
- 動作：TASK-03 呼叫端相容確認（grep `masteryLevel` 僅剩遷移讀取與測試 fixture）；自我 code-review（跨日判定、答錯降級、到期選字、洗牌去偏差、遷移不動 LevelProgress）；更新 OVERVIEW 進度；tag `v2.0-p1-done`。
- 結果：Phase DoD 自動部分達成（vitest 8/8、tsc、build 綠）。
- 待使用者手動驗收：P1 無 device-only E2E；唯一手動項＝BOX_INTERVALS 是否依段考微調（預設 [0,1,3,7,14,30]）。
- 下一步決策（P2 開始前）：answerLog wordId 型別橋接（newVocabData string vs serverData number）。
- commit：（OVERVIEW/DEVLOG 收尾 commit + tag）

## [2026-08-02] P1/TASK-01+02 — SRS box 模型 + 遷移 + 排程引擎
- 動作：重寫 `services/srsStorage.ts`：新 `VocabMastery`（boxLevel/intervalDays/dueDate/consecutiveCorrectDays/lastCorrectDate）、`BOX_INTERVALS`、注入式 `SrsDeps`/`localYmd`/`shuffle`、`migrateMasteryData`、`isMastered`、重寫 `updateWordMastery`（跨日）與 `getDailyHuntWords`（到期優先/≤15）。呼叫端 `SmartDailyReview.tsx`、`VocabAdventureMap.tsx` 的 `masteryLevel>=2` 改 `isMastered()`。新增 `services/__tests__/srsStorage.test.ts`（E2E-1/2/3/4/7/8）。
- 結果：**vitest 8/8 綠**、tsc ✅、build ✅。E2E-1~4/7/8 全數確定性通過。
- 問題：TASK-01 與 TASK-02 都改寫同一批函式，無法在保持 green build 下分開 commit。
- 修正：合併為單一 commit（文件 TASKS.md 原分列；此處記錄合併理由）。
- commit：（見下方 commit）

## [2026-08-02] P1/TASK-00 — 測試基建（Vitest + jsdom）
- 動作：`npm install` 安裝既有依賴；加 `vitest`/`jsdom` devDeps；`vitest.config.ts`（jsdom+globals）；`package.json` test scripts；`services/__tests__/helpers.ts`（seeded RNG、fixedDeps）。
- 結果：`npx vitest run` 可跑；tsc ✅、build ✅。
- 問題 1：`npm i -D vitest jsdom` 觸發 ERESOLVE——**既有** peer 衝突（`@vitejs/plugin-react@4.7` 只支援 vite ≤7，但專案釘 vite 8）。非本次引入。
- 修正 1：改用 `--legacy-peer-deps` 安裝（僅 dev 依賴，不動 runtime）。
- 問題 2：新增的 `tsc --noEmit` 閘門揭露**既有**型別錯誤 `Cannot find namespace 'NodeJS'`（`DailyChallenge.tsx:46`、`SmartDailyReview.tsx:52` 的 `NodeJS.Timeout`）。專案先前只跑 `vite build`（esbuild 不型檢）故未暴露。
- 修正 2：改用瀏覽器正確型別 `ReturnType<typeof setTimeout>`，不新增 `@types/node`、不改行為。
- commit：（見下方 commit）

## [2026-08-02] P0/SETUP — SDD scaffold 建立
- 動作：開分支 `feat/v2.0-srs`；整併文件夾（`!doc/Phase/SPEC_vocab_app_v2.md` → `.doc/v2.0/`，移除 `!doc/`）；建 OVERVIEW / WORKFLOW / DEVLOG；建七個 phase 資料夾；撰寫 P1 五件式文件。
- 結果：文件層，未動任何 `services/*`、`components/*` 程式碼。
- 問題：無。
- 修正：—
- commit：（待本階段文件收尾一次 commit）

### 決策紀錄（本次 session 對齊）
- 測試框架＝**Vitest**（AI 決定）；瀏覽器 E2E（E2E-6/9/10）**延後**到 P3/P6/P7。
- SRS 時間/亂數採**注入式**接縫（`now`、`rng`），使跨天/快轉/洗牌可確定性測試。
- 開發模式＝**自主迴圈**：AI 自行寫測試→實作→跑測試/型別/build→自我 review→修正→commit，做到全綠；使用者唯一介入點＝**最後手動測試驗收**。
- 文件根目錄合併為單一 `.doc/`；命名採 SDD 五件式。

## [2026-11-04] P9/TASK-00 — 錯題練習化：開分支與基線
- 動作：開 `feat/mistake-drill`（main 一 push 就部署，不在 main 開發）；commit spec 三份文件；跑基線。
- 結果：`npm test` 30/30、`tsc --noEmit` ✅、`vite build` ✅。
- 問題：無。
- 修正：—
- commit：`P9: add mistake-drill spec`

## [2026-11-04] P9/TASK-01 — 技能表與易混字組
- 動作：新增 `services/mistakeBook/skills.ts`（12 個技能）、`confusionSets.ts`（`cs.health`）；`MistakeRecord` 加選填 `skills?: string[]`；測試 `skills.test.ts`。
- 結果：測試 36/36、tsc ✅。
- 決策：`FMT.choose_correct` 是題型技能，不屬 G/V/R/M，所以 `SkillDomain` 多一個 `'FMT'`（DESIGN §2 已同步）。
- 問題：無。
- commit：`P9/TASK-01: skills and confusion sets`

## [2026-11-04] P9/TASK-02 — 題目型別與驗證測試
- 動作：新增 `drills/types.ts`（`DrillItem`、`DrillOption`、`DrillClue`）、`drills/index.ts`（`ALL_DRILLS`，目前空）、`drills/validate.ts`（`validateDrillItem`、`validateDrillBank`）、`drills.test.ts`。
- 紅：先寫測試，`validate` 不存在時整個測試檔載入失敗（確認紅）。
- 綠：實作後 49 通過 / 1 略過（整庫檢查在題庫為空時略過，TASK-06 起生效）；tsc ✅。
- 決策：`DrillItem` 多一個選填 `clue`（noun/adj/verb/collocation/meaning），用來檢查「同一字至少兩種不同線索」；DESIGN §4 同步。
- 問題：無。
- commit：`P9/TASK-02: drill types and validator`

## [2026-11-04] P9/TASK-03 — 排程純函式 applyAnswer
- 動作：新增 `services/leitner.ts`（`BOX_INTERVALS`、`DAY_MS`、`BoxState`、`newBoxState`、`applyAnswer`）；`srsStorage.updateWordMastery` 改用 `applyAnswer`，`BOX_INTERVALS`／`DAY_MS` 由 srsStorage 轉出口，舊的 import 不用改；`VocabMastery extends BoxState`，新增選填 `lastWrongDate`。
- 行為變更（有測試明寫）：**同一天先答錯再答對不再升箱**。原本答錯不更新 `lastCorrectDate`，同日再答對會從第 1 箱直接升到第 2 箱，錯題練習與單字複習連動後更容易發生。
- 結果：58 通過 / 1 略過、tsc ✅；原有 30 個測試無回歸。
- 問題：無。
- commit：`P9/TASK-03: applyAnswer shared by vocab and skills`

## [2026-11-04] P9/TASK-04 — 技能進度與每日出題
- 動作：新增 `services/mistakeBook/drillProgress.ts`：`SkillProgress`、`recordDrillAnswer`（技能與易混字組各自 `applyAnswer`，recent 最多 10 筆）、`isGraduated`（跨 3 天、3 題不同、中間不得答錯）、`getTodayDrill`／`getRemainingDrill`（每日 ≤ 8、同主技能 ≤ 2、到期才出、沒出過的優先、答錯後降一級難度、文法與單字技能交錯、當天計畫快取於 `vocab_drill_plan`）、`presentOptions`（選項打亂）。測試 `drillProgress.test.ts`（17 項）。
- 結果：75 通過 / 1 略過、tsc ✅。
- 決策：
  - 「到期」以**日曆日**比較（`localYmd(dueDate) <= today`），不用時間戳，否則孩子今天比昨天早做就會「還沒到期」。
  - 出題**廣度優先**（每個技能先 1 題，再補第 2 題），診斷面較廣；「同技能」以 `skillIds[0]` 為主技能計算。
  - 進度 key 為 `vocab_skill_progress`（TASK-07 同步到雲端）；每日計畫 `vocab_drill_plan` 是可重建的快取，不同步。
- 問題：無。
- commit：`P9/TASK-04: skill progress and daily drill planning`

## [2026-11-04] P9/TASK-05 — 單字連動
- 動作：
  - `srsStorage.ts`：`VocabMastery` 加選填 `needsContext`／`contextCorrectDays`／`lastContextCorrectDate`；`updateWordMastery` 多第 4 參數 `source: 'recognition' | 'context'`（預設 recognition，舊呼叫不變）；有 `needsContext` 的字「看英文選中文」答對不升箱，句子題跨日答對 2 次解除（答錯歸零、同日先錯再對不算）；`SrsDeps` 加 `excludeWords`，`getDailyHuntWords` 會排除。
  - `SmartDailyReview.tsx`：例句填空兩處呼叫改傳 `'context'`（其他不動）。
  - 新增 `mistakeBook/vocabLink.ts`：`idsForWord`（同字全部 id）、`applySeedWordMistakes`（考卷錯字降箱 + 標 needsContext，每個 seed 只套用一次，記在 `vocab_seeded_mistakes`）、`applyDrillToVocab`、`answerDrill`（技能進度 + 單字一起更新）、`getPlannedTargetWords`、`getConfusionPairs`（由技能進度的 recent 推算，不另存）。新增 `drills/seedWords.ts`（2026-11-04：cold, sick, cough, still, traffic jam）。
- 結果：90 通過 / 1 略過、tsc ✅；原有測試無回歸。
- 決策：
  - 排除清單用**注入**（`deps.excludeWords`）而不是 srsStorage 直接讀每日計畫，避免 srsStorage ↔ drillProgress 循環相依；呼叫端（TASK-08）傳 `getPlannedTargetWords()`。這個函式會順便建立並快取當天計畫，所以先做每日複習也排得掉。
  - `vocab_seeded_mistakes` 是新的 localStorage key，TASK-07 一併登記到雲端同步。
  - 句子題答錯只降「正解字」，干擾項不動；混淆對由 recent 的 `picked` 推算。
- 風險：`needsContext` 字若沒有任何句子題可答就解除不了。對策：TASK-06 的題庫要讓 5 個種子字（cold, sick, cough, still, traffic jam）每個都有題。
- commit：`P9/TASK-05: vocab linkage and needsContext`

## [2026-11-04] P9/TASK-06 — 題庫內容（等 GATE-A）
- 動作：
  - 新增 `data/2026-11-04.ts`（今天兩頁的 10 題錯題，含 `skills`；id 用 `idUtil` 同一公式算出，`validate_import.cjs` 通過：13 檔 176 筆），並登記進 `mistakeBook/index.ts`。
  - 新增 `drills/2026-11-04.ts`：35 題 = 文法 17（I/you 2、第三人稱 2、複數主詞 3、合併主詞 2、否定 2、does 問句 2、簡答 2、選正確句 2）+ 單字 18（cs.health 七個字各 2 句、still 2、traffic jam 2）；登記進 `drills/index.ts`。
  - `drills.test.ts` 加整庫檢查：驗證全過、`seedMistakeId` 都存在、錯題 `skills` 都登記、5 個種子字各有 ≥ 2 題、題數落在預期範圍。
- 設計：每題只有一個可接受答案——干擾項不是詞性放不進空格，就是和句意矛盾；「也說得通」的字（sick/dizzy、cold/cough…）寫進 `alsoFits`，不當選項。原題兩個歧義題（P1-1、P2-3）沒有原樣使用。
- 盲解：Gemini 額度用完（429），改用一個完全沒看過答案的子代理盲解 35 題；結果 35 題都只認出標準答案、沒有任何備註或多解。
- 結果：100 通過、tsc ✅。
- 限制（要讓家長知道）：盲解者是另一個 Claude 子代理，不是不同廠牌的模型，可能和我有同樣的盲點；所以仍要家長人工過目（GATE-A）。
- commit：`P9/TASK-06: drill content for 2026-11-04`

## [2026-11-04] P9/TASK-07 — 雲端備份
- 動作：`cloudSync.ts` 新增 `skillProgress`（`vocab_skill_progress`）、`seededMistakes`（`vocab_seeded_mistakes`）；把 push 與 pull 兩份欄位清單合併成單一 `SYNC_FIELDS`（新增 key 不會再只登記一處）；匯出 `LS_KEYS`、`buildPayload`、`restoreEmptyKeys` 供測試。行為不變：本機有資料就不被雲端覆蓋。
- 測試 `cloudSync.test.ts`（5 項，mock firebase）：key 已登記、每個 key 都在 payload、往返還原、不覆蓋本機、舊雲端文件缺新欄位也能還原。
- Firestore 規則只做 uid 限制，不限欄位，不用改。
- 結果：100 通過、tsc ✅。
- commit：`P9/TASK-07: sync skill progress to cloud`

## [2026-11-04] P9/TASK-06b — GATE-A 通過 + Opus 審題修正
- 家長在審題頁看過 35 題，沒有發現問題（但自述英文不好，無法保證）。
- 為此加做一輪 Opus 5.5 審題（給它答案與中文解釋，專找第二答案、不自然句子、解釋錯誤）。列出 6 項，全部採用：
  - must-fix #28：stem 現在式與過去式混用 → 改成 "Ben ate too much, and now his stomach hurts."
  - #27：forehead／lay 太冷僻且說法不自然 → "Lucy's head hurts, so she needs to rest."，解釋改為 head + ache
  - #21：解釋「名詞前面要有 a 或 have」不精確 → 改為 have a headache／have a sore throat
  - #32：解釋把 stay still 說成「坐著不動」→ 分開說明 sit still／stay still
  - #30：swallows 對小學生太難 → eats or talks
  - #16：選正確句的 "every day" 不自然且多餘 → 整組拿掉
- 結果：100 通過、tsc ✅。
- 備註：審題與盲解的工具都是 Claude 系列，Gemini 額度用完時沒有跨廠牌的第二意見。
- commit：`P9/TASK-06b: fix drill items after audit`

## [2026-11-04] P9/TASK-08 — 練習畫面與串接
- 先查（待查項目已結案）：`parentAnalytics` 只依 `gameType` 與日期彙總（`errorRateByGameType`、`diagnoseByGameType`、`dailyStudyMinutes`），不依 `AnswerSource` 分流；所以新增 `AnswerSource 'drill'` 只是型別擴充，不破壞任何統計。作答時文法題記為 `grammar`、單字句子題記為 `sentence_cloze`，家長的弱點診斷與學習時間會自然納入。
- 動作：
  - `components/MistakeDrill.tsx`：開始畫面（題數、約幾分鐘）→ 逐題作答 → 答對 0.9 秒自動下一題、答錯顯示正確答案與中文解釋後按「知道了」→ 結算（答對題數、金幣 +10／題、紙花）；無題時顯示「今天都完成了」。答錯時句子填的是正確答案，不顯示錯誤句子。中途離開，剩下的題目下次還在。
  - `SmartDailyReview.tsx`：每日單字用 `getPlannedTargetWords()` 排除今天錯題練習會出現的字；結算畫面若今天還有題，顯示「接著練錯題（N 題）」。
  - `App.tsx`：主畫面新卡片「錯題小挑戰」（顯示今天剩幾題）；`applySeedWordMistakes()` 在雲端還原之後才執行（避免新裝置的空資料被這幾個降箱字「填滿」而擋住雲端還原）。
  - `answerLog.ts`：`AnswerSource` 加 `'drill'`；測試確認含 `:`、`#` 的 id 往返正確。
- 瀏覽器實測（Vite dev server，清空 localStorage 後）：
  - 主畫面出現卡片與「今天 8 題」；種子字套用（`vocab_seeded_mistakes` = 2026-11-04）。
  - 完整做完 8 題（故意答錯 1 題：看到解釋）→ 7/8、+70 金幣；技能進度、單字 `needsContext`（cold/sick/cough/still/traffic jam 共 6 個 id 全部降到第 1 箱）、作答紀錄（drill:… 的 grammar／sentence_cloze）都正確寫入；回主畫面顯示「今天都完成了」。
  - 每日複習 15 字與計畫中的 cold/sick/headache/still 沒有重疊；跑完整個每日複習（學習→選中文→填空 12/12）後結算畫面出現「接著練錯題（8 題）」，點進去可開始。
  - 手機寬度（375px）版面正常；console 沒有錯誤。
- 限制：這次是用腳本代答，沒有真人在手機上實際操作（那是 GATE-B）。
- 注意：種子字當天先被降箱（今天算「答錯過」），所以今天在錯題練習答對它們不會升箱，從明天起才算——這是套用「同日先錯再對不升箱」的結果。
- commit：`P9/TASK-08: mistake drill screen and wiring`

## [2026-11-04] P9/TASK-11 — 匯入流程固化（TASK-09、TASK-10 選做，暫不做）
- 動作：`validate_import.cjs` 新增 `skills` 檢查（必須是非空陣列、每個 id 都登記在 `skills.ts`）；新增 `IMPORT_CHECKLIST.md`（寫錯題 → 種子字 → 變化題 → 驗證 → 盲解與審題 → 提交，含「不要改 APP_VERSION」）。
- 驗證：目前 176 筆全過；故意把一筆技能改成未登記的 `V.NOPE`，驗證會擋下並指出 `2026-11-04.ts[5]`，還原後再次全過。
- 決策：TASK-09（填空題單字邊界、易混字干擾項）與 TASK-10（弱點排行）為選做，沒有被要求，先不做，避免在第一版加範圍；之後有需要再開。
- commit：`P9/TASK-11: import checklist and skills validation`

## [2026-11-04] 關閉大考快速入口（家長要求：大考結束，CLIL 持續更新）
- 動作：`ExamReviewSet` 加選填 `closed`；10/28 大考複習設為 `closed: true`，`getActiveExamReviewSets` 排除。主畫面橫幅與「綜合每日挑戰」裡的大考選項（兩處都用這個函式）一起消失；資料保留在檔案裡，之後新大考只要新增一筆。
- CLIL（`TOPIC_REVIEW`）完全沒動，之後仍可照原流程新增章節。
- 測試 `examReviewSets.test.ts`：closed 的不顯示；沒 closed 的在寬限期（+7 天）內顯示、之後自動過期。
- commit：`Close the finished 10/28 exam review entry`

## [2026-11-04] P9/TASK-09 — 填空題小修（部分完成）
- 做了：
  1. `tryCreateCloze` 精確比對加單字邊界：cough 不再在 "coughing" 裡被挖成 `_____ing`，cold 不會在 "scolded" 裡被找到。不使用 look-behind（舊版 Safari 不支援）。
  2. 變化形（複數、-ing、-s）改成整個字一起挖掉，不再留下 `_____s`；同時擴到片語與 "step(s)"、"raindrop(s)" 這類寫法。
  3. 把 5 個健康字（cold, cough, sick, stomachache, sore throat）各補 2 句已驗證的例句到 `EXTRA_SENTENCES`（之前 serverData 這些字只有 cold/cough 共用的一句，其餘幾乎沒有）；每句該字只出現一次，不洩漏答案。dizzy、headache 原本就有例句。
- 影響量測（全部單字庫共 3434 句，舊／新邏輯對照）：原本 165 句挖出來帶著黏住的尾巴（如 `_____s`、`_____ing`），現在全部乾淨；新增 9 句可用；只有 5 句原本就挖壞的（"ride the subway to..." 變成 `_____rk`、"listen to..." 變成 `_____assical` 等）不再出題，沒有其他字失去填空題。
- 沒做（刻意）：「易混字組的字，干擾項改從同組挑」。填空題的句子（例如 "I had a ___ yesterday… coughing"）常常同組的字也放得進去，改成同組干擾項會製造第二個正確答案；這是錯題練習最怕的問題。同組辨析已經由錯題小挑戰負責。
- 結果：108 通過、tsc ✅。
- commit：`P9/TASK-09: cloze word boundary and health sentences`

## [2026-11-04] P9/TASK-10 — 弱點排行（家長專區）
- 動作：新增 `mistakeBook/weakness.ts`（`getSkillWeaknesses`：依錯題的 `skills` 統計考卷錯幾次、最近一次考卷日期、練習狀態［還沒練／練習中／已畢業］、最近答對率；排序為未畢業在前、錯得多在前、答對率低在前）；`MistakeBookView` 加分頁「錯題列表／弱點排行」，弱點排行底下列出容易搞混的字（由 `getConfusionPairs` 推算，如「cold 被選成 sick：2 次」）。只給家長看，不做週報。
- 只統計有 `skills` 標記的錯題（2026-11-04 起）；更早的錯題不參與。
- 測試 `weakness.test.ts`（5 項）；瀏覽器實測：家長工具 → 錯題本 → 弱點排行，顯示 12 個技能，練習狀態與答對率和剛才的練習結果一致；主畫面上的 10/28 大考橫幅確認已消失。
- 結果：113 通過、tsc ✅、build ✅。
- commit：`P9/TASK-10: weakness ranking tab`

## [2026-11-04] UI — 重排遊戲畫面，平板不再留白、怪獸與字放大（家長回饋）
- 問題（家長在平板上看）：上次為了讓畫面「不用捲動」，用「螢幕高度分級」把每個東西縮小，又限制在中間一欄；結果橫向平板上左右留白很多、怪獸圖和字都變小。另外 DailyChallenge 的詞性顯示成 `((v.))`（括號重複）。
- 做法：
  - `index.html`：把高度分級的 `--fit-*` 設定改成**連續**的 `clamp()`（依可視高度 dvh 與寬度 vw 取比例），橫向與直向各一組；拿掉手機專用的固定尺寸；平板不再縮小根字級（只有高度 < 560px 的橫向小視窗才縮）。
  - 橫向（平板、電腦、手機橫放）：學習畫面改左右兩欄（左：怪獸，約佔畫面高度 6 成；右：單字、詞性、中文、例句），測驗畫面左右兩欄各撐滿高度，選項按鈕變大（高度上限 13rem，避免大螢幕出現巨大空白按鈕）。直向：維持上下排列但尺寸跟著螢幕走。
  - `DailyChallenge`（學習／認字／拼字／魔法封印／例句）、`LetterTiles`（字母磚放大，字多時分段縮小）、`SmartDailyReview`（單字島每日抓寶與關卡：原本沒有怪獸、提示徽章被卡片蓋住，現在加上怪獸並用同一套版面）、`MistakeDrill`（錯題小挑戰）全部套用。答錯時錯題小挑戰的怪獸在短螢幕與直向會隱藏，讓解釋有位置。
- 實測（Vite dev server，用 iframe 設定真實視窗大小，逐畫面量 scrollHeight − clientHeight）：1180×760、1180×820、1024×690、1366×1024、1440×900、768×1024、820×1180、844×390（手機橫放）、390×844、360×640：DailyChallenge 五個畫面與錯題小挑戰（含答錯解釋）全部**零溢出**；上次記錄的「手機橫放仍溢出 20–40px」也一併解決。1180×760 的怪獸高度 128px → 約 300px（學習畫面約 425px）。單字島每日抓寶在 1180×760 實測學習、選中文、例句、結算畫面零溢出。
- 限制：只在桌面瀏覽器模擬實際尺寸，沒有拿真實 iPad 量；`dvh` 需要 iOS Safari 15.4 以上。
- 結果：113 通過、tsc ✅、build ✅。
