# P5 — 家長診斷 · DESIGN

> 依 REQUIREMENTS。檔案：`services/answerLog.ts`（診斷/時間）、`services/srsStorage.ts`（逾期字）、`components/AnalyticsDashboard.tsx`（家長面板 UI）。

## 純函式（可測）
### `services/answerLog.ts`
```ts
export const GAME_TYPE_DIAGNOSIS: Record<AnswerGameType, string>; // 白話標籤
export interface Diagnosis extends GameTypeErrorStat { label: string; weak: boolean; }
export function diagnoseByGameType(log?, opts?: {minAttempts?; weakRate?}): Diagnosis[];
//  weak = attempts >= minAttempts(預設5) && errorRate >= weakRate(預設0.34)
export function dailyStudyMinutes(log?): { date: string; minutes: number }[]; // 依日期加總 responseMs/60000
```
標籤：cloze→「拼寫較弱（字母/發音）」、sentence_cloze→「語境/閱讀理解較弱」、matching→「中英對應較弱」、multiple_choice→「詞義辨識較弱」、chinese_to_english→「由中文想英文較弱」。

### `services/srsStorage.ts`
```ts
export interface OverdueWord { word: VocabWord; daysOverdue: number; boxLevel: number; }
export function getOverdueWords(deps?): OverdueWord[]; // dueDate<=now，依 daysOverdue 降冪
```

## UI（`AnalyticsDashboard.tsx`）
- 標題 pointerDown 起計時，按住 `PARENT_HOLD_MS = 1500ms` → `setParentUnlocked(true)`；pointerUp/leave 前放開則取消。
- 解鎖後於頁尾顯示「家長診斷（僅家長）」面板：
  1. 錯誤類型：`diagnoseByGameType()`，weak 者標紅＋顯示 label 與 errorRate。
  2. 逾期字清單：`getOverdueWords()` 前 N 個（英文/中文/逾期天數）。
  3. 每日投入時間：`dailyStudyMinutes()` 近 7 天。
- 面板文案中性、無排名/退步字眼；孩子端未長按不出現。

## 測試（E2E-p5-*）
diagnoseByGameType 標籤/weak 判定、dailyStudyMinutes 加總、getOverdueWords 排序與過濾。
