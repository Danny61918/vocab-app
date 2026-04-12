import React, { useState } from 'react';
import { SmartDailyReview } from './SmartDailyReview';
import { MonsterGallery } from './MonsterGallery';
import { TOTAL_LEVELS, loadLevelProgress, loadMasteryData } from '../services/srsStorage';

interface Props {
  onBack: () => void;
}

export const VocabAdventureMap: React.FC<Props> = ({ onBack }) => {
  const [activeMode, setActiveMode] = useState<'map' | 'daily' | 'level' | 'gallery'>('map');
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>();
  
  const progress = loadLevelProgress();
  const mastery = loadMasteryData();

  // Basic stats for display
  const masteredCount = Object.values(mastery).filter(m => m.masteryLevel >= 2).length;

  const handleStartDaily = () => {
    setActiveMode('daily');
    setSelectedLevel(undefined);
  };

  const handleStartLevel = (level: number) => {
    setActiveMode('level');
    setSelectedLevel(level);
  };

  const handleCloseReview = () => {
    setActiveMode('map');
  };

  if (activeMode === 'gallery') {
    return <MonsterGallery onBack={() => setActiveMode('map')} />;
  }

  if (activeMode !== 'map') {
    return (
      <div className="w-full h-full relative">
        {/* Background can be styled differently if needed */}
        <SmartDailyReview 
          mode={activeMode as 'daily' | 'level'} 
          levelId={selectedLevel} 
          onClose={handleCloseReview} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[80vh] p-4 font-sans relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 bg-gray-200 text-gray-700 text-2xl font-bold py-3 px-6 rounded-2xl hover:bg-gray-300 transition shadow-sm"
      >
        ⬅️ 回大廳
      </button>

      <div className="text-center mt-12 mb-8">
        <h1 className="text-6xl font-black text-emerald-700 drop-shadow-md mb-4 tracking-wider">
          單字島大冒險 🏝️
        </h1>
        <div className="bg-white px-8 py-3 rounded-full shadow-lg border-4 border-emerald-100 inline-block">
          <span className="text-3xl font-bold text-gray-600">已收服怪獸: </span>
          <span className="text-4xl font-black text-yellow-500 ml-2">{masteredCount}</span>
          <span className="text-2xl text-gray-400 font-bold ml-1">隻</span>
        </div>
      </div>

      <div className="flex w-full max-w-[80rem] gap-8 mt-4">
        {/* Left Side: Daily Mission & Gallery */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="bg-gradient-to-b from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden transform hover:scale-105 transition-transform">
            <div className="text-8xl mb-6 mt-4 drop-shadow-md">🐉</div>
            <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">每日抓寶任務</h2>
            <p className="text-xl text-indigo-100 mb-8 font-bold">
              每天挑選 15 隻怪獸，快來收服牠們！
            </p>
            <button 
              onClick={handleStartDaily}
              className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 text-3xl font-black py-4 px-8 w-full border-b-8 border-yellow-600 rounded-2xl active:border-b-0 active:translate-y-2 transition-all shadow-xl"
            >
              出發抓寶！
            </button>
          </div>

          <button 
            onClick={() => setActiveMode('gallery')}
            className="bg-white rounded-[2rem] p-6 text-center border-4 border-yellow-300 shadow-lg hover:bg-yellow-50 transform hover:scale-105 transition-all group"
          >
            <div className="text-5xl mb-2 group-hover:animate-bounce">📖</div>
            <h3 className="text-3xl font-black text-yellow-700">我的怪獸圖鑑</h3>
            <p className="text-lg text-yellow-600 font-bold mt-2">看看收集到哪些大魔王了？</p>
          </button>
        </div>

        {/* Right Side: Adventure Map */}
        <div className="w-2/3 bg-white rounded-[3rem] p-8 shadow-inner border-8 border-emerald-50 relative">
          <h2 className="text-3xl font-black text-emerald-800 mb-6 border-b-4 border-emerald-100 pb-2">
            🗺️ 冒險地圖 (Level 1 ~ {TOTAL_LEVELS})
          </h2>
          
          <div className="grid grid-cols-4 gap-6 content-start max-h-[500px] overflow-y-auto pr-4 pb-4">
            {Array.from({ length: TOTAL_LEVELS }).map((_, i) => {
              const level = i + 1;
              const isUnlocked = level <= progress.highestUnlockedLevel;
              
              if (!isUnlocked) {
                return (
                  <div key={level} className="bg-gray-100 border-4 border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center opacity-70">
                    <div className="text-4xl text-gray-400 mb-2">🔒</div>
                    <div className="text-xl font-bold text-gray-400">第 {level} 關</div>
                  </div>
                );
              }

              return (
                <button 
                  key={level}
                  onClick={() => handleStartLevel(level)}
                  className="bg-emerald-100 border-b-8 border-emerald-300 hover:bg-emerald-200 rounded-3xl p-6 flex flex-col items-center justify-center active:border-b-0 active:translate-y-2 transition-all shadow-md group relative"
                >
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform drop-shadow-sm">🚩</div>
                  <div className="text-2xl font-black text-emerald-800 tracking-wide">第 {level} 關</div>
                  {level === progress.highestUnlockedLevel && (
                    <div className="absolute -top-3 -right-3 text-3xl animate-bounce">NEW!</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
