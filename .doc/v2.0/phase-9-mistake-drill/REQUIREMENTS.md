# P9 — 錯題練習化（Mistake Drill）· REQUIREMENTS

> 狀態：🟡 草案，待使用者確認後開工。
> 起因：每天小考的錯題目前只能「看」（`components/MistakeBookView.tsx`），沒有「練」。使用者希望：（1）分類孩子容易錯的；（2）用現有錯題句當種子擴增更多句；（3）讓單字練習與錯題練習同步。
> 設計來源：使用者與 Claude Sonnet 5.5 討論，加上 Opus 5.5 的設計審查（2026-11-04）。
> 相依：P1（`services/srsStorage.ts` 的 Leitner 箱與跨日判定）、P6（`services/cloudSync.ts`）、錯題本（`services/mistakeBook/`）。

## 1. 背景與樣本

2026-11-04 的兩頁考卷（紅圈 = 原本答錯、已訂正；原本寫的答案看不到；每頁扣 5 分 = 5 題錯）：

**頁 1　現在簡單式，選擇題，錯 5：**

| 題 | 題目 | 正解 |
|---|---|---|
| 1 | I ___ vegetables every day. | (d) eat |
| 2 | The children ___ the museum every school year. | (b) visit |
| 3 | Mark and I ___ tea or coffee. | (c) don't drink |
| 4 | 選正確的句子 | (c) Does your family plan a trip to the UK every year? |
| 9 | Does your father read the newspaper every day? | (d) Yes, he does. |

共同點：依主詞（複數、合併主詞、第三人稱單數）決定 do/does 與動詞形式。第 5 題「選錯誤的句子」她答對。

**頁 2　健康單字，從框內選字填空，錯 5：**

| 題 | 題目 | 正解 |
|---|---|---|
| 1 | I think I caught a ___ because I forgot to wear a jacket yesterday. | cold |
| 3 | Please call the clinic to make an appointment if you are ___. | sick |
| 6 | Please cover your mouth with your elbow when you ___. | cough |
| 8 | The children must stay ___ when the teacher takes their class picture. | still |
| 9 | We were stuck in a heavy ___ on the highway for two hours. | traffic jam |

答對的是 feel、matter、dizzy、stomachache。推測：cold／sick／cough 這組症狀字互相混淆；still、traffic jam 要靠句意與搭配判斷。（原本錯答不明，以上為推測。）

**已知的原題歧義（考卷上沒有圖示或提示，使用者已確認）：**
- 頁 1 第 1 題：「I don't eat vegetables every day」文法上也成立，標準答案是 eat。
- 頁 2 第 3 題：dizzy 填進去語意也通，是靠「每字只能用一次」排除。
→ 這兩題**不能原樣當練習題**；擴增題必須避免同樣的歧義。

## 2. 已確認的決策

| # | 決策 |
|---|---|
| D1 | 第一期範圍：以今天兩頁當種子，約 15 題文法變化題 + 約 16 句健康字題，加練習畫面與技能進度。 |
| D2 | 每日上限 8 題（約 5 分鐘）；同一技能一天最多 2 題。 |
| D3 | 孩子只在**同一台裝置**練習（`cloudSync` 是匿名登入、每台裝置各自一份文件，不是跨裝置同步）。 |
| D4 | 錯題練習接在**每日複習之後**進行（每日複習結算畫面導向錯題練習）。 |
| D5 | 每天輸入維持「家長拍照 → Claude 整理並寫入程式碼 → 部署」，因為品質把關必須在這一步完成。 |

## 3. 功能需求

- **FR-1 弱點分類**：兩層分類（粗類 + 細技能 id），粗類分為文法規則 `G`、單字語意與搭配 `V`、閱讀 `R`、書寫機制 `M`。保留既有 `errorCategory` 給錯題本顯示，另加選填 `skills?: string[]`。
- **FR-2 錯誤性質不在匯入時標**：「粗心／不會／混淆」由練習結果推算（見 DESIGN §3），匯入時只在確定是漏作答時才標粗心。
- **FR-3 變化題（種子句擴增）**：每個種子擴 3–4 題，每題只改 1–2 個維度（主詞、動詞、時間副詞、極性、句型）。**一律在匯入時由 Claude 寫成靜態 TS 並經驗證**，執行時只做重組（選項順序、選題）。
- **FR-4 技能為排程單位**：以「技能（或易混字組）」排程，沿用 `BOX_INTERVALS`。畢業條件：**跨日、連續 3 次答對，且為不同的變化題**。答錯回第 1 箱。
- **FR-5 易混字組**：`cs.health`（cold、sick、cough、dizzy、headache、stomachache、sore throat）。每個字至少 2 句，且用到不同線索（名詞搭配、形容詞位置、動詞位置）。選項只從同組挑，逼她分辨。
- **FR-6 單字與錯題連動**：以 `targetWords` 連到單字庫**所有**同字 id（traffic jam 為 `s452` 與 `s1105`）。
  - 單字錯題 → 對應字呼叫 `updateWordMastery(id,false)` 並標 `needsContext`。
  - 有 `needsContext` 的字，每日複習「看英文選中文」答對**不升箱**；要在句子題跨日答對 2 次才解除。
  - 句子題答錯 → 正解字降箱，並記下選到的干擾項為混淆對；干擾項本身不降箱。
  - 文法題只更新技能進度，不碰單字。
- **FR-7 同日不重複**：同一個字同一天只出現在一個地方：`getDailyHuntWords` 要排除當天錯題練習會出現的字。
- **FR-8 流程接續**：`SmartDailyReview` 結算畫面導向錯題練習；錯題練習也保有獨立入口。
- **FR-9 金幣**：答對沿用 `awardCoins`。

## 4. 非功能需求

- **NFR-1 品質**：題目不得有兩個可接受答案；每題都要通過驗證測試（DESIGN §5）。品質問題比功能不全嚴重，因為錯誤句子會教壞孩子。
- **NFR-2 離線可用**：不依賴網路、不在執行時呼叫外部模型。
- **NFR-3 相容**：既有 166 題錯題本、單字複習與測試不得回歸。
- **NFR-4 資料量小**：新增 localStorage key 要同時登記到 `cloudSync`（三處）。

## 5. Out of Scope（第一期不做）

- 錯題怪獸（接怪獸圖鑑）、弱點週報（先只做簡單的「弱點排行」，列為 TASK-10 選做）。
- 打字訂正（跟考試題型不符、手機輸入慢；僅 `M.spelling` 類日後再議）。
- App 內手動輸入錯題（做不到品質把關）。
- 回填 10/13 之前的舊錯題（給 `legacy.<category>`，不參與排程）；19 筆 `rewrite` 題不回填。
- 執行時動態組句（「現在簡單式」規則題可在第 2 期以人工整理的動詞變化表加單元測試後再做）。
- 跨裝置同步進度。
