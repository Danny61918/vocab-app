import { ErrorCategory } from './types';

/**
 * 細技能表。粗類（domain）：G 文法規則、V 單字語意與搭配、R 閱讀、M 書寫機制、
 * FMT 題型技能（不是知識，是「這種題目要怎麼看」）。
 *
 * 排程以技能為單位（見 drillProgress.ts）。新增技能時 id 必須以 `<domain>.` 開頭，
 * 且不可重複；錯題的 `skills` 欄位與變化題的 `skillIds` 只能引用這裡登記過的 id。
 * 舊分類 `errorCategory` 原樣保留給錯題本顯示，這裡的 `legacyCategory` 只是對照。
 */
export type SkillDomain = 'G' | 'V' | 'R' | 'M' | 'FMT';

export interface SkillTag {
  id: string;
  domain: SkillDomain;
  label: string;
  legacyCategory?: ErrorCategory;
}

export const ALL_SKILLS: SkillTag[] = [
  { id: 'G.SVA.I_you_base', domain: 'G', label: '主詞 I／you 用動詞原形', legacyCategory: 'verb_tense' },
  { id: 'G.SVA.plural_subject', domain: 'G', label: '複數主詞（含 children）用原形', legacyCategory: 'verb_tense' },
  { id: 'G.SVA.compound_subject', domain: 'G', label: '合併主詞（Mark and I）用原形', legacyCategory: 'verb_tense' },
  { id: 'G.SVA.third_person_s', domain: 'G', label: '第三人稱單數動詞加 -s／-es', legacyCategory: 'verb_tense' },
  { id: 'G.NEG.dont_doesnt', domain: 'G', label: '否定句 don\'t／doesn\'t 的選擇', legacyCategory: 'verb_tense' },
  { id: 'G.PS.does_question_base', domain: 'G', label: 'does 問句後用原形', legacyCategory: 'sentence_structure' },
  { id: 'G.PS.short_answer', domain: 'G', label: '簡答的助動詞要對應主詞', legacyCategory: 'sentence_structure' },
  { id: 'FMT.choose_correct', domain: 'FMT', label: '「選正確的句子」要逐項檢查四句', legacyCategory: 'context_carelessness' },
  { id: 'V.COLLOC', domain: 'V', label: '搭配詞（catch a cold、heavy traffic jam）', legacyCategory: 'content_comprehension' },
  { id: 'V.CONFUSE', domain: 'V', label: '易混單字辨析（cold／sick／cough）', legacyCategory: 'content_comprehension' },
  { id: 'V.POS_SLOT', domain: 'V', label: '詞性位置（are 後接形容詞、you 後接動詞）', legacyCategory: 'content_comprehension' },
  { id: 'V.POLYSEMY', domain: 'V', label: '一字多義（still：仍然／靜止）', legacyCategory: 'content_comprehension' },
];

export const SKILL_IDS: string[] = ALL_SKILLS.map((s) => s.id);

const BY_ID = new Map(ALL_SKILLS.map((s) => [s.id, s]));

export function getSkill(id: string): SkillTag | undefined {
  return BY_ID.get(id);
}
