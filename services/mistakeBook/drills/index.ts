import { DrillItem } from './types';
import drills20261028 from './2026-10-28';
import drills20261104 from './2026-11-04';
import suppPossessivePluralPronoun from './supp/possessivePluralPronoun';
import suppCountBeModal from './supp/countBeModal';
import suppWritingMechanics from './supp/writingMechanics';
import suppClilNumbersLandmarks from './supp/clilNumbersLandmarks';

// Flat list across every imported exam's drill file. Add a new drills/<exam-date>.ts + one
// import line here for each new exam (mirrors services/mistakeBook/index.ts).
// `supp/` files are supplementary banks for skills the exam-seeded drills don't cover
// (ids look like `supp.<skillId>#vN`, no seed mistake).
export const ALL_DRILLS: DrillItem[] = [
  ...drills20261028,
  ...drills20261104,
  ...suppPossessivePluralPronoun,
  ...suppCountBeModal,
  ...suppWritingMechanics,
  ...suppClilNumbersLandmarks,
];
