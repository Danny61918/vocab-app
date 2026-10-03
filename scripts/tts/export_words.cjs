// Exports { id: speakable_word } for every word, using the same cleanup rule
// as PracticeView.speechWord(): take the text before the first "/", strip any
// "(...)" annotations (e.g. "pyjamas(Br.)/pajamas(US)" -> "pyjamas").
// Run from the repo root: node scripts/tts/export_words.cjs > scripts/tts/words.json

const fs = require('fs');
const path = require('path');
const os = require('os');

const root = path.resolve(__dirname, '..', '..');

function loadAsCommonJs(relPath, transform) {
  const src = fs.readFileSync(path.join(root, relPath), 'utf8');
  const transformed = transform(src);
  const tmpFile = path.join(os.tmpdir(), `export_words_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
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

const speechWord = (english) => english.split('/')[0].replace(/\(.*?\)/g, '').trim();

const out = {};
for (const w of serverData) {
  const word = speechWord(w.english);
  if (word) out[w.id] = word;
}

process.stdout.write(JSON.stringify(out, null, 2));
