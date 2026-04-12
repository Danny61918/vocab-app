import React, { useState, useEffect, useCallback } from 'react';
import { GrammarCategory, GrammarQuestion } from '../types';
import { GRAMMAR_QUESTIONS } from '../services/grammarData';
import { XCircle, CheckCircle, ArrowRight, Star, Home, RefreshCw } from 'lucide-react';

interface Props {
  onExit: () => void;
}

// 實作保底抽題邏輯：每四題一定涵蓋四種類別
function getNextFourQuestions(): GrammarQuestion[] {
  const categories = [
    GrammarCategory.PREPOSITION_TIME,
    GrammarCategory.PREPOSITION_PLACE,
    GrammarCategory.TENSE_PRESENT_SIMPLE,
    GrammarCategory.TENSE_PRESENT_CONTINUOUS
  ];
  
  const selected: GrammarQuestion[] = [];
  for (const cat of categories) {
    const candidates = GRAMMAR_QUESTIONS.filter(q => q.category === cat);
    if (candidates.length > 0) {
      const randQ = candidates[Math.floor(Math.random() * candidates.length)];
      selected.push(randQ);
    }
  }
  
  // Shuffle the selected 4
  return selected.sort(() => Math.random() - 0.5);
}

const GrammarChallenge: React.FC<Props> = ({ onExit }) => {
  const [questionQueue, setQuestionQueue] = useState<GrammarQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<GrammarQuestion | null>(null);
  
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showRule, setShowRule] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // 初始化題目
  useEffect(() => {
    loadMoreQuestions();
  }, []);

  const loadMoreQuestions = useCallback(() => {
    const newBatch = getNextFourQuestions();
    setQuestionQueue(prev => [...prev, ...newBatch]);
  }, []);

  // 當 queue 變動時，若目前沒有題目則取一題
  useEffect(() => {
    if (!currentQuestion && questionQueue.length > 0) {
      setCurrentQuestion(questionQueue[0]);
      setQuestionQueue(prev => prev.slice(1));
    }
    // 預先加載
    if (questionQueue.length < 2) {
      loadMoreQuestions();
    }
  }, [questionQueue, currentQuestion, loadMoreQuestions]);

  const handleAnswer = (option: string) => {
    if (!currentQuestion || lastAnswerCorrect !== null) return;
    
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      // 動畫反饋
      setScore(s => s + 10 + (combo * 2)); // Combo 加成
      setCombo(c => {
        const nextCombo = c + 1;
        setMaxCombo(m => Math.max(m, nextCombo));
        return nextCombo;
      });
      
      // 答對的話，短暫延遲後進入下一題 (縮短動畫時間，讓節奏更精煉)
      setTimeout(() => {
        nextQuestion();
      }, 400);
    } else {
      setCombo(0); // 斷 Combo
      setShowRule(true); // 答錯顯示提示卡
    }
  };

  const nextQuestion = () => {
    setLastAnswerCorrect(null);
    setShowRule(false);
    setSelectedAnswer(null);
    
    if (questionQueue.length > 0) {
      setCurrentQuestion(questionQueue[0]);
      setQuestionQueue(prev => prev.slice(1));
    }
  };

  if (!currentQuestion) {
    return <div className="text-center p-20 font-black text-slate-400 animate-pulse">載入題庫中...</div>;
  }

  // 將底線替換為醒目的空格
  const maskedSentence = currentQuestion.sentenceContext.split('___').map((part, idx, arr) => (
    <React.Fragment key={idx}>
      {part}
      {idx < arr.length - 1 && (
         <span className={`inline-block px-4 py-1 mx-2 rounded-xl border-b-8 ${lastAnswerCorrect === true ? 'bg-emerald-100 border-emerald-400 text-emerald-600' : lastAnswerCorrect === false ? 'bg-red-100 border-red-400 text-red-600' : 'bg-slate-100 border-slate-300 text-transparent transition-all'} min-w-[80px] text-center align-bottom`}>
           {lastAnswerCorrect !== null ? selectedAnswer : '???'}
         </span>
      )}
    </React.Fragment>
  ));

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 w-full min-h-[90vh] flex flex-col relative touch-manipulation">
      
      {/* 頂部導航列 (兒童友善大字體) */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 md:p-6 rounded-3xl shadow-lg border-4 border-slate-100">
        <button 
          onClick={onExit}
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-4 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center gap-2 font-black"
        >
          <Home size={28} />
          <span className="hidden md:inline">回首頁</span>
        </button>
        
        <div className="flex gap-4 md:gap-8 items-center">
            {/* Combo 顯示區 */}
            {combo > 1 && (
              <div className="flex items-center gap-2 animate-bounce">
                 <span className="text-3xl">🔥</span>
                 <span className="text-2xl md:text-3xl font-black text-orange-500 italic">{combo} 連擊!</span>
              </div>
            )}
            
            <div className="flex flex-col items-end">
                <span className="text-sm font-black text-slate-400">得分分數</span>
                <div className="text-3xl md:text-5xl font-black text-blue-600 tracking-tight">{score}</div>
            </div>
        </div>
      </div>

      {/* 主要測驗區 */}
      <div className="bg-white flex-1 rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-8 border-8 border-white overflow-hidden relative flex flex-col">
          
          {/* 正確動畫蓋板 */}
          {lastAnswerCorrect && !showRule && (
             <div className="absolute inset-0 z-10 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm animate-fade-in">
                <div className="flex flex-col items-center animate-bounce">
                   <Star size={120} className="text-yellow-300 fill-current mb-4 drop-shadow-lg" />
                   <h2 className="text-6xl font-black text-white tracking-widest drop-shadow-md">太棒了!</h2>
                   {combo > 2 && <p className="text-yellow-200 text-2xl font-bold mt-2">繼續保持連勝！</p>}
                </div>
             </div>
          )}

          <div className="text-center mb-8 flex-1 flex flex-col justify-center">
             <div className="inline-block bg-blue-100 text-blue-600 font-bold px-4 py-2 rounded-full mb-6">
                 {currentQuestion.category.includes('PREPOSITION') ? '填入正確的介系詞' : '填入正確的動詞變化'}
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-slate-800 leading-[1.4] md:leading-[1.5]">
                 {maskedSentence}
             </h2>
          </div>

          {/* 選項按鈕區塊 - 專為平板點擊設計 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-auto">
             {currentQuestion.options.map((opt, idx) => (
                <button
                   key={idx}
                   disabled={lastAnswerCorrect !== null}
                   onClick={() => handleAnswer(opt)}
                   className={`
                      relative p-6 md:p-10 text-3xl md:text-4xl font-black rounded-[2rem] shadow-lg border-b-8 transition-all active:translate-y-2 active:border-b-0
                      ${selectedAnswer === opt && lastAnswerCorrect === false ? 'bg-red-500 text-white border-red-700' : 
                        selectedAnswer === opt && lastAnswerCorrect === true ? 'bg-emerald-500 text-white border-emerald-700' :
                        'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:border-blue-300'}
                      disabled:opacity-90
                   `}
                >
                   {opt}
                   {selectedAnswer === opt && lastAnswerCorrect === false && (
                       <XCircle size={40} className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white/50" />
                   )}
                </button>
             ))}
          </div>
      </div>

      {/* 錯題解碼器 (Rule Reminder Dialog) */}
      {showRule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in touch-none">
           <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl relative animate-slide-up">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-100 p-4 rounded-full border-8 border-white shadow-lg">
                 <RefreshCw size={64} className="text-red-500 animate-spin-slow" />
              </div>
              <h3 className="text-4xl font-black text-slate-800 mt-8 mb-4">哎呀，沒關係！</h3>
              <p className="text-2xl text-slate-600 font-bold mb-8 leading-relaxed">
                 這裡有一個小秘密：
              </p>
              <div className="bg-red-50 text-red-700 p-8 rounded-3xl font-black text-3xl md:text-4xl text-left border-4 border-red-200 leading-tight mb-10 shadow-inner">
                 " {currentQuestion.ruleReminder} "
              </div>
              <button 
                 onClick={nextQuestion}
                 className="w-full bg-blue-600 text-white text-3xl font-black py-8 rounded-[2rem] shadow-xl border-b-8 border-blue-800 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-center gap-4"
              >
                 我知道了，下一題！ <ArrowRight size={40} />
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default GrammarChallenge;
