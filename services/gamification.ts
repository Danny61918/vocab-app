import { TestResult, StreakData, GameGlobalStats, Achievement, UserData, OwnedMonster } from '../types';
import { getHistory } from './storage';
import { MONSTER_DATA } from './monsterData';

const STORAGE_KEY_STREAK = 'vocab_app_streak';
const STORAGE_KEY_ACHIEVEMENTS = 'vocab_app_achievements_unlocked';
const STORAGE_KEY_USER_DATA = 'vocab_app_user_data';

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

export const getUserData = (): UserData => {
    const stored = localStorage.getItem(STORAGE_KEY_USER_DATA);
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Legacy migration: check if there was old VocabAdventureMap progress
    const legacyProgressStr = localStorage.getItem('vocab_adventure_progress');
    const ownedMonsters: Record<number, OwnedMonster> = {};
    
    if (legacyProgressStr) {
        try {
            const legacyProgress = JSON.parse(legacyProgressStr);
            if (Array.isArray(legacyProgress.unlockedMonsters)) {
                legacyProgress.unlockedMonsters.forEach((id: number) => {
                    ownedMonsters[id] = { id, level: 1, exp: 0 };
                });
            }
        } catch (e) {
            console.error('Failed to parse legacy progress', e);
        }
    }

    return { coins: 0, ownedMonsters };
};

export const saveUserData = (data: UserData) => {
    localStorage.setItem(STORAGE_KEY_USER_DATA, JSON.stringify(data));
};

export const drawGacha = (): { monsterId: number; isNew: boolean; levelUp: boolean } | null => {
    const userData = getUserData();
    if (userData.coins < 500) {
        return null;
    }
    
    userData.coins -= 500;
    
    // Pick random monster from MONSTER_DATA
    const allMonsterIds = Object.keys(MONSTER_DATA).map(Number);
    const randomId = allMonsterIds[Math.floor(Math.random() * allMonsterIds.length)];
    
    let isNew = false;
    let levelUp = false;

    if (!userData.ownedMonsters[randomId]) {
        userData.ownedMonsters[randomId] = { id: randomId, level: 1, exp: 0 };
        isNew = true;
    } else {
        // Duplicate: gain 100 EXP
        const m = userData.ownedMonsters[randomId];
        m.exp += 100;
        
        // Level up thresholds
        if (m.exp >= 300 && m.level < 3) {
            m.level = 3;
            levelUp = true;
        } else if (m.exp >= 100 && m.level < 2) {
            m.level = 2;
            levelUp = true;
        }
    }
    
    saveUserData(userData);
    return { monsterId: randomId, isNew, levelUp };
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

    // 4. Reward Coins
    const userData = getUserData();
    const coinsEarned = result.correctCount * 10;
    userData.coins += coinsEarned;
    saveUserData(userData);
};
