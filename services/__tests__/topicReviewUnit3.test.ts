import { describe, expect, it } from 'vitest';
import { TOPIC_REVIEW_CHAPTERS, getVisibleTopicReviewChapters } from '../topicReview';
import { isReviewAnswerCorrect } from '../topicReview/answerCheck';
import { ReviewQuestion } from '../topicReview/types';
import { getSkill } from '../mistakeBook/skills';
import { vocabData } from '../newVocabData';

const UNIT3 = TOPIC_REVIEW_CHAPTERS.filter((c) => c.id.startsWith('u3-'));
const CJK = /[㐀-鿿]/;

describe('Unit 3 CLIL chapters', () => {
  it('has the five chapters with 48 questions', () => {
    expect(UNIT3.map((c) => c.id)).toEqual(['u3-concert-story', 'u3-should-advice', 'u3-healthy-living', 'u3-pulse-how', 'u3-pulse-bpm']);
    expect(UNIT3.reduce((n, c) => n + c.questions.length, 0)).toBe(48);
  });

  it('question ids are unique across every chapter', () => {
    const ids = TOPIC_REVIEW_CHAPTERS.flatMap((c) => c.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every question is well-formed and has exactly one acceptable answer', () => {
    for (const c of UNIT3) {
      for (const q of c.questions) {
        const where = `${c.id}/${q.id}`;
        expect(q.explanation && CJK.test(q.explanation), `${where} explanation must be Chinese`).toBeTruthy();
        expect(q.sourceSentence.trim().length, `${where} sourceSentence`).toBeGreaterThan(0);
        if (q.questionType === 'true_false') {
          expect(q.options, where).toEqual(['True', 'False']);
          expect(['True', 'False'], where).toContain(q.correctAnswer);
        } else if (q.questionType === 'multiple_choice') {
          const opts = q.options ?? [];
          expect(opts.length, `${where} option count`).toBeGreaterThanOrEqual(2);
          expect(opts.length, `${where} option count`).toBeLessThanOrEqual(4);
          expect(new Set(opts.map((o) => o.toLowerCase())).size, `${where} duplicate options`).toBe(opts.length);
          expect(opts.filter((o) => o === q.correctAnswer).length, `${where} answer must appear exactly once`).toBe(1);
        } else {
          expect(q.questionType, where).toBe('fill_blank');
          expect(q.correctAnswer, `${where} spelling answer: lowercase letters only (the letter tiles cannot hold other characters)`).toMatch(/^[a-z]+$/);
          expect((q.questionText.match(/_+/g) ?? []).length, `${where} exactly one blank`).toBe(1);
        }
      }
    }
  });

  it('does not always put the correct answer first (options are not shuffled)', () => {
    const mc = UNIT3.flatMap((c) => c.questions).filter((q) => q.questionType === 'multiple_choice');
    const pos = [0, 0, 0, 0];
    for (const q of mc) pos[(q.options ?? []).indexOf(q.correctAnswer)]++;
    expect(pos[0]).toBeLessThan(mc.length * 0.5);
    expect(pos[1]).toBeGreaterThan(0);
    expect(pos[2]).toBeGreaterThan(0);
  });

  it('the child never sees remarks aimed at the parent in an explanation', () => {
    for (const c of UNIT3) for (const q of c.questions) expect(q.explanation, q.id).not.toMatch(/考卷|家長|盲解|草稿|11\/0\d|11\/1\d/);
  });

  it('every chapter has a glossary and at least one note with a sound example', () => {
    for (const c of UNIT3) {
      expect((c.glossary ?? []).length, c.id).toBeGreaterThan(0);
      const notes = c.notes ?? [];
      expect(notes.length, c.id).toBeGreaterThan(0);
      expect(notes.some((n) => (n.examples ?? []).length > 0), c.id).toBe(true);
    }
  });
});

describe('isReviewAnswerCorrect', () => {
  const fb = (correctAnswer: string): ReviewQuestion => ({
    id: 't', questionText: 'x ___', correctAnswer, explanation: '說明', sourceSentence: 'x', questionType: 'fill_blank',
  });
  it('compares spelling answers on letters only, so multi-word answers work', () => {
    expect(isReviewAnswerCorrect(fb('junk food'), 'junkfood')).toBe(true);
    expect(isReviewAnswerCorrect(fb('junk food'), 'JUNK FOOD')).toBe(true);
    expect(isReviewAnswerCorrect(fb('junk food'), 'junkfoot')).toBe(false);
    expect(isReviewAnswerCorrect(fb('rest'), 'rest')).toBe(true);
    expect(isReviewAnswerCorrect(fb('rest'), 'best')).toBe(false);
  });
  it('multiple choice and true/false still need an exact match', () => {
    const mc: ReviewQuestion = { ...fb('five'), questionType: 'multiple_choice', options: ['five', 'six'] };
    expect(isReviewAnswerCorrect(mc, 'five')).toBe(true);
    expect(isReviewAnswerCorrect(mc, 'Five')).toBe(false);
  });
});

describe('getVisibleTopicReviewChapters', () => {
  it('hides the pulse chapters until 2026-11-16 and shows everything else', () => {
    const before = getVisibleTopicReviewChapters(new Date(2026, 10, 15, 23, 59)).map((c) => c.id);
    expect(before).not.toContain('u3-pulse-how');
    expect(before).not.toContain('u3-pulse-bpm');
    expect(before).toContain('u3-concert-story');
    expect(before).toContain('water-cycle');
    const after = getVisibleTopicReviewChapters(new Date(2026, 10, 16, 0, 0)).map((c) => c.id);
    expect(after).toContain('u3-pulse-how');
    expect(after).toContain('u3-pulse-bpm');
  });
});

describe('Unit 3 support data', () => {
  it('registers the should skill', () => {
    expect(getSkill('G.MODAL.should')).toBeDefined();
  });
  it('adds the unit words to the SRS bank once each', () => {
    for (const w of ['gently', 'vegetables', 'teeth', 'tired', 'late', 'nearly', "what's the matter?", 'sit still', 'beats per minute']) {
      expect(vocabData.filter((v) => v.word.toLowerCase() === w).length, w).toBe(1);
    }
  });
});

describe('Pulse teaching lesson', () => {
  const pulse = UNIT3.filter((c) => c.id.startsWith('u3-pulse'));
  const lesson = pulse[0]?.lesson;

  it('both pulse chapters carry the same lesson, and no other unit-3 chapter does', () => {
    expect(pulse.length).toBe(2);
    expect(pulse[0].lesson).toBeDefined();
    expect(pulse[1].lesson).toBe(pulse[0].lesson);
    expect(UNIT3.filter((c) => !c.id.startsWith('u3-pulse')).every((c) => !c.lesson)).toBe(true);
  });

  it('has 6-8 steps with unique ids, Chinese explanations and well-formed checks', () => {
    expect(lesson).toBeDefined();
    const steps = lesson!.steps;
    expect(steps.length).toBeGreaterThanOrEqual(6);
    expect(steps.length).toBeLessThanOrEqual(8);
    expect(new Set(steps.map((s) => s.id)).size).toBe(steps.length);
    expect(CJK.test(lesson!.title) && CJK.test(lesson!.intro)).toBe(true);
    for (const s of steps) {
      expect(CJK.test(s.zh), `${s.id} zh`).toBe(true);
      for (const l of s.lines ?? []) {
        expect(l.en.trim().length, `${s.id} line en`).toBeGreaterThan(0);
        expect(CJK.test(l.zh), `${s.id} line zh: ${l.en}`).toBe(true);
      }
      for (const w of s.words ?? []) expect(CJK.test(w.zh), `${s.id} word ${w.term}`).toBe(true);
      if (s.check) {
        expect(s.check.options.length, `${s.id} options`).toBeGreaterThanOrEqual(2);
        expect(s.check.options.length, `${s.id} options`).toBeLessThanOrEqual(3);
        expect(s.check.options.filter((o) => o === s.check!.answer).length, `${s.id} answer must be exactly one option`).toBe(1);
        expect(CJK.test(s.check.hintZh), `${s.id} hint`).toBe(true);
      }
    }
  });

  it('uses each built-in widget at most once and only known ones', () => {
    const widgets = lesson!.steps.map((s) => s.widget).filter(Boolean);
    expect(new Set(widgets).size).toBe(widgets.length);
    for (const w of widgets) expect(['pulse-calc', 'bpm-compare']).toContain(w);
  });

  it('the child-facing lesson has no parent-facing remarks about her mistakes or exams', () => {
    const text = JSON.stringify(lesson);
    expect(text).not.toMatch(/考卷|盲解|草稿|錯題|11\/0\d|11\/1\d/);
  });
});
