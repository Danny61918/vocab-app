
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
import CreativeWorkshop from './components/CreativeWorkshop';
import { TutorialGuide } from './components/TutorialGuide';
import PracticeView from './components/PracticeView';
import TopicReviewChallenge from './components/TopicReviewChallenge';
import MistakeBookView from './components/MistakeBookView';
import { getStreak, getUserData } from './services/gamification';
import { getActiveExamReviewSets, getWordsForExamSet, getWordsForDayGroup, ExamReviewSet } from './services/examReviewSets';
import { TOPIC_REVIEW_CHAPTERS } from './services/topicReview';
import { bootCloudSync } from './services/cloudSync';
import { GraduationCap, Settings, PieChart, Book, Clock, Play, Trophy, Calendar, RefreshCw, Sparkles, Map, PenTool, Flame, Coins, HelpCircle, Headphones, ChevronLeft, Target } from 'lucide-react';

const APP_VERSION = '7.1'; // Level 6 Week 19-20 (2026/6/15~6/23) 單字更新 & 關卡進度重置修復

// MENU = 小孩主畫面（練習入口 + 大考快速開始）；PARENT_TOOLS / CUSTOM_TRAINING
// 是家長專區（分析、單字庫管理、錯題本、詳細練習設定），從 MENU 的齒輪圖示進入。
type ViewState = 'MENU' | 'PARENT_TOOLS' | 'CUSTOM_TRAINING' | 'GAME' | 'MANAGER' | 'ANALYTICS' | 'LEADERBOARD' | 'DAILY_CHALLENGE' | 'GRAMMAR_CHALLENGE' | 'ADVENTURE_MAP' | 'PHRASE_CHALLENGE' | 'ACHIEVEMENTS' | 'TUTORIAL' | 'CREATIVE_WORKSHOP' | 'PRACTICE' | 'TOPIC_REVIEW' | 'MISTAKE_BOOK';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('MENU');
  
  // P6: boot cloud sync (anonymous auth + restore empty keys from cloud)
  useEffect(() => {
    bootCloudSync().then(({ merged }) => {
      if (merged) {
        console.log('[App] Cloud data merged — refreshing state');
        // Force re-render so views pick up restored data
        setCurrentView((v) => v);
      }
    });
  }, []);

  // 快取更新邏輯：檢查版本是否變更
  useEffect(() => {
    const savedVersion = localStorage.getItem('app_version');
    if (savedVersion !== APP_VERSION) {
      console.log(`版本更新: ${savedVersion} -> ${APP_VERSION}. 正在清除快取並重啟...`);
      localStorage.setItem('app_version', APP_VERSION);
      // 強制清除舊單字快取，解決 ID 錯亂問題
      localStorage.removeItem('vocab_app_words');
      
      // 歸零單字島大冒險關卡進度與熟練度，但保留金幣與已抽到怪獸紀錄
      localStorage.removeItem('vocab_level_progress');
      localStorage.removeItem('vocab_srs_mastery');
      
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
  
  const [scopeMode, setScopeMode] = useState<'ALL' | 'CUSTOM' | 'EXAM'>('ALL');
  const [uiScope, setUiScope] = useState<'ALL' | 'LAST7' | 'CUSTOM' | 'EXAM'>('ALL');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [dailyWordsCount, setDailyWordsCount] = useState(0);
  const [selectedExamSet, setSelectedExamSet] = useState<ExamReviewSet | null>(null);
  const activeExamSets = getActiveExamReviewSets();
  // Set when a kid taps an exam-banner pill on the home screen (quick-start a
  // specific day's words without going through the full custom-training
  // form). Takes priority over the scope-based getFilteredWords() below;
  // cleared whenever a game starts/ends through any other path.
  const [quickStartWords, setQuickStartWords] = useState<Word[] | null>(null);

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

  const startGame = () => {
    setQuickStartWords(null);
    setCurrentView('GAME');
  };

  const startQuickGame = (words: Word[]) => {
    setQuickStartWords(words);
    setSelectedGameType(GameType.MULTIPLE_CHOICE);
    setSelectedDifficulty(Difficulty.MEDIUM);
    setSelectedMode(GameMode.PRACTICE);
    setCurrentView('GAME');
  };

  const examDaysLeft = (examDate: string): number => {
    const today = new Date(getLocalDateString(new Date()));
    const target = new Date(examDate);
    return Math.ceil((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
  };

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

  const handleExamClick = (set: ExamReviewSet) => {
      setSelectedExamSet(set);
      setScopeMode('EXAM');
      setUiScope('EXAM');
  };

  const getFilteredWords = (): Word[] | undefined => {
      if (scopeMode === 'EXAM') {
          return selectedExamSet ? getWordsForExamSet(selectedExamSet) : undefined;
      }
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
            targetWords={quickStartWords ?? getFilteredWords()}
            onExit={() => { setQuickStartWords(null); setCurrentView('MENU'); }}
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
        return <WordManager onBack={() => setCurrentView('PARENT_TOOLS')} />;
      case 'ANALYTICS':
        return <AnalyticsDashboard onBack={() => setCurrentView('PARENT_TOOLS')} />;
      case 'LEADERBOARD':
        return <Leaderboard onBack={() => setCurrentView('PARENT_TOOLS')} />;
      case 'ACHIEVEMENTS':
        return <AchievementsView onBack={() => setCurrentView('MENU')} />;
      case 'TUTORIAL':
        return <TutorialGuide onBack={() => setCurrentView('MENU')} />;
      case 'CREATIVE_WORKSHOP':
        return <CreativeWorkshop onBack={() => setCurrentView('MENU')} />;
      case 'PRACTICE':
        return <PracticeView onBack={() => setCurrentView('MENU')} />;
      case 'TOPIC_REVIEW':
        return <TopicReviewChallenge onBack={() => setCurrentView('MENU')} />;
      case 'MISTAKE_BOOK':
        return <MistakeBookView onBack={() => setCurrentView('PARENT_TOOLS')} />;
      case 'PARENT_TOOLS': {
        const toolCards: { view: ViewState; icon: React.ReactNode; title: string; desc: string; badge?: string; iconBg: string; iconColor: string }[] = [
          { view: 'CUSTOM_TRAINING', icon: <Settings size={22} />, title: '自訂特訓中心', desc: '設定題型、難度、時間、單字範圍', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
          { view: 'ANALYTICS', icon: <PieChart size={22} />, title: '學習分析', desc: '答對率、弱點趨勢圖表', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
          { view: 'MANAGER', icon: <Book size={22} />, title: '單字庫管理', desc: '新增、編輯單字與例句', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
          { view: 'MISTAKE_BOOK', icon: <GraduationCap size={22} />, title: '錯題本', desc: '依錯誤類型複習考卷錯題', badge: 'NEW', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
          { view: 'LEADERBOARD', icon: <Trophy size={22} />, title: '榮譽榜', desc: '成就徽章與排行榜', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
        ];
        return (
          <div className="max-w-4xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
            <button onClick={() => setCurrentView('MENU')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mb-6">
              <ChevronLeft size={18} /> 返回主畫面
            </button>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-800 mb-2">家長工具</h1>
              <p className="text-slate-500 font-bold">設定練習內容、查看學習狀況</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {toolCards.map((c) => (
                <button
                  key={c.view}
                  onClick={() => setCurrentView(c.view)}
                  className="relative bg-white border-2 border-slate-100 hover:border-slate-300 hover:shadow-md rounded-[1.5rem] p-5 text-left transition-all"
                >
                  {c.badge && (
                    <span className="absolute top-4 right-4 bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-full">{c.badge}</span>
                  )}
                  <div className={`w-11 h-11 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center mb-3`}>
                    {c.icon}
                  </div>
                  <div className="font-black text-slate-800">{c.title}</div>
                  <div className="text-sm text-slate-400 font-bold mt-1">{c.desc}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              📖 課文複習（CLIL）跟其他練習遊戲一樣，放在小孩的主畫面讓他直接寫，不在這裡——這裡是給家長看分析、調整設定用的。
            </p>
          </div>
        );
      }
      case 'CUSTOM_TRAINING':
        return (
          <div className="max-w-4xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
            <button onClick={() => setCurrentView('PARENT_TOOLS')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mb-6">
              <ChevronLeft size={18} /> 返回家長工具
            </button>
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
                      {activeExamSets.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                              {activeExamSets.map((set) => (
                                  <button
                                      key={set.id}
                                      onClick={() => handleExamClick(set)}
                                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                                          uiScope === 'EXAM' && selectedExamSet?.id === set.id
                                              ? 'bg-rose-600 text-white shadow-md'
                                              : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                                      }`}
                                  >
                                      🎯 {set.label}（{set.wordIds.length} 字）
                                  </button>
                              ))}
                          </div>
                      )}
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

                {/* Right Column: Start */}
                <div className="flex flex-col">
                  <button onClick={startGame} className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 hover:scale-[1.02] transition-transform duration-300 group">
                    <div className="p-4 bg-white/20 rounded-full mb-4 group-hover:bg-white/30 transition"><Play size={48} fill="currentColor" /></div>
                    <span className="text-3xl font-black tracking-wide">START GAME</span>
                    <span className="text-blue-100 mt-2">使用左側設定開始測驗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default: {
        const streak = getStreak();
        const userData = getUserData();
        return (
          <div className="max-w-4xl mx-auto p-6 animate-fade-in pb-20">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <GraduationCap size={28} className="text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">Vocabulary Master</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-400 font-bold">英文單字快速複習器</p>
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">v{APP_VERSION}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-amber-100 text-amber-700 px-3 py-2 rounded-xl font-black flex items-center gap-1.5 shadow-sm text-sm">
                    <Coins size={16} />
                    {userData.coins}
                </div>
                {streak.currentStreak > 0 && (
                    <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-xl font-black flex items-center gap-1.5 shadow-sm text-sm">
                        <Flame size={16} className="animate-pulse" />
                        連續 {streak.currentStreak} 天
                    </div>
                )}
                <button
                    onClick={() => setCurrentView('PARENT_TOOLS')}
                    aria-label="家長工具"
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center shadow-sm transition-colors"
                >
                    <Settings size={20} />
                </button>
              </div>
            </div>

            {/* Secondary links */}
            <div className="flex items-center gap-5 mb-8 px-1">
                <button
                    onClick={() => setCurrentView('ACHIEVEMENTS')}
                    className="flex items-center gap-1.5 text-yellow-700 hover:text-yellow-800 font-bold text-sm transition-colors"
                >
                    <Trophy size={16} />
                    榮譽殿堂
                </button>
                <button
                    onClick={() => setCurrentView('TUTORIAL')}
                    className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-bold text-sm transition-colors"
                >
                    <HelpCircle size={16} />
                    怎麼玩？
                </button>
            </div>

            <div className="max-w-5xl mx-auto space-y-6 mb-12">

              {/* Exam quick-start banner(s) — tap a day pill to jump straight into practice for that day's words, no settings needed */}
              {activeExamSets.map((set) => {
                const daysLeft = examDaysLeft(set.examDate);
                return (
                  <div key={set.id} className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2rem] p-6 text-white shadow-xl shadow-rose-200">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-none">
                          <Target size={22} />
                        </div>
                        <div>
                          <div className="font-black text-lg">{set.label}</div>
                          <div className="text-rose-100 text-xs font-bold">共 {set.wordIds.length} 字</div>
                        </div>
                      </div>
                      <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold">
                        {daysLeft >= 0 ? `還有 ${daysLeft} 天` : '已結束，複習中'}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(set.dayGroups ?? []).map((group) => (
                        <button
                          key={group.label}
                          onClick={() => startQuickGame(getWordsForDayGroup(group))}
                          className="bg-white/90 hover:bg-white text-rose-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition flex flex-col items-start"
                        >
                          <span>{group.label}</span>
                          <span className="text-[11px] text-rose-400 font-semibold">{group.wordIds.length} 字</span>
                        </button>
                      ))}
                      {(!set.dayGroups || set.dayGroups.length === 0) && (
                        <button
                          onClick={() => startQuickGame(getWordsForExamSet(set))}
                          className="bg-white/90 hover:bg-white text-rose-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition"
                        >
                          開始複習全部 {set.wordIds.length} 字
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* CLIL topic review — a category, not a one-off (one chip per lesson, grows over time) */}
              <button onClick={() => setCurrentView('TOPIC_REVIEW')} className="relative overflow-hidden w-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.01] active:scale-95 transition-all text-left border-b-8 border-teal-800">
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Book size={100} /></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">📖 課文複習</span>
                    </div>
                    <h3 className="text-2xl font-black mb-2 drop-shadow-md">課文複習（CLIL）</h3>
                    <p className="text-teal-50 text-sm font-bold mb-3">也是大考範圍，每一課的課文都會出現在這裡</p>
                    <div className="flex flex-wrap gap-2">
                        {TOPIC_REVIEW_CHAPTERS.map((c) => (
                            <span key={c.id} className="bg-white/25 px-3 py-1 rounded-full text-xs font-bold">{c.title}</span>
                        ))}
                    </div>
                </div>
              </button>

              {/* Practice game grid */}
              <div>
                <h2 className="font-black text-lg text-slate-700 mb-3 px-1">選一個開始練習</h2>
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

                  <button onClick={() => setCurrentView('DAILY_CHALLENGE')} className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between group border-b-8 border-purple-800">
                      <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Calendar size={100} /></div>
                      <div className="flex-1 text-left relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                              {dailyWordsCount > 0 ? <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">New</span> : <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">Check</span>}
                          </div>
                          <h3 className="text-2xl font-black mb-2 drop-shadow-md">綜合每日挑戰</h3>
                          <p className="text-purple-100 text-sm font-bold">多階段測驗：選擇/拼寫</p>
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

                  <button onClick={() => setCurrentView('PRACTICE')} className="relative overflow-hidden bg-gradient-to-br from-cyan-400 to-sky-600 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between group border-b-8 border-sky-800">
                      <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><Headphones size={100} /></div>
                      <div className="flex-1 text-left relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">🎧 聽力練習</span>
                          </div>
                          <h3 className="text-2xl font-black mb-2 drop-shadow-md">練習</h3>
                      </div>
                  </button>

                  {/* P7: Creative Workshop */}
                  <button onClick={() => setCurrentView('CREATIVE_WORKSHOP')} className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between group border-b-8 border-purple-800">
                      <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4"><PenTool size={100} /></div>
                      <div className="flex-1 text-left relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-inner">🎨 創作</span>
                          </div>
                          <h3 className="text-2xl font-black mb-2 drop-shadow-md">🎨 創作工坊</h3>
                          <p className="text-pink-100 text-sm font-bold">設計你的怪獸 & 寫例句！</p>
                      </div>
                  </button>
                </div>
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
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {renderContent()}
    </div>
  );
}

export default App;
