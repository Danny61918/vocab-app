import React, { useState } from 'react';
import { GameType, GameMode, Difficulty, LeaderboardEntry } from '../types';
import { getLeaderboard } from '../services/storage';
import { Trophy, Medal, Timer, BookOpen, Crown, User, Calendar } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const Leaderboard: React.FC<Props> = ({ onBack }) => {
  const [activeType, setActiveType] = useState<GameType>(GameType.MULTIPLE_CHOICE);
  const [activeMode, setActiveMode] = useState<GameMode>(GameMode.TIMED);
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);

  const rawData = getLeaderboard(activeMode, activeType, activeDifficulty);

  // Client-side sort to guarantee order (High Score > Newest Date)
  const data = [...rawData].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.timestamp - a.timestamp;
  });

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="text-yellow-500" size={20} fill="currentColor" />;
    if (index === 1) return <Medal className="text-slate-400" size={20} />;
    if (index === 2) return <Medal className="text-amber-700" size={20} />;
    return <span className="font-bold text-slate-400 text-sm w-5 text-center">{index + 1}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Trophy className="text-yellow-500" />
          榮譽榜 (Leaderboard)
        </h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
        >
          返回主選單
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 space-y-4">
        <div className="flex gap-4 border-b border-slate-100 pb-4">
            <button 
                onClick={() => setActiveMode(GameMode.TIMED)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${activeMode === GameMode.TIMED ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:bg-slate-50'}`}
            >
                <Timer size={18} /> 計時挑戰
            </button>
            <button 
                onClick={() => setActiveMode(GameMode.PRACTICE)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${activeMode === GameMode.PRACTICE ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}
            >
                <BookOpen size={18} /> 練習模式
            </button>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveType(GameType.MULTIPLE_CHOICE)}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeType === GameType.MULTIPLE_CHOICE ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                    單字記憶
                </button>
                <button
                    onClick={() => setActiveType(GameType.CHINESE_TO_ENGLISH)}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeType === GameType.CHINESE_TO_ENGLISH ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                    中文詞義配對
                </button>
                <button
                    onClick={() => setActiveType(GameType.MATCHING)}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeType === GameType.MATCHING ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                    英文配對
                </button>
                <button
                    onClick={() => setActiveType(GameType.CLOZE)}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeType === GameType.CLOZE ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                    克漏字
                </button>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
                <span className="text-sm text-slate-400 font-bold">難度:</span>
                <select 
                    value={activeDifficulty} 
                    onChange={(e) => setActiveDifficulty(e.target.value as Difficulty)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold"
                >
                    <option value={Difficulty.EASY}>Easy (初階)</option>
                    <option value={Difficulty.MEDIUM}>Medium (中階)</option>
                    <option value={Difficulty.HARD}>Hard (高階)</option>
                </select>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        {data.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
                <div className="text-6xl mb-4">📉</div>
                <p>目前還沒有這個模式的紀錄</p>
                <p className="text-sm mt-2">快去挑戰並成為第一名吧！</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                    <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                        <tr>
                            <th className="w-1/3 px-6 py-4 font-bold">
                                <div className="flex items-center gap-2">名稱 (Name)</div>
                            </th>
                            <th className="w-1/6 px-6 py-4 font-bold">
                                <div className="flex items-center gap-2">分數 (Score)</div>
                            </th>
                            <th className="w-1/6 px-6 py-4 font-bold">
                                <div className="flex items-center gap-2">答對 (Correct)</div>
                            </th>
                            <th className="w-1/3 px-6 py-4 font-bold">
                                <div className="flex items-center gap-2">日期 (Date)</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((entry, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 flex justify-center shrink-0">
                                            {getRankIcon(idx)}
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-slate-700 overflow-hidden">
                                            <User size={16} className="text-slate-400 shrink-0"/>
                                            <span className="truncate">{entry.playerName || 'Anonymous'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 align-middle">
                                    <div className="text-xl font-bold text-blue-600">{entry.score}</div>
                                </td>
                                <td className="px-6 py-4 align-middle">
                                    <div className="font-medium text-slate-700">
                                        {entry.correctCount} 題
                                    </div>
                                </td>
                                <td className="px-6 py-4 align-middle text-sm text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {entry.date}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;