import { MistakeRecord } from './types';
import data20260929 from './data/2026-09-29';
import data20261002 from './data/2026-10-02';
import data20261006 from './data/2026-10-06';
import data20261013 from './data/2026-10-13';

// Flat list across every imported exam, newest exam last. Add a new
// data/<exam-date>.ts + one import line here for each new exam (mirrors
// services/topicReview/index.ts and examReviewSets.ts).
export const ALL_MISTAKES: MistakeRecord[] = [
  ...data20260929,
  ...data20261002,
  ...data20261006,
  ...data20261013,
];

export function getMistakesByCategory(category: MistakeRecord['errorCategory']): MistakeRecord[] {
  return ALL_MISTAKES.filter((m) => m.errorCategory === category);
}
