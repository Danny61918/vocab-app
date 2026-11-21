import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/gamification';
import { buildAskAiPrompt, explainSteps, pickExplainerMonster } from '../services/mistakeBook/explainer';
import { DrillItem } from '../services/mistakeBook/drills/types';

interface Props {
  item: DrillItem;
  picked: string;
  onDone: () => void;
}

// After a wrong answer a collected monster pops up from the bottom and explains in short steps:
// why it is wrong, how to think next time, then a right/wrong pair. The child taps to go on.
// Items without a hand-checked explanation show their single existing sentence instead.
export const MonsterExplainer: React.FC<Props> = ({ item, picked, onDone }) => {
  const [monster] = useState(() => {
    let owned: number[] = [];
    try {
      owned = Object.keys(getUserData().ownedMonsters).map(Number);
    } catch {
      owned = [];
    }
    return pickExplainerMonster(owned);
  });
  const steps = explainSteps(item);
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(false);
  const [copy, setCopy] = useState<'idle' | 'ok' | 'fail'>('idle');

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(t);
  }, []);

  const last = step >= steps.length - 1;
  const cur = steps[step];

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildAskAiPrompt(item, picked));
      setCopy('ok');
    } catch {
      setCopy('fail');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 md:p-6" role="dialog" aria-label="怪獸解說">
      <div
        className={`flex items-end gap-2 md:gap-5 w-full max-w-4xl transition-all duration-500 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
      >
        <div className="shrink-0 w-[26vw] max-w-[200px] landscape:max-w-[160px] aspect-square flex items-end justify-center">
          <img src={monster.image} style={{ filter: monster.filter }} className="max-w-full max-h-full object-contain drop-shadow-xl animate-bounce" alt={monster.name} />
        </div>

        <div className="relative flex-1 min-w-0 bg-white rounded-3xl border-4 md:border-8 border-amber-300 shadow-2xl p-4 md:p-6 text-left">
          <span className="absolute -left-3 bottom-8 w-5 h-5 bg-white border-l-4 border-b-4 md:border-l-8 md:border-b-8 border-amber-300 rotate-45" aria-hidden />
          <p className="text-[length:var(--fit-body)] font-black text-rose-600 mb-1">正確答案：{item.answer}</p>
          <p className="text-base md:text-2xl font-black text-amber-600 mb-1">
            🐾 {monster.name}：{cur.title}
          </p>
          {cur.body && <p className="text-[length:var(--fit-body)] font-bold text-slate-700 leading-snug">{cur.body}</p>}
          {cur.example && (
            <div className="flex flex-col gap-2 text-[length:var(--fit-body)] font-bold leading-snug">
              <p className="bg-green-50 border-2 border-green-200 text-green-700 rounded-2xl px-3 py-2">✅ {cur.example.right}</p>
              <p className="bg-rose-50 border-2 border-rose-200 text-rose-600 rounded-2xl px-3 py-2">❌ {cur.example.wrong}</p>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!last ? (
              <button onClick={() => setStep(step + 1)} className="bg-amber-500 hover:bg-amber-600 text-white text-lg md:text-2xl font-black px-5 py-2 rounded-2xl">
                下一步 ▶
              </button>
            ) : (
              <>
                <button onClick={onDone} className="bg-green-500 hover:bg-green-600 text-white text-lg md:text-2xl font-black px-5 py-2 rounded-2xl">
                  我懂了！
                </button>
                {steps.length > 1 && (
                  <button onClick={() => setStep(0)} className="bg-white border-2 border-amber-300 text-amber-600 text-base md:text-xl font-black px-4 py-2 rounded-2xl">
                    再聽一次
                  </button>
                )}
              </>
            )}
            <button onClick={copyPrompt} className="ml-auto text-xs md:text-base text-gray-400 hover:text-gray-600 font-bold underline px-1">
              {copy === 'ok' ? '已複製，貼給 AI 問吧' : copy === 'fail' ? '複製失敗，請手動選取題目' : '還是不懂？複製問 AI'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterExplainer;
