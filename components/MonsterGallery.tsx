import React from 'react';
import { MONSTER_DATA } from '../services/monsterData';
import { loadLevelProgress, loadMasteryData } from '../services/srsStorage';

interface Props {
  onBack: () => void;
}

export const MonsterGallery: React.FC<Props> = ({ onBack }) => {
  const { unlockedMonsters } = loadLevelProgress();
  const mastery = loadMasteryData();
  const masteredCount = Object.values(mastery).filter(m => m.masteryLevel >= 2).length;

  const monsters = Object.values(MONSTER_DATA);

  return (
    <div className="flex flex-col items-center min-h-[90vh] p-8 pb-20 font-sans relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 bg-white text-emerald-700 text-2xl font-bold py-3 px-6 rounded-2xl hover:bg-emerald-50 transition border-4 border-emerald-100 shadow-sm"
      >
        ⬅️ 回到地圖
      </button>

      <div className="text-center mt-12 mb-10 w-full max-w-6xl">
        <h1 className="text-6xl font-black text-yellow-600 drop-shadow-md mb-4 tracking-widest font-['Outfit']">
          👑 怪獸大圖鑑
        </h1>
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="bg-white px-8 py-3 rounded-[2rem] shadow-lg border-4 border-yellow-300 inline-block">
            <span className="text-2xl font-bold text-gray-600">圖鑑收集率: </span>
            <span className="text-4xl font-black text-rose-500 ml-2">{unlockedMonsters.length}</span>
            <span className="text-2xl text-rose-300 font-bold ml-1">/ 23</span>
          </div>
          <div className="bg-white px-8 py-3 rounded-[2rem] shadow-lg border-4 border-emerald-300 inline-block">
            <span className="text-2xl font-bold text-gray-600">已精熟單字: </span>
            <span className="text-4xl font-black text-emerald-500 ml-2">{masteredCount}</span>
            <span className="text-2xl text-emerald-300 font-bold ml-1">字</span>
          </div>
        </div>
        
        <p className="text-lg text-gray-500 font-bold">
          打通關卡可以解鎖一般怪獸。累積收服單字還能解鎖傳說中的大魔王喔！
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {monsters.map((monster) => {
          const isUnlocked = unlockedMonsters.includes(monster.id);
          
          return (
            <div 
              key={monster.id}
              className={`relative rounded-3xl p-6 flex flex-col items-center transition-all duration-500 ${
                isUnlocked 
                  ? 'bg-gradient-to-b from-white to-blue-50 border-4 border-blue-200 shadow-xl hover:-translate-y-2' 
                  : 'bg-gray-100 border-4 border-gray-200 opacity-60'
              } ${monster.isLegendary && isUnlocked ? 'from-yellow-100 to-orange-50 border-yellow-400 shadow-yellow-200 shadow-2xl' : ''}`}
            >
              {monster.isLegendary && (
                <div className="absolute -top-3 -right-3 text-3xl z-10" title="傳說怪獸">✨</div>
              )}
              
              <div className="text-xl font-bold text-gray-400 absolute top-4 left-4">
                #{monster.id.toString().padStart(3, '0')}
              </div>

              <div className="w-32 h-32 mt-6 mb-4 flex items-center justify-center relative">
                {isUnlocked ? (
                  <img 
                    src={monster.image} 
                    alt={monster.name} 
                    className="max-w-full max-h-full object-contain animate-fade-in drop-shadow-md"
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

              <div className={`text-2xl font-black mt-auto pb-2 ${
                isUnlocked 
                  ? (monster.isLegendary ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500' : 'text-blue-800') 
                  : 'text-gray-400 tracking-widest'
              }`}>
                {isUnlocked ? monster.name : '???'}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
