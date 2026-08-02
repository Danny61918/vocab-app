# P2 — Answer Log · REQUIREMENTS

> 對應 spec §4.4、TASK-04、RC-5。相依：P1。風險：低。

## 背景
現行無逐題作答紀錄（RC-5），家長無法區分錯誤類型（拼寫 / 語意 / 語境）。P2 建立作答紀錄資料層，供 P5 家長診斷與 P3 亂猜偵測使用。

## 功能需求
- **FR-1**：每題作答即 append 一筆 `AnswerRecord{wordId,gameType,correct,responseMs,date}`。
- **FR-2**：本地環形緩衝，最多保留 **2000** 筆（超過丟最舊）。
- **FR-3**：`wordId` 能同時容納兩套資料集（SRS string id、四題型 numeric id）——見 [ADR-002](./ADR-002-wordid-composite-key.md)。
- **FR-4**：提供聚合查詢：**按 gameType 的錯誤率**（給 P5 家長視圖）。

## 非功能需求
- **NFR-1**：資料層 UI-agnostic、純邏輯，可 Vitest 確定性測試（注入 now/today）。
- **NFR-2**：孩子端永不顯示錯誤統計（產品最高原則）；聚合僅供家長頁。

## Out of Scope（本階段）
- 四題型 UI 埋点（`responseMs` 計時接線）列為 TASK-04b，本 chunk 先交資料層 + 測試。
- 亂猜偵測（responseMs<1200）屬 P3 TASK-11(d)。
- Firestore 全量上雲屬 P6。

## GATE
- 無外部/決策 gate；wordId 方案由 ADR-002 定案。
