import { localYmd } from './srsStorage';

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
