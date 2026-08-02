# v2.0 開發工作流 — 自主開發迴圈協定

本文件定義 v2.0 各階段的開發方式。核心原則：**開發過程中的測試、審查、修正由 AI 自主完成，做到全綠燈為止；使用者唯一介入點是最後的手動測試驗收。**

## 角色分工

| 角色 | 職責 |
|------|------|
| **AI（自主）** | 訂驗收標準 → 寫測試 → 實作 → 跑測試/型別/build → 自我 review → 修正 → commit → 下一個 task，全程不需人介入 |
| **使用者（唯一介入點）** | 最後的**手動測試與驗收**，尤其機器測不到的瀏覽器/平板 device 行為（E2E-6 離線同步、E2E-9 共創閉環、E2E-10 平板防系統鍵盤）|

## 驗收標準（Definition of Done）

**Task DoD**（單一任務完成的定義）：
1. 對應 acceptance 的 Vitest 測試存在且**全綠**
2. `npx tsc --noEmit` 無型別錯誤
3. `npx vite build` 成功
4. 既有測試**無回歸**
5. 已 commit（訊息帶 TASK-id）

**Phase DoD**（階段完成的定義）：
1. 該階段所有 Task 皆達 Task DoD
2. 該階段**所有可自動化的 E2E** 情境綠燈（見各 phase `E2E.md`）
3. 自我 code-review 通過（可跑 `/code-review`）
4. `HANDOFF` 寫好，交接下一階段
5. 不可自動化的 E2E（device/browser）列成**待使用者手動驗收清單**

## 每個 Task 的迴圈（Red → Green → Refactor → Commit）

```
1. 從該 phase 的 TASKS.md 取下一個未完成 task
2. 依 acceptance 寫/更新測試（先紅）        ← 這一步就是「訂標準」
3. 實作到測試變綠
4. 跑閘門：npx vitest run  +  npx tsc --noEmit  +  npx vite build
5. 若紅 → 診斷 → 修正 → 回 3（自我修正迴圈，不需人介入）
6. 全綠 → 自我 review diff（必要時 /code-review）→ commit
7. 於 DEVLOG.md 追加一筆紀錄（見下）→ 回 1，直到該 phase tasks 清空 → Phase DoD 檢查
```

## 開發日誌（DEVLOG.md）— 可覆盤的稽核軌跡

[DEVLOG.md](./DEVLOG.md) 是 **append-only** 的過程紀錄，讓自主迴圈中的每次紅燈/失敗/修正都留痕，事後可追蹤哪裡出錯、如何覆盤。

**AI 必須**在下列時機追加一筆：
- 每個 task 收尾（commit 後）。
- 迴圈中發生**非預期失敗**（測試/型別/build 紅燈、或方向性誤判）時，即時記下失敗與修正。
- 每個 phase 收尾（Phase DoD 檢查結果）。

每筆格式：

```
## [YYYY-MM-DD HH:MM] Pn/TASK-xx — <標題>
- 動作：做了什麼
- 結果：vitest A/B 綠、tsc ✅/❌、build ✅/❌
- 問題：（若有）遇到的紅燈/誤判
- 修正：怎麼解的
- commit：<short-hash>
```

原則：**只記事實與因果，不追溯性美化**。失敗照實寫——那正是覆盤的價值所在。

## 版本控制 cadence

- 全 v2.0 在分支 `feat/v2.0-srs`。
- **每個 task 一個小 commit**：`P1/TASK-01: <摘要>`。
- 每個 phase 收尾打一個 annotated tag：`v2.0-p1-done`。
- 全部階段完成 + **使用者最終手動驗收通過**後，才 merge 回 `main`。
- 高風險操作（P6 Firebase 部署/Rules）一律人工確認後才執行（依 sdd skill 高風險條款）。

## /loop 定位

- AI 可在單一 session 內**自主跑完**上述迴圈，不強制需要 `/loop`。
- 若使用者要「離開讓它自己持續跑」：用 `/loop <prompt>` 觸發（loop 由使用者啟動，AI 無法自行啟動）。建議 prompt：
  > 「做 `feat/v2.0-srs` 上 P1 的下一個未完成 task：紅→綠→tsc→build→commit；全部 task 綠燈且 Phase DoD 達成才停。」

## 無法自動、需使用者輸入的非測試 GATE（與最終手動測試分開）

這些是**外部/決策**輸入，機器無法代勞，會在對應階段開始前明確請求：

| Gate | 階段 | 說明 |
|------|------|------|
| Firebase 專案 + 帳務 + 部署 Security Rules | P6 | 需個人 Google 帳號實際操作 |
| 舊資料遷移映射最終確認 | P1 | 預設 masteryLevel→boxLevel（0→0,1→2,2→4），孩子圖鑑無損為硬約束 |

**BOX_INTERVALS** 採 spec 預設 `[0,1,3,7,14,30]` 直接開發，**不擋流程**；最終手動測試時再依段考週期微調。

## 測試工具

- **邏輯層**：Vitest（Vite 原生）+ jsdom（模擬 localStorage）。SRS 的時間/亂數採**注入式**（`now = Date.now()`、可覆寫 `rng`），使跨天/快轉/洗牌可確定性測試。E2E-1~5、7、8、11、12 皆在此層。
- **瀏覽器層**：延後到 P3/P6/P7 需要時才裝 Playwright；期間 UI 即時驗證用 Browser MCP 手動實測。
