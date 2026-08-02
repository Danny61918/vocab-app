# P2 — Answer Log · TASKS

## TASK-04a — 資料層 `services/answerLog.ts`（本 chunk）
**做什麼**：依 DESIGN 實作 `AnswerRecord` 型別、`makeWordKey`/`parseWordKey`、`loadAnswerLog`/`logAnswer`（append + 環形 2000）/`errorRateByGameType`/`clearAnswerLog`。時間注入式，複用 `srsStorage.localYmd`。
**驗收**：E2E-log-1~4（見 E2E.md）綠、tsc、build、無回歸。

## TASK-04b — 四題型 UI 埋点（下一 chunk）
**做什麼**：`components/QuizArea.tsx`、`components/SmartDailyReview.tsx` 在作答判定處呼叫 `logAnswer`，計 `responseMs`，用 `makeWordKey` 帶 source。`GameType` enum → `AnswerGameType` 映射。
**驗收**：Vitest 映射純函式測試；`responseMs` 端到端行為 → 使用者手動驗收。
