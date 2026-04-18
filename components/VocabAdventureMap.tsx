import React, { useState, useEffect } from 'react';
import { SmartDailyReview } from './SmartDailyReview';
import { MonsterGallery } from './MonsterGallery';
import { TOTAL_LEVELS, loadLevelProgress, loadMasteryData, processSpontaneousEscapes } from '../services/srsStorage';

interface Props {
  onBack: () => void;
}

export const VocabAdventureMap: React.FC<Props> = ({ onBack }) => {
  const [activeMode, setActiveMode] = useState<'map' | 'daily' | 'level' | 'gallery'>('map');
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>();
  const [showEscapeAlert, setShowEscapeAlert] = useState<boolean>(false);
  const [escapedCount, setEscapedCount] = useState<number>(0);
  
  const progress = loadLevelProgress();
  const mastery = loadMasteryData();

  useEffect(() => {
    const escapedIds = processSpontaneousEscapes();
    if (escapedIds.length > 0) {
      setEscapedCount(escapedIds.length);
      setShowEscapeAlert(true);
    }
  }, []);

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
      {showEscapeAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-10 max-w-2xl text-center shadow-2xl border-8 border-red-400">
            <div className="text-8xl mb-6 animate-bounce" style={{textShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>⚠️</div>
            <h2 className="text-5xl font-black text-red-600 mb-6 drop-shadow-sm">警報！怪獸逃跑了！</h2>
            <p className="text-2xl text-gray-700 font-bold mb-8 leading-relaxed">
              昨晚有 <span className="text-red-500 text-4xl mx-2 font-black">{escapedCount}</span> 隻怪獸從圖鑑裡偷溜走了...<br/>
              快回到地圖上找找 <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg">⚠️ 紅色關卡</span><br/>把它們重新收服吧！
            </p>
            <button 
              onClick={() => setShowEscapeAlert(false)}
              className="bg-red-500 hover:bg-red-600 text-white text-3xl font-black py-4 px-12 border-b-8 border-red-700 rounded-[2rem] active:border-b-0 active:translate-y-2 transition-all shadow-xl"
            >
              立刻去抓！
            </button>
          </div>
        </div>
      )}

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
              const hasMonster = progress.unlockedMonsters.includes(level);
              const monsterEscaped = isUnlocked && !hasMonster && level <= 20;
              
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
                  className={`border-b-8 rounded-3xl p-6 flex flex-col items-center justify-center active:border-b-0 active:translate-y-2 transition-all shadow-md group relative ${
                    monsterEscaped 
                      ? 'bg-red-50 border-red-300 hover:bg-red-100' 
                      : 'bg-emerald-100 border-emerald-300 hover:bg-emerald-200'
                  }`}
                >
                  <div className="text-5xl mb-2 group-hover:scale-110 transition-transform drop-shadow-sm">🚩</div>
                  <div className={`text-2xl font-black tracking-wide ${monsterEscaped ? 'text-red-700' : 'text-emerald-800'}`}>第 {level} 關</div>
                  
                  {level === progress.highestUnlockedLevel && !monsterEscaped && (
                    <div className="absolute -top-3 -right-3 text-3xl animate-bounce">NEW!</div>
                  )}
                  {monsterEscaped && (
                    <div className="absolute -top-4 -right-4 text-3xl animate-pulse bg-white rounded-full shadow-lg border-2 border-red-200 p-1">⚠️</div>
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
