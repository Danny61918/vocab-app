# Local monster-sprite generator (no API quota/billing needed) — see
# .doc/Monster_Creation_Guide.md for the full two-step add-a-monster workflow.
# Runs on the GPU via the torch+CUDA env already set up for TTS at
# E:/Code/tools/tts-env (diffusers/scipy added to that same venv).
#
# Usage (run from the vocab-app directory):
#   E:/Code/tools/tts-env/Scripts/python.exe scripts/gen_monster_sdxl.py \
#     '[["fire dragon with glowing wings", "mon_47.png", 12345]]'
#
# Each item is [english feature description, output filename, seed]. Check
# public/monsters/ for the next free mon_XX.png number before running. After
# generating, register each one with:
#   node scripts/addMonster.cjs "<中文名稱>" "mon_XX.png" false
import os
import sys
import numpy as np
import torch
from PIL import Image
from scipy.ndimage import label
from diffusers import StableDiffusionXLPipeline, DPMSolverMultistepScheduler

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "monsters")
RAW_DIR = os.path.join(os.path.dirname(__file__), "monster_raw")
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(RAW_DIR, exist_ok=True)

STYLE_SUFFIX = (
    ", 2D vector art, cute Japanese anime style, gaming monster character icon, "
    "chibi, simple cel shading, bold clean black outlines, pastel vibrant colors, "
    "centered, full body, single isolated object, plain flat solid white background, "
    "no background scenery, no border, no frame, no pattern, no rainbow, no clouds, "
    "no decorations in background, e-commerce product photo style, seamless white backdrop"
)
NEGATIVE_PROMPT = (
    "photorealistic, 3d render, realistic fur, text, watermark, signature, "
    "cropped, blurry, extra limbs, deformed, multiple characters, background "
    "scenery, gradient background, colorful background, busy background, heart shape, "
    "decorative border, ornate frame, swirls in background, stars in background, "
    "rainbow background, clouds in background, vignette, patterned background"
)

print("Loading SDXL pipeline...")
pipe = StableDiffusionXLPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16,
    variant="fp16",
    use_safetensors=True,
)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.to("cuda")
print("Pipeline ready.")

def remove_white_background(img: Image.Image, min_channel: int = 115) -> Image.Image:
    """Removes a light/vignetted background: any pixel whose R,G,B are all
    above min_channel is a background CANDIDATE, but only candidates
    connected (4-neighborhood) to the image border are actually made
    transparent. This handles soft gradients/vignettes/drop-shadows
    correctly, unlike a single-seed color-distance floodfill, while leaving
    light highlights fully enclosed inside the character untouched."""
    img = img.convert("RGBA")
    arr = np.array(img)
    rgb = arr[:, :, :3].astype(int)
    candidate = np.all(rgb >= min_channel, axis=2)

    labeled, _ = label(candidate)
    border_labels = set(labeled[0, :].tolist()) | set(labeled[-1, :].tolist())
    border_labels |= set(labeled[:, 0].tolist()) | set(labeled[:, -1].tolist())
    border_labels.discard(0)

    bg_mask = np.isin(labeled, list(border_labels))
    arr[bg_mask, 3] = 0
    return Image.fromarray(arr, mode="RGBA")

def generate_one(feature: str, filename: str, seed: int = 0):
    prompt = f"A cute {feature}{STYLE_SUFFIX}"
    generator = torch.Generator(device="cuda").manual_seed(seed)
    image = pipe(
        prompt=prompt,
        negative_prompt=NEGATIVE_PROMPT,
        num_inference_steps=30,
        guidance_scale=7.0,
        width=1024,
        height=1024,
        generator=generator,
    ).images[0]

    raw_path = os.path.join(RAW_DIR, filename)
    image.save(raw_path)

    cutout = remove_white_background(image)
    out_path = os.path.join(OUT_DIR, filename)
    cutout.save(out_path)
    print(f"  saved raw -> {raw_path}")
    print(f"  saved cutout -> {out_path}")
    return out_path

if __name__ == "__main__":
    import json
    monsters = json.loads(sys.argv[1])  # list of [feature, filename, seed]
    for feature, filename, seed in monsters:
        print(f"Generating {filename}: {feature}")
        generate_one(feature, filename, seed)
    print("Done.")
