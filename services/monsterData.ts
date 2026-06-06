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
  27: { id: 27, name: '烈焰之舞', image: 'monsters/mon_22.png', filter: 'drop-shadow(0 0 15px red)', isLegendary: true },
  28: { id: 28, name: '雷電松鼠', image: 'monsters/mon_26.png', filter: '' },
  29: { id: 29, name: '岩甲地鼠', image: 'monsters/mon_27.png', filter: '' },
  30: { id: 30, name: '格鬥鋼拳', image: 'monsters/mon_28.png', filter: 'drop-shadow(0 0 15px red)', isLegendary: true },
  31: { id: 31, name: '爆炎雙頭龍', image: 'monsters/mon_13.png', filter: '' },
  32: { id: 32, name: '劇毒蠍子', image: 'monsters/mon_14.png', filter: '' },
  33: { id: 33, name: '幻影蝙蝠', image: 'monsters/mon_15.png', filter: '' },
  34: { id: 34, name: '冰晶海妖', image: 'monsters/mon_16.png', filter: '' },
  35: { id: 35, name: '狂暴野豬', image: 'monsters/mon_17.png', filter: '' },
  36: { id: 36, name: '綠林長老', image: 'monsters/mon_18.png', filter: '' },
  37: { id: 37, name: '熔岩巨猿', image: 'monsters/mon_19.png', filter: '' },
  38: { id: 38, name: '深海巨怪', image: 'monsters/mon_20.png', filter: '' },
  39: { id: 39, name: '聖光獨角獸', image: 'monsters/mon_21.png', filter: 'drop-shadow(0 0 20px gold)', isLegendary: true },
  40: { id: 40, name: '冰藍雙頭龍', image: 'monsters/mon_13.png', filter: 'hue-rotate(180deg)' },
  41: { id: 41, name: '劇毒紅蠍', image: 'monsters/mon_14.png', filter: 'hue-rotate(120deg) saturate(1.5)' },
  42: { id: 42, name: '黃金蝙蝠', image: 'monsters/mon_15.png', filter: 'hue-rotate(45deg)' },
  43: { id: 43, name: '深淵海妖', image: 'monsters/mon_16.png', filter: 'hue-rotate(90deg) brightness(0.8)' },
  44: { id: 44, name: '魔化野豬', image: 'monsters/mon_17.png', filter: 'hue-rotate(270deg)' },
  45: { id: 45, name: '枯木長老', image: 'monsters/mon_18.png', filter: 'grayscale(0.8) brightness(0.9)' },
  46: { id: 46, name: '冰霜巨猿', image: 'monsters/mon_19.png', filter: 'hue-rotate(180deg)' },
  47: { id: 47, name: '變種海怪', image: 'monsters/mon_20.png', filter: 'hue-rotate(300deg)' },
  48: { id: 48, name: '墮落獨角獸', image: 'monsters/mon_21.png', filter: 'hue-rotate(180deg) invert(0.8) drop-shadow(0 0 15px purple)', isLegendary: true },
  49: { id: 49, name: '虛空護衛', image: 'monsters/mon_24.png', filter: 'hue-rotate(200deg) brightness(0.7) drop-shadow(0 0 15px magenta)', isLegendary: true },
  50: { id: 50, name: '疾風松鼠', image: 'monsters/mon_26.png', filter: 'hue-rotate(90deg)' },
  51: { id: 51, name: '藍晶石怪', image: 'monsters/mon_01.png', filter: 'hue-rotate(240deg) saturate(200%)' },
  52: { id: 52, name: '紫曜岩魔', image: 'monsters/mon_02.png', filter: 'hue-rotate(280deg) brightness(1.2)' },
  53: { id: 53, name: '翡翠毒蛙', image: 'monsters/mon_03.png', filter: 'hue-rotate(120deg) contrast(150%)' },
  54: { id: 54, name: '赤焰獅子', image: 'monsters/mon_04.png', filter: 'hue-rotate(30deg) saturate(150%)' },
  55: { id: 55, name: '冰霜雪怪', image: 'monsters/mon_05.png', filter: 'hue-rotate(200deg) brightness(1.5)' },
  56: { id: 56, name: '暗影蝙蝠', image: 'monsters/mon_06.png', filter: 'grayscale(80%) brightness(0.6)' },
  57: { id: 57, name: '黃金飛龍', image: 'monsters/mon_07.png', filter: 'hue-rotate(60deg) saturate(300%) drop-shadow(0 0 10px gold)', isLegendary: true },
  58: { id: 58, name: '深海巨蛇', image: 'monsters/mon_08.png', filter: 'hue-rotate(220deg) contrast(200%) drop-shadow(0 0 10px blue)', isLegendary: true },
  59: { id: 59, name: '大地巨像', image: 'monsters/mon_09.png', filter: 'sepia(50%) saturate(80%) brightness(0.9)' },
  60: { id: 60, name: '烈風靈鳥', image: 'monsters/mon_10.png', filter: 'hue-rotate(180deg) saturate(250%)' },
};
