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
export interface ExamReviewDayGroup {
  label: string;      // e.g. "Monday (10/12)" — as printed on the school sheet
  wordIds: number[];
}

export interface ExamReviewSet {
  id: string;
  label: string;     // shown in the UI, e.g. "10/13 大考複習"
  examDate: string;  // 'YYYY-MM-DD' — NOTE: still unconfirmed as of 2026-10-15.
                      // Originally guessed as 10/13; that already proved wrong
                      // once (see git history — the sheet's own day labels run
                      // through 10/16, and the 10/13 date silently expired the
                      // whole exam-review feature a couple days before she was
                      // actually done using it, since getActiveExamReviewSets
                      // hides a set once `today > examDate`). Bumped to 10/16
                      // as a grounded guess (last day actually printed on the
                      // sheet) with a grace buffer added below so a future
                      // wrong guess fails open instead of vanishing the
                      // feature outright. Still needs confirming against the
                      // school contact book — don't trust this for
                      // schedule-sensitive copy until confirmed.
  wordIds: number[]; // serverData ids, all days combined
  // Optional day-by-day breakdown, exactly as grouped on the school's own
  // sheet (e.g. "Level 7 Week 7" handout, Mon/Wed/Thu/Fri, 20 words/day).
  // Only add this when the source sheet actually has day labels — don't
  // invent a grouping from each word's unrelated historical serverData date
  // (that caused a bug once already, see git history).
  dayGroups?: ExamReviewDayGroup[];
}

export const EXAM_REVIEW_SETS: ExamReviewSet[] = [
  {
    id: 'exam-2026-10-16',
    label: '10/16 大考複習',
    examDate: '2026-10-16',
    wordIds: [897,974,931,1003,735,951,453,45,866,898,338,233,977,431,401,937,474,939,940,763,1004,941,928,259,895,926,41,945,950,109,169,971,955,915,925,873,965,54,919,675,989,207,164,582,914,991,449,975,958,470,527,970,922,986,1005,1008,874,1006,1007,70,901,927,862,863,635,934,861,875,202,881,946,899,949,973,117,956,961,959,860,872],
    dayGroups: [
      {
        label: 'Monday (10/12)',
        wordIds: [897,974,931,1003,735,951,453,45,866,898,338,233,977,431,401,937,474,939,940,763],
      },
      {
        label: 'Wednesday (10/14)',
        wordIds: [1004,941,928,259,895,926,41,945,950,109,169,971,955,915,925,873,965,54,919,675],
      },
      {
        label: 'Thursday (10/15)',
        wordIds: [989,207,164,582,914,991,449,975,958,470,527,970,922,986,1005,1008,874,1006,1007,70],
      },
      {
        label: 'Friday (10/16)',
        wordIds: [901,927,862,863,635,934,861,875,202,881,946,899,949,973,117,956,961,959,860,872],
      },
    ],
  },
];

// How long a set stays visible after its (possibly wrong) examDate passes.
// examDate is often a guess, not a confirmed fact — expiring immediately
// means one wrong guess silently vanishes the whole practice feature with
// no error, which already happened once (see the note on ExamReviewSet).
// A week's grace makes that failure mode "stale label, still usable"
// instead of "gone".
const EXAM_SET_GRACE_DAYS = 7;

/** Exam sets whose date hasn't passed (+ grace period) — these show up as a practice option. */
export function getActiveExamReviewSets(today: string = new Date().toISOString().slice(0, 10)): ExamReviewSet[] {
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() - EXAM_SET_GRACE_DAYS);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  return EXAM_REVIEW_SETS.filter((s) => s.examDate >= cutoffStr);
}

function wordsForIds(ids: number[]): Word[] {
  const all = getWords();
  const byId = new Map(all.map((w) => [w.id, w]));
  return ids.map((id) => byId.get(id)).filter((w): w is Word => !!w);
}

export function getWordsForExamSet(set: ExamReviewSet): Word[] {
  return wordsForIds(set.wordIds);
}

export function getWordsForDayGroup(group: ExamReviewDayGroup): Word[] {
  return wordsForIds(group.wordIds);
}
