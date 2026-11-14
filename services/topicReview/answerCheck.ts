import { ReviewQuestion } from './types';

// Fill-in-the-blank answers come from LetterTiles, which returns only the letters (no spaces, apostrophes or digits).
// So a spelling answer is compared letters-only on BOTH sides: "junk food" and "junkfood" are the same answer.
const lettersOnly = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');

export function isReviewAnswerCorrect(q: ReviewQuestion, answer: string): boolean {
  if (q.questionType === 'fill_blank') return lettersOnly(answer) === lettersOnly(q.correctAnswer);
  return answer === q.correctAnswer;
}
