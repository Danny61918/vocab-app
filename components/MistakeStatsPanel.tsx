import React from 'react';
import { ALL_MISTAKES } from '../services/mistakeBook';
import { computeMistakeStats, FOCUS_LABELS, FocusArea, topFocus } from '../services/mistakeBook/stats';

// 統計報告（只給家長看）：由全部錯題即時計算，匯入新考卷後自動更新。
// 只有「錯題」，沒有「總題數」，所以這裡是錯題的占比，不是錯誤率。

const AREA_COLOR: Record<FocusArea, string> = {
  phrase: 'bg-rose-400',
  vocab: 'bg-amber-400',
  science: 'bg-sky-400',
  reading: 'bg-violet-400',
  noun: 'bg-emerald-400',
  verb: 'bg-orange-400',
  writing: 'bg-slate-400',
  other: 'bg-slate-300',
};

const pct = (n: number) => `${Math.round(n * 100)}%`;

const MistakeStatsPanel: React.FC = () => {
  const stats = computeMistakeStats(ALL_MISTAKES);
  const focus = topFocus(stats, 3);
  const maxCount = Math.max(1, ...stats.byArea.map((a) => a.count));
  const repeated = stats.repeated.slice(0, 10);
  const recent = stats.byExam.slice(0, 8);

  if (stats.total === 0) {
    return <div className="text-center text-slate-400 font-bold py-16">還沒有錯題紀錄</div>;
  }

  return (
    <div className="space-y-6">
      {/* summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          ['錯題總數', String(stats.total)],
          ['考卷份數', String(stats.examCount)],
          ['期間', `${stats.firstDate.slice(5)} ~ ${stats.lastDate.slice(5)}`],
        ].map(([label, value]) => (
          <div key={label} className="bg-white border-2 border-slate-100 rounded-[1.5rem] p-4 text-center shadow-sm">
            <div className="text-xs font-bold text-slate-400">{label}</div>
            <div className="text-xl md:text-2xl font-black text-slate-800 mt-1">{value}</div>
          </div>
        ))}
      </div>

      {/* where the mistakes are */}
      <div className="bg-white border-2 border-slate-100 rounded-[1.5rem] p-5 shadow-sm">
        <div className="font-black text-slate-800 mb-4">錯在哪個方向</div>
        <div className="space-y-3">
          {stats.byArea.map((a) => (
            <div key={a.area}>
              <div className="flex items-baseline justify-between gap-3 text-sm font-bold">
                <span className="text-slate-700">{a.label}</span>
                <span className="text-slate-500 shrink-0">
                  {a.count} 題 · {pct(a.share)}
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div className={`h-full rounded-full ${AREA_COLOR[a.area]}`} style={{ width: `${(a.count / maxCount) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* advice */}
      {focus.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-100 rounded-[1.5rem] p-5">
          <div className="font-black text-amber-800 mb-3">現在最需要加強的三個方向</div>
          <ol className="space-y-3">
            {focus.map((f, i) => (
              <li key={f.area} className="text-sm text-slate-700 font-bold leading-relaxed">
                <span className="font-black text-amber-700">
                  {i + 1}. {f.label}（{f.count} 題，{pct(f.share)}）
                </span>
                <br />
                {f.advice}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* repeated */}
      {repeated.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-100 rounded-[1.5rem] p-5">
          <div className="font-black text-rose-700 mb-1">一錯再錯的答案</div>
          <p className="text-xs text-rose-500 font-bold mb-3">同一個答案在不同題目被答錯 2 次以上（不含是非題與改寫題）</p>
          <ul className="space-y-1 text-sm font-bold text-slate-700">
            {repeated.map((r) => (
              <li key={r.answer} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 break-words">{r.answer}</span>
                <span className="text-slate-500 shrink-0 text-xs">
                  {r.count} 次 · 最近 {r.dates[r.dates.length - 1].slice(5)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* by month */}
      <div className="bg-white border-2 border-slate-100 rounded-[1.5rem] p-5 shadow-sm">
        <div className="font-black text-slate-800 mb-3">每月錯題</div>
        <div className="space-y-4">
          {stats.byMonth.map((m) => (
            <div key={m.month}>
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>{m.month}</span>
                <span className="text-slate-500">{m.total} 題</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-slate-100 mt-1">
                {(Object.keys(FOCUS_LABELS) as FocusArea[])
                  .filter((a) => m.areas[a] > 0)
                  .map((a) => (
                    <div
                      key={a}
                      className={AREA_COLOR[a]}
                      title={`${FOCUS_LABELS[a]} ${m.areas[a]} 題`}
                      style={{ width: `${(m.areas[a] / m.total) * 100}%` }}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs font-bold text-slate-500">
          {stats.byArea.map((a) => (
            <span key={a.area} className="inline-flex items-center gap-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${AREA_COLOR[a.area]}`} />
              {a.label}
            </span>
          ))}
        </div>
      </div>

      {/* recent exams */}
      <div className="bg-white border-2 border-slate-100 rounded-[1.5rem] p-5 shadow-sm">
        <div className="font-black text-slate-800 mb-3">最近的考卷</div>
        <ul className="divide-y divide-slate-100">
          {recent.map((e) => (
            <li key={e.examDate} className="py-2 flex items-baseline justify-between gap-3 text-sm font-bold">
              <span className="min-w-0 text-slate-700 break-words">
                {e.examDate.slice(5)} {e.examName && <span className="text-slate-400 font-medium">· {e.examName}</span>}
              </span>
              <span className="text-slate-500 shrink-0 text-xs">
                {e.count} 題 · 主要是{FOCUS_LABELS[e.topArea]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* how to read */}
      <div className="text-xs text-slate-400 font-bold leading-relaxed space-y-1">
        <p>怎麼解讀：這裡只記錄「答錯的題目」，沒有總題數，所以數字是錯題的占比，不是錯誤率。某個月單字卷比較多，單字錯題自然也會變多，不一定代表退步。</p>
        <p>
          {pct(stats.unknownAnswerShare)} 的錯題看不到孩子原本寫的答案；{pct(stats.taggedShare)} 的錯題有標記細技能，其餘依錯誤類型歸類。
        </p>
      </div>
    </div>
  );
};

export default MistakeStatsPanel;
