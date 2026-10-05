"""Batch-generate natural sentence audio for the vocab app's Practice page.

Reads scripts/tts/sentences.json (id -> sentence, produced by
export_sentences.cjs) and writes public/audio/{id}.mp3 (normal speed) and
public/audio/{id}_slow.mp3 for every id that doesn't already have both
files. Safe to re-run weekly after adding new vocabulary — existing files
are skipped, not regenerated.

The "_slow" file is derived from the normal-speed file via ffmpeg's atempo
filter, NOT Kokoro's own `speed` parameter. Kokoro's `speed` scales the
model's predicted phoneme durations directly, and the leading-silence
duration doesn't scale along with the rest — the mismatch between an
unstretched lead-in and a stretched sentence produces an audible glitch
right at the start. Time-stretching the already-correct normal take with
ffmpeg sidesteps that model-level artifact entirely.

Usage (from repo root, with the tts-env venv active):
    python scripts/tts/generate_sentence_audio.py [--ids 955-978] [--voice af_heart] [--dry-run]

    # Regenerate every "_slow" file from its existing normal-speed file
    # (pure ffmpeg, no GPU/model needed) — used to fix files made before
    # this atempo change:
    python scripts/tts/generate_sentence_audio.py --fix-slow [--ids ...] [--dry-run]
"""

import argparse
import json
import subprocess
from pathlib import Path

import soundfile as sf
import torch
from kokoro import KPipeline

REPO_ROOT = Path(__file__).resolve().parents[2]
SENTENCES_JSON = REPO_ROOT / "scripts" / "tts" / "sentences.json"
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


def run_fix_slow(sentences: dict[str, str], id_filter: set[int] | None, dry_run: bool) -> None:
    todo: list[tuple[int, str]] = []
    for id_str in sentences:
        wid = int(id_str)
        if id_filter is not None and wid not in id_filter:
            continue
        normal_path = AUDIO_DIR / f"{wid}.mp3"
        if normal_path.exists():
            todo.append((wid, sentences[id_str]))

    print(f"{len(todo)} sentence(s) have a normal-speed file to regenerate '_slow' from.")
    if dry_run:
        for wid, sentence in todo[:10]:
            print(f"  {wid}: {sentence}")
        if len(todo) > 10:
            print(f"  ... and {len(todo) - 10} more")
        return

    for i, (wid, sentence) in enumerate(todo, 1):
        normal_path = AUDIO_DIR / f"{wid}.mp3"
        slow_path = AUDIO_DIR / f"{wid}_slow.mp3"
        make_slow_from_normal(normal_path, slow_path)
        print(f"[{i}/{len(todo)}] id {wid} _slow regenerated")
    print("All done.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ids", type=str, default=None, help="e.g. 955-978 or 955,960,970")
    parser.add_argument("--voice", type=str, default="af_heart")
    parser.add_argument("--dry-run", action="store_true", help="list what would be generated, without calling the model")
    parser.add_argument("--fix-slow", action="store_true",
                         help="regenerate every '_slow' file from its existing normal-speed file via ffmpeg atempo, instead of generating new sentences")
    args = parser.parse_args()

    sentences: dict[str, str] = json.loads(SENTENCES_JSON.read_text(encoding="utf-8"))
    id_filter = parse_id_range(args.ids) if args.ids else None

    if args.fix_slow:
        run_fix_slow(sentences, id_filter, args.dry_run)
        return

    todo: list[tuple[int, str]] = []
    for id_str, sentence in sentences.items():
        wid = int(id_str)
        if id_filter is not None and wid not in id_filter:
            continue
        normal_path = AUDIO_DIR / f"{wid}.mp3"
        slow_path = AUDIO_DIR / f"{wid}_slow.mp3"
        if normal_path.exists() and slow_path.exists():
            continue
        todo.append((wid, sentence))

    print(f"{len(todo)} sentence(s) need audio (of {len(sentences)} total).")
    if args.dry_run:
        for wid, sentence in todo:
            print(f"  {wid}: {sentence}")
        return

    if not todo:
        print("Nothing to do.")
        return

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"device: {device}")
    pipeline = KPipeline(lang_code="a", device=device)

    for i, (wid, sentence) in enumerate(todo, 1):
        normal_path = AUDIO_DIR / f"{wid}.mp3"
        slow_path = AUDIO_DIR / f"{wid}_slow.mp3"

        if not normal_path.exists():
            wav_path = AUDIO_DIR / f"{wid}.wav"
            generator = pipeline(sentence, voice=args.voice, speed=1.0)
            for _gs, _ps, audio in generator:
                sf.write(str(wav_path), audio, SAMPLE_RATE)
            wav_to_mp3(wav_path, normal_path)

        if not slow_path.exists():
            make_slow_from_normal(normal_path, slow_path)

        print(f"[{i}/{len(todo)}] id {wid} done")

    print("All done.")


if __name__ == "__main__":
    main()
