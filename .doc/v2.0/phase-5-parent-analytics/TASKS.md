# P5 — 家長診斷 · TASKS

## TASK-07a — 診斷純函式（可測）
`answerLog.ts`：`GAME_TYPE_DIAGNOSIS`、`diagnoseByGameType(log?,opts?)`、`dailyStudyMinutes(log?)`。
`srsStorage.ts`：`OverdueWord`、`getOverdueWords(deps?)`。
驗收：E2E-p5-1~3 綠、tsc、build、無回歸。

## TASK-07b — 家長面板 UI
`AnalyticsDashboard.tsx`：標題長按 1.5s 解鎖 `家長診斷` 面板（錯誤類型診斷 / 逾期字清單 / 每日投入時間）。孩子端未解鎖不顯示、無排名。
驗收：Browser 冒煙（我自查）＋使用者最終手動確認 tone/位置。
