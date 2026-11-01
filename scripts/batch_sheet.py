"""Phone-sized review sheets for scripts/gen_monster_batch.py results.

    python scripts/batch_sheet.py <start> <end> <outdir>

One sheet per 4 concepts: each row = concept label + candidate A | candidate B on magenta
(magenta shows halos, leftover white and holes). Written as <outdir>/sheet_<first index>.png
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
CUT = os.path.join(HERE, "monster_raw", "batch7", "cut")
PLAN = json.load(open(os.path.join(HERE, "monster_batch_plan.json"), encoding="utf-8"))["monsters"]

start, end, outdir = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
os.makedirs(outdir, exist_ok=True)
T, ROWS = 300, 5
try:
    font = ImageFont.truetype(r"C:\Windows\Fonts\msjh.ttc", 24)
except OSError:
    font = ImageFont.load_default()

for s in range(start, end, ROWS):
    idxs = [i for i in range(s, min(s + ROWS, end))]
    sheet = Image.new("RGB", (T * 3, T * len(idxs)), (0, 0, 0))
    for r, i in enumerate(idxs):
        m = PLAN[i]
        for c, cand in enumerate("abc"):
            p = os.path.join(CUT, f"{m['key']}_{cand}.png")
            tile = Image.new("RGBA", (T, T), (255, 0, 255, 255))
            if os.path.exists(p):
                tile.alpha_composite(Image.open(p).convert("RGBA").resize((T, T), Image.LANCZOS))
            d = ImageDraw.Draw(tile)
            tag = f"{i + 1}{cand.upper()} {m['name']}" + (" [BOSS]" if m.get("boss") else "")
            d.rectangle((0, 0, 14 + 24 * len(tag), 36), fill=(0, 0, 0))
            d.text((8, 4), tag, fill=(255, 255, 255), font=font)
            sheet.paste(tile.convert("RGB"), (c * T, r * T))
    sheet.save(os.path.join(outdir, f"sheet_{s + 1:03d}.png"))
print("ok")
