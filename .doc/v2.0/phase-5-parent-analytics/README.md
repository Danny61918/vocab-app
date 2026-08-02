# P5 — 家長診斷（骨架）

> 狀態：🟡 骨架。進入本階段時展開為五件式。
> 對應 spec：§4.4、§4.6、TASK-07。相依：P2。風險：低。

## 範圍摘要
- `components/AnalyticsDashboard.tsx` 加不顯眼家長入口（如長按標題 3 秒）。
- 錯誤類型視圖（按 gameType 聚合 answerLog）：cloze 高→拼寫弱、sentence_cloze 高→語境弱、matching 高→中英對應弱。
- 內容：錯誤類型分佈、逾期字清單、每日投入時間。
- **孩子端不顯示任何錯誤統計**；家長頁不做排名/退步警示（產品最高原則）。

## HANDOFF IN
- P2 的 answerLog API 與 gameType 分類；P1 的逾期字（dueDate）。

## HANDOFF OUT
- （待填）
