# P1 — SRS 核心引擎 · PLAN

> 依 [DESIGN.md](./DESIGN.md)。開發依 [WORKFLOW.md](../WORKFLOW.md) 自主迴圈。

## 里程碑

| # | 里程碑 | 產出 | 對應 Task |
|---|--------|------|-----------|
| M0 | 測試基建 | 裝 Vitest + jsdom、`test` script、`vitest.config`、fake localStorage helper | TASK-00 |
| M1 | 模型 + 遷移 | 新 `VocabMastery`、`BOX_INTERVALS`、`migrateMasteryData`、注入式接縫（`now/today/rng`、`localYmd`、`shuffle`） | TASK-01 |
| M2 | 排程引擎 | 重寫 `updateWordMastery`（跨日）、`getDailyHuntWords`（到期優先）、`isMastered` | TASK-02 |
| M3 | 呼叫端相容 | `SmartDailyReview.tsx`、`VocabAdventureMap.tsx` 不報錯、精通顯示改用新定義 | TASK-03 |
| M4 | 驗收 | E2E-1~5/7/8 全綠、tsc、build、自我 review | 見 E2E.md |

順序：M0 → M1 → M2 → M3 → M4。M1 完成後 M2 才有型別基礎；M3 依賴 M2 的新 API。

## 里程碑退出條件

- 每個里程碑達 **Task DoD**（測試綠 + tsc + build + commit）。
- M4 達 **Phase DoD**：全自動 E2E 綠 + 自我 code-review + HANDOFF + 打 tag `v2.0-p1-done`。

## 風險與緩解

- **遷移出錯 → 圖鑑/進度遺失（NFR-2 硬約束）**：遷移前先在測試以「真實舊格式樣本」覆蓋（E2E-7）；遷移不觸碰 `LevelProgress`。
- **同場刷精通回歸**：E2E-1 鎖死同日不升級。
- **呼叫端隱性依賴 `masteryLevel`**：M3 開始前先 grep 全庫 `masteryLevel` 用法，逐一改為 `boxLevel`/`isMastered`。
