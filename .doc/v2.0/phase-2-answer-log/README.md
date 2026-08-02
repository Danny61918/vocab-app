# P2 — Answer Log（骨架）

> 狀態：🟡 骨架。進入本階段時展開為五件式（REQUIREMENTS/DESIGN/PLAN/TASKS/E2E）。
> 對應 spec：§4.4、TASK-04、RC-5。相依：P1。風險：低。

## 範圍摘要
- 新增 `services/answerLog.ts`：`AnswerRecord{wordId,gameType,correct,responseMs,date}`；每題作答即 append；本地環形緩衝 ≤2000 筆。
- 四種題型元件埋點（multiple_choice/matching/cloze/sentence_cloze）。

## 待展開時需決的關鍵設計
- **wordId 型別橋接**：SRS 側 string id（newVocabData）vs 四題型 serverData numeric id。answerLog 要能同時容納 → 設計統一 key 策略（如 `source:id`）。

## HANDOFF IN（來自 P1）
- 使用 P1 的 `VocabMastery`/`isMastered` 與 `SrsDeps` 注入慣例；沿用 Vitest 邏輯層測試。

## HANDOFF OUT
- （待本階段完成後填寫：answerLog API 供 P5 家長診斷聚合、P3 亂猜偵測(11d) 使用。）
