# P3 — 學習流程防作弊（骨架）

> 狀態：🟡 骨架。進入本階段時展開為五件式。
> 對應 spec：TASK-10、TASK-11。相依：P1、P2。風險：中。含 device-only E2E。

## 範圍摘要
- **TASK-10 字母積木拼字**：cloze 廢除自由打字，改點選/拖曳字母磚（混入 2~3 干擾字母）；殘留 input 加 `autoCorrect/autoCapitalize/spellCheck/autoComplete=off`、`inputMode="none"`。
- **TASK-11 防背答案**：(a) 選項與干擾項每次重抽；(b) 逐字即學即測流（新字先看單卡再立即出題，取消獨立複習頁）；(c) 答錯重排隊尾（換干擾項再考）；(d) `responseMs<1200 且答錯` 標記 guessing，不降級也不計進度。

## 對應 E2E
- Vitest：E2E-11（干擾項每次不同）、E2E-12（答錯重排/亂猜偵測）。
- **瀏覽器/裝置（延後 + 使用者手動驗收）**：E2E-10（平板全程無系統鍵盤、無自動完成）。進本階段時裝 Playwright 或用 Browser MCP。

## HANDOFF IN
- P1 排程（答錯降級）、P2 answerLog（responseMs 來源）。

## HANDOFF OUT
- （待填）
