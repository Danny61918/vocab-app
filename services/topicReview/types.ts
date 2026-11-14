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
  lesson?: ChapterLesson;       // optional step-by-step teaching shown before the questions (see ChapterLesson)
  availableFrom?: string;       // 'YYYY-MM-DD': the chapter is hidden from the lists before this local date (e.g. a unit that goes with a later week's words)
}

// ---- Teaching lesson (shown BEFORE the practice questions, for children who find the passage hard) ----

/** One English sentence from the passage, read aloud with a Chinese meaning underneath. */
export interface LessonLine {
  en: string;       // the textbook sentence (or a short simple sentence) in English
  zh: string;       // its meaning in Chinese
  speak?: string;   // what to read aloud if it differs from en (default: en)
}

export interface LessonWord {
  term: string;     // English word or phrase
  zh: string;       // Chinese meaning
  icon?: string;    // one emoji
  tip?: string;     // how to remember / pronounce it, Chinese (e.g. "thumb 的 b 不發音")
}

/** A quick, ungraded 'think about it' check at the end of a step. Any answer just shows the hint; nothing is recorded. */
export interface LessonCheck {
  prompt: string;     // the question (English, or Chinese for concept checks)
  options: string[];  // 2-3 options, exactly one correct
  answer: string;     // must equal one option
  hintZh: string;     // shown after ANY answer: why the answer is what it is (Chinese)
}

export type LessonWidget =
  | 'pulse-calc'    // pick the number of beats counted in 10 seconds -> shows the x6 and the BPM
  | 'bpm-compare';  // six activities as bars (sleeping 68 ... skipping 140): more active = higher pulse

export interface LessonStep {
  id: string;
  title: string;            // short Chinese title
  zh: string;               // plain Chinese explanation for a 9-10 year old (short paragraphs; use \n between paragraphs)
  lines?: LessonLine[];     // sentence-by-sentence reading
  words?: LessonWord[];     // new words introduced in this step
  tryIt?: string;           // a short 'try it' for the parent and child (Chinese, with the English prompt to read aloud)
  widget?: LessonWidget;
  check?: LessonCheck;
}

export interface ChapterLesson {
  title: string;            // Chinese
  intro: string;            // 1-2 friendly Chinese sentences: what you will be able to do after the lesson
  steps: LessonStep[];      // 6-8 steps, easy to hard
}
