import React, { useState, useEffect } from 'react';
import { VocabWord } from '../services/newVocabData';
import { 
  getDailyHuntWords, 
  getWordsForLevel, 
  getDistractors, 
  updateWordMastery,
  unlockNextLevel,
  loadMasteryData,
  checkAndUnlockLegendaryMonsters
} from '../services/srsStorage';
import confetti from 'canvas-confetti';

interface Props {
  mode: 'daily' | 'level';
  levelId?: number;
  onClose: () => void;
}

type Phase = 'intro' | 'learn' | 'quiz' | 'summary';

export const SmartDailyReview: React.FC<Props> = ({ mode, levelId, onClose }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [wordsList, setWordsList] = useState<VocabWord[]>([]);
  
  // Learn Phase State
  const [learnIndex, setLearnIndex] = useState(0);
  
  // Quiz Phase State
  const [quizQueue, setQuizQueue] = useState<VocabWord[]>([]);
  const [currentQuizWord, setCurrentQuizWord] = useState<VocabWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    // Initialization
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

  const startLearning = () => {
    setPhase('learn');
    if (wordsList.length > 0) {
      speak(wordsList[0].word);
    }
  };

  const nextLearnCard = () => {
    if (learnIndex + 1 < wordsList.length) {
      const nextWord = wordsList[learnIndex + 1];
      setLearnIndex(learnIndex + 1);
      speak(nextWord.word);
    } else {
      // Finished learning, start quiz!
      startQuiz();
    }
  };

  const startQuiz = () => {
    setPhase('quiz');
    const shuffled = [...wordsList].sort(() => 0.5 - Math.random());
    setQuizQueue(shuffled);
    prepareNextQuestion(shuffled);
  };

  const prepareNextQuestion = (queue: VocabWord[]) => {
    if (queue.length === 0) {
      finishSession();
      return;
    }
    const target = queue[0];
    setCurrentQuizWord(target);
    
    // Generate options: 1 correct + 3 wrong
    const distractors = getDistractors(target.id, 3);
    const allOptions = [target.meaning, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setFeedbackState('idle');
    speak(target.word);
  };

  const handleAnswer = (selectedAns: string) => {
    if (feedbackState !== 'idle' || !currentQuizWord) return;

    const isCorrect = selectedAns === currentQuizWord.meaning;
    
    if (isCorrect) {
      setFeedbackState('correct');
      setCombo(prev => prev + 1);
      
      // Update mastery true
      updateWordMastery(currentQuizWord.id, true);

      // Play success SFX (Optional)
      setTimeout(() => {
        const newQueue = quizQueue.slice(1);
        setQuizQueue(newQueue);
        prepareNextQuestion(newQueue);
      }, 500);
    } else {
      setFeedbackState('wrong');
      setCombo(0);
      
      // Update mastery false
      updateWordMastery(currentQuizWord.id, false);

      // Move to back of the queue
      setTimeout(() => {
        const newQueue = [...quizQueue.slice(1), currentQuizWord];
        setQuizQueue(newQueue);
        prepareNextQuestion(newQueue);
      }, 1000);
    }
  };

  const finishSession = () => {
    setPhase('summary');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (mode === 'level' && levelId) {
      unlockNextLevel(levelId);
    }

    const masteryData = loadMasteryData();
    const masteredCount = Object.values(masteryData).filter(m => m.masteryLevel >= 2).length;
    checkAndUnlockLegendaryMonsters(masteredCount);
  };

  // -------------------------------------------------------------
  // Renders
  // -------------------------------------------------------------
  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-blue-50 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-black text-blue-800 mb-6 font-['Outfit']">
          {mode === 'daily' ? '🌟 每日單字探險 🌟' : `🗺️ 關卡挑戰：第 ${levelId} 關`}
        </h1>
        <p className="text-2xl text-blue-600 mb-10 font-bold">
          今天有 {wordsList.length} 個小怪獸等著你收服！
        </p>
        <button 
          onClick={startLearning}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-3xl font-black py-6 px-16 rounded-[2rem] shadow-lg transform transition hover:scale-105"
        >
          開始認識怪獸 (Start Learning)
        </button>
        <button onClick={onClose} className="mt-8 text-xl text-gray-500 font-bold hover:text-gray-700">
          離開 (Quit)
        </button>
      </div>
    );
  }

  if (phase === 'learn') {
    const word = wordsList[learnIndex];
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-[80%] mx-auto relative p-8">
        <div className="absolute top-4 left-4 text-2xl font-bold text-gray-500 border-2 border-gray-400 rounded-xl px-4 py-2">
          進度: {learnIndex + 1} / {wordsList.length}
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

  if (phase === 'quiz') {
    const word = currentQuizWord;
    if (!word) return null;

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 w-full max-w-4xl mx-auto">
        
        {/* Header HUD */}
        <div className="w-full flex justify-between items-center mb-8 px-4">
          <div className="bg-red-500 text-white font-black text-2xl px-6 py-3 rounded-2xl shadow-md border-b-4 border-red-700 flex items-center gap-2">
            <span>👾 剩餘怪獸: </span>
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

        {/* Answer Options */}
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
                onClick={() => handleAnswer(opt)}
                className={`text-4xl font-black p-8 rounded-2xl transition-all relative ${btnClass}`}
              >
                {opt}
                {showStatus && opt === word.meaning && feedbackState === 'correct' && (
                  <div className="absolute -top-4 -right-4 text-5xl animate-bounce">🟢</div>
                )}
                {showStatus && opt === word.meaning && feedbackState === 'wrong' && (
                  <div className="absolute -top-4 -right-4 text-5xl">👀 答案在這</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Summary Phase
  if (phase === 'summary') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-yellow-50 rounded-3xl shadow-xl border-8 border-yellow-400">
        <div className="text-8xl mb-8 animate-bounce">🏆</div>
        <h1 className="text-6xl font-black text-yellow-600 mb-6 drop-shadow-md">
          Perfect Clear!
        </h1>
        <p className="text-3xl text-yellow-700 mb-10 font-bold">
          所有的怪獸都被你收服了！太厲害了！
        </p>
        <button 
          onClick={onClose}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-4xl font-black py-6 px-20 border-b-8 border-yellow-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
        >
          領取獎勵並返回 (Claim Reward)
        </button>
      </div>
    );
  }

  return null;
};
