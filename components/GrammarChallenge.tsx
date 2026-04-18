import React, { useState, useEffect, useCallback } from 'react';
import { GrammarCategory, GrammarQuestion } from '../types';
import { GRAMMAR_QUESTIONS, GRAMMAR_BOSS_MAP } from '../services/grammarData';
import { MONSTER_DATA } from '../services/monsterData';
import { unlockMonster } from '../services/srsStorage';
import { XCircle, ArrowRight, Home, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onExit: () => void;
}

const GrammarChallenge: React.FC<Props> = ({ onExit }) => {
  const [phase, setPhase] = useState<'select' | 'battle' | 'victory' | 'defeat'>('select');
  const [selectedCategory, setSelectedCategory] = useState<GrammarCategory | null>(null);
  const [bossId, setBossId] = useState<number | null>(null);
  
  // Battle states
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  const [bossHp, setBossHp] = useState(15);
  const [playerHp, setPlayerHp] = useState(3);
  
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showRule, setShowRule] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startBattle = (category: GrammarCategory) => {
    setSelectedCategory(category);
    setBossId(GRAMMAR_BOSS_MAP[category]);
    
    // Get all questions matching category
    const categoryQuestions = GRAMMAR_QUESTIONS.filter(q => q.category === category);
    
    // Random queue of questions
    const battleQueue = Array.from({length: 20}).map(() => {
        return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    });
    
    setQuestions(battleQueue);
    setCurrentQIndex(0);
    setBossHp(15);
    setPlayerHp(3);
    setPhase('battle');
  };

  const handleAnswer = (option: string) => {
    const currentQuestion = questions[currentQIndex];
    if (!currentQuestion || lastAnswerCorrect !== null) return;
    
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setBossHp(prev => prev - 1);
      setTimeout(() => {
        nextQuestion(true);
      }, 700);
    } else {
      setPlayerHp(prev => prev - 1);
      setShowRule(true);
    }
  };

  const nextQuestion = (wasCorrect: boolean) => {
    setLastAnswerCorrect(null);
    setShowRule(false);
    setSelectedAnswer(null);
    setCurrentQIndex(prev => prev + 1);
    
    // State values captured in nextQuestion might be stale if used directly from state variables instead of functional updates unless we use ref, 
    // but React guarantees next render is scheduled correctly. 
    // BUT since bossHp and playerHp states are processed earlier, we use the values from the outer closure correctly here by estimating minus 1
    const finalBossHp = wasCorrect ? bossHp - 1 : bossHp;
    const finalPlayerHp = wasCorrect ? playerHp : playerHp - 1;

    if (wasCorrect && finalBossHp <= 0) {
       if (bossId) unlockMonster(bossId);
       setPhase('victory');
       confetti({ particleCount: 200, zIndex: 9999 });
    } else if (!wasCorrect && finalPlayerHp <= 0) {
       setPhase('defeat');
    }
  };

  if (phase === 'select') {
    return (
      <div className="flex flex-col items-center min-h-[80vh] p-4 text-center relative w-full max-w-5xl mx-auto">
        <button 
          onClick={onExit}
          className="absolute top-4 left-4 bg-slate-200 text-slate-700 text-2xl font-bold py-3 px-6 rounded-2xl shadow-sm"
        >⬅️ 回大廳</button>
        <h1 className="text-5xl font-black text-rose-600 mb-4 mt-8 drop-shadow-md">⚔️ 文法大頭目討伐戰</h1>
        <p className="text-xl text-slate-500 mb-8 font-bold">選擇你要討伐的魔王，答對 15 題把它抓回家！<br/>(注意：被打掉 3 顆愛心就輸囉)</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-4">
          {Object.entries(GRAMMAR_BOSS_MAP).map(([category, mId]) => {
            const monster = MONSTER_DATA[mId];
            return (
              <div key={category} onClick={() => startBattle(category as GrammarCategory)} className="bg-white rounded-[3rem] p-6 border-b-8 border-rose-300 shadow-xl cursor-pointer hover:bg-rose-50 hover:scale-[1.03] transition-all flex flex-col items-center border-4">
                 <div className="w-32 h-32 mb-6">
                   <img src={`/${monster.image}`} style={{filter: monster.filter}} className="w-full h-full object-contain drop-shadow-lg" />
                 </div>
                 <h2 className="text-2xl font-black text-rose-800 mb-3">{monster.name}</h2>
                 <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-xl font-bold text-sm">
                    {category.includes('TIME') ? '時間介系詞' : category.includes('PLACE') ? '地方介系詞' : category.includes('SIMPLE') ? '現在簡單式' : '現在進行式'}
                 </span>
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  // Battle Phase
  if (phase === 'battle') {
    const currentQuestion = questions[currentQIndex];
    if (!currentQuestion) return null;
    const monster = MONSTER_DATA[bossId!];

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
        
        {/* Top HUD */}
        <div className="flex justify-between items-center mb-6 bg-slate-900 p-4 rounded-[2rem] shadow-lg border-4 border-slate-800 text-white">
           <button onClick={() => setPhase('select')} className="bg-slate-700 p-3 rounded-2xl mr-2"><Home size={28}/></button>
           
           {/* Player HP */}
           <div className="flex items-center gap-1 bg-slate-800 px-4 py-3 rounded-2xl border-2 border-slate-700">
              <span className="text-lg font-bold text-slate-400 mr-2 hidden md:inline">愛心</span>
              {[...Array(3)].map((_, i) => (
                <Heart key={i} size={30} className={i < playerHp ? 'text-rose-500 fill-current' : 'text-slate-600 fill-current opacity-30'} />
              ))}
           </div>
           
           {/* Boss Info & HP */}
           <div className="flex-1 max-w-[280px] ml-auto">
             <div className="flex items-center gap-4 bg-rose-950 px-4 py-3 rounded-2xl border-2 border-rose-800 relative overflow-hidden">
               <div className="absolute right-0 top-0 bottom-0 bg-red-600 opacity-30" style={{width: `${(bossHp / 15) * 100}%`, transition: 'width 0.4s ease-out'}}></div>
               <img src={`/${monster.image}`} style={{filter: monster.filter}} className="w-12 h-12 object-contain z-10" />
               <div className="flex flex-col items-end z-10 font-sans w-full">
                  <span className="text-xs font-bold text-rose-300 mb-1">{monster.name} - HP {bossHp}/15</span>
                  <div className="text-sm font-black w-full bg-black/40 rounded-full h-4 overflow-hidden outline outline-1 outline-rose-700">
                      <div className="bg-rose-500 h-full" style={{width: `${(bossHp / 15) * 100}%`, transition: 'width 0.4s ease-out'}} />
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* Main Question Area */}
        <div className="bg-white flex-1 rounded-[2.5rem] shadow-2xl p-6 md:p-12 mb-8 border-8 border-white overflow-hidden relative flex flex-col">
            
            {/* Hit Effect overlay */}
            {lastAnswerCorrect === true && !showRule && (
               <div className="absolute inset-0 z-10 flex items-center justify-center bg-rose-600/80 backdrop-blur-sm animate-fade-in pointer-events-none">
                  <div className="text-9xl animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,1)]">💥</div>
               </div>
            )}

            <div className="text-center mb-8 flex-1 flex flex-col justify-center">
               <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-[1.6]">
                   {maskedSentence}
               </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-auto">
               {currentQuestion.options.map((opt, idx) => (
                  <button
                     key={idx}
                     disabled={lastAnswerCorrect !== null}
                     onClick={() => handleAnswer(opt)}
                     className={`
                        relative p-6 md:p-8 text-3xl font-black rounded-[2rem] shadow-lg border-b-8 transition-all active:translate-y-2 active:border-b-0
                        ${selectedAnswer === opt && lastAnswerCorrect === false ? 'bg-red-500 text-white border-red-700' : 
                          selectedAnswer === opt && lastAnswerCorrect === true ? 'bg-emerald-500 text-white border-emerald-700' :
                          'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300'}
                        disabled:opacity-90
                     `}
                  >
                     {opt}
                     {selectedAnswer === opt && lastAnswerCorrect === false && (
                        <XCircle size={32} className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white/50" />
                     )}
                  </button>
               ))}
            </div>
        </div>

        {/* Rule Dialog */}
        {showRule && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 touch-none">
             <div className="bg-white rounded-[3rem] p-8 max-w-2xl w-full text-center shadow-2xl animate-fade-in border-8 border-red-500">
                <div className="text-8xl mb-6 mt-4">💔</div>
                <h3 className="text-4xl font-black text-slate-800 mb-6">不小心被魔王攻擊了！</h3>
                <div className="bg-red-50 text-red-700 p-8 rounded-[2rem] font-black text-2xl text-left border-4 border-red-200 mb-10 shadow-inner">
                   {currentQuestion.ruleReminder}
                </div>
                <button 
                   onClick={() => nextQuestion(false)}
                   className="w-full bg-slate-800 hover:bg-slate-700 text-white text-3xl font-black py-6 rounded-[2rem] shadow-xl border-b-8 border-slate-900 flex items-center justify-center gap-4"
                >繼續戰鬥 <ArrowRight size={32} /></button>
             </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'victory') {
    const monster = MONSTER_DATA[bossId!];
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center relative border-8 border-yellow-400 bg-yellow-50 rounded-[3rem] m-8 shadow-2xl">
        <div className="text-9xl mb-8 animate-bounce drop-shadow-md">🏆</div>
        <h1 className="text-7xl font-black text-yellow-600 mb-6 drop-shadow-sm font-['Outfit']">討伐成功！</h1>
        <p className="text-3xl text-yellow-800 font-bold mb-8 leading-relaxed">
          你把「<span className="text-rose-600">{monster.name}</span>」打得落花流水！<br/>成功將牠收服到圖鑑囉！
        </p>
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-yellow-200 blur-3xl rounded-full animate-pulse"></div>
           <img src={`/${monster.image}`} style={{filter: monster.filter}} className="w-56 h-56 object-contain drop-shadow-2xl relative z-10" />
        </div>
        <button 
          onClick={() => setPhase('select')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-4xl font-black py-6 px-16 border-b-8 border-yellow-700 rounded-[2.5rem] shadow-xl active:translate-y-2 active:border-b-0"
        >返回選關區</button>
      </div>
    );
  }

  if (phase === 'defeat') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center relative bg-slate-100 rounded-[3rem] m-8 shadow-inner border-4 border-slate-300">
        <div className="text-9xl mb-12 opacity-80 filter grayscale">☠️</div>
        <h1 className="text-6xl font-black text-slate-600 mb-6 drop-shadow-sm">討伐失敗...</h1>
        <p className="text-3xl text-slate-500 font-bold mb-12">愛心用光了，魔王這招實在太強啦！</p>
        <button 
          onClick={() => setPhase('select')}
          className="bg-slate-700 hover:bg-slate-800 text-white text-3xl font-black py-6 px-16 border-b-8 border-slate-900 rounded-[2.5rem] shadow-xl active:translate-y-2 active:border-b-0"
        >重新集結，再試一次！</button>
      </div>
    );
  }

  return null;
};

export default GrammarChallenge;
