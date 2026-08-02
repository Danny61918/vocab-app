# P2 — Answer Log · DESIGN

> 依 [REQUIREMENTS.md](./REQUIREMENTS.md)、[ADR-002](./ADR-002-wordid-composite-key.md)。新檔：`services/answerLog.ts`。

## 資料模型
```ts
export type AnswerSource = 'srs' | 'server';
export type AnswerGameType =
  | 'multiple_choice' | 'matching' | 'cloze' | 'sentence_cloze' | 'chinese_to_english';

export interface AnswerRecord {
  wordId: string;      // 複合 key "<source>:<id>"（ADR-002）
  gameType: AnswerGameType;
  correct: boolean;
  responseMs: number;
  date: string;        // 'YYYY-MM-DD'
}
```
localStorage key `vocab_answer_log`；環形緩衝上限 `MAX_RECORDS = 2000`。

## API（`services/answerLog.ts`）
- `makeWordKey(source, id): string` / `parseWordKey(key): {source,id}`
- `loadAnswerLog(): AnswerRecord[]`
- `logAnswer(entry, deps?): AnswerRecord` — append + 環形裁切（保留最後 2000）。`deps?:{now?,today?}` 注入式；`date` 預設 `localYmd(now)`（複用 `srsStorage.localYmd`，單一時間來源）。
- `errorRateByGameType(log?): GameTypeErrorStat[]` — 聚合 `{gameType, attempts, errors, errorRate}`。
- `clearAnswerLog()`。

## 埋点點（TASK-04b，本 chunk 不做）
- `components/QuizArea.tsx`：四題型作答判定處呼叫 `logAnswer`，`responseMs` 由題目呈現到作答的時間差；`wordId = makeWordKey('server', targetWord.id)`；`gameType` 由 `GameType` enum 映射。
- `components/SmartDailyReview.tsx`：SRS 複習作答處，`makeWordKey('srs', word.id)`。

## 診斷語意（給 P5）
- cloze 錯誤率高 → 拼寫弱（phonics）
- sentence_cloze 錯誤率高 → 語境/理解弱
- matching 錯誤率高 → 中英對應弱

## HANDOFF → PLAN/TASKS/E2E
見同資料夾。本 chunk 交付：資料層 + 測試（E2E-log-1~4）。埋点（TASK-04b）另一 chunk。
