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

export interface ReviewChapter {
  id: string;
  title: string;
  sourceRef: string;        // textbook + unit/lesson, for traceability
  sourceText: string;       // the full passage, verbatim
  questions: ReviewQuestion[];
  glossary?: GlossaryEntry[]; // visual legend shown alongside the passage (emoji or a real freely-licensed photo), since we can't show the textbook's own photos
}
