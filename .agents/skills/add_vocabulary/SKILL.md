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
