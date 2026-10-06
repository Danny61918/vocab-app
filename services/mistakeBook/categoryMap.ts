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
  { pattern: /capitali[sz]ation/i, category: 'capitalization' }, // "Capitalization"
  { pattern: /possessive|plural/i, category: 'plural_possessive' }, // "Grammar (Irregular Plural / Uncountable Nouns)", "Plural Possessive Nouns"
  { pattern: /preposition/i, category: 'preposition' },
  { pattern: /tense/i, category: 'verb_tense' },
  { pattern: /pronoun|reading comprehension/i, category: 'pronoun_reference' }, // "Reading Comprehension" (pronoun-antecedent mistakes land here by default — see note below)
  { pattern: /context|careless/i, category: 'context_carelessness' }, // "Context / Carelessness"
  { pattern: /spelling/i, category: 'spelling' },
  { pattern: /conjunction|sentence structure|rewrite|combine/i, category: 'sentence_structure' },
];

/**
 * NOTE: Gemini's "Reading Comprehension" label is broad — it covers both
 * pronoun-antecedent mistakes (mapped here to pronoun_reference, the most
 * common cause so far) and could in principle cover other comprehension
 * failures. If a future import's teacher_explanation describes something
 * that isn't actually a pronoun-reference issue, override the category
 * manually for that record rather than trusting this default.
 */
export function mapErrorType(rawErrorType: string): ErrorCategory {
  for (const rule of RULES) {
    if (rule.pattern.test(rawErrorType)) return rule.category;
  }
  return 'other';
}
