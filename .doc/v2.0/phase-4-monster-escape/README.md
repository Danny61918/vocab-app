# P4 — 怪獸逃跑重設計（骨架）

> 狀態：🟡 骨架。進入本階段時展開為五件式。
> 對應 spec：§4.3、TASK-03、RC-3。相依：P1。風險：中。

## 範圍摘要
- `processSpontaneousEscapes`（隨機 2~5 逃跑）→ `processForgottenEscapes`。
- 觸發：某關卡有字「逾期 ≥3 天未複習」→ 該關卡怪獸逃跑。
- 抓回：完成含該關卡逾期字的 Daily Hunt → 怪獸歸位 + 慶祝。
- 保底：**單日最多 1 關卡逃跑**；當日已完成複習則豁免（絕不「有練還被罰」）。
- 文案非責備（GATE：tone 需確認）。

## 對應 E2E
- Vitest：E2E-5（當日已複習 → 不觸發任何逃跑）。

## GATE
- 逃跑文案 tone（不得責備）。

## HANDOFF IN
- P1 的 `dueDate`/逾期天數判定。

## HANDOFF OUT
- （待填）
