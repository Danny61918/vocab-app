"""Batch-generate natural standalone-word audio for the vocab app (Practice page
"唸單字" / "提示發音" buttons, and the listening quiz), using Kokoro TTS instead
of the browser's robotic speechSynthesis.

Reads scripts/tts/words.json (id -> speakable word, produced by
export_words.cjs) and writes public/audio/word_{id}.mp3 (normal speed) and
public/audio/word_{id}_slow.mp3 for every id that doesn't already have both
files. Safe to re-run — existing files are skipped, not regenerated.

The "_slow" file is derived from the normal-speed file via ffmpeg's atempo
filter, NOT Kokoro's own `speed` parameter. Kokoro's `speed` scales the
model's predicted phoneme durations directly, and for short, isolated words
the leading-silence duration doesn't scale along with it — the mismatch
between an unstretched lead-in and a stretched word produces an audible
glitch/stray vowel sound right at the start (reported as "開頭有一個很像a的
怪聲" for words like "Turkey"). Time-stretching the already-correct normal
take with ffmpeg sidesteps that model-level artifact entirely.

Usage (from repo root, with the tts-env venv active):
    node scripts/tts/export_words.cjs > scripts/tts/words.json
    python scripts/tts/generate_word_audio.py [--ids 979-1002] [--voice af_heart] [--dry-run]

    # Regenerate every "_slow" file from its existing normal-speed file
    # (pure ffmpeg, no GPU/model needed) — used to fix files made before
    # this atempo change:
    python scripts/tts/generate_word_audio.py --fix-slow [--ids ...] [--dry-run]
"""

import argparse
import json
import subprocess
from pathlib import Path

import soundfile as sf
import torch
from kokoro import KPipeline

REPO_ROOT = Path(__file__).resolve().parents[2]
WORDS_JSON = REPO_ROOT / "scripts" / "tts" / "words.json"
AUDIO_DIR = REPO_ROOT / "public" / "audio"
SAMPLE_RATE = 24000
SLOW_ATEMPO = 0.7


def parse_id_range(spec: str) -> set[int]:
    ids: set[int] = set()
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            lo, hi = part.split("-")
            ids.update(range(int(lo), int(hi) + 1))
        else:
            ids.add(int(part))
    return ids


def wav_to_mp3(wav_path: Path, mp3_path: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path), "-ac", "1", "-b:a", "48k", str(mp3_path)],
        check=True,
    )
    wav_path.unlink()


def make_slow_from_normal(normal_path: Path, slow_path: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(normal_path),
         "-filter:a", f"atempo={SLOW_ATEMPO}", "-ac", "1", "-b:a", "48k", str(slow_path)],
        check=True,
    )


def run_fix_slow(words: dict[str, str], id_filter: set[int] | None, dry_run: bool) -> None:
    todo: list[tuple[int, str]] = []
    for id_str in words:
        wid = int(id_str)
        if id_filter is not None and wid not in id_filter:
            continue
        normal_path = AUDIO_DIR / f"word_{wid}.mp3"
        if normal_path.exists():
            todo.append((wid, words[id_str]))

    print(f"{len(todo)} word(s) have a normal-speed file to regenerate '_slow' from.")
    if dry_run:
        for wid, word in todo[:10]:
            print(f"  {wid}: {word}")
        if len(todo) > 10:
            print(f"  ... and {len(todo) - 10} more")
        return

    for i, (wid, word) in enumerate(todo, 1):
        normal_path = AUDIO_DIR / f"word_{wid}.mp3"
        slow_path = AUDIO_DIR / f"word_{wid}_slow.mp3"
        make_slow_from_normal(normal_path, slow_path)
        print(f"[{i}/{len(todo)}] id {wid} ({word}) _slow regenerated")
    print("All done.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ids", type=str, default=None, help="e.g. 979-1002 or 979,980,990")
    parser.add_argument("--voice", type=str, default="af_heart")
    parser.add_argument("--dry-run", action="store_true", help="list what would be generated, without calling the model")
    parser.add_argument("--fix-slow", action="store_true",
                         help="regenerate every '_slow' file from its existing normal-speed file via ffmpeg atempo, instead of generating new words")
    args = parser.parse_args()

    words: dict[str, str] = json.loads(WORDS_JSON.read_text(encoding="utf-8"))
    id_filter = parse_id_range(args.ids) if args.ids else None

    if args.fix_slow:
        run_fix_slow(words, id_filter, args.dry_run)
        return

    todo: list[tuple[int, str]] = []
    for id_str, word in words.items():
        wid = int(id_str)
        if id_filter is not None and wid not in id_filter:
            continue
        normal_path = AUDIO_DIR / f"word_{wid}.mp3"
        slow_path = AUDIO_DIR / f"word_{wid}_slow.mp3"
        if normal_path.exists() and slow_path.exists():
            continue
        todo.append((wid, word))

    print(f"{len(todo)} word(s) need audio (of {len(words)} total).")
    if args.dry_run:
        for wid, word in todo:
            print(f"  {wid}: {word}")
        return

    if not todo:
        print("Nothing to do.")
        return

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"device: {device}")
    pipeline = KPipeline(lang_code="a", device=device)

    for i, (wid, word) in enumerate(todo, 1):
        normal_path = AUDIO_DIR / f"word_{wid}.mp3"
        slow_path = AUDIO_DIR / f"word_{wid}_slow.mp3"

        if not normal_path.exists():
            wav_path = AUDIO_DIR / f"word_{wid}.wav"
            generator = pipeline(word, voice=args.voice, speed=1.0)
            for _gs, _ps, audio in generator:
                sf.write(str(wav_path), audio, SAMPLE_RATE)
            wav_to_mp3(wav_path, normal_path)

        if not slow_path.exists():
            make_slow_from_normal(normal_path, slow_path)

        print(f"[{i}/{len(todo)}] id {wid} ({word}) done")

    print("All done.")


if __name__ == "__main__":
    main()
