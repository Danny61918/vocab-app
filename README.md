# Vocabulary Master - 英文單字快速複習

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Danny61918/vocab-app/deploy.yml?branch=main&style=for-the-badge)](https://github.com/Danny61918/vocab-app/actions)

這是一個專為學生設計的英文單字複習應用程式。單字庫跟著學校的**每週單字背誦表**成長，搭配多種測驗、間隔複習（SRS）、怪獸收集與家長分析，讓孩子每天都有東西可以練、也有理由繼續練。

資料以瀏覽器 `localStorage` 為主（離線可用），並用 Firebase 匿名登入加 Firestore 做雲端備份，換裝置不會丟進度。

## ✨ 功能亮點 (Features)

### 🔹 測驗題型 (Game Types)

- **選擇題 (Multiple Choice):** 根據中文意思，選擇正確的英文單字。
- **配對題 (Matching):** 根據英文單字，選擇正確的中文意思；高難度下還要配對詞性。
- **克漏字 (Cloze):** 根據提示字元，拼寫出完整的英文單字（含字母方塊拼字）。
- **例句填空 (Sentence Cloze):** 從四個選項中，選出最適合填入例句空格的單字。
- **文法挑戰 (Grammar):** 介系詞、時態、所有格、There be 等文法 Boss 戰。
- **主題複習 (Topic Review):** 短文式的主題單字複習。
- **片語挑戰 (Phrase Challenge):** 片語練習。

### 🔹 三種挑戰模式 (Game Modes)

- **練習模式 (Practice):** 無時間限制，可聽單字、聽例句（含慢速），專注學習。
- **計時模式 (Timed):** 在限定時間內挑戰最高分。
- **挑戰模式 (Challenge):** 每日挑戰與考前衝刺（大考單字清單）。

### 🔹 難易度 (Difficulty)

- **簡單 (Easy):** 干擾選項為隨機抽取的其他單字。
- **中等 (Medium):** 干擾選項是拼法或長度相似的單字。
- **困難 (Hard):** 干擾選項包含自動產生的「偽單字」(typos)，考驗拼寫。

### 🔹 間隔複習：單字島大冒險 (SRS)

- 採 Leitner 盒子制，複習間隔固定為 `[0, 1, 3, 7, 14, 30]` 天。
- 每天最多推送 **5 個新字**（`MAX_NEW`），新字優先挑**最近匯入**的，所以當週學校單字會先出現。
- 每 10 個單字為一個關卡，在冒險地圖上推進。

### 🔹 動機與回顧

- **怪獸圖鑑與金幣：** 答題賺金幣、收集並養成怪獸。
- **成就、連續天數、英雄榜：** 記錄最高分與連續練習天數。
- **錯題本：** 把考卷與作業的錯題整理成可複習的清單。
- **創作工坊：** 孩子可以自訂內容、共同創作。
- **手寫中文：** 用 `hanzi-writer` 練習中文字的筆順。
- **家長分析：** 長按標題可展開僅限家長的學習診斷面板（不會顯示給孩子看）。

## 🛠️ 技術棧 (Tech Stack)

- **前端：** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI / 圖表：** [Lucide React](https://lucide.dev/)、[Recharts](https://recharts.org/)、`canvas-confetti`、`hanzi-writer`
- **雲端：** [Firebase](https://firebase.google.com/)（匿名登入 + Firestore 備份）
- **測試：** [Vitest](https://vitest.dev/) + jsdom
- **語音：** 單字與例句音檔由本機 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 離線批次產生，找不到音檔時退回瀏覽器 TTS
- **部署：** [GitHub Pages](https://pages.github.com/)，push 到 `main` 後由 GitHub Actions 自動建置部署

## 📂 專案結構

此專案**沒有 `src/` 資料夾**，程式碼直接放在根目錄：

```
vocab-app/
├── App.tsx                     # 主程式（頁面切換與全域狀態）
├── index.tsx / index.html      # 進入點
├── types.ts                    # 全域 TypeScript 型別
├── components/                 # React 元件（QuizArea、PracticeView、SmartDailyReview ...）
├── services/                   # 資料與商業邏輯
│   ├── serverData.ts           # 主要單字庫 ✨（新增單字改這裡）
│   ├── exampleSentencesData.ts # 每個單字額外的 5 句例句
│   ├── newVocabData.ts         # 單字島（SRS）專用字庫，由腳本同步
│   ├── srsStorage.ts           # Leitner 盒子與每日新字邏輯
│   ├── gameLogic.ts            # 題目產生邏輯
│   ├── storage.ts              # localStorage 存取
│   ├── cloudSync.ts            # Firestore 雲端備份
│   ├── firebaseConfig.ts       # Firebase 設定
│   └── mistakeBook/            # 錯題本資料與工具
├── scripts/
│   ├── sync_vocab_data.cjs     # 把 serverData 同步進 SRS 字庫
│   └── tts/                    # 語音批次產生腳本
├── public/
│   ├── audio/                  # 單字與例句 mp3（隨 build 部署）
│   ├── images/                 # 圖片資產
│   └── monsters/               # 怪獸圖片
├── firestore.rules             # Firestore 安全規則
├── .doc/                       # 設計文件、ADR、開發日誌（v2.0 各階段）
├── .agents/skills/             # 「新增單字」等工作流程說明
└── .github/workflows/          # GitHub Pages 自動部署
```

## 🚀 如何在本機運行

1. **Clone 專案**
   ```bash
   git clone https://github.com/Danny61918/vocab-app.git
   cd vocab-app
   ```

2. **安裝依賴套件**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   應用程式會運行在 `http://localhost:5173`。

4. **測試與建置**
   ```bash
   npm test            # Vitest 單次執行
   npx tsc --noEmit    # 型別檢查
   npm run build       # 產出 dist/
   ```

## 📝 如何新增單字

單字來自學校的每週單字背誦表。**新增一批單字要依序做完下面 6 步**。漏掉任何一步 App 仍可運作，但對應功能會缺資料或退回舊內容。

| # | 要做的事 | 檔案 / 指令 |
|---|---|---|
| 1 | 新增單字，id 接在目前最大 id 後面 | `services/serverData.ts` |
| 2 | 每個單字補 **5 句**額外例句，key 用單字 id | `services/exampleSentencesData.ts` |
| 3 | 檢查 id 沒有重複、語法正確 | `npx tsc --noEmit` |
| 4 | 產生**例句**語音 | 見下方「語音」 |
| 5 | 產生**單字**語音 | 見下方「語音」 |
| 6 | 同步單字島字庫 | `node scripts/sync_vocab_data.cjs`（可加 `--dry-run` 預覽，可重複執行） |

**單字格式：**

```typescript
// services/serverData.ts
{ "id": 1101, "date": "2026-11-02", "english": "dizzy", "chinese": "頭暈的", "part_of_speech": "(adj.)", "example": "After riding on the roller coaster, I feel dizzy." }
```

- `part_of_speech` 一律加括號：`(n.)` `(v.)` `(adj.)` `(adv.)` `(prep.)` `(ph.)`。
- `date` 要填該單字所屬的**當週日期**，App 是依日期挑每週練習單字。
- **跨週重複的單字也要重新新增一筆**（新 id、新日期），不要因為以前出現過就略過。
- `example` 優先使用課本的 `e.g.` 例句，沒有再自己寫。
- 中文只留漢字，不要帶注音符號；課本上標 `*` 的延伸備註不另外建單字。

### 🔊 語音

需要 Kokoro TTS 的 Python 環境（固定放在 `E:\Code\tools\tts-env`，路徑要純英文，Windows 上中文路徑會讓 venv 初始化失敗）。

```bash
# 例句語音
node scripts/tts/export_sentences.cjs > scripts/tts/sentences.json
E:\Code\tools\tts-env\Scripts\python.exe scripts\tts\generate_sentence_audio.py --ids 1101-1124

# 單字語音
node scripts/tts/export_words.cjs > scripts/tts/words.json
E:\Code\tools\tts-env\Scripts\python.exe scripts\tts\generate_word_audio.py --ids 1101-1124
```

- 腳本只會補**還沒有音檔**的 id，可重複執行；加 `--dry-run` 先預覽。
- 輸出到 `public/audio/`：`{id}.mp3` / `{id}_slow.mp3`（例句）、`word_{id}.mp3` / `word_{id}_slow.mp3`（單字）。
- 匯出 JSON 請用 `node ... > file`（`cmd` 或 bash 重導向）。在 Windows PowerShell 5.1 用 `Out-File` 會多加 BOM，Python 會讀不了。
- 跳過這步不會壞掉，App 會退回瀏覽器 TTS，只是音質差一些。

## 🔒 安全與雲端

- `services/firebaseConfig.ts` 內的 Firebase 設定是**公開識別碼**，可以放進版控；真正的保護靠 Firestore 安全規則。
- `firestore.rules` 只允許登入使用者讀寫自己的 `/users/{uid}` 文件，其餘一律拒絕。更新規則需要到 Firebase Console 手動貼上並發佈。

## 📚 設計文件

`.doc/v2.0/` 底下有 v2.0 各階段的需求、設計、ADR 與開發日誌（SRS 核心、答題紀錄、防作弊、怪獸、家長分析、雲端同步、共創、句子語音），開發流程規範見 `.doc/v2.0/WORKFLOW.md`。
