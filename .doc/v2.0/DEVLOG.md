# v2.0 開發日誌（DEVLOG）

Append-only 過程紀錄。用途：追蹤自主開發迴圈中發生的事、紅燈與修正，供事後覆盤。格式見 [WORKFLOW.md](./WORKFLOW.md#開發日誌devlogmd--可覆盤的稽核軌跡)。最新在最上方。

---

## [2026-08-02] P0/SETUP — SDD scaffold 建立
- 動作：開分支 `feat/v2.0-srs`；整併文件夾（`!doc/Phase/SPEC_vocab_app_v2.md` → `.doc/v2.0/`，移除 `!doc/`）；建 OVERVIEW / WORKFLOW / DEVLOG；建七個 phase 資料夾；撰寫 P1 五件式文件。
- 結果：文件層，未動任何 `services/*`、`components/*` 程式碼。
- 問題：無。
- 修正：—
- commit：（待本階段文件收尾一次 commit）

### 決策紀錄（本次 session 對齊）
- 測試框架＝**Vitest**（AI 決定）；瀏覽器 E2E（E2E-6/9/10）**延後**到 P3/P6/P7。
- SRS 時間/亂數採**注入式**接縫（`now`、`rng`），使跨天/快轉/洗牌可確定性測試。
- 開發模式＝**自主迴圈**：AI 自行寫測試→實作→跑測試/型別/build→自我 review→修正→commit，做到全綠；使用者唯一介入點＝**最後手動測試驗收**。
- 文件根目錄合併為單一 `.doc/`；命名採 SDD 五件式。
