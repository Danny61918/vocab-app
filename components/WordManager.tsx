
import React, { useState, useEffect, useMemo } from 'react';
import { Word } from '../types';
import { getWords, saveWords, clearAllData, resetWordsToDefault } from '../services/storage';
import { Plus, Trash2, Search, Calendar, Type, Code, Table as TableIcon, Copy, FileText, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const WordManager: React.FC<Props> = ({ onBack }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'add' | 'bulk' | 'ts'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [infoMessage, setInfoMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  // New Word Form State
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEng, setNewEng] = useState('');
  const [newChi, setNewChi] = useState('');
  const [newPos, setNewPos] = useState('(n.)');

  // Bulk Import State
  const [bulkText, setBulkText] = useState('');

  useEffect(() => {
    setWords(getWords());
  }, []);

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
      setInfoMessage({ text, type });
      setTimeout(() => setInfoMessage(null), 3000);
  };

  const filteredWords = useMemo(() => {
    return words.filter(w => 
      w.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.chinese.includes(searchTerm) ||
      (w.date && w.date.includes(searchTerm))
    ).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [words, searchTerm]);

  const generateTsString = (data: Word[]) => {
      const jsonString = JSON.stringify(data, null, 4);
      return `import { Word } from '../types';\n\nconst serverData: Word[] = ${jsonString};\n\nconst processedData = serverData.map((word, index) => ({ ...word, id: index + 1 }));\n\nexport default processedData;`.trim();
  };

  const handleAdd = (e: React.FormEvent) => {
      e.preventDefault();
      const newWord: Word = {
          id: words.length > 0 ? Math.max(...words.map(w => w.id)) + 1 : 1,
          date: newDate,
          english: newEng.trim(),
          chinese: newChi.trim(),
          part_of_speech: newPos
      };
      const updated = [...words, newWord];
      setWords(updated);
      saveWords(updated);
      setNewEng('');
      setNewChi('');
      showMsg(`已新增: ${newWord.english}`);
  };

  const handleBulkImport = () => {
      if (!bulkText.trim()) return;
      
      const lines = bulkText.split('\n');
      const importedWords: Word[] = [];
      let startId = words.length > 0 ? Math.max(...words.map(w => w.id)) + 1 : 1;
      let errorCount = 0;

      lines.forEach((line) => {
          if (!line.trim()) return;
          // Support both comma and tab (for Excel paste)
          const parts = line.includes('\t') ? line.split('\t') : line.split(',');
          
          if (parts.length >= 3) {
              importedWords.push({
                  id: startId++,
                  english: parts[0].trim(),
                  chinese: parts[1].trim(),
                  part_of_speech: parts[2].trim(),
                  date: parts[3] ? parts[3].trim() : newDate
              });
          } else {
              errorCount++;
          }
      });

      if (importedWords.length > 0) {
          const updated = [...words, ...importedWords];
          setWords(updated);
          saveWords(updated);
          setBulkText('');
          showMsg(`成功匯入 ${importedWords.length} 個單字${errorCount > 0 ? `，${errorCount} 行格式錯誤` : ''}`);
          setViewMode('table');
      } else {
          showMsg("匯入失敗，請檢查格式", 'error');
      }
  };

  const handleDelete = (id: number) => {
      if(window.confirm("確定刪除？")) {
          const updated = words.filter(w => w.id !== id);
          setWords(updated);
          saveWords(updated);
      }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl animate-fade-in pb-20 mt-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-slate-800">單字資料管理中心</h2>
        <button onClick={onBack} className="bg-slate-100 hover:bg-slate-200 px-6 py-2 rounded-xl font-bold transition">返回</button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 bg-slate-100 p-1.5 rounded-2xl w-fit">
          <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black transition ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}><TableIcon size={18}/> 列表</button>
          <button onClick={() => setViewMode('add')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black transition ${viewMode === 'add' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}><Plus size={18}/> 新增</button>
          <button onClick={() => setViewMode('bulk')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black transition ${viewMode === 'bulk' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}><Upload size={18}/> 批次匯入</button>
          <button onClick={() => setViewMode('ts')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black transition ${viewMode === 'ts' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}><Code size={18}/> 導出代碼</button>
      </div>

      {viewMode === 'table' && (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="搜尋英文、中文或日期 (YYYY-MM-DD)..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                />
            </div>
            
            <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black">
                        <tr>
                            <th className="px-6 py-4">單字</th>
                            <th className="px-6 py-4">中文/詞性</th>
                            <th className="px-6 py-4">日期</th>
                            <th className="px-6 py-4 text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredWords.map(w => (
                            <tr key={w.id} className="hover:bg-blue-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-black text-slate-800 text-lg">{w.english}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-600">{w.chinese}</div>
                                    <div className="text-xs text-slate-400 italic">{w.part_of_speech}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">{w.date}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => handleDelete(w.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredWords.length === 0 && <div className="p-20 text-center text-slate-400 font-bold">找不到相關單字</div>}
            </div>
        </div>
      )}

      {viewMode === 'add' && (
        <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 max-w-2xl mx-auto shadow-inner">
            <h3 className="text-xl font-black text-slate-700 mb-6">錄入新單字資料</h3>
            <form onSubmit={handleAdd} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">日期</label>
                        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white bg-white shadow-sm focus:border-blue-500 outline-none font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">詞性</label>
                        <select value={newPos} onChange={e => setNewPos(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white bg-white shadow-sm focus:border-blue-500 outline-none font-bold">
                            <option value="(n.)">名詞 (n.)</option>
                            <option value="(v.)">動詞 (v.)</option>
                            <option value="(adj.)">形容詞 (adj.)</option>
                            <option value="(adv.)">副詞 (adv.)</option>
                            <option value="(phr.)">片語 (phr.)</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">英文單字</label>
                    <input type="text" placeholder="例如: Apple" required value={newEng} onChange={e => setNewEng(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white bg-white shadow-sm focus:border-blue-500 outline-none font-black text-xl" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">中文意思</label>
                    <input type="text" placeholder="例如: 蘋果" required value={newChi} onChange={e => setNewChi(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-white bg-white shadow-sm focus:border-blue-500 outline-none font-bold" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-95 text-lg">確認新增</button>
            </form>
        </div>
      )}

      {viewMode === 'bulk' && (
          <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl flex gap-4">
                  <div className="text-amber-500 mt-1"><AlertCircle size={24}/></div>
                  <div>
                      <h4 className="font-black text-amber-800">批次匯入說明</h4>
                      <p className="text-sm text-amber-700 font-medium mt-1">
                          請將資料貼在下方文字框，每行一個單字。格式如下：<br/>
                          <code className="bg-amber-200/50 px-2 py-0.5 rounded font-bold">英文,中文,詞性,日期(可選)</code><br/>
                          也支援直接從 Excel 複製貼上 (Tab 分隔)。
                      </p>
                  </div>
              </div>
              
              <textarea 
                  value={bulkText}
                  onChange={e => setBulkText(e.target.value)}
                  placeholder="apple,蘋果,(n.),2024-12-01&#10;banana,香蕉,(n.),2024-12-01"
                  className="w-full h-80 p-6 rounded-3xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all font-mono"
              />

              <button 
                  onClick={handleBulkImport}
                  className="w-full bg-slate-800 hover:bg-black text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3"
              >
                  <FileText size={24}/> 開始解析並匯入
              </button>
          </div>
      )}

      {viewMode === 'ts' && (
        <div className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex items-center justify-between">
                <div>
                    <h4 className="font-black text-blue-800 text-lg">NAS 靜態更新流程</h4>
                    <p className="text-blue-600/70 text-sm font-medium">複製下方代碼並覆蓋 src/services/serverData.ts，即可永久更新單字表。</p>
                </div>
                <button onClick={() => {
                    navigator.clipboard.writeText(generateTsString(words));
                    showMsg("已複製到剪貼簿！");
                }} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-blue-700 transition shadow-lg"><Copy size={18}/> 複製代碼</button>
            </div>
            <textarea readOnly value={generateTsString(words)} className="w-full h-[500px] p-6 font-mono text-xs bg-slate-900 text-blue-300 rounded-3xl outline-none border-4 border-slate-800 shadow-2xl" />
        </div>
      )}

      {infoMessage && (
          <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl font-black shadow-2xl animate-bounce z-50 flex items-center gap-3 ${infoMessage.type === 'success' ? 'bg-slate-800 text-white' : 'bg-red-600 text-white'}`}>
              {infoMessage.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
              {infoMessage.text}
          </div>
      )}
    </div>
  );
};

export default WordManager;
