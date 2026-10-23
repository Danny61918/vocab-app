import { ReviewChapter } from './types';
import waterCycle from './data/water-cycle';
import ukWeather from './data/uk-weather';
import famousBuildings from './data/famous-buildings';
import confusableConnectorPhrases from './data/confusable-connector-phrases';
import possessiveFormsReview from './data/possessive-forms-review';

// CLIL ("Content and Language Integrated Learning") reading passages recur
// roughly once per unit — water-cycle is just the first one. Add a new
// data/<chapter-id>.ts + one import line here for each new passage; nothing
// else should need to change (mirrors how EXAM_REVIEW_SETS in
// examReviewSets.ts is a flat list that grows the same way).
//
// confusable-connector-phrases isn't a CLIL passage — it's built straight
// from services/mistakeBook's recurring errors (see that file's header
// comment) instead of one textbook unit. Chapters built this way (from
// mistake patterns rather than a passage) belong here too.
export const TOPIC_REVIEW_CHAPTERS: ReviewChapter[] = [waterCycle, ukWeather, famousBuildings, confusableConnectorPhrases, possessiveFormsReview];

export function getTopicReviewChapter(id: string): ReviewChapter | undefined {
  return TOPIC_REVIEW_CHAPTERS.find((c) => c.id === id);
}
