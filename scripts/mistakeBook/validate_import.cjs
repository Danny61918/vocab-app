// Validates every data file under services/mistakeBook/data/ against the
// MistakeRecord shape (types.ts) and checks for duplicate/mismatched ids.
// Run this after every import — see services/mistakeBook/types.ts for why.
//
// Usage: node scripts/mistakeBook/validate_import.cjs

const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '..', '..');
const DATA_DIR = path.join(ROOT, 'services', 'mistakeBook', 'data');

const VALID_CATEGORIES = new Set([
  'capitalization', 'plural_possessive', 'preposition', 'verb_tense',
  'pronoun_reference', 'context_carelessness', 'spelling', 'sentence_structure', 'other',
]);
const VALID_QUESTION_TYPES = new Set([
  'multiple_choice', 'rewrite', 'fill_blank', 'reading_comprehension',
]);
const REQUIRED_STRING_FIELDS = [
  'id', 'examDate', 'section', 'questionText', 'studentAnswer', 'correctAnswer',
  'errorCategory', 'rawErrorType', 'teacherExplanation', 'reviewAdvice',
  'questionType', 'importedAt',
];

function fnv1a(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}
function idForMistake(examDate, questionText, correctAnswer) {
  return `${examDate}_${fnv1a(`${examDate}|${questionText}|${correctAnswer}`)}`;
}

function loadDataFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const transformed = src
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export default /, 'module.exports = ')
    .replace(/\bsatisfies\s+MistakeRecord\[\]/, '')
    .replace(/:\s*MistakeRecord\[\]/, '');
  const tmpFile = path.join(os.tmpdir(), `mistakebook_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
  fs.writeFileSync(tmpFile, transformed);
  try {
    delete require.cache[require.resolve(tmpFile)];
    return require(tmpFile);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.log(`No data directory at ${DATA_DIR} yet — nothing to validate.`);
    return;
  }
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.ts'));
  if (files.length === 0) {
    console.log('No mistake-book data files yet.');
    return;
  }

  let totalRecords = 0;
  const errors = [];
  const seenIds = new Map(); // id -> file it first appeared in

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    let records;
    try {
      records = loadDataFile(filePath);
    } catch (err) {
      errors.push(`${file}: failed to load — ${err.message}`);
      continue;
    }
    if (!Array.isArray(records)) {
      errors.push(`${file}: expected an array, got ${typeof records}`);
      continue;
    }

    records.forEach((rec, i) => {
      totalRecords += 1;
      const where = `${file}[${i}]`;

      for (const field of REQUIRED_STRING_FIELDS) {
        if (typeof rec[field] !== 'string' || rec[field].trim() === '') {
          errors.push(`${where}: missing or empty required field "${field}"`);
        }
      }
      if (rec.options !== undefined && !Array.isArray(rec.options)) {
        errors.push(`${where}: "options" present but not an array`);
      }
      if (rec.errorCategory && !VALID_CATEGORIES.has(rec.errorCategory)) {
        errors.push(`${where}: invalid errorCategory "${rec.errorCategory}"`);
      }
      if (rec.questionType && !VALID_QUESTION_TYPES.has(rec.questionType)) {
        errors.push(`${where}: invalid questionType "${rec.questionType}"`);
      }

      if (rec.examDate && rec.questionText && rec.correctAnswer) {
        const expectedId = idForMistake(rec.examDate, rec.questionText, rec.correctAnswer);
        if (rec.id !== expectedId) {
          errors.push(`${where}: id "${rec.id}" does not match expected "${expectedId}" for its (examDate, questionText, correctAnswer)`);
        }
      }

      if (rec.id) {
        if (seenIds.has(rec.id)) {
          errors.push(`${where}: duplicate id "${rec.id}" (first seen in ${seenIds.get(rec.id)})`);
        } else {
          seenIds.set(rec.id, where);
        }
      }
    });
  }

  console.log(`Checked ${files.length} file(s), ${totalRecords} record(s).`);
  if (errors.length === 0) {
    console.log('All records valid. No duplicates.');
  } else {
    console.log(`${errors.length} problem(s) found:`);
    errors.forEach((e) => console.log(`  - ${e}`));
    process.exitCode = 1;
  }
}

main();
