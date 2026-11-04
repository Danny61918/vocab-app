import { vocabData } from '../newVocabData';
import { loadMasteryData, saveMasteryData, SrsDeps, updateWordMastery } from '../srsStorage';
import { getTodayDrill, recordDrillAnswer } from './drillProgress';
import { ALL_DRILLS } from './drills';
import { SEED_WORD_MISTAKES, SeedWordMistakes } from './drills/seedWords';
import { DrillItem } from './drills/types';

// Links the mistake drill to the vocabulary SRS. The same word can have several vocab ids
// (traffic jam is s452 and s1105), and the SRS schedules per id, so every id is updated together.

const SEEDED_KEY = 'vocab_seeded_mistakes'; // ids of SEED_WORD_MISTAKES already applied (synced, cloudSync.ts)

const norm = (s: string) => s.trim().toLowerCase();

let idIndex: Map<string, string[]> | null = null;

export function idsForWord(word: string): string[] {
  if (!idIndex) {
    idIndex = new Map();
    for (const v of vocabData) {
      const k = norm(v.word);
      idIndex.set(k, [...(idIndex.get(k) ?? []), v.id]);
    }
  }
  return [...(idIndex.get(norm(word)) ?? [])];
}

function loadSeeded(): string[] {
  try {
    const raw = localStorage.getItem(SEEDED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

// Words missed on a paper exam: drop every id to box 1 and require a sentence answer before the
// box can grow again. Each seed is applied once; returns how many seeds were applied now.
export function applySeedWordMistakes(
  deps?: SrsDeps,
  seeds: SeedWordMistakes[] = SEED_WORD_MISTAKES
): number {
  const done = new Set(loadSeeded());
  const fresh = seeds.filter((s) => !done.has(s.id));
  if (fresh.length === 0) return 0;

  for (const seed of fresh) {
    for (const word of seed.words) {
      for (const id of idsForWord(word)) updateWordMastery(id, false, deps);
    }
  }
  const mastery = loadMasteryData(deps);
  for (const seed of fresh) {
    for (const word of seed.words) {
      for (const id of idsForWord(word)) {
        if (mastery[id]) mastery[id] = { ...mastery[id], needsContext: true, contextCorrectDays: 0 };
      }
    }
  }
  saveMasteryData(mastery);

  localStorage.setItem(SEEDED_KEY, JSON.stringify([...done, ...fresh.map((s) => s.id)]));
  import('../cloudSync').then((m) => m.schedulePush()).catch(() => {});
  return fresh.length;
}

// A drill answer counts for the answer word only (never the distractors). Grammar items have no
// targetWords, so they leave the vocabulary alone.
export function applyDrillToVocab(item: DrillItem, correct: boolean, deps?: SrsDeps) {
  for (const word of item.targetWords ?? []) {
    for (const id of idsForWord(word)) updateWordMastery(id, correct, deps, 'context');
  }
}

export function answerDrill(item: DrillItem, picked: string, ms: number, deps?: SrsDeps): { correct: boolean } {
  const result = recordDrillAnswer(item, picked, ms, deps);
  applyDrillToVocab(item, result.correct, deps);
  return result;
}

// Words in today's drill plan. Building the plan here (it is cached for the day) lets the daily
// word review run first and still skip them.
export function getPlannedTargetWords(deps?: SrsDeps, items: DrillItem[] = ALL_DRILLS): Set<string> {
  const out = new Set<string>();
  for (const item of getTodayDrill(deps, items)) {
    for (const w of item.targetWords ?? []) out.add(norm(w));
  }
  return out;
}

export interface ConfusionPair {
  answer: string;
  picked: string;
  count: number;
}

// Which wrong word the child picked for which right word, from the recent attempts of each
// confusion set. Derived on demand, not stored.
export function getConfusionPairs(items: DrillItem[] = ALL_DRILLS): ConfusionPair[] {
  const byId = new Map(items.map((i) => [i.id, i]));
  const counts = new Map<string, ConfusionPair>();
  const setIds = new Set(items.map((i) => i.confusionSetId).filter((x): x is string => !!x));

  let progress: Record<string, { recent: { itemId: string; correct: boolean; picked?: string }[] }> = {};
  try {
    progress = JSON.parse(localStorage.getItem('vocab_skill_progress') || '{}');
  } catch {
    progress = {};
  }
  for (const setId of setIds) {
    for (const a of progress[setId]?.recent ?? []) {
      const item = byId.get(a.itemId);
      if (!item || a.correct || !a.picked) continue;
      const key = `${norm(item.answer)}|${norm(a.picked)}`;
      const cur = counts.get(key) ?? { answer: norm(item.answer), picked: norm(a.picked), count: 0 };
      cur.count += 1;
      counts.set(key, cur);
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count);
}
