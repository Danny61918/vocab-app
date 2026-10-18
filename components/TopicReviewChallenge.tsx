import React, { useState } from 'react';
import { GameMode, GameType, TestResult } from '../types';
import { saveResult } from '../services/storage';
import { TOPIC_REVIEW_CHAPTERS } from '../services/topicReview';
import { ReviewChapter, ReviewQuestion } from '../services/topicReview/types';
import { BookOpen, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Droplet } from 'lucide-react';
import confetti from 'canvas-confetti';
import LetterTiles from './LetterTiles';

interface Props {
  onBack: () => void;
}

type Phase = 'SELECT' | 'PASSAGE' | 'QUIZ' | 'SUMMARY';

const TopicReviewChallenge: React.FC<Props> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('SELECT');
  const [chapter, setChapter] = useState<ReviewChapter | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<ReviewQuestion[]>([]);

  const selectChapter = (c: ReviewChapter) => {
    setChapter(c);
    setPhase('PASSAGE');
  };

  const startQuiz = () => {
    setQIndex(0);
    setCorrectCount(0);
    setWrongQuestions([]);
    setAnswered(false);
    setSelected(null);
    setPhase('QUIZ');
  };

  const currentQuestion: ReviewQuestion | null = chapter ? chapter.questions[qIndex] : null;

  const isAnswerCorrect = (q: ReviewQuestion, answer: string): boolean => {
    if (q.questionType === 'fill_blank') {
      return answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    }
    return answer === q.correctAnswer;
  };

  const submitAnswer = (answer: string) => {
    if (!currentQuestion || answered) return;
    setSelected(answer);
    setAnswered(true);
    if (isAnswerCorrect(currentQuestion, answer)) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongQuestions((w) => [...w, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    if (!chapter) return;
    if (qIndex + 1 < chapter.questions.length) {
      setQIndex((i) => i + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setPhase('SUMMARY');
    const total = chapter?.questions.length ?? 0;
    if (correctCount === total) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
    const result: TestResult = {
      timestamp: Date.now(),
      totalQuestions: total,
      correctCount,
      score: correctCount * 10,
      mode: GameMode.CHALLENGE,
      type: GameType.TOPIC_REVIEW,
      correctIds: [],
      wrongIds: [],
      playerName: 'Anonymous',
    };
    saveResult(result);
  };

  if (phase === 'SELECT') {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mb-8">
          <ArrowLeft size={18} /> 返回主選單
        </button>
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-teal-100 rounded-full mb-4">
            <BookOpen size={40} className="text-teal-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">課文複習（CLIL）</h1>
          <p className="text-slate-500 font-bold">每一課的課文都會出現在這裡，挑一篇開始練習吧</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {TOPIC_REVIEW_CHAPTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => selectChapter(c)}
              className="bg-white border-2 border-slate-100 hover:border-teal-300 hover:bg-teal-50 rounded-[2rem] p-6 shadow-md transition-all text-left flex items-center gap-4"
            >
              <div className="bg-teal-100 text-teal-600 p-3 rounded-2xl">
                <Droplet size={28} />
              </div>
              <div className="flex-1">
                <div className="font-black text-xl text-slate-800">{c.title}</div>
                <div className="text-sm text-slate-400 font-bold mt-1">{c.sourceRef} · {c.questions.length} 題</div>
              </div>
              <ArrowRight className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'PASSAGE' && chapter) {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
        <button onClick={() => setPhase('SELECT')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mb-8">
          <ArrowLeft size={18} /> 換一篇
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{chapter.title}</h1>
        <p className="text-sm text-slate-400 font-bold mb-6">{chapter.sourceRef}</p>

        {chapter.factCards && chapter.factCards.length > 0 ? (
          <div className="flex flex-col gap-4 mb-8">
            {chapter.factCards.map((card) => (
              <div key={card.title} className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-md">
                {card.image && (
                  <div>
                    <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                    {card.imageCredit && (
                      <div className="text-[10px] text-slate-300 text-right px-4 pt-1">{card.imageCredit}</div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="font-black text-xl text-slate-800">{card.title}</div>
                  {card.zh && <div className="text-sm text-slate-400 font-bold mb-3">{card.zh}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                    {card.facts.map((f) => (
                      <div key={f.label} className="bg-slate-50 rounded-xl p-3">
                        <div className="text-xs text-slate-400 font-bold">{f.label}</div>
                        <div className="font-bold text-slate-700">{f.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {chapter.notes?.map((n) => (
              <div key={n.title} className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-6">
                <div className="font-black text-amber-700 mb-2">{n.title}</div>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{n.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {chapter.glossary && chapter.glossary.length > 0 && (
              <div className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-6 mb-6">
                <div className="text-sm font-black text-amber-700 mb-4">📌 看圖認識關鍵字</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {chapter.glossary.map((g) => (
                    <div key={g.term} className="bg-white rounded-2xl p-3 text-center border-2 border-amber-100">
                      {g.image ? (
                        <img src={g.image} alt={g.term} className="w-full h-24 object-cover rounded-xl mb-2" />
                      ) : (
                        <div className="text-3xl mb-1">{g.icon}</div>
                      )}
                      <div className="font-bold text-slate-700 text-sm">{g.term}</div>
                      {g.zh && <div className="text-xs text-slate-400">{g.zh}</div>}
                      {g.imageCredit && <div className="text-[10px] text-slate-300 mt-1">{g.imageCredit}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-md mb-8">
              <p className="text-lg text-slate-700 leading-relaxed">{chapter.sourceText}</p>
            </div>
          </>
        )}

        <button
          onClick={startQuiz}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          開始練習 ({chapter.questions.length} 題) <ArrowRight size={24} />
        </button>
      </div>
    );
  }

  if (phase === 'QUIZ' && chapter && currentQuestion) {
    const q = currentQuestion;
    const correct = selected !== null && isAnswerCorrect(q, selected);
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="text-slate-400 font-bold hover:text-red-500">中斷離開</button>
          <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-xl font-black text-sm">
            第 {qIndex + 1} / {chapter.questions.length} 題
          </div>
        </div>

        <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-md mb-6">
          {q.image ? (
            <div className="mb-4">
              <img src={q.image} alt="" className="w-full max-h-56 object-cover rounded-2xl" />
              {q.imageCredit && <div className="text-[10px] text-slate-300 text-right mt-1">{q.imageCredit}</div>}
            </div>
          ) : (
            q.icon && <div className="text-6xl text-center mb-4">{q.icon}</div>
          )}
          <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-relaxed mb-6">{q.questionText}</h2>

          {q.questionType === 'fill_blank' ? (
            <LetterTiles
              targetWord={q.correctAnswer}
              disabled={answered}
              onComplete={(isCorrect, spelled) => submitAnswer(spelled)}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(q.options ?? []).map((opt) => {
                let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200';
                if (answered) {
                  if (opt === q.correctAnswer) cls = 'bg-emerald-500 border-emerald-600 text-white';
                  else if (opt === selected) cls = 'bg-red-500 border-red-600 text-white';
                  else cls = 'bg-slate-50 border-slate-100 text-slate-300';
                }
                return (
                  <button
                    key={opt}
                    disabled={answered}
                    onClick={() => submitAnswer(opt)}
                    className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {answered && (
          <div className={`rounded-[2rem] p-6 mb-6 border-2 ${correct ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`flex items-center gap-2 font-black text-lg mb-3 ${correct ? 'text-emerald-700' : 'text-red-700'}`}>
              {correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              {correct ? '答對了！' : `答錯了，正確答案是「${q.correctAnswer}」`}
            </div>
            <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {answered && (
          <button
            onClick={nextQuestion}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-[2rem] font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {qIndex + 1 < chapter.questions.length ? '下一題' : '看結果'} <ArrowRight size={20} />
          </button>
        )}
      </div>
    );
  }

  if (phase === 'SUMMARY' && chapter) {
    const total = chapter.questions.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl animate-fade-in mt-10 border-8 border-slate-50">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">{accuracy >= 80 ? '🎉' : '📖'}</div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">{chapter.title} 複習完成！</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-blue-50 p-8 rounded-[2rem] text-center border-4 border-blue-100">
            <div className="text-blue-400 text-sm font-black uppercase mb-2 tracking-widest">答對題數</div>
            <div className="text-5xl font-black text-blue-600">{correctCount}/{total}</div>
          </div>
          <div className={`p-8 rounded-[2rem] text-center border-4 ${accuracy >= 80 ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}>
            <div className={`${accuracy >= 80 ? 'text-emerald-400' : 'text-orange-400'} text-sm font-black uppercase mb-2 tracking-widest`}>正確率</div>
            <div className={`text-5xl font-black ${accuracy >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>{accuracy}%</div>
          </div>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border-2 border-slate-100">
            <h3 className="font-black text-slate-700 mb-6 flex items-center gap-3 text-xl">
              <span className="text-3xl">⚠️</span> 需要再看一次的題目
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {wrongQuestions.map((q) => (
                <div key={q.id} className="p-4 bg-white border-2 border-slate-100 rounded-2xl">
                  <div className="font-bold text-slate-700 mb-1">{q.questionText}</div>
                  <div className="text-sm text-slate-500">{q.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={startQuiz} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-3xl font-black text-lg shadow-xl transition-all active:scale-95">
            再練一次
          </button>
          <button onClick={onBack} className="flex-1 bg-slate-900 hover:bg-black text-white py-5 rounded-3xl font-black text-lg shadow-xl transition-all active:scale-95">
            返回主選單
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TopicReviewChallenge;
