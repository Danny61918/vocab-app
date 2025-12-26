
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Word, GameType, GameMode, Difficulty, Question, TestResult } from '../types';
import { getWords, saveResult, getLeaderboard, getLastPlayerName, setLastPlayerName } from '../services/storage';
import { generateQuestion, shuffleArray } from '../services/gameLogic';
import { CheckCircle, XCircle, Timer, ArrowRight, LogOut } from 'lucide-react';

interface Props {
  gameType: GameType;
  gameMode: GameMode;
  difficulty: Difficulty;
  onExit: () => void;
  targetWords?: Word[]; 
  onGameComplete?: (result: TestResult) => void;
  timeLimit?: number;
}

const QuizArea: React.FC<Props> = ({ gameType, gameMode, difficulty, onExit, targetWords, onGameComplete, timeLimit = 60 }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [questionQueue, setQuestionQueue] = useState<Word[]>([]);
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const [correctIds, setCorrectIds] = useState<number[]>([]);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [gameState, setGameState] = useState<'LOADING' | 'PLAYING' | 'FINISHED'>('LOADING');
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [userClozeInput, setUserClozeInput] = useState('');
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  const [playerName, setPlayerName] = useState(getLastPlayerName());
  const [nameSaved, setNameSaved] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const sourceWords = targetWords && targetWords.length > 0 ? targetWords : getWords();
    setWords(sourceWords);
    
    if (sourceWords.length < 4) {
      alert("單字量不足 (至少需要4個)");
      onExit();
      return;
    }

    const shuffled = shuffleArray([...sourceWords]);
    setQuestionQueue(shuffled);
    setGameState('PLAYING');
    
    if (shuffled.length > 0) {
        const firstQ = generateQuestion(sourceWords, gameType, difficulty, shuffled[0]);
        setCurrentQuestion(firstQ);
    }
  }, [targetWords, onExit, gameType, difficulty]);

  const finishGame = useCallback(() => {
    if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }
    setGameState('FINISHED');
  }, []);

  useEffect(() => {
    if (gameMode === GameMode.TIMED && gameState === 'PLAYING') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameMode, gameState, finishGame]);

  const loadNextQuestion = () => {
     const nextIndex = currentIndex + 1;
     
     if (nextIndex >= questionQueue.length) {
         if (gameMode === GameMode.PRACTICE) {
             const reshuffled = shuffleArray([...words]);
             const lastWord = questionQueue[questionQueue.length - 1];
             if (reshuffled.length > 1 && reshuffled[0].id === lastWord.id) {
                 [reshuffled[0], reshuffled[1]] = [reshuffled[1], reshuffled[0]];
             }
             setQuestionQueue(prev => [...prev, ...reshuffled]);
             const nextQ = generateQuestion(words, gameType, difficulty, reshuffled[0]);
             setCurrentQuestion(nextQ);
         } else {
             finishGame();
             return;
         }
     } else {
         const target = questionQueue[nextIndex];
         const nextQ = generateQuestion(words, gameType, difficulty, target);
         setCurrentQuestion(nextQ);
     }
     
     setLastAnswerCorrect(null);
     setUserClozeInput('');
     setCurrentIndex(nextIndex);
  };

  const handleAnswer = (answer: string | number) => {
    if (!currentQuestion || lastAnswerCorrect !== null) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setScore(s => s + 10);
      setCorrectIds(prev => [...prev, currentQuestion.targetWord.id]);
    } else {
      setWrongIds(prev => [...prev, currentQuestion.targetWord.id]);
    }

    setTimeout(() => {
      if (gameMode === GameMode.TIMED && timeLeft <= 0) {
        finishGame();
      } else {
        loadNextQuestion();
      }
    }, 500);
  };

  const handleClozeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || lastAnswerCorrect !== null) return;
    const input = userClozeInput.trim().toLowerCase();
    const correct = (currentQuestion.correctAnswer as string).toLowerCase();
    handleAnswer(input === correct ? currentQuestion.correctAnswer : 'WRONG_INPUT');
  };

  useEffect(() => {
    if (gameState === 'FINISHED') {
        const result: TestResult = {
          timestamp: Date.now(),
          totalQuestions: correctIds.length + wrongIds.length,
          correctCount: correctIds.length,
          score: score,
          mode: gameMode,
          type: gameType,
          difficulty: difficulty,
          correctIds: correctIds,
          wrongIds: wrongIds,
          playerName: playerName || 'Anonymous'
        };

        const currentLeaderboard = getLeaderboard(gameMode, gameType, difficulty);
        const topScore = currentLeaderboard.length > 0 ? currentLeaderboard[0].score : 0;
        if (score > topScore && score > 0) setIsNewRecord(true);

        if (onGameComplete) {
            onGameComplete(result);
        }
    }
  }, [gameState, score, correctIds, wrongIds, gameMode, gameType, difficulty, playerName, onGameComplete]);

  const handleSaveScore = () => {
      if (!playerName.trim()) return;
      setLastPlayerName(playerName);
      
      saveResult({
        timestamp: Date.now(),
        totalQuestions: correctIds.length + wrongIds.length,
        correctCount: correctIds.length,
        score: score,
        mode: gameMode,
        type: gameType,
        difficulty: difficulty,
        correctIds: correctIds,
        wrongIds: wrongIds,
        playerName: playerName
      });
      
      setNameSaved(true);
  };

  // 強化版手動退出
  const handleManualExit = () => {
      if (window.confirm("確定要結束測驗並觀看目前的結算成績嗎？")) {
          finishGame();
      }
  };

  if (gameState === 'LOADING') return <div className="text-center p-20 font-black text-slate-400 animate-pulse">單字庫準備中...</div>;

  if (gameState === 'FINISHED') {
    const totalAttempted = correctIds.length + wrongIds.length;
    const accuracy = totalAttempted > 0 ? Math.round((correctIds.length / totalAttempted) * 100) : 0;
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-2xl text-center animate-fade-in relative overflow-hidden mt-10">
        {isNewRecord && (
             <div className="absolute top-0 right-0 p-4 bg-yellow-400 text-yellow-900 font-black rotate-12 shadow-lg transform translate-x-4 -translate-y-2 z-20">
                 NEW RECORD!
             </div>
        )}
        <h2 className="text-3xl font-black mb-4 text-slate-800 tracking-tight">測驗完成</h2>
        <div className="text-7xl mb-6">🏆</div>
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1">總得分</p>
                <p className="text-5xl font-black text-blue-600">{score}</p>
            </div>
            <div className={`p-6 rounded-2xl border-2 ${accuracy >= 80 ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}>
                <p className={`${accuracy >= 80 ? 'text-emerald-400' : 'text-orange-400'} text-xs font-black uppercase tracking-widest mb-1`}>正確率</p>
                <p className={`text-5xl font-black ${accuracy >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>{accuracy}%</p>
            </div>
        </div>
        {!nameSaved && !onGameComplete && (
            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 max-w-sm mx-auto shadow-inner">
                <label className="block text-sm font-black text-slate-500 mb-3 uppercase">登記英雄榜</label>
                <div className="flex gap-2">
                    <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="你的名字" className="flex-1 p-3 border-2 border-white rounded-xl shadow-sm focus:border-blue-500 outline-none font-bold" />
                    <button onClick={handleSaveScore} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black hover:bg-blue-700 shadow-lg active:scale-95 transition-all">登記</button>
                </div>
            </div>
        )}
        {nameSaved && (
            <div className="mb-8 p-4 bg-emerald-50 text-emerald-700 rounded-xl font-bold border-2 border-emerald-100 animate-bounce">✅ 成功記錄至榮譽榜！</div>
        )}
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-slate-400 text-[10px] font-black uppercase">總題數</p>
                <p className="text-2xl font-black text-slate-700">{totalAttempted}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-emerald-400 text-[10px] font-black uppercase">答對</p>
                <p className="text-2xl font-black text-emerald-500">{correctIds.length}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-red-400 text-[10px] font-black uppercase">答錯</p>
                <p className="text-2xl font-black text-red-500">{wrongIds.length}</p>
            </div>
        </div>
        {wrongIds.length > 0 && (
          <div className="mb-8 text-left max-w-md mx-auto">
            <h3 className="font-black text-slate-700 mb-3 flex items-center gap-2">需加強的單字:</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {Array.from(new Set(wrongIds)).map((id, idx) => {
                const w = words.find(x => x.id === id);
                return w ? (
                  <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl flex justify-between items-center group">
                    <span className="font-black text-red-700">{w.english}</span>
                    <span className="text-red-400 font-bold text-sm">{w.chinese}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
        <button onClick={onExit} className="w-full bg-slate-800 hover:bg-black text-white py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95 text-lg">
          {onGameComplete ? "前往下一關" : "返回主選單"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3">
           <div className="bg-slate-800 text-white w-10 h-10 flex items-center justify-center rounded-xl font-black shadow-lg">
               {currentIndex + 1}
           </div>
           {gameMode === GameMode.TIMED && (
             <div className="flex items-center gap-2 text-orange-600 font-black bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
               <Timer size={18} /> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
             </div>
           )}
        </div>
        
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">目前得分</span>
                <div className="text-2xl font-black text-blue-600">{score}</div>
            </div>
            {/* 這裡使用一個最明確且層級最高的按鈕 */}
            <button 
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    handleManualExit();
                }}
                className="relative z-[100] bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 active:scale-90 transition-all shadow-md flex items-center justify-center"
            >
                <LogOut size={20} strokeWidth={3} />
            </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[450px] flex flex-col relative border-8 border-white">
        {lastAnswerCorrect !== null && (
          <div className={`absolute inset-0 z-[50] flex items-center justify-center bg-opacity-80 backdrop-blur-sm transition-all duration-300 ${lastAnswerCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
            <div className="animate-ping-once">
              {lastAnswerCorrect ? <CheckCircle size={120} className="text-emerald-500" /> : <XCircle size={120} className="text-red-500" />}
            </div>
          </div>
        )}

        <div className="bg-blue-600 p-12 text-center text-white relative">
          <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-4 opacity-80">
             {gameType === GameType.MATCHING ? 'Select Meaning' : (gameType === GameType.CLOZE ? 'Spell the word' : 'Vocabulary Challenge')}
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-md">
            {currentQuestion ? (gameType === GameType.MATCHING ? currentQuestion.targetWord.english : currentQuestion.targetWord.chinese) : ''}
          </h2>
          <div className="inline-block mt-6 px-4 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-md">
             {currentQuestion?.targetWord.part_of_speech}
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col justify-center bg-slate-50/50">
            {gameType === GameType.CLOZE && currentQuestion && (
                <div className="w-full max-w-md mx-auto space-y-6">
                    <div className="text-center">
                        <p className="text-5xl font-mono tracking-[0.2em] font-black text-slate-800 mb-8 bg-white py-8 rounded-3xl shadow-inner border-2 border-slate-100">
                            {userClozeInput || currentQuestion.clozeMask}
                        </p>
                    </div>
                    <form onSubmit={handleClozeSubmit} className="flex gap-3">
                        <input autoFocus type="text" className="flex-1 border-4 border-white bg-white shadow-xl rounded-2xl p-5 text-2xl text-center focus:border-blue-500 outline-none font-black transition-all" placeholder="輸入完整英文..." value={userClozeInput} onChange={(e) => setUserClozeInput(e.target.value)} />
                        <button type="submit" className="bg-blue-600 text-white rounded-2xl px-8 hover:bg-blue-700 shadow-xl active:scale-95 transition-all">
                            <ArrowRight size={32} />
                        </button>
                    </form>
                </div>
            )}
            {gameType !== GameType.CLOZE && currentQuestion && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt, idx) => {
                        const isWordObj = typeof opt !== 'string';
                        const display = isWordObj ? (opt as Word).chinese : (opt as string);
                        const pos = isWordObj ? (opt as Word).part_of_speech : '';
                        const value = isWordObj ? (opt as Word).id : (opt as string);
                        return (
                            <button key={idx} onClick={() => handleAnswer(value)} disabled={lastAnswerCorrect !== null} className="group relative p-8 text-xl font-black text-slate-700 bg-white border-4 border-white rounded-3xl hover:border-blue-400 hover:text-blue-600 shadow-lg hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50">
                                {display}
                                {pos && <span className="block text-xs text-slate-300 font-bold mt-1 group-hover:text-blue-300">{pos}</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizArea;
