# ADR-002 — Answer Log 用複合字串 key 橋接雙資料集

- 狀態：Accepted
- 日期：2026-08-02
- 脈絡階段：P2 Answer Log

## 脈絡
app 有兩套單字資料集：SRS/圖鑑用 `newVocabData`（**string** id，如 `"knight_a1b2c"`）；四種經典題型用 `serverData`（**number** id）。Answer Log 要記錄「哪個字被作答」，必須同時容納兩種來源，且未來要能 join 回原資料集做診斷。

## 決策
`AnswerRecord.wordId` 型別為 **string**，內容是複合 key `"<source>:<id>"`：
- SRS 來源：`srs:knight_a1b2c`
- serverData 來源：`server:802`

提供 `makeWordKey(source, id)` 產生、`parseWordKey(key)` 還原。

## 理由
- 單一 string 欄位即可容納兩套 id，schema 簡單、Firestore（P6）好存。
- 帶 source 前綴 → 聚合/診斷時能區分來源，也能 join 回正確資料集。
- 不需在 answerLog 引入 union 型別或雙欄位，呼叫端埋点只傳一個 key。

## 後果
- 正面：資料層與兩套 id 解耦；P5 聚合、P6 上雲皆單純。
- 取捨：查原始字義需先 `parseWordKey` 再查對應資料集（可接受）。
- 相容：gameType 用途已隱含來源（cloze/sentence_cloze/matching/multiple_choice 多屬 serverType），但仍顯式帶 source 以免歧義。

## 相關
- [REQUIREMENTS.md](./REQUIREMENTS.md) FR-3、[DESIGN.md](./DESIGN.md)
