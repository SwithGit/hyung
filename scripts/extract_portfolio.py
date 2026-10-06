"""Extract website assets from the supplied 11-page portfolio without editing it.

Usage: python scripts/extract_portfolio.py "path/to/portfolio.pdf"
Requires Poppler (pdftoppm) and Pillow. Crop coordinates refer to the visually
reviewed 1500 px page renders; all final assets are rendered at twice that size.
"""
from pathlib import Path
import shutil
import subprocess
import sys
from PIL import Image

source = Path(sys.argv[1]).resolve(strict=True)
root = Path(__file__).resolve().parents[1]
scratch = root / "tmp" / "pdfs" / "highres"
output = root / "public" / "images" / "portfolio"
scratch.mkdir(parents=True, exist_ok=True)
output.mkdir(parents=True, exist_ok=True)
subprocess.run(["pdftoppm", "-scale-to", "3000", "-png", str(source), str(scratch / "page")], check=True)

crops = {
    "profile-railway": (1, (650, 0, 1500, 1061)),
    "road-route": (3, (110, 177, 785, 379)),
    "road-corridor": (3, (110, 436, 785, 638)),
    "road-quantities": (3, (110, 694, 785, 894)),
    "noise-tunnel-model": (4, (110, 177, 785, 379)),
    "noise-tunnel-family": (4, (110, 436, 785, 638)),
    "noise-tunnel-section": (4, (110, 689, 785, 895)),
    "rail-2025-route": (5, (110, 177, 785, 379)),
    "rail-2025-earthwork": (5, (110, 437, 785, 637)),
    "rail-2025-facilities": (5, (110, 694, 785, 894)),
    "metro-route": (6, (110, 177, 785, 379)),
    "metro-station": (6, (110, 436, 785, 638)),
    "metro-section": (6, (110, 689, 785, 895)),
    "rail-2026-entrance": (7, (112, 177, 449, 379)),
    "rail-2026-exit": (7, (461, 177, 785, 379)),
    "rail-2026-bridge": (7, (194, 435, 702, 637)),
    "rail-2026-analysis": (7, (222, 689, 678, 894)),
    "lidar-flight": (8, (90, 173, 686, 532)),
    "lidar-cloud": (8, (90, 549, 686, 959)),
    "lidar-terrain": (8, (825, 164, 1389, 957)),
    "automation-dynamo": (9, (97, 342, 713, 674)),
    "automation-fence": (9, (787, 294, 1402, 722)),
    "visualization-tunnel": (10, (97, 311, 713, 706)),
    "simulation-timeliner": (10, (787, 364, 1402, 652)),
    "ai-pkt-interface": (11, (94, 174, 792, 894)),
    "ai-pkt-sections": (11, (828, 243, 1460, 887)),
}

for name, (page, box) in crops.items():
    with Image.open(scratch / f"page-{page:02}.png") as image:
        scale = image.width / 1500
        crop = image.crop(tuple(round(value * scale) for value in box)).convert("RGB")
        crop.save(output / f"{name}.webp", "WEBP", quality=92, method=6)
        print(f"{name}: {crop.width}x{crop.height}")

downloads = root / "public" / "downloads"
downloads.mkdir(parents=True, exist_ok=True)
shutil.copy2(source, downloads / "lee-seungjun-portfolio.pdf")
print("Original PDF copied unchanged.")
