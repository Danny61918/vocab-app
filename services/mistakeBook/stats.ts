import { getSkill } from './skills';
import { ErrorCategory, MistakeRecord } from './types';

// Parent-only statistics over the imported mistake records. Everything here is derived from the
// records themselves (nothing is stored), so a newly imported exam shows up automatically.
//
// IMPORTANT for readers of the numbers: only WRONG answers are recorded, never the total number of
// questions, so these are shares of the mistakes, not error rates. A month with many vocabulary
// worksheets will naturally show more vocabulary mistakes without the child getting worse.

export type FocusArea = 'phrase' | 'vocab' | 'science' | 'reading' | 'noun' | 'verb' | 'writing' | 'other';

export const FOCUS_LABELS: Record<FocusArea, string> = {
  phrase: '片語／慣用語',
  vocab: '單字語意與搭配',
  science: '科普與常識（CLIL）',
  reading: '閱讀測驗',
  noun: '名詞、所有格與代名詞',
  verb: '動詞與句型',
  writing: '書寫細節與粗心',
  other: '其他',
};

export const FOCUS_ORDER: FocusArea[] = ['phrase', 'vocab', 'science', 'reading', 'noun', 'verb', 'writing', 'other'];

// What to try at home for each area (shown for the biggest areas).
export const FOCUS_ADVICE: Record<Exclude<FocusArea, 'other'>, string> = {
  phrase:
    '每個片語自己造一個句子，不要只背中文意思；容易搞混的成對練習（例如 after all／above all、at a time／all the time）。',
  vocab: '用例句記單字：遮住單字讓孩子從句子線索把它填回去，並留意一字多義和固定搭配。',
  science: '畫一張水循環圖（蒸發、凝結、降水）並自己標示；讀 T/F 題時圈出關鍵字，例如 hotter／colder、太陽／風。',
  reading: '每題都回原文畫出證據句再選答案；分清楚「擔心會發生」和「真的發生了」。每天一小段短文就夠。',
  noun: '用「後面有沒有名詞」判斷 their 或 theirs；some／any 先看名詞可不可數。每週做一次簡短複習。',
  verb: '寫完句子先找主詞，再檢查 be 動詞和動詞要不要加 s；現在進行式一定是 be + V-ing。',
  writing: '寫完用手指逐字對照原句：大小寫、逗號、句號、拼字、有沒有漏字。',
};

const SKILL_AREA: [RegExp, FocusArea][] = [
  [/^V\.PHRASE$/, 'phrase'],
  [/^V\./, 'vocab'],
  [/^R\.CLIL\./, 'science'],
  [/^R\./, 'reading'],
  [/^G\.(POSS|PLURAL|COUNT|PRON)\./, 'noun'],
  [/^G\./, 'verb'],
  [/^(M|FMT)\./, 'writing'],
];

const LEGACY_AREA: Record<ErrorCategory, FocusArea> = {
  plural_possessive: 'noun',
  pronoun_reference: 'noun',
  verb_tense: 'verb',
  sentence_structure: 'writing',
  capitalization: 'writing',
  spelling: 'writing',
  context_carelessness: 'writing',
  preposition: 'verb',
  content_comprehension: 'other',
  other: 'other',
};

// A record belongs to the area of its first skill tag; untagged records fall back to their category.
export function focusAreaOf(m: MistakeRecord): FocusArea {
  const first = m.skills?.find((id) => getSkill(id));
  if (first) {
    for (const [re, area] of SKILL_AREA) if (re.test(first)) return area;
  }
  return LEGACY_AREA[m.errorCategory] ?? 'other';
}

export interface AreaStat {
  area: FocusArea;
  label: string;
  count: number;
  share: number; // 0..1 of all mistakes
}

export interface ExamStat {
  examDate: string;
  examName: string;
  count: number;
  topArea: FocusArea;
}

export interface MonthStat {
  month: string; // YYYY-MM
  total: number;
  areas: Record<FocusArea, number>;
}

export interface RepeatedAnswer {
  answer: string;
  count: number;
  dates: string[]; // distinct exam dates, ascending
}

export interface MistakeStats {
  total: number;
  examCount: number;
  firstDate: string;
  lastDate: string;
  byArea: AreaStat[]; // largest first, areas with 0 omitted
  byExam: ExamStat[]; // newest first
  byMonth: MonthStat[]; // oldest first
  repeated: RepeatedAnswer[]; // same answer missed in 2+ separate answers, most often first
  taggedShare: number; // share of records that carry a skill tag
  unknownAnswerShare: number; // share whose original wrong answer was not visible
}

const emptyAreas = (): Record<FocusArea, number> =>
  Object.fromEntries(FOCUS_ORDER.map((a) => [a, 0])) as Record<FocusArea, number>;

const normalizeAnswer = (s: string) =>
  s.toLowerCase().replace(/^\([a-d]\)\s*/, '').replace(/[.!?。]+$/, '').trim();

export function computeMistakeStats(mistakes: MistakeRecord[]): MistakeStats {
  const total = mistakes.length;
  const areaCount = emptyAreas();
  const byDate = new Map<string, MistakeRecord[]>();
  const byMonth = new Map<string, MonthStat>();
  const answers = new Map<string, string[]>();

  for (const m of mistakes) {
    const area = focusAreaOf(m);
    areaCount[area] += 1;

    byDate.set(m.examDate, [...(byDate.get(m.examDate) ?? []), m]);

    const month = m.examDate.slice(0, 7);
    const ms = byMonth.get(month) ?? { month, total: 0, areas: emptyAreas() };
    ms.total += 1;
    ms.areas[area] += 1;
    byMonth.set(month, ms);

    // true/false and rewrite answers say nothing about a specific word, so they are not "repeats"
    if (m.questionType !== 'rewrite') {
      const key = normalizeAnswer(m.correctAnswer);
      if (key.length > 0 && key.length <= 40 && key !== 't' && key !== 'f') {
        answers.set(key, [...(answers.get(key) ?? []), m.examDate]);
      }
    }
  }

  const byArea: AreaStat[] = FOCUS_ORDER.filter((a) => areaCount[a] > 0)
    .map((area) => ({ area, label: FOCUS_LABELS[area], count: areaCount[area], share: total ? areaCount[area] / total : 0 }))
    .sort((a, b) => b.count - a.count);

  const byExam: ExamStat[] = [...byDate.entries()]
    .map(([examDate, list]) => {
      const counts = emptyAreas();
      for (const m of list) counts[focusAreaOf(m)] += 1;
      const topArea = FOCUS_ORDER.slice().sort((a, b) => counts[b] - counts[a])[0];
      return { examDate, examName: list[0].examName ?? '', count: list.length, topArea };
    })
    .sort((a, b) => b.examDate.localeCompare(a.examDate));

  const repeated: RepeatedAnswer[] = [...answers.entries()]
    .filter(([, dates]) => dates.length >= 2)
    .map(([answer, dates]) => ({ answer, count: dates.length, dates: [...new Set(dates)].sort() }))
    .sort((a, b) => b.count - a.count || b.dates[b.dates.length - 1].localeCompare(a.dates[a.dates.length - 1]));

  const dates = [...byDate.keys()].sort();
  return {
    total,
    examCount: byDate.size,
    firstDate: dates[0] ?? '',
    lastDate: dates[dates.length - 1] ?? '',
    byArea,
    byExam,
    byMonth: [...byMonth.values()].sort((a, b) => a.month.localeCompare(b.month)),
    repeated,
    taggedShare: total ? mistakes.filter((m) => (m.skills ?? []).length > 0).length / total : 0,
    unknownAnswerShare: total ? mistakes.filter((m) => /未知/.test(m.studentAnswer)).length / total : 0,
  };
}

// The biggest areas worth acting on (never "other"), each with its advice.
export function topFocus(stats: MistakeStats, n = 3): (AreaStat & { advice: string })[] {
  return stats.byArea
    .filter((a): a is AreaStat & { area: Exclude<FocusArea, 'other'> } => a.area !== 'other')
    .slice(0, n)
    .map((a) => ({ ...a, advice: FOCUS_ADVICE[a.area] }));
}
