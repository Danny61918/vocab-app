import { MistakeRecord } from './types';
import data20260908 from './data/2026-09-08';
import data20260915 from './data/2026-09-15';
import data20260918 from './data/2026-09-18';
import data20260924 from './data/2026-09-24';
import data20260929 from './data/2026-09-29';
import data20261002 from './data/2026-10-02';
import data20261006 from './data/2026-10-06';
import data20261013 from './data/2026-10-13';
import data20261020 from './data/2026-10-20';
import data20261022 from './data/2026-10-22';
import data20261023 from './data/2026-10-23';
import data20261025 from './data/2026-10-25';
import data20261028 from './data/2026-10-28';
import data20261104 from './data/2026-11-04';
import data20261110 from './data/2026-11-10';
import data20261113 from './data/2026-11-13';
import data20261116 from './data/2026-11-16';
import data20261117 from './data/2026-11-17';
import data20261118 from './data/2026-11-18';
import data20261119 from './data/2026-11-19';
import data20261120 from './data/2026-11-20';
import data20261124 from './data/2026-11-24';

// Flat list across every imported exam, newest exam last. Add a new
// data/<exam-date>.ts + one import line here for each new exam (mirrors
// services/topicReview/index.ts and examReviewSets.ts).
export const ALL_MISTAKES: MistakeRecord[] = [
  ...data20260908,
  ...data20260915,
  ...data20260918,
  ...data20260924,
  ...data20260929,
  ...data20261002,
  ...data20261006,
  ...data20261013,
  ...data20261020,
  ...data20261022,
  ...data20261023,
  ...data20261025,
  ...data20261028,
  ...data20261104,
  ...data20261110,
  ...data20261113,
  ...data20261116,
  ...data20261117,
  ...data20261118,
  ...data20261119,
  ...data20261120,
  ...data20261124,
];

export function getMistakesByCategory(category: MistakeRecord['errorCategory']): MistakeRecord[] {
  return ALL_MISTAKES.filter((m) => m.errorCategory === category);
}
