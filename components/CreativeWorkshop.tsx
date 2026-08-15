/**
 * P7 — Creative Workshop (創作工坊)
 *
 * Three tabs:
 *   🎨 Monster Upload  — photo → preview → save with designer name
 *   ✏️ My Sentences    — type a word + sentence → saved for cloze quiz
 *   ⭐ Wish List       — feature requests from the child
 */

import React, { useState, useRef } from 'react';
import {
  loadCustomMonsters,
  saveCustomMonster,
  deleteCustomMonster,
  loadCustomSentences,
  saveCustomSentence,
  deleteCustomSentence,
  loadWishList,
  saveWishItem,
  updateWishItem,
  type CustomMonster,
  type CustomSentence,
  type WishItem,
} from '../services/customContent';

interface Props {
  onBack: () => void;
}

type Tab = 'monsters' | 'sentences' | 'wishes';

const CreativeWorkshop: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('monsters');

  return (
    <div className="flex flex-col items-center min-h-[80vh] p-4 font-sans relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-gray-200 text-gray-700 text-2xl font-bold py-3 px-6 rounded-2xl hover:bg-gray-300 transition shadow-sm"
      >
        ⬅️ 回大廳
      </button>

      <h1 className="text-5xl font-black text-purple-700 drop-shadow-md mb-6 mt-12 tracking-wider">
        🎨 創作工坊
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {([
          ['monsters', '🐲 我的怪獸'],
          ['sentences', '✏️ 我的例句'],
          ['wishes', '⭐ 許願清單'],
        ] as [Tab, string][]).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-2xl font-black px-6 py-3 rounded-2xl border-b-4 transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white border-purple-800'
                : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl">
        {activeTab === 'monsters' && <MonsterUploadTab />}
        {activeTab === 'sentences' && <MySentencesTab />}
        {activeTab === 'wishes' && <WishListTab />}
      </div>
    </div>
  );
};

// ════════════════════════════════
// Monster Upload Tab
// ════════════════════════════════

function MonsterUploadTab() {
  const [monsters, setMonsters] = useState(loadCustomMonsters());
  const [name, setName] = useState('');
  const [designer, setDesigner] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Limit to ~2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('圖片太大了！請選擇小於 2MB 的圖片');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!preview || !name.trim() || !designer.trim()) return;
    const monster: CustomMonster = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      imageDataUrl: preview,
      designer: designer.trim(),
      createdAt: Date.now(),
    };
    saveCustomMonster(monster);
    setMonsters(loadCustomMonsters());
    setName('');
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    deleteCustomMonster(id);
    setMonsters(loadCustomMonsters());
  };

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-purple-100">
        <h2 className="text-3xl font-black text-purple-800 mb-6">📸 上傳新怪獸</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-lg font-bold text-gray-700 block mb-2">怪獸名字</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="幫牠取個名字吧！"
                className="w-full text-xl p-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 outline-none font-bold"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
            <div>
              <label className="text-lg font-bold text-gray-700 block mb-2">設計師（你的名字）</label>
              <input
                type="text"
                value={designer}
                onChange={(e) => setDesigner(e.target.value)}
                placeholder="輸入你的名字"
                className="w-full text-xl p-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 outline-none font-bold"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
            <div>
              <label className="text-lg font-bold text-gray-700 block mb-2">選擇圖片</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full text-lg p-3 border-4 border-dashed border-purple-200 rounded-2xl"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={!preview || !name.trim() || !designer.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white text-2xl font-black py-4 px-8 rounded-2xl border-b-4 border-purple-800 disabled:border-gray-400 transition-all w-full"
            >
              儲存怪獸！
            </button>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center">
            {preview ? (
              <div className="text-center">
                <img
                  src={preview}
                  alt="怪獸預覽"
                  className="w-48 h-48 object-contain rounded-3xl border-4 border-purple-300 shadow-lg bg-purple-50"
                />
                <p className="text-lg font-bold text-purple-600 mt-2">{name || '???'}</p>
              </div>
            ) : (
              <div className="w-48 h-48 rounded-3xl border-4 border-dashed border-gray-300 flex items-center justify-center text-6xl text-gray-300">
                🖼️
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}
      {monsters.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-purple-100">
          <h2 className="text-3xl font-black text-purple-800 mb-6">🏆 我設計的怪獸</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {monsters.map((m) => (
              <div key={m.id} className="text-center group relative">
                <img
                  src={m.imageDataUrl}
                  alt={m.name}
                  className="w-32 h-32 object-contain mx-auto rounded-2xl border-4 border-purple-200 bg-purple-50 shadow"
                />
                <p className="text-xl font-black text-purple-700 mt-2">{m.name}</p>
                <p className="text-sm font-bold text-purple-400">設計師：{m.designer}</p>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full text-lg font-black opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════
// My Sentences Tab
// ════════════════════════════════

function MySentencesTab() {
  const [sentences, setSentences] = useState(loadCustomSentences());
  const [word, setWord] = useState('');
  const [sentence, setSentence] = useState('');
  const [author, setAuthor] = useState('');

  const handleSave = () => {
    if (!word.trim() || !sentence.trim() || !author.trim()) return;
    // Validate the sentence contains the word
    if (!sentence.toLowerCase().includes(word.toLowerCase())) {
      alert('例句裡面要包含你的英文單字喔！');
      return;
    }
    const item: CustomSentence = {
      id: `sent-${Date.now()}`,
      word: word.trim().toLowerCase(),
      sentence: sentence.trim(),
      author: author.trim(),
      createdAt: Date.now(),
    };
    saveCustomSentence(item);
    setSentences(loadCustomSentences());
    setWord('');
    setSentence('');
  };

  const handleDelete = (id: string) => {
    deleteCustomSentence(id);
    setSentences(loadCustomSentences());
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-emerald-100">
        <h2 className="text-3xl font-black text-emerald-800 mb-6">✏️ 寫一個新例句</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-bold text-gray-700 block mb-2">英文單字</label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="例如：happy"
                className="w-full text-xl p-4 border-4 border-emerald-200 rounded-2xl focus:border-emerald-500 outline-none font-bold"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
            <div>
              <label className="text-lg font-bold text-gray-700 block mb-2">你的名字</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="輸入你的名字"
                className="w-full text-xl p-4 border-4 border-emerald-200 rounded-2xl focus:border-emerald-500 outline-none font-bold"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          </div>
          <div>
            <label className="text-lg font-bold text-gray-700 block mb-2">你的例句（要包含上面的英文單字喔！）</label>
            <textarea
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="例如：I am happy today."
              rows={3}
              className="w-full text-xl p-4 border-4 border-emerald-200 rounded-2xl focus:border-emerald-500 outline-none font-bold resize-none"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!word.trim() || !sentence.trim() || !author.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white text-2xl font-black py-4 px-8 rounded-2xl border-b-4 border-emerald-800 disabled:border-gray-400 transition-all"
          >
            儲存例句！
          </button>
        </div>
      </div>

      {/* Saved sentences */}
      {sentences.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-emerald-100">
          <h2 className="text-3xl font-black text-emerald-800 mb-6">📚 我寫的例句</h2>
          <div className="space-y-4">
            {sentences.map((s) => (
              <div
                key={s.id}
                className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-200 relative group"
              >
                <div className="text-xl font-black text-emerald-700">
                  <span className="bg-emerald-200 px-2 py-1 rounded-lg mr-2">{s.word}</span>
                </div>
                <div className="text-xl font-bold text-gray-700 mt-2">{s.sentence}</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">— {s.author}</div>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full text-lg font-black opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════
// Wish List Tab
// ════════════════════════════════

function WishListTab() {
  const [wishes, setWishes] = useState(loadWishList());
  const [text, setText] = useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    const item: WishItem = {
      id: `wish-${Date.now()}`,
      text: text.trim(),
      createdAt: Date.now(),
      done: false,
    };
    saveWishItem(item);
    setWishes(loadWishList());
    setText('');
  };

  const toggleDone = (id: string, done: boolean) => {
    updateWishItem(id, { done });
    setWishes(loadWishList());
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-amber-100">
        <h2 className="text-3xl font-black text-amber-700 mb-6">⭐ 寫下你的願望</h2>
        <p className="text-xl text-amber-600 font-bold mb-4">
          你希望這個 App 有什麼新功能？寫下來，魔法師會幫你實現！✨
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="我希望..."
            className="flex-1 text-xl p-4 border-4 border-amber-200 rounded-2xl focus:border-amber-500 outline-none font-bold"
            autoComplete="off"
            autoCorrect="off"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white text-2xl font-black py-4 px-8 rounded-2xl border-b-4 border-amber-700 disabled:border-gray-400 transition-all"
          >
            許願！
          </button>
        </div>
      </div>

      {wishes.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-amber-100">
          <h2 className="text-3xl font-black text-amber-700 mb-6">📜 願望清單</h2>
          <div className="space-y-4">
            {wishes.map((w) => (
              <div
                key={w.id}
                className={`rounded-2xl p-5 border-2 flex items-center gap-4 ${
                  w.done
                    ? 'bg-green-50 border-green-300'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <button
                  onClick={() => toggleDone(w.id, !w.done)}
                  className="text-3xl"
                >
                  {w.done ? '✅' : '⬜'}
                </button>
                <div className="flex-1">
                  <div className={`text-xl font-bold ${w.done ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                    {w.text}
                  </div>
                  {w.done && (
                    <div className="text-sm font-bold text-green-500 mt-1">
                      🎉 這是你許願的，已經實現了！
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreativeWorkshop;
