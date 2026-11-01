/**
 * Low-latency player for the pre-generated Kokoro clips (public/audio/*.mp3).
 *
 * Why not `new Audio(url).play()`: that starts the download and decode only
 * when the child taps, and every clip begins with 0.3-0.6 s of silence, so a
 * tap felt like it took 1-2 s to react. This module instead
 *   1. preloads + decodes clips ahead of time into AudioBuffers (cached by url),
 *   2. skips the leading (and trailing) silence when playing, so the existing
 *      mp3 files do not need to be regenerated, and
 *   3. stops the previous clip when a new one starts (no overlapping voices).
 *
 * `playAudio` reports 'unavailable' when a clip cannot be played (missing
 * file, no Web Audio, decode error) so callers can fall back to browser TTS.
 */

export type PlayStatus = 'played' | 'superseded' | 'unavailable';

interface Entry {
  buffer: AudioBuffer;
  offset: number;   // seconds of leading silence to skip
  duration: number; // seconds of audible material to play
}

const SILENCE_THRESHOLD = 0.006; // ~ -44 dBFS
const LEAD_PAD_S = 0.03;         // keep a hair of lead-in so the first phoneme is not clipped
const TAIL_PAD_S = 0.08;
const MIN_AUDIBLE_S = 0.1;
const MAX_PARALLEL_LOADS = 3;

/**
 * Find the audible part of a clip. `channels` are the decoded PCM channels.
 * Returns the whole clip when it is silent or the audible part is implausibly short.
 */
export function findAudibleRange(
  channels: ArrayLike<number>[],
  sampleRate: number
): { offset: number; duration: number } {
  const length = channels.length > 0 ? channels[0].length : 0;
  const total = length / sampleRate;
  let first = -1;
  let last = -1;

  for (let i = 0; i < length && first < 0; i++) {
    for (const ch of channels) {
      if (Math.abs(ch[i]) > SILENCE_THRESHOLD) { first = i; break; }
    }
  }
  if (first >= 0) {
    for (let i = length - 1; i >= first && last < 0; i--) {
      for (const ch of channels) {
        if (Math.abs(ch[i]) > SILENCE_THRESHOLD) { last = i; break; }
      }
    }
  }
  // Judge "is this really speech" on the raw audible span, before padding is added.
  if (first < 0 || last < 0 || (last - first) / sampleRate < MIN_AUDIBLE_S) {
    return { offset: 0, duration: total };
  }

  const offset = Math.max(0, first / sampleRate - LEAD_PAD_S);
  const end = Math.min(total, last / sampleRate + TAIL_PAD_S);
  return { offset, duration: end - offset };
}

// ─── Web Audio plumbing ──────────────────────────────────────────────────────

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === 'undefined') return null;
  const Ctor: typeof AudioContext | undefined =
    window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }
  // Browsers keep the context suspended until a user gesture; unlock it on the first one.
  const unlock = () => { if (ctx && ctx.state === 'suspended') void ctx.resume().catch(() => {}); };
  window.addEventListener('pointerdown', unlock, { once: true, passive: true });
  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('keydown', unlock, { once: true });
  return ctx;
}

function decode(context: AudioContext, data: ArrayBuffer): Promise<AudioBuffer> {
  // Older Safari only supports the callback form; newer ones return a promise.
  return new Promise<AudioBuffer>((resolve, reject) => {
    const maybePromise = context.decodeAudioData(data, resolve, reject) as Promise<AudioBuffer> | undefined;
    if (maybePromise && typeof maybePromise.then === 'function') maybePromise.then(resolve, reject);
  });
}

const cache = new Map<string, Promise<Entry | null>>();
const missing = new Set<string>(); // 404s: do not ask the server again this session

async function fetchAndDecode(url: string): Promise<Entry | null> {
  const context = getContext();
  if (!context) return null;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) missing.add(url);
    return null;
  }
  const buffer = await decode(context, await res.arrayBuffer());
  const channels: Float32Array[] = [];
  for (let c = 0; c < buffer.numberOfChannels; c++) channels.push(buffer.getChannelData(c));
  const { offset, duration } = findAudibleRange(channels, buffer.sampleRate);
  return { buffer, offset, duration };
}

function load(url: string): Promise<Entry | null> {
  let p = cache.get(url);
  if (!p) {
    p = fetchAndDecode(url).then(
      (entry) => { if (!entry) cache.delete(url); return entry; },
      () => { cache.delete(url); return null; } // network hiccup: allow a retry on the next tap
    );
    cache.set(url, p);
  }
  return p;
}

// ─── Preloading ──────────────────────────────────────────────────────────────

const queue: string[] = [];
let activeLoads = 0;

function pump(): void {
  while (activeLoads < MAX_PARALLEL_LOADS && queue.length > 0) {
    const url = queue.shift() as string;
    if (cache.has(url) || missing.has(url)) continue;
    activeLoads++;
    load(url).finally(() => { activeLoads--; pump(); });
  }
}

/** Fire-and-forget: download + decode these clips in the background (a few at a time). */
export function preloadAudio(urls: string[]): void {
  if (!getContext()) return;
  for (const url of urls) {
    if (!cache.has(url) && !missing.has(url) && !queue.includes(url)) queue.push(url);
  }
  pump();
}

// ─── Playback ────────────────────────────────────────────────────────────────

let current: AudioBufferSourceNode | null = null;
let playToken = 0;

function stopCurrent(): void {
  if (!current) return;
  current.onended = null; // a manual stop must not fire the caller's onEnded chain
  try { current.stop(); } catch { /* already stopped */ }
  current = null;
}

/** Stop whatever clip is playing and cancel any clip that is still loading. */
export function stopAudio(): void {
  playToken++;
  stopCurrent();
}

/**
 * Play a clip, replacing any clip that is already playing. `onEnded` fires only
 * when the clip finishes on its own (not when it is stopped or replaced).
 */
export async function playAudio(url: string, opts: { onEnded?: () => void } = {}): Promise<PlayStatus> {
  const context = getContext();
  if (!context) return 'unavailable';
  // Must happen synchronously inside the tap handler (iOS/Safari autoplay rules).
  if (context.state === 'suspended') void context.resume().catch(() => {});

  const mine = ++playToken;
  stopCurrent();
  if (missing.has(url)) return 'unavailable';

  const entry = await load(url);
  if (mine !== playToken) return 'superseded';
  if (!entry) return 'unavailable';

  try {
    const source = context.createBufferSource();
    source.buffer = entry.buffer;
    source.connect(context.destination);
    source.onended = () => {
      if (current === source) current = null;
      opts.onEnded?.();
    };
    current = source;
    source.start(0, entry.offset, entry.duration);
    return 'played';
  } catch {
    return 'unavailable';
  }
}
