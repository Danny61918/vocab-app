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
}

export interface ReviewChapter {
  id: string;
  title: string;
  sourceRef: string;        // textbook + unit/lesson, for traceability
  sourceText: string;       // the full passage, verbatim
  questions: ReviewQuestion[];
}
