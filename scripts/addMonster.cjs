const fs = require('fs');
const path = require('path');

const MONSTER_DATA_PATH = path.join(__dirname, '../services/monsterData.ts');

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('用法: node addMonster.cjs <怪獸名稱> <圖片名稱> <是否為Boss(true/false)> [CSS濾鏡]');
  console.log('範例: node addMonster.cjs 火焰龍 mon_30.png false "hue-rotate(10deg)"');
  process.exit(1);
}

const [monsterName, imageName, isBossStr, cssFilter = ""] = args;
const isLegendary = isBossStr.toLowerCase() === 'true';

try {
  let content = fs.readFileSync(MONSTER_DATA_PATH, 'utf8');
  
  // 找出目前最大的 ID
  const idRegex = /id:\s*(\d+)/g;
  let match;
  let maxId = 0;
  while ((match = idRegex.exec(content)) !== null) {
    const id = parseInt(match[1], 10);
    if (id > maxId) {
      maxId = id;
    }
  }
  
  const newId = maxId + 1;
  const legendaryStr = isLegendary ? ', isLegendary: true' : '';
  const newEntry = `  ${newId}: { id: ${newId}, name: '${monsterName}', image: 'monsters/${imageName}', filter: '${cssFilter}'${legendaryStr} },\n`;
  
  // 找到陣列結束前的位置插入
  const insertIndex = content.lastIndexOf('};');
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + newEntry + content.slice(insertIndex);
    fs.writeFileSync(MONSTER_DATA_PATH, content);
    console.log(`✅ 成功新增怪獸: [${newId}] ${monsterName} (${imageName})`);
  } else {
    console.log('❌ 找不到插入位置，請確認 monsterData.ts 格式');
  }
} catch (error) {
  console.error('執行錯誤:', error.message);
}
