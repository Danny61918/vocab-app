# SPEC — vocab-app v2.0「真 SRS + 雲端同步」開發規格

> 專案：vocab-app（https://github.com/Danny61918/vocab-app）
> 版本：v2.0 | 日期：2026-07-12 | 作者：Danny + AI 協作
> 流程定位：本文件為五階段流程的「需求 + 設計」，末段附 Agent Task 分解與 E2E 情境。

---

## 1. 背景與問題陳述

使用者（8 歲、每日英文班考 5 個新單字、每週段落小考）持續使用本 app 複習，但考試成績下滑。經 code review 定位出三個 root cause：

| ID | 問題 | 位置 | 影響 |
|----|------|------|------|
| RC-1 | 假 SRS：未精通字以「12 小時 buffer」全量重出，無遞增間隔 | `srsStorage.ts` → `getDailyHuntWords()` | 每日重刷同批難字（massed practice），無「臨界點喚醒」效果，且造成疲勞 |
| RC-2 | 假精通：`consecutiveCorrect >= 3` 可在**同場遊戲內**達成即畢業，且 `masteryLevel >= 2` 被永久排除 | `srsStorage.ts` → `updateWordMastery()` / `getDailyHuntWords()` 的 `filter(masteryLevel < 2)` | 短期記憶被誤判為長期記憶；畢業字永不回鍋 → 段考時已遺忘。**成績退步的主嫌** |
| RC-3 | 隨機懲罰：每日隨機 2~5 隻怪獸逃跑，與使用者行為無關 | `srsStorage.ts` → `processSpontaneousEscapes()` | 「有練還是被罰」的挫折感，製造壓力、傷害動機 |
| RC-4 | 資料脆弱：全部進度存 localStorage | `storage.ts` / `srsStorage.ts` | 清快取 = 圖鑑全滅（對兒童為災難級體驗）；無法跨裝置 |
| RC-5 | 無診斷資料：不記錄逐題作答紀錄 | 全域 | 家長無法區分錯誤類型（拼寫 / 語意 / 語境），無法對症下藥 |

### 1.1 產品最高原則（Prime Directive）

> **這個 app 的存在是為了讓她開心地學，不是為了評價她。**
> 任何新功能進入 spec 前先過這一關：它會讓她被比較、被警示、被評分嗎？會就不做。
> 家長的角色是後盾與隊友；診斷資料只用於「怎麼幫她」，永遠不用於「檢討她」。
> 驗收標準只有一條：她自己願意打開它。

## 2. 目標（Goals）

- G1：實作真正的到期日制間隔複習（expanding interval SRS）
- G2：精通判定必須跨日，且精通字進入維護模式定期回鍋
- G3：怪獸逃跑機制改為「與遺忘掛勾」的有意義事件
- G4：進度與紀錄同步至 Firebase（Firestore + Anonymous Auth），localStorage 降級為快取
- G5：新增 answer log，供 AnalyticsDashboard 做錯誤類型診斷

## 3. 非目標（Non-Goals）

- 不改動現有四種題型的遊戲玩法與 UI 風格
- 不做多人排行榜的雲端化（Leaderboard 維持本地，另案處理）
- 不引入完整 SM-2 演算法（8 歲使用場景用 Leitner 固定級距已足夠，保持可解釋性）

## 4. 設計

### 4.1 資料模型變更（`types.ts` / `srsStorage.ts`）

```ts
export interface VocabMastery {
  wordId: string;
  boxLevel: number;          // 0..5，Leitner box
  intervalDays: number;      // 由 boxLevel 導出：[0, 1, 3, 7, 14, 30]
  dueDate: number;           // timestamp，下次應複習日
  consecutiveCorrectDays: number; // 「跨日」連對次數（同日多次答對只計一次）
  lastCorrectDate?: string;  // 'YYYY-MM-DD'，用於跨日判定
  lastReviewDate?: number;
}
```

級距表：`BOX_INTERVALS = [0, 1, 3, 7, 14, 30]`（單位：天）

### 4.2 排程規則（取代 `updateWordMastery` / `getDailyHuntWords`）

**答題後更新：**
- 答對且 `today !== lastCorrectDate` → `consecutiveCorrectDays += 1`、`boxLevel = min(boxLevel+1, 5)`、`dueDate = now + BOX_INTERVALS[boxLevel]`
- 答對但同日重複 → 只更新 `lastReviewDate`，不升級（防同場刷精通）
- 答錯 → `boxLevel = max(boxLevel-1, 0)`... 修正：答錯一律退回 `boxLevel = 1`、`consecutiveCorrectDays = 0`、`dueDate = 明天`

**每日選字（`getDailyHuntWords`）：**
1. 撈 `dueDate <= now` 的字（含 box 5 的維護回鍋字），按逾期天數降冪
2. 上限 10 個到期字 + 5 個新字（`boxLevel` 不存在的字，按 level 順序）
3. 到期字不足時才補新字以外的隨機字
4. **總量上限 15 維持不變**（不增加每日負擔是硬性約束）

**精通定義變更：** `boxLevel >= 4` 且 `consecutiveCorrectDays >= 3` 顯示為「精通」，但**永不從排程移除**——box 5 的字每 30 天回鍋一次。

### 4.3 怪獸逃跑重設計（`processSpontaneousEscapes` → `processForgottenEscapes`)

- 觸發條件：某關卡內有字 `逾期 >= 3 天未複習` → 該關卡怪獸「逃跑」
- 抓回方式：完成一次包含該關卡逾期字的 Daily Hunt → 怪獸歸位 + 慶祝動畫
- 文案方向：「怪獸趁你忘記單字的時候溜走了！複習就能抓回來」——把懲罰轉為劇情與行動指引
- 保底規則：**單日最多 1 個關卡逃跑**，且當日已完成複習則當日豁免（絕不出現「有練還被罰」）

### 4.4 Answer Log（新增 `services/answerLog.ts`）

```ts
export interface AnswerRecord {
  wordId: string;
  gameType: 'multiple_choice' | 'matching' | 'cloze' | 'sentence_cloze';
  correct: boolean;
  responseMs: number;
  date: string; // 'YYYY-MM-DD'
}
```

- 每題作答即 append；本地環形緩衝最多 2000 筆，Firestore 全量保存
- AnalyticsDashboard 新增「錯誤類型」視圖：按 gameType 匯總錯誤率
  - cloze 錯誤率高 → 拼寫弱（phonics）
  - sentence_cloze 錯誤率高 → 語境/理解弱
  - matching 錯誤率高 → 中英對應弱
- 此視圖預設隱藏於家長入口（見 4.6），不對孩子顯示錯誤統計

### 4.5 Firebase 整合（新增 `services/cloudSync.ts`）

- 服務：Firestore + Anonymous Auth（Spark 免費層，用量遠低於限額）
- 資料結構：`users/{uid}/mastery/{wordId}`、`users/{uid}/answerLog/{autoId}`、`users/{uid}/progress/main`
- 同步策略：**localStorage 為快取、Firestore 為 source of truth**
  - App 啟動：拉雲端 → 與本地 merge（以 `lastReviewDate` 較新者勝）→ 寫回兩邊
  - 作答後：先寫本地（即時回饋）→ 背景批次寫雲端（debounce 5s）
  - 離線：本地佇列，恢復連線後 flush（Firestore SDK 內建離線持久化，啟用即可）
- Security Rules：僅允許 `request.auth.uid == userId` 讀寫自己的文件
- 現有 `srsStorage.ts` 的 load/save 介面**維持簽名不變**，內部改為 sync-aware（元件層零改動）

### 4.6 家長視角（輕量）

- AnalyticsDashboard 加一個不顯眼的入口（如長按標題 3 秒）進入家長頁
- 內容：錯誤類型分佈、逾期字清單、每日投入時間
- **明確非目標：不做「成績排名」「退步警示」等會轉化為施壓工具的功能**（設計理由見附件《觀念篇》）

## 5. Agent Tasks 分解

| Task | 內容 | 依賴 | 預估 |
|------|------|------|------|
| TASK-01 | `types.ts` + `srsStorage.ts` 資料模型改造與遷移函式（舊 masteryLevel → 新 boxLevel 映射：0→0, 1→2, 2→4） | — | S |
| TASK-02 | 排程引擎重寫：`updateWordMastery`（跨日判定）+ `getDailyHuntWords`（到期優先） | 01 | M |
| TASK-03 | 怪獸逃跑重設計 + 保底規則 + 文案 | 02 | M |
| TASK-04 | `answerLog.ts` + 四種題型元件埋點 | 01 | S |
| TASK-05 | Firebase 專案建置 + `cloudSync.ts` + 離線持久化 + Security Rules | 01 | M |
| TASK-06 | `srsStorage.ts` / `storage.ts` 接上 cloudSync（介面不變） | 05 | S |
| TASK-07 | AnalyticsDashboard 家長頁 + 錯誤類型視圖 | 04 | M |
| TASK-08 | E2E 測試（見 §6）+ 舊資料遷移驗證 | 01–07 | M |
| TASK-09 | 共創功能（Co-Creation）：(a) 怪獸上傳流程——她的畫拍照 → 裁切/去背 → 進 `public/monsters` 與圖鑑，圖鑑標示「設計師：女兒的名字」；(b)「我的例句」輸入介面——她造的句子進 sentence_cloze 題庫並標記作者；(c) 許願清單頁——她提的功能逐項實現，完成後顯示「這是你許願的 ✔」。**時效約束：她的創作必須在 48 小時內出現在 app 裡**（成就感的有效期很短） | 01 | M |
| TASK-10 | 平板拼字改造：cloze 題型**廢除自由打字**，改為「字母積木」拼字（點選/拖曳打散的字母磚組字，混入 2~3 個干擾字母）。所有殘留 input 欄位加上 `autoCorrect="off" autoCapitalize="off" spellCheck={false} autoComplete="off" inputMode="none"`，杜絕系統輔助輸入代拼 | — | M |
| TASK-11 | 防背答案機制：(a) 選項順序與干擾項**每次出題重新抽樣**（同一字兩次出現，錯誤選項不同）；(b) 新字採「逐字即學即測」流——首次遇到新字先看單卡（字＋圖＋音＋例句，停留由她點下一步），緊接著立刻出該字的題，**取消獨立的複習頁**；(c) 答錯的字顯示正解後**重新排入本場隊列尾端**（換新干擾項再考一次），不原題重問；(d) `responseMs < 1200ms` 且答錯 → 標記為 guessing，該題不觸發任何降級懲罰但也不計入進度，避免亂猜刷完 | 02, 04 | M |

## 6. E2E 驗收情境（節錄）

- **E2E-1（防假精通）**：同一場遊戲對同一字連續答對 3 次 → `boxLevel` 只升 1 級、`consecutiveCorrectDays == 1`
- **E2E-2（間隔遞增）**：某字連續三天各答對一次 → dueDate 依序為 +1、+3、+7 天
- **E2E-3（畢業回鍋）**：box 5 的字 30 天後出現在 Daily Hunt
- **E2E-4（答錯降級）**：box 3 的字答錯 → 退回 box 1、明日到期
- **E2E-5（逃跑保底）**:當日已完成 Daily Hunt → 不觸發任何逃跑
- **E2E-6（離線同步）**：斷網完成 15 題 → 恢復連線後 Firestore 出現對應紀錄，本地與雲端一致
- **E2E-7（遷移）**：帶舊格式 localStorage 資料啟動 → 無資料遺失、映射正確、圖鑑完整保留
- **E2E-8（總量約束）**：任何情況下 Daily Hunt 不超過 15 字
- **E2E-9（共創閉環）**：上傳一張怪獸圖 + 一個例句 → 48 小時內圖鑑出現該怪獸（含設計師署名）、sentence_cloze 抽得到該例句
- **E2E-10（拼字防代打）**：平板上進行 cloze 題 → 全程無系統鍵盤彈出、無自動完成候選字；拼字僅能透過字母磚完成
- **E2E-11（防背答案）**：同一字於兩場遊戲中出現 → 兩次的干擾選項集合不同、選項順序不同
- **E2E-12（答錯重排）**：本場答錯某字 → 該字在本場稍後以新干擾項重新出現；連續 1200ms 內亂點答錯 → boxLevel 不變動

## 7. GATE（進入開發前確認）

- [ ] BOX_INTERVALS 級距經 Danny 確認（可依段考週期微調，如週二小考前保證回鍋）
- [ ] Firebase 專案與帳務主體確認（個人帳號、Spark plan）
- [ ] 舊資料遷移映射表確認（孩子現有圖鑑與進度**必須無損**——這是最高優先約束）
- [ ] 文案 tone 確認（逃跑訊息不得出現責備語氣）

## 8. 風險與假設

- [ASSUMPTION] Leitner 固定級距對 8 歲使用者足夠，不需 SM-2 動態調整 → 觀察 4 週答對率驗證
- [ASSUMPTION] 週二段落小考與單字 SRS 為不同能力，本次不處理段落複習 → 若段考持續弱，另開 spec
- [RISK] Firestore 匿名帳號綁定裝置，換裝置需帳號升級連結 → v2.1 再處理，先文件化操作步驟
