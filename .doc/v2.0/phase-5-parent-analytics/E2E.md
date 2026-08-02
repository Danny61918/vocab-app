# P5 — 家長診斷 · E2E

## Vitest 邏輯層
| ID | 情境 | 期望 |
|----|------|------|
| **E2E-p5-1** | diagnoseByGameType 標籤/weak | 每 gameType 帶正確中文 label；attempts≥5 且 errorRate≥0.34 → weak=true，否則 false |
| **E2E-p5-2** | dailyStudyMinutes 加總 | 同日多筆 responseMs 加總 → 分鐘數正確、依日期分組 |
| **E2E-p5-3** | getOverdueWords | 只回 dueDate≤now 的字、daysOverdue 正確、依逾期天數降冪 |

## 手動（使用者）
- 長按標題 ~1.5s 解鎖家長面板；孩子端未長按看不到。
- 面板無排名/退步警示；tone 中性。

通過條件：`npx vitest run` 全綠、tsc、build、P1/P2 無回歸。
