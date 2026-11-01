"""Turn the chosen batch candidates into shipped monster assets and register them.

    python scripts/finalize_monsters.py scripts/monster_choices.json [--dry-run]

monster_choices.json maps the 1-based plan number to the chosen candidate, e.g. {"1": "B", "2": "A"};
numbers not listed default to "A". Per concept this
  * trims the cutout to its content, pads it to a square with a small margin (so every monster fills
    the frame the same way), resizes to 512px and writes public/monsters/<key>.webp (alpha kept),
  * edits services/monsterData.ts: slot = existing id  -> replace image/name (id, boss flag and any
    glow drop-shadow are kept; hue/colour filters are dropped), slot = "new" -> append with the next id.
It also converts the 46 existing PNGs to 512px WebP (same file stems) and points their entries at .webp.
Old PNGs are not deleted here (git rm them after checking).
"""
import json
import os
import re
import sys

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PUBLIC = os.path.join(ROOT, "public", "monsters")
CUT = os.path.join(HERE, "monster_raw", "batch7", "cut")
DATA = os.path.join(ROOT, "services", "monsterData.ts")
SIZE, MARGIN, QUALITY = 512, 0.06, 85

choices_path = sys.argv[1]
dry = "--dry-run" in sys.argv
choices = {int(k): v.upper() for k, v in json.load(open(choices_path, encoding="utf-8")).items()}
plan = json.load(open(os.path.join(HERE, "monster_batch_plan.json"), encoding="utf-8"))["monsters"]


def save_webp(im: Image.Image, dest: str):
    im.save(dest, "WEBP", quality=QUALITY, method=4)  # method=6 can stall indefinitely in libwebp on some alpha images


def trim_square(im: Image.Image) -> Image.Image:
    a = np.array(im.convert("RGBA"))[:, :, 3]
    ys, xs = np.where(a > 16)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    side = int(max(im.size) * (1 + 2 * MARGIN))
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2), im)
    return canvas.resize((SIZE, SIZE), Image.LANCZOS)


src = open(DATA, encoding="utf-8").read()
nl = "\r\n" if "\r\n" in src else "\n"
ids = [int(x) for x in re.findall(r"id:\s*(\d+)", src)]
next_id = max(ids) + 1
entry_re = r"(  %d: \{ id: %d, )name: '[^']*', image: '[^']*', filter: '([^']*)'(, isLegendary: true)?( \},)"

log = []
for n, m in enumerate(plan, start=1):
    letter = choices.get(n, "A")
    cut = os.path.join(CUT, f"{m['key']}_{letter.lower()}.png")
    dest = os.path.join(PUBLIC, f"{m['key']}.webp")
    if not dry:
        save_webp(trim_square(Image.open(cut)), dest)
    img = f"monsters/{m['key']}.webp"
    if m["slot"] == "new":
        boss = ", isLegendary: true" if m.get("boss") else ""
        line = f"  {next_id}: {{ id: {next_id}, name: '{m['name']}', image: '{img}', filter: ''{boss} }},{nl}"
        end = src.rindex("};")
        src = src[:end] + line + src[end:]
        log.append(f"{n:3} new  id {next_id} {m['name']} <- {letter}")
        next_id += 1
    else:
        sid = m["slot"]
        pat = re.compile(entry_re % (sid, sid))
        mo = pat.search(src)
        assert mo, f"entry {sid} not found"
        old_filter = mo.group(2)
        glow = re.search(r"drop-shadow\([^)]*\)", old_filter)
        flt = glow.group(0) if (m.get("boss") and glow) else ""
        src = pat.sub(lambda x: f"{x.group(1)}name: '{m['name']}', image: '{img}', filter: '{flt}'{x.group(3) or ''}{x.group(4)}", src, count=1)
        log.append(f"{n:3} id {sid:3} {m['name']} <- {letter}  filter='{flt}'")

# the 46 existing PNGs -> 512px WebP, same stems
for f in sorted(os.listdir(PUBLIC)):
    if f.lower().endswith(".png"):
        stem = f[:-4]
        if not dry:
            save_webp(Image.open(os.path.join(PUBLIC, f)).convert("RGBA").resize((SIZE, SIZE), Image.LANCZOS),
                      os.path.join(PUBLIC, stem + ".webp"))
        src = src.replace(f"monsters/{f}'", f"monsters/{stem}.webp'")

if not dry:
    open(DATA, "w", encoding="utf-8", newline="").write(src)
print("\n".join(log))
print("dry run, nothing written" if dry else "written")
