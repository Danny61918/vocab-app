# P1 — SRS 核心引擎 · REQUIREMENTS

> 階段：Phase 1 | 對應 spec：§4.1–4.2、TASK-01/02、RC-1/RC-2、E2E-1~4/7/8
> 相依：無（v2.0 基礎，其餘階段皆依賴本階段的資料模型）

## 1. 背景

現行 `services/srsStorage.ts` 是「假 SRS」：

- **RC-1 假間隔**：`getDailyHuntWords()` 用「12 小時 buffer」全量重出未精通字，無遞增間隔 → 每日 massed practice、疲勞、無「臨界點喚醒」。
- **RC-2 假精通（成績退步主嫌）**：`updateWordMastery()` 的 `consecutiveCorrect >= 3` 可在**同一場遊戲內**達成即畢業；`masteryLevel >= 2` 被 `getDailyHuntWords` 的 `filter(masteryLevel < 2)` **永久排除** → 短期記憶被誤判為長期，畢業字永不回鍋，段考時已遺忘。

## 2. 功能需求（Functional）

- **FR-1 真到期日 SRS**：每個字有 `dueDate`，只有 `dueDate <= now` 才進入當日複習。間隔由 Leitner box 導出遞增級距。
- **FR-2 跨日精通判定**：答對只有在「與 `lastCorrectDate` 不同日」時才升級；同日重複答對不升級（杜絕同場刷精通）。
- **FR-3 精通不等於移除**：`boxLevel >= 4 && consecutiveCorrectDays >= 3` 顯示為「精通」，但**永不從排程移除**；box 5 的字每 30 天維護回鍋一次。
- **FR-4 答錯降級**：答錯一律退回 `boxLevel = 1`、`consecutiveCorrectDays = 0`、`dueDate = 明天`。
- **FR-5 到期優先選字**：`getDailyHuntWords` 先撈到期字（含 box5 回鍋），按逾期天數降冪；上限 10 到期 + 5 新字；不足才補其他隨機字。
- **FR-6 舊資料遷移**：啟動時把舊 `VocabMastery{masteryLevel,consecutiveCorrect}` 無損映射到新模型（`masteryLevel` 0→box0、1→box2、2→box4）。
- **FR-7 呼叫端相容**：`SmartDailyReview.tsx`、`VocabAdventureMap.tsx` 不因模型改動而壞掉（load/save/選字介面維持可用）。

## 3. 非功能需求（Non-Functional）

- **NFR-1 每日總量 ≤ 15**（硬約束，不增加每日負擔）。
- **NFR-2 遷移無損**：孩子現有圖鑑與進度**絕不遺失**（最高優先）。
- **NFR-3 可解釋性**：用固定 Leitner 級距，不上 SM-2（見 [ADR-001](./ADR-001-leitner-fixed-intervals.md)）。
- **NFR-4 可確定性測試**：時間與亂數採注入式（`now`、`rng`），使 E2E-2/3（跨天/快轉）與洗牌可被 Vitest 確定性驗證。

## 4. Out of Scope（本階段不做）

- 不改四種題型的玩法與 UI（那是 P3）。
- 不動 Answer Log（P2）、怪獸逃跑（P4）、雲端（P6）。
- 不上雲：本階段仍寫 localStorage；cloudSync 於 P6 以「介面不變」方式接上。

## 5. GATE（進實作前）

- [ ] 遷移映射表確認：`masteryLevel` 0→0、1→2、2→4（box）。
- [x] BOX_INTERVALS 採預設 `[0,1,3,7,14,30]` 開發（最終手動測試可調，不擋流程）。

## HANDOFF → DESIGN

新模型欄位、排程規則、遷移函式與注入式接縫的具體設計見 [DESIGN.md](./DESIGN.md)。
