import serverData from './serverData';
import { EXTRA_SENTENCES } from './exampleSentencesData';
import { Word } from '../types';

/**
 * Normalize a word/phrase string for fuzzy matching.
 * Strips suffixes like (Br.), V-ing, N., sb., /alternatives, ...
 */
function normalizeForMatch(s: string): string {
  return s
    .split('/')[0]               // take only first alternative: "table tennis / tennis" → "table tennis"
    .replace(/\(.*?\)/g, ' ')    // remove (Br.), (US), etc.
    .replace(/\bV-ing\b/gi, '')  // remove V-ing
    .replace(/\bV\.\b/gi, '')    // remove V.
    .replace(/\bN\.\b/gi, '')    // remove N.
    .replace(/\bsb\.\b/gi, '')   // remove sb.
    .replace(/\.\.\./g, '')      // remove ...
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Build a lazy-loaded lookup map: normalizedEnglish → serverData Word
let _lookupMap: Map<string, Word> | null = null;

function getLookupMap(): Map<string, Word> {
  if (_lookupMap) return _lookupMap;
  _lookupMap = new Map();
  for (const word of serverData) {
    const key = normalizeForMatch(word.english);
    if (!_lookupMap.has(key)) {
      _lookupMap.set(key, word);
    }
  }
  return _lookupMap;
}

/**
 * Find the serverData Word entry that matches a given vocab word string.
 */
function findServerEntry(wordString: string): Word | null {
  const map = getLookupMap();
  const key = normalizeForMatch(wordString);
  return map.get(key) ?? null;
}

/**
 * Get ALL available example sentences for a given vocab word string.
 * Combines:
 *   - EXTRA_SENTENCES[id]  → up to 5 sentences (preferred, uses exact word form)
 *   - serverData[n].example → 1 additional sentence
 *
 * Returns an empty array if no match found.
 */
export function getAllSentences(wordString: string): string[] {
  const entry = findServerEntry(wordString);
  if (!entry) return [];

  const sentences: string[] = [];

  // Prefer EXTRA_SENTENCES — these are crafted to use the exact base form
  const extras = EXTRA_SENTENCES[entry.id];
  if (extras && extras.length > 0) {
    sentences.push(...extras);
  }

  // Also add serverData.example as an additional option (if it exists and not duplicate)
  if (entry.example && !sentences.includes(entry.example)) {
    sentences.push(entry.example);
  }

  return sentences;
}

export interface ClozeData {
  blankedSentence: string; // sentence with target replaced by "_____"
  answer: string;          // the base-form word (for matching answer option)
}

/**
 * Try to create a cloze question from a sentence and target word.
 * Returns null if the word (or its common inflections) cannot be found in the sentence.
 */
export function tryCreateCloze(sentence: string, word: string): ClozeData | null {
  // Escape regex special characters in the word
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 1. Exact match (case-insensitive) — handles phrases and exact base forms
  const exactRegex = new RegExp(escaped, 'i');
  if (exactRegex.test(sentence)) {
    return {
      blankedSentence: sentence.replace(exactRegex, '_____'),
      answer: word,
    };
  }

  // 2. Word-boundary prefix match for single words — handles plurals/verb inflections
  //    e.g. "knight" matches "knights", "juggle" matches "juggling"
  if (!word.includes(' ')) {
    const prefixRegex = new RegExp(`\\b${escaped}\\w*`, 'i');
    const m = sentence.match(prefixRegex);
    if (m) {
      return {
        blankedSentence: sentence.replace(prefixRegex, '_____'),
        answer: word,
      };
    }
  }

  return null;
}
