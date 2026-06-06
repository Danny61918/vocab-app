import React, { useMemo } from 'react';
import { Trophy, Flame, Target, Star, Lock, Award, ArrowLeft } from 'lucide-react';
import { ACHIEVEMENTS, getStreak, getUnlockedAchievements } from '../services/gamification';
import { getHistory } from '../services/storage';

interface Props {
    onBack: () => void;
}

export const AchievementsView: React.FC<Props> = ({ onBack }) => {
    const streak = getStreak();
    const unlockedIds = getUnlockedAchievements();
    const history = getHistory();
    
    const stats = useMemo(() => {
        const totalTests = history.length;
        const totalCorrect = history.reduce((sum, r) => sum + r.correctCount, 0);
        const perfectTests = history.filter(r => r.score === 100).length;
        return { totalTests, totalCorrect, perfectTests };
    }, [history]);

    return (
        <div className="flex flex-col min-h-[80vh] w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm"
                >
                    <ArrowLeft size={20} />
                    <span>返回主畫面</span>
                </button>
                <div className="flex gap-4">
                    <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-sm">
                        <Flame size={20} className={streak.currentStreak > 0 ? "animate-pulse" : ""} />
                        連續 {streak.currentStreak} 天
                    </div>
                </div>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-800 mb-2 drop-shadow-sm flex items-center justify-center gap-3">
                    <Award className="text-yellow-500" size={40} />
                    榮譽殿堂
                </h1>
                <p className="text-slate-500 font-bold">持續學習，解鎖更多專屬成就與徽章！</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                    <div className="text-slate-400 text-sm font-bold mb-1">完成測驗</div>
                    <div className="text-2xl font-black text-blue-600">{stats.totalTests} <span className="text-sm font-bold text-slate-400">次</span></div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                    <div className="text-slate-400 text-sm font-bold mb-1">累積答對</div>
                    <div className="text-2xl font-black text-emerald-600">{stats.totalCorrect} <span className="text-sm font-bold text-slate-400">題</span></div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                    <div className="text-slate-400 text-sm font-bold mb-1">完美滿分</div>
                    <div className="text-2xl font-black text-yellow-500">{stats.perfectTests} <span className="text-sm font-bold text-slate-400">次</span></div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                    <div className="text-slate-400 text-sm font-bold mb-1">最高連續</div>
                    <div className="text-2xl font-black text-orange-500">{streak.bestStreak} <span className="text-sm font-bold text-slate-400">天</span></div>
                </div>
            </div>

            {/* Achievements Grid */}
            <h2 className="text-xl font-black text-slate-700 mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={24} />
                成就徽章 ({unlockedIds.length} / {ACHIEVEMENTS.length})
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ACHIEVEMENTS.map((ach) => {
                    const isUnlocked = unlockedIds.includes(ach.id);
                    
                    return (
                        <div 
                            key={ach.id}
                            className={`relative overflow-hidden rounded-[2rem] p-6 border-2 transition-all ${
                                isUnlocked 
                                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md transform hover:-translate-y-1' 
                                : 'bg-slate-50 border-slate-200 opacity-70 grayscale'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`text-4xl ${isUnlocked ? 'drop-shadow-md' : 'opacity-50'}`}>
                                    {isUnlocked ? ach.icon : <Lock size={36} className="text-slate-400" />}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg font-black mb-1 ${isUnlocked ? 'text-yellow-800' : 'text-slate-600'}`}>
                                        {ach.name}
                                    </h3>
                                    <p className={`text-sm font-bold leading-snug ${isUnlocked ? 'text-yellow-700/80' : 'text-slate-500'}`}>
                                        {ach.description}
                                    </p>
                                </div>
                            </div>
                            
                            {isUnlocked && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-black px-3 py-1 rounded-bl-xl shadow-sm">
                                    已解鎖
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AchievementsView;
