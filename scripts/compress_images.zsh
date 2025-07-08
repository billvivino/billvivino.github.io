#!/usr/bin/env zsh
set -e

# --- resolve paths --------------------------------------------------------
SCRIPT_DIR="$(cd -- "$(dirname -- "${(%):-%N}")" && pwd)"   # /full/path/to/project/scripts
PROJECT_ROOT="${SCRIPT_DIR%/*}"                            # one level up
IMG_DIR="${PROJECT_ROOT}/assets"                           # originals
OUT_DIR="${IMG_DIR}/optimized"                             # outputs
mkdir -p "$OUT_DIR"

echo "📂 Source: $IMG_DIR"
echo "💾 Output: $OUT_DIR"
# -------------------------------------------------------------------------


# --------- 2. Loop over JPG / JPEG ----------
find "$IMG_DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) | \
while read -r f; do
  bn=$(basename "$f")
  # remove any previous optimized copy to avoid "target file already exists" errors
  rm -f "$OUT_DIR/$bn"
  echo "→ Compressing $bn (JPEG)"
  jpegoptim --strip-all -m85 --dest="$OUT_DIR" "$f"
  cwebp -q 80 "$f" -o "$OUT_DIR/${bn%.*}.webp"
  avifenc --min 25 --max 35 "$f" "$OUT_DIR/${bn%.*}.avif"
done

# --------- 3. Loop over PNG ----------
find "$IMG_DIR" -maxdepth 1 -type f -iname '*.png' | \
while read -r f; do
  bn=$(basename "$f")
  # remove any previous optimized copy to avoid overwriting errors
  rm -f "$OUT_DIR/$bn"
  echo "→ Compressing $bn (PNG)"
  pngquant --quality=70-90 --speed 1 --force --output "$OUT_DIR/$bn" -- "$f"
  oxipng -o 4 --strip all "$OUT_DIR/$bn"
  cwebp -q 80 "$f" -o "$OUT_DIR/${bn%.*}.webp"
  avifenc --min 25 --max 35 "$f" "$OUT_DIR/${bn%.*}.avif"
done

echo "✅  Optimisation complete."