# v2.0 開發日誌（DEVLOG）

Append-only 過程紀錄。用途：追蹤自主開發迴圈中發生的事、紅燈與修正，供事後覆盤。格式見 [WORKFLOW.md](./WORKFLOW.md#開發日誌devlogmd--可覆盤的稽核軌跡)。最新在最上方。

---

## [2026-08-03] P4/TASK-03a — 怪獸逃跑/抓回邏輯
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
