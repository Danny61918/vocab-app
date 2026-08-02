# P1 — SRS 核心引擎 · TASKS

> 每個 task 是自足實作 brief（可交 sub-agent）。依 [WORKFLOW.md](../WORKFLOW.md)：紅→綠→tsc→build→自我 review→commit→DEVLOG。
> 目標檔案：`services/srsStorage.ts`、`types.ts`、`components/SmartDailyReview.tsx`、`components/VocabAdventureMap.tsx`。

---

## TASK-00 — 測試基建（Vitest + jsdom）

**做什麼**
- 加 devDeps：`vitest`、`jsdom`、`@vitest/coverage-v8`（先 `npm install`，node_modules 目前未安裝）。
- `package.json` scripts：`"test": "vitest run"`、`"test:watch": "vitest"`。
- `vitest.config.ts`：`environment: 'jsdom'`、`globals: true`。
- 測試輔助：`services/__tests__/helpers.ts` — 每測前 `localStorage.clear()`；提供 `fixedDeps({ now, today, rng })` 產生確定性 `SrsDeps`（`rng` 用簡單種子 LCG）。

**驗收**
- `npx vitest run` 能跑（可先放一個 `expect(true).toBe(true)` smoke test 綠）。
- `npx tsc --noEmit`、`npx vite build` 均過。

---

## TASK-01 — 資料模型改造 + 遷移 + 注入式接縫

**做什麼**（`services/srsStorage.ts`）
- 改 `VocabMastery` 為 DESIGN §1 新欄位；加 `export const BOX_INTERVALS = [0,1,3,7,14,30]`。
- 加接縫：`SrsDeps{now?,today?,rng?}`、`localYmd(ts)`、`shuffle<T>(arr, rng)`、內部 `resolveDeps(deps)` 補預設。
- 加 `migrateMasteryData(raw): Record<string,VocabMastery>`：舊格式（有 `masteryLevel` 無 `boxLevel`）依映射 0→0/1→2/2→4 轉換（DESIGN §4）；`loadMasteryData` 載入後跑遷移並寫回。
- **不得觸碰** `LevelProgress` 相關函式。

**驗收（測試）**
- E2E-7：餵入舊格式樣本（含 masteryLevel 0/1/2、consecutiveCorrect、lastReviewDate），遷移後 boxLevel 正確、無欄位遺失、筆數不變。
- `BOX_INTERVALS[boxLevel]` 與 `intervalDays` 一致。
- tsc + build 過。

---

## TASK-02 — 排程引擎重寫

**做什麼**（`services/srsStorage.ts`）
- 重寫 `updateWordMastery(wordId, isCorrect, deps?)` 依 DESIGN §3.1（跨日升級、同日不升、答錯退 box1+明日）。
- 重寫 `getDailyHuntWords(deps?)` 依 DESIGN §3.2（到期優先、≤10 到期 +5 新、逾期降冪、洗牌走 `rng`、硬上限 15）。
- 加 `isMastered(m): boolean`（boxLevel≥4 && consecutiveCorrectDays≥3）。
- 移除舊 `filter(masteryLevel < 2)`、12h buffer 邏輯。

**驗收（測試）**
- E2E-1 防假精通、E2E-2 間隔遞增(+1/+3/+7)、E2E-3 box5 回鍋、E2E-4 答錯降 box1、E2E-8 總量≤15（見 [E2E.md](./E2E.md)）。
- 全部用注入 `now/today/rng` 確定性驗證。
- tsc + build 過、TASK-01 測試無回歸。

---

## TASK-03 — 呼叫端相容

**做什麼**
- `grep -rn masteryLevel` 全庫；把 UI 對 `masteryLevel` 的讀取改為 `boxLevel` 或 `isMastered()`。
- `checkAndUnlockLegendaryMonsters` 的 masteredCount 來源改用 `isMastered` 計數。
- 確認 `components/SmartDailyReview.tsx`、`components/VocabAdventureMap.tsx` 編譯與執行不報錯（呼叫端不傳 deps 亦可）。

**驗收**
- tsc + build 過；既有測試全綠。
- 手動冒煙（Browser MCP）：Daily Hunt 能出 15 字、答題後 mastery 更新、圖鑑數字合理。（此為 AI 自查冒煙，非使用者最終驗收）

---

## Phase 收尾

- 全 task DoD → 跑完整 E2E.md → 自我 `/code-review` → 更新 OVERVIEW 進度表 → DEVLOG phase 收尾筆 → tag `v2.0-p1-done`。
- **待使用者手動驗收清單**：無 device-only 情境（P1 全可自動化）；使用者最終確認 BOX_INTERVALS 是否需依段考微調。
