import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Volume2, Lightbulb, Hand } from 'lucide-react';
import { ChapterLesson, LessonCheck } from '../services/topicReview/types';
import PulseCalc from './lesson/PulseCalc';
import BpmCompare from './lesson/BpmCompare';

/**
 * Step-by-step teaching lesson shown before a CLIL chapter's questions. Nothing here is graded or recorded:
 * each step ends with a small 'think about it' check that always shows the explanation, and the child moves on.
 */
interface Props {
  lesson: ChapterLesson;
  speak: (text: string) => void;
  onExit: () => void;   // leave without finishing
  onDone: () => void;   // finished all steps -> go to the practice
}

const LessonView: React.FC<Props> = ({ lesson, speak, onExit, onDone }) => {
  const [index, setIndex] = useState(-1); // -1 = the friendly intro page
  const [picked, setPicked] = useState<string | null>(null);
  const total = lesson.steps.length;
  const step = index >= 0 ? lesson.steps[index] : null;

  useEffect(() => { setPicked(null); window.scrollTo({ top: 0 }); }, [index]);

  const check: LessonCheck | undefined = step?.check;
  const needsPick = !!check && picked === null;
  const isLast = index === total - 1;

  const next = () => { if (isLast) onDone(); else setIndex((i) => i + 1); };

  if (index === -1) {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
        <button onClick={onExit} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mb-8">
          <ArrowLeft size={18} /> 回去
        </button>
        <div className="text-center bg-white border-2 border-teal-100 rounded-[2rem] shadow-md p-8 md:p-10">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">{lesson.title}</h1>
          <p className="text-lg text-slate-600 font-bold leading-relaxed mb-2">{lesson.intro}</p>
          <p className="text-sm text-slate-400 font-bold mb-8">一共 {total} 步，一步一步來，每一步都有小小的「想一想」，不計分。</p>
          <button
            onClick={() => setIndex(0)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl active:scale-95 flex items-center justify-center gap-3"
          >
            開始上課 <ArrowRight size={24} />
          </button>
        </div>
      </div>
    );
  }

  if (!step) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 animate-fade-in pb-24" data-testid="lesson-step">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-slate-400 font-bold hover:text-slate-600 text-sm">先離開</button>
        <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-xl font-black text-sm">第 {index + 1} / {total} 步</div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-teal-500 transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">{step.title}</h2>

      <div className="bg-white border-2 border-slate-100 rounded-[2rem] shadow-md p-6 md:p-7 mb-5">
        {step.zh.split('\n').map((p, i) => (
          <p key={i} className="text-lg md:text-xl text-slate-700 leading-relaxed font-bold mb-3 last:mb-0">{p}</p>
        ))}
      </div>

      {step.words && step.words.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-5 mb-5">
          <div className="text-xs font-black text-amber-600 mb-3">📌 這一步的新單字（點喇叭聽發音）</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.words.map((w) => (
              <button
                type="button"
                key={w.term}
                onClick={() => speak(w.term)}
                className="bg-white border-2 border-amber-100 hover:border-amber-300 rounded-2xl p-3 text-left flex items-center gap-3 active:scale-95"
              >
                <span className="text-3xl">{w.icon ?? '🔤'}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-slate-800 text-lg">{w.term}</span>
                  <span className="block text-sm text-slate-500 font-bold">{w.zh}</span>
                  {w.tip && <span className="block text-xs text-amber-600 font-bold mt-0.5">{w.tip}</span>}
                </span>
                <Volume2 size={20} className="text-amber-500 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step.lines && step.lines.length > 0 && (
        <div className="bg-teal-50 border-2 border-teal-100 rounded-[2rem] p-5 mb-5">
          <div className="text-xs font-black text-teal-600 mb-3">📖 一句一句讀（點一下聽聽看）</div>
          <div className="flex flex-col gap-3">
            {step.lines.map((l) => (
              <button
                type="button"
                key={l.en}
                onClick={() => speak(l.speak ?? l.en)}
                className="bg-white border-2 border-teal-100 hover:border-teal-300 rounded-2xl p-4 text-left flex items-start gap-3 active:scale-[0.98]"
              >
                <span className="flex-1">
                  <span className="block text-lg md:text-xl font-black text-slate-800 leading-snug">{l.en}</span>
                  <span className="block text-base text-teal-700 font-bold mt-1">{l.zh}</span>
                </span>
                <span className="bg-teal-100 text-teal-600 p-2 rounded-full flex-shrink-0"><Volume2 size={18} /></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step.widget === 'pulse-calc' && <div className="mb-5"><PulseCalc /></div>}
      {step.widget === 'bpm-compare' && <div className="mb-5"><BpmCompare speak={speak} /></div>}

      {step.tryIt && (
        <div className="bg-violet-50 border-2 border-violet-200 rounded-[2rem] p-5 mb-5">
          <div className="flex items-center gap-2 font-black text-violet-700 mb-2"><Hand size={18} /> 動手做做看（跟爸爸媽媽一起）</div>
          {step.tryIt.split('\n').map((p, i) => (
            <p key={i} className="text-base md:text-lg text-slate-700 font-bold leading-relaxed mb-2 last:mb-0">{p}</p>
          ))}
        </div>
      )}

      {check && (
        <div className="bg-white border-2 border-slate-100 rounded-[2rem] shadow-md p-6 mb-5" data-testid="lesson-check">
          <div className="flex items-center gap-2 font-black text-slate-500 text-sm mb-3"><Lightbulb size={16} className="text-amber-500" /> 想一想（不計分）</div>
          <p className="text-lg md:text-xl font-black text-slate-800 mb-4 leading-snug">{check.prompt}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {check.options.map((opt) => {
              let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200';
              if (picked !== null) {
                if (opt === check.answer) cls = 'bg-emerald-500 border-emerald-600 text-white';
                else if (opt === picked) cls = 'bg-amber-400 border-amber-500 text-white';
                else cls = 'bg-slate-50 border-slate-100 text-slate-300';
              }
              return (
                <button
                  type="button"
                  key={opt}
                  disabled={picked !== null}
                  onClick={() => setPicked(opt)}
                  className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className={`mt-4 rounded-2xl p-4 border-2 ${picked === check.answer ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`} data-testid="lesson-hint">
              <div className={`flex items-center gap-2 font-black mb-1 ${picked === check.answer ? 'text-emerald-700' : 'text-amber-700'}`}>
                {picked === check.answer ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                {picked === check.answer ? '對了！' : `沒關係，答案是「${check.answer}」`}
              </div>
              <p className="text-slate-600 leading-relaxed font-bold">{check.hintZh}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {index > 0 && (
          <button
            type="button"
            onClick={() => setIndex((i) => i - 1)}
            className="px-6 bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-[2rem] font-black text-lg active:scale-95 flex items-center gap-2"
          >
            <ArrowLeft size={20} /> 上一步
          </button>
        )}
        <button
          type="button"
          onClick={next}
          disabled={needsPick}
          className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-[2rem] font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {needsPick ? '先選一個答案喔' : isLast ? '我學會了，去練習' : '下一步'} {!needsPick && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default LessonView;
