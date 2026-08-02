# P1 — SRS 核心引擎 · DESIGN

> 依 [REQUIREMENTS.md](./REQUIREMENTS.md)。決策理由見 [ADR-001](./ADR-001-leitner-fixed-intervals.md)。
> 目標檔案：`types.ts`、`services/srsStorage.ts`（呼叫端 `components/SmartDailyReview.tsx`、`components/VocabAdventureMap.tsx`）。

## 1. 資料模型（`services/srsStorage.ts` 的 `VocabMastery`）

```ts
export interface VocabMastery {
  wordId: string;                  // 對應 newVocabData 的 string id
  boxLevel: number;                // 0..5，Leitner box
  intervalDays: number;            // 由 boxLevel 導出：BOX_INTERVALS[boxLevel]
  dueDate: number;                 // timestamp，下次應複習日
  consecutiveCorrectDays: number;  // 跨日連對次數（同日多次只計一次）
  lastCorrectDate?: string;        // 'YYYY-MM-DD'，跨日判定用
  lastReviewDate?: number;         // timestamp
}

export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30]; // 天；index = boxLevel
```

`LevelProgress` 維持不變。localStorage key `vocab_srs_mastery` 沿用。

## 2. 注入式接縫（可確定性測試，NFR-4）

為了讓跨天/快轉/洗牌可被 Vitest 確定性驗證，時間與亂數以**非破壞性**方式注入——預設等同現行真實行為：

```ts
export interface SrsDeps {
  now?: number;              // 預設 Date.now()
  today?: string;           // 預設 localYmd(now)
  rng?: () => number;       // 預設 Math.random
}
// 排程函式簽名（新增選填參數，不破壞現有呼叫）
updateWordMastery(wordId: string, isCorrect: boolean, deps?: SrsDeps): void
getDailyHuntWords(deps?: SrsDeps): VocabWord[]
```

- 提供 `localYmd(ts): string`（本地 'YYYY-MM-DD'）作為跨日判定唯一來源。
- 洗牌抽出 `shuffle<T>(arr, rng)`，取代現行 `sort(() => 0.5 - Math.random())`（後者本就有偏差，一併修掉）。

## 3. 排程規則

### 3.1 答題後更新 `updateWordMastery(wordId, isCorrect, deps)`
令 `today = deps.today`，`m = 現有或新建{boxLevel:0, consecutiveCorrectDays:0, dueDate: now}`。

- **答對且 `today !== m.lastCorrectDate`（跨日）**：
  `consecutiveCorrectDays += 1`；`boxLevel = min(boxLevel+1, 5)`；`intervalDays = BOX_INTERVALS[boxLevel]`；`dueDate = now + intervalDays*DAY`；`lastCorrectDate = today`。
- **答對但同日重複**：只更新 `lastReviewDate`，**不升級**（防同場刷精通 → E2E-1）。
- **答錯**：`boxLevel = 1`；`consecutiveCorrectDays = 0`；`intervalDays = BOX_INTERVALS[1] = 1`；`dueDate = now + 1*DAY`（明天）。（E2E-4）
- 一律更新 `lastReviewDate = now`，寫回 localStorage。

> 註：spec §4.2 先寫「答錯 boxLevel-1」後修正為「一律退回 box1」。本設計採**修正版：答錯退回 box1**。

### 3.2 每日選字 `getDailyHuntWords(deps): VocabWord[]`
1. 對 `vocabData` 每字取 mastery（無則視為新字 `boxLevel` 不存在、`dueDate` 未定）。
2. **到期字**：有 mastery 且 `dueDate <= now`（含 box5 回鍋字）→ 按「逾期天數」**降冪**（越久沒複習越前面）。取前 **10**。
3. **新字**：從未有 mastery 的字，按 `vocabData` 原順序取 **5**。
4. `selected = 到期字(≤10) + 新字(≤5)`。
5. 若仍不足且總數 < 15 → 用 `rng` 洗牌補其他字。
6. **總量硬上限 15**（NFR-1、E2E-8）。回傳前用 `shuffle(selected, rng)`。

### 3.3 精通顯示（不移除排程，FR-3）
`isMastered(m) = m.boxLevel >= 4 && m.consecutiveCorrectDays >= 3`。僅供 UI 顯示徽章與計數（`checkAndUnlockLegendaryMonsters` 的 masteredCount 改用此定義）。**排程永不因精通排除**；box5 靠 `dueDate` 每 30 天自然回鍋（E2E-3）。

## 4. 遷移 `migrateMasteryData()`（FR-6、NFR-2）

啟動時（`loadMasteryData` 內或其呼叫前）偵測舊格式並就地轉換，**無損**：

| 舊 `masteryLevel` | 新 `boxLevel` |
|---|---|
| 0 | 0 |
| 1 | 2 |
| 2 | 4 |

- 判定舊格式：物件有 `masteryLevel` 而無 `boxLevel`。
- 轉換：`boxLevel = map(masteryLevel)`；`intervalDays = BOX_INTERVALS[boxLevel]`；`consecutiveCorrectDays = min(舊 consecutiveCorrect, 3)`；`lastReviewDate` 保留；`dueDate = (lastReviewDate ?? now) + intervalDays*DAY`；`lastCorrectDate` 由 `lastReviewDate` 導出（若有）。
- 遷移只跑一次（全部轉換後寫回即為新格式，判定條件自然不再命中）。
- `LevelProgress`（圖鑑 `unlockedMonsters`）**完全不動** → 圖鑑無損。

## 5. 呼叫端相容（FR-7）

- `SmartDailyReview.tsx`：目前用 `getDailyHuntWords()` / `updateWordMastery()` → 簽名新增選填 deps，**現有呼叫零改動**。若 UI 有讀 `masteryLevel` 顯示，改讀 `boxLevel` 或 `isMastered()`（實作時 grep 確認）。
- `VocabAdventureMap.tsx`：用 `loadLevelProgress` / `processSpontaneousEscapes` 等 → 本階段不動逃跑（P4），僅確認不因模型改動報錯。

## HANDOFF → PLAN / TASKS

里程碑見 [PLAN.md](./PLAN.md)；可交付實作 brief 見 [TASKS.md](./TASKS.md)；驗收見 [E2E.md](./E2E.md)。實作前需求 GATE：遷移映射確認（見 REQUIREMENTS §5）。
