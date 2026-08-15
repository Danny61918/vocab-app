// Firebase project configuration (public / safe to commit — see Firebase docs).
// Security is enforced by Firestore Security Rules, not by hiding this config.

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrNnEPW1syeGsEo6huwo3brjDuHKIG-ok",
  authDomain: "vocab-app-48baa.firebaseapp.com",
  projectId: "vocab-app-48baa",
  storageBucket: "vocab-app-48baa.firebasestorage.app",
  messagingSenderId: "10705507220",
  appId: "1:10705507220:web:7d1f3b6c9fd947983df581",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence so Firestore works without internet
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open — only one gets persistence
    console.warn('[CloudSync] Persistence unavailable: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support IndexedDB
    console.warn('[CloudSync] Persistence unavailable: browser does not support IndexedDB');
  }
});

// ---- Anonymous Auth: auto sign-in, returns the uid ----

let currentUser: User | null = null;
let authReady: Promise<User | null>;

// Kick off sign-in immediately on module load
authReady = new Promise((resolve) => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      unsub();
      resolve(user);
    }
  });

  // If no existing session, sign in anonymously
  signInAnonymously(auth).catch((err) => {
    console.error('[CloudSync] Anonymous sign-in failed:', err);
    resolve(null);
  });
});

/** Wait until Firebase Auth is ready. Returns the user (or null on failure). */
export function waitForAuth(): Promise<User | null> {
  return authReady;
}

/** Get the current uid synchronously (null if not yet signed in). */
export function getUid(): string | null {
  return currentUser?.uid ?? null;
}
