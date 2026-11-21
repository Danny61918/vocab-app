import { describe, expect, it } from 'vitest';
import { MONSTER_CARDS } from '../monsterCards';
import { MONSTER_DATA } from '../monsterData';

const HAS_CJK = /[\u4e00-\u9fff]/;

describe('monster cards', () => {
  it('belong to real, ordinary (drawable) monsters', () => {
    for (const id of Object.keys(MONSTER_CARDS).map(Number)) {
      expect(MONSTER_DATA[id], `monster ${id}`).toBeDefined();
    }
  });
  it('have an English name, three English sentences with Chinese, a Chinese fact and a key word', () => {
    for (const [id, c] of Object.entries(MONSTER_CARDS)) {
      expect(c.en.trim(), id).not.toBe('');
      expect(c.sentences, id).toHaveLength(3);
      for (const s of c.sentences) {
        expect(HAS_CJK.test(s.en), `${id} english sentence has Chinese`).toBe(false);
        expect(/^[A-Z]/.test(s.en) && /[.!?]$/.test(s.en), `${id} sentence form: ${s.en}`).toBe(true);
        expect(HAS_CJK.test(s.zh), `${id} translation`).toBe(true);
      }
      expect(HAS_CJK.test(c.fact), `${id} fact`).toBe(true);
      expect(HAS_CJK.test(c.word.zh) && !HAS_CJK.test(c.word.en), `${id} word`).toBe(true);
    }
  });
});
