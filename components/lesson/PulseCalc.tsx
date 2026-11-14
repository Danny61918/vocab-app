import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * Interactive "why multiply by 6" helper for the pulse lesson. The child changes how many beats she
 * counted in 10 seconds and sees six 10-second blocks add up to one minute, so n x 6 = BPM.
 */
const MIN_BEATS = 5;
const MAX_BEATS = 25;

const PulseCalc: React.FC = () => {
  const [beats, setBeats] = useState(12);
  const clamp = (n: number) => Math.max(MIN_BEATS, Math.min(MAX_BEATS, n));

  return (
    <div className="bg-sky-50 border-2 border-sky-200 rounded-[2rem] p-5 md:p-6" data-testid="pulse-calc">
      <div className="font-black text-sky-800 mb-1">🧮 試試看：你在 10 秒數到幾下？</div>
      <div className="flex items-center justify-center gap-4 my-3">
        <button
          type="button"
          aria-label="少一下"
          onClick={() => setBeats((b) => clamp(b - 1))}
          className="w-12 h-12 rounded-full bg-white border-2 border-sky-300 text-sky-700 flex items-center justify-center active:scale-90"
        >
          <Minus size={22} />
        </button>
        <div className="text-center min-w-[5rem]">
          <div className="text-5xl font-black text-sky-700 leading-none" data-testid="pulse-beats">{beats}</div>
          <div className="text-xs font-bold text-sky-500 mt-1">下（10 秒）</div>
        </div>
        <button
          type="button"
          aria-label="多一下"
          onClick={() => setBeats((b) => clamp(b + 1))}
          className="w-12 h-12 rounded-full bg-white border-2 border-sky-300 text-sky-700 flex items-center justify-center active:scale-90"
        >
          <Plus size={22} />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1.5 my-4" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border-2 border-sky-200 rounded-xl py-2 text-center">
            <div className="text-[11px] font-bold text-sky-400">10 秒</div>
            <div className="text-base font-black text-sky-700">{beats}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm font-bold text-sky-600 mb-2">6 個 10 秒 ＝ 60 秒 ＝ 1 分鐘</div>

      <div className="bg-white rounded-2xl p-4 text-center border-2 border-sky-300">
        <div className="text-xl md:text-2xl font-black text-slate-800" data-testid="pulse-result">
          {beats} × 6 ＝ <span className="text-sky-600">{beats * 6}</span> BPM
        </div>
        <div className="text-sm text-slate-500 font-bold mt-1">每分鐘大約 {beats * 6} 下（beats per minute）</div>
      </div>
    </div>
  );
};

export default PulseCalc;
