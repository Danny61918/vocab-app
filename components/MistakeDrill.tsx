import React, { useMemo, useRef, useState } from 'react';
import FitText from './FitText';
import confetti from 'canvas-confetti';
import { getRemainingDrill, presentOptions } from '../services/mistakeBook/drillProgress';
import { answerDrill } from '../services/mistakeBook/vocabLink';
import { logAnswer, makeWordKey } from '../services/answerLog';
import { awardCoins } from '../services/gamification';
import { MONSTER_DATA } from '../services/monsterData';

interface Props {
  onClose: () => void;
}

type Phase = 'intro' | 'play' | 'done';

const COINS_PER_CORRECT = 10;
const SECONDS_PER_QUESTION = 40; // rough pace, only used for the "about N minutes" hint

// 錯題小挑戰：今天排好的 ≤ 8 題（services/mistakeBook/drillProgress.ts），做完每日複習後接著做。
// Sizes come from the fluid --fit-* tokens in index.html: two columns in landscape (sentence on
// the left, answers on the right), stacked in portrait.
export const MistakeDrill: React.FC<Props> = ({ onClose }) => {
  const [queue] = useState(() => getRemainingDrill());
  const [phase, setPhase] = useState<Phase>('intro');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const correctRef = useRef(0);
  const shownAtRef = useRef(Date.now());
  const [monster] = useState(() => {
    const pool = Object.values(MONSTER_DATA).filter((m) => !m.isLegendary);
    return pool[Math.floor(Math.random() * pool.length)];
  });

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

  const monsterImg = (extra = '') => (
    <img
      src={monster.image}
      style={{ filter: monster.filter }}
      className={`max-w-full max-h-full object-contain drop-shadow-md ${extra}`}
      alt="monster"
    />
  );
  const centered = 'flex flex-col items-center justify-center min-h-[100dvh] landscape:h-[100dvh] p-4 text-center';
  const bigButton =
    'text-white text-[length:var(--fit-btn-font)] font-black py-[var(--fit-btn-py)] px-10 md:px-16 rounded-[2rem] shadow-xl transition-all';

  // ── Nothing to practise ──
  if (queue.length === 0) {
    return (
      <div className={`${centered} bg-emerald-50`}>
        <div className="w-[calc(var(--fit-monster)*0.7)] h-[calc(var(--fit-monster)*0.7)] mb-[var(--fit-mb)] flex items-center justify-center">
          {monsterImg()}
        </div>
        <h1 className="text-[length:var(--fit-zh)] leading-tight font-black text-emerald-700 mb-2">今天的錯題挑戰都完成了！ 🎉</h1>
        <p className="text-[length:var(--fit-body)] text-emerald-600 font-bold mb-[var(--fit-gap)]">明天再來，會有新的題目等你。</p>
        <button onClick={onClose} className={`bg-emerald-500 hover:bg-emerald-600 ${bigButton}`}>
          返回
        </button>
      </div>
    );
  }

  // ── Intro ──
  if (phase === 'intro') {
    const minutes = Math.max(1, Math.round((queue.length * SECONDS_PER_QUESTION) / 60));
    return (
      <div className={`${centered} bg-amber-50`}>
        <div className="w-[var(--fit-monster)] h-[var(--fit-monster)] mb-[var(--fit-mb)] flex items-center justify-center">
          {monsterImg('animate-bounce')}
        </div>
        <h1 className="text-[length:var(--fit-word)] leading-tight font-black text-amber-700 mb-[var(--fit-mb)]">🛠️ 錯題小挑戰</h1>
        <p className="text-[length:var(--fit-zh)] leading-tight text-amber-700 font-bold mb-2">今天有 {queue.length} 題，大約 {minutes} 分鐘</p>
        <p className="text-[length:var(--fit-body)] text-amber-600 font-bold mb-[var(--fit-gap)]">把之前會搞混的地方，一題一題練熟！</p>
        <button onClick={start} className={`bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:scale-105 ${bigButton}`}>
          開始 (Start!)
        </button>
        <button onClick={onClose} className="mt-[var(--fit-gap)] text-lg md:text-2xl text-gray-500 font-bold hover:text-gray-700 px-4 py-2">
          以後再練
        </button>
      </div>
    );
  }

  // ── Summary ──
  if (phase === 'done') {
    return (
      <div className={`${centered} bg-yellow-50`}>
        <div className="w-[calc(var(--fit-monster)*0.7)] h-[calc(var(--fit-monster)*0.7)] mb-[var(--fit-mb)] flex items-center justify-center animate-bounce">
          {monsterImg()}
        </div>
        <h1 className="text-[length:var(--fit-word)] leading-tight font-black text-yellow-600 mb-[var(--fit-mb)]">挑戰完成！ 🏆</h1>
        <div className="flex flex-wrap justify-center gap-3 mb-[var(--fit-gap)] text-[length:var(--fit-body)] font-bold">
          <p className="text-emerald-700 bg-emerald-50 px-5 py-2 rounded-2xl border-2 border-emerald-200">答對 {correctCount} / {queue.length} 題</p>
          <p className="text-amber-700 bg-amber-50 px-5 py-2 rounded-2xl border-2 border-amber-200">🪙 獲得金幣：+{correctCount * COINS_PER_CORRECT}</p>
        </div>
        <button onClick={onClose} className={`bg-yellow-500 hover:bg-yellow-600 border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2 ${bigButton}`}>
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
    <div className="flex flex-col min-h-[100dvh] landscape:h-[100dvh] w-full max-w-[1600px] mx-auto p-3 md:p-5 select-none touch-manipulation">
      <div className="w-full flex items-center justify-between mb-[var(--fit-mb)] shrink-0 font-bold">
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-base md:text-xl px-2 py-1">離開</button>
        <span className="bg-white border-2 border-gray-200 rounded-xl px-4 md:px-6 py-1 md:py-2 text-sm md:text-2xl text-gray-600">🛠️ {idx + 1} / {queue.length}</span>
        <span className="text-xs md:text-lg bg-amber-100 text-amber-700 px-3 md:px-5 py-1 md:py-1.5 rounded-full">{kind}</span>
      </div>

      <div className="flex flex-col landscape:flex-row gap-[var(--fit-gap)] w-full items-stretch flex-1 min-h-0">
        {/* Sentence */}
        <div className="flex-1 min-h-0 bg-white rounded-[3rem] shadow-xl border-4 md:border-8 border-amber-300 p-[var(--fit-pad)] flex flex-col items-center justify-center">
          <div className={`mb-[var(--fit-mb)] flex items-center justify-center shrink-0 transition-all ${answered && !isCorrect ? "w-[calc(var(--fit-monster)*0.4)] h-[calc(var(--fit-monster)*0.4)] portrait:hidden [@media(max-height:760px)]:hidden" : "w-[var(--fit-monster)] h-[var(--fit-monster)]"}`}>
            {monsterImg()}
          </div>
          <FitText as="p" size="var(--fit-sent)" className="font-bold text-slate-800 leading-snug text-center max-w-full">
            {before}
            <span
              className={`inline-block min-w-[4rem] px-2 mx-1 border-b-4 font-black ${
                !answered ? 'border-amber-400 text-transparent' : 'border-green-500 text-green-600'
              }`}
            >
              {answered ? item.answer : '___'}
            </span>
            {after}
          </FitText>

          {answered && !isCorrect && (
            <div className="mt-[var(--fit-mb)] w-full bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 md:p-5 text-left">
              <p className="text-[length:var(--fit-body)] font-black text-rose-600 mb-1">正確答案：{item.answer}</p>
              <p className="text-[length:var(--fit-body)] font-bold text-slate-700 leading-snug">{item.explanation}</p>
              <button onClick={next} className="mt-3 w-full bg-rose-500 hover:bg-rose-600 text-white text-lg md:text-2xl font-black py-3 rounded-2xl">
                知道了，下一題
              </button>
            </div>
          )}
        </div>

        {/* Answers */}
        <div className="flex-1 min-h-0 flex flex-col justify-center bg-amber-50 rounded-[3rem] p-[var(--fit-pad-sm)] border-4 md:border-8 border-amber-100">
          <div className={`grid gap-3 md:gap-5 w-full landscape:auto-rows-[var(--fit-opt-row)] ${longOptions ? 'grid-cols-1' : 'grid-cols-2'}`}>
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
                  className={`text-[length:var(--fit-opt-font)] leading-tight font-black p-[var(--fit-opt-pad)] min-h-[var(--fit-opt-min)] rounded-3xl transition-all min-w-0 ${cls}`}
                >
                  <FitText as="span" size="var(--fit-opt-font)" className="block w-full text-center min-w-0">{opt}</FitText>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MistakeDrill;
