# P4 — 怪獸逃跑重設計 · DESIGN

> 依 REQUIREMENTS。檔案：`services/srsStorage.ts`（邏輯）、`components/VocabAdventureMap.tsx`（UI，TASK-03b）。

## LevelProgress 擴充（相容，預設值）
```ts
export interface LevelProgress {
  highestUnlockedLevel: number;
  unlockedMonsters: number[];
  lastEscapeDate?: string;            // 'YYYY-MM-DD' 單日 1 隻上限
  escapedMonsters?: number[];         // 已逃跑、待抓回的關卡 id
  lastReviewCompletedDate?: string;   // 'YYYY-MM-DD' 當日已複習 → 豁免
}
```
常數 `FORGET_THRESHOLD_DAYS = 3`。關卡 → 單字用既有 `getWordsForLevel(level)`（10 字/關）。

## 邏輯（純函式，注入 now/today）
### `processForgottenEscapes(deps?): number[]`
1. 若 `lastReviewCompletedDate === today` → 回 `[]`（**當日已複習豁免**，FR-3）。
2. 若 `lastEscapeDate === today` → 回 `[]`（**單日 1 隻上限**）。
3. 找「forgotten 關卡」：`unlockedMonsters` 中 id ≤ 20 且該關任一字 `now - dueDate >= 3*DAY`。
4. 無 → 回 `[]`。有 → 取**第一個**（最低關卡，確定性）逃跑：從 `unlockedMonsters` 移除、加入 `escapedMonsters`、`lastEscapeDate = today`、存檔、回 `[該id]`。

### `markReviewCompleted(reviewedWordIds: string[], deps?): number[]`
- 設 `lastReviewCompletedDate = today`。
- 對每個 `escapedMonsters` 關卡：若 `reviewedWordIds` 含該關任一字 → 抓回（移出 escaped、加回 unlockedMonsters）。
- 回傳被抓回的關卡 id 陣列（供 UI 播慶祝）。

## 移除
刪除 dead code `processSpontaneousEscapes`（無呼叫端）。

## UI 接線（TASK-03b，待文案 GATE）
- `VocabAdventureMap` mount 時呼叫 `processForgottenEscapes`，有逃跑 → 顯示非責備劇情訊息。
- 每日複習完成（`SmartDailyReview` finish）呼叫 `markReviewCompleted(當場複習到的 word.id[])`，有抓回 → 慶祝動畫。
