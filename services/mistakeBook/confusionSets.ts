/**
 * 易混字組：孩子會互相搞混的一組字。變化題的選項只從同組挑，逼她分辨；
 * 組內「也說得通」的字要寫進題目的 alsoFits，不可當干擾項（見 drills/types.ts）。
 * words 一律小寫、去頭尾空白，且必須存在於單字庫（由 skills.test.ts 檢查）。
 */
export interface ConfusionSet {
  id: string;
  words: string[];
  contrastNote: string; // 中文，答錯時可顯示的區辨重點
}

export const ALL_CONFUSION_SETS: ConfusionSet[] = [
  {
    id: 'cs.health',
    words: ['cold', 'sick', 'cough', 'dizzy', 'headache', 'stomachache', 'sore throat'],
    contrastNote:
      'cold 是感冒（名詞，catch a cold）；sick 是生病的（形容詞，be sick）；dizzy 是頭暈的（形容詞，feel dizzy）；cough 是咳嗽（名詞，也可當動詞）；headache／stomachache／sore throat 是哪裡痛的名詞。',
  },
];

const BY_ID = new Map(ALL_CONFUSION_SETS.map((c) => [c.id, c]));

export function getConfusionSet(id: string): ConfusionSet | undefined {
  return BY_ID.get(id);
}
