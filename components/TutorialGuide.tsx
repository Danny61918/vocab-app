import React from 'react';

interface Props {
  onBack: () => void;
}

export const TutorialGuide: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center min-h-[90vh] p-4 md:p-8 font-sans relative animate-fade-in pb-20">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 bg-white text-emerald-700 text-xl md:text-2xl font-bold py-2 md:py-3 px-4 md:px-6 rounded-2xl hover:bg-emerald-50 transition border-4 border-emerald-100 shadow-sm z-10"
      >
        ⬅️ 回到大廳
      </button>

      <div className="text-center mt-16 mb-12 w-full max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-black text-blue-600 drop-shadow-md mb-4 tracking-widest font-['Outfit']">
          ❓ 怎麼玩這個遊戲？
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-bold">
          跟著下面三個步驟，成為最強的單字大師！
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* Step 1 */}
        <div className="bg-white rounded-[3rem] p-8 md:p-10 border-4 border-amber-200 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform">
          <div className="absolute top-0 right-0 bg-amber-400 text-white font-black text-2xl px-6 py-2 rounded-bl-3xl">第一步</div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl md:text-9xl group-hover:scale-110 transition-transform drop-shadow-lg">🪙</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-black text-amber-600 mb-4">玩測驗，賺金幣！</h2>
              <p className="text-2xl text-slate-600 font-bold leading-relaxed">
                不管是玩「單字島大冒險」、「文法特訓」還是「片語填空」，只要你每答對一題，系統就會給你 <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">10 枚金幣</span> 的獎勵哦！
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-[3rem] p-8 md:p-10 border-4 border-indigo-200 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform">
          <div className="absolute top-0 right-0 bg-indigo-400 text-white font-black text-2xl px-6 py-2 rounded-bl-3xl">第二步</div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl md:text-9xl group-hover:animate-bounce drop-shadow-lg">🥚</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-black text-indigo-600 mb-4">魔法扭蛋機抽怪獸！</h2>
              <p className="text-2xl text-slate-600 font-bold leading-relaxed">
                存滿 500 金幣後，趕快點擊首頁的「單字島大冒險」，去左下角的「魔法扭蛋機」抽一顆魔法蛋吧！裡面藏了整整 <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">100 隻不同的怪獸</span> 等你收集！
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[3rem] p-8 md:p-10 border-4 border-orange-300 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform">
          <div className="absolute top-0 right-0 bg-orange-500 text-white font-black text-2xl px-6 py-2 rounded-bl-3xl">第三步</div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl md:text-9xl group-hover:scale-125 transition-transform drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">✨</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-black text-orange-600 mb-4">怪獸進化升級！</h2>
              <p className="text-2xl text-slate-600 font-bold leading-relaxed">
                如果抽扭蛋不小心抽到「已經擁有的怪獸」怎麼辦？別擔心！重複的怪獸會獲得大量的 <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg">經驗值 (EXP)</span>！累積經驗值能讓怪獸升級、變大，甚至發出酷炫的光芒哦！
              </p>
            </div>
          </div>
        </div>

      </div>

      <button 
        onClick={onBack}
        className="mt-12 bg-emerald-500 hover:bg-emerald-600 text-white text-3xl font-black py-4 px-12 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform"
      >
        我準備好出發了！
      </button>

    </div>
  );
};
