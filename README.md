# Vocabulary Master - 英文單字快速複習 APP (v6.1 Precision Update)

這是一個專為學生設計的高性能英文單字複習應用程式，採用 **React 18** + **TypeScript** 開發。本專案特別針對**無後端環境**（如個人 NAS、GitHub Pages 或靜態網頁空間）進行優化，具備精確的學習數據追蹤與自動化資料更新工作流。

## 🌟 核心特色 (Core Features)

### 📊 精準學習數據統計 (New!)
- **實時正確率計算**: 修正了統計邏輯，精確追蹤每一次「嘗試 (Attempt)」與「錯誤 (Error)」。
- **掌握度分析**: 自動識別「已精通」單字（正確率 > 80% 且練習超過 2 次）。
- **弱項強化系統**: 自動彙整常錯單字 (Weak Words) Top 5，提供針對性複習。

### 🎮 多樣化測驗模式
1. **單字記憶 (Multiple Choice)**: 視圖中文意思，從相似單字中選出正確英文。
2. **中文詞義配對 (Chinese Match)**: 專為聽寫設計，看中文（含注音提示）選出對應英文。
3. **英文單字配對 (English Match)**: 強化詞性認知，看英文選出中文意思與正確詞性。
4. **單字克漏字 (Cloze)**: 挑戰拼寫能力，根據難度動態隱藏字母 (50% ~ 90%)。

### 🚀 專業遊戲機制
- **練習模式 (Practice)**: 無限題數，具備「防重複出題」機制，確保在單字庫循環中獲得最佳複習效果。
- **計時挑戰 (Timed Challenge)**: 60秒極限挑戰，激發大腦瞬間反應速度，並記錄至英雄榜。
- **每日闖關 (Daily Challenge)**: 
  - 支援「舊單字複習」與「新單字預習」雙模式。
  - **三階段任務**: 記憶 (中級) → 配對 (中級) → 拼寫 (高級)。
  - 結算畫面提供完整正確率分析與該次任務的錯題集。

## 🛠️ 技術堆疊 (Tech Stack)

- **框架**: React 18 (Hooks API / Context)
- **語言**: TypeScript (嚴格型別定義)
- **樣式**: Tailwind CSS (響應式設計、自定義動畫)
- **圖表**: Recharts (視覺化學習趨勢)
- **圖示**: Lucide React
- **部署**: 支援所有靜態網頁伺服器 (NAS, S3, Vercel, etc.)

## 📁 專案結構說明

- `src/components/`:
  - `QuizArea.tsx`: 核心測驗引擎，負責題目分發與答題反饋。
  - `DailyChallenge.tsx`: 闖關模式狀態機。
  - `AnalyticsDashboard.tsx`: 基於 LocalStorage 的數據分析儀表板。
  - `WordManager.tsx`: 資料管理中心與代碼生成器。
- `src/services/`:
  - `gameLogic.ts`: 包含 Fisher-Yates 隨機演算法與難度干擾項生成邏輯。
  - `storage.ts`: 封裝 LocalStorage，處理持久化統計與排行榜。
  - `serverData.ts`: **靜態資料庫核心**。

## ⚙️ 資料更新工作流 (Data Workflow)

本應用程式採用「代碼即資料」的設計哲學，適合 NAS 靜態部署：

1. 進入 **「單字庫管理」** 介面。
2. 使用 **「新增」** 或 **「批次匯入」** (支援 Excel/CSV 貼上) 加入新單字。
3. 切換至 **「導出代碼」** 分頁。
4. 點擊 **「複製代碼」**。
5. 在開發環境中將內容覆蓋至 `src/services/serverData.ts`。
6. 重新編譯 `npm run build`，即可完成資料永久更新，無需資料庫後端。

## 🚀 快速啟動

### 開發模式
```bash
npm install
npm start
```

### 生產建置
```bash
npm run build
```

---
© 2025 Vocabulary Master. 由資深前端工程師團隊設計，專注於極致的學習體驗。