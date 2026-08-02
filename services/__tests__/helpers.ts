import { localYmd, SrsDeps } from '../srsStorage';

export const DAY = 24 * 60 * 60 * 1000;

// Deterministic seeded RNG (LCG) so shuffles are reproducible in tests.
export function seededRng(seed = 12345): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

// Build deterministic SrsDeps. `today` defaults to the same local-YMD the SRS derives from `now`.
export function fixedDeps(opts: { now: number; today?: string; rng?: () => number }): SrsDeps {
  return {
    now: opts.now,
    today: opts.today ?? localYmd(opts.now),
    rng: opts.rng ?? seededRng(),
  };
}

// A fixed reference instant: 2026-03-02 10:00 local.
export const T0 = new Date(2026, 2, 2, 10, 0, 0).getTime();
