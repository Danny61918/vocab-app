import React, { useState } from 'react';
import { MONSTER_DATA } from '../services/monsterData';
import { getUserData, drawGacha } from '../services/gamification';
import { Coins, Sparkles, Star } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const MonsterGallery: React.FC<Props> = ({ onBack }) => {
  const [userData, setUserData] = useState(getUserData());
  const [gachaResult, setGachaResult] = useState<{ monsterId: number; isNew: boolean; levelUp: boolean } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const monsters = Object.values(MONSTER_DATA);
  const ownedCount = Object.keys(userData.ownedMonsters).length;

  const handleDraw = () => {
    if (userData.coins < 500 || isDrawing) return;
    
    setIsDrawing(true);
    setGachaResult(null);
    
    // Fake loading delay for suspense
    setTimeout(() => {
      const result = drawGacha();
      if (result) {
        setUserData(getUserData()); // Refresh state
        setGachaResult(result);
      }
      setIsDrawing(false);
    }, 1500);
  };

  const closeGachaResult = () => {
    setGachaResult(null);
  };

  const renderMonster = (monster: any) => {
    const owned = userData.ownedMonsters[monster.id];
    const isUnlocked = !!owned;
    
    // Evolution styles
    let glowStyle = '';
    let sizeClass = '';
    if (owned) {
      if (owned.level >= 3) {
        glowStyle = 'drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]';
        sizeClass = 'scale-125 hover:scale-150 transition-transform';
      } else if (owned.level >= 2) {
        glowStyle = 'drop-shadow-[0_0_15px_rgba(100,200,255,0.6)]';
        sizeClass = 'scale-110 hover:scale-125 transition-transform';
      } else {
        glowStyle = 'drop-shadow-md hover:scale-110 transition-transform';
      }
    }

    return (
      <div 
        key={monster.id}
        className={`relative rounded-3xl p-6 flex flex-col items-center transition-all duration-500 ${
          isUnlocked 
            ? 'bg-gradient-to-b from-white to-blue-50 border-4 border-blue-200 shadow-xl' 
            : 'bg-gray-100 border-4 border-gray-200 opacity-60'
        } ${monster.isLegendary && isUnlocked ? 'from-yellow-100 to-orange-50 border-yellow-400 shadow-yellow-200 shadow-2xl' : ''}`}
      >
        <div className="text-xl font-bold text-gray-400 absolute top-4 left-4">
          #{monster.id.toString().padStart(3, '0')}
        </div>

        {isUnlocked && (
          <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 font-black px-2 py-1 rounded-lg text-sm flex items-center gap-1 shadow-sm">
            Lv.{owned.level}
          </div>
        )}

        <div className="w-32 h-32 mt-8 mb-4 flex items-center justify-center relative">
          {isUnlocked ? (
            <img 
              src={monster.image} 
              alt={monster.name} 
              className={`max-w-full max-h-full object-contain animate-fade-in ${glowStyle} ${sizeClass}`}
              style={{ filter: monster.filter }}
            />
          ) : (
            <div className="w-full h-full opacity-30 brightness-0 flex items-center justify-center relative">
              <img 
                src={monster.image} 
                alt="Locked" 
                className="max-w-full max-h-full object-contain drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
                style={{ filter: monster.filter }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-800 scale-150">?</div>
            </div>
          )}
        </div>

        <div className={`text-2xl font-black mt-auto pb-1 ${
          isUnlocked 
            ? (monster.isLegendary ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500' : 'text-blue-800') 
            : 'text-gray-400 tracking-widest'
        }`}>
          {isUnlocked ? monster.name : '???'}
        </div>

        {/* EXP Bar */}
        {isUnlocked && (
          <div className="w-full mt-3 bg-gray-200 rounded-full h-3 shadow-inner relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${owned.level >= 3 ? 100 : (owned.exp % (owned.level === 1 ? 100 : 200)) / (owned.level === 1 ? 100 : 200) * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white drop-shadow-md">
              {owned.level >= 3 ? 'MAX' : `${owned.exp % (owned.level === 1 ? 100 : 200)} / ${owned.level === 1 ? 100 : 200}`}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-[90vh] p-8 pb-20 font-sans relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 bg-white text-emerald-700 text-2xl font-bold py-3 px-6 rounded-2xl hover:bg-emerald-50 transition border-4 border-emerald-100 shadow-sm z-10"
      >
        ⬅️ 回到主畫面
      </button>

      {/* Gacha Modal */}
      {gachaResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={closeGachaResult}>
          <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full text-center border-8 border-yellow-400 shadow-[0_0_50px_rgba(255,215,0,0.5)] transform animate-bounce-short relative" onClick={e => e.stopPropagation()}>
            <div className="absolute -top-12 inset-x-0 flex justify-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-3xl font-black py-2 px-8 rounded-full shadow-lg flex items-center gap-2 border-4 border-white">
                <Sparkles /> {gachaResult.isNew ? '獲得新怪獸！' : '怪獸獲得經驗值！'} <Sparkles />
              </div>
            </div>
            
            <div className="mt-8 mb-6 relative">
               <div className="absolute inset-0 bg-yellow-200 blur-3xl opacity-50 rounded-full animate-pulse"></div>
               <img 
                  src={MONSTER_DATA[gachaResult.monsterId].image} 
                  className={`w-48 h-48 mx-auto object-contain relative z-10 ${gachaResult.isNew ? 'animate-bounce' : 'animate-pulse'}`}
                  style={{ filter: MONSTER_DATA[gachaResult.monsterId].filter }}
                  alt="Monster"
               />
            </div>
            
            <h2 className="text-4xl font-black text-slate-800 mb-2">
              {MONSTER_DATA[gachaResult.monsterId].name}
            </h2>
            
            {!gachaResult.isNew && (
               <div className="text-emerald-600 text-2xl font-black mb-2 animate-pulse">
                  +100 EXP
               </div>
            )}
            {gachaResult.levelUp && (
               <div className="text-orange-500 text-3xl font-black mt-2 flex items-center justify-center gap-2 animate-bounce">
                  <Star fill="currentColor" /> 等級提升！進化！ <Star fill="currentColor" />
               </div>
            )}
            
            <button 
              onClick={closeGachaResult}
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-4 px-12 rounded-full w-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              太棒了！
            </button>
          </div>
        </div>
      )}

      {/* Header & Gacha Machine */}
      <div className="text-center mt-12 mb-10 w-full max-w-6xl">
        <h1 className="text-6xl font-black text-yellow-600 drop-shadow-md mb-8 tracking-widest font-['Outfit']">
          🥚 魔法扭蛋與圖鑑
        </h1>
        
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-[3rem] border-4 border-indigo-100 shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="bg-amber-100 text-amber-700 px-6 py-3 rounded-2xl font-black text-3xl flex items-center gap-3 shadow-inner border-2 border-amber-200">
              <Coins size={36} />
              {userData.coins} <span className="text-xl">金幣</span>
            </div>
            <p className="text-slate-500 font-bold px-2 text-left">
              完成任何單字測驗都會獎勵金幣。<br/>重複抽到相同怪獸可以讓牠們升級進化！
            </p>
          </div>
          
          <button 
            onClick={handleDraw}
            disabled={userData.coins < 500 || isDrawing}
            className={`relative group overflow-hidden px-8 py-6 rounded-3xl font-black text-2xl shadow-xl transition-all duration-300 ${
              userData.coins >= 500 
                ? 'bg-gradient-to-b from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white hover:scale-105 active:scale-95 cursor-pointer border-b-8 border-orange-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed border-b-8 border-gray-300'
            }`}
          >
            {isDrawing ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Sparkles /> 施展魔法中...
              </span>
            ) : (
              <span className="flex flex-col items-center gap-1">
                <span>抽取魔法蛋</span>
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <Coins size={16} /> 500
                </span>
              </span>
            )}
            
            {/* Shiny effect overlay */}
            <div className="absolute inset-0 -translate-x-full bg-white/30 skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>
      </div>

      {/* Collection Stats */}
      <div className="flex justify-center items-center gap-8 mb-8 w-full max-w-6xl">
          <div className="bg-white px-8 py-3 rounded-[2rem] shadow-lg border-4 border-yellow-300 inline-block">
            <span className="text-2xl font-bold text-gray-600">圖鑑收集率: </span>
            <span className="text-4xl font-black text-rose-500 ml-2">{ownedCount}</span>
            <span className="text-2xl text-rose-300 font-bold ml-1">/ {monsters.length}</span>
          </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl mb-12">
        {monsters.map(renderMonster)}
      </div>
    </div>
  );
};
