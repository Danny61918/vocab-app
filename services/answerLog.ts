import { localYmd } from './srsStorage';
import { GameType } from '../types';

// Which dataset the word came from (app has two: SRS newVocabData vs serverData). See ADR-002.
export type AnswerSource = 'srs' | 'server';

export type AnswerGameType =
  | 'multiple_choice'
  | 'matching'
  | 'cloze'
  | 'sentence_cloze'
  | 'chinese_to_english';

export interface AnswerRecord {
  wordId: string; // composite key "<source>:<id>"
  gameType: AnswerGameType;
  correct: boolean;
  responseMs: number;
  date: string; // 'YYYY-MM-DD'
}

const ANSWER_LOG_KEY = 'vocab_answer_log';
export const MAX_RECORDS = 2000;

// Map the QuizArea GameType enum to the answer-log game type.
export function gameTypeToAnswerGameType(gt: GameType): AnswerGameType {
  switch (gt) {
    case GameType.MULTIPLE_CHOICE:
      return 'multiple_choice';
    case GameType.MATCHING:
      return 'matching';
    case GameType.CLOZE:
      return 'cloze';
    case GameType.SENTENCE_CLOZE:
      return 'sentence_cloze';
    case GameType.CHINESE_TO_ENGLISH:
      return 'chinese_to_english';
    default:
      return 'multiple_choice';
  }
}

// ---- composite word key (bridges the two datasets) ----
export function makeWordKey(source: AnswerSource, id: string | number): string {
  return `${source}:${id}`;
}

export function parseWordKey(key: string): { source: AnswerSource; id: string } {
  const idx = key.indexOf(':');
  if (idx === -1) return { source: 'server', id: key };
  return { source: key.slice(0, idx) as AnswerSource, id: key.slice(idx + 1) };
}

// ---- storage ----
export function loadAnswerLog(): AnswerRecord[] {
  try {
    const data = localStorage.getItem(ANSWER_LOG_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAnswerLog(records: AnswerRecord[]) {
  localStorage.setItem(ANSWER_LOG_KEY, JSON.stringify(records));
  // P6: schedule cloud backup
  import('./cloudSync').then((m) => m.schedulePush()).catch(() => {});
}

export function clearAnswerLog() {
  localStorage.removeItem(ANSWER_LOG_KEY);
}

export interface LogDeps {
  now?: number;
  today?: string;
}

// Append one answer. Ring buffer keeps only the most recent MAX_RECORDS. Time is injectable.
export function logAnswer(
  entry: {
    wordId: string;
    gameType: AnswerGameType;
    correct: boolean;
    responseMs: number;
    date?: string;
  },
  deps?: LogDeps
): AnswerRecord {
  const now = deps?.now ?? Date.now();
  const date = entry.date ?? deps?.today ?? localYmd(now);
  const record: AnswerRecord = {
    wordId: entry.wordId,
    gameType: entry.gameType,
    correct: entry.correct,
    responseMs: entry.responseMs,
    date,
  };

  const log = loadAnswerLog();
  log.push(record);
  const trimmed = log.length > MAX_RECORDS ? log.slice(log.length - MAX_RECORDS) : log;
  saveAnswerLog(trimmed);
  return record;
}

// ---- aggregation for the parent view (P5) ----
export interface GameTypeErrorStat {
  gameType: AnswerGameType;
  attempts: number;
  errors: number;
  errorRate: number; // errors / attempts, 0 when no attempts
}

export function errorRateByGameType(log: AnswerRecord[] = loadAnswerLog()): GameTypeErrorStat[] {
  const buckets = new Map<AnswerGameType, { attempts: number; errors: number }>();
  for (const r of log) {
    const b = buckets.get(r.gameType) ?? { attempts: 0, errors: 0 };
    b.attempts += 1;
    if (!r.correct) b.errors += 1;
    buckets.set(r.gameType, b);
  }
  return Array.from(buckets.entries()).map(([gameType, b]) => ({
    gameType,
    attempts: b.attempts,
    errors: b.errors,
    errorRate: b.attempts === 0 ? 0 : b.errors / b.attempts,
  }));
}

// ---- Parent diagnosis (P5): plain-language read of where the child struggles ----
// Never shown to the child; parent-only view.
export const GAME_TYPE_DIAGNOSIS: Record<AnswerGameType, string> = {
  cloze: '拼寫較弱（字母／發音）',
  sentence_cloze: '語境／閱讀理解較弱',
  matching: '中英對應較弱',
  multiple_choice: '詞義辨識較弱',
  chinese_to_english: '由中文想英文較弱',
};

export interface Diagnosis extends GameTypeErrorStat {
  label: string;
  weak: boolean;
}

export function diagnoseByGameType(
  log: AnswerRecord[] = loadAnswerLog(),
  opts?: { minAttempts?: number; weakRate?: number }
): Diagnosis[] {
  const minAttempts = opts?.minAttempts ?? 5;
  const weakRate = opts?.weakRate ?? 0.34;
  return errorRateByGameType(log).map((s) => ({
    ...s,
    label: GAME_TYPE_DIAGNOSIS[s.gameType],
    weak: s.attempts >= minAttempts && s.errorRate >= weakRate,
  }));
}

// Minutes of study per day, summed from answer response times.
export function dailyStudyMinutes(
  log: AnswerRecord[] = loadAnswerLog()
): { date: string; minutes: number }[] {
  const byDate = new Map<string, number>();
  for (const r of log) {
    byDate.set(r.date, (byDate.get(r.date) ?? 0) + r.responseMs);
  }
  return Array.from(byDate.entries())
    .map(([date, ms]) => ({ date, minutes: Math.round((ms / 60000) * 10) / 10 }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}
