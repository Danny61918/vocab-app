
import React, { useState, useEffect } from 'react';
import { GameType, GameMode, Difficulty, Word } from './types';
import { getWords } from './services/storage';
import QuizArea from './components/QuizArea';
import WordManager from './components/WordManager';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Leaderboard from './components/Leaderboard';
import DailyChallenge from './components/DailyChallenge';
import { GraduationCap, Settings, PieChart, Book, Clock, Play, Trophy, Calendar, Filter, CalendarRange, Hourglass, RefreshCw } from 'lucide-react';

const APP_VERSION = '6.3'; // 目前應用程式版本

type ViewState = 'MENU' | 'GAME' | 'MANAGER' | 'ANALYTICS' | 'LEADERBOARD' | 'DAILY_CHALLENGE';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('MENU');
  
  // 快取更新邏輯：檢查版本是否變更
  useEffect(() => {
    const savedVersion = localStorage.getItem('app_version');
    if (savedVersion !== APP_VERSION) {
      console.log(`版本更新: ${savedVersion} -> ${APP_VERSION}. 正在清除快取並重啟...`);
      localStorage.setItem('app_version', APP_VERSION);
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

  useEffect(() => {
    const all = getWords();
    const today = new Date().toISOString().split('T')[0];
    const count = all.filter(w => w.date === today).length;
    setDailyWordsCount(count);
  }, [currentView]);

  const startGame = () => setCurrentView('GAME');

  const handleLast7Days = () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      setDateEnd(end.toISOString().split('T')[0]);
      setDateStart(start.toISOString().split('T')[0]);
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
      case 'DAILY_CHALLENGE':
        return <DailyChallenge onBack={() => setCurrentView('MENU')} />;
      case 'MANAGER':
        return <WordManager onBack={() => setCurrentView('MENU')} />;
      case 'ANALYTICS':
        return <AnalyticsDashboard onBack={() => setCurrentView('MENU')} />;
      case 'LEADERBOARD':
        return <Leaderboard onBack={() => setCurrentView('MENU')} />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 animate-fade-in pb-20">
            <div className="text-center mb-10 pt-10">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <GraduationCap size={48} className="text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-2">
                Vocabulary Master
              </h1>
              <div className="flex items-center justify-center gap-3">
                  <p className="text-lg text-slate-500">英文單字快速複習器</p>
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">v{APP_VERSION}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">練習模式 (Game Type)</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => setSelectedGameType(GameType.MULTIPLE_CHOICE)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.MULTIPLE_CHOICE ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                      <div className="font-bold">單字記憶 (Multiple Choice)</div>
                      <div className={`text-xs ${selectedGameType === GameType.MULTIPLE_CHOICE ? 'text-blue-200' : 'text-slate-400'}`}>看中文選英文</div>
                    </button>
                    <button onClick={() => setSelectedGameType(GameType.CHINESE_TO_ENGLISH)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.CHINESE_TO_ENGLISH ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                      <div className="font-bold">中文詞義配對 (Chinese Meaning Match)</div>
                      <div className={`text-xs ${selectedGameType === GameType.CHINESE_TO_ENGLISH ? 'text-blue-200' : 'text-slate-400'}`}>看中文(含注音)選英文</div>
                    </button>
                    <button onClick={() => setSelectedGameType(GameType.MATCHING)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.MATCHING ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                      <div className="font-bold">英文單字配對 (English Match)</div>
                       <div className={`text-xs ${selectedGameType === GameType.MATCHING ? 'text-blue-200' : 'text-slate-400'}`}>看英文選中文與詞性</div>
                    </button>
                     <button onClick={() => setSelectedGameType(GameType.CLOZE)} className={`p-3 rounded-lg text-left transition ${selectedGameType === GameType.CLOZE ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                      <div className="font-bold">單字克漏字 (Cloze)</div>
                       <div className={`text-xs ${selectedGameType === GameType.CLOZE ? 'text-blue-200' : 'text-slate-400'}`}>拼寫填空練習</div>
                    </button>
                  </div>
                </div>

                {(selectedGameType === GameType.MULTIPLE_CHOICE || selectedGameType === GameType.CLOZE || selectedGameType === GameType.CHINESE_TO_ENGLISH) && (
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
                        <button onClick={handleAllClick} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${uiScope === 'ALL' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>全部單字</button>
                        <button onClick={handleLast7Days} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${uiScope === 'LAST7' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>最近 7 天</button>
                        <button onClick={handleCustomClick} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition ${uiScope === 'CUSTOM' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>自訂日期</button>
                    </div>
                    {scopeMode === 'CUSTOM' && (
                        <div className="bg-slate-50 p-3 rounded-lg space-y-3 animate-fade-in border border-slate-200">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 block mb-1 font-bold">開始</span>
                                    <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-blue-500 transition font-bold" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 block mb-1 font-bold">結束</span>
                                    <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-blue-500 transition font-bold" />
                                </div>
                            </div>
                        </div>
                    )}
                  </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => setCurrentView('DAILY_CHALLENGE')} className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-between group">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Calendar size={100} /></div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {dailyWordsCount > 0 ? <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">New</span> : <span className="bg-slate-900/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Check</span>}
                            <span className="font-bold">每日挑戰</span>
                        </div>
                        <h3 className="text-2xl font-black">{dailyWordsCount > 0 ? `今日任務: ${dailyWordsCount} 個單字` : '選擇挑戰日期'}</h3>
                        <p className="text-purple-100 text-sm mt-1">三階段闖關：記憶 · 配對 · 克漏字</p>
                    </div>
                    <div className="bg-white text-purple-600 p-3 rounded-full shadow-lg group-hover:bg-purple-50 transition"><Play size={24} fill="currentColor" /></div>
                </button>

                <button onClick={startGame} className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="p-4 bg-white/20 rounded-full mb-4 group-hover:bg-white/30 transition"><Play size={48} fill="currentColor" /></div>
                  <span className="text-3xl font-black tracking-wide">START GAME</span>
                  <span className="text-blue-100 mt-2">開始自訂測驗</span>
                </button>

                <div className="grid grid-cols-2 gap-4 h-32">
                  <button onClick={() => setCurrentView('ANALYTICS')} className="bg-white rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition">
                    <PieChart size={24} className="mb-2" /><span className="font-bold">學習分析</span>
                  </button>
                  <button onClick={() => setCurrentView('MANAGER')} className="bg-white rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition">
                    <Settings size={24} className="mb-2" /><span className="font-bold">管理單字</span>
                  </button>
                </div>
                
                <button onClick={() => setCurrentView('LEADERBOARD')} className="h-16 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center gap-3 text-slate-600 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200 transition">
                    <Trophy size={24} className="text-yellow-500" /><span className="font-bold text-lg">榮譽榜</span>
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
