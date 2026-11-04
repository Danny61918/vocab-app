import { beforeEach, describe, expect, it, vi } from 'vitest';

// cloudSync talks to Firestore and Firebase auth at import time; only the pure helpers are tested here.
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));
vi.mock('../firebaseConfig', () => ({ db: {}, waitForAuth: vi.fn(), getUid: vi.fn() }));

import { buildPayload, LS_KEYS, restoreEmptyKeys } from '../cloudSync';

beforeEach(() => {
  localStorage.clear();
});

describe('cloudSync 同步欄位', () => {
  it('syncs the P9 mistake-drill keys', () => {
    expect(LS_KEYS.skillProgress).toBe('vocab_skill_progress');
    expect(LS_KEYS.seededMistakes).toBe('vocab_seeded_mistakes');
    const payload = buildPayload();
    expect(payload).toHaveProperty('skillProgress');
    expect(payload).toHaveProperty('seededMistakes');
  });

  it('every LS key is covered by the payload (push) — nothing is registered in only one place', () => {
    for (const k of Object.keys(LS_KEYS)) {
      expect(buildPayload()).toHaveProperty(k);
    }
  });

  it('round trip: push payload -> empty device -> restore gives the same data', () => {
    const progress = { 'V.CONFUSE': { key: 'V.CONFUSE', boxLevel: 2, recent: [] } };
    localStorage.setItem(LS_KEYS.skillProgress, JSON.stringify(progress));
    localStorage.setItem(LS_KEYS.seededMistakes, JSON.stringify(['2026-11-04']));
    const payload = buildPayload();

    localStorage.clear();
    expect(restoreEmptyKeys(payload)).toBe(true);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.skillProgress)!)).toEqual(progress);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.seededMistakes)!)).toEqual(['2026-11-04']);
  });

  it('never overwrites local data that already exists', () => {
    localStorage.setItem(LS_KEYS.skillProgress, JSON.stringify({ local: { key: 'local' } }));
    restoreEmptyKeys({ skillProgress: { cloud: { key: 'cloud' } } });
    expect(JSON.parse(localStorage.getItem(LS_KEYS.skillProgress)!)).toEqual({ local: { key: 'local' } });
  });

  it('old cloud documents without the new fields restore fine', () => {
    expect(restoreEmptyKeys({ srsMastery: { a: { wordId: 'a' } } })).toBe(true);
    expect(localStorage.getItem(LS_KEYS.skillProgress)).toBeNull();
  });
});
