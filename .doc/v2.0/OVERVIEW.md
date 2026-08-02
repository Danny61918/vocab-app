# vocab-app v2.0 — 總覽（傘狀文件）

> 基準 spec：[SPEC_vocab_app_v2.md](./SPEC_vocab_app_v2.md)（唯讀）
> 開發工作流：[WORKFLOW.md](./WORKFLOW.md)（自主開發迴圈 + DoD + 版控）
> 分支：`feat/v2.0-srs`（完成 + 手動驗收後 merge 回 main）

## 為什麼做 v2.0

孩子成績退步，root cause 定位（見 spec §1）：假 SRS（RC-1）、假精通（RC-2，主嫌）、隨機懲罰（RC-3）、資料脆弱（RC-4）、無診斷（RC-5）。v2.0 以 **SDD** 流程逐階段修復。

**最高原則**：app 是為了讓她開心地學，不是評價她。舊資料遷移無損 = 硬約束。

## 架構前提（跨階段共用）

- **雙資料集**：SRS/圖鑑跑在 `services/newVocabData.ts`（`vocabData`、string id）；四題型在 `services/serverData.ts`（numeric id）。Answer Log 橫跨兩側，需處理 wordId 型別。
- srsStorage 呼叫端僅 `components/SmartDailyReview.tsx`、`components/VocabAdventureMap.tsx`。
- 新元件 greenfield：無 firebase 依賴，`answerLog.ts` / `cloudSync.ts` 尚不存在。

## 階段地圖

| 階段 | 資料夾 | 內容 | TASK / RC | 相依 | 風險 |
|------|--------|------|-----------|------|------|
| **P1 SRS 核心引擎** | `phase-1-srs-core/` | Leitner boxLevel 模型 + 遷移；排程重寫（跨日精通、到期優先、box5 回鍋、≤15） | 01,02 / RC-1,2 | — | 中 |
| **P2 Answer Log** | `phase-2-answer-log/` | `answerLog.ts` + 四題型埋點；wordId 型別介面 | 04 / RC-5 | P1 | 低 |
| **P3 學習流程防作弊** | `phase-3-learning-anti-cheat/` | 字母積木拼字（廢自由打字）；防背答案 | 10,11 | P1,P2 | 中 |
| **P4 怪獸逃跑重設計** | `phase-4-monster-escape/` | `processForgottenEscapes`（逾期掛勾、單日≤1、豁免、非責備文案） | 03 / RC-3 | P1 | 中 |
| **P5 家長診斷** | `phase-5-parent-analytics/` | 家長入口 + 錯誤類型視圖；孩子端不顯示 | 07 | P2 | 低 |
| **P6 雲端同步** | `phase-6-cloud-sync/` | Firebase + `cloudSync.ts` + 離線 + Rules；介面不變接線 | 05,06 / RC-4 | P1 | **高** |
| **P7 共創** | `phase-7-co-creation/` | 怪獸上傳署名、我的例句、許願清單；48h 內上線 | 09 | P1 | 中 |

開發順序：P1 → P2 → P3 → P4 → P5 → P6 → P7（前置成績退步主嫌修復；P2 小且解鎖 P3/P5）。

## E2E ↔ 測試層 對照（詳見 WORKFLOW.md）

- **Vitest 邏輯層（自動）**：E2E-1 防假精通、E2E-2 間隔遞增、E2E-3 box5 回鍋、E2E-4 答錯降級、E2E-5 逃跑保底、E2E-7 遷移無損、E2E-8 總量≤15、E2E-11 干擾項每次不同、E2E-12 答錯重排/亂猜。
- **瀏覽器層（延後 + 使用者手動驗收）**：E2E-6 離線同步（P6）、E2E-9 共創閉環（P7）、E2E-10 平板防系統鍵盤（P3）。

## GATE 匯總（master spec §7 拆分到各階段）

- **P1**：BOX_INTERVALS（用預設 [0,1,3,7,14,30] 開發，最終再調）、舊資料遷移映射確認。
- **P4**：逃跑文案 tone 不得責備。
- **P6**：Firebase 專案與帳務主體、Security Rules 部署（高風險，人工確認）。

## 進度追蹤

| 階段 | 文件 | 實作 | 手動驗收 |
|------|------|------|----------|
| P1 | ✅ 完整 | ✅ 自動 E2E 綠（tag `v2.0-p1-done`） | ⬜ 待使用者 |
| P2 | ✅ 完整 | ✅ 資料層 + UI 埋点綠（tag `v2.0-p2-done`） | ⬜ 待使用者（responseMs 端到端） |
| P4 | ❌ 取消 | ❌ 產品決定不呈現逃跑/失去概念；邏輯已移除 | — |
| P5 | ✅ 完整 | ✅ 診斷純函式 + 家長面板（tag `v2.0-p5-done`）；Browser 冒煙過 | ⬜ 待使用者（tone/位置實機） |
| P3/P6/P7 | 🟡 骨架 | ⬜ | ⬜ |

P1 實作摘要：`services/srsStorage.ts` 換成 Leitner box SRS；Vitest 8/8 綠、tsc/build 通過。commit `ce74c59`（TASK-00）、`93b0ab6`（TASK-01+02）。
