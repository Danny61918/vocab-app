import { isGraduated, loadSkillProgress, SkillProgress } from './drillProgress';
import { getSkill, SkillTag } from './skills';
import { MistakeRecord } from './types';

// Parent-only "弱點排行": which skills the exam mistakes point to, and how practice is going.
// Derived on demand from the mistake records (static) and the drill progress (localStorage).

export type SkillStatus = 'new' | 'practicing' | 'graduated';

export interface SkillWeakness {
  skill: SkillTag;
  mistakeCount: number;     // exam mistakes tagged with this skill
  lastExamDate?: string;    // 'YYYY-MM-DD' of the latest such mistake
  status: SkillStatus;      // new = not practised yet
  attempts: number;         // drill answers kept in the progress (most recent only)
  correctRate: number | null; // null when there are no attempts yet
}

export function getSkillWeaknesses(
  mistakes: MistakeRecord[],
  progress: Record<string, SkillProgress> = loadSkillProgress()
): SkillWeakness[] {
  const bySkill = new Map<string, { count: number; last: string }>();
  for (const m of mistakes) {
    for (const id of m.skills ?? []) {
      const cur = bySkill.get(id) ?? { count: 0, last: '' };
      cur.count += 1;
      if (m.examDate > cur.last) cur.last = m.examDate;
      bySkill.set(id, cur);
    }
  }

  const rows: SkillWeakness[] = [];
  for (const [id, { count, last }] of bySkill) {
    const skill = getSkill(id);
    if (!skill) continue;
    const p = progress[id];
    const attempts = p?.recent.length ?? 0;
    rows.push({
      skill,
      mistakeCount: count,
      lastExamDate: last || undefined,
      status: !p ? 'new' : isGraduated(p) ? 'graduated' : 'practicing',
      attempts,
      correctRate: attempts === 0 ? null : p!.recent.filter((a) => a.correct).length / attempts,
    });
  }

  const rank = (r: SkillWeakness) => (r.status === 'graduated' ? 1 : 0);
  return rows.sort(
    (a, b) =>
      rank(a) - rank(b) ||
      b.mistakeCount - a.mistakeCount ||
      (a.correctRate ?? -1) - (b.correctRate ?? -1) ||
      a.skill.id.localeCompare(b.skill.id)
  );
}
