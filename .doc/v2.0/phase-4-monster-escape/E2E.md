# P4 — 怪獸逃跑重設計 · E2E（Vitest 邏輯層）

前置：`unlockedMonsters` 含關卡 id；某關卡字設 `dueDate` 控制逾期。`DAY` from helpers。

| ID | 情境 | 動作 | 期望 |
|----|------|------|------|
| **E2E-5** | 逃跑保底（豁免） | `lastReviewCompletedDate = today` 後 `processForgottenEscapes({now,today})` | 回 `[]`（當日已複習，絕不逃跑） |
| **E2E-esc-1** | 遺忘觸發逃跑 | 關卡 1 某字 `now - dueDate >= 3*DAY`，未複習 | 回 `[1]`；`unlockedMonsters` 移除 1；`escapedMonsters` 含 1；`lastEscapeDate = today` |
| **E2E-esc-2** | 未達門檻不逃 | 關卡字逾期僅 2 天 | 回 `[]`；圖鑑不變 |
| **E2E-esc-3** | 單日 1 隻上限 | 兩個關卡皆遺忘 | 回長度 = 1（只逃 1 隻） |
| **E2E-esc-4** | 複習抓回 | `escapedMonsters=[1]`，`markReviewCompleted([關卡1的某字id])` | 回 `[1]`；1 回到 `unlockedMonsters`；`escapedMonsters` 不含 1；`lastReviewCompletedDate = today` |
| **E2E-esc-5** | 已逃當日不再逃 | `lastEscapeDate = today` | `processForgottenEscapes` 回 `[]` |

通過條件：`npx vitest run` 全綠、tsc、build、P1/P2 無回歸。

## HANDOFF → TASK-03b
邏輯就緒。UI 接線與文案待**使用者文案 tone GATE**後進行。
