---
description: Spec-Driven Development 流程指引。在採用本流的專案中，開發任何功能/版本時遵循：需求→設計→計畫→任務→E2E，各階段帶 GATE/HANDOFF。判斷是否要走完整 SDD 時參照。
---

# SDD — Spec-Driven Development 流程

開發功能/版本時，依序走五階段，每階段產一份文件，結尾放 GATE 與 HANDOFF。

| 階段 | 產出 | 重點 |
|------|------|------|
| 1. Requirements | REQUIREMENTS.md | 背景、功能/非功能需求、Out of Scope |
| 2. Design | DESIGN.md | 架構決策、資料模型、方案取捨 |
| 3. Plan | PLAN.md | 階段拆解、里程碑（小功能可併入 Tasks） |
| 4. Tasks | TASKS.md | 可獨立驗收的實作步驟＝sub-agent 自足 brief |
| 5. E2E | E2E.md | 驗收條件與結果 |

- **GATE**：進下一階段前必須成立的檢查清單；沒過不得產下一份文件。
- **HANDOFF**：只寫「下一階段/下一位 agent 需要知道的事」。

## 何時走完整 SDD
- 預設：任何功能/版本都走完整 SDD（1→5）。
- 唯一例外：很小的改動或 bug 修復（改錯字、微調樣式、單點修錯）可直接做。
- 判定從嚴：不確定夠不夠小，就當要走完整流程。

## 小版本迭代
大功能拆成多個小版本，每版一個資料夾放其階段文件。原則：近的寫細、遠的留白——用真實實作結果餵下一版 spec。

## 高風險條款（任何情況都適用）
- 部署、刪除、權限/Rules 變更 → 一律人工確認後才執行，即使信心高。
- 動正式資料的批次腳本 → 先 dry-run。
- 信心低於門檻 → 先列不確定點，不要直接送出當最終答案。

## 多-agent 接口
Task 文件（階段 4）是自足實作 brief，可直接交實作 sub-agent。跨 agent 一律用 repo 內檔案交接，不靠對話記憶。
