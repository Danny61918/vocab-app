import { describe, expect, it } from 'vitest';
import { EXAM_REVIEW_SETS, getActiveExamReviewSets } from '../examReviewSets';

describe('getActiveExamReviewSets 大考複習入口', () => {
  it('a finished exam (closed) no longer shows, even inside the grace period', () => {
    const set = EXAM_REVIEW_SETS.find((s) => s.id === 'exam-2026-10-28')!;
    expect(set.closed).toBe(true);
    expect(getActiveExamReviewSets('2026-10-29').map((s) => s.id)).not.toContain(set.id);
    expect(getActiveExamReviewSets('2026-11-04')).toEqual([]);
  });

  it('an open set still shows until its grace period ends, then expires by itself', () => {
    const open = { ...EXAM_REVIEW_SETS[0], id: 'tmp', examDate: '2030-01-10', closed: undefined };
    EXAM_REVIEW_SETS.push(open);
    try {
      expect(getActiveExamReviewSets('2030-01-05').map((s) => s.id)).toContain('tmp');
      expect(getActiveExamReviewSets('2030-01-17').map((s) => s.id)).toContain('tmp'); // +7 days
      expect(getActiveExamReviewSets('2030-01-18').map((s) => s.id)).not.toContain('tmp');
    } finally {
      EXAM_REVIEW_SETS.pop();
    }
  });
});
