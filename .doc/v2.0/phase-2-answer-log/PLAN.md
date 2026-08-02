# P2 — Answer Log · PLAN

| # | 里程碑 | 產出 | Task |
|---|--------|------|------|
| M1 | 資料層 | `services/answerLog.ts`（key/load/log/aggregate）+ 測試 | TASK-04a |
| M2 | UI 埋点 | QuizArea + SmartDailyReview 呼叫 `logAnswer`（含 responseMs 計時） | TASK-04b |

順序：M1（本 chunk）→ M2（下一 chunk，需在真 UI 驗證計時，部分靠手動）。

退出條件：每里程碑達 Task DoD（測試綠 + tsc + build + commit）。M2 的 responseMs 端到端行為列入使用者手動驗收。
