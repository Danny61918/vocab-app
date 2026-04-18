export interface Monster {
  id: number;
  name: string;
  image: string;
  filter: string; // CSS filter for creating variations
  isLegendary?: boolean;
}

export const MONSTER_DATA: Record<number, Monster> = {
  // --- Normal Monsters (1-20) ---
  1: { id: 1, name: '綠豆包', image: 'monsters/mon_01.png', filter: '' },
  2: { id: 2, name: '小火狐', image: 'monsters/mon_02.png', filter: '' },
  3: { id: 3, name: '水滴怪', image: 'monsters/mon_03.png', filter: '' },
  4: { id: 4, name: '岩石龜', image: 'monsters/mon_04.png', filter: '' },
  5: { id: 5, name: '電氣蜂', image: 'monsters/mon_05.png', filter: '' },
  6: { id: 6, name: '雪冰堡', image: 'monsters/mon_06.png', filter: '' },
  7: { id: 7, name: '大地岩魔', image: 'monsters/mon_07.png', filter: '' },
  8: { id: 8, name: '雲彩飛鳥', image: 'monsters/mon_08.png', filter: '' },
  9: { id: 9, name: '夢幻粉菇', image: 'monsters/mon_09.png', filter: '' },
  10: { id: 10, name: '星光妖精', image: 'monsters/mon_12.png', filter: '' }, // Using 12 as 10
  
  // Variations using hue-rotate to bypass generating 10 more images
  11: { id: 11, name: '霸王花', image: 'monsters/mon_01.png', filter: 'hue-rotate(120deg) brightness(1.2)' },
  12: { id: 12, name: '幽冥靈狐', image: 'monsters/mon_02.png', filter: 'hue-rotate(240deg) saturate(2)' },
  13: { id: 13, name: '毒水怪', image: 'monsters/mon_03.png', filter: 'hue-rotate(90deg)' },
  14: { id: 14, name: '黑曜龜', image: 'monsters/mon_04.png', filter: 'grayscale(1) brightness(0.5)' },
  15: { id: 15, name: '血紅狂蜂', image: 'monsters/mon_05.png', filter: 'hue-rotate(300deg)' },
  16: { id: 16, name: '暗影雪魔', image: 'monsters/mon_06.png', filter: 'hue-rotate(180deg)' },
  17: { id: 17, name: '鋼鐵巨甲', image: 'monsters/mon_10.png', filter: '' }, // Base 10 not used in 1-10
  18: { id: 18, name: '雷霆金鳥', image: 'monsters/mon_08.png', filter: 'hue-rotate(60deg)' },
  19: { id: 19, name: '幽光靈傘', image: 'monsters/mon_09.png', filter: 'hue-rotate(180deg)' },
  20: { id: 20, name: '暗夜妖精', image: 'monsters/mon_12.png', filter: 'hue-rotate(200deg)' },
  
  // --- Legendary Boss Monsters (21-23) ---
  21: { id: 21, name: '雷霆機關神', image: 'monsters/mon_10.png', filter: 'drop-shadow(0 0 20px yellow) hue-rotate(45deg) saturate(2)', isLegendary: true },
  22: { id: 22, name: '聖靈幽火', image: 'monsters/mon_11.png', filter: 'drop-shadow(0 0 20px cyan)', isLegendary: true },
  23: { id: 23, name: '黃金究極王', image: 'monsters/mon_01.png', filter: 'hue-rotate(60deg) saturate(2) drop-shadow(0 0 40px gold)', isLegendary: true },

  // --- Grammar Boss Monsters (24-27) ---
  24: { id: 24, name: '時光幽魂', image: 'monsters/mon_25.png', filter: 'drop-shadow(0 0 15px purple)', isLegendary: true },
  25: { id: 25, name: '大地護衛', image: 'monsters/mon_24.png', filter: 'drop-shadow(0 0 15px green)', isLegendary: true },
  26: { id: 26, name: '永恆機甲', image: 'monsters/mon_23.png', filter: 'drop-shadow(0 0 15px blue)', isLegendary: true },
  27: { id: 27, name: '烈焰之舞', image: 'monsters/mon_22.png', filter: 'drop-shadow(0 0 15px red)', isLegendary: true }
};
