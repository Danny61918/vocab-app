import React, { useState, useEffect, useRef } from 'react';
import { VocabWord, vocabData } from '../services/newVocabData';
import {
  getDailyHuntWords,
  getWordsForLevel,
  getDistractors,
  updateWordMastery,
  unlockNextLevel,
  loadMasteryData,
  checkAndUnlockLegendaryMonsters
} from '../services/srsStorage';
import { getAllSentences, tryCreateCloze } from '../services/exampleLookup';
import confetti from 'canvas-confetti';

interface Props {
  mode: 'daily' | 'level';
  levelId?: number;
  onClose: () => void;
}

interface ClozeItem {
  word: VocabWord;
  blankedSentence: string;
  options: string[];   // 4 English word/phrase choices
  correctIdx: number;  // index of correct answer in options[]
}

type Phase = 'intro' | 'learn' | 'quiz' | 'cloze' | 'summary';

export const SmartDailyReview: React.FC<Props> = ({ mode, levelId, onClose }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [wordsList, setWordsList] = useState<VocabWord[]>([]);

  // ── Learn Phase ──
  const [learnIndex, setLearnIndex] = useState(0);

  // ── Quiz Phase ──
  const [quizQueue, setQuizQueue] = useState<VocabWord[]>([]);
  const [currentQuizWord, setCurrentQuizWord] = useState<VocabWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // ── Cloze Phase ──
  const [clozeQueue, setClozeQueue] = useState<ClozeItem[]>([]);
  const [currentClozeIdx, setCurrentClozeIdx] = useState(0);
  const [clozeFeedback, setClozeFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [clozeCorrect, setClozeCorrect] = useState(0);
  const [clozeMistakes, setClozeMistakes] = useState<Record<string, number>>({});
  const [sentenceHintActive, setSentenceHintActive] = useState(false);
  const sentenceHintTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (sentenceHintTimerRef.current) {
        clearTimeout(sentenceHintTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const words = mode === 'level' ? getWordsForLevel(levelId || 1) : getDailyHuntWords();
    setWordsList(words);
  }, [mode, levelId]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ════════════════════════════════
  // LEARN PHASE
  // ════════════════════════════════
  const startLearning = () => {
    setPhase('learn');
    if (wordsList.length > 0) speak(wordsList[0].word);
  };

  const nextLearnCard = () => {
    if (learnIndex + 1 < wordsList.length) {
      const nextWord = wordsList[learnIndex + 1];
      setLearnIndex(learnIndex + 1);
      speak(nextWord.word);
    } else {
      startQuiz();
    }
  };

  // ════════════════════════════════
  // QUIZ PHASE (看英文 → 選中文)
  // ════════════════════════════════
  const startQuiz = () => {
    setPhase('quiz');
    const shuffled = [...wordsList].sort(() => 0.5 - Math.random());
    setQuizQueue(shuffled);
    prepareNextQuestion(shuffled);
  };

  const prepareNextQuestion = (queue: VocabWord[]) => {
    if (queue.length === 0) {
      startCloze();
      return;
    }
    const target = queue[0];
    setCurrentQuizWord(target);
    const distractors = getDistractors(target.id, 3);
    const allOptions = [target.meaning, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setFeedbackState('idle');
    speak(target.word);
  };

  const handleQuizAnswer = (selectedAns: string) => {
    if (feedbackState !== 'idle' || !currentQuizWord) return;
    const isCorrect = selectedAns === currentQuizWord.meaning;

    if (isCorrect) {
      setFeedbackState('correct');
      setCombo(prev => prev + 1);
      updateWordMastery(currentQuizWord.id, true);
      setTimeout(() => {
        const newQueue = quizQueue.slice(1);
        setQuizQueue(newQueue);
        prepareNextQuestion(newQueue);
      }, 500);
    } else {
      setFeedbackState('wrong');
      setCombo(0);
      updateWordMastery(currentQuizWord.id, false);
      setTimeout(() => {
        const newQueue = [...quizQueue.slice(1), currentQuizWord];
        setQuizQueue(newQueue);
        prepareNextQuestion(newQueue);
      }, 1000);
    }
  };

  // ════════════════════════════════
  // CLOZE PHASE (例句填空)
  // ════════════════════════════════
  const buildClozeQueue = (words: VocabWord[]): ClozeItem[] => {
    const items: ClozeItem[] = [];

    for (const word of words) {
      // Get ALL sentences for this word (up to 5 from EXTRA_SENTENCES + 1 from example)
      const sentences = getAllSentences(word.word);
      if (sentences.length === 0) continue;

      // Randomly pick one sentence each time → different question every session!
      const shuffledSents = [...sentences].sort(() => 0.5 - Math.random());
      let clozeData = null;

      for (const sent of shuffledSents) {
        clozeData = tryCreateCloze(sent, word.word);
        if (clozeData) break;
      }

      if (!clozeData) continue;

      // Build 4 options: correct + 3 distractors from the current session
      const distractors = words
        .filter(w => w.word !== word.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.word);

      // Pad with vocabData words if session has < 4 distinct words
      if (distractors.length < 3) {
        const extras = vocabData
          .filter(w => w.word !== word.word && !distractors.includes(w.word))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3 - distractors.length)
          .map(w => w.word);
        distractors.push(...extras);
      }

      const allOptions = [word.word, ...distractors.slice(0, 3)].sort(() => 0.5 - Math.random());
      const correctIdx = allOptions.indexOf(word.word);

      items.push({
        word,
        blankedSentence: clozeData.blankedSentence,
        options: allOptions,
        correctIdx,
      });
    }

    // Shuffle the final queue
    return items.sort(() => 0.5 - Math.random());
  };

  const startCloze = () => {
    const queue = buildClozeQueue(wordsList);
    if (queue.length === 0) {
      // No sentences available → skip straight to summary
      finishSession();
      return;
    }
    setClozeQueue(queue);
    setCurrentClozeIdx(0);
    setClozeFeedback('idle');
    setClozeCorrect(0);
    setClozeMistakes({});
    setSentenceHintActive(false);
    setPhase('cloze');
  };

  const triggerSentenceHint = () => {
    if (sentenceHintTimerRef.current) {
      clearTimeout(sentenceHintTimerRef.current);
    }
    setSentenceHintActive(true);
    sentenceHintTimerRef.current = setTimeout(() => {
      setSentenceHintActive(false);
      sentenceHintTimerRef.current = null;
    }, 3000);
  };

  const handleClozeAnswer = (selectedIdx: number) => {
    if (clozeFeedback !== 'idle') return;
    const current = clozeQueue[currentClozeIdx];
    const isCorrect = selectedIdx === current.correctIdx;

    setClozeFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setClozeCorrect(prev => prev + 1);
      updateWordMastery(current.word.id, true);
    } else {
      updateWordMastery(current.word.id, false);
      setClozeMistakes(prev => ({
        ...prev,
        [current.word.id]: (prev[current.word.id] || 0) + 1
      }));
    }

    const delay = isCorrect ? 800 : 1800;
    setTimeout(() => {
      setClozeFeedback('idle');
      setSentenceHintActive(false);
      if (sentenceHintTimerRef.current) {
        clearTimeout(sentenceHintTimerRef.current);
        sentenceHintTimerRef.current = null;
      }

      if (isCorrect) {
        if (currentClozeIdx + 1 < clozeQueue.length) {
          setCurrentClozeIdx(prev => prev + 1);
        } else {
          finishSession();
        }
      } else {
        // Recycle the wrong item to the end of the queue
        setClozeQueue(prevQueue => {
          const item = prevQueue[currentClozeIdx];
          return [...prevQueue, item];
        });
        setCurrentClozeIdx(prev => prev + 1);
      }
    }, delay);
  };

  // ════════════════════════════════
  // FINISH
  // ════════════════════════════════
  const finishSession = () => {
    setPhase('summary');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    if (mode === 'level' && levelId) unlockNextLevel(levelId);
    const masteryData = loadMasteryData();
    const masteredCount = Object.values(masteryData).filter(m => m.masteryLevel >= 2).length;
    checkAndUnlockLegendaryMonsters(masteredCount);
  };

  // ════════════════════════════════
  // RENDERS
  // ════════════════════════════════

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-blue-50 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-black text-blue-800 mb-6 font-['Outfit']">
          {mode === 'daily' ? '🌟 每日單字探險 🌟' : `🗺️ 關卡挑戰：第 ${levelId} 關`}
        </h1>
        <p className="text-2xl text-blue-600 mb-4 font-bold">
          今天有 {wordsList.length} 個小怪獸等著你收服！
        </p>
        <div className="flex gap-6 mb-10 text-lg text-blue-500 font-bold">
          <span>📖 第一關：認識單字</span>
          <span>→</span>
          <span>👾 第二關：選中文</span>
          <span>→</span>
          <span>✏️ 第三關：例句填空</span>
        </div>
        <button
          onClick={startLearning}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-3xl font-black py-6 px-16 rounded-[2rem] shadow-lg transform transition hover:scale-105"
        >
          開始冒險！(Start!)
        </button>
        <button onClick={onClose} className="mt-8 text-xl text-gray-500 font-bold hover:text-gray-700">
          離開 (Quit)
        </button>
      </div>
    );
  }

  // ── Learn ──
  if (phase === 'learn') {
    const word = wordsList[learnIndex];
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-[80%] mx-auto relative p-8">
        <div className="absolute top-4 left-4 text-2xl font-bold text-gray-500 border-2 border-gray-400 rounded-xl px-4 py-2">
          📖 學習：{learnIndex + 1} / {wordsList.length}
        </div>

        <div
          onClick={() => speak(word.word)}
          className="bg-white rounded-[3rem] shadow-2xl p-16 w-full max-w-3xl flex flex-col items-center justify-center cursor-pointer transform transition hover:scale-105 border-4 border-indigo-100"
        >
          <div className="text-7xl font-black text-indigo-800 mb-4 font-['Outfit'] tracking-wide">
            {word.word}
          </div>
          <div className="text-3xl text-gray-500 mb-8 font-bold italic">
            ({word.partOfSpeech})
          </div>
          <div className="text-5xl font-black text-green-600 drop-shadow-sm">
            {word.meaning}
          </div>
          <div className="mt-12 opacity-50 flex items-center gap-2">
            <span className="text-3xl">🔊</span>
            <span className="text-xl font-bold">點擊念出發音</span>
          </div>
        </div>

        <button
          onClick={nextLearnCard}
          className="mt-12 bg-green-500 hover:bg-green-600 text-white text-4xl font-black py-6 px-20 border-b-8 border-green-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
        >
          我記住了 (Got It!)
        </button>
      </div>
    );
  }

  // ── Quiz (看英文 → 選中文) ──
  if (phase === 'quiz') {
    const word = currentQuizWord;
    if (!word) return null;

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 w-full max-w-4xl mx-auto">
        {/* HUD */}
        <div className="w-full flex justify-between items-center mb-8 px-4">
          <div className="bg-red-500 text-white font-black text-2xl px-6 py-3 rounded-2xl shadow-md border-b-4 border-red-700 flex items-center gap-2">
            <span>👾 剩餘怪獸：</span>
            <span className="text-3xl">{quizQueue.length}</span>
          </div>
          {combo > 1 && (
            <div className="animate-bounce bg-orange-400 text-white font-black text-3xl px-6 py-2 rounded-2xl shadow-xl transform rotate-3">
              🔥 {combo} Combo!
            </div>
          )}
        </div>

        {/* Question Card */}
        <div
          onClick={() => speak(word.word)}
          className="bg-indigo-600 text-white w-full rounded-t-3xl p-12 text-center shadow-2xl relative cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="text-6xl font-black mb-4 font-['Outfit'] tracking-wider">{word.word}</div>
          <div className="text-3xl text-indigo-200 font-bold italic">({word.partOfSpeech})</div>
          <div className="absolute top-4 right-4 text-3xl opacity-50">🔊</div>
        </div>

        {/* Answer Options (Chinese) */}
        <div className="grid grid-cols-2 gap-4 w-full bg-white p-8 rounded-b-3xl shadow-xl border-4 border-t-0 border-indigo-600">
          {options.map((opt, i) => {
            let btnClass = "bg-gray-100 hover:bg-blue-100 text-gray-800 border-b-8 border-gray-300 active:border-b-0 active:translate-y-2";
            let showStatus = false;

            if (feedbackState !== 'idle') {
              if (opt === word.meaning) {
                btnClass = "bg-green-500 text-white border-b-8 border-green-700 z-10 scale-105";
                showStatus = true;
              } else if (feedbackState === 'wrong') {
                btnClass = "bg-gray-200 text-gray-400 opacity-50 border-gray-200";
              }
            }

            return (
              <button
                key={i}
                disabled={feedbackState !== 'idle'}
                onClick={() => handleQuizAnswer(opt)}
                className={`text-4xl font-black p-8 rounded-2xl transition-all relative ${btnClass}`}
              >
                {opt}
                {showStatus && feedbackState === 'correct' && (
                  <div className="absolute -top-4 -right-4 text-5xl animate-bounce">🟢</div>
                )}
                {showStatus && feedbackState === 'wrong' && (
                  <div className="absolute -top-4 -right-4 text-4xl">👀 答案在這</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Cloze (例句填空：看句子 → 選英文單字) ──
  if (phase === 'cloze') {
    const current = clozeQueue[currentClozeIdx];
    if (!current) return null;

    // Split the blanked sentence around "_____" for styled rendering
    const parts = current.blankedSentence.split('_____');

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 w-full max-w-4xl mx-auto">
        {/* HUD */}
        <div className="w-full flex justify-between items-center mb-8 px-4">
          <div className="bg-emerald-500 text-white font-black text-2xl px-6 py-3 rounded-2xl shadow-md border-b-4 border-emerald-700">
            ✏️ 例句填空：{currentClozeIdx + 1} / {clozeQueue.length}
          </div>
          <div className="bg-amber-400 text-white font-black text-2xl px-6 py-3 rounded-2xl shadow-md border-b-4 border-amber-600">
            ⭐ {clozeCorrect} / {currentClozeIdx + (clozeFeedback !== 'idle' ? 1 : 0)}
          </div>
        </div>

        {/* Sentence Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-full rounded-t-3xl p-10 shadow-2xl">
          <div className="text-lg font-bold opacity-70 mb-4 text-center">
            選出正確的英文單字／片語填入空格
          </div>
          {/* Sentence with inline styled blank */}
          <div className="text-3xl font-black leading-relaxed font-['Outfit'] text-center">
            {parts.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < parts.length - 1 && (
                  <span
                    className={`
                      inline-block mx-2 px-6 py-1 rounded-xl border-b-4 min-w-[120px] text-center align-middle
                      ${clozeFeedback === 'correct'
                        ? 'bg-green-400 border-green-600 text-white'
                        : clozeFeedback === 'wrong'
                        ? 'bg-red-400 border-red-600 text-white'
                        : 'bg-white/30 border-white/50 text-white/80'}
                    `}
                  >
                    {clozeFeedback === 'correct'
                      ? `✅ ${current.word.word}`
                      : clozeFeedback === 'wrong'
                      ? `❌ ${current.options[current.correctIdx]}`
                      : '？？？'}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Hint: Chinese meaning */}
          <div className="text-center mt-4 min-h-[40px] flex items-center justify-center">
            {sentenceHintActive ? (
              <div className="text-lg opacity-90 font-bold text-yellow-300 animate-pulse">
                💡 提示：{current.word.meaning}（{current.word.partOfSpeech}）
              </div>
            ) : (
              (clozeMistakes[current.word.id] || 0) >= 3 && (
                <button
                  type="button"
                  onClick={() => triggerSentenceHint()}
                  className="bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black px-6 py-2 rounded-xl border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all shadow-md animate-bounce"
                >
                  💡 提示
                </button>
              )
            )}
          </div>
        </div>

        {/* Answer Options (English words/phrases) */}
        <div className="grid grid-cols-2 gap-4 w-full bg-white p-8 rounded-b-3xl shadow-xl border-4 border-t-0 border-emerald-500">
          {current.options.map((opt, i) => {
            const isCorrect = i === current.correctIdx;
            let btnClass = "bg-gray-100 hover:bg-emerald-100 text-gray-800 border-b-8 border-gray-300 active:border-b-0 active:translate-y-2";

            if (clozeFeedback !== 'idle') {
              if (isCorrect) {
                btnClass = "bg-green-500 text-white border-b-8 border-green-700 scale-105";
              } else {
                btnClass = "bg-gray-200 text-gray-400 opacity-40 border-gray-200";
              }
            }

            return (
              <button
                key={i}
                disabled={clozeFeedback !== 'idle'}
                onClick={() => handleClozeAnswer(i)}
                className={`text-2xl font-black p-6 rounded-2xl transition-all ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Summary ──
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-yellow-50 rounded-3xl shadow-xl border-8 border-yellow-400">
      <div className="text-8xl mb-8 animate-bounce">🏆</div>
      <h1 className="text-6xl font-black text-yellow-600 mb-4 drop-shadow-md">
        Perfect Clear!
      </h1>
      <p className="text-3xl text-yellow-700 mb-4 font-bold">
        所有的怪獸都被你收服了！太厲害了！
      </p>
      {clozeQueue.length > 0 && (
        <p className="text-2xl text-emerald-700 mb-8 font-bold bg-emerald-50 px-6 py-3 rounded-2xl border-2 border-emerald-200">
          ✏️ 例句填空得分：{clozeCorrect} / {clozeQueue.length}
        </p>
      )}
      <button
        onClick={onClose}
        className="bg-yellow-500 hover:bg-yellow-600 text-white text-4xl font-black py-6 px-20 border-b-8 border-yellow-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
      >
        領取獎勵並返回 (Claim Reward)
      </button>
    </div>
  );
};
