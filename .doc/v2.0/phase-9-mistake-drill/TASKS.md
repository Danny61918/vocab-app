# P9 — 錯題練習化 · TASKS

> 依 [WORKFLOW.md](../WORKFLOW.md)：紅 → 綠 → `npx tsc --noEmit` → `npx vite build` → 自我 review → commit（`P9/TASK-xx: 摘要`）→ DEVLOG。
> 分支：`feat/mistake-drill`（`main` push 會直接部署到 GitHub Pages，所以先不在 `main` 上開發）；使用者最終驗收通過後才 merge。
> 設計見 [DESIGN.md](./DESIGN.md)；需求與已確認決策見 [REQUIREMENTS.md](./REQUIREMENTS.md)。

## GATE（需使用者介入）

- **GATE-A**（TASK-06 後）：家長看過變化題與易混字組內容，確認沒有歧義或錯誤，才進入 UI 串接。
- **GATE-B**（全部完成後）：手機上實際玩過一輪，驗收後才 merge、push。

---

## TASK-00 — 基線與分支
- 開 `feat/mistake-drill`；跑 `npm test`、`tsc`、`build` 確認基線全綠並記錄在 DEVLOG。
- 驗收：基線全綠（目前 30 個測試）。

## TASK-01 — 技能表與易混字組
- 新增 `services/mistakeBook/skills.ts`（DESIGN §2 的技能）與 `confusionSets.ts`（`cs.health`）。
- `types.ts`：`MistakeRecord` 加 `skills?: string[]`。
- 測試：技能 id 不重複；每個技能有 domain 與 label。

## TASK-02 — 題目型別與驗證測試（先紅）
- 新增 `services/mistakeBook/drills/types.ts`（`DrillItem` 等）與 `drills/index.ts`。
- 寫 `services/__tests__/drills.test.ts`（DESIGN §5 全部項目），先用壞的樣本確認會失敗。

## TASK-03 — 排程純函式
- 從 `updateWordMastery` 抽出 `applyAnswer`（跨日判定），單字與技能共用。
- 測試：跨日升箱、同日不升、答錯回第 1 箱、**同日先錯再對**（明確記錄行為變更）。
- 不得回歸既有單字複習測試。

## TASK-04 — 技能進度與每日出題
- 新增 `services/mistakeBook/drillProgress.ts`：`SkillProgress` 存取、`getTodayDrill(deps)`（≤ 8 題、同技能 ≤ 2、優先到期、優先沒出過、答錯降難度、選項打亂）、畢業判定（跨日、連續 3 次、不同題）。
- 測試用 `fixedDeps`；涵蓋題數上限、不重複、畢業條件。

## TASK-05 — 單字連動
- 新增 `services/mistakeBook/vocabLink.ts`：`idsForWord(word)`（正規化，回傳所有同字 id，含片語）、混淆對記錄、`needsContext` 規則。
- `srsStorage.ts`：`VocabMastery` 加選填 `needsContext`；有此標記的字在「看英文選中文」答對不升箱，句子題跨日答對 2 次解除；`getDailyHuntWords` 排除當天錯題練習的字。
- 測試：traffic jam 同時更新 `s452` 與 `s1105`；`needsContext` 行為；排除邏輯。

## TASK-06 — 題庫內容（GATE-A）
- 新增 `drills/2026-11-04.ts`：頁 1 約 15 題文法變化題（近／中／遠／反向維度各有）、頁 2 約 16 句健康字題（每字 ≥ 2 句、不同線索、`alsoFits` 標清楚）。
- 避免 P1-1、P2-3 的原題歧義。
- 驗證測試全綠；跑盲解（Gemini）並把不一致的題目列給家長。
- **GATE-A：家長確認題目內容。**

## TASK-07 — 雲端備份
- `cloudSync.ts`：新 key 加進 `LS_KEYS`、`CloudDocument`、`pairs`。
- 測試：key 清單包含新 key；push／pull 往返。

## TASK-08 — 練習畫面與串接
- 先讀 `parentAnalytics` 與其測試，確認新增 `AnswerSource = 'mistake'` 的影響，再改 `answerLog.ts`。
- 新增 `components/MistakeDrill.tsx`（答題、回饋含中文解釋、金幣）、`App.tsx` 入口、`SmartDailyReview` 結算畫面「接著練錯題」。
- 測試：元件基本互動（若專案已有元件測試基礎，否則以純函式測試為主）。

## TASK-09 — 填空題小修（選做）
- `tryCreateCloze` 精確比對加單字邊界；易混字組的字，干擾項改從同組挑；把驗證過的健康句補進 `EXTRA_SENTENCES`。

## TASK-10 — 弱點排行（選做）
- `MistakeBookView` 加分頁：依技能統計近期錯誤次數與狀態（練習中／已畢業），不做週報。

## TASK-11 — 匯入流程固化
- 擴充 `validate_import.cjs`；更新 `services/mistakeBook/GEMINI_PROMPT.md` 與一份匯入檢查清單（寫資料 → 寫變化題 → validator → `npm test` → build → commit）。

---

## Phase DoD / E2E

可自動化：
- E2E-1 一份新考卷匯入後，`getTodayDrill` 產生 ≤ 8 題且同技能 ≤ 2。
- E2E-2 連續三個不同日各答對一題不同變化題 → 技能畢業；中途答錯 → 回第 1 箱。
- E2E-3 單字錯題 → 所有同字 id 降箱並標 `needsContext`；句子題跨日答對 2 次 → 解除。
- E2E-4 當天出現在錯題練習的字，不會同時出現在每日單字複習。
- E2E-5 `npm test`、`tsc`、`build` 全綠；既有 166 題錯題本與單字複習無回歸。

待使用者手機驗收：
- 做完每日複習後，結算畫面接著進入錯題練習，流程順暢、題數與時間（約 5 分鐘）合理。
- 題目沒有看起來有兩個答案的；中文解釋看得懂。
- 重新整理或關掉再開，進度還在。
