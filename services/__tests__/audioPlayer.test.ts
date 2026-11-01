import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── pure silence detection ──────────────────────────────────────────────────

function clip(sr: number, silentLead: number, tone: number, silentTail: number): Float32Array {
  const a = new Float32Array(Math.round((silentLead + tone + silentTail) * sr));
  a.fill(0.5, Math.round(silentLead * sr), Math.round((silentLead + tone) * sr));
  return a;
}

describe('findAudibleRange', () => {
  it('skips leading silence but keeps a small lead-in, and trims the tail', async () => {
    const { findAudibleRange } = await import('../audioPlayer');
    const r = findAudibleRange([clip(1000, 0.4, 1.0, 0.5)], 1000);
    expect(r.offset).toBeCloseTo(0.37, 2);          // 0.4 - 0.03 lead-in
    expect(r.offset + r.duration).toBeCloseTo(1.48, 2); // 1.4 + 0.08 tail pad
  });

  it('returns the whole clip when it is all silence', async () => {
    const { findAudibleRange } = await import('../audioPlayer');
    expect(findAudibleRange([new Float32Array(2000)], 1000)).toEqual({ offset: 0, duration: 2 });
  });

  it('returns the whole clip when the audible part is implausibly short (a click)', async () => {
    const { findAudibleRange } = await import('../audioPlayer');
    const a = new Float32Array(2000);
    a[500] = 0.9;
    const r = findAudibleRange([a], 1000);
    expect(r.offset).toBe(0);
    expect(r.duration).toBe(2);
  });

  it('looks at every channel', async () => {
    const { findAudibleRange } = await import('../audioPlayer');
    const quiet = new Float32Array(2000);
    const r = findAudibleRange([quiet, clip(1000, 0.5, 1.0, 0.5)], 1000);
    expect(r.offset).toBeCloseTo(0.47, 2);
  });

  it('does not break on an empty clip', async () => {
    const { findAudibleRange } = await import('../audioPlayer');
    expect(findAudibleRange([], 1000)).toEqual({ offset: 0, duration: 0 });
  });
});

// ─── playback with a fake Web Audio implementation ───────────────────────────

interface FakeSource {
  buffer: unknown;
  connect: ReturnType<typeof vi.fn>;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  onended: (() => void) | null;
}

function installFakeWebAudio() {
  const sources: FakeSource[] = [];
  const state = { ctxState: 'suspended' as string, resume: vi.fn(async () => { state.ctxState = 'running'; }) };
  const data = clip(1000, 0.3, 1.0, 0.2);

  class FakeContext {
    get state() { return state.ctxState; }
    destination = {};
    resume = state.resume;
    decodeAudioData = vi.fn((_ab: ArrayBuffer, ok?: (b: unknown) => void) => {
      const buf = { numberOfChannels: 1, sampleRate: 1000, getChannelData: () => data };
      ok?.(buf);
      return Promise.resolve(buf);
    });
    createBufferSource(): FakeSource {
      const s: FakeSource = { buffer: null, connect: vi.fn(), start: vi.fn(), stop: vi.fn(), onended: null };
      sources.push(s);
      return s;
    }
  }
  (window as unknown as { AudioContext: unknown }).AudioContext = FakeContext;
  return { sources, state };
}

function stubFetch(handler: (url: string) => { ok: boolean; status: number } | Error) {
  const fn = vi.fn(async (url: string) => {
    const r = handler(url);
    if (r instanceof Error) throw r;
    return { ...r, arrayBuffer: async () => new ArrayBuffer(8) };
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

describe('audioPlayer (fake Web Audio)', () => {
  beforeEach(() => { vi.resetModules(); });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window as unknown as { AudioContext?: unknown }).AudioContext;
  });

  it('reports "unavailable" without Web Audio so callers fall back to browser TTS', async () => {
    const { playAudio, preloadAudio } = await import('../audioPlayer');
    expect(await playAudio('audio/1.mp3')).toBe('unavailable');
    expect(() => preloadAudio(['audio/1.mp3'])).not.toThrow();
  });

  it('plays from the end of the leading silence and unlocks the suspended context', async () => {
    const { sources, state } = installFakeWebAudio();
    stubFetch(() => ({ ok: true, status: 200 }));
    const { playAudio } = await import('../audioPlayer');

    expect(await playAudio('audio/1.mp3')).toBe('played');
    expect(state.resume).toHaveBeenCalled();
    const [when, offset, duration] = sources[0].start.mock.calls[0];
    expect(when).toBe(0);
    expect(offset).toBeCloseTo(0.27, 2);  // 0.3 s silence - 0.03 lead-in
    expect(duration).toBeGreaterThan(1.0);
    expect(duration).toBeLessThan(1.2);
  });

  it('downloads each clip only once, whether preloaded or tapped repeatedly', async () => {
    installFakeWebAudio();
    const fetchFn = stubFetch(() => ({ ok: true, status: 200 }));
    const { playAudio, preloadAudio } = await import('../audioPlayer');

    preloadAudio(['audio/2.mp3']);
    await playAudio('audio/2.mp3');
    await playAudio('audio/2.mp3');
    await playAudio('audio/2.mp3');
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('does not ask the server again for a clip that 404s', async () => {
    installFakeWebAudio();
    const fetchFn = stubFetch(() => ({ ok: false, status: 404 }));
    const { playAudio, preloadAudio } = await import('../audioPlayer');

    expect(await playAudio('audio/missing.mp3')).toBe('unavailable');
    expect(await playAudio('audio/missing.mp3')).toBe('unavailable');
    preloadAudio(['audio/missing.mp3']);
    await new Promise((r) => setTimeout(r, 0));
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('retries after a network failure instead of caching the failure', async () => {
    installFakeWebAudio();
    let fail = true;
    const fetchFn = stubFetch(() => (fail ? new Error('offline') : { ok: true, status: 200 }));
    const { playAudio } = await import('../audioPlayer');

    expect(await playAudio('audio/3.mp3')).toBe('unavailable');
    fail = false;
    expect(await playAudio('audio/3.mp3')).toBe('played');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('a newer tap supersedes an older one that is still loading (no double voice, no TTS fallback)', async () => {
    const { sources } = installFakeWebAudio();
    stubFetch(() => ({ ok: true, status: 200 }));
    const { playAudio } = await import('../audioPlayer');

    const first = playAudio('audio/4.mp3');
    const second = playAudio('audio/5.mp3');
    expect(await first).toBe('superseded');
    expect(await second).toBe('played');
    expect(sources).toHaveLength(1);
  });

  it('stops the previous clip when a new one starts', async () => {
    const { sources } = installFakeWebAudio();
    stubFetch(() => ({ ok: true, status: 200 }));
    const { playAudio } = await import('../audioPlayer');

    await playAudio('audio/6.mp3');
    await playAudio('audio/7.mp3');
    expect(sources[0].stop).toHaveBeenCalled();
    expect(sources).toHaveLength(2);
  });

  it('fires onEnded when a clip finishes, but not when it is stopped', async () => {
    const { sources } = installFakeWebAudio();
    stubFetch(() => ({ ok: true, status: 200 }));
    const { playAudio, stopAudio } = await import('../audioPlayer');

    const finished = vi.fn();
    await playAudio('audio/8.mp3', { onEnded: finished });
    sources[0].onended?.();
    expect(finished).toHaveBeenCalledTimes(1);

    const stopped = vi.fn();
    await playAudio('audio/9.mp3', { onEnded: stopped });
    stopAudio();
    expect(sources[1].onended).toBeNull();
    expect(stopped).not.toHaveBeenCalled();
  });
});
