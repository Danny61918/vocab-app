import { beforeEach, describe, expect, it } from 'vitest';
import { bossDaysWon, recordBossWin, drawGacha, gachaPoolIds, getUserData, saveUserData, DUPLICATE_REFUND, GACHA_COST } from '../gamification';
import { MONSTER_DATA } from '../monsterData';
import { GRAMMAR_BOSS_MAP } from '../grammarData';
import { unlockMonster } from '../srsStorage';

beforeEach(() => localStorage.clear());

describe('gacha pool', () => {
  it('never contains legendary, boss or milestone monsters', () => {
    const pool = gachaPoolIds();
    for (const id of [21, 22, 23, ...Object.values(GRAMMAR_BOSS_MAP)]) expect(pool).not.toContain(id);
    for (const id of pool) expect(MONSTER_DATA[id].isLegendary).toBeFalsy();
  });
});

describe('drawGacha', () => {
  it('needs enough coins', () => {
    saveUserData({ coins: GACHA_COST - 1, ownedMonsters: {} });
    expect(drawGacha()).toBeNull();
  });
  it('a duplicate refunds coins, adds exp and guarantees the next draw is new', () => {
    const first = gachaPoolIds()[0];
    saveUserData({ coins: GACHA_COST, ownedMonsters: { [first]: { id: first, level: 1, exp: 0 } } });
    const dup = drawGacha(() => 0)!; // first pool entry = already owned
    expect(dup.isNew).toBe(false);
    expect(dup.refund).toBe(DUPLICATE_REFUND);
    expect(getUserData().coins).toBe(DUPLICATE_REFUND);
    expect(getUserData().ownedMonsters[first].exp).toBe(100);
    expect(getUserData().guaranteeNew).toBe(true);

    saveUserData({ ...getUserData(), coins: GACHA_COST });
    const next = drawGacha(() => 0)!; // would be the owned one again without the guarantee
    expect(next.isNew).toBe(true);
    expect(next.monsterId).not.toBe(first);
    expect(getUserData().guaranteeNew).toBe(false);
  });
  it('a new monster costs the full price and does not set the guarantee', () => {
    saveUserData({ coins: GACHA_COST, ownedMonsters: {} });
    const r = drawGacha(() => 0)!;
    expect(r.isNew).toBe(true);
    expect(r.refund).toBe(0);
    expect(getUserData().coins).toBe(0);
    expect(getUserData().guaranteeNew).toBe(false);
  });
});

describe('unlocks from levels, bosses and mastery', () => {
  it('show up in the collection', () => {
    saveUserData({ coins: 0, ownedMonsters: {} });
    unlockMonster(31);
    unlockMonster(22);
    const owned = getUserData().ownedMonsters;
    expect(owned[31]).toBeDefined();
    expect(owned[22]).toBeDefined();
  });
  it('keeps what is already owned (level and exp)', () => {
    saveUserData({ coins: 5, ownedMonsters: { 31: { id: 31, level: 2, exp: 150 } } });
    unlockMonster(31);
    expect(getUserData().ownedMonsters[31]).toEqual({ id: 31, level: 2, exp: 150 });
    expect(getUserData().coins).toBe(5);
  });
});

describe('boss capture takes several days', () => {
  const win = (day: string) => recordBossWin(31, day);
  it('is not owned until beaten on 5 different days', () => {
    saveUserData({ coins: 0, ownedMonsters: {} });
    for (const d of ['2026-11-21', '2026-11-22', '2026-11-23', '2026-11-25']) {
      expect(win(d).newlyUnlocked).toBe(false);
      expect(getUserData().ownedMonsters[31]).toBeUndefined();
    }
    const last = win('2026-11-30'); // days need not be consecutive
    expect(last).toMatchObject({ days: 5, newlyUnlocked: true, owned: true });
    expect(getUserData().ownedMonsters[31]).toBeDefined();
  });
  it('several wins on one day count once', () => {
    saveUserData({ coins: 0, ownedMonsters: {} });
    win('2026-11-21');
    expect(win('2026-11-21').days).toBe(1);
    expect(bossDaysWon(31)).toBe(1);
  });
  it('a boss already owned stays owned and is not unlocked again', () => {
    saveUserData({ coins: 0, ownedMonsters: { 31: { id: 31, level: 1, exp: 0 } } });
    const r = win('2026-11-21');
    expect(r).toMatchObject({ owned: true, newlyUnlocked: false });
  });
});
