import React, { useState } from 'react';
import { ALL_MISTAKES } from '../services/mistakeBook';
import { ErrorCategory, MistakeRecord } from '../services/mistakeBook/types';
import { ArrowLeft, Lightbulb } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const CATEGORY_LABELS: Record<ErrorCategory, string> = {
  capitalization: '大小寫',
  plural_possessive: '複數/所有格',
  preposition: '介系詞',
  verb_tense: '動詞時態',
  pronoun_reference: '代名詞指涉',
  content_comprehension: '內容理解',
  context_carelessness: '粗心/看錯題',
  spelling: '拼字',
  sentence_structure: '句型結構',
  other: '其他',
};

const CATEGORY_ORDER: ErrorCategory[] = [
  'plural_possessive', 'verb_tense', 'content_comprehension', 'sentence_structure',
  'spelling', 'preposition', 'pronoun_reference', 'capitalization', 'context_carelessness', 'other',
];

const ALL_FILTER = '__ALL__';

const MistakeBookView: React.FC<Props> = ({ onBack }) => {
  const [filter, setFilter] = useState<string>(ALL_FILTER);

  const counts = ALL_MISTAKES.reduce<Record<string, number>>((acc, m) => {
    acc[m.errorCategory] = (acc[m.errorCategory] ?? 0) + 1;
    return acc;
  }, {});

  const sorted = [...ALL_MISTAKES].sort((a, b) => b.examDate.localeCompare(a.examDate));
  const visible = filter === ALL_FILTER ? sorted : sorted.filter((m) => m.errorCategory === filter);

  const renderOptions = (record: MistakeRecord) => {
    if (!record.options || record.options.length === 0) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
        {record.options.map((opt) => {
          let cls = 'bg-slate-50 border-slate-200 text-slate-600';
          if (opt === record.correctAnswer) cls = 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold';
          else if (opt === record.studentAnswer) cls = 'bg-red-50 border-red-300 text-red-700 font-bold';
          return (
            <div key={opt} className={`px-3 py-2 rounded-xl border text-sm ${cls}`}>{opt}</div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 animate-fade-in pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mb-6">
        <ArrowLeft size={18} /> 返回主選單
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">錯題本</h1>
        <p className="text-slate-500 font-bold">依錯誤類型瀏覽每次考卷的錯題，陪孩子一起複習</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter(ALL_FILTER)}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === ALL_FILTER ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          全部（{ALL_MISTAKES.length}）
        </button>
        {CATEGORY_ORDER.filter((cat) => counts[cat] > 0).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === cat ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            {CATEGORY_LABELS[cat]}（{counts[cat]}）
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {visible.map((record) => (
          <div key={record.id} className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-rose-50 text-rose-600 text-xs font-black px-3 py-1 rounded-full">
                {CATEGORY_LABELS[record.errorCategory]}
              </span>
              <span className="text-xs text-slate-400 font-bold">{record.examDate}{record.examName ? ` · ${record.examName}` : ''}</span>
            </div>
            <div className="text-xs text-slate-400 font-bold mb-1">{record.section}</div>
            <div className="text-lg font-bold text-slate-800 mb-1">{record.questionText}</div>
            {renderOptions(record)}

            <div className="mt-4 flex gap-6 text-sm">
              <div><span className="text-slate-400 font-bold">孩子的答案：</span><span className="text-red-600 font-bold">{record.studentAnswer}</span></div>
              <div><span className="text-slate-400 font-bold">正確答案：</span><span className="text-emerald-600 font-bold">{record.correctAnswer}</span></div>
            </div>

            <div className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="text-sm text-slate-600 leading-relaxed mb-3">{record.teacherExplanation}</div>
              <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <Lightbulb size={16} className="mt-0.5 flex-shrink-0" />
                <span>{record.reviewAdvice}</span>
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="text-center text-slate-400 font-bold py-20">這個類別目前沒有錯題紀錄</div>
        )}
      </div>
    </div>
  );
};

export default MistakeBookView;
