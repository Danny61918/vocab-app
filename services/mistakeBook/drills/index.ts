import { DrillItem } from './types';
import drills20261104 from './2026-11-04';

// Flat list across every imported exam's drill file. Add a new drills/<exam-date>.ts + one
// import line here for each new exam (mirrors services/mistakeBook/index.ts).
export const ALL_DRILLS: DrillItem[] = [
  ...drills20261104,
];
