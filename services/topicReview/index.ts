import { ReviewChapter } from './types';
import waterCycle from './data/water-cycle';
import ukWeather from './data/uk-weather';

// CLIL ("Content and Language Integrated Learning") reading passages recur
// roughly once per unit — water-cycle is just the first one. Add a new
// data/<chapter-id>.ts + one import line here for each new passage; nothing
// else should need to change (mirrors how EXAM_REVIEW_SETS in
// examReviewSets.ts is a flat list that grows the same way).
export const TOPIC_REVIEW_CHAPTERS: ReviewChapter[] = [waterCycle, ukWeather];

export function getTopicReviewChapter(id: string): ReviewChapter | undefined {
  return TOPIC_REVIEW_CHAPTERS.find((c) => c.id === id);
}
