import { vocabData } from '../../newVocabData';
import { ALL_CONFUSION_SETS, getConfusionSet } from '../confusionSets';
import { getSkill } from '../skills';
import { DrillItem } from './types';

/**
 * 變化題的結構驗證。抓得到：空格數、選項重複、中英混雜、查無單字、未登記技能。
 * 抓不到：語意歧義（兩個答案都說得通）——那一道靠盲解 + 家長確認（TASKS.md GATE-A）。
 */
const CJK = /[㐀-鿿]/;
const LABEL = /^\(?[a-dA-D]\)\s*/;
const ID_FORMAT = /^.+#v\d+$/;

const norm = (s: string) => s.trim().toLowerCase();
const KNOWN_WORDS = new Set(vocabData.map((v) => norm(v.word)));

export function validateDrillItem(item: DrillItem): string[] {
  const out: string[] = [];
  const fail = (msg: string) => out.push(`${item.id}: ${msg}`);

  if (!ID_FORMAT.test(item.id)) fail('id must look like "<seed>#v<n>"');
  if (![1, 2, 3].includes(item.difficulty)) fail('difficulty must be 1, 2 or 3');

  const blanks = item.stem.match(/_+/g) ?? [];
  if (blanks.length !== 1 || blanks[0] !== '___') fail('stem must contain exactly one blank "___"');
  if (/[A-Za-z]___|___[A-Za-z]/.test(item.stem)) fail('blank is glued to letters (e.g. "___ing")');

  const optionTexts = [item.answer, ...item.distractors.map((d) => d.text)];
  if (item.distractors.length < 2) fail('needs at least two distractors');
  if (optionTexts.some((t) => LABEL.test(t))) fail('options must not carry (a)/(b) labels');
  const seen = new Set<string>();
  for (const t of optionTexts) {
    const k = norm(t.replace(LABEL, ''));
    if (seen.has(k)) fail(`duplicate option "${t}" (the answer must appear exactly once)`);
    seen.add(k);
  }

  const fits = new Set((item.alsoFits ?? []).map(norm));
  for (const d of item.distractors) {
    if (fits.has(norm(d.text))) fail(`distractor "${d.text}" is also in alsoFits`);
  }

  if ([item.stem, ...optionTexts].some((t) => CJK.test(t))) fail('stem/options must be English (found Chinese characters)');
  if (!CJK.test(item.explanation)) fail('explanation must be written in Chinese');

  for (const w of item.targetWords ?? []) {
    if (w !== norm(w) || !KNOWN_WORDS.has(w)) fail(`targetWords "${w}" must be normalized and exist in the vocab list`);
  }

  if (item.skillIds.length === 0) fail('skillIds must not be empty');
  for (const id of item.skillIds) {
    if (!getSkill(id)) fail(`skill "${id}" is not registered in skills.ts`);
  }
  if (item.confusionSetId && !getConfusionSet(item.confusionSetId)) {
    fail(`confusion set "${item.confusionSetId}" is not registered`);
  }

  return out;
}

const MIN_ITEMS_PER_CONFUSION_WORD = 2;

export function validateDrillBank(items: DrillItem[]): string[] {
  const out: string[] = [];

  const seen = new Set<string>();
  for (const it of items) {
    if (seen.has(it.id)) out.push(`duplicate id ${it.id}`);
    seen.add(it.id);
  }

  for (const set of ALL_CONFUSION_SETS) {
    for (const word of set.words) {
      const mine = items.filter((i) => i.confusionSetId === set.id && norm(i.answer) === word);
      const clues = new Set(mine.map((i) => i.clue).filter(Boolean));
      if (mine.length < MIN_ITEMS_PER_CONFUSION_WORD) {
        out.push(`${set.id}: "${word}" has ${mine.length} item(s), needs at least ${MIN_ITEMS_PER_CONFUSION_WORD}`);
      } else if (clues.size < 2) {
        out.push(`${set.id}: "${word}" items all use the same clue; need at least two different clues`);
      }
    }
  }

  return out;
}
