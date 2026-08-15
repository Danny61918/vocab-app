/**
 * Cloud Sync (P6) — Firestore backup for localStorage data.
 *
 * Design:
 *   localStorage = primary (instant, offline-first)
 *   Firestore    = cloud backup (cross-device, anti-loss)
 *
 * Write path: save locally first, then push to Firestore (fire-and-forget).
 * Read path:  always read localStorage; on first boot, pull cloud data if local is empty.
 *
 * All Firestore writes/reads are keyed by the anonymous-auth uid so each
 * device-user pair gets its own document. Security Rules enforce uid-scoping.
 */

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  type DocumentReference,
} from 'firebase/firestore';
import { db, waitForAuth, getUid } from './firebaseConfig';

// ---- Types for the cloud document ----

interface CloudDocument {
  srsMastery: Record<string, any>;
  answerLog: any[];
  levelProgress: any;
  userData: any;        // coins, gacha, etc.
  streak: any;          // daily streak
  achievements: any;    // unlocked achievements
  customMonsters: any[]; // P7 custom monster uploads
  customSentences: any[]; // P7 child-authored sentences
  wishList: any[];       // P7 feature wish list
  lastSyncedAt: any;    // serverTimestamp
}

// localStorage keys that we sync (mirrors the keys used in srsStorage / answerLog / gamification / customContent)
const LS_KEYS = {
  srsMastery: 'vocab_srs_mastery',
  answerLog: 'vocab_answer_log',
  levelProgress: 'vocab_level_progress',
  userData: 'vocab_app_user_data',
  streak: 'vocab_app_streak',
  achievements: 'vocab_app_achievements_unlocked',
  customMonsters: 'vocab_custom_monsters',
  customSentences: 'vocab_custom_sentences',
  wishList: 'vocab_wish_list',
} as const;

// ---- Helpers ----

function userDocRef(uid: string): DocumentReference {
  return doc(db, 'users', uid);
}

function readLocal(key: string): any {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---- Public API ----

/**
 * Push ALL syncable localStorage data to Firestore.
 * Call after any meaningful write (mastery update, answer logged, etc.)
 * or on a debounced schedule.
 *
 * Fire-and-forget: errors are logged but never thrown to the caller.
 */
export async function pushToCloud(): Promise<void> {
  try {
    const uid = getUid();
    if (!uid) return; // not signed in yet — skip silently

    const payload: CloudDocument = {
      srsMastery: readLocal(LS_KEYS.srsMastery) ?? {},
      answerLog: readLocal(LS_KEYS.answerLog) ?? [],
      levelProgress: readLocal(LS_KEYS.levelProgress) ?? {},
      userData: readLocal(LS_KEYS.userData) ?? {},
      streak: readLocal(LS_KEYS.streak) ?? {},
      achievements: readLocal(LS_KEYS.achievements) ?? [],
      customMonsters: readLocal(LS_KEYS.customMonsters) ?? [],
      customSentences: readLocal(LS_KEYS.customSentences) ?? [],
      wishList: readLocal(LS_KEYS.wishList) ?? [],
      lastSyncedAt: serverTimestamp(),
    };

    await setDoc(userDocRef(uid), payload, { merge: true });
    console.log('[CloudSync] pushed to cloud');
  } catch (err) {
    console.warn('[CloudSync] push failed (will retry next time):', err);
  }
}

/**
 * Pull cloud data and merge into localStorage — but ONLY for keys that
 * are currently empty locally (= new device / cleared data scenario).
 *
 * Existing local data is NEVER overwritten by cloud data, because local
 * is always more recent (the user just used this device).
 */
export async function pullFromCloud(): Promise<{ merged: boolean }> {
  try {
    const uid = getUid();
    if (!uid) return { merged: false };

    const snap = await getDoc(userDocRef(uid));
    if (!snap.exists()) return { merged: false };

    const cloud = snap.data() as CloudDocument;
    let merged = false;

    // For each syncable key, write cloud data into localStorage only if local is empty
    const pairs: [string, any][] = [
      [LS_KEYS.srsMastery, cloud.srsMastery],
      [LS_KEYS.answerLog, cloud.answerLog],
      [LS_KEYS.levelProgress, cloud.levelProgress],
      [LS_KEYS.userData, cloud.userData],
      [LS_KEYS.streak, cloud.streak],
      [LS_KEYS.achievements, cloud.achievements],
      [LS_KEYS.customMonsters, cloud.customMonsters],
      [LS_KEYS.customSentences, cloud.customSentences],
      [LS_KEYS.wishList, cloud.wishList],
    ];

    for (const [key, cloudValue] of pairs) {
      if (cloudValue == null) continue;

      const local = readLocal(key);
      const localEmpty =
        local == null ||
        (typeof local === 'object' && !Array.isArray(local) && Object.keys(local).length === 0) ||
        (Array.isArray(local) && local.length === 0);

      if (localEmpty) {
        localStorage.setItem(key, JSON.stringify(cloudValue));
        merged = true;
        console.log(`[CloudSync] restored "${key}" from cloud`);
      }
    }

    return { merged };
  } catch (err) {
    console.warn('[CloudSync] pull failed:', err);
    return { merged: false };
  }
}

// ---- Debounced push (coalesces rapid writes into one Firestore call) ----

let pushTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 3000; // wait 3 seconds of quiet before pushing

/**
 * Schedule a debounced push to cloud. Safe to call on every save —
 * rapid-fire saves are coalesced into one Firestore write.
 */
export function schedulePush(): void {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    pushToCloud();
  }, DEBOUNCE_MS);
}

// ---- Boot: sign in + pull (called once at app startup) ----

let bootDone = false;

/**
 * Call once at app startup (e.g. in main.tsx or App.tsx).
 * 1. Waits for anonymous auth
 * 2. Pulls cloud data (restores empty keys)
 * 3. Returns whether any data was merged (caller can reload state if needed)
 */
export async function bootCloudSync(): Promise<{ merged: boolean }> {
  if (bootDone) return { merged: false };
  bootDone = true;

  const user = await waitForAuth();
  if (!user) {
    console.warn('[CloudSync] boot: no auth — running in offline-only mode');
    return { merged: false };
  }
  console.log('[CloudSync] signed in as', user.uid);

  return pullFromCloud();
}
