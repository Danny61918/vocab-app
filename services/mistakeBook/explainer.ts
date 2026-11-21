import { MONSTER_DATA, Monster } from '../monsterData';
import { DrillItem } from './drills/types';

// Which monster pops up to explain a wrong answer: one the child has already collected (so "my monster is
// teaching me"), otherwise any ordinary monster. `ownedIds` and `rng` are injected so it can be tested.
export function pickExplainerMonster(ownedIds: number[], rng: () => number = Math.random): Monster {
  const owned = ownedIds.map((id) => MONSTER_DATA[id]).filter((m): m is Monster => !!m);
  const pool = owned.length > 0 ? owned : Object.values(MONSTER_DATA).filter((m) => !m.isLegendary);
  return pool[Math.floor(rng() * pool.length)];
}

export interface ExplainStep {
  title: string;
  body: string;
  example?: { right: string; wrong: string };
}

// Steps the monster walks through. Items with a hand-checked `kidExplain` get the three-step version;
// every other item falls back to its single existing explanation.
export function explainSteps(item: DrillItem): ExplainStep[] {
  const k = item.kidExplain;
  if (!k) return [{ title: '怪獸解說', body: item.explanation }];
  return [
    { title: '第 1 步：為什麼？', body: k.why },
    { title: '第 2 步：怎麼想？', body: k.how },
    { title: '第 3 步：比比看', body: '', example: k.example },
  ];
}

// Text the parent can paste into any AI chat. It carries only the question, never anything personal.
export function buildAskAiPrompt(item: DrillItem, picked: string): string {
  const options = [item.answer, ...item.distractors.map((d) => d.text)].sort();
  return [
    '我是家長。孩子（台灣小學四年級，在美語學校上課）做英文練習題答錯了，請用小學生聽得懂的中文，說明「為什麼錯」和「下次該怎麼想」，再各給對、錯的例句對比。',
    '如果這個規則可能因為學校教法不同而有差異，請先告訴我你的假設。',
    '',
    `題目：${item.stem}`,
    `選項：${options.join(' ／ ')}`,
    `孩子選的：${picked}`,
    `正確答案：${item.answer}`,
  ].join('\n');
}
