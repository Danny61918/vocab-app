import { TestResult, StreakData, GameGlobalStats, Achievement } from '../types';
import { getHistory } from './storage';

const STORAGE_KEY_STREAK = 'vocab_app_streak';
const STORAGE_KEY_ACHIEVEMENTS = 'vocab_app_achievements_unlocked';

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_blood',
        name: '初試啼聲',
        description: '完成第一次單字測驗',
        icon: '🥚',
        condition: (stats) => stats.totalTestsCompleted >= 1
    },
    {
        id: 'perfect_score',
        name: '完美無瑕',
        description: '在任意測驗中獲得 100 分滿分',
        icon: '🌟',
        condition: (stats) => stats.perfectTests >= 1
    },
    {
        id: 'streak_3',
        name: '三天打魚',
        description: '達成 3 天連續學習',
        icon: '🔥',
        condition: (stats) => stats.currentStreak >= 3
    },
    {
        id: 'streak_7',
        name: '一週大師',
        description: '達成 7 天連續學習',
        icon: '👑',
        condition: (stats) => stats.currentStreak >= 7
    },
    {
        id: 'vocab_100',
        name: '單字百斬',
        description: '累積答對 100 個單字/文法/片語',
        icon: '💯',
        condition: (stats) => stats.totalCorrectAnswers >= 100
    },
    {
        id: 'vocab_500',
        name: '五百壯士',
        description: '累積答對 500 個單字/文法/片語',
        icon: '🗡️',
        condition: (stats) => stats.totalCorrectAnswers >= 500
    }
];

export const getStreak = (): StreakData => {
    const stored = localStorage.getItem(STORAGE_KEY_STREAK);
    if (stored) {
        return JSON.parse(stored);
    }
    return { currentStreak: 0, bestStreak: 0, lastActivityDate: '' };
};

export const getUnlockedAchievements = (): string[] => {
    const stored = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    return stored ? JSON.parse(stored) : [];
};

export const processGamification = (result: TestResult) => {
    // 1. Update Streak
    const streak = getStreak();
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local time format
    
    if (streak.lastActivityDate !== today) {
        if (streak.lastActivityDate) {
            const lastDate = new Date(streak.lastActivityDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streak.currentStreak += 1;
            } else {
                streak.currentStreak = 1; // Streak broken
            }
        } else {
            streak.currentStreak = 1; // First day
        }
        
        streak.lastActivityDate = today;
        if (streak.currentStreak > streak.bestStreak) {
            streak.bestStreak = streak.currentStreak;
        }
        
        localStorage.setItem(STORAGE_KEY_STREAK, JSON.stringify(streak));
    }

    // 2. Compile global stats for achievements
    const history = getHistory();
    const totalCorrect = history.reduce((sum, r) => sum + r.correctCount, 0);
    const perfectCount = history.filter(r => r.score === 100).length;

    const stats: GameGlobalStats = {
        totalTestsCompleted: history.length,
        totalCorrectAnswers: totalCorrect,
        perfectTests: perfectCount,
        currentStreak: streak.currentStreak
    };

    // 3. Unlock new achievements
    const unlocked = getUnlockedAchievements();
    let newUnlocks = false;
    
    ACHIEVEMENTS.forEach(ach => {
        if (!unlocked.includes(ach.id) && ach.condition(stats)) {
            unlocked.push(ach.id);
            newUnlocks = true;
            // We could trigger a toast notification event here if we had an event emitter
            console.log(`🏆 獲得成就解鎖: ${ach.name}`);
        }
    });

    if (newUnlocks) {
        localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(unlocked));
    }
};
