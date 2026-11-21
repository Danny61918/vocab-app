import { beforeEach, describe, expect, it } from 'vitest';
import { drawGacha, gachaPoolIds, getUserData, saveUserData, DUPLICATE_REFUND, GACHA_COST } from '../gamification';
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
