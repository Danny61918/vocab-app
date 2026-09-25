// Exports { id: sentence } for every word, using the same priority as
// PracticeView.sentencesFor(): EXTRA_SENTENCES[id][0] first, else serverData[id].example.
// Run from the repo root: node scripts/tts/export_sentences.cjs > scripts/tts/sentences.json

const fs = require('fs');
const path = require('path');
const os = require('os');

const root = path.resolve(__dirname, '..', '..');

function loadAsCommonJs(relPath, transform) {
  const src = fs.readFileSync(path.join(root, relPath), 'utf8');
  const transformed = transform(src);
  const tmpFile = path.join(os.tmpdir(), `export_sentences_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
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

const extraSentences = loadAsCommonJs('services/exampleSentencesData.ts', (src) =>
  src.replace('export const EXTRA_SENTENCES: Record<number, string[]> =', 'module.exports =')
);

const out = {};
for (const w of serverData) {
  const extras = extraSentences[w.id];
  const sentence = (extras && extras.length > 0) ? extras[0] : w.example;
  if (sentence) out[w.id] = sentence;
}

process.stdout.write(JSON.stringify(out, null, 2));
