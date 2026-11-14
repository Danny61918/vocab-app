import { DrillItem } from './types';
import drills20261028 from './2026-10-28';
import drills20261104 from './2026-11-04';
import drills20261110 from './2026-11-10';
import genPresentSimple from './supp/genPresentSimple';
import suppPossessivePluralPronoun from './supp/possessivePluralPronoun';
import suppCountBeModal from './supp/countBeModal';
import suppWritingMechanics from './supp/writingMechanics';
import suppClilNumbersLandmarks from './supp/clilNumbersLandmarks';
import topupSvaPresentSimple from './supp/topupSvaPresentSimple';
import topupMisc from './supp/topupMisc';
import topupVocabScience from './supp/topupVocabScience';
import topupReading from './supp/topupReading';

// Flat list across every imported exam's drill file. Add a new drills/<exam-date>.ts + one
// import line here for each new exam (mirrors services/mistakeBook/index.ts).
// `supp/` files are supplementary banks for skills the exam-seeded drills don't cover
// (ids look like `supp.<skillId>#vN`, no seed mistake).
export const ALL_DRILLS: DrillItem[] = [
  // Newest exam first: ties inside a skill are broken by position in this list, so the most recent mistakes surface first.
  ...drills20261110,
  ...drills20261028,
  ...drills20261104,
  ...genPresentSimple,
  ...suppPossessivePluralPronoun,
  ...suppCountBeModal,
  ...suppWritingMechanics,
  ...suppClilNumbersLandmarks,
  ...topupSvaPresentSimple,
  ...topupMisc,
  ...topupVocabScience,
  ...topupReading,
];
