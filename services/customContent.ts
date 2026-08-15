/**
 * P7 — Co-Creation runtime storage.
 *
 * Custom monsters and sentences are stored in localStorage (and synced to cloud via P6).
 * They supplement the static MONSTER_DATA and exampleSentencesData at runtime.
 */

import { schedulePush } from './cloudSync';

// ---- Custom Monsters ----

export interface CustomMonster {
  id: string;           // e.g. 'custom-1723456789'
  name: string;         // child's chosen name
  imageDataUrl: string; // base64 data URI of the uploaded image
  designer: string;     // child's name (署名)
  createdAt: number;    // timestamp
}

const CUSTOM_MONSTERS_KEY = 'vocab_custom_monsters';

export function loadCustomMonsters(): CustomMonster[] {
  try {
    const raw = localStorage.getItem(CUSTOM_MONSTERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomMonster(monster: CustomMonster): void {
  const list = loadCustomMonsters();
  list.push(monster);
  localStorage.setItem(CUSTOM_MONSTERS_KEY, JSON.stringify(list));
  schedulePush();
}

export function deleteCustomMonster(id: string): void {
  const list = loadCustomMonsters().filter((m) => m.id !== id);
  localStorage.setItem(CUSTOM_MONSTERS_KEY, JSON.stringify(list));
  schedulePush();
}

// ---- Custom Sentences ----

export interface CustomSentence {
  id: string;           // e.g. 'sent-1723456789'
  word: string;         // the English word this sentence practices
  sentence: string;     // the full sentence
  author: string;       // child's name
  createdAt: number;
}

const CUSTOM_SENTENCES_KEY = 'vocab_custom_sentences';

export function loadCustomSentences(): CustomSentence[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SENTENCES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomSentence(sentence: CustomSentence): void {
  const list = loadCustomSentences();
  list.push(sentence);
  localStorage.setItem(CUSTOM_SENTENCES_KEY, JSON.stringify(list));
  schedulePush();
}

export function deleteCustomSentence(id: string): void {
  const list = loadCustomSentences().filter((s) => s.id !== id);
  localStorage.setItem(CUSTOM_SENTENCES_KEY, JSON.stringify(list));
  schedulePush();
}

// ---- Wish List ----

export interface WishItem {
  id: string;
  text: string;         // the child's wish / feature request
  createdAt: number;
  done: boolean;        // parent marks as done
}

const WISH_LIST_KEY = 'vocab_wish_list';

export function loadWishList(): WishItem[] {
  try {
    const raw = localStorage.getItem(WISH_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWishItem(item: WishItem): void {
  const list = loadWishList();
  list.push(item);
  localStorage.setItem(WISH_LIST_KEY, JSON.stringify(list));
  schedulePush();
}

export function updateWishItem(id: string, updates: Partial<WishItem>): void {
  const list = loadWishList().map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
  localStorage.setItem(WISH_LIST_KEY, JSON.stringify(list));
  schedulePush();
}
