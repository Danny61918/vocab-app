import { applyAnswer, BoxState, newBoxState } from '../leitner';
import { localYmd, shuffle, SrsDeps } from '../srsStorage';
import { getSkill } from './skills';
import { ALL_MISTAKES } from './index';
import { ALL_DRILLS } from './drills';
import { DrillItem } from './drills/types';
import { MistakeRecord } from './types';

const PROGRESS_KEY = 'vocab_skill_progress'; // synced to the cloud (cloudSync.ts)
const PLAN_KEY = 'vocab_drill_plan';         // derived per-day cache, local only

export const MAX_PER_DAY = 10;
export const ROUND_SIZE = 5;      // the child sees one round of 5; the next round only appears after it is finished
export const MAX_PER_SKILL = 4;
const HALF_LIFE_DAYS = 28;        // an exam mistake counts half as much every 4 weeks
const MIN_WEIGHT = 0.25;
const GRADUATED_FACTOR = 0.25;    // graduated skills hand their slots to the weaker ones
const MAX_REGRESSED_PER_DAY = 3;

// Slot quotas by weakness group (the 2026-11 review plan). Quotas add up to 9; the 10th slot, and any
// quota that cannot be filled yet (a group with no drill items, or nothing due), goes to a pool
// weighted by recent exam mistakes.
const GROUPS: { name: string; match: (skill: string) => boolean; quota: number }[] = [
  { name: 'phrase', match: (s) => s === 'V.PHRASE', quota: 3 },
  { name: 'verbForm', match: (s) => /^G\.(SVA|PS|NEG|PROG|MODAL)\./.test(s), quota: 2 },
  { name: 'writing', match: (s) => s.startsWith('M.'), quota: 2 },
  { name: 'sRules', match: (s) => /^G\.(POSS|PLURAL|COUNT)\./.test(s), quota: 1 },
  { name: 'posAndNot', match: (s) => s === 'V.POS_LABEL' || s.startsWith('FMT.'), quota: 1 },
];
const RECENT_LIMIT = 10;
const GRADUATION_DAYS = 3;

export interface DrillAttempt {
  date: string;      // 'YYYY-MM-DD'
  itemId: string;
  correct: boolean;
  ms: number;
  picked?: string;
}

// One per skill id or confusion-set id.
export interface SkillProgress extends BoxState {
  key: string;
  recent: DrillAttempt[]; // newest last, at most RECENT_LIMIT
}

interface DrillPlan {
  date: string;
  itemIds: string[];
  answered: string[];
}

const norm = (s: string) => s.trim().toLowerCase();

function resolveDeps(deps?: SrsDeps): { now: number; today: string; rng: () => number } {
  const now = deps?.now ?? Date.now();
  return { now, today: deps?.today ?? localYmd(now), rng: deps?.rng ?? Math.random };
}

// ---- storage ----

export function loadSkillProgress(): Record<string, SkillProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSkillProgress(data: Record<string, SkillProgress>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  import('../cloudSync').then((m) => m.schedulePush()).catch(() => {});
}

function loadPlan(): DrillPlan | null {
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    return raw ? (JSON.parse(raw) as DrillPlan) : null;
  } catch {
    return null;
  }
}

function savePlan(plan: DrillPlan) {
  try {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  } catch {
    /* derived cache: losing it only means the plan is rebuilt */
  }
}

// ---- answering ----

function progressKeys(item: DrillItem): string[] {
  return [...new Set([...item.skillIds, ...(item.confusionSetId ? [item.confusionSetId] : [])])];
}

export function recordDrillAnswer(
  item: DrillItem,
  picked: string,
  ms: number,
  deps?: SrsDeps
): { correct: boolean } {
  const { now, today } = resolveDeps(deps);
  const correct = norm(picked) === norm(item.answer);
  const data = loadSkillProgress();

  for (const key of progressKeys(item)) {
    const prev: SkillProgress = data[key] ?? { key, ...newBoxState(now), recent: [] };
    const next = applyAnswer(prev, correct, now, today);
    const attempt: DrillAttempt = { date: today, itemId: item.id, correct, ms };
    if (!correct) attempt.picked = picked;
    next.recent = [...prev.recent, attempt].slice(-RECENT_LIMIT);
    data[key] = next;
  }
  saveSkillProgress(data);

  const plan = loadPlan();
  if (plan && plan.date === today && !plan.answered.includes(item.id)) {
    savePlan({ ...plan, answered: [...plan.answered, item.id] });
  }
  return { correct };
}

// Graduated = the latest streak has 3 correct answers on 3 different days, each on a
// different item. Same-day repeats count once; any wrong answer ends the streak.
export function isGraduated(p: SkillProgress | undefined): boolean {
  if (!p || p.consecutiveCorrectDays < GRADUATION_DAYS) return false;
  const itemByDay = new Map<string, string>();
  for (let i = p.recent.length - 1; i >= 0; i--) {
    const a = p.recent[i];
    if (!a.correct) break;
    if (!itemByDay.has(a.date)) itemByDay.set(a.date, a.itemId);
  }
  if (itemByDay.size < GRADUATION_DAYS) return false;
  const latest = [...itemByDay.values()].slice(0, GRADUATION_DAYS);
  return new Set(latest).size === GRADUATION_DAYS;
}

// ---- planning ----

function targetDifficulty(p: SkillProgress | undefined, items: DrillItem[]): number {
  if (!p) return 1;
  const last = p.recent[p.recent.length - 1];
  if (last && !last.correct) {
    const lastDifficulty = items.find((i) => i.id === last.itemId)?.difficulty ?? 2;
    return Math.max(1, lastDifficulty - 1);
  }
  return Math.min(3, 1 + Math.floor(p.boxLevel / 2));
}

function orderItems(items: DrillItem[], p: SkillProgress | undefined): DrillItem[] {
  const lastSeen = new Map<string, string>();
  for (const a of p?.recent ?? []) lastSeen.set(a.itemId, a.date);
  const target = targetDifficulty(p, items);
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const seenA = lastSeen.has(a.item.id) ? 1 : 0;
      const seenB = lastSeen.has(b.item.id) ? 1 : 0;
      if (seenA !== seenB) return seenA - seenB;
      // The child's own exam questions (原題重考, ids start with 'retest.') come before made-up variations:
      // the school re-uses questions, so seeing the exact question again is the best check.
      const retestA = a.item.id.startsWith('retest.') ? 0 : 1;
      const retestB = b.item.id.startsWith('retest.') ? 0 : 1;
      if (retestA !== retestB) return retestA - retestB;
      const dist = Math.abs(a.item.difficulty - target) - Math.abs(b.item.difficulty - target);
      if (dist !== 0) return dist;
      const dateA = lastSeen.get(a.item.id) ?? '';
      const dateB = lastSeen.get(b.item.id) ?? '';
      if (dateA !== dateB) return dateA < dateB ? -1 : 1;
      return a.index - b.index;
    })
    .map((x) => x.item);
}

const isVocabSkill = (id: string) => (getSkill(id)?.domain ?? id.split('.')[0]) === 'V';

interface SkillStat {
  weight: number;        // recency-weighted exam mistakes (half-life HALF_LIFE_DAYS); mistakes dated after `today` count in full
  latestMistake: string; // newest exam date <= today, '' when none
}

function skillStats(mistakes: MistakeRecord[], today: string): Map<string, SkillStat> {
  const stats = new Map<string, SkillStat>();
  const todayMs = Date.parse(today);
  for (const m of mistakes) {
    const ageDays = Math.max(0, (todayMs - Date.parse(m.examDate)) / 86400000);
    const w = Math.pow(0.5, ageDays / HALF_LIFE_DAYS);
    for (const id of m.skills ?? []) {
      const cur = stats.get(id) ?? { weight: 0, latestMistake: '' };
      cur.weight += w;
      if (m.examDate <= today && m.examDate > cur.latestMistake) cur.latestMistake = m.examDate;
      stats.set(id, cur);
    }
  }
  return stats;
}

// A skill that was practised before but then went wrong again on a later exam goes back to
// "practising": it is due today whatever its box says, and it gets a guaranteed slot.
// Derived at plan time only; the stored SkillProgress is untouched.
function isRegressed(p: SkillProgress | undefined, stat: SkillStat | undefined): boolean {
  if (!p || !stat || !stat.latestMistake) return false;
  const lastAttempt = p.recent[p.recent.length - 1]?.date;
  return !!lastAttempt && stat.latestMistake > lastAttempt;
}

interface Cand {
  skill: string;
  items: DrillItem[];
  dueDate: number | null;
  weight: number;
  regressed: boolean;
}

// Splits the daily slots: regressed skills first, then the group quotas, then whatever is left by
// weight. Each step uses a D'Hondt-style rule (weight / (slots + 1)) so a heavy skill gets more
// slots but never more than MAX_PER_SKILL.
function allocateSlots(cands: Cand[]): Map<string, number> {
  const assigned = new Map<string, number>();
  let total = 0;
  const count = (c: Cand) => assigned.get(c.skill) ?? 0;
  const hasRoom = (c: Cand) => count(c) < Math.min(MAX_PER_SKILL, c.items.length);
  const give = (c: Cand) => {
    assigned.set(c.skill, count(c) + 1);
    total += 1;
  };
  const best = (pool: Cand[]): Cand | undefined => {
    let top: Cand | undefined;
    for (const c of pool) {
      if (!hasRoom(c)) continue;
      if (!top || c.weight / (count(c) + 1) > top.weight / (count(top) + 1)) top = c;
    }
    return top;
  };

  const regressed = cands.filter((c) => c.regressed).sort((a, b) => b.weight - a.weight).slice(0, MAX_REGRESSED_PER_DAY);
  for (const c of regressed) if (total < MAX_PER_DAY && hasRoom(c)) give(c);

  for (const g of GROUPS) {
    const pool = cands.filter((c) => g.match(c.skill));
    let used = pool.reduce((n, c) => n + count(c), 0);
    // Distinct skills first (heaviest first), so one heavy skill cannot take a whole group's quota.
    for (const c of [...pool].sort((a, b) => b.weight - a.weight)) {
      if (used >= g.quota || total >= MAX_PER_DAY) break;
      if (count(c) === 0 && hasRoom(c)) {
        give(c);
        used += 1;
      }
    }
    while (used < g.quota && total < MAX_PER_DAY) {
      const c = best(pool);
      if (!c) break;
      give(c);
      used += 1;
    }
  }

  while (total < MAX_PER_DAY) {
    const c = best(cands);
    if (!c) break;
    give(c);
  }
  return assigned;
}

function buildPlan(
  items: DrillItem[],
  today: string,
  progress: Record<string, SkillProgress>,
  mistakes: MistakeRecord[]
): string[] {
  // Items are grouped by their primary skill (skillIds[0]); that skill's progress schedules them.
  const bySkill = new Map<string, DrillItem[]>();
  for (const it of items) {
    const key = it.skillIds[0];
    bySkill.set(key, [...(bySkill.get(key) ?? []), it]);
  }

  const stats = skillStats(mistakes, today);
  const cands: Cand[] = [];
  for (const [skill, list] of bySkill) {
    const p = progress[skill];
    const stat = stats.get(skill);
    const regressed = isRegressed(p, stat);
    if (p && localYmd(p.dueDate) > today && !regressed) continue; // not due yet (compared by calendar day)
    let weight = Math.max(MIN_WEIGHT, stat?.weight ?? 0);
    if (isGraduated(p) && !regressed) weight = Math.max(MIN_WEIGHT, weight * GRADUATED_FACTOR);
    cands.push({ skill, items: orderItems(list, p), dueDate: p ? p.dueDate : null, weight, regressed });
  }

  const assigned = allocateSlots(cands);
  const chosen = cands.filter((c) => (assigned.get(c.skill) ?? 0) > 0);

  // Order: regressed skills first, then the heaviest. Alternate grammar and vocabulary so a round is
  // never all one kind, then deal the items one per skill at a time so round 1 (the first 5) is as
  // broad as possible and a skill's second and later items come after.
  chosen.sort((a, b) => Number(b.regressed) - Number(a.regressed) || b.weight - a.weight);
  const grammar = chosen.filter((d) => !isVocabSkill(d.skill));
  const vocab = chosen.filter((d) => isVocabSkill(d.skill));
  const firstIsVocab = chosen.length > 0 && isVocabSkill(chosen[0].skill);
  const [lead, follow] = firstIsVocab ? [vocab, grammar] : [grammar, vocab];
  const ordered: Cand[] = [];
  for (let i = 0; i < Math.max(lead.length, follow.length); i++) {
    if (lead[i]) ordered.push(lead[i]);
    if (follow[i]) ordered.push(follow[i]);
  }

  const picked: string[] = [];
  for (let round = 0; round < MAX_PER_SKILL; round++) {
    for (const d of ordered) {
      if (round < (assigned.get(d.skill) ?? 0) && d.items[round]) picked.push(d.items[round].id);
    }
  }
  return picked.slice(0, MAX_PER_DAY);
}

// Today's plan is computed once and cached, so reopening the page shows the same questions
// and the daily word hunt can exclude the words they cover. `mistakes` is injectable for tests.
export function getTodayDrill(
  deps?: SrsDeps,
  items: DrillItem[] = ALL_DRILLS,
  mistakes: MistakeRecord[] = ALL_MISTAKES
): DrillItem[] {
  const { today } = resolveDeps(deps);
  let plan = loadPlan();
  if (!plan || plan.date !== today) {
    plan = { date: today, itemIds: buildPlan(items, today, loadSkillProgress(), mistakes), answered: [] };
    savePlan(plan);
  }
  const byId = new Map(items.map((i) => [i.id, i]));
  return plan.itemIds.map((id) => byId.get(id)).filter((i): i is DrillItem => !!i);
}

export function getRemainingDrill(
  deps?: SrsDeps,
  items: DrillItem[] = ALL_DRILLS,
  mistakes: MistakeRecord[] = ALL_MISTAKES
): DrillItem[] {
  const todays = getTodayDrill(deps, items, mistakes);
  const answered = new Set(loadPlan()?.answered ?? []);
  return todays.filter((i) => !answered.has(i.id));
}

// Rounds of ROUND_SIZE over today's plan. The current round is the first chunk that still has
// unanswered items; the next chunk is not shown until this one is finished.
function roundChunks(todays: DrillItem[], answered: Set<string>): DrillItem[][] {
  const chunks: DrillItem[][] = [];
  for (let i = 0; i < todays.length; i += ROUND_SIZE) {
    const left = todays.slice(i, i + ROUND_SIZE).filter((x) => !answered.has(x.id));
    if (left.length > 0) chunks.push(left);
  }
  return chunks;
}

export function getRoundDrill(
  deps?: SrsDeps,
  items: DrillItem[] = ALL_DRILLS,
  mistakes: MistakeRecord[] = ALL_MISTAKES
): DrillItem[] {
  const todays = getTodayDrill(deps, items, mistakes);
  return roundChunks(todays, new Set(loadPlan()?.answered ?? []))[0] ?? [];
}

// How many more rounds wait after the current one (0 = this is the last).
export function getRoundsAfterCurrent(
  deps?: SrsDeps,
  items: DrillItem[] = ALL_DRILLS,
  mistakes: MistakeRecord[] = ALL_MISTAKES
): number {
  const todays = getTodayDrill(deps, items, mistakes);
  return Math.max(0, roundChunks(todays, new Set(loadPlan()?.answered ?? [])).length - 1);
}

export function presentOptions(item: DrillItem, rng: () => number = Math.random): string[] {
  return shuffle([item.answer, ...item.distractors.map((d) => d.text)], rng);
}
