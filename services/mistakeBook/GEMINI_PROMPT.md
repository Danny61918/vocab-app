# 錯題本匯入用 Gemini 提示詞

每次拍完小孩的考卷（錯題部分），把下面這段提示詞 + 考卷照片一起貼給 Gemini，
它產生的 JSON 直接丟給 Claude（貼在對話裡）即可，Claude 會負責校對、分類、
寫進 `services/mistakeBook/data/`，不需要自己改欄位或格式。

這份提示詞的欄位設計是給「人／Claude 讀」用的草稿格式，不是最終存檔格式——
Gemini 吐出來的東西不保證每次長得一模一樣（不同題型、不同考卷排版），這是預期
中的事，Claude 匯入時才會做真正的正規化。這份提示詞的目的只是讓 Gemini 的草稿
盡量乾淨好讀，減少 Claude 翻譯時要猜的地方。

---

## 提示詞內容（複製這段 + 附上考卷照片）

```
你是一位細心的國小英文老師，請幫我分析這張英文考卷的照片，只整理出「答錯的題目」。

請用台灣繁體中文、台灣用語回答（不要用中國大陸的詞彙或簡體字）。

針對每一題答錯的題目，請提供以下資訊：

1. section：這題屬於考卷上的哪個小節／題型（照考卷上寫的名稱，例如
   "Reading 2"、"Grammar - Choose the CORRECT sentence"、"Vocabulary - Fill in
   the blanks" 等）
2. question：完整的題目文字，包含題號，照考卷原文照抄，不要改寫或簡化
3. options：如果是選擇題，列出全部選項（照抄，含 (a)(b)(c)(d) 之類的標號）；
   如果不是選擇題（例如造句、填空、改錯），這欄位可以省略
4. student_answer：孩子實際寫的答案
5. correct_answer：正確答案
6. error_type：用簡短的一句話描述這是哪一種錯誤（例如：大小寫、不規則複數、
   介系詞用錯、看錯關鍵字、代名詞指涉錯誤...），自由描述即可，不用套固定分類
7. teacher_explanation：用家長看得懂的白話中文，解釋「正確答案為什麼是這個」、
   孩子的錯誤邏輯可能是什麼
8. review_advice：給家長的具體在家複習建議，要是可以馬上照做的具體動作，不要
   空泛的「多練習」

如果考卷上看得到日期或考試名稱（例如「第二次段考」「Level 7 Week 6」），也請
一併告訴我，放在最上層的 exam_date（YYYY-MM-DD，看不出完整日期就盡量寫出看
得到的部分）和 exam_name。

請用以下 JSON 格式輸出，不要加其他說明文字：

{
  "exam_date": "...",
  "exam_name": "...",
  "incorrect_questions": [
    {
      "section": "...",
      "question": "...",
      "options": ["...", "..."],
      "student_answer": "...",
      "correct_answer": "...",
      "error_type": "...",
      "teacher_explanation": "...",
      "review_advice": "..."
    }
  ]
}
```

---

## 拿到 Gemini 的回覆之後

直接把整段 JSON 貼給 Claude，說「幫我匯入這份考卷的錯題」即可。Claude 會：

1. 核對題數（Gemini 給幾題、實際寫入幾題，數字對不上會先問你）
2. 把每題的 `error_type` 自由文字對應到固定的 9 大分類
   （`services/mistakeBook/categoryMap.ts`）
3. 用「考試日期＋題目＋正確答案」算出穩定 ID，避免同一份考卷重複匯入
4. 寫進 `services/mistakeBook/data/<考試日期>.ts`，並跑驗證腳本
   （`scripts/mistakeBook/validate_import.cjs`）確認格式正確、沒有重複

如果 Gemini 沒抓到考試日期，Claude 會直接問你。
