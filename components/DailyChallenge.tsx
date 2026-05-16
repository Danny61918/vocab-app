import React, { useState, useEffect } from 'react';
import { Word, TestResult, GameMode, GameType, Difficulty } from '../types';
import { getWords, saveResult } from '../services/storage';
import { CalendarDays, ChevronDown, BookOpen, TrendingUp, AlertCircle, ArrowRight, XCircle, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MONSTER_DATA } from '../services/monsterData';
import { EXTRA_SENTENCES } from '../services/exampleSentencesData';

interface Props {
  onBack: () => void;
}

type ChallengeMode = 'REVIEW' | 'PREVIEW';
type Phase = 'INTRO' | 'LEARN' | 'QUIZ' | 'ROUND_END' | 'SUMMARY';

export const DailyChallenge: React.FC<Props> = ({ onBack }) => {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [challengeMode, setChallengeMode] = useState<ChallengeMode>('REVIEW');
    const [actualTargetDate, setActualTargetDate] = useState<string>('');
    const [targetWords, setTargetWords] = useState<Word[]>([]);
    
    const [phase, setPhase] = useState<Phase>('INTRO');
    const [chunkSize] = useState(5);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    
    // Learn Phase
    const [learnIndex, setLearnIndex] = useState(0);
    const [currentMonster, setCurrentMonster] = useState<any>(null);

    // Quiz Phase
    const [quizMode, setQuizMode] = useState<'RECOGNIZE' | 'SPELL' | 'SENTENCE'>('RECOGNIZE');
    const [quizQueue, setQuizQueue] = useState<Word[]>([]);
    const [currentQuizWord, setCurrentQuizWord] = useState<Word | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [spellInput, setSpellInput] = useState('');
    const [sentenceMask, setSentenceMask] = useState('');
    const [combo, setCombo] = useState(0);
    const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [monsterHp, setMonsterHp] = useState(100);
    const [mistakesCount, setMistakesCount] = useState(0);

    // Results
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongIds, setWrongIds] = useState<number[]>([]);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const getRandomMonster = () => {
        const monsters = Object.values(MONSTER_DATA).filter(m => !m.isLegendary);
        return monsters[Math.floor(Math.random() * monsters.length)];
    };

    const getCoreWordForMasking = (englishStr: string): string => {
        let cleaned = englishStr.replace(/\(.*?\)/g, '').trim();
        cleaned = cleaned.split(/[\/-]/)[0].trim();
        return cleaned;
    };

    useEffect(() => {
        const all = getWords();
        const dates = Array.from(new Set(all.map(w => w.date).filter((d): d is string => !!d)));
        dates.sort((a, b) => b.localeCompare(a));
        setAvailableDates(dates);
        
        if (dates.length > 0) {
            const localDate = new Date();
            const dayOfWeek = localDate.getDay();
            
            const targetDate = new Date(localDate);
            if (dayOfWeek === 0) {
                // Sunday -> Next Monday
                targetDate.setDate(targetDate.getDate() + 1);
            } else if (dayOfWeek === 6) {
                // Saturday -> Next Monday
                targetDate.setDate(targetDate.getDate() + 2);
            } else {
                // Weekday -> Next Day
                targetDate.setDate(targetDate.getDate() + 1);
            }

            const targetStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
            
            let nearestDate = dates[0];
            let minDiff = Infinity;
            
            const targetTime = new Date(targetStr.replace(/-/g, '/')).getTime();
            for (const d of dates) {
                const dTime = new Date(d.replace(/-/g, '/')).getTime();
                const diff = Math.abs(dTime - targetTime);
                if (diff < minDiff) {
                    minDiff = diff;
                    nearestDate = d;
                }
            }
            setSelectedDate(nearestDate);
        }
        setCurrentMonster(getRandomMonster());
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
            }
        }
        setActualTargetDate(target);
        setTargetWords(all.filter(w => w.date === target));
    }, [selectedDate, challengeMode, availableDates]);

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const chunks = [];
    for (let i = 0; i < targetWords.length; i += chunkSize) {
        chunks.push(targetWords.slice(i, i + chunkSize));
    }
    const currentChunk = chunks[currentChunkIndex] || [];

    const startChallenge = () => {
        setCurrentChunkIndex(0);
        setCorrectCount(0);
        setWrongIds([]);
        setTotalQuestions(0);
        startLearnPhase(0);
    };

    const startLearnPhase = (chunkIdx: number) => {
        setPhase('LEARN');
        setLearnIndex(0);
        setCurrentChunkIndex(chunkIdx);
        setCurrentMonster(getRandomMonster());
        if (chunks[chunkIdx] && chunks[chunkIdx].length > 0) {
            speak(chunks[chunkIdx][0].english);
        }
    };

    const nextLearnCard = () => {
        if (learnIndex + 1 < currentChunk.length) {
            setLearnIndex(prev => prev + 1);
            setCurrentMonster(getRandomMonster());
            speak(currentChunk[learnIndex + 1].english);
        } else {
            startQuizPhase();
        }
    };

    const getDistractors = (wordId: number, count: number) => {
        const all = getWords();
        const others = all.filter(w => w.id !== wordId);
        const shuffled = [...others].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const startQuizPhase = () => {
        setPhase('QUIZ');
        setQuizMode('RECOGNIZE');
        const shuffled = [...currentChunk].sort(() => 0.5 - Math.random());
        setQuizQueue(shuffled);
        prepareNextQuestion(shuffled, 'RECOGNIZE');
    };

    const startSpellPhase = () => {
        setQuizMode('SPELL');
        const shuffled = [...currentChunk].sort(() => 0.5 - Math.random());
        setQuizQueue(shuffled);
        prepareNextQuestion(shuffled, 'SPELL');
    };

    const startSentencePhase = () => {
        setQuizMode('SENTENCE');
        const withExamples = currentChunk.filter(w => w.example && w.example.trim().length > 0);
        const shuffled = [...withExamples].sort(() => 0.5 - Math.random());
        setQuizQueue(shuffled);
        prepareNextQuestion(shuffled, 'SENTENCE');
    };

    const prepareNextQuestion = (queue: Word[], mode: 'RECOGNIZE' | 'SPELL' | 'SENTENCE') => {
        if (queue.length === 0) {
            if (mode === 'RECOGNIZE') {
                startSpellPhase();
            } else if (mode === 'SPELL') {
                startSentencePhase();
            } else {
                finishRound();
            }
            return;
        }
        const target = queue[0];
        setCurrentQuizWord(target);
        setMonsterHp(100);
        setCurrentMonster(getRandomMonster());
        
        if (mode === 'RECOGNIZE') {
            const distractors = getDistractors(target.id, 3).map(w => w.chinese);
            const allOptions = [target.chinese, ...distractors].sort(() => 0.5 - Math.random());
            setOptions(allOptions);
            speak(target.english);
        } else if (mode === 'SPELL') {
            setSpellInput('');
            speak(target.english);
        } else if (mode === 'SENTENCE') {
            const distractors = getDistractors(target.id, 3).map(w => w.english);
            const allOptions = [target.english, ...distractors].sort(() => 0.5 - Math.random());
            setOptions(allOptions);
            
            const coreWord = getCoreWordForMasking(target.english);
            
            let sentenceSource = target.example || '';
            const extraPool = EXTRA_SENTENCES[target.id];
            if (extraPool && extraPool.length > 0) {
                sentenceSource = extraPool[Math.floor(Math.random() * extraPool.length)];
            }

            let masked = sentenceSource;
            if (coreWord) {
                const regex = new RegExp(coreWord, 'gi');
                masked = masked.replace(regex, '________');
            }
            setSentenceMask(masked);
            // No auto-speak for SENTENCE mode per user request
        }
        
        setFeedbackState('idle');
        setMistakesCount(0);
    };

    const handleAnswer = (selectedAns: string) => {
        if (feedbackState !== 'idle' || !currentQuizWord) return;

        let isCorrect = false;
        if (quizMode === 'RECOGNIZE') {
            isCorrect = selectedAns === currentQuizWord.chinese;
        } else if (quizMode === 'SPELL') {
            const coreWord = getCoreWordForMasking(currentQuizWord.english).toLowerCase().trim();
            isCorrect = selectedAns.toLowerCase().trim() === coreWord;
        } else if (quizMode === 'SENTENCE') {
            isCorrect = selectedAns === currentQuizWord.english;
        }

        setTotalQuestions(prev => prev + 1);
        
        if (isCorrect) {
            setFeedbackState('correct');
            setCombo(prev => prev + 1);
            setCorrectCount(prev => prev + 1);
            setMonsterHp(0);
            
            setTimeout(() => {
                const newQueue = quizQueue.slice(1);
                setQuizQueue(newQueue);
                prepareNextQuestion(newQueue, quizMode);
            }, 800);
        } else {
            setFeedbackState('wrong');
            setCombo(0);
            setMistakesCount(prev => prev + 1);
            setWrongIds(prev => [...prev, currentQuizWord.id]);
            
            setTimeout(() => {
                const newQueue = [...quizQueue.slice(1), currentQuizWord];
                setQuizQueue(newQueue);
                prepareNextQuestion(newQueue, quizMode);
            }, 1200);
        }
    };

    const handleSpellSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAnswer(spellInput);
    };

    const finishRound = () => {
        if (currentChunkIndex + 1 < chunks.length) {
            setPhase('ROUND_END');
        } else {
            finishChallenge();
        }
    };

    const finishChallenge = () => {
        setPhase('SUMMARY');
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
        
        const result: TestResult = {
            timestamp: Date.now(),
            totalQuestions: totalQuestions,
            correctCount: correctCount,
            score: correctCount * 10,
            mode: GameMode.CHALLENGE,
            type: GameType.MULTIPLE_CHOICE,
            difficulty: Difficulty.MEDIUM,
            correctIds: [], 
            wrongIds: Array.from(new Set(wrongIds)),
            playerName: 'Anonymous'
        };
        saveResult(result);
    };

    if (phase === 'INTRO') {
        return (
            <div className="max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-2xl animate-fade-in mt-10 pb-20 border-8 border-slate-50">
                <div className="text-center mb-10">
                    <div className="w-32 h-32 mx-auto mb-6">
                        {currentMonster && <img src={currentMonster.image} style={{filter: currentMonster.filter}} className="w-full h-full object-contain animate-bounce" alt="monster" />}
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">每日怪獸討伐戰</h1>
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
                            <span className="font-black text-lg">複習舊怪獸</span>
                        </button>
                        <button
                            onClick={() => setChallengeMode('PREVIEW')}
                            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-4 transition-all ${challengeMode === 'PREVIEW' ? 'bg-white border-blue-500 text-blue-600 shadow-2xl scale-105 z-10' : 'bg-slate-100 border-transparent text-slate-400'}`}
                        >
                            <TrendingUp size={32} className="mb-2" />
                            <span className="font-black text-lg">探索新怪獸</span>
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

                <button 
                    onClick={startChallenge}
                    disabled={targetWords.length === 0}
                    className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4"
                >
                    出發討伐 <ArrowRight size={32} />
                </button>
                <button onClick={onBack} className="w-full mt-8 text-slate-400 font-black hover:text-red-500 transition-colors">
                    返回主選單
                </button>
            </div>
        );
    }

    if (phase === 'LEARN') {
        const word = currentChunk[learnIndex];
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
                <div className="w-full flex justify-between items-center mb-6">
                    <button onClick={onBack} className="text-slate-400 font-black hover:text-red-500">退出</button>
                    <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-black">
                        Round {currentChunkIndex + 1}/{chunks.length} - 學習中 {learnIndex + 1}/{currentChunk.length}
                    </div>
                </div>
                
                <div 
                    onClick={() => speak(word.english)}
                    className="bg-white rounded-[3rem] shadow-2xl p-10 w-full flex flex-col items-center justify-center cursor-pointer transform transition hover:scale-[1.02] border-8 border-purple-50 group"
                >
                    <div className="w-48 h-48 mb-6 group-hover:animate-bounce flex items-center justify-center">
                         {currentMonster && <img src={currentMonster.image} style={{filter: currentMonster.filter}} className="max-w-full max-h-full object-contain drop-shadow-md" alt="monster" />}
                    </div>
                    <div className="text-6xl md:text-7xl font-black text-slate-800 mb-2 font-['Outfit'] tracking-wide">
                        {word.english}
                    </div>
                    <div className="text-2xl text-slate-400 mb-6 font-bold italic">
                        {word.part_of_speech}
                    </div>
                    <div className="text-4xl font-black text-emerald-600 drop-shadow-sm mb-8">
                        {word.chinese}
                    </div>
                    
                    {word.example && (
                        <div className="bg-slate-50 p-6 rounded-2xl w-full text-left border-2 border-slate-100">
                            <p className="text-slate-400 text-sm font-black uppercase mb-2">Example</p>
                            <p className="text-xl text-slate-700 font-bold leading-relaxed">{word.example}</p>
                        </div>
                    )}
                    
                    <div className="mt-8 opacity-50 flex items-center gap-2">
                        <span className="text-2xl">🔊</span>
                        <span className="text-lg font-bold text-slate-500">點擊念出發音</span>
                    </div>
                </div>

                <button 
                    onClick={nextLearnCard}
                    className="mt-10 bg-emerald-500 hover:bg-emerald-600 text-white text-3xl font-black py-5 w-full max-w-sm rounded-[2rem] shadow-xl active:scale-95 transition-all"
                >
                    我記住了！
                </button>
            </div>
        );
    }

    if (phase === 'QUIZ') {
        const word = currentQuizWord;
        if (!word) return null;

        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 md:p-8 w-full max-w-3xl mx-auto animate-fade-in">
                <div className="w-full flex justify-between items-center mb-8">
                    <div className="bg-red-500 text-white font-black text-xl px-5 py-2 rounded-xl shadow-md border-b-4 border-red-700 flex items-center gap-2">
                        <span>
                            {quizMode === 'RECOGNIZE' ? '👁️ 認字階段' : quizMode === 'SPELL' ? '✍️ 拼字階段' : '📖 例句階段'} 
                            - 剩餘怪獸: 
                        </span>
                        <span className="text-2xl ml-2">{quizQueue.length}</span>
                    </div>
                    {combo > 1 && (
                        <div className="animate-bounce bg-orange-400 text-white font-black text-2xl px-5 py-1 rounded-xl shadow-xl transform rotate-3">
                            🔥 {combo} Combo!
                        </div>
                    )}
                </div>

                <div 
                    onClick={() => speak(word.english)}
                    className={`text-white w-full rounded-[3rem] p-10 text-center shadow-2xl relative cursor-pointer active:scale-[0.98] transition-all border-8 ${quizMode === 'SENTENCE' ? 'bg-indigo-800 border-indigo-700' : 'bg-slate-800 border-slate-700'}`}
                >
                    <div className="flex justify-center mb-6 relative h-32">
                        <div className={`w-32 h-32 absolute transition-all duration-300 ${feedbackState === 'correct' ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100'}`}>
                            {currentMonster && <img src={currentMonster.image} style={{filter: currentMonster.filter}} className="max-w-full max-h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" alt="monster" />}
                        </div>
                        {feedbackState === 'correct' && (
                            <div className="text-8xl absolute animate-ping-once text-red-500">💥</div>
                        )}
                    </div>
                    
                    <div className="w-48 h-4 bg-slate-600 rounded-full mx-auto mb-8 overflow-hidden border-2 border-slate-900">
                        <div className="h-full bg-red-500 transition-all duration-300" style={{width: `${monsterHp}%`}}></div>
                    </div>

                    {quizMode === 'RECOGNIZE' ? (
                        <div className="text-5xl md:text-6xl font-black mb-2 font-['Outfit'] tracking-wider">{word.english}</div>
                    ) : quizMode === 'SPELL' ? (
                        <div className="text-4xl font-black mb-2 tracking-wider text-emerald-400">{word.chinese}</div>
                    ) : (
                        <div className="bg-white/10 p-6 rounded-2xl mt-4 relative">
                            <div className="text-2xl md:text-3xl font-black leading-relaxed text-left text-white drop-shadow-md">
                                {sentenceMask}
                            </div>
                            {mistakesCount >= 3 && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); speak(word.english); }}
                                    className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 rounded-full p-3 shadow-lg hover:bg-yellow-300 hover:scale-110 transition-all font-black flex items-center gap-2 animate-bounce"
                                >
                                    🔊 提示
                                </button>
                            )}
                        </div>
                    )}
                    
                    {quizMode !== 'SENTENCE' && (
                        <div className="text-2xl text-slate-400 font-bold italic">({word.part_of_speech})</div>
                    )}
                </div>

                {quizMode === 'RECOGNIZE' || quizMode === 'SENTENCE' ? (
                    <div className="grid grid-cols-2 gap-4 w-full mt-6">
                        {options.map((opt, i) => {
                            let btnClass = "bg-white hover:bg-blue-50 text-slate-700 border-4 border-slate-100 active:scale-95";
                            let showStatus = false;
                            
                            const correctAnswer = quizMode === 'RECOGNIZE' ? word.chinese : word.english;

                            if (feedbackState !== 'idle') {
                                if (opt === correctAnswer) {
                                    btnClass = "bg-emerald-500 text-white border-4 border-emerald-600 z-10 scale-105 shadow-xl";
                                    showStatus = true;
                                } else if (feedbackState === 'wrong') {
                                    btnClass = "bg-slate-100 text-slate-400 opacity-50 border-slate-200";
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    disabled={feedbackState !== 'idle'}
                                    onClick={() => handleAnswer(opt)}
                                    className={`text-2xl md:text-3xl font-black p-6 rounded-3xl transition-all relative shadow-md ${btnClass}`}
                                >
                                    {opt}
                                    {showStatus && opt === correctAnswer && feedbackState === 'correct' && (
                                        <div className="absolute -top-3 -right-3 text-4xl animate-bounce">🟢</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <form onSubmit={handleSpellSubmit} className="w-full mt-6 flex gap-4">
                        <input 
                            type="text" 
                            value={spellInput}
                            onChange={(e) => setSpellInput(e.target.value)}
                            disabled={feedbackState !== 'idle'}
                            autoFocus
                            placeholder="Type the English word..."
                            className={`flex-1 p-6 rounded-3xl border-4 text-3xl font-black shadow-inner outline-none transition-all ${feedbackState === 'correct' ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : feedbackState === 'wrong' ? 'bg-red-100 border-red-500 text-red-800 animate-shake' : 'bg-white border-slate-200 focus:border-blue-500'}`}
                        />
                        <button 
                            type="submit" 
                            disabled={feedbackState !== 'idle' || !spellInput.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-8 rounded-3xl font-black text-2xl shadow-xl active:scale-95 transition-all"
                        >
                            攻擊
                        </button>
                    </form>
                )}
            </div>
        );
    }

    if (phase === 'ROUND_END') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center animate-fade-in">
                <div className="text-8xl mb-8 animate-bounce">🎉</div>
                <h1 className="text-5xl font-black text-slate-800 mb-4">Round {currentChunkIndex + 1} 完成！</h1>
                <p className="text-xl text-slate-500 mb-10 font-bold">稍微休息一下，準備迎接下一批怪獸！</p>
                <button 
                    onClick={() => startLearnPhase(currentChunkIndex + 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-3xl font-black py-5 px-16 rounded-[2rem] shadow-xl active:scale-95 transition-all flex items-center gap-4"
                >
                    下一回合 <ArrowRight size={32} />
                </button>
            </div>
        );
    }

    if (phase === 'SUMMARY') {
        const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
        const uniqueWrongIds = Array.from(new Set(wrongIds));

        return (
            <div className="max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl animate-fade-in mt-10 border-8 border-slate-50">
                <div className="text-center mb-10">
                    <div className="w-32 h-32 mx-auto mb-6">
                        {currentMonster && <img src={currentMonster.image} style={{filter: currentMonster.filter}} className="w-full h-full object-contain" alt="monster" />}
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 mb-2">討伐成功！</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">日期：{actualTargetDate}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-blue-50 p-8 rounded-[2rem] text-center border-4 border-blue-100">
                        <div className="text-blue-400 text-sm font-black uppercase mb-2 tracking-widest">擊敗怪獸數</div>
                        <div className="text-5xl font-black text-blue-600">{correctCount}</div>
                    </div>
                    <div className={`p-8 rounded-[2rem] text-center border-4 ${accuracy >= 80 ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}>
                        <div className={`${accuracy >= 80 ? 'text-emerald-400' : 'text-orange-400'} text-sm font-black uppercase mb-2 tracking-widest`}>命中率</div>
                        <div className={`text-5xl font-black ${accuracy >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>{accuracy}%</div>
                    </div>
                </div>

                {uniqueWrongIds.length > 0 && (
                     <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border-2 border-slate-100">
                        <h3 className="font-black text-slate-700 mb-6 flex items-center gap-3 text-xl">
                            <span className="text-3xl">⚠️</span> 需要多練習的怪獸
                        </h3>
                        <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {uniqueWrongIds.map(id => {
                                const w = targetWords.find(x => x.id === id);
                                if (!w) return null;
                                return (
                                    <div key={id} className="p-4 bg-white border-2 border-slate-100 rounded-2xl flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-lg">{w.english}</span>
                                            <span className="text-xs font-bold text-slate-400">{w.part_of_speech}</span>
                                        </div>
                                        <span className="text-slate-600 font-black">{w.chinese}</span>
                                    </div>
                                );
                            })}
                        </div>
                     </div>
                )}

                <button 
                    onClick={onBack}
                    className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-3xl font-black text-xl shadow-xl transition-all active:scale-95"
                >
                    返回主大廳
                </button>
            </div>
        );
    }

    return null;
};

export default DailyChallenge;
