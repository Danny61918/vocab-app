import React, { useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { getRemainingDrill, presentOptions } from '../services/mistakeBook/drillProgress';
import { answerDrill } from '../services/mistakeBook/vocabLink';
import { logAnswer, makeWordKey } from '../services/answerLog';
import { awardCoins } from '../services/gamification';

interface Props {
  onClose: () => void;
}

type Phase = 'intro' | 'play' | 'done';

const COINS_PER_CORRECT = 10;
const SECONDS_PER_QUESTION = 40; // rough pace, only used for the "about N minutes" hint

// 錯題小挑戰：今天排好的 ≤ 8 題（services/mistakeBook/drillProgress.ts），做完每日複習後接著做。
export const MistakeDrill: React.FC<Props> = ({ onClose }) => {
  const [queue] = useState(() => getRemainingDrill());
  const [phase, setPhase] = useState<Phase>('intro');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const correctRef = useRef(0);
  const shownAtRef = useRef(Date.now());

  const item = queue[idx];
  const options = useMemo(() => (item ? presentOptions(item) : []), [item]);

  const start = () => {
    shownAtRef.current = Date.now();
    setPhase('play');
  };

  const finish = () => {
    if (correctRef.current > 0) confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setPhase('done');
  };

  const next = () => {
    if (idx + 1 < queue.length) {
      setIdx(idx + 1);
      setPicked(null);
      shownAtRef.current = Date.now();
    } else {
      finish();
    }
  };

  const handlePick = (opt: string) => {
    if (picked !== null || !item) return;
    const ms = Date.now() - shownAtRef.current;
    const { correct } = answerDrill(item, opt, ms);
    logAnswer({
      wordId: makeWordKey('drill', item.id),
      gameType: item.targetWords?.length ? 'sentence_cloze' : 'grammar',
      correct,
      responseMs: ms,
    });
    setPicked(opt);
    if (correct) {
      correctRef.current += 1;
      setCorrectCount(correctRef.current);
      awardCoins(COINS_PER_CORRECT);
      setTimeout(next, 900);
    }
  };

  // ── Nothing to practise ──
  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-emerald-50 rounded-3xl shadow-xl">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-3xl font-black text-emerald-700 mb-3">今天的錯題挑戰都完成了！</h1>
        <p className="text-lg text-emerald-600 font-bold mb-8">明天再來，會有新的題目等你。</p>
        <button onClick={onClose} className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl font-black py-4 px-12 rounded-[2rem] shadow-lg">
          返回
        </button>
      </div>
    );
  }

  // ── Intro ──
  if (phase === 'intro') {
    const minutes = Math.max(1, Math.round((queue.length * SECONDS_PER_QUESTION) / 60));
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-amber-50 rounded-3xl shadow-xl">
        <div className="text-7xl mb-4">🛠️</div>
        <h1 className="text-4xl font-black text-amber-700 mb-4">錯題小挑戰</h1>
        <p className="text-xl text-amber-700 font-bold mb-2">今天有 {queue.length} 題，大約 {minutes} 分鐘</p>
        <p className="text-base text-amber-600 font-bold mb-10">把之前會搞混的地方，一題一題練熟！</p>
        <button onClick={start} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-3xl font-black py-5 px-14 rounded-[2rem] shadow-lg transition hover:scale-105">
          開始 (Start!)
        </button>
        <button onClick={onClose} className="mt-8 text-lg text-gray-500 font-bold hover:text-gray-700">
          以後再練
        </button>
      </div>
    );
  }

  // ── Summary ──
  if (phase === 'done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-yellow-50 rounded-3xl shadow-xl border-8 border-yellow-400">
        <div className="text-7xl mb-6">🏆</div>
        <h1 className="text-4xl font-black text-yellow-600 mb-4">挑戰完成！</h1>
        <p className="text-2xl text-emerald-700 mb-4 font-bold bg-emerald-50 px-6 py-3 rounded-2xl border-2 border-emerald-200">
          答對 {correctCount} / {queue.length} 題
        </p>
        <p className="text-2xl text-amber-700 mb-8 font-bold bg-amber-50 px-6 py-3 rounded-2xl border-2 border-amber-200">
          🪙 獲得金幣：+{correctCount * COINS_PER_CORRECT}
        </p>
        <button onClick={onClose} className="bg-yellow-500 hover:bg-yellow-600 text-white text-3xl font-black py-5 px-16 border-b-8 border-yellow-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl">
          返回 (Back)
        </button>
      </div>
    );
  }

  // ── Question ──
  const answered = picked !== null;
  const isCorrect = answered && picked.trim().toLowerCase() === item.answer.trim().toLowerCase();
  const [before, after = ''] = item.stem.split('___');
  const longOptions = options.some((o) => o.length > 22);
  const kind = item.targetWords?.length ? '單字' : '文法';

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 md:p-8 gap-5">
      <div className="w-full flex items-center justify-between text-gray-500 font-bold">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">離開</button>
        <span className="bg-white border-2 border-gray-200 rounded-xl px-4 py-1">🛠️ {idx + 1} / {queue.length}</span>
        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">{kind}</span>
      </div>

      <div className="w-full bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6 md:p-8">
        <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed text-center break-words">
          {before}
          <span
            className={`inline-block min-w-[4rem] px-2 mx-1 border-b-4 font-black ${
              !answered ? 'border-amber-400 text-transparent' : 'border-green-500 text-green-600'
            }`}
          >
            {answered ? item.answer : '___'}
          </span>
          {after}
        </p>
      </div>

      <div className={`w-full grid gap-3 ${longOptions ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {options.map((opt) => {
          const isAnswer = opt.trim().toLowerCase() === item.answer.trim().toLowerCase();
          let cls = 'bg-white hover:bg-amber-50 text-slate-800 border-b-8 border-gray-300 active:border-b-0 active:translate-y-2';
          if (answered) {
            if (isAnswer) cls = 'bg-green-500 text-white border-b-8 border-green-700';
            else if (opt === picked) cls = 'bg-red-100 text-red-500 border-b-8 border-red-200';
            else cls = 'bg-gray-100 text-gray-400 opacity-50 border-b-8 border-gray-200';
          }
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => handlePick(opt)}
              className={`text-xl md:text-2xl font-black p-4 md:p-5 rounded-2xl transition-all break-words ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && !isCorrect && (
        <div className="w-full bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 text-left">
          <p className="text-lg font-black text-rose-600 mb-2">正確答案：{item.answer}</p>
          <p className="text-base font-bold text-slate-700 leading-relaxed">{item.explanation}</p>
          <button onClick={next} className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white text-xl font-black py-3 rounded-2xl">
            知道了，下一題
          </button>
        </div>
      )}
    </div>
  );
};

export default MistakeDrill;
