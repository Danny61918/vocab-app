import React, { useState, useEffect, useMemo } from 'react';
import { Word } from '../types';
import { getWords } from '../services/storage';
import { EXTRA_SENTENCES } from '../services/exampleSentencesData';

interface Props {
    onBack: () => void;
}

type Mode = 'CHOICE' | 'BLOCKS';
type Phase = 'SETUP' | 'QUIZ' | 'SUMMARY';

interface Question {
    word: Word;
    sentence: string;
    blankedSentence: string;
    options?: string[]; // For CHOICE
    blocks?: string[]; // For BLOCKS
    correctWords?: string[]; // For BLOCKS
}

export const PhraseChallenge: React.FC<Props> = ({ onBack }) => {
    const [phase, setPhase] = useState<Phase>('SETUP');
    const [weeks, setWeeks] = useState<number>(3);
    const [mode, setMode] = useState<Mode>('CHOICE');
    
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<'NONE' | 'CORRECT' | 'WRONG'>('NONE');

    const allPhrases = useMemo(() => {
        return getWords().filter(w => w.part_of_speech.includes('ph'));
    }, []);

    // Setup function
    const startQuiz = () => {
        const now = new Date();
        const cutoffDate = weeks === 999 ? new Date(0) : new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
        
        const filtered = allPhrases.filter(w => {
            if (!w.date) return weeks === 999;
            return new Date(w.date) >= cutoffDate;
        });

        if (filtered.length === 0) {
            alert("這個時間範圍內沒有找到片語喔！請試著拉長週數。");
            return;
        }

        // Generate questions
        const newQuestions: Question[] = filtered.map(w => {
            // Get sentences
            const sentences = EXTRA_SENTENCES[w.id] || [];
            let sentence = w.example || "";
            if (sentences.length > 0) {
                sentence = sentences[Math.floor(Math.random() * sentences.length)];
            }
            if (!sentence) sentence = "This is an example sentence for " + w.english;

            // Blank out the phrase robustly. 
            // 1. Remove placeholders from the phrase definition
            let coreStr = w.english.replace(/\b(V\.|V-ing|sb\.|sth\.|be|to|the|a|an|on|in|at)\b/gi, ' ');
            coreStr = coreStr.replace(/\(.*?\)/g, ' ');
            coreStr = coreStr.replace(/[\/\-]/g, ' ');
            
            // 2. Extract core words (2+ letters)
            const coreWords = coreStr.match(/\b[a-zA-Z]{2,}\b/g) || [];
            
            let blankedSentence = sentence;
            
            if (coreWords.length > 0) {
                // Replace any word in the sentence that starts with the core word (handles -ing, -ed, -s)
                coreWords.forEach(word => {
                    const regex = new RegExp(`\\b${word}[a-zA-Z]*\\b`, 'gi');
                    blankedSentence = blankedSentence.replace(regex, '_____');
                });
            }

            // Fallback: If nothing was blanked, try exact match
            if (blankedSentence === sentence) {
                const exactMatch = new RegExp(`\\b${w.english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                blankedSentence = sentence.replace(exactMatch, '_________');
                
                // Absolute fallback so the game never breaks
                if (blankedSentence === sentence) {
                    blankedSentence = sentence.replace(/\b[a-zA-Z]{5,}\b/, '_____');
                }
            }

            const q: Question = {
                word: w,
                sentence,
                blankedSentence
            };

            if (mode === 'CHOICE') {
                const others = allPhrases.filter(x => x.id !== w.id && x.english !== w.english);
                // Shuffle others
                const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
                const uniqueDistractors = Array.from(new Set(shuffledOthers.map(x => x.english))).slice(0, 3);
                const options = [w.english, ...uniqueDistractors].sort(() => 0.5 - Math.random());
                q.options = options;
            } else {
                const words = w.english.split(' ');
                const allOtherWords = allPhrases.filter(x => x.id !== w.id && x.english !== w.english).flatMap(x => x.english.split(' '));
                const shuffledOtherWords = [...allOtherWords].sort(() => 0.5 - Math.random());
                // Pick 2-3 distractors
                const distractors = shuffledOtherWords.slice(0, 3);
                const blocks = [...words, ...distractors].sort(() => 0.5 - Math.random());
                q.correctWords = words;
                q.blocks = blocks;
            }

            return q;
        });

        // Shuffle questions
        newQuestions.sort(() => 0.5 - Math.random());
        
        setQuestions(newQuestions.slice(0, 20)); // Limit to max 20 per run
        setCurrentIndex(0);
        setScore(0);
        setSelectedOption(null);
        setSelectedBlocks([]);
        setFeedback('NONE');
        setPhase('QUIZ');
    };

    const handleOptionClick = (opt: string) => {
        if (feedback !== 'NONE') return;
        const currentQ = questions[currentIndex];
        setSelectedOption(opt);
        if (opt === currentQ.word.english) {
            setFeedback('CORRECT');
            setScore(s => s + 1);
        } else {
            setFeedback('WRONG');
        }
        setTimeout(nextQuestion, 1500);
    };

    const handleBlockClick = (block: string, index: number) => {
        if (feedback !== 'NONE') return;
        setSelectedBlocks(prev => [...prev, block]);
    };

    const removeBlockClick = (index: number) => {
        if (feedback !== 'NONE') return;
        setSelectedBlocks(prev => {
            const arr = [...prev];
            arr.splice(index, 1);
            return arr;
        });
    };

    const checkBlocks = () => {
        if (feedback !== 'NONE') return;
        const currentQ = questions[currentIndex];
        const userPhrase = selectedBlocks.join(' ');
        const targetPhrase = currentQ.correctWords?.join(' ');
        
        if (userPhrase === targetPhrase) {
            setFeedback('CORRECT');
            setScore(s => s + 1);
        } else {
            setFeedback('WRONG');
        }
        setTimeout(nextQuestion, 1500);
    };

    const nextQuestion = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(c => c + 1);
            setSelectedOption(null);
            setSelectedBlocks([]);
            setFeedback('NONE');
        } else {
            setPhase('SUMMARY');
        }
    };

    if (phase === 'SETUP') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-4 md:p-8 animate-fade-in">
                <div className="w-full flex justify-between items-center mb-8">
                    <button onClick={onBack} className="text-slate-400 font-black hover:text-red-500">返回主畫面</button>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-black">
                        📝 片語特訓
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl p-8 w-full border border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">自訂片語特訓條件</h2>
                    
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">時間範圍 (Water Level)</label>
                        <div className="flex gap-2">
                            {[1, 3, 5, 999].map(w => (
                                <button 
                                    key={w}
                                    onClick={() => setWeeks(w)}
                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${weeks === w ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                >
                                    {w === 999 ? '全部' : `近 ${w} 週`}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">根據您選擇的週數，系統會自動挑選該時段內加入的片語。</p>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">互動模式 (Interaction)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button 
                                onClick={() => setMode('CHOICE')}
                                className={`p-4 rounded-xl font-bold border-2 text-left transition-all ${mode === 'CHOICE' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                            >
                                <div className="text-lg mb-1">🎯 選擇題模式 (推薦)</div>
                                <div className="text-xs font-normal opacity-80">從 4 個選項中找出正確的片語填入。較簡單，挫折感低。</div>
                            </button>
                            <button 
                                onClick={() => setMode('BLOCKS')}
                                className={`p-4 rounded-xl font-bold border-2 text-left transition-all ${mode === 'BLOCKS' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                            >
                                <div className="text-lg mb-1">🧩 單字拼湊模式</div>
                                <div className="text-xs font-normal opacity-80">將打散的單字方塊依順序點擊拼出片語。加強片語結構記憶。</div>
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={startQuiz}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black text-xl py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform"
                    >
                        開始特訓！
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'QUIZ') {
        const currentQ = questions[currentIndex];
        return (
            <div className="flex flex-col min-h-[80vh] p-4 md:p-8 w-full max-w-4xl mx-auto animate-fade-in select-none">
                <div className="w-full flex justify-between items-center mb-6">
                    <div className="bg-blue-500 text-white font-black text-lg px-4 py-2 rounded-xl shadow-md border-b-4 border-blue-700">
                        進度: {currentIndex + 1} / {questions.length}
                    </div>
                    <button onClick={onBack} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl border-b-4 border-slate-400 active:translate-y-1 active:border-b-0 transition-all">
                        中斷離開
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 border border-slate-100 mb-8 relative overflow-hidden">
                    {/* Background effect for feedback */}
                    <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${feedback === 'CORRECT' ? 'bg-emerald-100 opacity-50' : feedback === 'WRONG' ? 'bg-red-100 opacity-50' : 'opacity-0'}`}></div>
                    
                    <div className="relative z-10 text-center">
                        <div className="text-slate-400 font-black uppercase tracking-widest text-sm mb-4">中文提示</div>
                        <div className="text-3xl font-black text-emerald-600 mb-8">{currentQ.word.chinese}</div>
                        
                        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 text-left mb-8 shadow-inner">
                            <p className="text-2xl md:text-3xl text-slate-700 font-bold leading-relaxed">
                                {feedback !== 'NONE' ? currentQ.sentence : currentQ.blankedSentence}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interaction Area */}
                {mode === 'CHOICE' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.options?.map((opt, i) => {
                            let btnClass = "bg-white text-slate-700 hover:bg-slate-50 border-slate-200";
                            if (feedback !== 'NONE') {
                                if (opt === currentQ.word.english) {
                                    btnClass = "bg-emerald-500 text-white border-emerald-600";
                                } else if (opt === selectedOption) {
                                    btnClass = "bg-red-500 text-white border-red-600";
                                }
                            }

                            return (
                                <button 
                                    key={i}
                                    onClick={() => handleOptionClick(opt)}
                                    disabled={feedback !== 'NONE'}
                                    className={`p-6 rounded-2xl font-black text-xl md:text-2xl border-b-4 shadow-sm active:translate-y-1 active:border-b-0 transition-all ${btnClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Selected Blocks Area */}
                        <div className="min-h-[4rem] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 p-4 flex flex-wrap gap-2 items-center justify-center">
                            {selectedBlocks.length === 0 && <span className="text-slate-400 font-bold">點擊下方單字組成片語...</span>}
                            {selectedBlocks.map((block, i) => {
                                let blockClass = "bg-blue-500 text-white";
                                if (feedback === 'CORRECT') blockClass = "bg-emerald-500 text-white";
                                if (feedback === 'WRONG') blockClass = "bg-red-500 text-white";

                                return (
                                    <button 
                                        key={`sel-${i}`}
                                        onClick={() => removeBlockClick(i)}
                                        disabled={feedback !== 'NONE'}
                                        className={`${blockClass} font-black text-xl px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95`}
                                    >
                                        {block}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Available Blocks */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {currentQ.blocks?.map((block, i) => {
                                const isUsed = selectedBlocks.filter(b => b === block).length >= currentQ.blocks!.filter(b => b === block).length; // Handle duplicate words
                                // Actually, simpler logic: We only use a block once. Wait, we need to track indices if words are duplicate.
                                // Let's just track counts.
                                const usedCount = selectedBlocks.filter(b => b === block).length;
                                const totalCount = currentQ.blocks!.filter(b => b === block).length;
                                const disabled = usedCount >= totalCount || feedback !== 'NONE';

                                return (
                                    <button 
                                        key={`avail-${i}`}
                                        onClick={() => handleBlockClick(block, i)}
                                        disabled={disabled}
                                        className={`${disabled ? 'bg-slate-200 text-slate-400 border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300 hover:border-blue-400'} border-b-4 font-black text-xl px-5 py-3 rounded-xl shadow-sm transition-all active:translate-y-1 active:border-b-0`}
                                    >
                                        {block}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-center mt-4">
                            <button 
                                onClick={checkBlocks}
                                disabled={selectedBlocks.length === 0 || feedback !== 'NONE'}
                                className="bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 text-white font-black px-8 py-4 rounded-2xl shadow-lg border-b-4 border-slate-900 disabled:border-slate-400 active:translate-y-1 active:border-b-0 transition-all text-xl"
                            >
                                檢查答案
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (phase === 'SUMMARY') {
        const pass = score >= questions.length * 0.8;
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-4 md:p-8 animate-fade-in">
                <div className="bg-white rounded-[3rem] shadow-2xl p-10 text-center border border-slate-100 w-full relative overflow-hidden">
                    <div className="text-8xl mb-6 animate-bounce">
                        {pass ? '🎉' : '💪'}
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        {pass ? '特訓完成！太厲害了！' : '再接再厲！'}
                    </h2>
                    <p className="text-xl text-slate-500 font-bold mb-8">
                        總共答對 {score} 題 / 共 {questions.length} 題
                    </p>

                    <button 
                        onClick={onBack}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-black text-2xl px-10 py-5 rounded-2xl shadow-xl active:scale-95 transition-transform"
                    >
                        回主畫面
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default PhraseChallenge;
