# P4 — 怪獸逃跑重設計 · TASKS

## TASK-03a — 逃跑/抓回邏輯（本 chunk）
**做什麼**（`services/srsStorage.ts`）：LevelProgress 加 `escapedMonsters`/`lastReviewCompletedDate`（`loadLevelProgress` 給預設）；實作 `processForgottenEscapes(deps?)`、`markReviewCompleted(reviewedWordIds, deps?)`（見 DESIGN）；刪除 dead `processSpontaneousEscapes`。
**驗收**：E2E-5 及 P4 邏輯測試綠、tsc、build、無回歸。

## TASK-03b — UI 接線 + 文案（下一步，需先過文案 GATE）
**做什麼**：`VocabAdventureMap` mount 呼叫 `processForgottenEscapes` 顯示非責備劇情；`SmartDailyReview` 完成呼叫 `markReviewCompleted` 播抓回慶祝。
**前置 GATE（使用者）**：逃跑/抓回文案 tone；是否向孩子顯示「逃跑」。
**驗收**：使用者手動驗收（UI/情緒 tone 機器測不準）。
