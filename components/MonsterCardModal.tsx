import React, { useEffect, useState } from 'react';
import { Volume2, X } from 'lucide-react';
import { Monster } from '../services/monsterData';
import { MonsterCard } from '../services/monsterCards';

interface Props {
  monster: Monster;
  card: MonsterCard;
  onClose: () => void;
}

// Reads English aloud with the browser's built-in voice. Silently does nothing where it is unavailable.
function speak(text: string) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.85;
    synth.speak(u);
  } catch {
    // no speech support
  }
}

// Back of a collected monster's card: English name, three short sentences (Chinese on tap), a fun fact and a key word.
export const MonsterCardModal: React.FC<Props> = ({ monster, card, onClose }) => {
  const [showZh, setShowZh] = useState<boolean[]>([false, false, false]);

  useEffect(() => () => {
    try {
      window.speechSynthesis?.cancel();
    } catch {
      // ignore
    }
  }, []);

  const toggle = (i: number) => setShowZh((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 md:p-6" role="dialog" aria-label={`${monster.name} 的卡片`} onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto bg-gradient-to-b from-amber-50 to-white rounded-3xl border-8 border-amber-300 shadow-2xl p-5 md:p-8 text-left" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="關閉" className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
          <X size={28} />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <img src={monster.image} style={{ filter: monster.filter }} className="w-24 h-24 md:w-36 md:h-36 object-contain drop-shadow-lg" alt={monster.name} />
          <div>
            <p className="text-lg md:text-2xl font-black text-amber-600">{monster.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl md:text-5xl font-black text-slate-800">{card.en}</p>
              <button onClick={() => speak(card.en)} aria-label="聽發音" className="bg-amber-400 hover:bg-amber-500 text-white rounded-full p-2">
                <Volume2 size={22} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {card.sentences.map((sen, i) => (
            <div key={i} className="bg-white border-2 border-amber-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <button onClick={() => speak(sen.en)} aria-label="聽這句" className="text-amber-500 hover:text-amber-600 shrink-0">
                  <Volume2 size={22} />
                </button>
                <p className="text-xl md:text-3xl font-bold text-slate-800 leading-snug">{sen.en}</p>
              </div>
              <button onClick={() => toggle(i)} className="mt-1 text-sm md:text-lg font-bold text-blue-500 hover:text-blue-600 underline">
                {showZh[i] ? sen.zh : '看中文'}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-4 text-base md:text-xl font-bold text-emerald-700 bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-4 py-3 leading-snug">
          💡 小知識：{card.fact}
        </p>

        <p className="mt-3 text-base md:text-xl font-black text-rose-600">
          ⭐ 重點單字：{card.word.en}（{card.word.zh}）
          <button onClick={() => speak(card.word.en)} aria-label="聽單字" className="ml-2 align-middle text-rose-400 hover:text-rose-600">
            <Volume2 size={20} className="inline" />
          </button>
        </p>
      </div>
    </div>
  );
};

export default MonsterCardModal;
