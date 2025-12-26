
import React, { useState, useEffect } from 'react';
import { Word, GameType, GameMode, Difficulty, TestResult } from '../types';
import { getWords, saveResult } from '../services/storage';
import QuizArea from './QuizArea';
import { Calendar, CheckCircle, Star, ArrowRight, BarChart2, ChevronDown, RefreshCw, AlertCircle, BookOpen, TrendingUp, CalendarDays } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const STAGES = [
    { type: GameType.MULTIPLE_CHOICE, difficulty: Difficulty.MEDIUM, title: '第一關：單字記憶 (中級)' },
    { type: GameType.MATCHING, difficulty: Difficulty.MEDIUM, title: '第二關：單字配對 (中級)' },
    { type: GameType.CLOZE, difficulty: Difficulty.HARD, title: '第三關：終極克漏字 (高級)' },
];

type ChallengeMode = 'REVIEW' | 'PREVIEW';

const DailyChallenge: React.FC<Props> = ({ onBack }) => {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [challengeMode, setChallengeMode] = useState<ChallengeMode>('REVIEW');
    const [actualTargetDate, setActualTargetDate] = useState<string>('');
    const [targetWords, setTargetWords] = useState<Word[]>([]);
    const [currentStage, setCurrentStage] = useState(0);
    const [results, setResults] = useState<TestResult[]>([]);
    const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');

    useEffect(() => {
        const all = getWords();
        const dates = Array.from(new Set(all.map(w => w.date).filter((d): d is string => !!d)));
        dates.sort((a, b) => b.localeCompare(a));
        setAvailableDates(dates);
        
        if (dates.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(dates.includes(today) ? today : dates[0]);
        }
    }, []);

    useEffect(() => {
        if (!selectedDate || availableDates.length === 0) return;

        const all = getWords();
        let target = selectedDate;

        if (challengeMode === 'PREVIEW') {
            const sortedAsc = [...availableDates].sort((a, b) => a.localeCompare(b));
            const currentIndex = sortedAsc.indexOf(selectedDate);
            
            if (currentIndex !== -1 && currentIndex < sortedAsc.length - 1) {
                target = sortedAsc[currentIndex + 1];
            } else {
                target = selectedDate;
            }
        }

        setActualTargetDate(target);
        setTargetWords(all.filter(w => w.date === target));
    }, [selectedDate, challengeMode, availableDates]);

    const handleStageComplete = (result: TestResult) => {
        setResults(prev => [...prev, result]);
        saveResult(result);
        if (currentStage < STAGES.length - 1) {
            setCurrentStage(prev => prev + 1);
        } else {
            setGameState('SUMMARY');
        }
    };

    if (gameState === 'INTRO') {
        return (
            <div className="max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-2xl animate-fade-in mt-10 pb-20 border-8 border-slate-50">
                <div className="text-center mb-10">
                    <div className="inline-block p-6 bg-purple-100 rounded-[2rem] mb-6 shadow-lg shadow-purple-100">
                        <CalendarDays size={48} className="text-purple-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">每日挑戰</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Daily Learning Mission</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner mb-8">
                    <div className="mb-8">
                        <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest ml-1">選擇挑戰日期</label>
                        <div className="relative">
                            <select 
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full appearance-none bg-white border-4 border-white text-slate-700 py-4 px-6 pr-12 rounded-2xl font-black text-xl shadow-xl focus:border-purple-400 outline-none transition-all"
                            >
                                {availableDates.map(date => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-400">
                                <ChevronDown size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => setChallengeMode('REVIEW')}
                            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-4 transition-all ${challengeMode === 'REVIEW' ? 'bg-white border-purple-500 text-purple-600 shadow-2xl scale-105 z-10' : 'bg-slate-100 border-transparent text-slate-400'}`}
                        >
                            <BookOpen size={32} className="mb-2" />
                            <span className="font-black text-lg">複習舊單字</span>
                        </button>

                        <button
                            onClick={() => setChallengeMode('PREVIEW')}
                            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-4 transition-all ${challengeMode === 'PREVIEW' ? 'bg-white border-blue-500 text-blue-600 shadow-2xl scale-105 z-10' : 'bg-slate-100 border-transparent text-slate-400'}`}
                        >
                            <TrendingUp size={32} className="mb-2" />
                            <span className="font-black text-lg">預習新單字</span>
                        </button>
                    </div>

                    <div className={`p-6 rounded-[2rem] border-4 flex items-center gap-4 shadow-xl ${challengeMode === 'PREVIEW' ? 'bg-blue-600 text-white border-blue-400' : 'bg-purple-600 text-white border-purple-400'}`}>
                        <div className="bg-white/20 p-3 rounded-2xl">
                            <AlertCircle size={28} />
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] opacity-70 font-black uppercase tracking-widest">Target Content</div>
                            <div className="text-2xl font-black">{actualTargetDate}</div>
                        </div>
                        <div className="text-right">
                             <div className="text-[10px] opacity-70 font-black uppercase tracking-widest">Words</div>
                             <div className="text-3xl font-black">{targetWords.length}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    {STAGES.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-slate-100 shadow-sm group hover:border-purple-200 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-black text-white text-xl shadow-lg group-hover:bg-purple-600">
                                {idx + 1}
                            </div>
                            <div className="font-black text-slate-700 text-lg">{stage.title}</div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => setGameState('PLAYING')}
                    disabled={targetWords.length === 0}
                    className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4"
                >
                    開始闖關 <ArrowRight size={32} />
                </button>

                <button onClick={onBack} className="w-full mt-8 text-slate-400 font-black hover:text-red-500 transition-colors">
                    返回主選單
                </button>
            </div>
        );
    }

    if (gameState === 'SUMMARY') {
        const totalScore = results.reduce((acc, r) => acc + r.score, 0);
        const totalAttempted = results.reduce((acc, r) => acc + r.totalQuestions, 0);
        const totalCorrect = results.reduce((acc, r) => acc + r.correctCount, 0);
        const totalAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
        
        // 彙整所有錯題
        const allWrongIds = results.flatMap(r => r.wrongIds);
        const uniqueWrongIds = Array.from(new Set(allWrongIds));

        return (
            <div className="max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl animate-fade-in mt-10 border-8 border-slate-50">
                <div className="text-center mb-12">
                    <div className="text-8xl mb-6">🥇</div>
                    <h2 className="text-4xl font-black text-slate-800 mb-2">任務達成！</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">測驗日期：{actualTargetDate}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-purple-600 p-8 rounded-[2.5rem] text-center shadow-xl shadow-purple-100">
                        <div className="text-purple-200 text-xs font-black uppercase mb-2 tracking-widest">總累積得分</div>
                        <div className="text-5xl font-black text-white">{totalScore}</div>
                    </div>
                    <div className={`p-8 rounded-[2.5rem] text-center shadow-xl ${totalAccuracy >= 80 ? 'bg-emerald-500 shadow-emerald-100' : 'bg-orange-500 shadow-orange-100'}`}>
                        <div className="text-white/70 text-xs font-black uppercase mb-2 tracking-widest">總平均正確率</div>
                        <div className="text-5xl font-black text-white">{totalAccuracy}%</div>
                    </div>
                </div>

                {uniqueWrongIds.length > 0 && (
                     <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 shadow-inner">
                        <h3 className="font-black text-slate-800 mb-6 flex items-center gap-3 text-xl">
                            <div className="bg-red-500 text-white p-2 rounded-xl"><BarChart2 size={24} /></div>
                            重點複習清單
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {uniqueWrongIds.map(id => {
                                const w = targetWords.find(x => x.id === id);
                                if (!w) return null;
                                return (
                                    <div key={id} className="p-5 bg-white border-2 border-white rounded-2xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-xl">{w.english}</span>
                                            <span className="text-[10px] font-bold text-slate-300 uppercase">{w.part_of_speech}</span>
                                        </div>
                                        <span className="text-slate-500 font-black text-lg">{w.chinese}</span>
                                    </div>
                                );
                            })}
                        </div>
                     </div>
                )}

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => {
                            setResults([]);
                            setCurrentStage(0);
                            setGameState('PLAYING');
                        }}
                        className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-3xl font-black text-xl shadow-xl transition-all active:scale-95"
                    >
                        重新挑戰
                    </button>
                    <button 
                        onClick={onBack}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 py-6 rounded-3xl font-black text-xl transition-all"
                    >
                        返回主選單
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="bg-white px-8 py-3 rounded-2xl shadow-xl border-4 border-white flex items-center gap-4">
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-black">關卡 {currentStage + 1} / 3</div>
                    <div className="h-6 w-[2px] bg-slate-100"></div>
                    <span className="text-slate-700 font-black text-lg">{STAGES[currentStage].title}</span>
                </div>
                <button onClick={onBack} className="bg-white text-slate-400 font-black px-6 py-3 rounded-2xl border-4 border-white shadow-xl hover:text-red-500 transition-colors">退出</button>
            </div>
            
            <QuizArea 
                key={`${currentStage}-${actualTargetDate}`}
                gameType={STAGES[currentStage].type}
                difficulty={STAGES[currentStage].difficulty}
                gameMode={GameMode.CHALLENGE}
                targetWords={targetWords}
                onExit={onBack}
                onGameComplete={handleStageComplete}
            />
        </div>
    );
};

export default DailyChallenge;
