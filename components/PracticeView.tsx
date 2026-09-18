import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Word } from '../types';
import { getWords } from '../services/storage';
import { getAllSentences } from '../services/exampleLookup';
import { ArrowLeft, BookOpen, Users, Headphones, Volume2, Turtle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type Tab = 'LEARN' | 'PARENT' | 'QUIZ';
type Scope = 'RECENT' | 'ALL' | 'CUSTOM';

const getLocalDateString = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const speechWord = (w: Word): string =>
  w.english.split('/')[0].replace(/\(.*?\)/g, '').trim();

const PracticeView: React.FC<Props> = ({ onBack }) => {
  const allWords = useMemo(() => getWords(), []);

  const availableDates = useMemo(() => {
    const set = new Set(allWords.map(w => w.date).filter((d): d is string => !!d));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [allWords]);

  const [scope, setScope] = useState<Scope>('RECENT');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  useEffect(() => {
    if (availableDates.length === 0) return;
    const latest = availableDates[0];
    const latestTime = new Date(latest.replace(/-/g, '/')).getTime();
    const start = new Date(latestTime - 6 * 24 * 60 * 60 * 1000);
    setDateEnd(latest);
    setDateStart(getLocalDateString(start));
  }, [availableDates]);

  const words = useMemo(() => {
    if (scope === 'ALL') return allWords;
    return allWords.filter(w => {
      if (!w.date) return false;
      if (dateStart && w.date < dateStart) return false;
      if (dateEnd && w.date > dateEnd) return false;
      return true;
    });
  }, [allWords, scope, dateStart, dateEnd]);

  const [tab, setTab] = useState<Tab>('LEARN');

  // ─── Speech ──────────────────────────────────────────────────────────────
  const [voiceTone, setVoiceTone] = useState<'lively' | 'standard'>('lively');
  const [speechRate, setSpeechRate] = useState(1.0);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      selectedVoiceRef.current =
        voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Victoria'))) ||
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang.startsWith('en')) ||
        null;
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
  }, []);

  const speak = (text: string, rate?: number, onEnd?: () => void) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    if (voiceTone === 'lively') {
      utt.pitch = 1.15;
      utt.rate = (rate ?? speechRate) * 0.95;
    } else {
      utt.pitch = 1.0;
      utt.rate = rate ?? speechRate;
    }
    if (selectedVoiceRef.current) utt.voice = selectedVoiceRef.current;
    if (onEnd) utt.onend = onEnd;
    window.speechSynthesis.speak(utt);
  };

  const sentencesFor = (w: Word): string[] => {
    const all = getAllSentences(w.english);
    return all.length > 0 ? all : (w.example ? [w.example] : []);
  };

  // ─── Learn tab: play-all ────────────────────────────────────────────────
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const isPlayingAllRef = useRef(false);

  const togglePlayAll = () => {
    if (isPlayingAllRef.current) {
      window.speechSynthesis.cancel();
      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
      return;
    }
    if (words.length === 0) return;
    isPlayingAllRef.current = true;
    setIsPlayingAll(true);

    let idx = 0;
    const next = () => {
      if (!isPlayingAllRef.current || idx >= words.length) {
        isPlayingAllRef.current = false;
        setIsPlayingAll(false);
        return;
      }
      const w = words[idx];
      const sentence = sentencesFor(w)[0];
      speak(speechWord(w), speechRate, () => {
        setTimeout(() => {
          if (!isPlayingAllRef.current) return;
          if (sentence) {
            speak(sentence, speechRate, () => {
              idx++;
              setTimeout(next, 700);
            });
          } else {
            idx++;
            setTimeout(next, 700);
          }
        }, 300);
      });
    };
    next();
  };

  useEffect(() => {
    // Stop any playback when leaving the tab / changing scope
    isPlayingAllRef.current = false;
    setIsPlayingAll(false);
    window.speechSynthesis?.cancel();
  }, [tab, scope, dateStart, dateEnd]);

  // ─── Parent quiz tab: blur mask ─────────────────────────────────────────
  const [maskEn, setMaskEn] = useState(true);
  const [maskZh, setMaskZh] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => { setRevealed(new Set()); }, [words]);

  const toggleReveal = (id: number) => {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // ─── Listening quiz tab ─────────────────────────────────────────────────
  const [quizPool, setQuizPool] = useState<Word[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizOptions, setQuizOptions] = useState<Word[]>([]);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [chosenId, setChosenId] = useState<number | null>(null);

  const prepareQuizQuestion = (pool: Word[], i: number) => {
    const target = pool[i];
    if (!target) return;
    const wrongs = words.filter(w => w.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
    setQuizOptions([target, ...wrongs].sort(() => Math.random() - 0.5));
    setAnswerState('idle');
    setChosenId(null);
    setTimeout(() => speak(speechWord(target)), 300);
  };

  const startQuiz = () => {
    const pool = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizPool(pool);
    setQuizIdx(0);
    setQuizScore(0);
    prepareQuizQuestion(pool, 0);
  };

  useEffect(() => {
    if (tab === 'QUIZ') startQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, words]);

  const checkAnswer = (choice: Word) => {
    if (answerState !== 'idle') return;
    const target = quizPool[quizIdx];
    const correct = choice.id === target.id;
    setChosenId(choice.id);
    setAnswerState(correct ? 'correct' : 'wrong');
    if (correct) setQuizScore(s => s + 10);
    setTimeout(() => {
      const next = quizIdx + 1;
      setQuizIdx(next);
      if (next < quizPool.length) prepareQuizQuestion(quizPool, next);
    }, 1500);
  };

  const quizDone = quizPool.length > 0 && quizIdx >= quizPool.length;
  const currentQuizWord = quizPool[quizIdx];

  // ─── Render helpers ─────────────────────────────────────────────────────
  const ScopeButton: React.FC<{ value: Scope; label: string }> = ({ value, label }) => (
    <button
      onClick={() => setScope(value)}
      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${scope === value ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-700 font-bold transition-colors">
          <ArrowLeft size={20} /> 返回主選單
        </button>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <Headphones size={18} /> 練習
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-5 md:p-6 mb-6">
        <h1 className="text-2xl font-black text-slate-800 mb-1">📖 背單字・考小孩</h1>
        <p className="text-slate-400 text-sm font-bold mb-4">小孩可以自己背單字，家長也可以直接拿來考小孩</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <ScopeButton value="RECENT" label="最近一週" />
          <ScopeButton value="ALL" label="全部單字" />
          <ScopeButton value="CUSTOM" label="自訂日期" />
        </div>
        {scope === 'CUSTOM' && (
          <div className="bg-slate-50 p-3 rounded-lg flex gap-2 border border-slate-200 mb-3">
            <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="flex-1 text-xs p-2 border border-slate-200 rounded outline-none focus:border-blue-500 transition font-bold" />
            <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="flex-1 text-xs p-2 border border-slate-200 rounded outline-none focus:border-blue-500 transition font-bold" />
          </div>
        )}
        <div className="text-xs font-bold text-slate-400">
          目前範圍共 <span className="text-blue-600">{words.length}</span> 個單字/片語
          {scope !== 'ALL' && dateStart && dateEnd && <span> ({dateStart} ~ {dateEnd})</span>}
        </div>
      </div>

      <div className="flex bg-white rounded-2xl shadow-md border border-slate-100 p-1.5 mb-6 gap-1">
        <button onClick={() => setTab('LEARN')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${tab === 'LEARN' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
          <BookOpen size={16} /> 學習朗讀卡
        </button>
        <button onClick={() => setTab('PARENT')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${tab === 'PARENT' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
          <Users size={16} /> 家長抽考
        </button>
        <button onClick={() => setTab('QUIZ')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${tab === 'QUIZ' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
          <Volume2 size={16} /> 聽力測驗
        </button>
      </div>

      {words.length === 0 ? (
        <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-10 text-center text-slate-400 font-bold">
          這個範圍內還沒有單字，試著切換成「全部單字」看看。
        </div>
      ) : tab === 'LEARN' ? (
        <div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-blue-700 font-bold">💡 點「🔊 唸單字」聽發音，點「💬 唸例句」聽完整句子</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setVoiceTone('lively')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${voiceTone === 'lively' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>✨ 活潑</button>
              <button onClick={() => setVoiceTone('standard')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${voiceTone === 'standard' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>🎙️ 標準</button>
              <button onClick={() => setSpeechRate(r => (r === 1.0 ? 0.75 : 1.0))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-500 border border-slate-200 flex items-center gap-1">
                <Turtle size={14} /> {speechRate}x
              </button>
              <button onClick={togglePlayAll} className={`px-4 py-1.5 rounded-lg text-xs font-black transition ${isPlayingAll ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {isPlayingAll ? '⏹ 停止' : '▶ 連續朗讀'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {words.map(w => {
              const sentences = sentencesFor(w);
              return (
                <div key={w.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl font-black text-slate-800">{w.english}</span>
                      <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">{w.part_of_speech}</span>
                    </div>
                    <div className="text-base font-black text-slate-600">{w.chinese}</div>
                  </div>
                  {sentences[0] && (
                    <div className="bg-slate-50 border-l-4 border-blue-400 rounded-r-lg px-3 py-2 mb-3 text-sm text-slate-600">
                      {sentences[0]}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => speak(speechWord(w))} className="flex-1 bg-blue-50 text-blue-700 font-bold text-xs py-2 rounded-lg hover:bg-blue-100 transition">🔊 唸單字</button>
                    <button onClick={() => speak(speechWord(w), 0.7)} className="w-16 bg-amber-50 text-amber-700 font-bold text-xs py-2 rounded-lg hover:bg-amber-100 transition">🐢 慢速</button>
                    {sentences[0] && (
                      <button onClick={() => speak(sentences[0])} className="flex-1 bg-slate-100 text-slate-600 font-bold text-xs py-2 rounded-lg hover:bg-slate-200 transition">💬 唸例句</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : tab === 'PARENT' ? (
        <div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4">
            <div className="text-sm text-amber-800 font-bold mb-3">🎯 點按鈕遮住英文或中文，考小孩時點一下模糊區塊可以偷看答案</div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setMaskEn(m => !m)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${maskEn ? 'bg-amber-500 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>🙈 遮住英文 (考拼讀)</button>
              <button onClick={() => setMaskZh(m => !m)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${maskZh ? 'bg-amber-500 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>🙈 遮住中文 (考翻譯)</button>
              <button onClick={() => { setMaskEn(false); setMaskZh(false); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-500 border border-slate-200">顯示全部</button>
            </div>
          </div>

          <div className="space-y-2">
            {words.map(w => {
              const isRevealed = revealed.has(w.id);
              const blurEn = maskEn && !isRevealed;
              const blurZh = maskZh && !isRevealed;
              return (
                <div key={w.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex justify-between items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 font-bold mb-1">{w.part_of_speech}</div>
                    <div
                      onClick={() => toggleReveal(w.id)}
                      className={`text-lg font-black text-slate-800 cursor-pointer transition-all ${blurEn ? 'blur-sm select-none' : ''}`}
                    >
                      {w.english}
                    </div>
                    <div
                      onClick={() => toggleReveal(w.id)}
                      className={`text-sm font-bold text-slate-500 cursor-pointer transition-all ${blurZh ? 'blur-sm select-none' : ''}`}
                    >
                      {w.chinese}
                    </div>
                  </div>
                  <button onClick={() => speak(speechWord(w))} className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-700 transition whitespace-nowrap">
                    🔊 提示發音
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-6 md:p-8 text-center">
          {quizDone ? (
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">🎉 測驗完成！</h3>
              <p className="text-3xl font-black text-blue-600 mb-6">得分：{quizScore} / {quizPool.length * 10}</p>
              <button onClick={startQuiz} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-3 rounded-2xl shadow-md transition">🔄 再測一次</button>
            </div>
          ) : currentQuizWord ? (
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-4">
                <span>第 {quizIdx + 1} / {quizPool.length} 題</span>
                <span className="text-blue-600">得分：{quizScore}</span>
              </div>
              <p className="text-sm font-bold text-slate-600 mb-4">請聽發音，選出正確的中文意思：</p>
              <button onClick={() => speak(speechWord(currentQuizWord))} className="w-20 h-20 rounded-full bg-indigo-600 text-white text-3xl mx-auto mb-4 shadow-lg hover:bg-indigo-700 transition flex items-center justify-center">🔊</button>
              <div className="flex justify-center gap-4 text-xs font-bold mb-6">
                <button onClick={() => speak(speechWord(currentQuizWord), 0.7)} className="text-blue-600">🐢 慢速重聽</button>
                <span className="text-slate-300">|</span>
                <button onClick={() => { const s = sentencesFor(currentQuizWord)[0]; if (s) speak(s); }} className="text-slate-500">💬 聽例句提示</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quizOptions.map(opt => {
                  let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                  if (answerState !== 'idle') {
                    if (opt.id === currentQuizWord.id) cls = 'bg-emerald-500 border-emerald-600 text-white';
                    else if (opt.id === chosenId) cls = 'bg-red-100 border-red-300 text-red-700';
                    else cls = 'bg-slate-50 border-slate-200 text-slate-300';
                  }
                  return (
                    <button
                      key={opt.id}
                      disabled={answerState !== 'idle'}
                      onClick={() => checkAnswer(opt)}
                      className={`border-2 rounded-2xl p-4 font-black text-left transition ${cls}`}
                    >
                      {opt.chinese} <span className="text-xs opacity-70 font-bold">{opt.part_of_speech}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PracticeView;
