/**
 * Topic-focused review content, built directly from a textbook passage —
 * different from mistakeBook (which logs mistakes a child actually made on
 * a real exam). This is proactive practice: questions written to drill a
 * concept the mistake book shows is weak (see services/mistakeBook), using
 * the exact wording/sequence from the textbook so practice matches what's
 * actually taught, not a generic paraphrase.
 */

export type ReviewQuestionType = 'true_false' | 'fill_blank' | 'multiple_choice';

export interface ReviewQuestion {
  id: string;
  questionText: string;
  options?: string[];       // required for true_false ("True"/"False") and multiple_choice
  correctAnswer: string;
  explanation: string;      // parent-friendly Chinese, references the source sentence
  sourceSentence: string;   // the exact textbook sentence this question is built from
  questionType: ReviewQuestionType;
  icon?: string;            // single emoji shown on the quiz card as a visual hint (not a textbook image — we can't reproduce those)
  image?: string;           // path under public/ to a real photo (e.g. a landmark); takes priority over icon when both are set
  imageCredit?: string;     // "Photographer, CC BY-SA X.X, via Wikimedia Commons" — shown as a small caption under the photo
}

export interface GlossaryEntry {
  term: string;   // the English word/phrase as it appears in sourceText
  icon?: string;   // emoji illustrating it (used when there's no real photo)
  zh?: string;    // short Chinese gloss, shown under the icon/photo
  image?: string; // path under public/ to a real photo; takes priority over icon when both are set
  imageCredit?: string; // "Photographer, CC BY-SA X.X, via Wikimedia Commons"
}

export interface ReviewFact {
  label: string; // e.g. 'Country'
  value: string; // e.g. 'Turkey (Istanbul)'
}

export interface ReviewFactCard {
  title: string;        // English name, e.g. 'The Sapphire Building'
  image?: string;
  imageCredit?: string;
  facts: ReviewFact[];   // shown stacked top-to-bottom next to the photo; English only — Chinese explanations live in the quiz's per-question explanation, not on the card
}

export interface ReviewNoteExample {
  text: string;   // displayed line, e.g. '1975 → "nineteen seventy-five"'
  speak: string;  // what to read aloud via speechSynthesis, e.g. 'nineteen seventy-five'
}

export interface ReviewNote {
  title: string;
  body?: string;               // intro sentence, Chinese
  examples?: ReviewNoteExample[]; // each gets its own 🔊 pronunciation button
}

export interface ReviewChapter {
  id: string;
  title: string;
  sourceRef: string;        // textbook + unit/lesson, for traceability
  sourceText: string;       // the full passage, verbatim (kept for traceability; not always rendered — see factCards)
  questions: ReviewQuestion[];
  glossary?: GlossaryEntry[];   // visual legend shown next to the passage, for narrative-style chapters (water cycle, weather)
  factCards?: ReviewFactCard[]; // one-card-per-item layout for list/fact-style chapters (e.g. famous buildings) — used INSTEAD of glossary+sourceText when present, since a wall of unrelated facts isn't discussable the way a narrative passage is
  notes?: ReviewNote[];         // supplementary teaching points not tied to one fact card (e.g. "how to say dates aloud")
}
