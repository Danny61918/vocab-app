import { Word } from '../types';
import { getWords } from './storage';

/**
 * Curated word lists for an upcoming big test (大考), built from the
 * school's own "Vocabulary Review for Big Test" sheet — which is a
 * cumulative review across many past weeks, not just that week's new
 * words. Most of a review sheet's words are usually already in
 * serverData; this just names the exact scope so practice isn't left to
 * the SRS engine's due-date schedule (which won't necessarily surface
 * everything in time for a specific exam date).
 *
 * Add a new entry here for each future big test's review sheet.
 */
export interface ExamReviewSet {
  id: string;
  label: string;     // shown in the UI, e.g. "10/13 大考複習"
  examDate: string;  // 'YYYY-MM-DD'
  wordIds: number[]; // serverData ids
}

export const EXAM_REVIEW_SETS: ExamReviewSet[] = [
  {
    id: 'exam-2026-10-13',
    label: '10/13 大考複習',
    examDate: '2026-10-13',
    wordIds: [897,974,931,1003,735,951,453,45,866,898,338,233,977,431,401,937,474,939,940,763,1004,941,928,259,895,926,41,945,950,109,169,971,955,915,925,873,965,54,919,675,989,207,164,582,914,991,449,975,958,470,527,970,922,986,1005,1008,874,1006,1007,70,901,927,862,863,635,934,861,875,202,881,946,899,949,973,117,956,961,959,860,872],
  },
];

/** Exam sets whose date hasn't passed yet — only these show up as a practice option. */
export function getActiveExamReviewSets(today: string = new Date().toISOString().slice(0, 10)): ExamReviewSet[] {
  return EXAM_REVIEW_SETS.filter((s) => s.examDate >= today);
}

export function getWordsForExamSet(set: ExamReviewSet): Word[] {
  const all = getWords();
  const byId = new Map(all.map((w) => [w.id, w]));
  return set.wordIds.map((id) => byId.get(id)).filter((w): w is Word => !!w);
}
