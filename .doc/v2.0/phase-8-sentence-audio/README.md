# P8 — 例句自然語音（骨架）

> 狀態：🟡 骨架，先過人工 GATE 再落地實作。
> 起因：使用者回饋「練習」頁的瀏覽器 TTS 例句聽起來機械感重；單字本身可接受，不用動。
> 相依：P（練習頁，`components/PracticeView.tsx`）。風險：**中**（批次腳本 + 新增部署資產）。

## 範圍摘要
- 用 Kokoro-82M（開源、本機 GPU 推論，`hexgrad/Kokoro-82M`）離線批次生成**例句**語音，單字發音維持現況（瀏覽器 `speechSynthesis`）不變。
- 每個單字只生成一句（採 `PracticeView.sentencesFor()` 同一優先序：`EXTRA_SENTENCES[id][0]` 優先，否則 `serverData[id].example`），各生 **正常速（1.0x）+ 慢速（0.7x）** 兩版。
- 音檔格式：MP3 / 48kbps / mono（相容 Safari/iOS；OGG-Opus 在 Safari 不穩定，已實測排除）。單句約 15–30KB，全庫（~978 字 ×2 速度）估算 <60MB。
- 存放位置：`vocab-app/public/audio/{wordId}.mp3`、`{wordId}_slow.mp3`，隨 `vite build` 一起進 GitHub Pages（沿用 `public/monsters/` 的既有模式，不需額外服務）。
- 生成腳本：`scripts/tts/generate_sentence_audio.py`（Python venv + Kokoro + ffmpeg 轉碼），每週新增單字後要重跑一次，只補新 id、不動已存在檔案。
- `PracticeView.tsx` 播放邏輯：優先 `new Audio('audio/{id}[_slow].mp3').play()`；載入/播放失敗（檔案不存在、離線等）時 fallback 回原本的瀏覽器 `speechSynthesis`，使用者體感只差在音質，不會整個功能壞掉。

## Out of Scope
- 單字本身發音（維持瀏覽器 TTS）。
- 多聲音/ 多情緒版本（先固定 `af_heart`，之後要換聲音再開新版）。
- 舊週次以外語句（如 `EXTRA_SENTENCES` 裡第 2–5 句）不生語音，UI 本來也只播第一句。

## 對應 E2E
- 有音檔的單字：點「💬 唸例句」／「🐢 慢速例句」播放對應 mp3，音質明顯優於瀏覽器 TTS。
- 無音檔的單字（例如批次腳本漏跑的新週次）：自動 fallback 瀏覽器 TTS，不出現空按鈕或錯誤。
- `npm run build` 產物含 `dist/audio/*.mp3`，GitHub Pages 部署後可直接播放。

## GATE（高風險，人工確認）
- ✅ 已完成：先用 3 句樣本試聽（女聲 `af_heart` ×2、男聲 `am_michael` ×1）+ 正常/慢速對比，使用者已確認滿意。
- ⏳ 全庫批次生成（~2000 個檔案）前：先跑一個小批次（例如最新一週 24 字）供人工確認格式/檔名/播放邏輯都對，再擴大到全庫。
- ⏳ **commit + push 部署**：一律等使用者明確說「可以部署」才執行，即使批次跑完、build 也過。

## HANDOFF IN
- `services/serverData.ts`、`services/exampleSentencesData.ts`：word id ↔ 例句對照表。
- `components/PracticeView.tsx` 的 `sentencesFor()`：句子挑選優先序的唯一真實來源，批次腳本要保持邏輯一致（否則播放的音檔內容會跟畫面顯示的文字對不上）。

## HANDOFF OUT
- 之後每週用 `add_vocabulary` / `image_to_vocab` skill 加新單字後，要記得補跑 `scripts/tts/generate_sentence_audio.py`（只需跑新 id，腳本會跳過已存在檔案），否則新單字會暫時 fallback 瀏覽器 TTS，功能仍正常但音質較機械。
