"""Batch-generate natural standalone-word audio for the vocab app (Practice page
"唸單字" / "提示發音" buttons, and the listening quiz), using Kokoro TTS instead
of the browser's robotic speechSynthesis.

Reads scripts/tts/words.json (id -> speakable word, produced by
export_words.cjs) and writes public/audio/word_{id}.mp3 (normal speed) and
public/audio/word_{id}_slow.mp3 (0.7x) for every id that doesn't already have
both files. Safe to re-run — existing files are skipped, not regenerated.

Usage (from repo root, with the tts-env venv active):
    node scripts/tts/export_words.cjs > scripts/tts/words.json
    python scripts/tts/generate_word_audio.py [--ids 979-1002] [--voice af_heart] [--dry-run]
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
SPEEDS = {"": 1.0, "_slow": 0.7}


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


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ids", type=str, default=None, help="e.g. 979-1002 or 979,980,990")
    parser.add_argument("--voice", type=str, default="af_heart")
    parser.add_argument("--dry-run", action="store_true", help="list what would be generated, without calling the model")
    args = parser.parse_args()

    words: dict[str, str] = json.loads(WORDS_JSON.read_text(encoding="utf-8"))
    id_filter = parse_id_range(args.ids) if args.ids else None

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
        for suffix, speed in SPEEDS.items():
            mp3_path = AUDIO_DIR / f"word_{wid}{suffix}.mp3"
            if mp3_path.exists():
                continue
            wav_path = AUDIO_DIR / f"word_{wid}{suffix}.wav"
            generator = pipeline(word, voice=args.voice, speed=speed)
            for _gs, _ps, audio in generator:
                sf.write(str(wav_path), audio, SAMPLE_RATE)
            wav_to_mp3(wav_path, mp3_path)
        print(f"[{i}/{len(todo)}] id {wid} ({word}) done")

    print("All done.")


if __name__ == "__main__":
    main()
