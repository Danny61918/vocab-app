/**
 * Maps Gemini's free-text `error_type` onto the fixed ErrorCategory taxonomy
 * (see types.ts). This is the single place that decision gets made, so it
 * stays consistent across separate imports/sessions instead of being
 * re-judged ad hoc each time.
 *
 * Add a new rule here whenever a new exam produces an error_type string that
 * doesn't match anything below — don't let records silently pile up under
 * 'other'. Matching is substring/case-insensitive against Gemini's raw text,
 * tried in order, first match wins.
 */
import type { ErrorCategory } from './types';

interface Rule {
  pattern: RegExp;
  category: ErrorCategory;
}

// Each inline comment is a real error_type string Gemini has produced,
// kept here as a worked example for whoever (or whichever future session)
// adds the next rule.
const RULES: Rule[] = [
  { pattern: /capitali[sz]ation/i, category: 'capitalization' }, // "Capitalization" (letter case only)
  { pattern: /possessive|plural|uncountable|it's.{0,3}its|its.{0,3}it's/i, category: 'plural_possessive' }, // "Grammar (Irregular Plural / Uncountable Nouns)", "Plural Possessive Nouns", "混淆 it's 與 its 的意思"
  { pattern: /preposition/i, category: 'preposition' },
  { pattern: /tense/i, category: 'verb_tense' },
  { pattern: /pronoun/i, category: 'pronoun_reference' }, // explicit pronoun-antecedent wording only — NOT "reading comprehension" alone, see note below
  { pattern: /reading comprehension|comprehension|科學|科普|CLIL|一字多義|文章細節/i, category: 'content_comprehension' }, // "對自然科學的英文描述理解錯誤", "未根據上下文判斷字義", "未看清題目關鍵字或忽略文章細節"
  { pattern: /context|careless|未知|推測|漏作答/i, category: 'context_carelessness' }, // "Context / Carelessness", "粗心漏作答"
  { pattern: /spelling/i, category: 'spelling' },
  { pattern: /逗號|句號|punctuation|comma|period/i, category: 'sentence_structure' }, // "漏寫連接詞前的逗號", "漏寫句尾句號" — comma/period mechanics, not letter case
  { pattern: /conjunction|sentence structure|rewrite|combine/i, category: 'sentence_structure' },
];

/**
 * NOTE: pronoun_reference vs content_comprehension needs real judgment, not
 * just regex — both can show up under Gemini's "Reading Comprehension" /
 * "閱讀測驗" label. pronoun_reference is specifically "who/what does this
 * pronoun point back to" (a grammar/logic skill); content_comprehension is
 * everything else about understanding a passage (facts, vocab-in-context,
 * finding a detail). When error_type doesn't explicitly say "pronoun",
 * read teacher_explanation before trusting the default here — e.g. a CLIL
 * science-fact question and a "which city" detail question are both
 * content_comprehension even though Gemini may have called both "Reading
 * Comprehension".
 *
 * A single answer can also have multiple real issues at once (e.g. a
 * sentence-combining answer with both a capitalization slip AND a missing
 * period). Pick the most pedagogically primary one; the full story is
 * always still in teacherExplanation regardless of which category the
 * record is filed under.
 */
export function mapErrorType(rawErrorType: string): ErrorCategory {
  for (const rule of RULES) {
    if (rule.pattern.test(rawErrorType)) return rule.category;
  }
  return 'other';
}
