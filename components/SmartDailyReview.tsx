import React, { useState, useEffect, useRef } from 'react';
import { VocabWord, vocabData } from '../services/newVocabData';
import {
  getDailyHuntWords,
  getWordsForLevel,
  getDistractors,
  updateWordMastery,
  unlockNextLevel,
  loadMasteryData,
  isMastered,
  checkAndUnlockLegendaryMonsters
} from '../services/srsStorage';
import { getAllSentences, tryCreateCloze, findServerAudioId } from '../services/exampleLookup';
import { playAudio, preloadAudio } from '../services/audioPlayer';
import { logAnswer, makeWordKey } from '../services/answerLog';
import { awardCoins } from '../services/gamification';
import { getRemainingDrill } from '../services/mistakeBook/drillProgress';
import { getPlannedTargetWords } from '../services/mistakeBook/vocabLink';
import { MistakeDrill } from './MistakeDrill';
import { MONSTER_DATA } from '../services/monsterData';
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
  // One monster per session keeps the screens friendly without distracting from the word.
  const [monster] = useState(() => {
    const pool = Object.values(MONSTER_DATA).filter((m) => !m.isLegendary);
    return pool[Math.floor(Math.random() * pool.length)];
  });
  const [showDrill, setShowDrill] = useState(false); // P9: mistake drill follows the daily review
  const [wordsList, setWordsList] = useState<VocabWord[]>([]);

  // ── Learn Phase ──
  const [learnIndex, setLearnIndex] = useState(0);

  // ── Quiz Phase ──
  const [quizQueue, setQuizQueue] = useState<VocabWord[]>([]);
  const [currentQuizWord, setCurrentQuizWord] = useState<VocabWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // ── Cloze Phase ──
  const [clozeQueue, setClozeQueue] = useState<ClozeItem[]>([]);
  const [currentClozeIdx, setCurrentClozeIdx] = useState(0);
  const [clozeFeedback, setClozeFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [clozeCorrect, setClozeCorrect] = useState(0);
  const [clozeMistakes, setClozeMistakes] = useState<Record<string, number>>({});
  const [sentenceHintActive, setSentenceHintActive] = useState(false);
  const sentenceHintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timestamps when a question is shown, for answer-log responseMs.
  const quizShownAtRef = useRef<number>(Date.now());
  useEffect(() => {
    quizShownAtRef.current = Date.now();
  }, [currentQuizWord]);
  const clozeShownAtRef = useRef<number>(Date.now());
  useEffect(() => {
    clozeShownAtRef.current = Date.now();
  }, [currentClozeIdx]);

  useEffect(() => {
    return () => {
      if (sentenceHintTimerRef.current) {
        clearTimeout(sentenceHintTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Words that appear in today's mistake drill are skipped here so a word never shows up twice in one day.
    const words = mode === 'level' ? getWordsForLevel(levelId || 1) : getDailyHuntWords({ excludeWords: getPlannedTargetWords() });
    setWordsList(words);
    preloadAudio(words.flatMap((w) => {
      const audioId = findServerAudioId(w.word);
      return audioId == null ? [] : [`audio/word_${audioId}.mp3`];
    }));
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

  // This word bank (newVocabData) predates serverData's weekly imports and uses
  // its own string ids, so pre-generated audio is looked up by matching word
  // text against serverData instead of by id. Falls back to browser TTS when
  // there's no match or the pre-generated file fails to play.
  const playWord = (text: string) => {
    const audioId = findServerAudioId(text);
    if (audioId == null) {
      speak(text);
      return;
    }
    void playAudio(`audio/word_${audioId}.mp3`).then((status) => {
      if (status === 'unavailable') speak(text);
    });
  };

  // ════════════════════════════════
  // LEARN PHASE
  // ════════════════════════════════
  const startLearning = () => {
    setPhase('learn');
    if (wordsList.length > 0) playWord(wordsList[0].word);
  };

  const nextLearnCard = () => {
    if (learnIndex + 1 < wordsList.length) {
      const nextWord = wordsList[learnIndex + 1];
      setLearnIndex(learnIndex + 1);
      playWord(nextWord.word);
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
    playWord(target.word);
  };

  // P3/TASK-11d: guessing detection — responseMs < 1200 && wrong → no demotion
  const GUESSING_THRESHOLD_MS = 1200;

  const handleQuizAnswer = (selectedAns: string) => {
    if (feedbackState !== 'idle' || !currentQuizWord) return;
    const isCorrect = selectedAns === currentQuizWord.meaning;
    const responseMs = Date.now() - quizShownAtRef.current;
    const isGuessing = !isCorrect && responseMs < GUESSING_THRESHOLD_MS;

    logAnswer({
      wordId: makeWordKey('srs', currentQuizWord.id),
      gameType: 'multiple_choice',
      correct: isCorrect,
      responseMs,
    });

    if (isCorrect) {
      setFeedbackState('correct');
      setCombo(prev => prev + 1);
      setQuizCorrectCount(prev => prev + 1);
      updateWordMastery(currentQuizWord.id, true);
      setTimeout(() => {
        const newQueue = quizQueue.slice(1);
        setQuizQueue(newQueue);
        prepareNextQuestion(newQueue);
      }, 500);
    } else {
      setFeedbackState('wrong');
      setCombo(0);
      // P3/TASK-11d: guessing → skip demotion (still re-queue)
      if (!isGuessing) {
        updateWordMastery(currentQuizWord.id, false);
      }
      setTimeout(() => {
        // P3/TASK-11a+c: re-queue with fresh distractors (prepareNextQuestion regenerates them)
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

  // P3/TASK-11a: rebuild a cloze item with fresh distractors (for re-queue)
  const rebuildClozeItem = (item: ClozeItem): ClozeItem => {
    const newDistractors = wordsList
      .filter(w => w.word !== item.word.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.word);
    if (newDistractors.length < 3) {
      const extras = vocabData
        .filter(w => w.word !== item.word.word && !newDistractors.includes(w.word))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - newDistractors.length)
        .map(w => w.word);
      newDistractors.push(...extras);
    }
    const allOptions = [item.word.word, ...newDistractors.slice(0, 3)].sort(() => 0.5 - Math.random());
    return {
      ...item,
      options: allOptions,
      correctIdx: allOptions.indexOf(item.word.word),
    };
  };

  const handleClozeAnswer = (selectedIdx: number) => {
    if (clozeFeedback !== 'idle') return;
    const current = clozeQueue[currentClozeIdx];
    const isCorrect = selectedIdx === current.correctIdx;
    const responseMs = Date.now() - clozeShownAtRef.current;
    const isGuessing = !isCorrect && responseMs < GUESSING_THRESHOLD_MS;

    logAnswer({
      wordId: makeWordKey('srs', current.word.id),
      gameType: 'sentence_cloze',
      correct: isCorrect,
      responseMs,
    });

    setClozeFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setClozeCorrect(prev => prev + 1);
      updateWordMastery(current.word.id, true, undefined, 'context');
    } else {
      // P3/TASK-11d: guessing → skip demotion
      if (!isGuessing) {
        updateWordMastery(current.word.id, false, undefined, 'context');
      }
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
        // P3/TASK-11a+c: recycle with FRESH distractors
        setClozeQueue(prevQueue => {
          const item = prevQueue[currentClozeIdx];
          return [...prevQueue, rebuildClozeItem(item)];
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
    const masteredCount = Object.values(masteryData).filter(m => isMastered(m)).length;
    checkAndUnlockLegendaryMonsters(masteredCount);
    // This mode never went through saveResult()/processGamification(), so it
    // never paid out coins despite the gacha machine costing 500 of them —
    // award the same 10-coins-per-correct-answer rate here.
    awardCoins((quizCorrectCount + clozeCorrect) * 10);
  };

  // ════════════════════════════════
  // RENDERS
  // ════════════════════════════════

  if (showDrill) {
    return <MistakeDrill onClose={onClose} />;
  }

  // Screens share the fluid --fit-* tokens (index.html): big pieces on tablets, two columns in
  // landscape (monster / word on the left, answers on the right), stacked in portrait.
  const monsterImg = (extra = '') => (
    <img
      src={monster.image}
      style={{ filter: monster.filter }}
      className={`max-w-full max-h-full object-contain drop-shadow-md ${extra}`}
      alt="monster"
    />
  );
  const screen = 'flex flex-col min-h-[100dvh] landscape:h-[100dvh] w-full max-w-[1600px] mx-auto p-3 md:p-5';

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] landscape:h-[100dvh] p-4 text-center bg-blue-50">
        <div className="w-[var(--fit-monster)] h-[var(--fit-monster)] mb-[var(--fit-mb)] flex items-center justify-center">
          {monsterImg('animate-bounce')}
        </div>
        <h1 className="text-[length:var(--fit-zh)] leading-tight font-black text-blue-800 mb-[var(--fit-mb)] font-['Outfit']">
          {mode === 'daily' ? '🌟 每日單字探險 🌟' : `🗺️ 關卡挑戰：第 ${levelId} 關`}
        </h1>
        <p className="text-[length:var(--fit-body)] text-blue-600 mb-[var(--fit-mb)] font-bold">
          今天有 {wordsList.length} 個小怪獸等著你收服！
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-[var(--fit-gap)] text-[length:var(--fit-body)] text-blue-500 font-bold">
          <span>📖 第一關：認識單字</span>
          <span>→</span>
          <span>👾 第二關：選中文</span>
          <span>→</span>
          <span>✏️ 第三關：例句填空</span>
        </div>
        <button
          onClick={startLearning}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-[length:var(--fit-btn-font)] font-black py-[var(--fit-btn-py)] px-12 md:px-20 rounded-[2rem] shadow-lg transform transition hover:scale-105"
        >
          開始冒險！(Start!)
        </button>
        <button onClick={onClose} className="mt-[var(--fit-gap)] text-lg md:text-2xl text-gray-500 font-bold hover:text-gray-700 px-4 py-2">
          離開 (Quit)
        </button>
      </div>
    );
  }

  // ── Learn ──
  if (phase === 'learn') {
    const word = wordsList[learnIndex];
    return (
      <div className={`${screen} animate-fade-in`}>
        <div className="w-full flex justify-between items-center mb-[var(--fit-mb)] shrink-0">
          <button onClick={onClose} className="text-gray-400 font-black text-base md:text-xl px-2 py-1 hover:text-red-500">離開</button>
          <div className="bg-indigo-100 text-indigo-700 px-4 md:px-6 py-2 rounded-xl font-black text-sm md:text-xl">
            📖 學習：{learnIndex + 1} / {wordsList.length}
          </div>
        </div>

        <div
          onClick={() => playWord(word.word)}
          className="flex-1 min-h-0 bg-white rounded-[3rem] shadow-2xl p-[var(--fit-pad)] w-full flex flex-col landscape:flex-row items-center justify-center gap-[var(--fit-gap)] cursor-pointer active:scale-[0.99] transition-transform border-4 md:border-8 border-indigo-100 group"
        >
          <div className="shrink-0 w-[var(--fit-monster-l)] h-[var(--fit-monster-l)] group-hover:animate-bounce flex items-center justify-center">
            {monsterImg()}
          </div>
          <div className="flex flex-col items-center landscape:items-start text-center landscape:text-left min-w-0 landscape:flex-1 w-full">
            <div className="text-[length:var(--fit-word)] leading-tight font-black text-indigo-800 mb-1 font-['Outfit'] tracking-wide break-words max-w-full">
              {word.word}
            </div>
            <div className="text-[length:var(--fit-body)] text-gray-500 mb-[var(--fit-mb)] font-bold italic">
              ({word.partOfSpeech})
            </div>
            <div className="text-[length:var(--fit-zh)] leading-tight font-black text-green-600 drop-shadow-sm break-words max-w-full">
              {word.meaning}
            </div>
            <div className="mt-[var(--fit-mb)] opacity-60 flex items-center gap-2 [@media(max-height:480px)]:hidden">
              <span className="text-2xl md:text-3xl">🔊</span>
              <span className="text-base md:text-xl font-bold text-slate-500">點一下，聽發音</span>
            </div>
          </div>
        </div>

        <button
          onClick={nextLearnCard}
          className="mt-[var(--fit-gap)] shrink-0 self-center bg-green-500 hover:bg-green-600 text-white text-[length:var(--fit-btn-font)] font-black py-[var(--fit-btn-py)] w-full max-w-xl border-b-8 border-green-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
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
      <div className={`${screen} select-none touch-manipulation`}>
        {/* HUD */}
        <div className="w-full flex justify-between items-center mb-[var(--fit-mb)] shrink-0">
          <div className="bg-red-500 text-white font-black text-base md:text-2xl px-4 md:px-6 py-2 md:py-2.5 rounded-2xl shadow-md border-b-4 border-red-700 flex items-center gap-2">
            <span>👾 剩餘怪獸：</span>
            <span className="text-xl md:text-3xl">{quizQueue.length}</span>
          </div>
          {combo > 1 && (
            <div className="animate-bounce bg-orange-400 text-white font-black text-lg md:text-3xl px-4 md:px-6 py-1 md:py-2 rounded-2xl shadow-xl transform rotate-3">
              🔥 {combo} Combo!
            </div>
          )}
        </div>

        <div className="flex flex-col landscape:flex-row gap-[var(--fit-gap)] w-full items-stretch flex-1 min-h-0">
          {/* Question Card */}
          <div
            onClick={() => playWord(word.word)}
            className="flex-1 min-h-0 bg-indigo-600 text-white rounded-[3rem] p-[var(--fit-pad)] text-center shadow-2xl relative cursor-pointer active:scale-[0.98] transition-transform border-4 md:border-8 border-indigo-700 flex flex-col justify-center items-center"
          >
            <div className="w-[var(--fit-monster)] h-[var(--fit-monster)] mb-[var(--fit-mb)] flex items-center justify-center">
              {monsterImg()}
            </div>
            <div className="text-[length:var(--fit-word)] leading-tight font-black mb-1 font-['Outfit'] tracking-wider break-words max-w-full">{word.word}</div>
            <div className="text-[length:var(--fit-body)] text-indigo-200 font-bold italic">({word.partOfSpeech})</div>
            <div className="absolute top-4 right-5 text-2xl md:text-4xl opacity-60">🔊</div>
          </div>

          {/* Answer Options (Chinese) */}
          <div className="flex-1 min-h-0 flex flex-col justify-center bg-white p-[var(--fit-pad-sm)] rounded-[3rem] shadow-xl border-4 md:border-8 border-indigo-600">
            <div className="grid grid-cols-2 gap-3 md:gap-5 w-full landscape:auto-rows-[var(--fit-opt-row)]">
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
                    className={`text-[length:var(--fit-opt-font)] leading-tight font-black p-[var(--fit-opt-pad)] min-h-[var(--fit-opt-min)] rounded-3xl transition-all relative break-words ${btnClass}`}
                  >
                    {opt}
                    {showStatus && feedbackState === 'correct' && (
                      <div className="absolute -top-3 -right-3 text-4xl animate-bounce">🟢</div>
                    )}
                    {showStatus && feedbackState === 'wrong' && (
                      <div className="absolute -top-3 -right-3 text-xl md:text-2xl bg-white rounded-full px-3 py-1 shadow">👀 答案在這</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
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
      <div className={`${screen} select-none touch-manipulation`}>
        {/* HUD */}
        <div className="w-full flex justify-between items-center mb-[var(--fit-mb)] shrink-0">
          <div className="bg-emerald-500 text-white font-black text-base md:text-2xl px-4 md:px-6 py-2 md:py-2.5 rounded-2xl shadow-md border-b-4 border-emerald-700">
            ✏️ 例句填空：{currentClozeIdx + 1} / {clozeQueue.length}
          </div>
          <div className="bg-amber-400 text-white font-black text-base md:text-2xl px-4 md:px-6 py-2 md:py-2.5 rounded-2xl shadow-md border-b-4 border-amber-600">
            ⭐ {clozeCorrect} / {currentClozeIdx + (clozeFeedback !== 'idle' ? 1 : 0)}
          </div>
        </div>

        <div className="flex flex-col landscape:flex-row gap-[var(--fit-gap)] w-full items-stretch flex-1 min-h-0">
          {/* Sentence Card */}
          <div className="flex-1 min-h-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[3rem] p-[var(--fit-pad)] shadow-2xl border-4 md:border-8 border-emerald-600 flex flex-col justify-center items-center">
            <div className="w-[var(--fit-monster)] h-[var(--fit-monster)] mb-[var(--fit-mb)] flex items-center justify-center shrink-0">
              {monsterImg()}
            </div>
            <div className="text-[length:var(--fit-body)] font-bold opacity-80 mb-[var(--fit-mb)] text-center">
              選出正確的英文單字／片語填入空格
            </div>
            {/* Sentence with inline styled blank */}
            <div className="text-[length:var(--fit-sent)] font-black leading-snug font-['Outfit'] text-center">
              {parts.map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < parts.length - 1 && (
                    <span
                      className={`
                        inline-block mx-2 px-4 md:px-6 py-1 rounded-xl border-b-4 min-w-[5rem] text-center align-middle
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
            <div className="text-center mt-3 min-h-[2.5rem] flex items-center justify-center">
              {sentenceHintActive ? (
                <div className="text-[length:var(--fit-body)] opacity-90 font-bold text-yellow-300 animate-pulse">
                  💡 提示：{current.word.meaning}（{current.word.partOfSpeech}）
                </div>
              ) : (
                (clozeMistakes[current.word.id] || 0) >= 3 && (
                  <button
                    type="button"
                    onClick={() => triggerSentenceHint()}
                    className="bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black text-lg md:text-xl px-6 py-2 rounded-xl border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all shadow-md animate-bounce"
                  >
                    💡 提示
                  </button>
                )
              )}
            </div>
          </div>

          {/* Answer Options (English words/phrases) */}
          <div className="flex-1 min-h-0 flex flex-col justify-center bg-white p-[var(--fit-pad-sm)] rounded-[3rem] shadow-xl border-4 md:border-8 border-emerald-500">
            <div className="grid grid-cols-2 gap-3 md:gap-5 w-full landscape:auto-rows-[var(--fit-opt-row)]">
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
                    className={`text-[length:var(--fit-opt-font)] leading-tight font-black p-[var(--fit-opt-pad)] min-h-[var(--fit-opt-min)] rounded-3xl transition-all break-words ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Summary ──
  const drillLeft = mode === 'daily' ? getRemainingDrill().length : 0;
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] landscape:h-[100dvh] p-4 text-center bg-yellow-50">
      <div className="w-[calc(var(--fit-monster)*0.6)] h-[calc(var(--fit-monster)*0.6)] mb-[var(--fit-mb)] flex items-center justify-center animate-bounce">
        {monsterImg()}
      </div>
      <h1 className="text-[length:var(--fit-word)] leading-tight font-black text-yellow-600 mb-2 drop-shadow-md">
        Perfect Clear! 🏆
      </h1>
      <p className="text-[length:var(--fit-zh)] leading-tight text-yellow-700 mb-[var(--fit-mb)] font-bold">
        所有的怪獸都被你收服了！
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-[var(--fit-gap)] text-[length:var(--fit-body)] font-bold">
        {clozeQueue.length > 0 && (
          <p className="text-emerald-700 bg-emerald-50 px-5 py-2 rounded-2xl border-2 border-emerald-200">
            ✏️ 例句填空得分：{clozeCorrect} / {clozeQueue.length}
          </p>
        )}
        <p className="text-amber-700 bg-amber-50 px-5 py-2 rounded-2xl border-2 border-amber-200">
          🪙 獲得金幣：+{(quizCorrectCount + clozeCorrect) * 10}
        </p>
      </div>
      {drillLeft > 0 && (
        <button
          onClick={() => setShowDrill(true)}
          className="mb-[var(--fit-mb)] bg-amber-500 hover:bg-amber-600 text-white text-[length:var(--fit-btn-font)] font-black py-[var(--fit-btn-py)] px-10 md:px-16 border-b-8 border-amber-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
        >
          🛠️ 接著練錯題（{drillLeft} 題）
        </button>
      )}
      <button
        onClick={onClose}
        className="bg-yellow-500 hover:bg-yellow-600 text-white text-[length:var(--fit-btn-font)] font-black py-[var(--fit-btn-py)] px-10 md:px-16 border-b-8 border-yellow-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
      >
        領取獎勵並返回 (Claim Reward)
      </button>
    </div>
  );
};
