import React from 'react';
import { MONSTER_DATA } from '../services/monsterData';
import { loadLevelProgress, loadMasteryData } from '../services/srsStorage';
import { GRAMMAR_BOSS_MAP } from '../services/grammarData';

interface Props {
  onBack: () => void;
}

export const MonsterGallery: React.FC<Props> = ({ onBack }) => {
  const { unlockedMonsters } = loadLevelProgress();
  const mastery = loadMasteryData();
  const masteredCount = Object.values(mastery).filter(m => m.masteryLevel >= 2).length;

  const monsters = Object.values(MONSTER_DATA);
  const grammarBossIds = Object.values(GRAMMAR_BOSS_MAP);
  
  const vocabMonsters = monsters.filter(m => !grammarBossIds.includes(m.id));
  const grammarMonsters = monsters.filter(m => grammarBossIds.includes(m.id));

  // Determine grammar category name for display
  const getGrammarCategoryName = (id: number) => {
    if (id === GRAMMAR_BOSS_MAP.PREPOSITION_TIME) return "擊敗「時間介系詞」關卡解鎖";
    if (id === GRAMMAR_BOSS_MAP.PREPOSITION_PLACE) return "擊敗「地方介系詞」關卡解鎖";
    if (id === GRAMMAR_BOSS_MAP.TENSE_PRESENT_SIMPLE) return "擊敗「現在簡單式」關卡解鎖";
    if (id === GRAMMAR_BOSS_MAP.TENSE_PRESENT_CONTINUOUS) return "擊敗「現在進行式」關卡解鎖";
    return "在文法挑戰中擊敗解鎖";
  };

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

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl mb-12">
        {vocabMonsters.map((monster) => {
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

              {!isUnlocked && monster.isLegendary && (
                <div className="text-sm text-red-400 font-bold mt-1 text-center">
                  {monster.id === 21 && `(需精熟 50 個單字)`}
                  {monster.id === 22 && `(需精熟 100 個單字)`}
                  {monster.id === 23 && `(需精熟所有單字)`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-6xl mb-6 flex items-center gap-4">
          <div className="h-1 flex-1 bg-rose-200 rounded-full"></div>
          <h2 className="text-4xl font-black text-rose-600 tracking-wider">🔥 文法專屬魔王特區</h2>
          <div className="h-1 flex-1 bg-rose-200 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {grammarMonsters.map((monster) => {
          const isUnlocked = unlockedMonsters.includes(monster.id);
          
          return (
            <div 
              key={monster.id}
              className={`relative rounded-3xl p-6 flex flex-col items-center transition-all duration-500 ${
                isUnlocked 
                  ? 'bg-gradient-to-b from-rose-50 to-orange-50 border-4 border-rose-300 shadow-xl hover:-translate-y-2' 
                  : 'bg-gray-100 border-4 border-gray-200 opacity-70'
              }`}
            >
              {isUnlocked && (
                <div className="absolute -top-4 -right-4 text-4xl z-10 animate-bounce">⚔️</div>
              )}
              
              <div className="text-xl font-bold text-gray-400 absolute top-4 left-4">
                #{monster.id.toString().padStart(3, '0')}
              </div>

              <div className="w-32 h-32 mt-6 mb-4 flex items-center justify-center relative">
                {isUnlocked ? (
                  <img 
                    src={monster.image} 
                    alt={monster.name} 
                    className="max-w-full max-h-full object-contain animate-fade-in drop-shadow-[0_0_15px_rgba(255,0,0,0.2)]"
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
                    <div className="absolute inset-0 flex items-center justify-center text-5xl text-gray-800 scale-150">?</div>
                  </div>
                )}
              </div>

              <div className={`text-2xl font-black mt-auto pb-2 ${
                isUnlocked ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500' : 'text-gray-400 tracking-widest'
              }`}>
                {isUnlocked ? monster.name : '???'}
              </div>

              {!isUnlocked && (
                <div className="text-sm text-rose-500 font-bold mt-2 text-center bg-rose-50 px-2 py-1 rounded-lg w-full">
                   {getGrammarCategoryName(monster.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
