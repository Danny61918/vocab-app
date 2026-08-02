# P2 — Answer Log · E2E（Vitest 邏輯層）

| ID | 情境 | 動作 | 期望 |
|----|------|------|------|
| **E2E-log-1** | append + 日期 | `logAnswer({wordId,gameType,correct,responseMs}, {now})` | 存入一筆，`date == localYmd(now)`，欄位正確 |
| **E2E-log-2** | 複合 key | `makeWordKey('server',802)` / `makeWordKey('srs','knight_a1b2c')` | `"server:802"` / `"srs:knight_a1b2c"`；`parseWordKey` 可還原 source/id |
| **E2E-log-3** | 環形緩衝 2000 | 連續 append 2001 筆 | 長度恰 2000、最舊一筆被丟、最新一筆保留 |
| **E2E-log-4** | 錯誤率聚合 | 造多筆不同 gameType 的對/錯 | `errorRateByGameType` 每類 attempts/errors/errorRate 正確 |

通過條件：`npx vitest run` 全綠、tsc、build 通過、P1 測試無回歸。

## HANDOFF → P3 / P5
- P5 家長視圖直接用 `errorRateByGameType`。
- P3 亂猜偵測(11d) 會讀 `responseMs`（TASK-04b 埋点後才有真值）。
