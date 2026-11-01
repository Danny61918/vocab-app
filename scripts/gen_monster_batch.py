"""Batch monster generator: SDXL (GPU) -> border flood-fill cutout, three candidates per concept.

Reads scripts/monster_batch_plan.json and, for every concept, makes candidates "a", "b" and "c":
    scripts/monster_raw/batch7/<key>_a.png      raw 1024px white-background render
    scripts/monster_raw/batch7/cut/<key>_a.png  transparent cutout
Resumable: existing files are skipped, so it can be stopped and started again.

Usage (repo root, TTS venv python):
    python scripts/gen_monster_batch.py            # everything
    python scripts/gen_monster_batch.py 0 20       # concepts [0, 20) of the plan
Prints "CHUNK <n> done" after every 20 concepts so a watcher can hand results over.
"""
import json
import os
import sys

import numpy as np
import torch
from diffusers import DPMSolverMultistepScheduler, StableDiffusionXLPipeline
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from cutout_monsters import cutout  # noqa: E402

RAW = os.path.join(HERE, "monster_raw", "batch7")  # batch/, batch2/ = earlier tries (prompt was cut at 77 tokens)
CUT = os.path.join(RAW, "cut")
os.makedirs(CUT, exist_ok=True)

# SDXL's CLIP encoders only read the first 77 tokens, so the subject comes first and the whole
# prompt stays short; anything after token 77 is silently dropped. (No "anime": it turns every
# subject into an anime girl.)
PROMPT_TAIL = ", kawaii chibi mascot, adorable round chubby body, huge sparkly eyes, tiny happy smile, soft pastel colors, thick clean outlines, flat cel shading, centered full body, plain white background, no shadow"
NEGATIVE_PROMPT = (
    "girl, human, person, portrait, teeth, fangs, sharp teeth, angry, scary, creepy, grotesque, edgy, tattoo art, realistic, "
    "photo, 3d render, text, watermark, multiple characters, character sheet, scenery, ground, shadow, floor, "
    "sticker, white outline, die-cut, emblem, badge, circle backdrop, frame, border, glow, sparkles, dots, gradient background"
)
CHUNK = 20

plan = json.load(open(os.path.join(HERE, "monster_batch_plan.json"), encoding="utf-8"))["monsters"]
start = int(sys.argv[1]) if len(sys.argv) > 2 else 0
end = int(sys.argv[2]) if len(sys.argv) > 2 else len(plan)

print("Loading SDXL pipeline...", flush=True)
pipe = StableDiffusionXLPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16, variant="fp16", use_safetensors=True,
)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.to("cuda")
print("Pipeline ready.", flush=True)

for idx in range(start, end):
    m = plan[idx]
    for cand, off in (("a", 0), ("b", 1), ("c", 2)):
        name = f"{m['key']}_{cand}.png"
        raw_path, cut_path = os.path.join(RAW, name), os.path.join(CUT, name)
        if os.path.exists(cut_path):
            continue
        if os.path.exists(raw_path):
            image = Image.open(raw_path)
        else:
            prompt = f"A cute {m['prompt']}{PROMPT_TAIL}"
            gen = torch.Generator(device="cuda").manual_seed(5000 + idx * 3 + off)
            image = pipe(prompt=prompt, negative_prompt=NEGATIVE_PROMPT, num_inference_steps=30,
                         guidance_scale=7.0, width=1024, height=1024, generator=gen).images[0]
            image.save(raw_path)
        result, big = cutout(image, adaptive=True)
        result.save(cut_path)
        transparent = float((np.array(result)[:, :, 3] == 0).mean())
        flag = "  !! LOW TRANSPARENCY" if transparent < 0.25 else ""
        print(f"[{idx}] {name} {m['name']} transparent={transparent:.0%}{flag}", flush=True)
    if (idx + 1) % CHUNK == 0 or idx + 1 == end:
        print(f"CHUNK {(idx) // CHUNK + 1} done (concepts up to {idx})", flush=True)
print("ALL DONE", flush=True)
