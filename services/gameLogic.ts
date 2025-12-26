import { Word, Difficulty, Question, GameType } from '../types';

// Fisher-Yates Shuffle for true randomness
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Helper to generate fake typo words for Hard Mode
const generateTypos = (word: string, count: number): string[] => {
  const typos = new Set<string>();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  while (typos.size < count) {
    const type = Math.floor(Math.random() * 3);
    let newWord = word.split('');
    const idx = Math.floor(Math.random() * word.length);

    if (type === 0) {
      // Change one char
      newWord[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
    } else if (type === 1 && word.length > 2) {
      // Swap adjacent
      const idx2 = idx < word.length - 1 ? idx + 1 : idx - 1;
      const temp = newWord[idx];
      newWord[idx] = newWord[idx2];
      newWord[idx2] = temp;
    } else {
       // Visual similarity (simple mocks)
       const map: Record<string, string> = {'l':'i', 'i':'l', 'm':'n', 'n':'m', 'o':'a', 'a':'o', 'e':'c', 'c':'e', 'p':'q', 'q':'p', 'b':'d', 'd':'b'};
       if (map[newWord[idx]]) {
          newWord[idx] = map[newWord[idx]];
       } else {
           // Fallback to random char
           newWord[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
       }
    }
    
    const res = newWord.join('');
    if (res !== word) typos.add(res);
  }
  return Array.from(typos);
};

export const generateQuestion = (
  allWords: Word[],
  gameType: GameType,
  difficulty: Difficulty,
  forcedTarget?: Word
): Question => {
  // 1. Pick a target word
  let targetWord: Word;
  
  if (forcedTarget) {
      targetWord = forcedTarget;
  } else {
      const targetIndex = Math.floor(Math.random() * allWords.length);
      targetWord = allWords[targetIndex];
  }
  
  // 2. Generate Options
  let options: any[] = [];
  
  // Both MULTIPLE_CHOICE and CHINESE_TO_ENGLISH share the same logic:
  // Target: Chinese (handled in UI)
  // Options: English Strings (Real words or Typos)
  if (gameType === GameType.MULTIPLE_CHOICE || gameType === GameType.CHINESE_TO_ENGLISH) {
    if (difficulty === Difficulty.HARD) {
      // Hard: Generate typos
      options = generateTypos(targetWord.english, 3);
      options.push(targetWord.english);
    } else {
      // Easy/Medium: Pick other real words
      const others = allWords.filter(w => w.id !== targetWord.id);
      let distractors: Word[] = [];

      if (difficulty === Difficulty.MEDIUM) {
        // Try to find words with same starting letter or similar length
        distractors = others.filter(w => 
            Math.abs(w.english.length - targetWord.english.length) <= 1 || 
            w.english[0] === targetWord.english[0]
        );
      }
      
      // Fill remaining with random if needed
      let safetyCounter = 0;
      while (distractors.length < 3 && others.length > 0) {
        safetyCounter++;
        if (safetyCounter > 50) break; // Avoid infinite loop if not enough unique words

        const rand = others[Math.floor(Math.random() * others.length)];
        if (!distractors.includes(rand)) distractors.push(rand);
        
        // If we exhausted all others, break
        if (distractors.length === others.length) break;
      }
      
      // Shuffle distractors and trim to 3
      distractors = shuffleArray(distractors).slice(0, 3);
      options = distractors.map(d => d.english);
      options.push(targetWord.english);
    }
    
    // Shuffle options
    options = shuffleArray(options);
    
    return {
      targetWord,
      options,
      correctAnswer: targetWord.english
    };

  } else if (gameType === GameType.MATCHING) {
    // English -> Choose Chinese+POS
    // Difficulty in matching usually just means choosing from random words
    const others = allWords.filter(w => w.id !== targetWord.id);
    
    let distractors: Word[] = [];
    if (others.length <= 3) {
        distractors = others;
    } else {
        distractors = shuffleArray(others).slice(0, 3);
    }
    
    options = shuffleArray([...distractors, targetWord]);

    return {
        targetWord,
        options, // options are Word objects here
        correctAnswer: targetWord.id
    };

  } else if (gameType === GameType.CLOZE) {
    // Calculate how many chars to hide based on difficulty
    const word = targetWord.english;
    let ratio = 0.5; // EASY default
    if (difficulty === Difficulty.MEDIUM) ratio = 0.75;
    if (difficulty === Difficulty.HARD) ratio = 0.9;

    let hiddenCount = Math.ceil(word.length * ratio);
    
    // Bounds check: Always hide at least 1, but keep at least 1 visible unless it's a 1-letter word (rare)
    if (hiddenCount < 1) hiddenCount = 1;
    if (hiddenCount > word.length) hiddenCount = word.length; // Max all

    const indicesToHide = new Set<number>();
    
    // Generate random indices to hide
    let safetyCounter = 0;
    while (indicesToHide.size < hiddenCount) {
        safetyCounter++;
        if (safetyCounter > 100) break;

        const randIndex = Math.floor(Math.random() * word.length);
        // Avoid spaces or special chars if any, only hide letters
        if (word[randIndex] !== ' ' && word[randIndex] !== '-' && word[randIndex] !== '.') {
             indicesToHide.add(randIndex);
        } else {
             // If we hit a space/symbol, force break if we've tried too many times (infinite loop safety)
             // or just continue. 
             if (indicesToHide.size >= word.length) break; 
        }
    }

    let mask = '';
    for(let i=0; i<word.length; i++) {
        if (indicesToHide.has(i)) {
            mask += '_';
        } else {
            mask += word[i];
        }
    }

    return {
        targetWord,
        options: [], // No options for cloze, user types
        correctAnswer: targetWord.english,
        clozeMask: mask
    };
  }

  throw new Error("Unknown Game Type");
};