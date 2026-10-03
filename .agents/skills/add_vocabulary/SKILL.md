---
name: add_vocabulary
description: Adds new vocabulary words to the database and automatically generates 5 corresponding example sentences in the example sentence database.
---

# Add Vocabulary Workflow

When the user asks to add new vocabulary words or provides a list of new words to add to the app, follow this workflow exactly:

## 1. Update `services/serverData.ts` (Vocabulary Database)
- Read the end of `services/serverData.ts` to find the highest existing ID in the `serverData` array.
- Assign sequential IDs to the newly provided words starting from the next available ID to prevent conflicts.
- Format the `part_of_speech` by wrapping it in parentheses (e.g., `(ph.)`, `(v.)`, `(n.)`) to match the existing format.
- Generate a new, descriptive, and contextual example sentence for the `example` field of each word.
- Append the new word objects to the `serverData` array in `services/serverData.ts`.

## 2. Update `services/exampleSentencesData.ts` (Example Sentences Database)
- For **each** newly added word, generate exactly **5** new, diverse, and contextual example sentences.
- Add these sentences to the `EXTRA_SENTENCES` object in `services/exampleSentencesData.ts` using the new word's assigned ID as the key.
- Ensure the sentences are formatted correctly as a string array (e.g., `[ "sentence 1", "sentence 2", ... ]`).
- Append these new key-value pairs to the end of the `EXTRA_SENTENCES` object.

## 3. Verify
- Ensure no duplicate IDs exist in either `serverData` or `EXTRA_SENTENCES`.
- Ensure the syntax remains valid TypeScript/JSON.
- Explain clearly to the user what IDs were assigned and that both files were updated.

## 4. Generate sentence audio (Practice page)
The Practice page (`components/PracticeView.tsx`) plays a natural-sounding TTS audio
clip (Kokoro-82M, generated locally) for each word's example sentence, instead of the
browser's robotic `speechSynthesis`. New words won't have this audio until the batch
script runs — see `.doc/v2.0/phase-8-sentence-audio/README.md` for the full picture.
- First re-export the sentence map so it picks up the newly added ids:
  `node scripts/tts/export_sentences.cjs > scripts/tts/sentences.json`
- Then (with the `tts-env` venv at `E:\Code\tools\tts-env`) run:
  `E:\Code\tools\tts-env\Scripts\python.exe scripts\tts\generate_sentence_audio.py`
  It only generates audio for ids that don't have it yet, so it's safe to run repeatedly
  — pass `--dry-run` first to preview what would be generated, or `--ids <range>` to
  scope it to just the new batch (e.g. `--ids 979-1002`).
- If this step is skipped, the app still works: `PracticeView` falls back to browser TTS
  for any word without pre-generated audio. So don't block the vocabulary commit on this —
  just flag to the user that the audio batch still needs to run before/along with deploy.

## 5. Generate standalone-word audio (Practice, Daily Challenge, Smart Daily Review)
Same idea as step 4, but for the word itself (not its example sentence) — used by the
"唸單字" / "慢速單字" / "提示發音" buttons and listening-quiz prompts across
`PracticeView.tsx`, `DailyChallenge.tsx`, and `SmartDailyReview.tsx`.
- First re-export the word map: `node scripts/tts/export_words.cjs > scripts/tts/words.json`
- Then run: `E:\Code\tools\tts-env\Scripts\python.exe scripts\tts\generate_word_audio.py`
  (same `--dry-run` / `--ids <range>` options as the sentence-audio script; only
  generates audio for ids that don't have it yet).
- `SmartDailyReview.tsx` looks up audio by matching word text against `serverData`
  via `exampleLookup.findServerAudioId()` rather than a direct id (see step 6 for why).
  Run step 6 first so a brand-new word already has a matching `serverData` entry by
  the time this runs.
- Same fallback story as step 4: skipping this is non-blocking, browser TTS covers
  the gap until the batch runs.

## 6. Sync the SRS game word bank (單字島大冒險 — "every day 5 new words")
`services/newVocabData.ts` (`vocabData`) is a **separate** word bank from
`serverData` — it's what `services/srsStorage.ts` draws from for the Leitner-box
spaced-repetition game (`SmartDailyReview.tsx` / `VocabAdventureMap.tsx`). It has
its own string ids (`"knight_a1b2c"`, ...) going back to a mid-2026 snapshot, plus
every `serverData` word synced in afterward as `"s{serverData.id}"`. If it's not
kept in sync, the daily "5 new words" drip (`MAX_NEW` in `srsStorage.ts`) runs dry
or starts handing out stale/unrelated content instead of this week's school words.
- Run: `node scripts/sync_vocab_data.cjs` (pass `--dry-run` first to preview).
  It's idempotent — appends only `serverData` ids not already present as `"s{id}"`,
  so it's safe (and expected) to run after every vocabulary import.
- `getDailyHuntWords()`'s "new word" pick is **most-recently-added-first** (not
  array order), specifically so this week's import surfaces before older backlog —
  don't reorder `vocabData` or that logic will serve stale words first.
- This step doesn't block the commit either, but skipping it means the SRS game
  silently keeps serving whatever was already in `vocabData` — not a crash, just
  stale content, so don't forget it two weeks in a row.
