
import React from 'react';
import { getHistory, getWords, getWordStats } from '../services/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, TrendingUp, AlertOctagon, Star } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const AnalyticsDashboard: React.FC<Props> = ({ onBack }) => {
    const history = getHistory();
    const wordStats = getWordStats();
    const words = getWords();

    const sessionData = history.slice(-10).map((h, i) => ({
        name: `S${i+1}`,
        score: h.score,
        correct: h.correctCount,
        date: new Date(h.timestamp).toLocaleDateString()
    }));

    const totalSessions = history.length;
    const averageScore = totalSessions > 0 
        ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / totalSessions) 
        : 0;

    // 定義「已掌握」：正確率 > 80% 且至少做過 2 次
    const masteredCount = Object.values(wordStats).filter(stat => {
        const accuracy = (stat.attempts - stat.errors) / stat.attempts;
        return stat.attempts >= 2 && accuracy >= 0.8;
    }).length;

    // 常錯單字：按錯誤次數排序
    const weakWords = Object.values(wordStats)
        .sort((a, b) => b.errors - a.errors)
        .slice(0, 5)
        .map(stat => {
            const w = words.find(x => x.id === stat.wordId);
            return {
                ...stat,
                english: w?.english || 'Unknown',
                chinese: w?.chinese || '???'
            };
        })
        .filter(w => w.errors > 0);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in pb-20 mt-10">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black text-slate-800 flex items-center gap-4">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-xl"><TrendingUp size={32} /></div>
                    學習成效分析
                </h2>
                <button 
                    onClick={onBack}
                    className="px-8 py-3 bg-white border-4 border-white text-slate-400 font-black rounded-2xl shadow-xl hover:text-slate-600 transition-all active:scale-95"
                >
                    返回主選單
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-white">
                    <div className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">總練習次數</div>
                    <div className="text-5xl font-black text-slate-800">{totalSessions}</div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-white">
                    <div className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">平均得分</div>
                    <div className="text-5xl font-black text-blue-600">{averageScore}</div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-white">
                    <div className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">已精通單字</div>
                    <div className="text-5xl font-black text-emerald-600">
                        {masteredCount} <span className="text-lg text-slate-300 font-bold">/ {words.length}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-white h-96">
                    <h3 className="font-black text-slate-700 mb-6 flex items-center gap-2 text-xl">近期得分趨勢</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sessionData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={10} fontWeight="bold" />
                            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px' }}
                                itemStyle={{ fontWeight: '900', color: '#3b82f6' }}
                            />
                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={6} dot={{ r: 8, fill: '#3b82f6', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 0 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-white">
                    <h3 className="font-black text-slate-700 mb-6 flex items-center gap-3 text-xl text-red-600">
                        <AlertOctagon size={24} />
                        需要特別複習 (Top 5 錯誤)
                    </h3>
                    {weakWords.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                            <Star size={64} className="mb-4 opacity-20" />
                            <p className="font-black text-lg">目前沒有常錯單字！</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {weakWords.map((w, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 bg-red-50 rounded-2xl border-2 border-red-100 group hover:scale-[1.02] transition-all">
                                    <div>
                                        <div className="font-black text-slate-800 text-xl tracking-tight">{w.english}</div>
                                        <div className="text-sm text-red-400 font-bold">{w.chinese}</div>
                                    </div>
                                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-red-100">
                                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">累計錯誤</div>
                                        <div className="text-2xl font-black text-red-600">{w.errors}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="text-center text-slate-300 text-sm font-black uppercase tracking-widest mt-10">
                <BookOpen size={20} className="inline mr-2 mb-1 opacity-50"/>
                Keep going! Practice makes perfect.
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
