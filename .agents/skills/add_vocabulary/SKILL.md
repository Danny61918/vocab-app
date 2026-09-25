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
- Re-run `python scripts/tts/generate_sentence_audio.py` (with the `tts-env` venv active)
  after adding vocabulary. It only generates audio for ids that don't have it yet, so it's
  safe to run repeatedly — pass `--dry-run` first to preview what would be generated.
- If this step is skipped, the app still works: `PracticeView` falls back to browser TTS
  for any word without pre-generated audio. So don't block the vocabulary commit on this —
  just flag to the user that the audio batch still needs to run before/along with deploy.
