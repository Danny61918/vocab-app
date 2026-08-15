/**
 * P3/TASK-10 — Letter-tile spelling component.
 *
 * Shows the target word's letters shuffled together with 2–3 distractor letters.
 * The child taps tiles in order to spell the word. Tap a placed tile to un-place it.
 *
 * Props:
 *   targetWord  — the correct English word/phrase to spell
 *   hint        — the Chinese meaning shown as a hint
 *   partOfSpeech — part of speech tag
 *   clozeMask   — optional mask like "_ _ n i g _ t" to show partial letters
 *   onComplete  — called with (isCorrect: boolean) when the child fills all slots
 *   disabled    — lock input during feedback
 */

import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  targetWord: string;
  hint?: string;
  partOfSpeech?: string;
  clozeMask?: string;
  onComplete: (isCorrect: boolean, spelled: string) => void;
  disabled?: boolean;
}

// Generate 2–3 distractor letters that are plausible (common English letters)
function generateDistractors(word: string, count: number = 2): string[] {
  const common = 'etaoinsrhldcumfpgwybvkxjqz';
  const wordLetters = new Set(word.toLowerCase().replace(/[^a-z]/g, '').split(''));
  const pool = common.split('').filter((c) => !wordLetters.has(c));
  const result: string[] = [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  for (const c of shuffled) {
    if (result.length >= count) break;
    result.push(c);
  }
  return result;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LetterTiles: React.FC<Props> = ({
  targetWord,
  hint,
  partOfSpeech,
  clozeMask,
  onComplete,
  disabled = false,
}) => {
  // Only use alphabetic characters for the tiles
  const targetLetters = useMemo(
    () => targetWord.toLowerCase().replace(/[^a-z]/g, '').split(''),
    [targetWord]
  );

  const distractorCount = targetLetters.length <= 4 ? 2 : 3;

  // Each tile has a unique id so duplicates are trackable
  const allTiles = useMemo(() => {
    const distractors = generateDistractors(targetWord, distractorCount);
    const tiles = [
      ...targetLetters.map((letter, i) => ({ id: `t-${i}`, letter })),
      ...distractors.map((letter, i) => ({ id: `d-${i}`, letter })),
    ];
    return shuffleArray(tiles);
  }, [targetWord, targetLetters, distractorCount]);

  // Placed tile ids in order
  const [placed, setPlaced] = useState<string[]>([]);
  const [shakeSlot, setShakeSlot] = useState<number | null>(null);

  // Reset when target word changes
  useEffect(() => {
    setPlaced([]);
    setShakeSlot(null);
  }, [targetWord]);

  const placedLetters = placed.map((id) => allTiles.find((t) => t.id === id)!.letter);
  const usedIds = new Set(placed);

  // Check completion
  useEffect(() => {
    if (disabled) return;
    if (placedLetters.length === targetLetters.length) {
      const spelled = placedLetters.join('');
      const correct = targetLetters.join('');
      onComplete(spelled === correct, spelled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed.length, targetLetters.length, disabled]);

  const handleTileTap = (tileId: string) => {
    if (disabled) return;
    if (usedIds.has(tileId)) return; // already placed
    if (placed.length >= targetLetters.length) return;
    setPlaced((prev) => [...prev, tileId]);
  };

  const handleSlotTap = (slotIndex: number) => {
    if (disabled) return;
    // Remove this and all tiles after it (undo from this point)
    setPlaced((prev) => prev.slice(0, slotIndex));
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Hint */}
      {hint && (
        <div className="text-center">
          <span className="text-2xl font-black text-gray-700">{hint}</span>
          {partOfSpeech && (
            <span className="text-lg text-gray-400 ml-2 italic">({partOfSpeech})</span>
          )}
        </div>
      )}

      {/* Cloze mask if provided */}
      {clozeMask && (
        <div className="text-4xl font-mono tracking-[0.3em] font-black text-slate-800 bg-white py-4 px-6 rounded-2xl shadow-inner border-2 border-slate-100 uppercase text-center">
          {clozeMask}
        </div>
      )}

      {/* Answer slots */}
      <div className="flex gap-2 flex-wrap justify-center min-h-[4rem]">
        {targetLetters.map((_, i) => {
          const placedTile = placed[i] ? allTiles.find((t) => t.id === placed[i]) : null;
          const isShaking = shakeSlot === i;

          return (
            <button
              key={i}
              onClick={() => handleSlotTap(i)}
              disabled={disabled || !placedTile}
              className={`
                w-12 h-14 md:w-14 md:h-16 rounded-xl border-4 text-2xl md:text-3xl font-black
                uppercase transition-all duration-150
                ${
                  placedTile
                    ? 'bg-blue-500 text-white border-blue-600 shadow-lg hover:bg-blue-400 cursor-pointer'
                    : 'bg-white border-dashed border-gray-300'
                }
                ${isShaking ? 'animate-[shake_0.3s_ease-in-out]' : ''}
              `}
            >
              {placedTile?.letter ?? ''}
            </button>
          );
        })}
      </div>

      {/* Letter tile pool */}
      <div className="flex gap-2 flex-wrap justify-center">
        {allTiles.map((tile) => {
          const isUsed = usedIds.has(tile.id);
          return (
            <button
              key={tile.id}
              onClick={() => handleTileTap(tile.id)}
              disabled={disabled || isUsed}
              className={`
                w-12 h-14 md:w-14 md:h-16 rounded-xl border-b-4 text-2xl md:text-3xl font-black
                uppercase transition-all duration-150
                ${
                  isUsed
                    ? 'bg-gray-200 text-gray-300 border-gray-200 cursor-default'
                    : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 active:border-b-0 active:translate-y-1 cursor-pointer shadow-md'
                }
              `}
            >
              {tile.letter}
            </button>
          );
        })}
      </div>

      {/* Clear button */}
      {placed.length > 0 && !disabled && (
        <button
          onClick={() => setPlaced([])}
          className="text-lg font-bold text-gray-400 hover:text-red-500 transition-colors"
        >
          🔄 重來
        </button>
      )}
    </div>
  );
};

export default LetterTiles;
