import { TestResult, StreakData, GameGlobalStats, Achievement, UserData, OwnedMonster } from '../types';
import { getHistory } from './storage';
import { MONSTER_DATA } from './monsterData';
import { loadLevelProgress } from './srsStorage';

export const GACHA_COST = 500;
export const DUPLICATE_REFUND = 100;
export const BOSS_WIN_COINS = 150;
export const DRILL_ROUND_COINS = 50;
// One-off bonus the day a streak reaches this length.
export const STREAK_BONUS: Record<number, number> = { 3: 100, 7: 300 };

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

// Monsters unlocked by clearing levels, beating grammar bosses or mastering words are recorded in the level
// progress, not in userData. Fold them in so the gallery (which reads ownedMonsters) shows them.
const withUnlockedMonsters = (data: UserData): UserData => {
    try {
        for (const id of loadLevelProgress().unlockedMonsters) {
            if (MONSTER_DATA[id] && !data.ownedMonsters[id]) data.ownedMonsters[id] = { id, level: 1, exp: 0 };
        }
    } catch {
        // progress unreadable: show what userData has
    }
    return data;
};

export const getUserData = (): UserData => withUnlockedMonsters(readUserData());

const readUserData = (): UserData => {
    const stored = localStorage.getItem(STORAGE_KEY_USER_DATA);
    if (stored) {
        const parsed = JSON.parse(stored);
        // Defensive: a prior cloud-sync edge case (or any other future one) can
        // leave coins as null/NaN (JSON.stringify(NaN) serializes to "null", so
        // this is silent — no exception, just a blank/broken display) or drop
        // ownedMonsters entirely. Coerce back to a valid shape instead of
        // propagating the corruption forever.
        return {
            coins: typeof parsed.coins === 'number' && Number.isFinite(parsed.coins) ? parsed.coins : 0,
            ownedMonsters: parsed.ownedMonsters && typeof parsed.ownedMonsters === 'object' ? parsed.ownedMonsters : {},
            guaranteeNew: parsed.guaranteeNew === true,
        };
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

export const awardCoins = (amount: number): void => {
    if (amount <= 0) return;
    const userData = getUserData();
    userData.coins += amount;
    saveUserData(userData);
};

export interface GachaResult {
    monsterId: number;
    isNew: boolean;
    levelUp: boolean;
    refund: number;
}

// Boss and milestone monsters are legendary: they are earned, never drawn.
export const gachaPoolIds = (): number[] =>
    Object.values(MONSTER_DATA).filter((m) => !m.isLegendary).map((m) => m.id);

// A duplicate pays back DUPLICATE_REFUND coins plus 100 EXP, and the next draw is guaranteed to be new.
export const drawGacha = (rng: () => number = Math.random): GachaResult | null => {
    const userData = getUserData();
    if (userData.coins < GACHA_COST) {
        return null;
    }

    userData.coins -= GACHA_COST;

    const pool = gachaPoolIds();
    const unowned = pool.filter((id) => !userData.ownedMonsters[id]);
    const candidates = userData.guaranteeNew && unowned.length > 0 ? unowned : pool;
    const randomId = candidates[Math.floor(rng() * candidates.length)];

    let isNew = false;
    let levelUp = false;
    let refund = 0;

    if (!userData.ownedMonsters[randomId]) {
        userData.ownedMonsters[randomId] = { id: randomId, level: 1, exp: 0 };
        isNew = true;
        userData.guaranteeNew = false;
    } else {
        const m = userData.ownedMonsters[randomId];
        m.exp += 100;
        refund = DUPLICATE_REFUND;
        userData.coins += refund;
        userData.guaranteeNew = true;

        if (m.exp >= 300 && m.level < 3) {
            m.level = 3;
            levelUp = true;
        } else if (m.exp >= 100 && m.level < 2) {
            m.level = 2;
            levelUp = true;
        }
    }

    saveUserData(userData);
    return { monsterId: randomId, isNew, levelUp, refund };
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
        // Bonus for reaching a milestone streak (only on the day the streak first reaches it).
        awardCoins(STREAK_BONUS[streak.currentStreak] ?? 0);
        
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
    awardCoins(result.correctCount * 10);
};
