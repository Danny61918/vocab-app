import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

/**
 * Six activities as bars: the more active, the higher the pulse. Numbers are the ones printed under the photos
 * on the textbook page (p25): sleeping 68 ... skipping 140. Tapping a bar reads the textbook question pattern aloud.
 */
interface Row { icon: string; en: string; zh: string; bpm: number }

const ROWS: Row[] = [
  { icon: '😴', en: 'sleeping', zh: '睡覺', bpm: 68 },
  { icon: '📖', en: 'reading', zh: '看書', bpm: 78 },
  { icon: '🎮', en: 'playing computer games', zh: '玩電腦遊戲', bpm: 89 },
  { icon: '🚶', en: 'walking to school', zh: '走路上學', bpm: 97 },
  { icon: '⚽', en: 'playing football', zh: '踢足球', bpm: 120 },
  { icon: '🪢', en: 'skipping', zh: '跳繩', bpm: 140 },
];
const MAX = 140;

interface Props {
  speak: (text: string) => void;
}

const BpmCompare: React.FC<Props> = ({ speak }) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="bg-rose-50 border-2 border-rose-200 rounded-[2rem] p-5 md:p-6" data-testid="bpm-compare">
      <div className="font-black text-rose-800 mb-1">📊 點一點：誰的脈搏最高？</div>
      <div className="text-xs font-bold text-rose-400 mb-3">越用力的活動，脈搏越高（BPM = 每分鐘幾下）</div>
      <div className="flex flex-col gap-2">
        {ROWS.map((r, i) => (
          <button
            type="button"
            key={r.en}
            onClick={() => { setActive(i); speak(`What's her pulse after ${r.en}? It's ${r.bpm}.`); }}
            className={`text-left rounded-2xl border-2 p-2 md:p-3 transition-all ${active === i ? 'bg-white border-rose-400 shadow-md' : 'bg-white/70 border-rose-100 hover:border-rose-300'}`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-black text-slate-700 text-sm md:text-base">{r.icon} {r.en} <span className="text-slate-400 font-bold">（{r.zh}）</span></span>
              <span className="font-black text-rose-600 text-sm md:text-base">{r.bpm} BPM</span>
            </div>
            <div className="h-3 md:h-4 bg-rose-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-300 to-rose-500 rounded-full" style={{ width: `${Math.round((r.bpm / MAX) * 100)}%` }} />
            </div>
            {active === i && (
              <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-600">
                <Volume2 size={16} className="text-rose-500" />
                What's her pulse after {r.en}? — It's {r.bpm}.
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BpmCompare;
