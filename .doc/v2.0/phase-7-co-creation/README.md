# P7 — 共創（Co-Creation）（骨架）

> 狀態：🟡 骨架。進入本階段時展開為五件式。
> 對應 spec：TASK-09。相依：P1。風險：中。**時效約束：她的創作必須 48 小時內出現在 app**。

## 範圍摘要
- (a) **怪獸上傳**：她的畫拍照 → 裁切/去背 → 進 `public/monsters` 與圖鑑；圖鑑標示「設計師：（女兒的名字）」。
- (b) **我的例句**：她造的句子進 sentence_cloze 題庫並標記作者。
- (c) **許願清單頁**：她提的功能逐項實現，完成後顯示「這是你許願的 ✔」。

## 對應 E2E
- **瀏覽器/手動（延後 + 使用者手動驗收）**：E2E-9（上傳一張怪獸圖 + 一個例句 → 48h 內圖鑑出現該怪獸含署名、sentence_cloze 抽得到該例句）。

## 設計注意
- 沿用既有 `scripts/addMonster.cjs`、`services/exampleSentencesData.ts`、`services/monsterData.ts` 的資料慣例。

## HANDOFF IN
- P1 完成；圖鑑資料模型（`monsterData.ts` / `MonsterGallery.tsx`）。

## HANDOFF OUT
- （待填）
