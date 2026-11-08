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
  { id: 'V.PHRASE', domain: 'V', label: '片語與連接用語（at a time、as well as、all the time、after all）', legacyCategory: 'content_comprehension' },
  { id: 'V.CONTEXT', domain: 'V', label: '依句中線索選單字（relax、interview、several、trip、pirate）', legacyCategory: 'content_comprehension' },
  { id: 'G.POSS.their_its', domain: 'G', label: '所有格 their／its／theirs／it\'s 的區別', legacyCategory: 'plural_possessive' },
  { id: 'G.PROG.present_continuous', domain: 'G', label: '現在進行式（at the moment、now → be + V-ing）', legacyCategory: 'verb_tense' },
  { id: 'M.COMMA.series', domain: 'M', label: '三個以上動作並列的逗號（A, B and C）', legacyCategory: 'sentence_structure' },
  { id: 'M.SPELL.careful_copy', domain: 'M', label: '抄寫與拼字要逐字核對（mother、would、too）', legacyCategory: 'spelling' },
  { id: 'R.MAIN_IDEA', domain: 'R', label: '閱讀：選最適合的標題／主旨', legacyCategory: 'content_comprehension' },
  { id: 'R.INFER', domain: 'R', label: '閱讀：推論人物的感受與擔心', legacyCategory: 'content_comprehension' },
  { id: 'R.DETAIL', domain: 'R', label: '閱讀：依文章細節判斷（誰、哪一句正確）', legacyCategory: 'content_comprehension' },
  { id: 'R.CLIL.science', domain: 'R', label: '科普內容（水循環、方格複製圖片）', legacyCategory: 'content_comprehension' },
  { id: 'G.POSS.apostrophe_s', domain: 'G', label: "所有格 's／s'／of（woman's、women's、pigs'）", legacyCategory: 'plural_possessive' },
  { id: 'G.PLURAL.noun_form', domain: 'G', label: '名詞複數形（watermelons、shelves）', legacyCategory: 'plural_possessive' },
  { id: 'G.COUNT.uncountable', domain: 'G', label: '可數／不可數名詞（some、any、is／are）', legacyCategory: 'plural_possessive' },
  { id: 'G.BE.agreement', domain: 'G', label: 'be 動詞要對應主詞（There is／are、a pair of）', legacyCategory: 'plural_possessive' },
  { id: 'G.PRON.reference', domain: 'G', label: '代名詞的種類與指涉（these／they）', legacyCategory: 'pronoun_reference' },
  { id: 'G.MODAL.base_verb', domain: 'G', label: '助動詞（can、can\'t）後面接動詞原形', legacyCategory: 'verb_tense' },
  { id: 'M.CAP.letter_case', domain: 'M', label: '大小寫（句首大寫、句中不大寫）', legacyCategory: 'capitalization' },
  { id: 'M.PUNCT.comma_period', domain: 'M', label: '逗號、句號與問號', legacyCategory: 'sentence_structure' },
  { id: 'M.COMBINE.missing_words', domain: 'M', label: '合併句子時漏字、多字、漏冠詞', legacyCategory: 'sentence_structure' },
  { id: 'M.SPELL.ing_form', domain: 'M', label: '加 -ing 的拼字規則（去 e、重複字尾、ie→y）', legacyCategory: 'spelling' },
  { id: 'FMT.careless', domain: 'FMT', label: '粗心：漏作答、重複作答、看錯題目', legacyCategory: 'context_carelessness' },
  { id: 'R.CLIL.numbers', domain: 'R', label: '數字、年份與日期的唸法', legacyCategory: 'content_comprehension' },
  { id: 'R.CLIL.landmarks', domain: 'R', label: '世界地標與常識（比薩斜塔、艾菲爾鐵塔）', legacyCategory: 'content_comprehension' },
];

export const SKILL_IDS: string[] = ALL_SKILLS.map((s) => s.id);

const BY_ID = new Map(ALL_SKILLS.map((s) => [s.id, s]));

export function getSkill(id: string): SkillTag | undefined {
  return BY_ID.get(id);
}
