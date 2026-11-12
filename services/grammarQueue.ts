import { GrammarQuestion } from '../types';

// Remembers, per grammar category, which question ids the player has already
// seen so consecutive battles don't repeat questions until the whole pool for
// that category has been used up. Local only (no cloud sync needed).
const SEEN_KEY = 'vocab_grammar_seen';

type SeenMap = Record<string, string[]>;

const loadSeen = (): SeenMap => {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? (JSON.parse(raw) as SeenMap) : {};
  } catch {
    return {};
  }
};

const saveSeen = (seen: SeenMap) => {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    /* storage unavailable: just fall back to no memory */
  }
};

export const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Pick `count` distinct questions for a battle, preferring ones not yet seen
 * in this category. When the unseen pool runs short, the leftover unseen ones
 * are used first, then the seen list resets and the rest is topped up from the
 * full pool (excluding those already picked), so a battle never has duplicates.
 * Options are shuffled so the correct answer isn't always in the same slot.
 */
export const pickBattleQuestions = (
  category: string,
  pool: GrammarQuestion[],
  count: number,
): GrammarQuestion[] => {
  const seenMap = loadSeen();
  const seenIds = new Set(seenMap[category] ?? []);

  const unseen = shuffleArray(pool.filter(q => !seenIds.has(q.id)));
  let picked = unseen.slice(0, count);
  let newSeen: string[];

  if (picked.length >= count) {
    newSeen = [...seenIds, ...picked.map(q => q.id)];
  } else {
    // Pool exhausted: start a new cycle with the questions we just used.
    const pickedIds = new Set(picked.map(q => q.id));
    const refill = shuffleArray(pool.filter(q => !pickedIds.has(q.id)))
      .slice(0, count - picked.length);
    picked = [...picked, ...refill];
    newSeen = picked.map(q => q.id);
  }

  seenMap[category] = newSeen;
  saveSeen(seenMap);

  return shuffleArray(picked).map(q => ({ ...q, options: shuffleArray(q.options) }));
};
