// Appends serverData words that aren't yet in newVocabData's vocabData array,
// so the SRS game ("單字島大冒險") stays in sync with the weekly serverData
// imports instead of being frozen at whatever snapshot it started from.
//
// Idempotent: each appended entry gets a deterministic id "s{serverData.id}",
// so re-running only appends serverData ids not already represented that way.
//
// Usage: node scripts/sync_vocab_data.cjs [--dry-run]

const fs = require('fs');
const path = require('path');
const os = require('os');

const root = path.resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');

function loadAsCommonJs(relPath, transform) {
  const src = fs.readFileSync(path.join(root, relPath), 'utf8');
  const transformed = transform(src);
  const tmpFile = path.join(os.tmpdir(), `sync_vocab_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
  fs.writeFileSync(tmpFile, transformed);
  try {
    delete require.cache[require.resolve(tmpFile)];
    return require(tmpFile);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

const serverData = loadAsCommonJs('services/serverData.ts', (src) =>
  src
    .replace("import { Word } from '../types';", '')
    .replace('const serverData: Word[] =', 'const serverData =')
    .replace('export default serverData;', 'module.exports = serverData;')
);

const vocabDataPath = path.join(root, 'services', 'newVocabData.ts');
const vocabDataSrc = fs.readFileSync(vocabDataPath, 'utf8');
const existingIds = new Set([...vocabDataSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]));

function toNewLine(w) {
  const partOfSpeech = w.part_of_speech.replace(/[()]/g, '');
  const word = w.english.replace(/"/g, '\\"');
  const meaning = w.chinese.replace(/"/g, '\\"');
  return `  { id: "s${w.id}", word: "${word}", partOfSpeech: "${partOfSpeech}", meaning: "${meaning}" },`;
}

const newEntries = serverData.filter((w) => !existingIds.has(`s${w.id}`));

console.log(`${newEntries.length} serverData word(s) not yet in vocabData (of ${serverData.length} total).`);
if (newEntries.length === 0) {
  console.log('Nothing to do.');
  process.exit(0);
}

if (dryRun) {
  console.log(`First: id ${newEntries[0].id} (${newEntries[0].english}, ${newEntries[0].date})`);
  console.log(`Last:  id ${newEntries[newEntries.length - 1].id} (${newEntries[newEntries.length - 1].english}, ${newEntries[newEntries.length - 1].date})`);
  process.exit(0);
}

const lines = newEntries.map(toNewLine).join('\n');
const updated = vocabDataSrc.replace(/\n\];\s*$/, `\n${lines}\n];\n`);

if (updated === vocabDataSrc) {
  throw new Error('Could not find the closing "];" of vocabData to append to — aborting.');
}

fs.writeFileSync(vocabDataPath, updated, 'utf8');
console.log(`Appended ${newEntries.length} entries to ${path.relative(root, vocabDataPath)}.`);
