# 每天匯入一份考卷（錯題 → 練習題）檢查清單

家長拍照 → Claude 整理並寫入程式碼 → 部署。品質把關都在「寫入」這一步，所以每一步都要過。

## 1. 寫錯題資料
- 新增 `services/mistakeBook/data/<考卷日期>.ts`，並在 `services/mistakeBook/index.ts` 加一行 import 與一行展開。
- 每題 `id` 用 `idUtil.ts` 的公式算出；每題加 `skills: [...]`（只能用 `services/mistakeBook/skills.ts` 登記過的 id；沒有合適的技能就先到 `skills.ts` 新增）。
- 原本寫錯的答案看不到就寫「未知（…）」，不要編。
- 題目本身有歧義（兩個選項都說得通）要在檔頭註明，並且**不能原樣拿來當練習題**。

## 2. 單字題錯的字
- 把考卷單字題答錯的字（小寫、去頭尾空白）加進 `services/mistakeBook/drills/seedWords.ts`（一份考卷一筆，id 用考卷日期）。
- 這些字會在孩子的裝置上第一次開 App 時降到第 1 箱並標 `needsContext`；每個字都要有至少 2 題句子題，否則解除不了（測試會擋）。

## 3. 寫變化題
- 新增 `services/mistakeBook/drills/<考卷日期>.ts`，並加進 `drills/index.ts`。
- 每個種子擴 3–4 題，每題只改 1–2 個維度；**每題只能有一個可接受答案**：干擾項不是詞性放不進空格，就是和句意矛盾。「也說得通」的字寫進 `alsoFits`，不當選項。
- 易混字組（`confusionSets.ts`）的每個字至少 2 句、線索不同（`clue`）。
- 題幹用現在簡單式的單元就不要混進過去式；單字要在小學程度（不確定的字用簡單的字換掉）；中文解釋要精確。

## 4. 驗證
```bash
node scripts/mistakeBook/validate_import.cjs   # 欄位、id、技能是否登記
npm test                                       # 含 drills 驗證（選項、空格、targetWords、技能登記…）
npx tsc --noEmit
npx vite build
```

## 5. 盲解 + 審題（驗證程式抓不到語意歧義）
- 把題目（**不含答案**）交給一個沒看過答案的檢查者，請它列出「所有放進去文法正確又合理的選項」；與標準答案不同的就是歧義。
- 再請一個檢查者看「答案 + 中文解釋」，專找第二答案、不自然的句子、解釋錯誤。
- 最好有一個不同系列的模型當第二意見；同系列模型的盲點可能相同，所以家長仍要過目。
- 家長看過（審題頁）才進 commit。

## 6. 提交與部署
- commit 訊息：`Import <考卷日期> mistakes and drills`；`main` 一 push 就會部署到孩子正在用的網站，先在分支上確認。
- 不要改 `APP_VERSION`（App.tsx 改版本號會清掉孩子的單字熟練度）。
