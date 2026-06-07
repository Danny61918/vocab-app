
import React, { useState, useEffect } from 'react';
import { GameType, GameMode, Difficulty, Word } from './types';
import { getWords } from './services/storage';
import QuizArea from './components/QuizArea';
import WordManager from './components/WordManager';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Leaderboard from './components/Leaderboard';
import DailyChallenge from './components/DailyChallenge';
import GrammarChallenge from './components/GrammarChallenge';
import { VocabAdventureMap } from './components/VocabAdventureMap';
import PhraseChallenge from './components/PhraseChallenge';
import AchievementsView from './components/AchievementsView';
import { TutorialGuide } from './components/TutorialGuide';
import { getStreak, getUserData } from './services/gamification';
import { GraduationCap, Settings, PieChart, Book, Clock, Play, Trophy, Calendar, RefreshCw, Sparkles, Map, PenTool, Flame, Coins, HelpCircle } from 'lucide-react';

const APP_VERSION = '6.8'; // 目前應用程式版本

type ViewState = 'MENU' | 'GAME' | 'MANAGER' | 'ANALYTICS' | 'LEADERBOARD' | 'DAILY_CHALLENGE' | 'GRAMMAR_CHALLENGE' | 'ADVENTURE_MAP' | 'PHRASE_CHALLENGE' | 'ACHIEVEMENTS' | 'TUTORIAL';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('MENU');
  
  // 快取更新邏輯：檢查版本是否變更
  useEffect(() => {
    const savedVersion = localStorage.getItem('app_version');
    if (savedVersion !== APP_VERSION) {
      console.log(`版本更新: ${savedVersion} -> ${APP_VERSION}. 正在清除快取並重啟...`);
      localStorage.setItem('app_version', APP_VERSION);
      // 強制清除舊單字快取，解決 ID 錯亂問題
      localStorage.removeItem('vocab_app_words');
      
      // 如果不是第一次運行且版本不同，則強制重新整理
      if (savedVersion) {
        window.location.reload();
      }
    }
  }, []);

  // Game Configuration State
  const [selectedGameType, setSelectedGameType] = useState<GameType>(GameType.MULTIPLE_CHOICE);
  const [selectedMode, setSelectedMode] = useState<GameMode>(GameMode.PRACTICE);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(60);
  
  const [scopeMode, setScopeMode] = useState<'ALL' | 'CUSTOM'>('ALL');
  const [uiScope, setUiScope] = useState<'ALL' | 'LAST7' | 'CUSTOM'>('ALL');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [dailyWordsCount, setDailyWordsCount] = useState(0);

  const getLocalDateString = (d: Date): string => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const all = getWords();
    const today = getLocalDateString(new Date());
    const count = all.filter(w => w.date === today).length;
    setDailyWordsCount(count);
  }, [currentView]);

  const startGame = () => setCurrentView('GAME');

  const handleLast7Days = () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      setDateEnd(getLocalDateString(end));
      setDateStart(getLocalDateString(start));
      setScopeMode('CUSTOM');
      setUiScope('LAST7');
  };

  const handleCustomClick = () => {
      setScopeMode('CUSTOM');
      setUiScope('CUSTOM');
  };

  const handleAllClick = () => {
      setScopeMode('ALL');
      setUiScope('ALL');
  };

  const getFilteredWords = (): Word[] | undefined => {
      if (scopeMode === 'ALL') return undefined;
      if (!dateStart && !dateEnd) return undefined;
      const all = getWords();
      return all.filter(w => {
          if (!w.date) return false;
          if (dateStart && w.date < dateStart) return false;
          if (dateEnd && w.date > dateEnd) return false;
          return true;
      });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'GAME':
        return (
          <QuizArea 
            gameType={selectedGameType} 
            gameMode={selectedMode} 
            difficulty={selectedDifficulty} 
            timeLimit={selectedTimeLimit}
            targetWords={getFilteredWords()}
            onExit={() => setCurrentView('MENU')} 
          />
        );
      case 'ADVENTURE_MAP':
        return <VocabAdventureMap onBack={() => setCurrentView('MENU')} />;
      case 'GRAMMAR_CHALLENGE':
        return <GrammarChallenge onExit={() => setCurrentView('MENU')} />;
      case 'PHRASE_CHALLENGE':
        return <PhraseChallenge onBack={() => setCurrentView('MENU')} />;
      case 'DAILY_CHALLENGE':
        return <DailyChallenge onBack={() => setCurrentView('MENU')} />;
      case 'MANAGER':
        return <WordManager onBack={() => setCurrentView('MENU')} />;
      case 'ANALYTICS':
        return <AnalyticsDashboard onBack={() => setCurrentView('MENU')} />;
      case 'LEADERBOARD':
        return <Leaderboard onBack={() => setCurrentView('MENU')} />;
      case 'ACHIEVEMENTS':
        return <AchievementsView onBack={() => setCurrentView('MENU')} />;
      case 'TUTORIAL':
        return <TutorialGuide onBack={() => setCurrentView('MENU')} />;
      default:
        const streak = getStreak();
        const userData = getUserData();
        return (
          <div className="max-w-4xl mx-auto p-6 animate-fade-in pb-20">
            <div className="text-center mb-10 pt-10">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <GraduationCap size={48} className="text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-2">
                Vocabulary Master
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                  <p className="text-lg text-slate-500">英文單字快速複習器</p>
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">v{APP_VERSION}</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-sm">
                      <Coins size={20} />
                      {userData.coins} 金幣
                  </div>
                  {streak.currentStreak > 0 && (
                      <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-sm">
                          <Flame size={20} className="animate-pulse" />
                          連續 {streak.currentStreak} 天
                      </div>
                  )}
                  <button 
                      onClick={() => setCurrentView('ACHIEVEMENTS')}
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-sm transition-colors"
                  >
                      <Trophy size={20} />
                      榮譽殿堂
                  </button>
                  <button 
                      onClick={() => setCurrentView('TUTORIAL')}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-sm transition-colors"
                  >
                      <HelpCircle size={20} />
                      怎麼玩？
                  </button>
              </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-8 mb-12">
              
              {/* Row 1: The two main game modes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => setCurrentView('ADVENTURE_MAP')} className="relative overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-600 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between group border-b-8 border-teal-800">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Map size={100} /></div>
                    <div className="flex-1 text-left relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">⭐ 單字練習</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2 drop-shadow-md">🏝️ 單字島大冒險</h3>
                    </div>
                </button>

                <button onClick={() => setCurrentView('GRAMMAR_CHALLENGE')} className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between group border-b-8 border-orange-700">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Sparkles size={100} /></div>
                    <div className="flex-1 text-left relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">⚡ 文法特訓</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2 drop-shadow-md">文法大挑戰</h3>
                    </div>
                </button>

                <button onClick={() => setCurrentView('PHRASE_CHALLENGE')} className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between group border-b-8 border-indigo-800">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><PenTool size={100} /></div>
                    <div className="flex-1 text-left relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">📝 填空測驗</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2 drop-shadow-md">片語特訓中心</h3>
                    </div>
                </button>
              </div>

              {/* Row 2: Custom Training Mode */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 to-slate-300"></div>
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-xl text-slate-500">
                      <Settings size={28} />
                  </div>
                  自訂特訓中心 
                  <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest hidden md:inline-block ml-2">Custom Training</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Form Settings */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">練習模式 (Game Type)</label>
                      <div className="grid grid-cols-1 gap-2">
                        <button onClick={() => setSelectedGameType(GameType.MULTIPLE_CHOICE)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.MULTIPLE_CHOICE ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                          <div className="font-bold">單字記憶 (Multiple Choice)</div>
                        </button>
                        <button onClick={() => setSelectedGameType(GameType.CHINESE_TO_ENGLISH)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.CHINESE_TO_ENGLISH ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                          <div className="font-bold">中文詞義配對 (Chinese Meaning Match)</div>
                        </button>
                        <button onClick={() => setSelectedGameType(GameType.MATCHING)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.MATCHING ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                          <div className="font-bold">英文單字配對 (English Match)</div>
                        </button>
                         <button onClick={() => setSelectedGameType(GameType.CLOZE)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.CLOZE ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                          <div className="font-bold">單字克漏字 (Cloze)</div>
                        </button>
                        <button onClick={() => setSelectedGameType(GameType.SENTENCE_CLOZE)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.SENTENCE_CLOZE ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                          <div className="font-bold">例句填空 (Sentence Cloze)</div>
                        </button>
                      </div>
                    </div>

                    {(selectedGameType === GameType.MULTIPLE_CHOICE || selectedGameType === GameType.CLOZE || selectedGameType === GameType.CHINESE_TO_ENGLISH || selectedGameType === GameType.MATCHING) && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">難度 (Difficulty)</label>
                        <div className="flex gap-2">
                          {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map(d => (
                            <button key={d} onClick={() => setSelectedDifficulty(d)} className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition ${selectedDifficulty === d ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                              {d.toLowerCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                     <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-700">挑戰類型 (Mode)</label>
                        <div className="flex gap-4">
                          <button onClick={() => setSelectedMode(GameMode.PRACTICE)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition font-bold ${selectedMode === GameMode.PRACTICE ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
                             <Book size={18} /> 練習模式
                          </button>
                           <button onClick={() => setSelectedMode(GameMode.TIMED)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition font-bold ${selectedMode === GameMode.TIMED ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
                             <Clock size={18} /> 計時挑戰
                          </button>
                        </div>

                        {selectedMode === GameMode.TIMED && (
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 animate-fade-in">
                                <label className="block text-xs font-black text-orange-400 uppercase tracking-widest mb-3">挑戰時間 (Minutes)</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 5].map(m => (
                                        <button key={m} onClick={() => setSelectedTimeLimit(m * 60)} className={`py-2 rounded-lg font-black transition-all ${selectedTimeLimit === (m * 60) ? 'bg-orange-500 text-white shadow-md scale-105' : 'bg-white text-orange-400 hover:bg-orange-100'}`}>
                                            {m}m
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-2">單字範圍 (Word Scope)</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <button onClick={handleAllClick} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${uiScope === 'ALL' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>全部</button>
                            <button onClick={handleLast7Days} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${uiScope === 'LAST7' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>近 7 天</button>
                            <button onClick={handleCustomClick} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${uiScope === 'CUSTOM' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>自訂</button>
                        </div>
                        {scopeMode === 'CUSTOM' && (
                            <div className="bg-slate-50 p-3 rounded-lg flex gap-2 animate-fade-in border border-slate-200">
                                <div className="flex-1">
                                    <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-blue-500 transition font-bold" />
                                </div>
                                <div className="flex-1">
                                    <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-blue-500 transition font-bold" />
                                </div>
                            </div>
                        )}
                      </div>
                  </div>

                  {/* Right Column: Original Challenge & Custom Start */}
                  <div className="flex flex-col gap-4">
                    <button onClick={() => setCurrentView('DAILY_CHALLENGE')} className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-between group">
                        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Calendar size={80} /></div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                {dailyWordsCount > 0 ? <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">New</span> : <span className="bg-slate-900/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Check</span>}
                                <span className="font-bold">綜合每日挑戰</span>
                            </div>
                            <p className="text-purple-100 text-sm mt-1">多階段測驗：選擇/拼寫</p>
                        </div>
                        <div className="bg-white text-purple-600 p-3 rounded-full shadow-lg group-hover:bg-purple-50 transition"><Play size={24} fill="currentColor" /></div>
                    </button>

                    <button onClick={startGame} className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 hover:scale-[1.02] transition-transform duration-300 group">
                      <div className="p-4 bg-white/20 rounded-full mb-4 group-hover:bg-white/30 transition"><Play size={48} fill="currentColor" /></div>
                      <span className="text-3xl font-black tracking-wide">START GAME</span>
                      <span className="text-blue-100 mt-2">使用左側設定開始測驗</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Row 3: Utility Tools */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setCurrentView('ANALYTICS')} className="bg-white h-24 rounded-[1.5rem] shadow-md border border-slate-100 flex flex-col items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition">
                  <PieChart size={24} className="mb-2" /><span className="font-bold">學習分析</span>
                </button>
                <button onClick={() => setCurrentView('MANAGER')} className="bg-white h-24 rounded-[1.5rem] shadow-md border border-slate-100 flex flex-col items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition">
                  <Book size={24} className="mb-2" /><span className="font-bold">單字庫管理</span>
                </button>
                <button onClick={() => setCurrentView('LEADERBOARD')} className="bg-white h-24 rounded-[1.5rem] shadow-md border border-slate-100 flex flex-col items-center justify-center text-slate-600 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200 transition">
                  <Trophy size={24} className="text-yellow-500 mb-2" /><span className="font-bold">榮譽榜</span>
                </button>
              </div>

            </div>
            
            <div className="text-center mt-20">
               <button onClick={() => window.location.reload()} className="flex items-center gap-2 mx-auto text-slate-300 hover:text-blue-400 transition text-xs font-bold uppercase tracking-widest">
                  <RefreshCw size={12} /> 強制重新整理快取
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {renderContent()}
    </div>
  );
}

export default App;
