import { applyAnswer, BoxState, newBoxState } from '../leitner';
import { localYmd, shuffle, SrsDeps } from '../srsStorage';
import { getSkill } from './skills';
import { ALL_MISTAKES } from './index';
import { ALL_DRILLS } from './drills';
import { DrillItem } from './drills/types';

const PROGRESS_KEY = 'vocab_skill_progress'; // synced to the cloud (cloudSync.ts)
const PLAN_KEY = 'vocab_drill_plan';         // derived per-day cache, local only

export const MAX_PER_DAY = 8;
export const MAX_PER_SKILL = 2;
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

function buildPlan(items: DrillItem[], today: string, progress: Record<string, SkillProgress>): string[] {
  // Items are grouped by their primary skill (skillIds[0]); that skill's progress schedules them.
  const bySkill = new Map<string, DrillItem[]>();
  for (const it of items) {
    const key = it.skillIds[0];
    bySkill.set(key, [...(bySkill.get(key) ?? []), it]);
  }

  const due: { skill: string; items: DrillItem[]; dueDate: number | null }[] = [];
  for (const [skill, list] of bySkill) {
    const p = progress[skill];
    if (p && localYmd(p.dueDate) > today) continue; // not due yet (compared by calendar day)
    due.push({ skill, items: orderItems(list, p), dueDate: p ? p.dueDate : null });
  }

  // Skills that have history and are due come first (most overdue first), then brand-new skills.
  // Brand-new skills are ordered by how often the child actually got that skill wrong on an
  // exam (ALL_MISTAKES), so the weakest area is practiced first rather than whichever happens
  // to be first in the drill files; ties keep the original (file) order.
  const mistakeCount = new Map<string, number>();
  for (const m of ALL_MISTAKES) for (const id of m.skills ?? []) mistakeCount.set(id, (mistakeCount.get(id) ?? 0) + 1);
  due.sort((a, b) => {
    if ((a.dueDate === null) !== (b.dueDate === null)) return a.dueDate === null ? 1 : -1;
    if (a.dueDate === null && b.dueDate === null) return (mistakeCount.get(b.skill) ?? 0) - (mistakeCount.get(a.skill) ?? 0);
    return (a.dueDate ?? 0) - (b.dueDate ?? 0);
  });

  // Alternate grammar and vocabulary skills so a day is never all one kind.
  const grammar = due.filter((d) => !isVocabSkill(d.skill));
  const vocab = due.filter((d) => isVocabSkill(d.skill));
  const firstIsVocab = due.length > 0 && isVocabSkill(due[0].skill);
  const [lead, follow] = firstIsVocab ? [vocab, grammar] : [grammar, vocab];
  const ordered: typeof due = [];
  for (let i = 0; i < Math.max(lead.length, follow.length); i++) {
    if (lead[i]) ordered.push(lead[i]);
    if (follow[i]) ordered.push(follow[i]);
  }

  // Breadth first: one item per skill, then a second round, until the daily cap.
  const picked: string[] = [];
  for (let round = 0; round < MAX_PER_SKILL; round++) {
    for (const d of ordered) {
      if (picked.length >= MAX_PER_DAY) return picked;
      const next = d.items[round];
      if (next) picked.push(next.id);
    }
  }
  return picked;
}

// Today's plan is computed once and cached, so reopening the page shows the same questions
// and the daily word hunt can exclude the words they cover.
export function getTodayDrill(deps?: SrsDeps, items: DrillItem[] = ALL_DRILLS): DrillItem[] {
  const { today } = resolveDeps(deps);
  let plan = loadPlan();
  if (!plan || plan.date !== today) {
    plan = { date: today, itemIds: buildPlan(items, today, loadSkillProgress()), answered: [] };
    savePlan(plan);
  }
  const byId = new Map(items.map((i) => [i.id, i]));
  return plan.itemIds.map((id) => byId.get(id)).filter((i): i is DrillItem => !!i);
}

export function getRemainingDrill(deps?: SrsDeps, items: DrillItem[] = ALL_DRILLS): DrillItem[] {
  const todays = getTodayDrill(deps, items);
  const answered = new Set(loadPlan()?.answered ?? []);
  return todays.filter((i) => !answered.has(i.id));
}

export function presentOptions(item: DrillItem, rng: () => number = Math.random): string[] {
  return shuffle([item.answer, ...item.distractors.map((d) => d.text)], rng);
}
