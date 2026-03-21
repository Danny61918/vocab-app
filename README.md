# Vocabulary Master - 英文單字快速複習

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Danny61918/vocab-app/deploy.yml?branch=main&style=for-the-badge)](https://github.com/Danny61918/vocab-app/actions)

這是一個專為學生設計的綜合性英文單字複習應用程式。透過多種遊戲模式、難易度分級和進度追蹤，幫助使用者有效率地記憶單字。

## ✨ 功能亮點 (Features)

本專案提供了豐富的測驗方式，讓背單字不再枯燥乏味。

### 🔹 多樣的遊戲模式 (Game Types)

- **選擇題 (Multiple Choice):** 根據中文意思，選擇正確的英文單字。
- **配對題 (Matching):** 根據英文單字，選擇正確的中文意思。在高難度下，還需要同時配對正確的詞性 (Part of Speech)。
- **克漏字 (Cloze):** 根據提示字元，拼寫出完整的英文單字。
- **例句填空 (Sentence Cloze):** 從四個選項中，選出最適合填入例句空格的單字，考驗真實語境下的應用能力。

### 🔹 三種挑戰模式 (Game Modes)

- **練習模式 (Practice):** 無時間限制，可無限作答，專注於學習與複習。
- **計時模式 (Timed):** 在限定時間內挑戰最高分，訓練反應速度。
- **挑戰模式 (Challenge):** 為每日挑戰或特定主題單字庫設計的特殊模式。

### 🔹 彈性的難易度分級 (Difficulty Levels)

- **簡單 (Easy):** 干擾選項為隨機抽取的其他單字。
- **中等 (Medium):** 干擾選項會是拼法或長度相似的單字，增加挑戰性。
- **困難 (Hard):** 干擾選項會包含自動生成的「偽單字」(typos)，極度考驗你對拼寫的熟悉度。

### 🔹 個人化學習與分析

- **即時成績結算:** 每次測驗結束後，提供詳細的成績單，包含總分、正確率、以及需要加強的單字列表。
- **英雄榜 (Leaderboard):** 記錄玩家在不同模式下的最高分，與自己或他人一較高下。
- **錯題回顧:** 答錯的單字會被特別整理出來，方便使用者針對弱點進行加強複習。

## 🛠️ 技術棧 (Tech Stack)

- **前端框架:** [React](https://react.dev/) (使用 [Vite](https://vitejs.dev/) 進行建構)
- **程式語言:** [TypeScript](https://www.typescriptlang.org/)
- **UI 元件:**
  - [Lucide React](https://lucide.dev/) (圖示庫)
  - [Recharts](https://recharts.org/) (圖表)
- **部署:** [GitHub Pages](https://pages.github.com/) (透過 GitHub Actions 自動化部署)

## 📂 專案結構

```
vocab-app/
├── .github/workflows/         # GitHub Actions 自動化部署設定
├── public/                    # 靜態資源
├── src/
│   ├── components/            # React 元件 (例如：QuizArea.tsx)
│   ├── services/              # 核心商業邏輯與資料處理
│   │   ├── serverData.ts      # 主要單字庫 ✨
│   │   ├── gameLogic.ts       # 遊戲題目生成邏輯
│   │   └── storage.ts         # 瀏覽器 localStorage 資料存取
│   ├── styles/                # 樣式檔案
│   └── types.ts               # 全域 TypeScript 型別定義
└── package.json
```

## 🚀 如何在本機運行

1.  **Clone 專案至本地**
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **安裝依賴套件**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```
    應用程式將會運行在 `http://localhost:5173`。

## 📝 如何貢獻單字

我們非常歡迎您擴充這個應用程式的單字庫！

1.  開啟 `src/services/serverData.ts` 檔案。
2.  在 `serverData` 陣列中，依照現有的物件格式新增單字。
    - `id` 會在程式啟動時自動重新編號，您可以先隨意填寫。
    - `example` 欄位是選填的，但強烈建議提供，以利「例句填空」模式正常運作。

```typescript
// src/services/serverData.ts

{ id: 999, date: "2026-03-28", english: "contribution", chinese: "貢獻", part_of_speech: "(n.)", example: "This is a great contribution to our project." }
```

完成後，提交一個 Pull Request 即可！