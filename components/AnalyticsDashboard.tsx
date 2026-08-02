
import React, { useRef, useState } from 'react';
import { getHistory, getWords, getWordStats } from '../services/storage';
import { diagnoseByGameType, dailyStudyMinutes } from '../services/answerLog';
import { getOverdueWords } from '../services/srsStorage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, TrendingUp, AlertOctagon, Star, Users, Clock, Hourglass } from 'lucide-react';

// Hold the title this long to reveal the parent-only diagnosis panel (kept discreet from the child).
const PARENT_HOLD_MS = 1500;

interface Props {
    onBack: () => void;
}

const AnalyticsDashboard: React.FC<Props> = ({ onBack }) => {
    const history = getHistory();
    const wordStats = getWordStats();
    const words = getWords();

    // ── Parent-only diagnosis (revealed by long-pressing the title) ──
    const [parentUnlocked, setParentUnlocked] = useState(false);
    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startHold = () => {
        if (parentUnlocked) return;
        holdTimerRef.current = setTimeout(() => setParentUnlocked(true), PARENT_HOLD_MS);
    };
    const cancelHold = () => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    };

    const diagnosis = diagnoseByGameType();
    const overdueWords = getOverdueWords();
    const studyMinutes = dailyStudyMinutes().slice(-7);

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
                <h2
                    className="text-4xl font-black text-slate-800 flex items-center gap-4 select-none"
                    onPointerDown={startHold}
                    onPointerUp={cancelHold}
                    onPointerLeave={cancelHold}
                    title="家長：長按可開啟診斷"
                >
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
            
            {parentUnlocked && (
                <div className="bg-slate-50 p-8 rounded-[2.5rem] shadow-inner border-4 border-slate-100 mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-slate-700 text-white p-2 rounded-xl"><Users size={22} /></div>
                        <h3 className="font-black text-slate-700 text-xl">家長診斷</h3>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">僅家長可見</span>
                    </div>
                    <p className="text-xs text-slate-400 font-bold mb-8">這些資訊只用於「怎麼幫她」，不會顯示給孩子，也不做評分或排名。</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Error-type diagnosis */}
                        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100">
                            <h4 className="font-black text-slate-600 mb-4 flex items-center gap-2"><AlertOctagon size={18} className="text-amber-500" />錯誤類型分析</h4>
                            {diagnosis.length === 0 ? (
                                <p className="text-slate-300 font-bold text-sm py-6 text-center">還沒有作答紀錄。</p>
                            ) : (
                                <div className="space-y-3">
                                    {diagnosis.map((d) => (
                                        <div key={d.gameType} className={`flex items-center justify-between p-4 rounded-2xl border-2 ${d.weak ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                                            <div>
                                                <div className={`font-black ${d.weak ? 'text-amber-700' : 'text-slate-600'}`}>{d.label}</div>
                                                <div className="text-[11px] text-slate-400 font-bold">{d.errors} / {d.attempts} 題錯</div>
                                            </div>
                                            <div className={`text-xl font-black ${d.weak ? 'text-amber-600' : 'text-slate-400'}`}>{Math.round(d.errorRate * 100)}%</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Overdue words + daily time */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100">
                                <h4 className="font-black text-slate-600 mb-4 flex items-center gap-2"><Hourglass size={18} className="text-rose-500" />該複習的字（{overdueWords.length}）</h4>
                                {overdueWords.length === 0 ? (
                                    <p className="text-slate-300 font-bold text-sm py-4 text-center">目前沒有逾期的字 🎉</p>
                                ) : (
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {overdueWords.slice(0, 8).map((o) => (
                                            <div key={o.word.id} className="flex items-center justify-between px-4 py-2 bg-rose-50 rounded-xl">
                                                <span className="font-black text-slate-700">{o.word.word} <span className="text-xs text-slate-400 font-bold">{o.word.meaning}</span></span>
                                                <span className="text-xs font-black text-rose-500">逾期 {o.daysOverdue} 天</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100">
                                <h4 className="font-black text-slate-600 mb-4 flex items-center gap-2"><Clock size={18} className="text-blue-500" />每日投入時間（近 7 天）</h4>
                                {studyMinutes.length === 0 ? (
                                    <p className="text-slate-300 font-bold text-sm py-4 text-center">還沒有資料。</p>
                                ) : (
                                    <div className="space-y-2">
                                        {studyMinutes.map((d) => (
                                            <div key={d.date} className="flex items-center gap-3">
                                                <span className="text-[11px] font-black text-slate-400 w-20">{d.date.slice(5)}</span>
                                                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                                                    <div className="bg-blue-400 h-full rounded-full" style={{ width: `${Math.min(100, d.minutes * 8)}%` }} />
                                                </div>
                                                <span className="text-xs font-black text-blue-600 w-14 text-right">{d.minutes} 分</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center text-slate-300 text-sm font-black uppercase tracking-widest mt-10">
                <BookOpen size={20} className="inline mr-2 mb-1 opacity-50"/>
                Keep going! Practice makes perfect.
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
