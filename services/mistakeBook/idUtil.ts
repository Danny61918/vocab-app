/**
 * Deterministic id generation for MistakeRecord — NOT a running counter.
 * The same (examDate, questionText, correctAnswer) must always produce the
 * same id, so re-importing the same exam (accidentally pasted twice, or a
 * re-run with a clearer photo) can be detected as a duplicate rather than
 * silently creating a second copy that the spaced-repetition scheduler then
 * treats as two unrelated weaknesses.
 */

// FNV-1a 32-bit — small, fast, good enough distribution for this volume
// (dozens to low hundreds of records, not a security hash).
function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function idForMistake(examDate: string, questionText: string, correctAnswer: string): string {
  const hash = fnv1a(`${examDate}|${questionText}|${correctAnswer}`).toString(36);
  return `${examDate}_${hash}`;
}
