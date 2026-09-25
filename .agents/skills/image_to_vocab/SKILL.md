---
name: image_to_vocab
description: Extracts vocabulary from photographed vocab-table images (direct multimodal OCR), converts them into this project's data format, appends them to the vocabulary database, and generates 5 example sentences per word. Use when the user provides image paths/folders of vocabulary tables and asks to import or add them.
---

# Image → Vocabulary Import Workflow

This skill turns photos of vocabulary-table worksheets into project data. It replaces the
manual "OCR in a web chat → convert to JSON → paste into IDE" round-trip: you read the
images directly with the multimodal `Read` tool (no external OCR engine) and write straight
into the two data files.

## Target data files & formats

**1. `services/serverData.ts`** — the vocabulary database. `Word[]` (see `types.ts`):
```ts
{ "id": 799, "date": "2026-03-05", "english": "polite", "chinese": "有禮貌的", "part_of_speech": "(adj.)", "example": "We should always be polite and say 'please' and 'thank you' to people." }
```
- `id`: sequential integer, unique. Continue from the current max id in the array.
- `date`: `YYYY-MM-DD`.
- `part_of_speech`: always wrapped in parentheses — `(n.) (v.) (adj.) (adv.) (ph.)`.
- `example`: one sentence (see rules below).

**2. `services/exampleSentencesData.ts`** — extra sentences, keyed by the word's id:
```ts
export const EXTRA_SENTENCES: Record<number, string[]> = {
    799: [ "sentence 1", ..., "sentence 5" ],
};
```

## Reading the vocab-table images (the "OCR" step)

Vocab-table images look like `Vocabilary_image/ww11/0305.jpeg`. Typical layout:

| Image column | Example | Maps to |
|---|---|---|
| Left vertical label | `Thursday (3/5)` | `date` (month/day; year supplied per batch) |
| Row number | `11. 12. 13.` | **ignore** — this is the weekly sequence, NOT the DB id |
| Vocabulary | `polite` + `有禮貌的` (with 注音/zhuyin) | `english` + `chinese` |
| Part of speech | `(adj.)` | `part_of_speech` (already parenthesized) |
| Examples | `* politely (adv.) 有禮貌地` then `e.g. We should...` | `example` (the `e.g.` sentence) |

Extraction rules:
- **Strip zhuyin/bopomofo** (the small superscript ㄅㄆㄇ marks) from Chinese — store Han characters only. e.g. `有ㄧㄡˇ禮ㄌㄧˇ貌ㄇㄠˋ的˙` → `有禮貌的`.
- **Preserve multi-meaning separators** exactly as written (`服務；提供`, `片/塊`, `紳士、先生`).
- **Ignore the `*` extension notes** (plural forms like `*(plural) ladies`, adverb forms like
  `*politely (adv.)`). Do not store them and do not create separate words for them.
- **`english`**: the bold headword, verbatim (keep multi-word entries and phrases like
  `smile at sb.`, `take out the trash`).
- **Read every provided image**, top-to-bottom, before writing anything.

## Workflow

### 0. Get the year
Each import batch spans images whose filenames are `MMDD` (e.g. `0305` = March 5). Ask the
user for the year if not already given this batch, then build `date = YYYY-MM-DD` from
`filename MMDD` + that year. (Fall back to the in-image weekday like `Thursday (3/5)` only to
sanity-check the month/day.)

### 1. Extract
Read each image and build a structured list of rows:
`{ english, chinese (zhuyin stripped), part_of_speech, textbook_example (the e.g. sentence, or null), date }`.

### 2. Review checkpoint (required)
Present the extracted rows back to the user as a compact table BEFORE writing files. Photos
+ zhuyin + handwriting make OCR errors likely; the user must confirm or correct. Do not skip
this step. Only proceed to write after confirmation.

### 3. Assign IDs (DO NOT de-duplicate against earlier weeks)
- Read the tail of `services/serverData.ts` to find the current max `id`.
- Assign a new sequential id to **every** extracted word starting at `maxId + 1`.
- **Do NOT skip words that already exist from an earlier week.** Vocabulary lists are handed
  out and quizzed **weekly**, and the app selects practice words **by `date`**
  (`App.tsx` date-range filter, `DailyChallenge.tsx` `w.date === target`). A word omitted
  because it appeared in a previous week would be missing from *this* week's practice set.
  Re-add it as a fresh entry with a new id and the current week's date.
- Only genuine intra-image repeats (the exact same word listed twice on the same page) should
  be collapsed. Cross-week repeats are expected and must be kept.
- Technical note: `services/exampleLookup.ts` keys `getAllSentences()` by the English string
  (first entry wins), so a re-added duplicate's `EXTRA_SENTENCES` are not reached via that
  path — but the main `SENTENCE_CLOZE` game reads `example` by **id**, so the re-added word
  still works correctly in the date-selected weekly quiz. Still give each new entry its own
  `example`; generating the 5 `EXTRA_SENTENCES` for exact cross-week duplicates is optional
  (they would be redundant), but harmless if included for uniformity.

### 4. Write the vocabulary database
Append the new `Word` objects to the `serverData` array in `services/serverData.ts`
(before the closing `];`). `example` field rule:
- **Textbook first**: use the `e.g.` sentence extracted from the image when present.
- **Generate if missing**: if a row had no `e.g.` sentence, generate one contextual sentence
  that uses the word.

### 5. Generate & write example sentences
For **each** newly added word, generate exactly **5** diverse, contextual sentences and add
them to `EXTRA_SENTENCES` in `services/exampleSentencesData.ts`, keyed by the word's new id,
appended before the closing `};`.
- Sentences MUST use the target English word (the generation rule is "use the vocab word").
- Keep them natural and level-appropriate (this is a children's English app); vary subjects,
  tenses, and situations. Avoid reusing the textbook sentence verbatim as one of the 5 unless
  it fits naturally.

### 6. Verify
- No duplicate ids in `serverData` or `EXTRA_SENTENCES`.
- Valid TypeScript/JSON syntax (quotes, commas, closing brackets intact).
- Report to the user: which ids were assigned to which words, how many words were skipped as
  duplicates, and that both files were updated.

### 7. Generate sentence audio (Practice page)
The Practice page (`components/PracticeView.tsx`) plays a natural-sounding TTS audio clip
(Kokoro-82M, generated locally) for each word's example sentence, instead of the browser's
robotic `speechSynthesis`. See `.doc/v2.0/phase-8-sentence-audio/README.md` for the full
picture. Re-run `python scripts/tts/generate_sentence_audio.py` (with the `tts-env` venv
active) after this import — it skips ids that already have audio, so it's safe to re-run,
and `--dry-run` previews what it would generate. Not required for the app to keep working
(it falls back to browser TTS for words missing audio), but flag to the user that this step
still needs to run before/along with deploy.

## Notes
- This skill is the image-based front end to the same data model as the `add_vocabulary`
  skill; when the user pastes a plain word list instead of images, prefer `add_vocabulary`.
- Never invent words that aren't in the image. If a cell is unreadable, flag it at the review
  checkpoint rather than guessing.
