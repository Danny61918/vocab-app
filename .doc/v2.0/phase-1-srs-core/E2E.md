# P1 — SRS 核心引擎 · E2E

> 全部為 **Vitest 邏輯層**、以注入式 `now/today/rng` 確定性驗證。無 device-only 情境。
> 常數：`DAY = 86400000`。`fixedDeps` 見 TASK-00 helper。

| ID | 情境 | 前置 | 動作 | 期望 |
|----|------|------|------|------|
| **E2E-1** | 防假精通（同場） | 新字 wordX | 同一天對 wordX 連續 `updateWordMastery(correct)` 3 次（today 不變） | `boxLevel` 只 +1、`consecutiveCorrectDays == 1`、`lastReviewDate` 有更新 |
| **E2E-2** | 間隔遞增 | 新字 wordX | 連續三天各答對一次（day D、D+1、D+2，today 各異） | `dueDate - now` 依序 ≈ +1、+3、+7 天（BOX_INTERVALS[1..3]） |
| **E2E-3** | box5 維護回鍋 | wordX 已 `boxLevel=5`、`dueDate = now + 30d` | 快轉 `now += 30d` 後 `getDailyHuntWords` | wordX 出現在回傳清單（精通字未被排除） |
| **E2E-4** | 答錯降級 | wordX 已 `boxLevel=3` | `updateWordMastery(wrong)` | `boxLevel==1`、`consecutiveCorrectDays==0`、`dueDate ≈ now + 1d` |
| **E2E-7** | 遷移無損 | localStorage 存舊格式（masteryLevel 0/1/2 各數筆 + consecutiveCorrect + lastReviewDate） | `loadMasteryData()` | boxLevel 映射 0→0/1→2/2→4、筆數不變、無欄位遺失、`LevelProgress` 未受影響 |
| **E2E-8** | 總量約束 | 令大量字皆到期（>15） | `getDailyHuntWords` | 回傳長度 **恰 ≤ 15**；到期字 ≤10、新字 ≤5 |
| **E2E-5**† | 逃跑保底（前置檢查） | — | 本階段不改逃跑，僅斷言 `processSpontaneousEscapes` 仍可呼叫不炸 | 不拋錯（真正重設計在 P4） |

† E2E-5 完整驗收在 P4；此處僅回歸保護。

## 通過條件（Phase DoD 對應）

- 上表全綠（`npx vitest run`）。
- `npx tsc --noEmit`、`npx vite build` 通過。
- 無既有測試回歸。

## HANDOFF → P2

P1 完成後，`VocabMastery` 新模型與 `services/srsStorage.ts` API（含 `SrsDeps` 注入）即為 P2/P3/P4 的基礎。P2 Answer Log 需注意 wordId 為 string（newVocabData 側）與 serverData numeric id 的橋接。
