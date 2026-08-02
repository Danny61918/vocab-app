# P6 — 雲端同步（骨架）

> 狀態：🟡 骨架。進入本階段時展開為五件式。
> 對應 spec：§4.5、TASK-05、TASK-06、RC-4。相依：P1。風險：**高**。

## 範圍摘要
- Firebase：Firestore + Anonymous Auth（Spark 免費層）。
- 新增 `services/cloudSync.ts`；結構 `users/{uid}/mastery/{wordId}`、`.../answerLog/{autoId}`、`.../progress/main`。
- 同步：localStorage 為快取、Firestore 為 source of truth；啟動拉雲→merge（lastReviewDate 新者勝）→寫回；作答後先本地再 debounce 5s 背景寫雲；離線用 SDK 內建持久化。
- Security Rules：僅 `request.auth.uid == userId`。
- `srsStorage.ts`/`storage.ts` load/save **簽名不變**，內部改 sync-aware（元件層零改動）。

## 對應 E2E
- **瀏覽器（延後 + 使用者手動驗收）**：E2E-6（斷網完成 15 題 → 恢復後 Firestore 與本地一致）。

## GATE（高風險，人工確認）
- Firebase 專案建立 + 帳務主體（個人帳號、Spark）。
- Security Rules 部署（依 sdd skill：Rules 變更一律人工確認）。

## HANDOFF IN
- P1 的 `VocabMastery` 模型（雲端 schema 對應）；P2 answerLog（全量上雲）。

## HANDOFF OUT
- （待填）
